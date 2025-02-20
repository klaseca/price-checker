import type { PushToProductHistoryUseCase } from '#modules/productHistory/useCases/pushToProductHistory/pushToProductHistoryTypes.js';
import type { ParserConstructor, ParserService } from './parserTypes.js';
import type { JobManagerService } from '../jobManager/jobManagerTypes.js';
import { ParserQueue } from './ParserQueue.js';

interface ParserServiceOptions {
  parsersSetup: [string, ParserConstructor][];
  jobManagerService: JobManagerService;
  pushToProductHistoryUseCase: PushToProductHistoryUseCase;
}

interface ParserConfig {
  queue: ParserQueue;
  Parser: ParserConstructor;
}

export class ParserServiceImpl implements ParserService {
  private readonly parsers: Record<string, ParserConfig>;

  private readonly jobManagerService: JobManagerService;

  private readonly pushToProductHistoryUseCase: PushToProductHistoryUseCase;

  constructor({
    parsersSetup,
    jobManagerService,
    pushToProductHistoryUseCase,
  }: ParserServiceOptions) {
    this.parsers = parsersSetup.reduce<Record<string, ParserConfig>>(
      (acc, [parserName, Parser]) => {
        acc[parserName] = { queue: new ParserQueue(Parser), Parser };

        return acc;
      },
      {},
    );
    this.jobManagerService = jobManagerService;
    this.pushToProductHistoryUseCase = pushToProductHistoryUseCase;
  }

  hasParser = (url: string): boolean => {
    try {
      this.getParserConfig(url);
      return true;
    } catch {
      return false;
    }
  };

  runParser: ParserService['runParser'] = async (product) => {
    const parser = new (this.getParserConfig(product.url).Parser)(product.url);

    const productInfo = await parser.execute();

    await this.pushToProductHistoryUseCase.execute({
      ...productInfo,
      productId: product.id,
    });

    return productInfo;
  };

  startJob: ParserService['startJob'] = (product) => {
    this.jobManagerService.add({
      id: product.id,
      cronTime: product.cron,
      runOnInit: true,
      cronAction: async () => {
        try {
          const parserQueueService = this.getParserConfig(product.url).queue;

          const productInfo = await parserQueueService.add(product.url);

          await this.pushToProductHistoryUseCase.execute({
            ...productInfo,
            productId: product.id,
          });
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  stopJob: ParserService['stopJob'] = (id) => {
    this.jobManagerService.delete(id);
  };

  private getParserConfig = (url: string): ParserConfig => {
    const { hostname: parserName } = new URL(url);

    const parser = this.parsers[parserName];

    if (parser === undefined) {
      throw new Error(`No parser with name '${parserName}'`);
    }

    return parser;
  };
}

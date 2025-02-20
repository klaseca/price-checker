import { config } from '#config.js';
import { CheckApiKeyController } from './useCases/checkApiKey/CheckApiKeyController.js';
import { CheckApiKeyUseCase } from './useCases/checkApiKey/CheckApiKeyUseCase.js';

export const checkApiKeyUseCase = new CheckApiKeyUseCase(config.API_KEY);

export const checkApiKeyContoller = new CheckApiKeyController();

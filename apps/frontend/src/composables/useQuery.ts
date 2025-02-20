import {
  readonly,
  shallowRef,
  toValue,
  watchEffect,
  type DeepReadonly,
  type MaybeRefOrGetter,
  type Ref,
  type ShallowRef,
} from 'vue';

interface AsyncFnParams<Params> {
  signal: AbortSignal;
  params: Params;
}

interface UseQueryOptions<FnData, Params, Data> {
  fn: (params: AsyncFnParams<Params>) => Promise<FnData>;
  params?: Params;
  select?: (data: FnData) => Data;
  isEnabled?: MaybeRefOrGetter<boolean>;
}

interface UseQueryResult<FnData, Data> {
  data: Readonly<Ref<DeepReadonly<Data> | undefined>>;
  error: ShallowRef<unknown>;
  isLoading: ShallowRef<boolean>;
  refetch: () => Promise<void>;
  setData: (newData: FnData) => void;
}

class AbortableQuery<Params, Data> {
  get isAborted(): boolean {
    return this.abortController.signal.aborted;
  }

  private abortController = new AbortController();

  private fn: (params: AsyncFnParams<Params>) => Promise<Data>;

  constructor(fn: (params: AsyncFnParams<Params>) => Promise<Data>) {
    this.fn = fn;
  }

  execute = (params: Params): Promise<Data> => {
    this.abortController.abort();

    this.abortController = new AbortController();

    return this.fn({ signal: this.abortController.signal, params });
  };

  abort = () => {
    this.abortController.abort();
  };
}

export const useQuery = <FnData, Params = undefined, Data = FnData>({
  fn,
  params,
  select,
  isEnabled = true,
}: UseQueryOptions<FnData, Params, Data>): UseQueryResult<FnData, Data> => {
  const data = shallowRef(undefined) as ShallowRef<Data | undefined>;

  const error = shallowRef<unknown>(null);

  const isLoading = shallowRef(false);

  const abortableQuery = new AbortableQuery(fn);

  const refetch = async () => {
    data.value = undefined;
    error.value = null;
    isLoading.value = true;

    try {
      const response = await abortableQuery.execute(params as Params);

      if (!abortableQuery.isAborted) {
        setData(response);
      }
    } catch (catchedError) {
      error.value = catchedError;
    } finally {
      isLoading.value = false;
    }
  };

  const setData = (response: FnData) => {
    data.value = (select ? select(response) : response) as Data;
  };

  watchEffect(async () => {
    if (!toValue(isEnabled)) {
      return;
    }

    await refetch();

    // const abortConroller = new AbortController();

    // onCleanup(() => abortConroller.abort());

    // data.value = undefined;
    // error.value = null;
    // isLoading.value = true;

    // try {
    //   const response = await fn({ signal: abortConroller.signal, params: params as Params });

    //   if (!abortConroller.signal.aborted) {
    //     setData(response);
    //   }
    // } catch (catchedError) {
    //   error.value = catchedError;
    // } finally {
    //   isLoading.value = false;
    // }
  });

  return { data: readonly(data), error, isLoading, refetch, setData };
};

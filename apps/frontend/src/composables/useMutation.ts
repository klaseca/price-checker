import { ref, type Ref } from 'vue';

interface UseMutationOptions<Data, FnParams extends ReadonlyArray<unknown>> {
  fn: (...args: FnParams) => Promise<Data>;
  onSuccess?: (data: Data) => void;
  onError?: (error: unknown) => void;
}

interface UseMutationResult<FnParams extends ReadonlyArray<unknown>> {
  mutate: (...params: FnParams) => void;
  isLoading: Ref<boolean>;
}

export const useMutation = <Data, FnParams extends ReadonlyArray<unknown>>({
  fn,
  onSuccess,
  onError,
}: UseMutationOptions<Data, FnParams>): UseMutationResult<FnParams> => {
  const isLoading = ref(false);

  const mutate = (...params: FnParams) => {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    fn(...params)
      .then(onSuccess)
      .catch(onError)
      .finally(() => (isLoading.value = false));
  };

  return { mutate, isLoading };
};

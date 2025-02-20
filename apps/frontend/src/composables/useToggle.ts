import { readonly, ref } from 'vue';

export const useToggle = (defaultValue = false) => {
  const toggleValue = ref(defaultValue);

  const toggle = (value?: boolean) => {
    if (value != null) {
      toggleValue.value = value;
    } else {
      toggleValue.value = !toggleValue.value;
    }
  };

  return [readonly(toggleValue), toggle] as const;
};

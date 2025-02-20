import { computed, onMounted, onUnmounted, ref } from 'vue';

export const useIsDarkColorScheme = () => {
  const colorSchemeMedia = window?.matchMedia('(prefers-color-scheme: dark)');

  const isDarkColorScheme = ref(colorSchemeMedia?.matches ?? false);

  const handler = (event: MediaQueryListEvent) => {
    isDarkColorScheme.value = event.matches;
  };

  onMounted(() => {
    colorSchemeMedia?.addEventListener('change', handler);
  });

  onUnmounted(() => {
    colorSchemeMedia?.removeEventListener('change', handler);
  });

  return computed(() => isDarkColorScheme.value);
};

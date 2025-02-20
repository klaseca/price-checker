<script setup lang="ts" generic="T">
import { BaseLoader } from '#components/Loader/BaseLoader.vue';

const { isLoading, data, error } = defineProps<{
  isLoading: boolean;
  data: T;
  error: unknown;
}>();
</script>

<template>
  <BaseLoader v-if="isLoading" is-loading />
  <slot v-else-if="error != null" name="fallback" :error></slot>
  <slot v-else-if="data != null" :data="data"></slot>
</template>

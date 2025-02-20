<script setup lang="ts">
const { label, name, isRequired, pattern } = defineProps<{
  label: string;
  name: string;
  isRequired?: boolean;
  pattern?: string;
}>();

const model = defineModel({ default: '' });
</script>

<template>
  <label class="field">
    {{ label }}
    <input v-model="model" :name :required="isRequired" :pattern />
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

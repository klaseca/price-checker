<script setup lang="ts">
import { useCssModule } from 'vue';

const { label, name, isRequired, pattern } = defineProps<{
  label: string;
  name: string;
  isRequired?: boolean;
  pattern?: string;
}>();

const model = defineModel({ default: '' });

const classes = useCssModule()
</script>

<template>
  <label :class="classes.field">
    {{ label }}
    <input v-model="model" :name :required="isRequired" :pattern />
  </label>
</template>

<style module>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

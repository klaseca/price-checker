<script setup lang="ts">
import { useCssModule } from 'vue';

const { name, label, options, isRequired } = defineProps<{
  name: string;
  label: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  isRequired?: boolean;
}>();

const classes = useCssModule();

const model = defineModel({ default: '' });
</script>

<template>
  <div :class="classes.field">
    <label>{{ label }}</label>

    <select v-model="model" :name :required="isRequired">
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label || 'None' }}
      </option>
    </select>
  </div>
</template>

<style module>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

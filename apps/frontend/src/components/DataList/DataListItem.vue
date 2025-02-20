<script setup lang="ts">
import { useCssModule } from 'vue';

const { value } = defineProps<{
  label: string;
  value?: string | number | boolean;
}>();

const classes = useCssModule();
</script>

<template>
  <div :class="classes.item">
    <dt>{{ label }}</dt>

    <dd>
      <slot>
        <template v-if="value != null">{{ value }}</template>
      </slot>
    </dd>
  </div>
</template>

<style module>
.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

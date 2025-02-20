<script setup lang="ts">
import { useCssModule } from 'vue';

const { buttons } = defineProps<{
  buttons: ReadonlyArray<{ text: string; click: (event: MouseEvent) => void }>;
}>();

const classes = useCssModule();
</script>

<template>
  <div :class="classes.container">
    <button v-for="button of buttons" :key="button.text" @click="button.click">
      {{ button.text }}
    </button>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<script setup lang="ts">
import { useCssModule } from 'vue';

const isVisible = defineModel({ default: false });

const close = () => {
  isVisible.value = false;
};

const classes = useCssModule();
</script>

<template>
  <div v-if="isVisible" :class="classes.dialogOverlay" @click.self="close">
    <div :class="classes.dialogContainer">
      <slot></slot>
    </div>
  </div>
</template>

<style module>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-background-mute);
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
}
</style>

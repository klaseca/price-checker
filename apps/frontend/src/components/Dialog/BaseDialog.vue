<script setup lang="ts">
const isVisible = defineModel({ default: false });

const close = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-if="isVisible" class="dialog-overlay" @click.self="close">
    <div class="dialog-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
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

<script setup lang="ts">
import { useCssModule } from 'vue';

const { isLoading } = defineProps<{
  isLoading: boolean;
}>();

const classes = useCssModule();
</script>

<template>
  <div v-if="isLoading" :class="classes.loaderContainer">
    <span :class="classes.loader"></span>
  </div>
</template>

<style module>
.loader-container {
  display: flex;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.loader {
  width: 48px;
  height: 48px;
  background: #de3500;
  transform: rotateX(65deg) rotate(45deg);
  color: #fff;
  animation: layers1 1s linear infinite alternate;
  margin: auto;
}

.loader:after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  animation: layerTr 1s linear infinite alternate;
}

@keyframes layers1 {
  0% {
    box-shadow: 0px 0px 0 0px;
  }
  90%,
  100% {
    box-shadow: 20px 20px 0 -4px;
  }
}

@keyframes layerTr {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-25px, -25px) scale(1);
  }
}
</style>

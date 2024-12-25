<template>
  <div class="loading-component">
    <div class="dot" v-for="n in 12" :key="n" :style="getDotStyle(n)" />
  </div>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;
.loading-component {
  position: relative;
  width: 100px; /* Increased size to ensure the dots fit well */
  height: 100px; /* Increased size to ensure the dots fit well */
  transform: translate(-50%, -50%);
  animation: spinning 2.5s infinite cubic-bezier(0.62, -0.5, 0.28, 1.3);
}

.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #181717;
  border-radius: 50%;
  animation: dot-scale 2.5s infinite ease-in-out;
}

@keyframes spinning {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dot-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>

<script setup lang="ts">
const getDotStyle = (n: number) => {
  const angle = (n * 30) * (Math.PI / 180);
  const radius = 30;
  const x = 50 + radius * Math.cos(angle) - 4; // Subtract half of dot's width for centering
  const y = 50 + radius * Math.sin(angle) - 4; // Subtract half of dot's height for centering

  return {
    left: `${x}%`, // Use percentage to ensure the position is relative to the parent
    top: `${y}%`, // Use percentage to ensure the position is relative to the parent
    animationDelay: `${n * 0.2}s`,
  };
};
</script>
<script setup lang="ts">
import anime from 'animejs';
import { onMounted, ref, watch } from 'vue';

type Props = {
  number: number;
};

const props = defineProps<Props>();

const formatNumber = ref(0);

const init = () => {
  const targets = {
    value: 0,
  };

  setTimeout(() => {
    anime({
      targets,
      value: props.number,
      easing: 'linear',
      duration: 1000,
      change: () => {
        formatNumber.value = Math.floor(targets.value);
      },
      complete: () => {
        formatNumber.value = Math.floor(targets.value);
      },
    });
  }, 500);
};

onMounted(() => {
  init();
});

watch(() => props.number, init);
</script>

<template>
  <div>
    {{ formatNumber }}
  </div>
</template>

<style lang="scss" scoped></style>

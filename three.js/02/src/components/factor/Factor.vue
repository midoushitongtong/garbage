<script setup lang="ts">
import FactorModel from './FactorModel.vue';
import FactorLayout from './FactorLayout.vue';
import { provide, ref } from 'vue';

const showFloor = ref('2');
const showFighter = ref('2');

provide('showFloor', showFloor);
provide('showFighter', showFighter);
</script>

<template>
  <FactorModel />
  <FactorLayout />
</template>

<style lang="scss" scoped></style>

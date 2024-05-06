<script setup lang="ts">
import SmartCity2Model from './SmartCity2Model.vue';
import SmartCity2Layout from './SmartCity2Layout.vue';
import { provide, ref } from 'vue';

const reQiQiuAnimateType = ref('1');
const cameraType = ref('1');
const cameraLookType = ref('1');

provide('reQiQiuAnimateType', reQiQiuAnimateType);
provide('cameraType', cameraType);
provide('cameraLookType', cameraLookType);
</script>

<template>
  <SmartCity2Model />
  <SmartCity2Layout />
</template>

<style lang="scss" scoped></style>

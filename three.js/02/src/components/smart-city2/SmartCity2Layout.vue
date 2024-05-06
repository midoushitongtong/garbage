<script setup lang="ts">
import { inject, type Ref } from 'vue';

const reQiQiuAnimateType = inject('reQiQiuAnimateType') as Ref<string>;
const cameraLookType = inject('cameraLookType') as Ref<string>;
const cameraType = inject('cameraType') as Ref<string>;
</script>

<template>
  <div class="big-screen">
    <div class="header">智慧城市管理平台</div>
    <div class="main">
      <div class="left"></div>
      <div class="right">
        <div
          :class="['city-event', reQiQiuAnimateType === '1' && 'active']"
          @click="reQiQiuAnimateType = '1'"
        >
          <div class="city-event-label">
            <span>调整热气球以环绕的动画显示</span>
          </div>
        </div>
        <div
          :class="['city-event', reQiQiuAnimateType === '2' && 'active']"
          @click="reQiQiuAnimateType = '2'"
        >
          <div class="city-event-label">
            <span>调整热气球以平移的动画显示</span>
          </div>
        </div>
        <div
          :class="['city-event camera', cameraLookType === '1' && 'active']"
          @click="cameraLookType = '1'"
        >
          <div class="city-event-label">
            <span>调整摄像机角度为俯视</span>
          </div>
        </div>
        <div
          :class="['city-event camera', cameraLookType === '2' && 'active']"
          @click="cameraLookType = '2'"
        >
          <div class="city-event-label">
            <span>调整摄像机角度为追随汽车</span>
          </div>
        </div>
        <div
          :class="['city-event camera-type', cameraType === '1' && 'active']"
          @click="cameraType = '1'"
        >
          <div class="city-event-label">
            <span>调整摄像头为自动预览模式</span>
          </div>
        </div>
        <div
          :class="['city-event camera-type', cameraType === '2' && 'active']"
          @click="cameraType = '2'"
        >
          <div class="city-event-label">
            <span>跳转摄像头为固定视角模式</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SmartCity2Layout.scss';
</style>

<script setup lang="ts">
import { inject, type Ref } from 'vue';

const showFloor = inject('showFloor') as Ref<string>;
const showFighter = inject('showFighter') as Ref<string>;
</script>

<template>
  <div class="big-screen">
    <div class="header">智慧城市管理平台</div>
    <div class="main">
      <div class="left"></div>
      <div class="right">
        <div
          :class="['city-event', showFloor === '1' && 'active']"
          @click="
            () => {
              showFloor = '1';
              showFighter = '2';
            }
          "
        >
          <div class="city-event-label">
            <span>查看智慧工厂1楼</span>
          </div>
        </div>
        <div
          :class="['city-event', showFloor === '2' && 'active']"
          @click="
            () => {
              showFloor = '2';
              showFighter = '2';
            }
          "
        >
          <div class="city-event-label">
            <span>查看智慧工厂2楼</span>
          </div>
        </div>
        <div
          :class="['city-event', showFighter === '1' && 'active']"
          @click="
            () => {
              showFloor = '2';
              showFighter = '1';
            }
          "
        >
          <div class="city-event-label">
            <span>展开战斗机</span>
          </div>
        </div>
        <div
          :class="['city-event', showFighter === '2' && 'active']"
          @click="
            () => {
              showFloor = '2';
              showFighter = '2';
            }
          "
        >
          <div class="city-event-label">
            <span>合并战斗机</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './FactorLayout.scss';
</style>

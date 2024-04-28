<script setup lang="ts">
import type { SmartCityInfo } from '@/apis/smart-city/types';
import NumberShow from './NumberShow.vue';
import dayjs from 'dayjs';

type Props = {
  smartCityInfo: SmartCityInfo;
  activeEventListItemId: string;
};

defineProps<Props>();

const emits = defineEmits<{
  (e: 'onEventClick', item: SmartCityInfo['eventList'][0]): void;
}>();

const image: any = {
  f: '/public/火警.png',
  d: '/public/电力.png',
  z: '/public/治安.png',
};

const handleEventClick = (item: SmartCityInfo['eventList'][0]) => {
  emits('onEventClick', item);
};
</script>

<template>
  <div class="big-screen">
    <div class="header">智慧城市管理平台</div>
    <div class="main">
      <div class="left">
        <div class="city-info" v-for="item of smartCityInfo.infoList" :key="item.id">
          <div class="city-info-label">{{ item.name }}</div>
          <div class="city-info-value">
            <div class="left">
              <NumberShow :number="item.count" />
            </div>
            <div class="right">
              <div class="separator">/</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div
          v-for="item of smartCityInfo.eventList"
          :key="item.id"
          :class="['city-event', item.id === activeEventListItemId && 'active']"
          @click="handleEventClick(item)"
        >
          <div class="city-event-label">
            <img class="icon" :src="image[item.type]" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
          <div class="city-event-date">
            {{ dayjs(item.date).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div class="city-event-summary">
            {{ item.summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SmartCityLayout.scss';
</style>

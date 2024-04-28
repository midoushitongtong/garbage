<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SmartCityLayout from './SmartCityLayout.vue';
import SmartCityModel from './SmartCityModel.vue';
import { type SmartCityInfo } from '@/apis/smart-city/types';
import { getSmartCityInfo } from '@/apis/smart-city';

const smartCityInfo = ref<SmartCityInfo>();
const activeEventListItemId = ref('');

const init = async () => {
  const smartCityInfoResult = await getSmartCityInfo();
  smartCityInfo.value = smartCityInfoResult.data;
};

const handleEventIconClick = (item: SmartCityInfo['eventList'][0]) => {
  activeEventListItemId.value = item.id;
};

onMounted(async () => {
  await init();

  setInterval(() => {
    init();
  }, 2000);
});
</script>

<template>
  <div v-if="smartCityInfo">
    <SmartCityModel
      :smartCityInfo="smartCityInfo"
      :activeEventListItemId="activeEventListItemId"
      @onEventIconClick="handleEventIconClick"
    />
    <SmartCityLayout
      :smartCityInfo="smartCityInfo"
      :activeEventListItemId="activeEventListItemId"
      @onEventClick="handleEventIconClick"
    />
  </div>
</template>

<style lang="scss" scoped></style>

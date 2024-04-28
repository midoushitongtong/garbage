<script setup lang="ts">
import anime from 'animejs';
import { onMounted, ref, watch } from 'vue';

const containerRef = ref();
const currentScrollTop = ref(0);

const initAnimation = () => {
  const imageElementList = containerRef.value.querySelectorAll('.image') as HTMLDivElement[];
  imageElementList.forEach((item) => {
    item.dataset.offsetTop = item.offsetTop + '';
    item.dataset.height = item.getBoundingClientRect().height + '';
  });
  currentScrollTop.value = window.document.documentElement.scrollTop;
};

const updateFadeAnimation = () => {
  const animateElementList = containerRef.value.querySelectorAll('.fade-top') as HTMLDivElement[];
  animateElementList.forEach((item) => {
    if (
      currentScrollTop.value > item.offsetTop - window.innerHeight ||
      window.innerHeight > item.offsetTop
    ) {
      if (item.dataset.animated === 'true') {
        return;
      }

      item.dataset.animated = 'true';
      anime({
        targets: item,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'linear',
        duration: 500,
        delay: 200,
      });
    }
  });
};

const updateImageAnimation = () => {
  const imageElementList = containerRef.value.querySelectorAll('.image') as HTMLDivElement[];
  imageElementList.forEach((item) => {
    const offsetTop = parseFloat(item.dataset.offsetTop + '');
    const height = parseFloat(item.dataset.height + '');
    let step = (currentScrollTop.value + window.innerHeight - offsetTop) / height;
    step = Math.min(1, Math.max(0, step));
    // @ts-ignore
    item.querySelector('img').style.scale = 5 - (5 - 1) * step + '';
  });
};

watch(currentScrollTop, () => {
  updateFadeAnimation();
  updateImageAnimation();
});

onMounted(() => {
  initAnimation();
  updateFadeAnimation();
  updateImageAnimation();
  window.addEventListener('scroll', () => {
    currentScrollTop.value = window.document.documentElement.scrollTop;
  });
});
</script>

<template>
  <main ref="containerRef">
    <div
      v-for="(item, key) of new Array(20).fill(null)"
      :key="key"
      :class="['fade-top', `index-${key}`]"
      style="margin-bottom: 2rem; opacity: 0"
    >
      <div v-if="key === 10" class="image">
        <img
          src="https://picx.zhimg.com/80/v2-a9f0b12d9b814cc4eb8331644e47a702_1440w.webp?source=1def8aca"
          alt="图片"
        />
      </div>
      <span v-for="(item2, key2) of new Array(60).fill(null)" :key="key2"> Section {{ key }} </span>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.image {
  height: 600px;
  overflow: hidden;
  margin: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>

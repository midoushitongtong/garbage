<script setup lang="ts">
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { color } from 'd3';
import { onMounted } from 'vue';

onMounted(async () => {
  // @ts-ignore
  // 设置 cesium 静态资源路径
  window.CESIUM_BASE_URL = '/cesium/';

  // 设置 token 去除提示
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNTJjZDM3Ny03ZWUwLTQ3ZWEtODYwZC0yOWUxMDM1NjBiMjkiLCJpZCI6MjE0MjUyLCJpYXQiOjE3MTUzMzU2MzF9.Ie5PuJOpJVMwU4IetTbILCs7fZNd5wIu2oUZe2FXHeA';

  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, -20.4, 110.4, 61.2);

  // 实例化 ceisum
  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false, // 是否显示信息窗口
    homeButton: false, // 是否显示home按钮
    geocoder: false, // 是否显示查询按钮
    sceneModePicker: false, // 是否显示切换查看器显示模式
    navigationHelpButton: false, // 是否显示帮助按钮
    baseLayerPicker: false, // 是否显示图层选择
    animation: false, // 是否显示动画
    timeline: false, // 是否显示时间轴
    fullscreenButton: false, // 是否显示全屏按钮
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: '/px.jpg',
        negativeX: '/nx.jpg',
        positiveY: '/ny.jpg',
        negativeY: '/py.jpg',
        positiveZ: '/pz.jpg',
        negativeZ: '/nz.jpg',
      },
    }),
  });

  // 隐藏 logo
  // @ts-ignore
  document.querySelector('.cesium-viewer-bottom').style.display = 'none';

  // 创建 3d 建筑
  const osmBuildings = await Cesium.createOsmBuildingsAsync();
  // 遍历所有的建筑物
  osmBuildings.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${feature['building']} === 'office'", "color('red')"],
        ["${feature['building']} === 'commercial'", "color('orange')"],
        ["${feature['building']} === 'residential'", "color('yellow', 0.8)"],
      ],
    },
  });
  viewer.scene.primitives.add(osmBuildings);

  // 3d tiles 调试界面
  viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(114.1043265239238, 22.561600729710253, 0),
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineWidth: 4,
      outlineColor: Cesium.Color.WHITE,
    },
  });
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(114.1043265239238, 22.561600729710253, 10),
    label: {
      text: '宝安北路',
      font: '24px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -35),
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
    },
  });

  viewer.camera.flyTo({
    // 经度、纬度、高度
    destination: Cesium.Cartesian3.fromDegrees(114.1043265239238, 22.561600729710253, 500),
    duration: 3,
  });
});
</script>

<template>
  <div id="cesiumContainer" ref="cesiumContainerRef"></div>
</template>

<style scoped lang="scss">
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

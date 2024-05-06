<script setup lang="ts">
import html2canvas from 'html2canvas';
import { fabric } from 'fabric';

const snapshot = async () => {
  const data: {
    startX: number;
    startY: number;
    top: number;
    left: number;
    width: number;
    height: number;
    canvas: HTMLCanvasElement | null;
    canvasContext: CanvasRenderingContext2D | null;
  } = {
    startX: 0,
    startY: 0,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    canvas: null,
    canvasContext: null,
  };
  data.canvas = await html2canvas(document.body, {
    x: window.scrollX,
    y: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  data.canvasContext = data.canvas.getContext('2d');

  // create back drop
  const backdrop = document.createElement('div');
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0';
  backdrop.style.right = '0';
  backdrop.style.bottom = '0';
  backdrop.style.left = '0';
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  backdrop.style.zIndex = '1';
  document.body.appendChild(backdrop);
  // create slice area
  const sliceArea = document.createElement('canvas');
  sliceArea.style.position = 'fixed';
  sliceArea.style.border = '2px dashed #f60';
  sliceArea.style.zIndex = '2';
  sliceArea.style.width = '0';
  sliceArea.style.height = '0';
  sliceArea.style.top = '0';
  sliceArea.style.left = '0';
  document.body.appendChild(sliceArea);
  // listener slice area
  const handleWindowMouseDown = async (event: MouseEvent) => {
    data.startX = event.clientX;
    data.startY = event.clientY;
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };
  const handleWindowMouseMove = (event: MouseEvent) => {
    const width = event.clientX - data.startX;
    const height = event.clientY - data.startY;
    data.width = Math.abs(width);
    data.height = Math.abs(height);
    data.top = data.startY - (height >= 0 ? 0 : data.height);
    data.left = data.startX - (width >= 0 ? 0 : data.width);
    sliceArea.style.top = `${data.top}px`;
    sliceArea.style.left = `${data.left}px`;
    sliceArea.style.width = `${data.width}px`;
    sliceArea.style.height = `${data.height}px`;
    if (data.width > 0 && data.height > 0 && data.canvasContext) {
      const imageData = data.canvasContext.getImageData(data.left, data.top, data.width, data.height);
      sliceArea.width = data.width;
      sliceArea.height = data.height;
      sliceArea.getContext('2d')?.putImageData(imageData, 0, 0);
    }
  };
  const handleWindowMouseUp = async () => {
    initWriteEvent();

    window.removeEventListener('mousedown', handleWindowMouseDown);
    window.removeEventListener('mousemove', handleWindowMouseMove);
    window.removeEventListener('mouseup', handleWindowMouseUp);
  };
  window.addEventListener('mousedown', handleWindowMouseDown);

  const initWriteEvent = () => {
    var bg = sliceArea.toDataURL('image/png');

    console.log(bg);

    var canvas = new fabric.Canvas(sliceArea, {
      selectable: false,
    });
    canvas.selection = false; // disable

    const c = document.querySelector('.canvas-container');
    c.style.position = 'fixed';
    c.style.top = `${data.top}px`;
    c.style.left = `${data.left}px`;
    c.style.zIndex = '2';

    canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas));

    var circle, isDown, origX, origY;

    canvas.on('mouse:down', function (o) {
      console.log(1);

      isDown = true;
      var pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      circle = new fabric.Circle({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        radius: pointer.x - origX,
        angle: 0,
        fill: '',
        stroke: 'red',
        strokeWidth: 3,
      });
      canvas.add(circle);
    });

    canvas.on('mouse:move', function (o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      var radius = Math.max(Math.abs(origY - pointer.y), Math.abs(origX - pointer.x)) / 2;
      if (radius > circle.strokeWidth) {
        radius -= circle.strokeWidth / 2;
      }
      circle.set({ radius: radius });

      if (origX > pointer.x) {
        circle.set({ originX: 'right' });
      } else {
        circle.set({ originX: 'left' });
      }
      if (origY > pointer.y) {
        circle.set({ originY: 'bottom' });
      } else {
        circle.set({ originY: 'top' });
      }
      canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
      isDown = false;
    });
  };
};
</script>

<template>
  <button
    @click="snapshot"
    :style="{
      width: '100%',
      height: '200px',
    }"
  >
    snapshot
  </button>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
  <div>Hello</div>
</template>

<style lang="scss" scoped></style>

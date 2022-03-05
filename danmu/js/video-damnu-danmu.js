import { getTextPosition, getTextWidth } from './video-danmu-utils.js';
import { VideoDanmu } from './video-danmu.js';

export class Danmu {
  /**
   * Danmu
   */
  constructor(options) {
    /** @type {CanvasRenderingContext2D} */
    this.canvasCtx = options.canvasCtx;
    this.content = options.content;
    this.fontSize = options.fontSize;
    this.color = options.color;
    this.speed = options.speed;
    this.runTime = options.runTime;
    // 标记是否初始化
    this.isInitialized = false;
    // 标记是否停止渲染
    this.isStopDrawing = false;
  }

  initialize = (options) => {
    this.width = getTextWidth(this.content, this.fontSize);

    let textPosition = {
      x: 0,
      y: 0,
    };

    // 初始化 x y 写成一个方法, 因为需要防止弹幕重叠, 重叠了就重新计算
    const initTextPosition = () => {
      textPosition = getTextPosition(options.containerWidth, options.containerHeight, this.fontSize);
      if (options.previous) {
        // 检测和之前的一条弹幕 y 轴是否重叠
        const minY = options.previous.y - this.fontSize - 5; // - 5 容错
        const maxY = options.previous.y + this.fontSize + 5; // + 5 容错
        if (textPosition.y >= minY && textPosition <= maxY) {
          // y 轴重叠了, 重新计算 x y
          initTextPosition();
        }
      }
    };

    initTextPosition();

    this.x = textPosition.x;
    this.y = textPosition.y;
  };

  /**
   * draw
   */
  draw = () => {
    this.canvasCtx.font = this.fontSize + 'px Microsoft YaHei';
    this.canvasCtx.fillStyle = this.color;
    this.canvasCtx.fillText(this.content, this.x, this.y);
  };
}

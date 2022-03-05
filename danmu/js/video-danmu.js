import { isObject, isArray } from './video-danmu-utils.js';
import { Danmu } from './video-damnu-danmu.js';

export class VideoDanmu {
  /**
   * VideoDanmu
   */
  constructor(video, canvas, options) {
    if (!video || !canvas || !options) {
      console.log('少传必填参数');
      return;
    }
    if (!isObject(options) || !options.danmuData || !isArray(options.danmuData)) {
      console.log('options 参数有误');
      return;
    }

    /** @type {HTMLVideoElement} */
    this.video = video;
    /** @type {HTMLCanvasElement} */
    this.canvas = canvas;
    this.canvas.width = video.offsetWidth;
    this.canvas.height = video.offsetHeight;
    /** @type {CanvasRenderingContext2D} */
    this.canvasCtx = canvas.getContext('2d');
    // 弹幕暂停
    this.danmuPaused = true;
    // 默认弹幕配置
    this.defaultDanmuOptions = {
      // 字体大小
      fontSize: options.fontSize || 25,
      // 默认弹幕颜色
      color: options.color || '#fff',
      // 默认弹幕速度
      speed: options.speed || 1,
      // 默认弹幕运行时间
      runTime: options.runTime || 0,
    };
    // 弹幕数据
    this.danmuData = options.danmuData;
    // 弹幕池
    this.danmuPool = this.danmuData.map(
      (item) =>
        new Danmu({
          canvasCtx: this.canvasCtx,
          content: item.content,
          fontSize: item.fontSize || this.defaultDanmuOptions.fontSize,
          color: item.color || this.defaultDanmuOptions.color,
          speed: item.speed || this.defaultDanmuOptions.speed,
          runTime: item.runTime || this.defaultDanmuOptions.runTime,
        })
    );
  }

  /**
   * 清空画布
   */
  clearRect = () => {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  /**
   * 渲染弹幕
   */
  drawDanmu = () => {
    const currentVideoTime = this.video.currentTime;

    this.danmuPool.forEach((item, index) => {
      if (!item.isStopDrawing && currentVideoTime >= item.runTime) {
        // 初始化弹幕
        if (!item.isInitialized) {
          item.initialize({
            previous: this.danmuPool[index - 1],
            containerWidth: this.canvas.width,
            containerHeight: this.canvas.height,
          });
          item.isInitialized = true;
        }

        // 绘制弹幕
        item.x -= item.speed;
        item.draw();

        // 到最左侧了, 停止绘制
        if (item.x <= item.width * -1) {
          item.isStopDrawing = true;
        }
      }
    });
  };

  /**
   * 渲染
   */
  render = () => {
    this.clearRect();
    this.drawDanmu();

    if (!this.danmuPaused) {
      requestAnimationFrame(this.render);
    }
  };

  /**
   * 重置
   */
  reset = () => {
    this.clearRect();

    const currentVideoTime = this.video.currentTime;

    this.danmuPool.forEach((item) => {
      // 标记是否停止渲染
      item.isStopDrawing = false;
      // 标记是否初始化
      item.isInitialized = false;

      if (currentVideoTime <= item.runTime) {
        // 视频时间小与弹幕, 此弹幕可以被渲染
        item.isInitialized = false;
        item.isStopDrawing = false;
      } else {
        // 视频时间大与弹幕, 此弹幕不可以被渲染
        item.isStopDrawing = true;
        item.isInitialized = true;
      }
    });
  };

  /**
   * 添加弹幕
   */
  addDanmu = (danmu) => {
    this.danmuData.push(danmu);
    this.danmuPool.push(
      new Danmu({
        canvasCtx: this.canvasCtx,
        content: danmu.content,
        fontSize: danmu.fontSize || this.defaultDanmuOptions.fontSize,
        color: danmu.color || this.defaultDanmuOptions.color,
        speed: danmu.speed || this.defaultDanmuOptions.speed,
        runTime: danmu.runTime || this.defaultDanmuOptions.runTime,
      })
    );
  };
}

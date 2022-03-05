import { danmuData } from './video-danmu-data.js';
import { VideoDanmu } from './video-danmu.js';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // html 元素
    const danmuVideoElement = document.querySelector('.danmu-video');
    const danmuCanvasElement = document.querySelector('.danmu-canvas');
    const danmuTextElement = document.querySelector('.danmu-text');
    const danmuSendElement = document.querySelector('.danmu-send');
    const danmuColorElement = document.querySelector('.danmu-color');

    // 初始化视频弹幕工具
    const videoDanmu = new VideoDanmu(danmuVideoElement, danmuCanvasElement, {
      danmuData,
    });

    // 处理视频播放
    const handleDanmuVideoPlay = () => {
      videoDanmu.danmuPaused = false;
      videoDanmu.render();
    };

    // 处理视频暂停
    const handleDanmuVideoPause = () => {
      videoDanmu.danmuPaused = true;
    };

    // 处理视频进度条发生变化
    // seeked 事件在用户已移动/跳跃到音频/视频（audio/video）中的新位置时触发。
    const handleDanmuVideoSeeked = () => {
      videoDanmu.reset();
    };

    // 发送弹幕
    const handleDanmuSend = () => {
      const content = danmuTextElement.value.trim();
      const color = danmuColorElement.value.trim();
      const currentVideoTime = danmuVideoElement.currentTime;

      if (content && color) {
        const danmu = {
          content,
          color,
          speed: 2,
          runTime: currentVideoTime,
        };

        videoDanmu.addDanmu(danmu);
        danmuTextElement.value = '';
      }
    };

    const bindEvent = () => {
      danmuVideoElement.addEventListener('play', handleDanmuVideoPlay);
      danmuVideoElement.addEventListener('pause', handleDanmuVideoPause);
      danmuVideoElement.addEventListener('seeked', handleDanmuVideoSeeked);
      danmuSendElement.addEventListener('click', handleDanmuSend);
    };

    const init = () => {
      bindEvent();
    };

    init();
  });
})();

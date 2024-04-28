import { type SmartCityInfo } from './types';

export const getSmartCityInfo = async () => {
  return Promise.resolve<{ data: SmartCityInfo }>({
    data: {
      infoList: [
        { id: '1', name: '未处理治安事件', count: Math.floor(Math.random() * 20000) + 1, unit: '起' },
        { id: '2', name: '接入IOT设备', count: Math.floor(Math.random() * 20000) + 1, unit: '台' },
        { id: '3', name: '今日地铁出行人数', count: Math.floor(Math.random() * 20000) + 1, unit: '次' },
      ],
      eventList: [
        {
          id: '1',
          type: 'f',
          name: '火警',
          position: { x: -0.5, z: -0.5 },
          date: new Date().toISOString(),
          summary: '存在隐患，需派人查看',
        },
        {
          id: '2',
          type: 'z',
          name: '治安',
          position: { x: -5, z: 0 },
          date: new Date().toISOString(),
          summary: '存在纠纷，需派人查看',
        },
        {
          id: '3',
          type: 'd',
          name: '电力',
          position: { x: -1.5, z: 5 },
          date: new Date().toISOString(),
          summary: '出现问题，需派人查看',
        },
        {
          id: '4',
          type: 'f',
          name: '火警',
          position: { x: -10.5, z: -10.5 },
          date: new Date().toISOString(),
          summary: '存在隐患，需派人查看',
        },
        {
          id: '5',
          type: 'z',
          name: '治安',
          position: { x: -15, z: 10 },
          date: new Date().toISOString(),
          summary: '存在纠纷，需派人查看',
        },
        {
          id: '6',
          type: 'd',
          name: '电力',
          position: { x: -11.5, z: 15 },
          date: new Date().toISOString(),
          summary: '出现问题，需派人查看',
        },
      ],
    },
  });
};

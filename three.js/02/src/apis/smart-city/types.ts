export type SmartCityInfo = {
  infoList: {
    id: string;
    name: string;
    count: number;
    unit: string;
  }[];
  eventList: {
    id: string;
    type: string;
    name: string;
    position: {
      x: number;
      z: number;
    };
    date: string;
    summary: string;
  }[];
};

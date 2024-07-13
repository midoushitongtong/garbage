export const Flip = (elementList: Element[], duration = 300) => {
  let prevPositionList: {
    index: number;
    x: number;
    y: number;
  }[] = [];

  const record = () => {
    prevPositionList = elementList.map((item, index) => {
      const rect = item.getBoundingClientRect();
      return {
        index,
        x: rect.left,
        y: rect.top,
      };
    });
  };

  const play = () => {
    elementList.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const prevPosition = prevPositionList[index];
      if (prevPosition) {
        const diffX = prevPosition.x - rect.x;
        const diffY = prevPosition.y - rect.y;
        elementList[index].animate(
          [
            { transform: `translateX(${diffX}px) translateY(${diffY}px)` },
            { transform: 'translateX(0px) translateY(0px)' },
          ],
          {
            duration,
          }
        );
      }
    });
  };

  return {
    record,
    play,
  };
};

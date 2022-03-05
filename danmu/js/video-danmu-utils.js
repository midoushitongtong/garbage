export const isObject = (value) => {
  const type = Object.prototype.toString.call(value);
  return type === '[object Object]';
};

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isNumber = (value) => {
  return typeof value === 'number';
};

export const getTextWidth = (content, fontSize) => {
  if (!isNumber(fontSize)) {
    console.log('fontSize 类型必须是 number');
    return 0;
  }
  const span = document.createElement('span');
  span.innerText = content;
  span.style.fontSize = fontSize + 'px';
  span.style.display = 'flex';
  span.style.position = 'absolute';
  span.style.opacity = 0;
  document.body.appendChild(span);
  const width = span.offsetWidth;
  return width;
};

export const getTextPosition = (containerWidth, containerHeight, fontSize) => {
  if (!isNumber(fontSize)) {
    console.log('fontSize 类型必须是 number');
    return 0;
  }
  let x = containerWidth;
  let y = containerHeight * Math.random();
  const minY = fontSize + 5; // + 5 容错
  const maxY = containerHeight - fontSize - 5; // - 5 容错
  // 防止出现在容器上方
  if (y < minY) {
    y = minY;
  }
  // 防止出现在容器下方
  if (y > maxY) {
    y = maxY;
  }
  return {
    x,
    y,
  };
};

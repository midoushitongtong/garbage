'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

// 参数归一化
function format(date: Date, formatter: string | ((_dateInfo: any) => string), isPad = false) {
  //  将 formatter 参数归一化, 简化后续调用过程, 调用的时候不必要考虑其他因素, 只需要传入同一种约定的参数即可
  const _formatter = (formatter: Parameters<typeof format>[1]) => {
    if (typeof formatter === 'function') {
      return formatter;
    }
    if (typeof formatter !== 'string') {
      throw new TypeError('formatter must be string or function!');
    }
    if (formatter === 'date') {
      formatter = 'yyyy-MM-dd';
    } else if (formatter === 'datetime') {
      formatter = 'yyyy-MM-dd HH:mm:ss';
    }
    return (dateInfo: any) => {
      const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo;
      return formatter
        .replace('yyyy', yyyy)
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('HH', HH)
        .replace('mm', mm)
        .replace('ss', ss)
        .replace('ms', ms);
    };
  };

  const dateInfo: any = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };

  dateInfo.yyyy = isPad ? dateInfo.year.toString().padStart(4, '0') : dateInfo.year;
  dateInfo.MM = isPad ? dateInfo.month.toString().padStart(2, '0') : dateInfo.month;
  dateInfo.dd = isPad ? dateInfo.date.toString().padStart(2, '0') : dateInfo.date;
  dateInfo.HH = isPad ? dateInfo.hours.toString().padStart(2, '0') : dateInfo.hours;
  dateInfo.mm = isPad ? dateInfo.minutes.toString().padStart(2, '0') : dateInfo.minutes;
  dateInfo.ss = isPad ? dateInfo.seconds.toString().padStart(2, '0') : dateInfo.seconds;
  dateInfo.ms = isPad ? dateInfo.milliseconds.toString().padStart(2, '0') : dateInfo.milliseconds;

  return _formatter(formatter)(dateInfo);
}

console.log(format(new Date(), 'date'));
console.log(format(new Date(), 'datetime'));
console.log(
  format(new Date(), (dateInfo) => {
    return dateInfo.year;
  })
);

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;

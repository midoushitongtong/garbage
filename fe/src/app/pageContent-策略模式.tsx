'use client';

const PageContent = () => {
  const func = (name: string) => {
    // if (name.includes('a')) {
    //   console.log('包含 a');
    // } else if (name.includes('b')) {
    //   console.log('包含 b');
    // } else if (name.includes('c')) {
    //   console.log('包含 c');
    // }

    // 使用测量模式优化代码
    /**
     * 可读性提高
     * 可扩展性提高，方便扩展更多的条件
     */
    const map = [
      {
        condition: (str: string) => str.includes('a'),
        exec: () => {
          console.log('包含a');
        },
      },
      {
        condition: (str: string) => str.includes('b'),
        exec: () => {
          console.log('包含b');
        },
      },
      {
        condition: (str: string) => str.includes('c'),
        exec: () => {
          console.log('包含c');
        },
      },
    ];
    const item = map.find((item) => item.condition(name));
    if (item) {
      item.exec();
    }
  };

  func('a');

  return (
    <section className="container">
      <div>Hello World</div>
    </section>
  );
};

export default PageContent;

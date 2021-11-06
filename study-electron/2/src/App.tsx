import React from 'react';
import './App.css';

const Button = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    document.title = count.toString();
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

const MouseTracker = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  const updatePositon = (e: MouseEvent) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
  };

  React.useEffect(() => {
    document.addEventListener('click', updatePositon);

    return () => {
      document.removeEventListener('click', updatePositon);
    };
  }, []);

  return (
    <p>
      x: {mousePosition.x}, y: {mousePosition.y}
    </p>
  );
};

const WatchData = () => {
  const [id, setId] = React.useState(Math.random());
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState('');

  const updateData = React.useCallback(async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setData(id + 'abc');
    setLoading(false);
  }, [id]);

  React.useEffect(() => {
    updateData();
    // 监听 id 变化, 之后根据新 id 更新 data
  }, [id, updateData]);

  return (
    <>
      {loading ? <div>loading ...</div> : <div>{data}</div>}
      <button onClick={() => setId(Math.random())}>update</button>
    </>
  );
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const MousePosition = () => {
  const mousePosition = useMousePosition();

  return (
    <div>
      x: {mousePosition.x}, y: {mousePosition.y}
    </div>
  );
};
const withLoader = (WrapperComponent: (props: any) => JSX.Element, url: string) => {
  return class LoadComponent extends React.Component {
    state = {
      data: null,
      loading: false,
    };

    componentDidMount = async () => {
      this.setState({
        loading: true,
      });

      await new Promise((r) => setTimeout(r, 1000));

      this.setState({
        data: 'abc' + url,
        loading: false,
      });
    };

    render() {
      return this.state.loading ? (
        <div>loading ...</div>
      ) : (
        <WrapperComponent {...this.props} data={this.state.data} />
      );
    }
  };
};

const TestLoader = (props: { data: string }) => {
  return <div>{props.data}</div>;
};

const TestLoaderWithLoader = withLoader(TestLoader, 'hello');

const useLoader = (url: string) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState('');

  const initData = React.useCallback(async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setData('abc' + url);
    setLoading(false);
  }, [url]);

  React.useEffect(() => {
    initData();
  }, [initData]);

  return [loading, data];
};

const TestLoaderWithUseLoader = () => {
  const [url, setUrl] = React.useState('hello');
  const [loading, data] = useLoader(url);

  return (
    <>
      {loading ? <div>loading ...</div> : <div>{data}</div>}
      <button
        onClick={() => {
          setUrl(Math.random() + 'hello');
        }}
      >
        update url
      </button>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <TestLoaderWithUseLoader />
    </div>
  );
};

export default App;

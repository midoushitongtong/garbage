import React from 'react';
import './App.scss';
import Home from './views/home/Home';
import BackendHandler from './components/backend-handler/BackendHandler';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Setting from './views/setting/Setting';
import useWebContentsListener from './hooks/useWebContentsListener';
import Loader from './components/Loader/Loader';

const App = () => {
  const [loading, setLoading] = React.useState(false);

  useWebContentsListener({
    'toggle-loading': (newLoading: boolean) => {
      setLoading(() => newLoading);
    },
  });

  return (
    <>
      {/* router */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>

        {/* backend handler */}
        <BackendHandler />
      </BrowserRouter>

      {loading && (
        <div className="loading-container">
          <Loader />
        </div>
      )}
    </>
  );
};

export default App;

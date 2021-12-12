import './App.scss';
import Home from './views/home/Home';
import BackendHandler from './components/backend-handler/BackendHandler';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Setting from './views/setting/Setting';

const App = () => {
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
    </>
  );
};

export default App;

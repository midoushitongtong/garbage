import './App.scss';
import Home from './views/home/Home';
import { menuTemplate } from './utils/menu';

const remote = require('@electron/remote');

// 设置 app 菜单
const menu = remote.Menu.buildFromTemplate(menuTemplate);
remote.Menu.setApplicationMenu(menu);

const App = () => {
  return <Home />;
};

export default App;

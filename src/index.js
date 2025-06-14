import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Brampton from './Brampton.js';
import Scotby from './Scotby.js';
import Moorhouse from './Moorhouse.js';
import SharedMap from './SharedMap.js';
import BramptonMap from './BramptonMap.js';
import MoorhouseMap from './MoorhouseMap.js';
import ScotbyMap from './ScotbyMap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' Component={App}></Route>
      <Route path='/brampton' Component={Brampton}></Route>
      <Route path='/scotby' Component={Scotby}></Route>
      <Route path='/moorhouse' Component={Moorhouse}></Route>
      <Route path='/shared_map' Component={SharedMap}></Route>
      <Route path='/brampton_map' Component={BramptonMap}></Route>
      <Route path='/moorhouse_map' Component={MoorhouseMap}></Route>
      <Route path='/scotby_map' Component={ScotbyMap}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

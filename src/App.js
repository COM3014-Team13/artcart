import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

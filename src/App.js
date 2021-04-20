import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Product from './components/products/Product';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Account from './components/accounts/Account';

import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <ProductState>
      <AuthState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/products/:id' component={Product} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/account' component={Account} />
              </Switch>
            </div>
          </div>
        </Router>
      </AuthState>
    </ProductState>
  );
}

export default App;

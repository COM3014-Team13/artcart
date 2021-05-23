import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Product from './components/products/Product';
import Checkout from './components/products/Checkout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Account from './components/accounts/Account';
import PublicSeller from './components/accounts/sellers/PublicSeller';
import Order from './components/orders/Order';
import NewRating from './components/orders/NewRating';

import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';
import OrderState from './context/order/OrderState';

function App() {
  return (
    <ProductState>
      <AuthState>
        <OrderState>
          <Router>
            <div className='App'>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/product/:id' component={Product} />
                  <Route
                    exact
                    path='/product/:id/checkout'
                    component={Checkout}
                  />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/account' component={Account} />
                  <Route exact path='/account/:id' component={PublicSeller} />
                  <Route exact path='/orders/:id' component={Order} />
                  <Route
                    exact
                    path='/orders/:id/newrating'
                    component={NewRating}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </OrderState>
      </AuthState>
    </ProductState>
  );
}

export default App;

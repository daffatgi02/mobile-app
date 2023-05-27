import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './services/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import ArticlePage from './pages/ArticlePage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/products" component={ProductPage} />
          <Route path="/articles" component={ArticlePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import ArticleDetails from '../components/ArticleDetails';

const ArticlePage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ArticleList} />
        <Route path={`${match.path}/:id`} component={ArticleDetails} />
      </Switch>
    </div>
  );
};

export default ArticlePage;

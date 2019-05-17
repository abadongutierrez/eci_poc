import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Budget from './budget';
import BudgetDetail from './budget-detail';
import BudgetUpdate from './budget-update';
import BudgetDeleteDialog from './budget-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BudgetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BudgetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BudgetDetail} />
      <ErrorBoundaryRoute path={match.url} component={Budget} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BudgetDeleteDialog} />
  </>
);

export default Routes;

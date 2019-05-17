import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeBudgetAssignment from './employee-budget-assignment';
import EmployeeBudgetAssignmentDetail from './employee-budget-assignment-detail';
import EmployeeBudgetAssignmentUpdate from './employee-budget-assignment-update';
import EmployeeBudgetAssignmentDeleteDialog from './employee-budget-assignment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeBudgetAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeBudgetAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeBudgetAssignmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeBudgetAssignment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EmployeeBudgetAssignmentDeleteDialog} />
  </>
);

export default Routes;

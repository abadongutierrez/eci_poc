import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeClientAssignment from './employee-client-assignment';
import EmployeeClientAssignmentDetail from './employee-client-assignment-detail';
import EmployeeClientAssignmentUpdate from './employee-client-assignment-update';
import EmployeeClientAssignmentDeleteDialog from './employee-client-assignment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeClientAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeClientAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeClientAssignmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeClientAssignment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EmployeeClientAssignmentDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClientProject from './client-project';
import ClientProjectDetail from './client-project-detail';
import ClientProjectUpdate from './client-project-update';
import ClientProjectDeleteDialog from './client-project-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClientProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClientProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClientProjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClientProject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClientProjectDeleteDialog} />
  </>
);

export default Routes;

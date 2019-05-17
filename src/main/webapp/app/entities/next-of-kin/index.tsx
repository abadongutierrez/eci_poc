import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NextOfKin from './next-of-kin';
import NextOfKinDetail from './next-of-kin-detail';
import NextOfKinUpdate from './next-of-kin-update';
import NextOfKinDeleteDialog from './next-of-kin-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NextOfKinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NextOfKinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NextOfKinDetail} />
      <ErrorBoundaryRoute path={match.url} component={NextOfKin} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NextOfKinDeleteDialog} />
  </>
);

export default Routes;

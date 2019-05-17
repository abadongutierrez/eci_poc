import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import KeyDate from './key-date';
import KeyDateDetail from './key-date-detail';
import KeyDateUpdate from './key-date-update';
import KeyDateDeleteDialog from './key-date-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KeyDateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KeyDateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KeyDateDetail} />
      <ErrorBoundaryRoute path={match.url} component={KeyDate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={KeyDateDeleteDialog} />
  </>
);

export default Routes;

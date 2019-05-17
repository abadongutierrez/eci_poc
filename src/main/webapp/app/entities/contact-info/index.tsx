import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContactInfo from './contact-info';
import ContactInfoDetail from './contact-info-detail';
import ContactInfoUpdate from './contact-info-update';
import ContactInfoDeleteDialog from './contact-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContactInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContactInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContactInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContactInfo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ContactInfoDeleteDialog} />
  </>
);

export default Routes;

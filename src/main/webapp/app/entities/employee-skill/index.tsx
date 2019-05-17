import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeSkill from './employee-skill';
import EmployeeSkillDetail from './employee-skill-detail';
import EmployeeSkillUpdate from './employee-skill-update';
import EmployeeSkillDeleteDialog from './employee-skill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeSkillDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeSkill} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EmployeeSkillDeleteDialog} />
  </>
);

export default Routes;

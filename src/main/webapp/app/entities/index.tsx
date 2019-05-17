import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Employee from './employee';
import ContactInfo from './contact-info';
import NextOfKin from './next-of-kin';
import Client from './client';
import ClientProject from './client-project';
import EmployeeClientAssignment from './employee-client-assignment';
import Budget from './budget';
import EmployeeBudgetAssignment from './employee-budget-assignment';
import KeyDate from './key-date';
import Skill from './skill';
import EmployeeSkill from './employee-skill';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/contact-info`} component={ContactInfo} />
      <ErrorBoundaryRoute path={`${match.url}/next-of-kin`} component={NextOfKin} />
      <ErrorBoundaryRoute path={`${match.url}/client`} component={Client} />
      <ErrorBoundaryRoute path={`${match.url}/client-project`} component={ClientProject} />
      <ErrorBoundaryRoute path={`${match.url}/employee-client-assignment`} component={EmployeeClientAssignment} />
      <ErrorBoundaryRoute path={`${match.url}/budget`} component={Budget} />
      <ErrorBoundaryRoute path={`${match.url}/employee-budget-assignment`} component={EmployeeBudgetAssignment} />
      <ErrorBoundaryRoute path={`${match.url}/key-date`} component={KeyDate} />
      <ErrorBoundaryRoute path={`${match.url}/skill`} component={Skill} />
      <ErrorBoundaryRoute path={`${match.url}/employee-skill`} component={EmployeeSkill} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

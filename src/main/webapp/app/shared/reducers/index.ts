import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import contactInfo, {
  ContactInfoState
} from 'app/entities/contact-info/contact-info.reducer';
// prettier-ignore
import nextOfKin, {
  NextOfKinState
} from 'app/entities/next-of-kin/next-of-kin.reducer';
// prettier-ignore
import client, {
  ClientState
} from 'app/entities/client/client.reducer';
// prettier-ignore
import clientProject, {
  ClientProjectState
} from 'app/entities/client-project/client-project.reducer';
// prettier-ignore
import employeeClientAssignment, {
  EmployeeClientAssignmentState
} from 'app/entities/employee-client-assignment/employee-client-assignment.reducer';
// prettier-ignore
import budget, {
  BudgetState
} from 'app/entities/budget/budget.reducer';
// prettier-ignore
import employeeBudgetAssignment, {
  EmployeeBudgetAssignmentState
} from 'app/entities/employee-budget-assignment/employee-budget-assignment.reducer';
// prettier-ignore
import keyDate, {
  KeyDateState
} from 'app/entities/key-date/key-date.reducer';
// prettier-ignore
import skill, {
  SkillState
} from 'app/entities/skill/skill.reducer';
// prettier-ignore
import employeeSkill, {
  EmployeeSkillState
} from 'app/entities/employee-skill/employee-skill.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly employee: EmployeeState;
  readonly contactInfo: ContactInfoState;
  readonly nextOfKin: NextOfKinState;
  readonly client: ClientState;
  readonly clientProject: ClientProjectState;
  readonly employeeClientAssignment: EmployeeClientAssignmentState;
  readonly budget: BudgetState;
  readonly employeeBudgetAssignment: EmployeeBudgetAssignmentState;
  readonly keyDate: KeyDateState;
  readonly skill: SkillState;
  readonly employeeSkill: EmployeeSkillState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  employee,
  contactInfo,
  nextOfKin,
  client,
  clientProject,
  employeeClientAssignment,
  budget,
  employeeBudgetAssignment,
  keyDate,
  skill,
  employeeSkill,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;

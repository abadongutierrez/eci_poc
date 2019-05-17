import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { IClientProject } from 'app/shared/model/client-project.model';

export interface IEmployeeClientAssignment {
  id?: number;
  usage?: number;
  startDate?: Moment;
  endDate?: Moment;
  employee?: IEmployee;
  project?: IClientProject;
}

export const defaultValue: Readonly<IEmployeeClientAssignment> = {};

import { Moment } from 'moment';
import { ISkill } from 'app/shared/model/skill.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IEmployeeSkill {
  id?: number;
  years?: number;
  startDate?: Moment;
  skill?: ISkill;
  employee?: IEmployee;
}

export const defaultValue: Readonly<IEmployeeSkill> = {};

import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export const enum KeyDateType {
  ACADEMY = 'ACADEMY',
  ACADEMY_PLUS = 'ACADEMY_PLUS',
  EMPLOYEE = 'EMPLOYEE',
  TALENT_INCUBATOR = 'TALENT_INCUBATOR',
  NO_CLIENT_POOL = 'NO_CLIENT_POOL'
}

export interface IKeyDate {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  type?: KeyDateType;
  employee?: IEmployee;
}

export const defaultValue: Readonly<IKeyDate> = {};

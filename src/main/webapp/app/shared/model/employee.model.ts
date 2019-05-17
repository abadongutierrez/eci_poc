import { Moment } from 'moment';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { IKeyDate } from 'app/shared/model/key-date.model';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { IEmployeeClientAssignment } from 'app/shared/model/employee-client-assignment.model';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
import { IEmployeeBudgetAssignment } from 'app/shared/model/employee-budget-assignment.model';
import { IEmployee } from 'app/shared/model/employee.model';

export const enum LocationType {
  CDMX = 'CDMX',
  HMO = 'HMO',
  CUU = 'CUU',
  SLP = 'SLP',
  MERIDA = 'MERIDA',
  REMOTE = 'REMOTE'
}

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IEmployee {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthday?: Moment;
  role?: string;
  location?: LocationType;
  experienceStartYear?: number;
  active?: boolean;
  gender?: Gender;
  contactInfo?: IContactInfo;
  keyDates?: IKeyDate[];
  nextOfKins?: INextOfKin[];
  assignments?: IEmployeeClientAssignment[];
  skills?: IEmployeeSkill[];
  budgets?: IEmployeeBudgetAssignment[];
  manager?: IEmployee;
}

export const defaultValue: Readonly<IEmployee> = {
  active: false
};

import { IEmployee } from 'app/shared/model/employee.model';

export const enum KinshipType {
  SPOUSE = 'SPOUSE',
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
  BROTHER = 'BROTHER',
  SISTER = 'SISTER',
  OTHER = 'OTHER'
}

export interface INextOfKin {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  homeNumber?: string;
  mobileNumber?: string;
  kinship?: KinshipType;
  employee?: IEmployee;
}

export const defaultValue: Readonly<INextOfKin> = {};

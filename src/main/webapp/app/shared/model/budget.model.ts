import { IEmployeeBudgetAssignment } from 'app/shared/model/employee-budget-assignment.model';

export interface IBudget {
  id?: number;
  name?: string;
  assignments?: IEmployeeBudgetAssignment[];
}

export const defaultValue: Readonly<IBudget> = {};

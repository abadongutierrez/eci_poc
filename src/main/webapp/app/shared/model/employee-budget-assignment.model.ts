import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { IBudget } from 'app/shared/model/budget.model';

export interface IEmployeeBudgetAssignment {
  id?: number;
  usage?: number;
  startDate?: Moment;
  endDate?: Moment;
  employee?: IEmployee;
  budget?: IBudget;
}

export const defaultValue: Readonly<IEmployeeBudgetAssignment> = {};

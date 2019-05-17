import { IEmployeeClientAssignment } from 'app/shared/model/employee-client-assignment.model';
import { IClient } from 'app/shared/model/client.model';

export interface IClientProject {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  assignments?: IEmployeeClientAssignment[];
  client?: IClient;
}

export const defaultValue: Readonly<IClientProject> = {};

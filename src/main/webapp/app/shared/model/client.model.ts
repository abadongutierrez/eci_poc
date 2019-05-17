import { IClientProject } from 'app/shared/model/client-project.model';

export interface IClient {
  id?: number;
  name?: string;
  clientProjects?: IClientProject[];
}

export const defaultValue: Readonly<IClient> = {};

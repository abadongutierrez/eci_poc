export interface IContactInfo {
  id?: number;
  email?: string;
  homeNumber?: string;
  mobileNumber?: string;
}

export const defaultValue: Readonly<IContactInfo> = {};

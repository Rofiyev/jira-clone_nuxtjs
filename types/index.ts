export enum EnumStatus {
  "todo" = "todo",
  "in-progress" = "in-progress",
  "produced" = "produced",
  "done" = "done",
}

type UButtonType = "solid" | "ghost" | "soft";

export interface ILink {
  id: number;
  name: string;
  route: string;
  variant: UButtonType;
}

export interface ILoginForm {
  email: string;
  password: string;
}
export interface IRegisterForm extends ILoginForm {
  name: string;
}

export interface IBaseField {
  $createdAt: string;
  $id: string;
}

export interface IComment extends IBaseField {
  text: string;
}

export interface IDeal extends IBaseField {
  name: string;
  status: EnumStatus;
  description: string;
  comments?: IComment[];
}

export interface IColumn {
  id: EnumStatus;
  name: string;
  items: IDeal[];
}

export interface ICreateDeals {
  name: string;
  description: string;
  status: string;
  userId: string;
}

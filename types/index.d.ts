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

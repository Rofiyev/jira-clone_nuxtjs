type UButtonType = "solid" | "ghost" | "soft";

export interface ILink {
  id: number;
  name: string;
  route: string;
  variant: UButtonType;
}

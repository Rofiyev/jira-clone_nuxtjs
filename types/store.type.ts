import type { IDeal } from ".";

export interface User {
  email: string;
  name: string;
  status: boolean;
  id: string;
}

export interface ICurrentDealStore {
  deal: IDeal | null;
  isOpen: boolean;
}

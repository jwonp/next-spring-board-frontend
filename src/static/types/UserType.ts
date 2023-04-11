export interface UserType {
  provider: string;
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface IdentifyType {
  id: string;
  provider: string;
}

export interface User {
  provider: string;
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface Identify {
  id: string;
  provider: string;
}

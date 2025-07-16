interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  companyName?: string;
}

export type { User };
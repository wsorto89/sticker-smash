export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string; catchPhrase: string };
  address: { street: string; city: string; zipcode: string };
};

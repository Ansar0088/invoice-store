export type FormInputs = {
  map(arg0: (invoice: any) => any): unknown;
  id: string;
  streetAddress: string;
  city: string;
  postCode: number;
  country: string;
  ClientsName: string;
  ClientsEmail: string;
  date: string | number; 
  items: {
    ItemName: string;
    Quantity: number;
    price: number;
    total: number;
  }[];
  status: "pending" | "paid" | "draft" | string;
};

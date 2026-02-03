export interface IDestination {
  id?: string;
  name: string;
  location: {
    address: string;
    coordinates: string;
    country: string;
    state: string;
  };
  type: "city" | "country" | "natural";
  description: string;
  images: string[];
  avgCost: number;
  createdAt: Date;
}

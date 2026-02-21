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

export interface DestinationFilter {
  city?: string;
  "min-price"?: number;
  "max-price"?: number;
  "max-distance"?: number;
  "min-rating"?: number;
  "max-rating"?: number;
  type?: string;
}

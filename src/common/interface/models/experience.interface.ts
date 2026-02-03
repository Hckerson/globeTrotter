export interface IExperience {
  id?: string;
  destinationId: string;
  title: string;
  type: string;
  price: {
    min: number;
    max: number;
  };
  rating?: number;
}

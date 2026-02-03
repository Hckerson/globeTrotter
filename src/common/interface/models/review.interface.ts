export interface IReview {
  id?: string;
  userId: string;
  destinationId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

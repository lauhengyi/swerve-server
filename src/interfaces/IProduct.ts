export default interface IProduct {
  name: string;
  price: number;
  description: string;
  category: number;
  subCategory?: number;
  coverImage: string;
  images: string[];
  numLikes: number;
  dateUpdated: Date;
}

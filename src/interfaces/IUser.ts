export default interface IUser {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  followedShops: string[];
  starredProducts: string[];
  ownedShops: string[];
  dateCreated: Date;
  isPublic: boolean;
  isAdmin: boolean;
}

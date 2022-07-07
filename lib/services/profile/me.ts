export type Me = {
  username: string;
  firstName: string;
  lastName: string;
  id: number;
  authorityId: number;
  authorityName: string;
};

export type ProfileUpdate = {
  id: number;
  image: File;
  imageUrl: string;
  password: string;
  confirmPassword: string;
};

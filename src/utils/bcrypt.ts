import * as bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  return bcrypt.hash(data, 10);
};

export const hashDataSync = (data: string, length: number = 8): string => {
  return bcrypt.hashSync(data, length);
};

export const compareDataHash = async (
  data: string,
  hashData: string,
): Promise<boolean> => {
  return bcrypt.compare(data, hashData);
};

export const encodeBase64 = (str: string): string => {
  return btoa(encodeURIComponent(str));
};

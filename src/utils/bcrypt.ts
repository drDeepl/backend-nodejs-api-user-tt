import * as bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  return bcrypt.hash(data, 10);
};

export const compareDataHash = async (
  data: string,
  hashData: string,
): Promise<boolean> => {
  return bcrypt.compare(data, hashData);
};

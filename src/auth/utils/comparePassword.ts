import * as bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

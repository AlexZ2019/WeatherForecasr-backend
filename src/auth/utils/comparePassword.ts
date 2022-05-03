import * as bcrypt from 'bcrypt';

const comparePassword = async (password: string, hash: string) => {
  bcrypt.compareSync(password, hash);
};

export default comparePassword;

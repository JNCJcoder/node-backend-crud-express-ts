import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const encrypt = async (password: string) => (
  await bcrypt.hash(password, salt)
);

export const decrypt = async (password: string, hash: string) => (
  await bcrypt.compare(password, hash)
);

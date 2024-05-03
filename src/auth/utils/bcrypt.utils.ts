import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
  const validUser = await bcrypt.compare(password, hash);
  return validUser;
}
import * as bcrypt from 'bcrypt';

export async function hashData(text: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(text, salt);
}

import { hash } from 'bcrypt';
import type { PasswordHasherPort } from '../../modules/users/application/ports/password-hasher.port.js';

export const createbcryptPasswordHasher = (): PasswordHasherPort => ({
  hash: async (password: string): Promise<string> => {
    return hash(password, 10);
  },
});

import bcrypt from 'bcrypt';

export const dataHash = async (data, saltRounds = 10) => await bcrypt.hash(data, saltRounds);
export const verifyHash = async (unhashed, hashed) => await bcrypt.compare(unhashed, hashed);
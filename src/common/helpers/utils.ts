import { v4 as uuidv4 } from 'uuid';

export const getCurrentDateISO = () => new Date().toISOString();

export const generateId = () => uuidv4();

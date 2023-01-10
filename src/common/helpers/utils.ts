import { v4 as uuidv4 } from 'uuid';

export const getCurrentDateISO = () => new Date().toISOString();

export const generateId = () => uuidv4();

export const getSortDirectionNumber = (sortDirection: string) => (sortDirection === 'asc' ? 1 : -1);

export const sortByField = <T = any[]>(arr: T[], field: keyof T, sortDirection = 'desc') => {
  const sortNum = getSortDirectionNumber(sortDirection);

  return [...arr].sort((a, b) => {
    if (a[field] > b[field]) return sortNum;
    if (a[field] < b[field]) return sortNum === 1 ? -1 : 1;
    else return 0;
  });
};

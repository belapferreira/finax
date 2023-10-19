import { Entry } from '@/types';

export const sortEntries = (entries: Entry[]) => {
  return entries?.sort((a, b) => {
    return (
      Number(new Date(b?.date as string)) - Number(new Date(a?.date as string))
    );
  });
};

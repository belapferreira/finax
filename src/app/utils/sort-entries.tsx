import { Entry } from '@/types';

export const sortEntries = (entries: Entry[]) => {
  return entries?.sort((a, b) => {
    return (
      Number(new Date(b?.createdAt as string)) -
      Number(new Date(a?.createdAt as string))
    );
  });
};

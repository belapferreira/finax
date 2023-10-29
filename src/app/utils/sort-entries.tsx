import { Entry } from '@/types';

interface SortEntriesProps {
  entries: Entry[];
  desc?: boolean;
}

export const sortEntries = ({ entries, desc = true }: SortEntriesProps) => {
  if (desc) {
    return entries?.sort(
      (a, b) =>
        Number(new Date(b?.date as string)) -
        Number(new Date(a?.date as string)),
    );
  } else {
    return entries?.sort(
      (a, b) =>
        Number(new Date(a?.date as string)) -
        Number(new Date(b?.date as string)),
    );
  }
};

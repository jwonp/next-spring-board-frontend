import { DateType } from "@src/static/types/DateType";

export const getDateFromRowDate = (row: string): DateType => {
  // ex) 2023-04-18T13:04:50.935+00:00 to
  const date = row.substring(0, 9);
  const time = row.substring(11, 18);

  return { date: date, time: time };
};

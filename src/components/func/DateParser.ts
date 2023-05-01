import { DateType } from "@src/static/types/DateType";

export const getDateFromRowDateAsObject = (row: string): DateType => {
  // ex) 2023-04-18T13:04:50.935+00:00 to
  const date = row.substring(0, 9);
  const time = row.substring(11, 18);

  return { date: date, time: time };
};

export const getDateFromRowDateAsString = (row: string): string => {
  const date = row.substring(0, 10).split("-");
  const time = row.substring(11, 17).split(":");
  const year = date[0];
  const month = date[1];
  const day = date[2];
  const hour = time[0];
  const minute = time[1];

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

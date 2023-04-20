import { DateType } from "@src/static/types/DateType";

export const getDateFromRowDateAsObject = (row: string): DateType => {
  // ex) 2023-04-18T13:04:50.935+00:00 to
  const date = row.substring(0, 9);
  const time = row.substring(11, 18);

  return { date: date, time: time };
};

export const getDateFromRowDateAsString = (row: string): string => {
  const date = row.substring(0, 9).split("-");
  const time = row.substring(11, 18).split(":");
  const year = Number(date[0]);
  const month = Number(date[1]);
  const day = Number(date[2]);
  const hour = Number(time[0]);
  const minute = Number(time[1]);
  const second = Number(time[2]);
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
};

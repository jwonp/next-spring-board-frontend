import { DateType } from "@src/static/types/DateType";
import { DateTime } from "luxon";

/**
 *
 * @param row ex) 2023-04-18T13:04:50.935+00:00
 * @returns DateType
 */
export const getDateAsObject = (from: string, now: DateTime): DateType => {
  const targetDate = DateTime.fromISO(from.split(".")[0].replace(" ", "T"));

  const diffSeconds = now
    .diff(targetDate, [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject() as DateType;

  return diffSeconds;
};

/**
 *
 * @param row ex) 2023-04-18T13:04:50.935+00:00
 * @returns YYYY.MM.DD HH:MM
 */
export const getDateAsString = (row: string): string => {
  const date = row.substring(0, 10).split("-");
  const time = row.substring(11, 17).split(":");
  const year = date[0];
  const month = date[1];
  const day = date[2];
  const hour = time[0];
  const minute = time[1];

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

/**
 *
 * @param row ex) 2023-04-18T13:04:50.935+00:00
 * @returns ..초전, ..분전, ..시간전, ..일전, YYYY.MM.DD (if, DD > 7)
 */
export const getDateAsShortString = (row: string): string => {
  const date = getDateAsObject(row, DateTime.now());
  if (date.minutes === 0 && date.seconds >= 0) {
    return `${date.seconds.toFixed(0)}초전`;
  }
  if (date.hours === 0 && date.minutes >= 0) {
    return `${date.minutes}분전`;
  }
  if (date.days === 0 && date.hours >= 0) {
    return `${date.hours}시간전`;
  }
  if (date.months === 0 && date.days >= 0) {
    return `${date.days}일전`;
  }
  if (date.days > 7) {
    return `${date.years}.${date.months}.${date.days}`;
  }

  return "";
};

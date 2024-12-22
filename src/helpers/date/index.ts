import dayjs from "dayjs";

export const frenchDateFormat = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

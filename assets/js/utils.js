import dayjs from "dayjs";

export function formatMyDate(date, format = "DD, MMM - YYYY hh:mm a") {

    return dayjs(date).format(format);
  
  }
  
//   const myPreviousDate =  formatMyDate("2024-02-24T20:18", "DD, MMM - YY, hh:mm a")
//   console.log(myPreviousDate);
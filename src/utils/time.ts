import dayjs from "dayjs";

export const showTimeDifference = (createdTime: string) => {
  const createTime = dayjs(createdTime); // Replace with your actual created-time

  // Get the current time
  const currentTime = dayjs();
  const timeDifference = currentTime.diff(createTime);

  // Extract the days, hours, minutes, and seconds from the duration
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return {
    seconds,
    minutes,
    hours,
    days,
  };
};

export const showTime = (createTime: string) => {
  const { days, hours, minutes } = showTimeDifference(createTime);
  if (days) return `${days} day ago`;
  if (hours) return `${hours} hour ago`;
  return `${minutes} minute ago`;
};

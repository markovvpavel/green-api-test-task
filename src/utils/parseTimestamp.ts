export const parseTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};

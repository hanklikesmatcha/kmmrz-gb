export const formatTime = (value: number): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const days = Math.floor(value / 86400); // 1 day = 24 hours * 60 minutes * 60 seconds
  const hours = Math.floor((value % 86400) / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;
  return `${days}d:${pad(hours)}h:${pad(minutes)}m:${pad(seconds)}s`;
};

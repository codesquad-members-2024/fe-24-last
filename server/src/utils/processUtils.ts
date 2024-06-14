export const printErrorAndExit = (error: Error) => {
  console.error(error);
  process.exit(1);
};

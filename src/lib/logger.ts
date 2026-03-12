export const logger = {
  log: (message: string, body: unknown = "") => {
    if (process.env.NODE_ENV === "development") {
      console.log(message, body);
    }
  },

  error: (message: string, body: unknown = "") => {
    if (process.env.NODE_ENV === "development") {
      console.error(message, body);
    }
  },
};

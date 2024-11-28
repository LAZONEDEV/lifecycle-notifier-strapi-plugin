export const strapiGetTokenInterceptor = (options: RequestInit) => {
  if (!options.headers) {
    options.headers = {} as Record<string, string>;
  }

  options.headers = {
    ...options.headers,
  };

  return options;
};

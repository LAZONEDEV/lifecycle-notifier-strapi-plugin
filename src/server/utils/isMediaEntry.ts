export const isMediaEntry = (entry: any) => {
  if (typeof entry === "object" && entry.url) {
    return true;
  }
  return false;
};

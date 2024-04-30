export function resolveWithDelay<T>(delay: number, payload: T | null = null) {
  return new Promise<T | null>((resolve) =>
    setTimeout(() => {
      resolve(payload);
    }, delay)
  ); 
}

declare module '@strapi/strapi/admin' {
  export function useAuth(pluginId: string, selector: (state: any) => string): string;
}

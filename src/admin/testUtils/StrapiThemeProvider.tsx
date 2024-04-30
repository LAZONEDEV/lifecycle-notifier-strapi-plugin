import React from "react";
import { DesignSystemProvider, lightTheme } from "@strapi/design-system";

const StrapiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DesignSystemProvider
      locale="en-GB"
      theme={lightTheme}
    >{children}</DesignSystemProvider>
  );
};

export default StrapiThemeProvider

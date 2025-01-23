import React from "react";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
export default App;

/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { AnErrorOccurred } from "@strapi/helper-plugin";
import React from "react";
import { Route, Routes } from "react-router-dom";
import pluginId from "../../../common/utils/pluginId";
import HomePage from "../HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={`/plugins/${pluginId}`} element={<HomePage />} />
        <Route element={AnErrorOccurred} />
      </Routes>
    </div>
  );
};

export default App;

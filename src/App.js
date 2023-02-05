import React from "react";
import HomePage from "./components/HomePage";
import Country from "./components/Country";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<HomePage/>} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/country/:name"  element={<Country />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

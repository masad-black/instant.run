import { BrowserRouter, Routes, Route } from "react-router-dom";

import Compiler from "./pages/Compiler";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Compiler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

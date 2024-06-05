import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pages from "./pages/Pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

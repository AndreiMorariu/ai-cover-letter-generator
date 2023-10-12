import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./Pages/HomePage.jsx";

import PdfViewerComponent from "./components/PdfViewerComponent.jsx";

import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client/" element={<HomePage />} />
        <Route
          path="/client/cover-letter/"
          element={<PdfViewerComponent document="/output.pdf" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

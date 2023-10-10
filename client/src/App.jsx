import { useState } from "react";

import Hero from "./components/Hero.jsx";
import Form from "./components/Form.jsx";

import PdfViewerComponent from "./components/PdfViewerComponent";

import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

function App() {
  const [ready, isReady] = useState(false);
  return (
    <>
      <Hero />
      <Form isReady={isReady} />
      {ready && (
        <div className="PDF-viewer w-1/2 mx-auto my-20">
          <PdfViewerComponent document="/output.pdf" />
        </div>
      )}
    </>
  );
}

export default App;

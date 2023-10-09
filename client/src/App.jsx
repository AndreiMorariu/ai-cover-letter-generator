import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Hero from "./components/Hero.jsx";
import Form from "./components/Form.jsx";
import PDFDocument from "./components/PDFDocument.jsx";

function App() {
  const [text, setText] = useState("");
  return (
    <>
      <Hero />
      <Form setText={setText} />
      {/*{text && (*/}
      {/*  <PDFViewer>*/}
      {/*    <MyDocument text={text} />*/}
      {/*  </PDFViewer>*/}
      {/*)}*/}
      {text && (
        <PDFDownloadLink
          document={<PDFDocument text={text} />}
          fileName="output.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      )}
    </>
  );
}

export default App;

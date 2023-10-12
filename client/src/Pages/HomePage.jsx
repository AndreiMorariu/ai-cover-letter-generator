import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Element, animateScroll as scroll } from "react-scroll";

import Hero from "../components/Hero.jsx";
import Form from "../components/Form.jsx";
import Spinner from "../components/Spinner.jsx";

import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

function App() {
  const [ready, isReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ready) {
      scroll.scrollTo(1400);
    }
  }, [ready]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Hero />
      <Form isReady={isReady} setIsLoading={setIsLoading} />
      {ready && (
        <div className="flex justify-center mt-24">
          <Link
            target="_blank"
            to={"/client/cover-letter/"}
            className="cursor-pointer py-2 px-4 mx-auto bg-indigo-600/95 hover:bg-indigo-600/90 font-bold text-white rounded "
          >
            View Cover Letter
          </Link>
        </div>
      )}
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Hero from '../components/Hero.jsx';
import Form from '../components/Form.jsx';
import Spinner from '../components/Spinner.jsx';
import Footer from '../components/Footer.jsx';

import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

function Homepage({
  setData,
  data,
  phoneNumber,
  setPhoneNumber,
  ready,
  isReady,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ready) {
      scroll.scrollTo(1400);
    }
  }, [ready]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('');
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Hero />
      <Form
        isReady={isReady}
        setIsLoading={setIsLoading}
        setError={setError}
        setData={setData}
        data={data}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      {ready && !error ? (
        <div className='flex justify-center mt-24'>
          <Link
            target='_blank'
            to={'/client/cover-letter/'}
            className='cursor-pointer py-2 px-4 mx-auto bg-indigo-600/95 hover:bg-indigo-600/90 font-bold text-white rounded '
          >
            View Cover Letter
          </Link>
        </div>
      ) : (
        <h2 className='text-red-600 text-center text-2xl mt-8 font-bold'>
          {error}
        </h2>
      )}
      <Footer />
    </>
  );
}

export default Homepage;

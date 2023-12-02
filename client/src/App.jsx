import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import MyDocument from './components/MyDocument.jsx';
import HomePage from './Pages/HomePage.jsx';

import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

function App() {
  const [data, setData] = useState({
    coverLetter: [],
    name: '',
    email: '',
    address: '',
    jobTitle: '',
  });

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [ready, isReady] = useState(false);

  return ready ? (
    <PDFViewer className='w-full h-screen'>
      <MyDocument data={data} phoneNumber={phoneNumber} />
    </PDFViewer>
  ) : (
    <HomePage
      ready={ready}
      isReady={isReady}
      setData={setData}
      data={data}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
    />
  );
}

export default App;

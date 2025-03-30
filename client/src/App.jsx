// App-komponenten visar navigeringsfält, sidinnehåll och sidfot
import { Outlet } from 'react-router-dom';

import Navbar from './components/app/Navbar';

import Footer from './components/app/footer';

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
}

export default App
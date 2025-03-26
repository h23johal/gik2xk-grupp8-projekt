import { Outlet } from 'react-router-dom';

import Navbar from './components/app/Navbar';

import Footer from './components/app/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Main Content */}
      <main className="md:pt-20 pb-20 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
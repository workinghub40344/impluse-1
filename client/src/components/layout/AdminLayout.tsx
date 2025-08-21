import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-2">
          <NavLink
            to="/admin"
            end // 'end' is important for the root admin path
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/membership"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Membership Plans
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

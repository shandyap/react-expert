import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncLogoutUser } from '../../states/authUser/action'; // Impor thunk logout

function Navbar() {
  // Ambil authUser dari state Redux
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/login'); // Arahkan ke login setelah logout
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ThreadsApp
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
            }
          >
            Threads
          </NavLink>

          {/* Logika Tampilan: Login atau Logout */}
          {authUser === null ? (
            // Jika BELUM login
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>
          ) : (
            // Jika SUDAH login
            <div className="flex items-center space-x-3">
              <img src={authUser.avatar} alt={authUser.name} title={authUser.name} className="w-8 h-8 rounded-full" />
              <button
                type="button"
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
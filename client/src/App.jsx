import React from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useUser, SignIn } from '@clerk/clerk-react';

import Player from './components/pages/user/Player';
import Genderlist from './components/pages/user/Genderlist';
import Genderviolencedetails from './components/pages/user/Genderviolencedetails';
import Myreports from './components/pages/user/Myreports';
import Home from './components/pages/user/Home';
import Loading from './components/usersection/Loading';

// Admin pages
import Educator from './components/pages/admin/Educator';
import Dashboard from './components/pages/admin/Dashboard';
import Addcourse from './components/pages/admin/Addcourse';
import Mycourses from './components/pages/admin/Mycourses';
import Reports from './components/pages/admin/Reports';
import Navbar from './components/usersection/Navbar';
import Location from './components/pages/user/Location';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useUser();
  return isSignedIn ? element : <Navigate to="/sign-in" />;
};

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <SignIn />; // If user is not signed in, show SignIn page
  }

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isAdminRoute && <Navbar />}
     
      <Routes>
        {/* Home route: Redirect to Home if signed in */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes: Only accessible if signed in */}
        <Route path="/gender-list" element={<ProtectedRoute element={<Genderlist />} />} />
        <Route path="/location/:city" element={<ProtectedRoute element={<Location />} />} />
        <Route path="/gender-list/:input" element={<ProtectedRoute element={<Genderlist />} />} />
        <Route path="/details/:id" element={<ProtectedRoute element={<Genderviolencedetails />} />} />
        <Route path="/my-reports" element={<ProtectedRoute element={<Myreports />} />} />
        <Route path="/player/:courseId" element={<ProtectedRoute element={<Player />} />} />
        <Route path="/loading/:path" element={<ProtectedRoute element={<Loading />} />} />

        {/* Admin Routes: Only accessible if signed in */}
        <Route path="/admin" element={<ProtectedRoute element={<Educator />} />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="add-course" element={<Addcourse />} />
          <Route path="my-courses" element={<Mycourses />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

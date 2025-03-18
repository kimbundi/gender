import React from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useUser, SignIn } from '@clerk/clerk-react';

import Player from './components/pages/user/Player';
import Genderlist from './components/pages/user/Genderlist';
import Genderviolencedetails from './components/pages/user/Genderviolencedetails';
import Myreports from './components/pages/user/Myreports';
import Home from './components/pages/user/Home';
import Loading from './components/usersection/Loading';

import Navbar from './components/usersection/Navbar';
import Location from './components/pages/user/Location';
import Track from './components/usersection/Track';
import Reportid from './components/usersection/Reportid';


// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useUser();
  return isSignedIn ? element : <Navigate to="/sign-in" />;
};

const App = () => {
  const location = useLocation();

  const isReportRoute = location.pathname.startsWith('/my-reports')
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <SignIn />; // If user is not signed in, show SignIn page
  }

  return (
    <div className='text-default min-h-screen bg-white'>

      {!isReportRoute  && <Navbar />}
     
      <Routes>
        {/* Home route: Redirect to Home if signed in */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes: Only accessible if signed in */}
        <Route path="/gender-list" element={<ProtectedRoute element={<Genderlist />} />} />
        <Route path="/location/:city" element={<ProtectedRoute element={<Location />} />} />
        <Route path="/gender-list/:input" element={<ProtectedRoute element={<Genderlist />} />} />
        <Route path="/details/:id" element={<ProtectedRoute element={<Genderviolencedetails />} />} />
        <Route path="/my-reports" element={<ProtectedRoute element={<Myreports />} />} />
        <Route path="/track" element={<ProtectedRoute element={<Track />} />} />
        
        <Route path="/reportid" element={<ProtectedRoute element={<Reportid />} />} />
        <Route path="/player/:courseId" element={<ProtectedRoute element={<Player />} />} />
        <Route path="/loading/:path" element={<ProtectedRoute element={<Loading />} />} />

        
      </Routes>
    </div>
  );
};

export default App;

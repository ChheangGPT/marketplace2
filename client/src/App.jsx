import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Header from './components/Header.jsx';
import Hamburger from './components/hamburger.jsx';
import Home from './views/home.jsx';
import Profile from './views/Profile.jsx';
import Message from './views/Message.jsx';
import Products from './views/Products.jsx';
import About from './views/About.jsx';
import Contact from './views/Contact.jsx';
import Help from './views/Help.jsx';
import Settings from './views/Settings.jsx';
import Log_out from './views/Log_out.jsx';
import Login from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { useEffect, useState } from 'react';


function Layout({ currentUser }) {

  if(currentUser && currentUser.length > 8){
    currentUser = <span className="text-lg">{currentUser}</span>;
  }
  const [ profileData, setProfileData ] = useState(null);

  // PROFILE ON NAVBAR
  useEffect(() => {
    fetch('http://localhost:5000/navprofile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if(data && data.avatar){
          setProfileData(`http://localhost:5000/${data.avatar}`);
        }
      })
      .catch(err => console.error('Nav profile: ', err));
  }, []);
  

  return (
    <>
      <div className='flex justify-between fixed w-screen bg-s_bg items-center p-4'>
        <div className='flex items-center gap-2.5'>
          <Hamburger />
          <Header />
        </div>
        <div className=' mr-0 sm:mr-5 flex items-center gap-4'>
          <h1 className='text-2xl text-white/85 font-bold'>Welcome, {currentUser || 'Guest'} </h1>
          <Link to="/profile" 
                className='flex rounded-full bg-bg size-12 backdrop-blur-3xl text-text text-2xl justify-center items-center'
          >
            {profileData ? (
              <img src={profileData}
                   alt="Profile"
                   className='w-full h-full object-cover rounded-full'
              />
            ) : (
             <FaUser />
            )}
          </Link>
        </div>
      </div>
      <div className='h-screen pt-20'>

        <div className='flex flex-1'>
          <main className='w-full h-full m-4 justify-center flex'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/messages' element={<Message />} />
              <Route path='/products' element={<Products />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/help' element={<Help />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/logout' element={<Log_out />} />
            </Routes>
            </main>
          </div>
        </div>



        
      </>
  );
}

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/current_user', {credentials: 'include'})
      .then(res => res.json())
      .then(data => setCurrentUser(data.user))
      .catch(err => console.error(err));
  }, []);
  return (
      <>
        <Routes>
          {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/sign_up' element={<SignUp />} />
          {/* Protected routes */}
        <Route path="/*" element={<Layout currentUser={currentUser} />} />
      </Routes>
      </>
      );
}
export default App;

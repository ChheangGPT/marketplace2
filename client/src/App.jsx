import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Header from './components/Header.jsx';
import Hamburger from './components/hamburger.jsx';
import Home from './views/home.jsx';
import Profile from './views/Profile.jsx';
import Message from './views/Message.jsx';
import Add from './views/Add.jsx';
import Products from './views/Products.jsx';
import About from './views/About.jsx';
import Contact from './views/Contact.jsx';
import Help from './views/Help.jsx';
import Settings from './views/Settings.jsx';
import Log_out from './views/Log_out.jsx';
import Login from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';


function Layout() {
  return (
    <>


      <div className='flex justify-between fixed w-screen bg-s_bg items-center p-4'>
        <div className='flex items-center gap-2.5'>
          <Hamburger />
          <Header />
        </div>
        <div className=' mr-0 sm:mr-5 flex items-center gap-4'>
          <h1 className='text-2xl text-white/85 font-bold'>Welcome, User </h1>
          <Link to="/login" className='flex rounded-full bg-bg size-12 backdrop-blur-3xl text-text text-2xl justify-center items-center'><FaUser /></Link>
        </div>
      </div>
      <div className='h-screen pt-20'>


        <div className='flex flex-1'>
          <main className='w-full h-full m-4 justify-center flex'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/messages' element={<Message />} />
              <Route path='/add' element={<Add />} />
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
  return (
      <>
        {/* <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign_up' element={<SignUp />} />
      </Routes> */}
        <Layout />
      </>
      );
}
      export default App;

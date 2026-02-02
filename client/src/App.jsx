import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Hamburger from './components/hamburger.jsx'
import Home from './views/home.jsx';

function App() {
  const [activePage, setActivePage] = useState('home');
  return (
    <>
      <div className='grid grid-rows-[auto_1fr] h-screen'>
        <Header />
        <div className='flex flex-1 relative'>
          <aside className='relative '>
            <Hamburger onSelect={setActivePage}/>
          </aside>
          <main className='relative w-full h-full m-4 justify-center flex'>
            {activePage === 'home' && (
              <div> 
                <h1>Welcome to the Marketplace web</h1>
                <Home />
              </div>
            )}
            {activePage === "profile" && <h1>👤 Profile</h1>}
            {activePage === "messages" && <h1>💬 Messages</h1>}
            {activePage === "add" && <h1>➕ Add Product</h1>}
            {activePage === "products" && <h1>📦 My Products</h1>}
            {activePage === "about" && <h1>ℹ️ About</h1>}
            {activePage === "contact" && <h1>📞 Contact</h1>}
            {activePage === "help" && <h1>❓ Help</h1>}
            {activePage === "settings" && <h1>⚙️ Settings</h1>}
            {activePage === "logout" && <h1>🚪 Logging out…</h1>}
          </main>
        </div>
      </div>
    </>
  );
}
export default App;

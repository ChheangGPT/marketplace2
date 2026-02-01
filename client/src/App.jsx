
import './App.css'
import Header from './components/header.jsx'
import Hamburger from './components/hamburger.jsx'

function App() {
  return (
    <div className='grid grid-rows-[auto_1fr] h-screen'>
      <Header />
      <div className='flex flex-1'>
        <aside>
          <Hamburger />
        </aside>
      </div>
    </div>
  );
}
export default App;

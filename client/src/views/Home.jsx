import { useEffect, useState } from "react";


function Home() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
  fetch('/api/message')  // Vite proxy will forward to backend
    .then(res => res.json())
    .then(data => setMsg(data.message));
  }, []);

  return (
    <>
      <h1>Homepage, broski. {msg}</h1>
    </>
  );
}

export default Home;

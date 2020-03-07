import React, { useState }  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState('Loading');

  fetch('/api/user/1')
    .then(res => res.json())
    .then((data) => {
      setData(JSON.stringify(data, null, 2));
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src="/seal.jpg" className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>K2 React CSR</p>
        <pre>{ data }</pre>
      </header>
    </div>
  );
}

export default App;

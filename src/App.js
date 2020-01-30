import React, {useState} from 'react';
import logo from './logo.svg';
import Header from './Header.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header user={user} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bachelor WIP
        </p>
        </header>
    </div>
  );
}

export default App;

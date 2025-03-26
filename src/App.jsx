import { useState } from 'react';
import './App.css';
import Main from './RamenApp/Main';
import { User } from './RamenApp/User';


function App() {

  const [user, setUser] = useState();

  return (
    <>
      <User.Provider value={{ user, setUser }} >
        <Main />
      </User.Provider>
    </>
  )

}

export default App;

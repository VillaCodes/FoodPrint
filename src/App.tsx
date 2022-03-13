import './App.css'
import React, {useState} from 'react'
import LandingPagePopup from './LandingPage/LandingPagePopup'

function App() {
  const [openPopup, setOpenPopup] = useState<boolean>(true);

  function handleClose () {
    setOpenPopup(!openPopup)
  }

  return (
    <div className="App">
      <header>It is time to scream, my dudes</header>
      {openPopup && <LandingPagePopup toggle={handleClose}/>}
    </div>
  ) 
}

export default App
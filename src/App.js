import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = (props) => {
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('light'); 

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042445';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }



  return (
    <div>
      <BrowserRouter>
        <NavBar mode={mode} toggleMode={toggleMode} />

        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}

        />
        <Routes>
          {/* Home Route - Welcome + Top Headlines */}
          <Route exact path="/" element={
            <div className="container my-5">
              <h1 className={`text-center my-4 text-${mode === 'light' ? 'dark' : 'light'}`}>
                Welcome to ShutterNews
              </h1>
              <h3 className={`text-center mb-5 text-${mode === 'light' ? 'muted' : 'light'}`}>
                Your trusted source for latest news around the world
              </h3>
              <h2 className={`text-center mb-4 text-${mode === 'light' ? 'dark' : 'light'}`}>
                Top Headlines
              </h2>
              <News setProgress={setProgress} key="general" country="us" category="general" mode={mode} />
            </div>
          } />

          <Route exact path="/general" element={<News setProgress={setProgress} key="general" country="us" category="general" mode={mode} />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" country="us" category="sports" mode={mode} />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" country="us" category="science" mode={mode} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" country="us" category="entertainment" mode={mode} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" country="us" category="business" mode={mode} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" country="us" category="technology" mode={mode} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" country="us" category="health" mode={mode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

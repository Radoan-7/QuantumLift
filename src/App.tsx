import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import MainApp from './components/MainApp';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      {!showSplash && <MainApp />}
    </>
  );
}

export default App;
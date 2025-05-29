import React from 'react';
import PiggyHabitMainContainer from './components/PiggyHabitMainContainer';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Main app now delegates to the primary PiggyHabit container
  return (
    <div className="app">
      <PiggyHabitMainContainer />
    </div>
  );
}

export default App;
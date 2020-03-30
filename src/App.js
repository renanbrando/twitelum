import React from 'react'
import Header from './components/Header'
import NavMenu from './components/NavMenu'

function App() {
  return (
    <div className="App">
      <Header>
        <NavMenu user="@renabrando" />
      </Header>
    </div>
  );
}

export default App;

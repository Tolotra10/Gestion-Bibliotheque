import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AddBooks from './pages/AddBooks';
import AddUsers from './pages/AddUsers';
import Dashboard from './pages/Dashboard';
import Liste from './pages/Liste';
import Navigation from './pages/Navigation';

const App = () => {
  return (
    <div>
        <div className='routes'>
          <Navigation/>
          <Routes>
            <Route path='/' element={<Liste/>}/>
            <Route path='/addBooks' element={<AddBooks/>}/>
            <Route path='/addUsers' element={<AddUsers/>}/>
            <Route path='/update/:id' element={<AddBooks/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </div>
    </div>
  );
};

export default App;
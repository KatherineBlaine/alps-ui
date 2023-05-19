// import React, { useState } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Form from '../Form/Form';
import Feedback from '../Feedback/Feedback';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IUsers, IUser } from '../../Utilities/interfaces';
import { useState, useEffect } from 'react';
import { getUsers, getUser } from '../../Utilities/api-calls';

const App = () => {

  const initialUsers = {
    data: []
  }

  
  const [users, setUsers] = useState<IUsers | null>(initialUsers)
  const [user, setUser] = useState<IUser | null>(null)
  
  const resetUser = () => {
    setUser(null)
  }

  const setUserData = (userId: string) => {
    getUser(userId)
      .then(data=> setUser(data))
  }

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
  }, [])

  return (
    <>
      <Header userName={user?.data.attributes.name}/>
      <Routes>
        <Route path='/' element={users !== null && <Home allUsers={users} setUserData={setUserData} resetUser={resetUser}/>} />
        <Route path='/:userName/dashboard' element={user !== null && <Dashboard user={user}/>}/>
        <Route
          path='/:userName/new-challenge'
          element={<Form 
            userName={user?.data.attributes.name}
            language={user?.data.attributes.preferred_lang}
            userId={user?.data.id}
          />} 
        />
        <Route path='/Deniz/feedback/:id' element={<Feedback />} />
      </Routes>
    </>
  );
}

export default App;
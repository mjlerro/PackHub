import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ViewPacks from './components/ViewPacks';
import Hub from './components/Hub';
import Login from './components/Login';
import Signup from './components/Signup';
import Settings from './components/Settings';

export default function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);

  // On App load, check if user is logged in or not through localStorage
  // currentUser is auto loaded with React's useState() hook
  useEffect(() => {
    if (currentUser) {
      currentUser.displayName ? setIsLoggedIn(true) : setIsLoggedIn(false);
      getMyPacks().then(body => {
        setAllPacks(body.filter(p => p.invitedMembers.includes(currentUser.displayName) || p.joinedMembers.includes(currentUser.displayName) || p.owner === currentUser.displayName));
      });
    }
  }, [currentUser]);

  
  const getMyPacks = async () => {
    const response = await fetch('/api/packs');
    
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message)
    return body;
  };

  const [allPacks, setAllPacks] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() =>
            <>
              {isLoggedIn ? (
                <Redirect to='/mypacks' />
              ) : (<>
                <Redirect to='/' />
                <Hub isLoggedIn={isLoggedIn} currentUser={currentUser} />
              </>)}
            </>
          } />
          <Route path='/mypacks/:id' render={() =>
            <>
              {isLoggedIn ? (
                <>
                  <ViewPacks currentUser={currentUser} allPacks={allPacks} createPack={false} joinPack={false} />
                </>
              ) : (<Redirect to='/login' />)}
            </>
          } />
          <Route exact path='/mypacks' render={() =>
            <>
              {isLoggedIn ? (
                <>
                  <Redirect to='/mypacks' />
                  <ViewPacks currentUser={currentUser} allPacks={allPacks} createPack={false} joinPack={false} />
                </>
              ) : (<Redirect to='/login' />)}
            </>
          } />
          <Route exact path='/createpack' render={() =>
            <>
              {isLoggedIn ? (
                <>
                  <Redirect to='/createpack' />
                  <ViewPacks currentUser={currentUser} createPack={true} joinPack={false} />
                </>
              ) : (<Redirect to='/login' />)}
            </>
          } />
          <Route exact path='/joinpack' render={() =>
            <>
              {isLoggedIn ? (
                <>
                  <Redirect to='/joinpack' />
                  <ViewPacks currentUser={currentUser} allPacks={allPacks} setAllPacks={setAllPacks} createPack={false} joinPack={true} />
                </>
              ) : (<Redirect to='/login' />)}
            </>
          } />
          <Route exact path='/settings' render={() =>
            <>
              {isLoggedIn ? (
                <>
                  <Redirect to='/settings' />
                  <Settings currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                </>
              ) : (<Redirect to='/login' />)}
            </>
          } />
          <Route exact path='/login' render={() => <Login setCurrentUser={setCurrentUser} />} />
          <Route exact path='/signup' render={() => <Signup setCurrentUser={setCurrentUser} />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

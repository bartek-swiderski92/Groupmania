// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import UserProfile from './UserProfile';
import Footer from './Footer';
import Redirect from './Redirect';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { BrowserRouter, Switch, Routecls, Redirect } from 'react-router-dom';
import '../styles/App.css';

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserLoggedIn(true)
        } else {
            setUserLoggedIn(false)
        }
    }, [])

    return (
        <div className="groupmania">
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header userLoggedIn={userLoggedIn} />
                        <div className="main-content">
                            <React.Suspense fallback={<span>Loading...</span>} />
                            {/* <Route exact path="/" component={NewsFeed} /> */}
                            {/* <Route path="/newsfeed" component={NewsFeed} /> */}
                            {/* <Route path="/post/:id" component={SinglePost} /> */}
                            {/* <Route path="/user/:id" component={UserProfile} /> */}
                            <Route exact path="/">
                                {!userLoggedIn ? <Redirect to="/login" /> : <NewsFeed />}
                            </Route>
                            <Route path="/newsfeed" >
                                {!userLoggedIn ? <Redirect to="/login" /> : <NewsFeed />}
                            </Route>
                            <Route path="/post/:id" >
                                {!userLoggedIn ? <Redirect to="/login" /> : <SinglePost />}
                            </Route>
                            <Route path="/user/:id">
                                {!userLoggedIn ? <Redirect to="/login" /> : <UserProfile />}
                            </Route>
                            <Route path="/login">
                                {userLoggedIn ? <Redirect to="/newsfeed" /> : <Login />}
                            </Route>
                            <Route path="/redirect" component={Redirect} />
                        </div>
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

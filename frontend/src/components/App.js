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
    const [userLoggedIn, setUserLoggedIn] = useState('0')
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserLoggedIn(0)
        } else {
            setUserLoggedIn(1)
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
                            <Route path="/login" component={Login} />
                            <Route exact path="/" component={NewsFeed} />
                            <Route path="/newsfeed" component={NewsFeed} />
                            <Route path="/post/:id" component={SinglePost} />
                            <Route path="/user/:id" component={UserProfile} />
                            <Route path="/redirect" component={Redirect} />
                            {/* <Route exact path="/">
                            {loggedin ? <Redirect to="/newsfeed" /> : <Login />}
                        </Route> */}
                            {/* <Route exact path="/newsfeed" > */}
                            {/* {!loggedin ? <Redirect to="/login" /> : <NewsFeed />}
                        </Route>
                        <Route path="/post/:id" >
                            {!loggedin ? <Redirect to="/login" /> : <SinglePost />}
                        </Route> */}
                            {/* <Route path="/user/:id" component={UserProfile} >
                            {!loggedin ? <Redirect to="/login" /> : <UserProfile />}
                        </Route> */}
                        </div>
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

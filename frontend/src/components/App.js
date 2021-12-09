import React from 'react'
// import logo from './logo.svg';
// import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import UserProfile from './UserProfile';
import Footer from './Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { BrowserRouter, Switch, Routecls, Redirect } from 'react-router-dom';
import '../styles/App.css';

function App() {
    // const [loggedin, userLoggedin] = useState(false)
    // useEffect(() => {
    //     if (localStorage.getItem('token') != null) {
    //         userLoggedin(true)
    //     } else {
    //         userLoggedin(false)
    //     }
    // }, [])

    return (
        <div className="groupmania">
            <Header />
            <BrowserRouter>
                <Switch>
                    <div className="main-content">
                        <React.Suspense fallback={<span>Loading...</span>} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={NewsFeed} />
                        <Route path="/newsfeed" component={NewsFeed} />
                        <Route path="/post/:id" component={SinglePost} />
                        <Route path="/user/:id" component={UserProfile} />
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
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

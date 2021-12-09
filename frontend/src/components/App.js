// import logo from './logo.svg';
import '../styles/App.css';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import Footer from './Footer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
    const [loggedin, userLoggedin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            userLoggedin(true)
        } else {
            userLoggedin(false)
        }
    }, [])

    return (
        <div className="groupmania">
            <Header />
            <BrowserRouter>
                <Switch>
                    <div className="main-content">
                        <React.Suspense fallback={<span>Loading...</span>} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/newsfeed" component={NewsFeed} />
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

// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import NewPost from './NewPost';
import UserProfile from './UserProfile';
import Footer from './Footer';
import RedirectComponent from './RedirectComponent';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
    }, [userLoggedIn])

    const updatestate = (vlaue) => {
        setUserLoggedIn(vlaue)
    }

    return (
        <div className="groupmania">
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header userLoggedIn={userLoggedIn} updatestate={(val) => updatestate(val)} />
                        <div className="main-content">
                            <React.Suspense fallback={<span>Loading...</span>} />
                            {/* <Route exact path="/" component={NewsFeed} /> */}
                            {/* <Route path="/newsfeed" component={NewsFeed} /> */}
                            {/* <Route path="/post/:id" component={SinglePost} /> */}
                            {/* <Route path="/user/:id" component={UserProfile} /> */}
                            <Route exact path="/">
                                {!userLoggedIn ? <Redirect to="/login" updatestate={(val) => updatestate(val)} /> : <NewsFeed userLoggedIn={userLoggedIn} />}
                            </Route>
                            <Route path="/newsfeed" >
                                {userLoggedIn ? <NewsFeed userLoggedIn={userLoggedIn} /> : <Redirect to="/login" updatestate={(val) => updatestate(val)} />}
                            </Route>
                            <Route path="/post/:id" >
                                {userLoggedIn ? <SinglePost userLoggedIn={userLoggedIn} /> : <Redirect to="/login" updatestate={(val) => updatestate(val)}/>}
                            </Route>
                            <Route path="/user/:id">
                                {/* {!userLoggedIn ? <Redirect to="/login" /> :  */}
                                <UserProfile />
                            </Route>
                            <Route path="/login" updatestate={(val) => updatestate(val)}>
                                {userLoggedIn ? <Redirect to="/newsfeed" /> : <Login updatestate={(val) => updatestate(val)} />}
                            </Route>
                            <Route path="/redirect" component={RedirectComponent} userLoggedIn={userLoggedIn} />
                            <Route path="/edit/:id">
                                <NewPost editPost={true} />
                            </Route>
                        </div>
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

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
    const [userLoggedIn, setUserLoggedIn] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserLoggedIn(true)
        } else {
            setUserLoggedIn(false)
        }
    }, [userLoggedIn])

    const updateState = (value) => {
        setUserLoggedIn(value)
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        updateState(false)
    }

    return (
        <div className="groupmania">
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header userLoggedIn={userLoggedIn} updateState={(val) => updateState(val)} logout={logout} />
                        <div className="main-content">
                            <React.Suspense fallback={<span>Loading...</span>} />
                            <Route exact path="/">
                                {!userLoggedIn ? <Redirect to="/login" updateState={(val) => updateState(val)} /> : <NewsFeed userLoggedIn={userLoggedIn} />}
                            </Route>
                            <Route path="/newsfeed" >
                                {userLoggedIn ? <NewsFeed userLoggedIn={userLoggedIn} /> : <Redirect to="/login" updateState={(val) => updateState(val)} />}
                            </Route>                            
                            <Route path="/unread" >
                                {userLoggedIn ? <NewsFeed userLoggedIn={userLoggedIn} unread={true}/> : <Redirect to="/login" updateState={(val) => updateState(val)} />}
                            </Route>
                            <Route path="/post/:id" >
                                {userLoggedIn ? <SinglePost userLoggedIn={userLoggedIn} /> : <Redirect to="/login" updateState={(val) => updateState(val)} />}
                            </Route>
                            <Route path="/user/:id">
                                {userLoggedIn ? <UserProfile userLoggedIn={userLoggedIn} logout={logout} /> : <Redirect to="/login" updateState={(val) => updateState(val)} />}
                            </Route>
                            <Route path="/login" updateState={(val) => updateState(val)}>
                                {userLoggedIn ? <Redirect to="/newsfeed" /> : <Login updateState={(val) => updateState(val)} />}
                            </Route>
                            <Route path="/edit/post/:id">
                                <NewPost editPost={true} />
                            </Route>
                            <Route path="/redirect" component={RedirectComponent} userLoggedIn={userLoggedIn} />
                        </div>
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

// import logo from './logo.svg';
import '../styles/App.css';
import React from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import Footer from './Footer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
    return (
        <div className="groupmania">
            <Header />
            <BrowserRouter>
                <Switch>
                    <div className="main-content">
                        <React.Suspense fallback={<span>Loading...</span>} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/">
                            {localStorage.getItem('token') ? <Redirect to="/newsfeed" /> : <Login />}
                        </Route>
                        <Route exact path="/newsfeed" >
                            {!localStorage.getItem('token') ? <Redirect to="/login" /> : <NewsFeed />}
                        </Route>
                        <Route path="/post/:id" >
                            {!localStorage.getItem('token') ? <Redirect to="/login" /> : <SinglePost />}
                        </Route>
                        <Route path="/user/:id" component={UserProfile} >
                            {!localStorage.getItem('token') ? <Redirect to="/login" /> : <UserProfile />}
                        </Route>
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

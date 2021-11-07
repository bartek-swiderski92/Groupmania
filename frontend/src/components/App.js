// import logo from './logo.svg';
import '../styles/App.css';
import React from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import SinglePost from './SinglePost';
import Footer from './Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="groupmania">
            <Header />
            <BrowserRouter>
                <Switch>
                    <div className="main-content">
                        <React.Suspense fallback={<span>Loading...</span>} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={NewsFeed} />
                        <Route path="/post/:id" component={SinglePost} />
                    </div>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    )

}

export default App;

// import logo from './logo.svg';
import '../styles/App.css';
import React from 'react'
import Header from './Header'
import Login from './Login'
import NewsFeed from './NewsFeed';
import Footer from './Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="groupmania">
            <Header />
            <BrowserRouter>
                <Switch>
                    <React.Suspense fallback={<span>Loading...</span>} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>

            <div className="main-content">
                {/* <Login /> */}
                <NewsFeed />
            </div>
            <Footer />
        </div>
    )

}

export default App;

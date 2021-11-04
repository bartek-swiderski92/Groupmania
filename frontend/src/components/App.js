// import logo from './logo.svg';
import '../styles/App.css';
import Header from './Header'
// import Login from './Login'
import NewsFeed from './NewsFeed';
import Footer from './Footer'

function App() {
    return (
        <div className="groupmania">
            <Header />
            <div className="main-content">
                {/* <Login /> */}
                <NewsFeed />
            </div>
            <Footer />
        </div>
    )

}

export default App;

// import logo from './logo.svg';
import '../styles/App.css';
import Header from './Header'
import Footer from './Footer'
import NewsFeed from './NewsFeed';

function App() {
    return (
        <div className="groupmania">
            <Header />
            <div className="main-content">
                <NewsFeed />
            </div>
            <Footer />
        </div>
    )

}

export default App;

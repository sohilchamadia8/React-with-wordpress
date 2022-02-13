import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Post from './components/Post'
import PostDetail from './components/PostDetail'
import Userprofile from './components/Userprofile'
import Addpost from './components/Addpost'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/SinglePost/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/addpost" element={<Addpost />} />
        </Routes>
      </Router>


    </>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Layout from './Layout'
import NoPage from './pages/NoPage'
import User from './pages/User'
import Login from "./pages/Login";
import Post from "./pages/Post";
import CookieInterceptor from 'cookie-interceptor';
import Newest from "./pages/Newest";
import Search from "./pages/Search";

function App() {

  CookieInterceptor.init();
 
  CookieInterceptor.read.use(function (cookie) {
    console.log('logger: ', cookie)
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/newest" element={<Newest />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.scss';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import PostItem from './components/PostItem';
import EditPage from './pages/AdminPanelPage/EditPage';
import { useEffect } from 'react';


function App() {
  if (window.location.pathname === '/adminpanel') {
    <Link to={'/adminpanel'}></Link>
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/adminpanel' element={<AdminPanelPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='/post/:id' element={<PostItem />} />
      </Routes>
    </>
  );
}

export default App;

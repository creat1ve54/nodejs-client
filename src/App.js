import './App.scss';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import PostItem from './components/PostItem';
import EditPage from './pages/AdminPanelPage/EditPage';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  let history = useHistory();

  useEffect(() => {
    history.push("/adminpanel");
  }, [history])

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

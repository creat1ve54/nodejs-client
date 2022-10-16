import './App.scss';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import PostItem from './components/PostItem';
import EditPage from './pages/AdminPanelPage/EditPage';

function App() {
  window.location.replace("https://lucent-cupcake-286300.netlify.app/adminpanel");
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

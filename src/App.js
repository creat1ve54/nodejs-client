import './App.scss';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import PostItem from './components/PostItem';
import EditPage from './pages/AdminPanelPage/EditPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='https://lucent-cupcake-286300.netlify.app' element={<MainPage />} />
        <Route path='https://lucent-cupcake-286300.netlify.app/adminpanel' element={<AdminPanelPage />} />
        <Route path='https://lucent-cupcake-286300.netlify.app/edit/:id' element={<EditPage />} />
        <Route path='https://lucent-cupcake-286300.netlify.app/post/:id' element={<PostItem />} />
      </Routes>
    </>
  );
}

export default App;

import './App.scss';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import PostItem from './components/PostItem';
import EditPage from './pages/AdminPanelPage/EditPage';
import { useCallback, useEffect, useState } from 'react';


function App() {

  const [isKey, setIsKay] = useState(false)

  const navigate = useNavigate()

  const downHandler = useCallback(({ key }) => {
    if (key === 'Shift') {
      setIsKay(true)
    }
    if (key === '~' && isKey) {
      navigate('/adminpanel')
    }
  }, [isKey, navigate])

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
  }, [downHandler])


  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/adminpanel' element={<AdminPanelPage />} />
        <Route path='/adminpanel-us' element={<Navigate to='/adminpanel' replace />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='/post/:id' element={<PostItem />} />
      </Routes>
    </>
  );
}

export default App;

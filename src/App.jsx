// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ArticleList from './pages/ArticleList/ArticleList'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'
import EditComment from './pages/EditComment/EditComment'
import PersonalDictionary from './pages/PersonalDictionary/PersonalDictionary'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as articleService from './services/articleService'
import * as profileService from './services/profileService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [articles, setArticles] = useState([])
  // const [dictionary, setDictionary] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    const fetchArticles = async () => {
      const data = await articleService.index()
      setArticles(data)
    }
    if (user) fetchArticles()
  }, [user])

  // useEffect(()=> {
  //   const fetchDictionary = async () => {
  //     const data = await profileService.indexDictionary()
  //     setDictionary(data)
  //     console.log(data)
  //   }
  //   if (user) fetchDictionary()
  // }, [user, dictionary])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path='/articles'
          element={
            <ProtectedRoute user={user}>
              <ArticleList articles={articles} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/articles/:articleId'
          element={
            <ProtectedRoute user={user}>
              <ArticleDetails user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/articles/:articleId/comments/:commentId'
          element={
            <ProtectedRoute user={user}>
              <EditComment/>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path='/' 
          element={<Landing user={user} />} 
        />
        <Route
          path='/words/:profileId/dictionary'
          element={
            <ProtectedRoute user={user}>
              <PersonalDictionary user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profiles'
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path='/auth/signup'
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path='/auth/login'
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path='/auth/change-password'
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

import React from 'react'
// import { BrowserRouter, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './ui_components/AppLayout'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import DetailsPage from '@/pages/DetailPage'
import SignUpPage from './pages/SignUpPage'
import CreatePostPage from './pages/CreatePostPage'
// import { Routes } from 'react-router-dom'
import ProtectedRoute from './ui_components/ProtectedRouter';
import {
  useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import {getUsername} from '@/services/apiBlog'
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient()
const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <MainApp/>
    </QueryClientProvider>
  )
}

const MainApp = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        console.log('data: ', data)
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout isAuthenticated= {isAuthenticated} username = {username} setIsAuthenticated ={setIsAuthenticated} setUsername = {setUsername} />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="blogs/:slug" element={<DetailsPage username={username} isAuthenticated={isAuthenticated}/>} />
          <Route path="signup/" element={<SignUpPage />} />
          <Route path="signin/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="profile/:username" element={<ProfilePage authUsername = {username}/>} />
          <Route path="createpost" element={<ProtectedRoute><CreatePostPage isAuthenticated={isAuthenticated} /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
  // logic query, useEffect ở đây
};

export default App
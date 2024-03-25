import { Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/UserPage/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import Logout from './components/UserPage/Logout';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePost from './components/PostPage/CreatePost';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        ></Route>
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        ></Route>
        <Route path="/:username" element={<UserPage />}></Route>
        <Route path="/:username/post/:pid" element={<PostPage />}></Route>
      </Routes>
      {user && <Logout />}
      {user && <CreatePost />}
      {/* clear cookies with fetch req, clear local storage,clear state */}
    </Container>
  );
}

export default App;

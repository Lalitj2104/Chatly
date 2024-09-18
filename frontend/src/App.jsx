import React,{lazy, Suspense} from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import RouteProtect from './components/Auth/RouteProtect'
import { LayoutLoader } from './components/layout/Loaders.jsx'



const Home = lazy(()=>import('./pages/Home'))
const Login =lazy(()=>import('./pages/Login'))
const Chat = lazy(()=>import ('./pages/Chat'))
const Group = lazy(()=>import('./pages/Group'))
const AdminLogin = lazy(()=>import('./pages/admin/AdminLogin'))
const Notfound = lazy(()=>import('./pages/Notfound'))



let user=true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
      <Route element={<RouteProtect user={user}/>}>
        <Route path="/" element={<Home />}/> 
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/groups" element={<Group />} />
      </Route>
        <Route path ="/login" element={<RouteProtect user={!user} redirect="/">
        <Login />
        </RouteProtect>}/>

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="*" element={<Notfound/>} />
        
      </Routes>
      </Suspense>
    </BrowserRouter>

  );
};

export default App; 

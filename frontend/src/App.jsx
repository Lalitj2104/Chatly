import React,{lazy, Suspense, useEffect} from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import RouteProtect from './components/Auth/RouteProtect'
import { LayoutLoader } from './components/layout/Loaders.jsx'
import axios from "axios"
import { server } from './constants/config.js'
import {Toaster} from "react-hot-toast"

const Home = lazy(()=>import('./pages/Home'))
const Login =lazy(()=>import('./pages/Login'))
const Chat = lazy(()=>import ('./pages/Chat'))
const Group = lazy(()=>import('./pages/Group'))
const AdminLogin = lazy(()=>import('./pages/admin/AdminLogin'))
const Notfound = lazy(()=>import('./pages/Notfound'))
const Dashboard = lazy(()=>import('./pages/admin/Dashboard'))
const UserManagement = lazy(()=>import('./pages/admin/UserManagement'))
const ChatManagement = lazy(()=>import('./pages/admin/ChatManagement'))
const MessageManagement = lazy(()=>import('./pages/admin/MessageManagement'))
import {useDispatch, useSelector} from "react-redux"
import { userExists,userNotExists } from './redux/reducers/auth.js'


const App = () => {
  
  const {user,loader}=useSelector(state=>state.auth)

  const dispatch=useDispatch();


  useEffect(()=>{
    axios.get(`${server}/api/v1/user/me`,{withCredentials:true}).then(res=>dispatch(userExists(res.data.user)))
    .catch((err)=>dispatch(userNotExists()))
  },[dispatch])
  return loader?<LayoutLoader/>: (
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
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/chats" element={<ChatManagement />} />
        <Route path="/admin/messages" element={<MessageManagement />} />
        <Route path="*" element={<Notfound/>} />
        
      </Routes>
      </Suspense>
      <Toaster position="Bottom-center"/>
    </BrowserRouter>

  );
};

export default App; 

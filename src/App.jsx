import { useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import authservice from './appwrite/auth'
import { Outlet } from 'react-router-dom'
import {Header} from './components'
import {Footer} from './components'

function App() {
  const [loading,setloading] = useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authservice.getCurrentuser()
    .then((UserData) => {
      if(UserData){
        dispatch(login({UserData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))
  },[])
  
  return !loading ? (
    <div className="min-h-screen w-screen flex flex-col bg-gray-400 mx-0 px-0">
     <Header className="w-full px-0"/>
     <div className="flex-1 flex flex-col">
     <main className="flex-1 w-full px-0">
      <Outlet />
     </main>
     </div>
     <Footer />
     </div>
    ):null

}

export default App
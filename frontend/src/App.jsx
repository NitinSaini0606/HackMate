import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route,useParams} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import View from './Components/View'
import Notifications from './Components/Notifications'
import ChatPage from './Components/ChatPage'



const ChatPageWrapper = () => {
  const { chatWithUserId } = useParams();
  const currentUserId = localStorage.getItem("userId");

  return <ChatPage currentUserId={currentUserId} chatWithUserId={chatWithUserId} />;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view" element={<View />} />
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat/:chatWithUserId" element={<ChatPageWrapper />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { React, Suspense, lazy } from "react";

import LazyLoad from "./Pages/LazyLoad";
import ChatScreen from "./Pages/ChatScreen";
import LoginOrRegister from "./Pages/LoginOrRegister";
import { useSelector } from 'react-redux'





function App() {
  const token=useSelector((state)=>state.userSlice.token)

  return (
   <div>

<Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoad />}>
                <LoginOrRegister/>{" "}
              </Suspense>
            }
          />
           <Route
            path="/chat"
            element={token ?
              <Suspense fallback={<LazyLoad />}>
                <ChatScreen/>{" "}
              </Suspense>
              :  <Suspense fallback={<LazyLoad />}>
              <LoginOrRegister/>{" "}
            </Suspense>

            }
          />
           </Routes>
             </Router>
   </div>
  )
}

export default App

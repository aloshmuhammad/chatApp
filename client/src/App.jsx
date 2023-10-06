import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { React, Suspense, lazy } from "react";

import LazyLoad from "./Pages/LazyLoad";
import ChatScreen from "./Pages/ChatScreen";
import LoginOrRegister from "./Pages/LoginOrRegister";




function App() {

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
            element={
              <Suspense fallback={<LazyLoad />}>
                <ChatScreen/>{" "}
              </Suspense>
            }
          />
           </Routes>
             </Router>
   </div>
  )
}

export default App

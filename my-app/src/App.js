import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupModal from './component/signup_component';
import Login from './component/login_component';
import ForgotPassword from './component/forgetpassword_component';

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={ <SignupModal/>}/>
            <Route path='/login' element={<Login/>}/>
              <Route path='/forgotpassword' element={<ForgotPassword/>}/>

        </Routes>
      </Router>
      
    );
  }
  
  export default App;

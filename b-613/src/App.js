import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'antd/dist/antd.css';
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.js";
import SucceedToRegisterPage from "./pages/SucceedToRegisterPage.js";
import InfoEdit from "./pages/InfoEdit";
import Profile from "./pages/Profile";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact></Route>
        <Route path="/register" element={<RegisterPage />} exact></Route>
        <Route path="/home" element={<HomePage />} exact></Route>
        <Route path="/success" element={<SucceedToRegisterPage />} exact></Route>  
        <Route path="/edit" element={<InfoEdit />} exact></Route>  
        <Route path="/profile" element={<Profile />} exact></Route>  

      </Routes>
    </BrowserRouter>
      
  );
}

export default App;

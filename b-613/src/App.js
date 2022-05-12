import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'antd/dist/antd.css';
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.js";
import SucceedToRegisterPage from "./pages/SucceedToRegisterPage.js";
import InfoEdit from "./pages/InfoEdit.js";
import Admin from "./pages/AdministratorPage.js";
import AdminLoginPage from "./pages/AdminLoginPage.js";
import ModifyPassword from "./pages/ModifyPasswordPage.js";
import ForgotPassword from "./pages/ForgotPasswordPage.js";
import ActiveChange from "./pages/ActivePasswordChangePage.js";
import Friend from "./pages/FriendsPage.js";
import Message from "./pages/MessagePage.js";
import Planet from "./pages/PlanetsPage.js";









function App() {
  return (
    // The page displayed for each address. We will display different self-defined components in different URLs
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact></Route>
        <Route path="/register" element={<RegisterPage />} exact></Route>
        <Route path="/home" element={<HomePage />} exact></Route>
        <Route path="/success" element={<SucceedToRegisterPage />} exact></Route>  
        <Route path="/edit" element={<InfoEdit />} exact></Route>  
        <Route path="/admin" element={<Admin />} exact></Route>  
        <Route path="/adminlogin" element={<AdminLoginPage />} exact></Route> 
        <Route path="/modify" element={<ModifyPassword />} exact></Route>  
        <Route path="/forgot" element={<ForgotPassword />} exact></Route>
        <Route path="/active" element={<ActiveChange />} exact></Route>  
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;

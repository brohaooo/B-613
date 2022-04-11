import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'antd/dist/antd.css';
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact></Route>
        <Route path="/register" element={<RegisterPage />} exact></Route>
        <Route path="/home" element={<HomePage />} exact></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;

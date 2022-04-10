import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'antd/dist/antd.css';
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact></Route>
        <Route path="/register" element={<RegisterPage />} exact></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;

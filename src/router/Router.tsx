import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Chatbot from "../pages/Chatbot.tsx";
import Calendar from "../pages/Calendar.tsx";
import Index from "../pages/Index.tsx";
import UserInfo from "../pages/UserInfoPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/calendar" element={<Calendar />} />
        </Routes>
    );
};

export default Router;

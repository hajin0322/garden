import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Chatbot from "../pages/Chatbot.tsx";
import Calendar from "../pages/Calendar.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/calendar" element={<Calendar />} />
        </Routes>
    );
};

export default Router;
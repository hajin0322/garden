import {Link} from "react-router-dom";
import { Home, User, Calendar } from 'lucide-react';

const Sidebar: React.FC = () => {

    const navItems = [
        {path: '/', label: "홈", icon: <Home size={22}/>},
        {path: '/chatbot', label: "챗봇", icon: <User size={22}/>},
        {path: '/calendar', label: "캘린더", icon: <Calendar size={22}/>},
    ];

    return (
        <nav className="flex flex-col gap-y-5 py-14">
            <h1>BUDGET</h1>
            {navItems.map(({path, label, icon}) => (
                <Link key={path} to={path}>
                    <div className={`relative flex items-center gap-3 px-4 py-4 rounded-lg text-black transition-all duration-2 ease-in-out`}>
                        {icon}
                        <span className="text-[16px] font-medium">{label}</span>
                    </div>
                </Link>
            ))}
        </nav>
    );
}

export default Sidebar;
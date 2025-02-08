import Router from "./router/Router.tsx";
import {BrowserRouter} from "react-router-dom";
import './styles/global.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
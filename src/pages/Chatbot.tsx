import BasicLayout from "../layouts/BasicLayout.tsx";
import EconomicAdvice from "../components/Chatbot/EconomicAdvice.tsx";

const Chatbot = () => {
    return (
        <div>
            <BasicLayout>
                <h1 className="text-3xl font-semibold">챗봇</h1>
                <EconomicAdvice />
            </BasicLayout>
        </div>
    );
};

export default Chatbot;
import BasicLayout from "../layouts/BasicLayout.tsx";
import CurrentConsumption from "../components/Home/CurrentConsumption.tsx";

const Home = () => {
    return (
        <div>
            <BasicLayout>
                <h1 className="text-3xl font-semibold">홈</h1>
                <CurrentConsumption/>
            </BasicLayout>
        </div>
    );
};

export default Home;
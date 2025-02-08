import BasicLayout from "../layouts/BasicLayout.tsx";
import CurrentConsumption from "../components/Home/CurrentConsumption.tsx";

const Home = () => {
    return (
        <div>
            <BasicLayout>
                <CurrentConsumption/>
            </BasicLayout>
        </div>
    );
};

export default Home;
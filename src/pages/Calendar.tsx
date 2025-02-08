import BasicLayout from "../layouts/BasicLayout.tsx";
import CalendarView from "../components/Calendar/CalendarView.tsx";
import ConsumptionPattern from "../components/Calendar/ConsumptionPattern.tsx";

const Calendar = () => {
    return (
        <div>
            <BasicLayout>
                <h1 className="text-3xl font-semibold">캘린더</h1>
                <CalendarView />
                <ConsumptionPattern />
            </BasicLayout>
        </div>
    );
};

export default Calendar;
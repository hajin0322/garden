import BasicLayout from "../layouts/BasicLayout.tsx";
import CalendarView from "../components/Calendar/CalendarView.tsx";
import ConsumptionPattern from "../components/Calendar/ConsumptionPattern.tsx";
import {useState} from "react";
import {addTask, getTasks, Task} from "../components/services/taskStoreService.ts";

const Calendar = () => {
    const [tasks, setTasks] = useState<Task[]>(getTasks());

    // Task 추가 핸들러
    const handleAddTask = (task: Task) => {
        addTask(task);
        setTasks(getTasks()); // 로컬스토리지에서 다시 가져와서 상태 업데이트
    };

    return (
        <div>
            <BasicLayout>
                <h1 className="text-3xl font-semibold">캘린더</h1>
                <CalendarView tasks={tasks} onAddTask={handleAddTask}/>
                <ConsumptionPattern tasks={tasks} />
            </BasicLayout>
        </div>
    );
};

export default Calendar;
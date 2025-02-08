import * as React from "react";
import {useState} from "react";
import { Task } from "../../services/taskStoreService.ts";

interface CalendarViewProps {
    tasks: Task[];
    onAddTask: (task: Task) => void;
}

// 날짜 기준으로 요일 구하기
const getWeekday = (date: string) => new Date(date).getDay();

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onAddTask }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newTaskContent, setNewTaskContent] = useState('');
    const [newTaskAmount, setNewTaskAmount] = useState<number>(0);

    const startDayOfMonth = getWeekday('2025-02-01');
    const daysInFebruary = Array.from({length: 28}, (_, i) => {
        const date = `2025-02-${String(i + 1).padStart(2, '0')}`;
        const tasksForDate = tasks.filter((t) => t && t.date && t.date === date);
        return { date, tasks: tasksForDate };
    });

    // Task 추가 핸들러
    const handleAddTask = () => {
        if (selectedDate && newTaskContent.trim()) {
            // Task 생성
            const newTask: Task = {
                id: Date.now(),
                content: newTaskContent,
                date: selectedDate,
                amount: newTaskAmount,
            };
            onAddTask(newTask);
            setNewTaskContent('');
            setNewTaskAmount(0);
            setSelectedDate(null);
        }
    }

    return (
        <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">캘린더</h2>
            <div className="grid grid-cols-7 gap-4 text-center text-gray-500 font-semibold">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-4">
                {/* 빈 공간 채우기 (2월 1일 이전 요일에 맞춰서 빈칸 삽입) */}
                {Array.from({length: startDayOfMonth}).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2"/>
                ))}

                {/* 각 날짜 별 Task와 합산 표시 */}
                {daysInFebruary.map(({date}) => {
                    const dateTasks = tasks.filter((t) => t && t.date && t.date === date);  // 날짜에 해당하는 Task만 가져오기
                    const dateTotal = dateTasks.reduce((sum, task) => sum + task.amount, 0);

                    return (
                        <div key={date}
                             className="bg-white p-4 rounded-lg shadow text-center overflow-hidden"
                             onClick={() => setSelectedDate(date)}
                        >
                            <p className="text-sm font-medium text-gray-600">{date}</p>
                            {dateTasks.length > 0 ? (
                                <div>
                                    {dateTasks.map((task) => (
                                        <p key={task.id}
                                           className="font-medium text-sm text-gray-800">{task.content}</p>
                                    ))}
                                    <p className={`font-bold mt-1 ${dateTotal > 0 ? 'text-blue-500' : 'text-red-500'}`}>
                                        {dateTotal.toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-400">-</p>
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Task 추가 모달 */}
            {selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">{selectedDate} - Task 추가</h3>
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                        >
                            <option value="">소비 종류 선택</option>
                            <option value="의류비">의류비</option>
                            <option value="식비">식비</option>
                            <option value="여가비">여가비</option>
                            <option value="교통비">교통비</option>
                            <option value="기타비">기타비</option>
                        </select>

                        <input
                            type="number"
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="금액"
                            value={newTaskAmount}
                            onChange={(e) => setNewTaskAmount(Number(e.target.value))}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleAddTask}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                추가
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
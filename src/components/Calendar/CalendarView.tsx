import * as React from "react";

interface Task {
    id: number;
    content: string;
    date: string;
    amount: number;
}

const tasks: Task[] = [
    {id: 1, content: '여가 활동', date: '2025-02-12', amount: -14116},
    {id: 2, content: '기타 지출', date: '2025-02-15', amount: 39419},
    {id: 3, content: '저축', date: '2025-02-16', amount: 71882},
    {id: 4, content: '의료비 지출', date: '2025-02-02', amount: 17021},
    {id: 5, content: '의료비 지출', date: '2025-02-24', amount: -46275},
    {id: 6, content: '의료비 지출', date: '2025-02-08', amount: 32634},
    {id: 7, content: '식비 지출', date: '2025-02-12', amount: 36979},
    {id: 8, content: '기타 지출', date: '2025-02-28', amount: 62431},
    {id: 9, content: '의료비 지출', date: '2025-02-09', amount: 58385},
    {id: 10, content: '교통비 충전', date: '2025-02-14', amount: -1737},
    {id: 11, content: '여가 활동', date: '2025-02-01', amount: -47387},
    {id: 12, content: '의료비 지출', date: '2025-02-07', amount: 77589},
    {id: 13, content: '교통비 충전', date: '2025-02-27', amount: 31386},
    {id: 14, content: '저축', date: '2025-02-18', amount: 81201},
    {id: 15, content: '여가 활동', date: '2025-02-03', amount: -11898},
    {id: 16, content: '교통비 충전', date: '2025-02-04', amount: 98101},
    {id: 17, content: '쇼핑', date: '2025-02-13', amount: -45595},
    {id: 18, content: '저축', date: '2025-02-15', amount: 21223},
    {id: 19, content: '의료비 지출', date: '2025-02-20', amount: 61629},
    {id: 20, content: '교통비 충전', date: '2025-02-02', amount: 65155},
    {id: 21, content: '여가 활동', date: '2025-02-13', amount: 81685},
    {id: 22, content: '여가 활동', date: '2025-02-16', amount: -6680},
    {id: 23, content: '식비 지출', date: '2025-02-15', amount: -16543},
    {id: 24, content: '쇼핑', date: '2025-02-14', amount: 23627},
    {id: 25, content: '교통비 충전', date: '2025-02-18', amount: -6997},
    {id: 26, content: '여가 활동', date: '2025-02-09', amount: 12067},
    {id: 27, content: '식비 지출', date: '2025-02-12', amount: 32206},
    {id: 28, content: '여가 활동', date: '2025-02-28', amount: 41009},
    {id: 29, content: '여가 활동', date: '2025-02-21', amount: 42786},
    {id: 30, content: '교통비 충전', date: '2025-02-15', amount: 41301},
];

// 날짜 기준으로 요일 구하기
const getWeekday = (date: string) => new Date(date).getDay();

// 2월 1일의 시작 요일 계산
const startDayOfMonth = getWeekday('2025-02-01');

// 2월 1일부터 28일까지의 그리드 데이터를 생성
const daysInFebruary = Array.from({length: 28}, (_, i) => {
    const date = `2025-02-${String(i + 1).padStart(2, '0')}`;
    const task = tasks.find((t) => t.date === date);
    return {date, task};
});

const CalendarView: React.FC = () => {
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

                {/* 각 날짜를 표시 */}
                {daysInFebruary.map(({date, task}) => (
                    <div key={date} className="bg-white p-4 rounded-lg shadow text-center">
                        <p className="text-sm font-medium text-gray-600">{date}</p>
                        {task ? (
                            <p className={task.amount >= 0 ? 'text-blue-500' : 'text-red-500'}>
                                {task.amount.toLocaleString()}
                            </p>
                        ) : (
                            <p className="text-gray-400">-</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
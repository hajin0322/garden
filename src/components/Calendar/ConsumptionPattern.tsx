import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';

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

// 모든 날짜를 채워주는 함수
const fillMissingDates = (tasks: Task[], start: string, end: string) => {
    const dateSummary: { [key: string]: number } = {};

    // 날짜별 합계 계산
    tasks.forEach((task) => {
        if (dateSummary[task.date]) {
            dateSummary[task.date] += task.amount;
        } else {
            dateSummary[task.date] = task.amount;
        }
    });

    // 누락된 날짜 채우기
    let currentDate = new Date(start);
    const endDate = new Date(end);
    let cumulativeValue = 0;
    const filledData = [];

    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateSummary[dateString]) {
            cumulativeValue += dateSummary[dateString];
        }
        filledData.push({ date: dateString, value: cumulativeValue });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
};

const data = fillMissingDates(tasks, '2025-02-01', '2025-02-28');


const ConsumptionPattern: React.FC = () => {
    return (
        <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">경제적 흐름 요약</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" tick={{fontSize: 12}}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConsumptionPattern;
import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {Task} from "../services/taskStoreService.ts";


interface ConsumptionPatternProps {
    tasks: Task[];
}

// -------------------------------------------
// 목표 소비 지출
const goalBudget = -900000;
// -------------------------------------------

// 모든 날짜를 채워주는 함수
const fillMissingDates = (tasks: Task[], start: string, end: string) => {
    const dateSummary: { [key: string]: number } = {};

    // 날짜별 합계 계산
    tasks.forEach((task) => {
        if (task && task.date) {
            if (dateSummary[task.date]) {
                dateSummary[task.date] += task.amount;
            } else {
                dateSummary[task.date] = task.amount;
            }    
        }
    });

    // 누락된 날짜 채우기
    const currentDate = new Date(start);
    const endDate = new Date(end);
    let cumulativeValue = 0;
    const filledData = [];

    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateSummary[dateString]) {
            cumulativeValue += dateSummary[dateString];
        }
        filledData.push({date: new Date(dateString).getTime(), value: cumulativeValue});
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
};

// 목표 예산에 따른 예상 그래프 데이터 생성
const createGoalDate = (goal: number, start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const goalData = [];

    for (let i = 0; i <= totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const goalValue = (goal / totalDays) * i;
        goalData.push({date: currentDate.getTime(), goalValue: goalValue});
    }

    return goalData;
}

const ConsumptionPattern: React.FC<ConsumptionPatternProps> = ({tasks}) => {
    const startDate = '2025-02-01';
    const todayDate = new Date().toISOString().split('T')[0];
    const data = fillMissingDates(tasks, startDate, todayDate);
    const goalData = createGoalDate(goalBudget, startDate, '2025-02-28');

    const finalSpent = data[data.length - 1]?.value || 0;
    const difference = -(goalBudget - finalSpent);

    return (
        <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">경제적 흐름 요약</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                    <XAxis
                        dataKey="date"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(tick) => new Date(tick).toISOString().split('T')[0]}
                        tick={{fontSize: 12}}
                    />
                    <Tooltip labelFormatter={(label) => new Date(label).toISOString().split('T')[0]}/>
                    <Line type="monotone" data={data} dataKey="value" stroke="#2563eb" strokeWidth={3}/>
                    <Line type="monotone" data={goalData} dataKey="goalValue" stroke="#f43f5e" strokeWidth={1}
                          strokeDasharray="5 5"/>
                </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-lg font-medium">목표 예산과 실제 지출 차이:</p>
            <p className={difference >= 0 ? 'mt-4 text-lg font-medium text-blue-500' : 'mt-4 text-lg font-medium text-red-500'}>
                {difference.toLocaleString()}원
            </p>
        </div>
    );
};

export default ConsumptionPattern;
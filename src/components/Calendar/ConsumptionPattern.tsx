import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';

const data = [
    { date: '2025-02-01', value: -47387 },
    { date: '2025-02-02', value: 34789 },
    { date: '2025-02-03', value: 22891 },
    { date: '2025-02-04', value: 120992 },
    { date: '2025-02-07', value: 198581 },
    { date: '2025-02-08', value: 231215 },
    { date: '2025-02-09', value: 301667 },
    { date: '2025-02-12', value: 356736 },
    { date: '2025-02-13', value: 392826 },
    { date: '2025-02-14', value: 414716 },
    { date: '2025-02-15', value: 500116 },
    { date: '2025-02-16', value: 565318 },
    { date: '2025-02-18', value: 639522 },
    { date: '2025-02-20', value: 701151 },
    { date: '2025-02-21', value: 743937 },
    { date: '2025-02-24', value: 697662 },
    { date: '2025-02-27', value: 729048 },
    { date: '2025-02-28', value: 832488 },
];


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
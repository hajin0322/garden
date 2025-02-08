import {Section} from "lucide-react";

// interface CurrentConsumptionProps {
//     // 필요한 props
// }

const CurrentConsumption: React.FC = () => {
    return (
        <Section className="border border-gray-300 p-4 mb-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">현재 소비 패턴</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>지출 분야: 식비, 교통비, 쇼핑 등</li>
                <li>이전 총 지출: 100만원(예시)</li>
                <li>지출 분야: 식비, 교통비, 쇼핑 등</li>
            </ul>
        </Section>
    );
};

export default CurrentConsumption;
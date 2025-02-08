import React, {useState} from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
    sender: 'bot' | 'user';
    text: string;
}

// API 키를 문자열로 전달하여 클라이언트 생성
const client = new GoogleGenerativeAI("AIzaSyAO12QI7oyghignZhGHIPSIbqvyzOzQ4do");

// 모델 인스턴스를 생성할 때 generation configuration을 함께 설정
const model = client.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {         // 모델 생성 시 설정하면 이후 요청에 자동 반영됩니다.
        temperature: 0.7,
        maxOutputTokens: 500,
    },
});

// Google Gemini API를 사용하여 AI 응답을 받아오는 함수
const fetchAIResponse = async (userText: string): Promise<string> => {
    try {
        const response = await model.generateContent(userText);

        return response.response.text();
    } catch (error) {
        console.error("Error fetching AI response: ", error);
        return "오류가 발생했습니다. 다시 시도해주세요.";
    }
}

const EconomicAdvice: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {sender: 'bot', text: '안녕하세요! 경제적 조언이 필요하신가요? '}
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // 사용자 메시지 추가
        const userMessage: Message = {sender: 'user', text: input};
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // AI 메시지 추가
        const aiResponse = await fetchAIResponse(input);
        if (aiResponse) {
            const aiMessage: Message = { sender: 'bot', text: aiResponse };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }

        // 입력창 초기화
        setInput('');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* 메시지 대화 창 */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                        } mb-2`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg shadow-md  ${
                                message.sender === 'user' ? 'text-white bg-blue-500' : 'text- black bg-white'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 메시지 입력 창 */}
            <div className="p-4 border-t border-gray-300 flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                    placeholder="메시지를 입력하세요..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
                >
                    전송
                </button>
            </div>
        </div>
    );
};

export default EconomicAdvice;
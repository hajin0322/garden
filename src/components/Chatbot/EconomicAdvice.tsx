import React, {useState} from "react";
import {fetchAIResponse} from "../services/geminiApiService.ts";

interface Message {
    sender: 'bot' | 'user';
    text: string;
}

const EconomicAdvice: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {sender: 'bot', text: '안녕? 도움이 필요하니? 내가 도와줄게!'}
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // 사용자 메시지 추가
        const userMessage: Message = {sender: 'user', text: input};
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // AI 메시지 추가
        const recentMessages = messages.slice(-5).map((msg) => `
            ${msg.sender === 'user' ? '사용자' : 'AI'}: ${msg.text}`).join('\n');
        const aiPrompt = `
        나는 너의 친한 대학생 친구야.
        정말 솔직하게 편하게 얘기해줘. 알겠어?
        경제적 조언이 필요해. 좀 도와줘. 그리고 3줄 이내로 짧게 조언해줘.
        다음은 대화 내역이야: ${recentMessages}
        `;

        const aiResponse = await fetchAIResponse(aiPrompt);
        if (aiResponse) {
            const aiMessage: Message = {sender: 'bot', text: aiResponse};
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
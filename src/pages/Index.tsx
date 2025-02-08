import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Banknote, ArrowRight } from 'lucide-react';
import './Index.css';

// 애니메이션 Variants
const fadeVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const MovingBlurBackground: React.FC = () => {
    const navigate = useNavigate();
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: impactRef, inView: impactInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3, triggerOnce: false });

    return (
        <div className="bg-gray-50 min-h-screen overflow-y-auto flex flex-col px-16 relative">

            {/* 배경 블롭 애니메이션 */}
            <div className="fixed inset-0 z-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                    <div className="absolute top-0 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center px-8">

                {/* Hero 섹션 */}
                <motion.section
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center text-center"
                >
                    <h1 className="text-6xl font-bold text-black drop-shadow-md flex items-center justify-center gap-3">
                        <ShieldCheck className="text-blue-500 w-12 h-12" />
                        PROJECT WON
                    </h1>
                    <h2 className="text-2xl font-light text-gray-700 mt-2">
                         당신의 재산을 지켜드려요!
                    </h2>
                </motion.section>

                {/* 주요 메시지 */}
                <motion.section
                    ref={impactRef}
                    initial="hidden"
                    animate={impactInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center items-center text-center"
                >
                    <h1 className="text-4xl font-semibold text-gray-900 leading-relaxed flex items-center gap-3">
                        <Banknote className="text-green-500 w-10 h-10" />
                        안심하세요, 저희가 지켜드립니다.
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        당신의 충동적 소비를 막아드리겠습니다 <br />
                    </p>
                </motion.section>

                {/* CTA 버튼 섹션 */}
                <motion.section
                    ref={aboutRef}
                    initial="hidden"
                    animate={aboutInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center text-center"
                >
                    <button
                        onClick={() => navigate('/userinfo')}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 text-lg"
                    >
                        🚀 지금 바로 시작하기
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.section>

            </div>
        </div>
    );
};

export default MovingBlurBackground;

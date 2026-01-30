import React, { useEffect, useRef } from 'react';
import cardBack from '../assets/card_back.png';

const Bridge = ({ onNext }) => {
    const cardsRef = useRef([]);

    useEffect(() => {
        // 2초 후 다음 단계로 이동
        const timer = setTimeout(() => {
            onNext();
        }, 2000);

        let scrollX = 0;
        let rafId;
        let lastTime = performance.now();

        const CARD_WIDTH = 180;
        const GAP = 20;
        const TOTAL_CARDS = 10;
        const SPEED = 168; // 초당 픽셀 이동 속도

        const animate = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            scrollX += SPEED * deltaTime;
            const itemWidth = CARD_WIDTH + GAP;
            const totalWidth = itemWidth * TOTAL_CARDS;

            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // 중앙(0) 기준 수평 위치 계산
                let x = (i * itemWidth - scrollX) % totalWidth;
                
                // 무한 루프를 위해 범위를 [-totalWidth/2, totalWidth/2]로 제한
                if (x < -totalWidth / 2) x += totalWidth;
                if (x > totalWidth / 2) x -= totalWidth;
                
                // 화면 중앙 근처에서 튀어오르는 효과
                const distFromCenter = Math.abs(x);
                const liftRange = 300;
                
                let lift = 0;
                if (distFromCenter < liftRange) {
                    const normalized = 1 - (distFromCenter / liftRange);
                    const curve = Math.sin((normalized * Math.PI) / 2);
                    lift = -40 * curve; // 높이 조절
                }

                card.style.transform = `translate(${x}px, ${lift}px)`;
            });

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [onNext]);

    return (
        <div className="bridge-container fade-in">
            <h2 className="bridge-title">배달할 운세를 찾는 중...</h2>
            <div className="bridge-card-scene">
                {[...Array(10)].map((_, i) => (
                    <div 
                        key={i} 
                        className="bridge-card-floating"
                        ref={el => cardsRef.current[i] = el}
                    >
                        <img src={cardBack} alt="카드" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bridge;

import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import keyvisualData from '../assets/keyvisual.json';
import btn1 from '../assets/btn1.png';

const Intro = ({ onStart }) => {
    const lottieRef = useRef(null);

    return (
        <div className="intro-container fade-in">
            <div className="intro-main">
                <div className="keyvisual-wrapper">
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={keyvisualData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

            <div className="intro-bottom">
                <button
                    onClick={onStart}
                    className="btn-primary"
                >
                    <img src={btn1} alt="운세 확인하기" />
                </button>
            </div>
        </div>
    );
};

export default Intro;

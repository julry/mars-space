import {AnimatePresence, motion, percent} from 'framer-motion';
import styled from "styled-components";
import path from '../../../../assets/images/pathSm.png';
import bg from '../../../../assets/images/level5Bg.png';
import rocket from '../../../../assets/images/rocket.png';
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import { useProgress } from "../../../../contexts/ProgressContext";
import { useGame } from "./useGame";
import { DURATION_LANDING, phrases } from "./constants";
import {useEffect} from 'react';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    padding-top: ${({$ratio}) => $ratio * 115}px;
`;

const BgLayer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    user-select: none;
    pointer-events: none;
`;

const BgImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    object-fit: contain;
`;

const RocketWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Rocket = styled.img`
    position: relative;
    object-fit: contain;
    width: ${({$ratio}) => $ratio * 109}px;
    height: ${({$ratio}) => $ratio * 218}px;

    @media screen and (min-height: 700px){
        width: ${({$ratio}) => $ratio * 123}px;
        height: ${({$ratio}) => $ratio * 254}px;
    } 
`;

const RocketPath = styled(motion.img)`
    position: relative;
    z-index: 2;
    width: ${({$ratio}) => $ratio * 145}px;
    height: ${({$ratio}) => $ratio * 107}px;
    margin-top: ${({$ratio}) => $ratio * -25}px;
    object-fit: contain;
    object-position: 0 0;

    @media screen and (min-height: 700px){
        width: ${({$ratio}) => $ratio * 169}px;
        height: ${({$ratio}) => $ratio * 124}px;
        margin-top: ${({$ratio}) => $ratio * -32}px;
    } 
`;

const StartWrapper = styled(motion.div)`
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    gap: var(--spacing_x3);
    bottom: var(--spacing_x5);
`;

const LeftAction = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    bottom: 0;
    z-index: 5;
`;

const RightAction = styled(LeftAction)`
    left: auto;
    right: 0;
`;

const ItemCloud = styled(motion.div)`
    position: absolute;
    top: ${({$top}) => $top};
    left: ${({$left}) => $left};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    width: ${({$width}) => $width}px;
    height: ${({$height}) => $height}px;
    white-space: pre-line;

    & svg {
        position: absolute;
        inset: 0;
    }

    & p {
        color: var(--color-dark-blue);
        position: relative;
        text-align: center;
        font-size: ${({$ratio}) => $ratio * 14}px;
        font-weight: 700;
        z-index: 2;
    }
`;

const EduCloud = styled(ItemCloud)`
    z-index: 20;
    
    & p {
        font-size: ${({$ratio}) => $ratio * 20}px;
    }
`;

export const Level5 = () => {
    const ratio = useSizeRatio();
    const { next, setProgress } = useProgress();

    const {
        isStart,
        isEnd,
        wrapperRef,
        rocketRef,
        rocketY,
        layerRef,
        imageRef,
        handleClick,
        handleStart,
        isPath,
        phrase,
        isEdu, 
    } = useGame();

    useEffect(() => {
        setProgress(prev => ({...prev, stage: 'space', current: 224.1, percent: 84}))
    }, []);
    

    return (
        <Wrapper 
            $ratio={ratio}
            ref={wrapperRef}
        >
            <BgLayer 
                ref={layerRef} 
                style={{ y: rocketY}}
            >
                <BgImage ref={imageRef} src={bg} alt=""/>
            </BgLayer>
            <LeftAction onClick={() => handleClick('left')}/>
            <RightAction onClick={() => handleClick('right')}/>
            <RocketWrapper 
                ref={rocketRef} 
                $ratio={ratio}
            >
                    <Rocket $ratio={ratio} src={rocket} alt=""/>
                    <AnimatePresence>
                        {isPath && <RocketPath exit={{opacity: 0}} transition={{duration: DURATION_LANDING / 4}} $ratio={ratio} src={path} alt=""/>}
                    </AnimatePresence>
                </RocketWrapper>
            <AnimatePresence>
                {phrases[phrase] && (
                        <ItemCloud 
                            $ratio={ratio}
                            $height={(phrases[phrase].svgSizes?.[1] ?? 70) * ratio}
                            $width={(phrases[phrase].svgSizes?.[0] ?? 140) * ratio}
                            $left={phrases[phrase].left}
                            $top={phrases[phrase].top}
                        >
                            {phrases[phrase].svg ?? (
                                <svg width="100%" height="100%" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_f_64_219202)" data-figma-bg-blur-radius="6.84513">
                                <path d="M115.992 34.5833C137.436 55.4173 96.8336 46.7889 67.2063 51.5205C26.3263 54.4111 6.52815 46.4049 18.4209 34.5833C8.70511 21.2234 28.6103 15.2015 67.2063 17.6461C113.583 16.322 129.032 21.9243 115.992 34.5833Z" fill="white" fill-opacity="0.9"/>
                                </g>
                                <defs>
                                <filter id="filter0_f_64_219202" x="-2.11283" y="0.000452042" width="141.226" height="69.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_219202"/>
                                </filter>
                                <clipPath id="bgblur_0_64_219202_clip_path" transform="translate(2.11283 -0.000452042)"><path d="M115.992 34.5833C137.436 55.4173 96.8336 46.7889 67.2063 51.5205C26.3263 54.4111 6.52815 46.4049 18.4209 34.5833C8.70511 21.2234 28.6103 15.2015 67.2063 17.6461C113.583 16.322 129.032 21.9243 115.992 34.5833Z"/>
                                </clipPath></defs>
                                </svg>
                            )}
                            <p>
                                {phrases[phrase].text}
                            </p>
                        </ItemCloud>
                    )}
                {isEdu && (
                    <EduCloud
                        exit={{opacity: 0}}
                        $ratio={ratio}
                        $height={156 * ratio}
                        $width={310 * ratio}
                        $left='50%'
                        $top='50%'
                    >
                        <svg width="100%" height="100%" viewBox="0 0 310 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_64_395740)" data-figma-bg-blur-radius="6.84513">
                            <path d="M276.671 77.5097C331.784 149.536 227.433 119.706 151.288 136.064C46.2226 146.057 -4.66065 118.379 25.9047 77.5097C0.934326 31.3224 52.0926 10.504 151.288 18.9554C270.48 14.3777 310.187 33.7455 276.671 77.5097Z" fill="white" fill-opacity="0.9"/>
                            </g>
                            <defs>
                            <filter id="filter0_f_64_395740" x="-3.62396e-05" y="0.000452042" width="309.226" height="155.226" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_395740"/>
                            </filter>
                            <clipPath id="bgblur_0_64_395740_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M276.671 77.5097C331.784 149.536 227.433 119.706 151.288 136.064C46.2226 146.057 -4.66065 118.379 25.9047 77.5097C0.934326 31.3224 52.0926 10.504 151.288 18.9554C270.48 14.3777 310.187 33.7455 276.671 77.5097Z"/>
                            </clipPath></defs>
                        </svg>
                        <p>
                            Время приземляться:{'\n'}
                            не дай ракете упасть. Нажимай на экран{'\n'}
                            со стороны наклона
                        </p>
                    </EduCloud>
                )}
                {isStart && (
                   <StartWrapper exit={{opacity: 0}}>
                        <Block zIndex={10}>
                            <p>
                                Кажется, ты почти добрался до цели. Остался последний этап — центр оценки. Здесь смотрят на твою работу в команде
                                    и умение вести за собой
                            </p>
                        </Block>
                        <Button zIndex={10} onClick={handleStart}>ВПЕРЁД</Button>
                   </StartWrapper>
                )}
                {isEnd &&  (
                   <StartWrapper exit={{opacity: 0}}>
                        <Block zIndex={10}>
                            <p>
                                Ты смог найти идеальный баланс
                                для посадки! Этот навык пригодится тебе
                                и на финальном центре оценки. Настоящий лидер умеет найти равновесие между личными амбициями и общей целью
                            </p>
                        </Block>
                        <Button zIndex={10} onClick={next}>ДАЛЕЕ</Button>
                   </StartWrapper>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}
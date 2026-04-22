import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import path from '../../../../assets/images/pathSm.png';
import bg from '../../../../assets/images/level5Bg.png';
import rocket from '../../../../assets/images/rocket.png';
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import { useProgress } from "../../../../contexts/ProgressContext";
import { useGame } from "./useGame";
import { DURATION_LANDING } from "./constants";

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

export const Level5 = () => {
    const ratio = useSizeRatio();
    const { next } = useProgress();

    const {
        isStart,
        isEnd,
        wrapperRef,
        rocketRef,
        rocketX,
        rocketY,
        layerRef,
        imageRef,
        handleClick,
        handleStart,
        isPath
    } = useGame();
    

    return (
        <Wrapper 
            $ratio={ratio}
            ref={wrapperRef}
            onClick={handleClick}
        >
            <BgLayer ref={layerRef}>
                <BgImage ref={imageRef} src={bg} alt=""/>
            </BgLayer>
            <RocketWrapper 
                    ref={rocketRef} 
                    $ratio={ratio}
                    style={{x: rocketX, y: rocketY}}
                >
                    <Rocket $ratio={ratio} src={rocket} alt=""/>
                    <AnimatePresence>
                        {isPath && <RocketPath exit={{opacity: 0}} transition={{duration: DURATION_LANDING / 4}} $ratio={ratio} src={path} alt=""/>}
                    </AnimatePresence>
                </RocketWrapper>
            <AnimatePresence>
                
                {isStart && (
                   <StartWrapper exit={{opacity: 0}}>
                        <Block zIndex={10}>
                            <p>
                                Кажется, ты почти добрался до цели. Остался последний этап — центр оценки. Здесь смотрят на твою работу в команде
                                    и умение вести за собой
                            </p>
                        </Block>
                        <Button onClick={(handleStart)}>ВПЕРЁД</Button>
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
                        <Button onClick={next}>ДАЛЕЕ</Button>
                   </StartWrapper>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}
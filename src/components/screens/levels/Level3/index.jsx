import styled from "styled-components";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bg from "../../../../assets/images/level3Bg.webp";
import oil2Desk from '../../../../assets/images/oil2.webp';
import oil2 from '../../../../assets/images/level3Oil.webp';
import oil from '../../../../assets/images/level3BoxOil.webp';
import rocket from '../../../../assets/images/level3Rocket_box.webp';
import rocketStart from '../../../../assets/images/level3Rocket.webp';
import { media } from "../../../../constants/media";
import { DURATION, OIL_DESK_DROP_ZONE, OIL_DROP_ZONE, phrases } from "./constants";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { useProgress } from "../../../../contexts/ProgressContext";
import { CloudBlock } from "../../../shared/LevelCloudBlock";
import {reachMetrikaGoal} from '../../../../utils/reachMetrikaGoal';

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat 0% 0%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: var(--spacing_x5);
    gap: var(--spacing_x3);
`;

const Rocket = styled(motion.img)`
    position: absolute;
    bottom: 230px;
    width: 507px;
    height: 298px;
    right: -61px;
    user-select: none;
    pointer-events: none;

    @media screen and (min-height: 700px) {
        width: ${507 * 1.4}px;
        height: ${298 * 1.4}px;
        right: ${-65 * 2.45}px;
        bottom: ${230 * 0.88}px;
    }

    ${media.desktop`
        bottom: 55px;
        width: 904px;
        right: -77px;
        height: 530px;
    `}
`;

const OilPistol = styled(motion.img)`
    position: absolute;
    object-fit: contain;
    width: 203px;
    height: 216px;
    bottom: 50px;
    right: -30px;
    z-index: 6;

    ${media.desktop`
        display: none;
    `}
`;

const OilPistolDesk = styled(motion.img)`
    display: none;
    position: absolute;
    object-fit: contain;
    transform: scale(-1, 1);
    
    z-index: 6;


    ${media.desktop`
        display: block;
        width: 196px;
        height: 624px;
        bottom: -167px;
        right: 110px;
    `}
`;

const StartBlock = styled(Block)`
    position: relative;
    z-index: 10;
    margin-bottom: var(--spacing_x5);
`;

const ModalBlock = styled(CloudBlock)`
    bottom: ${({$ratio}) => $ratio * 61}px;
`;

const DropZone = styled.div`
    position: absolute;
    pointer-events: none;
    z-index: 4;
    box-sizing: border-box;
    bottom: ${OIL_DROP_ZONE.bottom}px;
    right: ${OIL_DROP_ZONE.right}px;
    width: ${OIL_DROP_ZONE.width}px;
    height: ${OIL_DROP_ZONE.height}px;


    ${media.desktop`
        bottom: ${OIL_DESK_DROP_ZONE.bottom}px;
        right: ${OIL_DESK_DROP_ZONE.right}px;
        width: ${OIL_DESK_DROP_ZONE.width}px;
        height: ${OIL_DESK_DROP_ZONE.height}px;
    `}
`;

const ButtonsBlock = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    width: 100%;

    & button {
        margin-top: var(--spacing_x3);
    }

    ${media.desktop`
        max-width: 630px;
        justify-content: space-between;

        & button {
            margin: 0;
            width: 279px;
        }
    `}
`;

const OilBoxWrapper = styled(motion.div)`
    position: absolute;
    bottom: 344px;
    overflow: hidden;
    right: 124.5px;
    height: 68.5px;
    width: 144.5px;


    @media screen and (min-height: 700px) {
        width: ${144.5 * 1.4}px;
        height: ${68.5 * 1.4}px;
        right: 105px;
        bottom: 361px;
    }

    ${media.desktop`
        width: 257px;
        bottom: 259px;
        right: 250px;
        height: 121px;
    `}
`;

const OilBox = styled(motion.div)`
    width: 0;
    overflow: hidden;
    border-bottom-right-radius: 50px;
    border-top-right-radius: 200px;

    & img {
        width: 144.5px;
        height: 68.5px;

        @media screen and (min-height: 700px) {
            width: ${144.5 * 1.4}px;
            height: ${68.5 * 1.4}px;
        }

        ${media.desktop`
            width: 257px;
            height: 121px;
        `}
    }
`;

function isPistolAlignedToDropZone(pistolRect, zoneRect, isDesk) {
    const cx = pistolRect.left + (isDesk ? pistolRect.width / 3 : 25);
    const centerXOk = cx >= zoneRect.left && cx <= zoneRect.right;
    const cy = pistolRect.top + (isDesk ? 161 : 25);
    const verticalOverlap = cy >= zoneRect.top && cy <= zoneRect.bottom;
    return centerXOk && verticalOverlap;
}

export const Level3 = () => {
    const ratio = useSizeRatio();
    const {next} = useProgress();

    const [phrase, setPhrase] = useState();
    const [isStarted, setIsStarted] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isEndBlock, setIsEndBlock] = useState(false);
    const [isButtonsBlock, setIsButtonsBlock] = useState(false);

    const pistolDeskRef = useRef(null);
    const pistolRef = useRef(null);
    const dropZoneRef = useRef(null);

    const handlePistolDeskDrag = () => {
        const pistol = pistolDeskRef.current;
        const zone = dropZoneRef.current;
        if (!pistol || !zone) return;

        const rect = pistol.getBoundingClientRect();

        if (isPistolAlignedToDropZone(rect, zone.getBoundingClientRect(), true) && !isConnected) {
            setIsConnected(true);
            showNextPhrase(0, 0);
        }
    };

    const handlePistolDrag = () => {
        const pistol = pistolRef.current;
        const zone = dropZoneRef.current;
        if (!pistol || !zone) return;

        const rect = pistol.getBoundingClientRect();
     
        if (isPistolAlignedToDropZone(rect, zone.getBoundingClientRect()) && !isConnected) {
            setIsConnected(true);
            showNextPhrase(0, 0);
        }
    };

    const showNextPhrase = (phraseId, duration) => {
        if (phraseId + 1 > phrases.length) {
            setTimeout(() => {
                setIsEndBlock(true);
            }, 1000 * DURATION / 3)
            return;
        }


        setTimeout(() => {
            setPhrase(phrases[phraseId]);
            showNextPhrase(phraseId + 1);
        }, duration ?? 1000 * DURATION / 3)
    }

    const getAnimation = () => {
        if (!isConnected) {
            return {}
        };

        if (window.innerHeight > 700) {
            return ({x: -30, y: -76})
        }

        return ({x: -26, y: -70})
    }

    const handleNext = () => {
        reachMetrikaGoal('finishlevel2');
        next();
    };

    const handleLink = () => {
        reachMetrikaGoal('program1');
        window.open('https://fut.ru/s/internship_curiosity', '_blank')
    };

    return (
        <Wrapper>
            <Rocket src={rocketStart} alt=""/> 
            <AnimatePresence>
                {isConnected && (
                    <>
                        <Rocket initial={{opacity: 0}} animate={{opacity: 1}} src={rocket} alt=""/> 
                        <OilBoxWrapper>
                            <OilBox 
                                animate={{width: '100%', borderTopRightRadius: [200, 55, 65, 90, 50, 20, 0], borderBottomRightRadius: [50, 20, 0]}} 
                                transition={{
                                    duration: DURATION,
                                    borderBottomRightRadius: {duration: 2, delay: DURATION - 3}
                                }}
                            >
                                <img src={oil} alt=""/>
                            </OilBox>
                        </OilBoxWrapper>
                    </>
                )}
            </AnimatePresence>
            <DropZone ref={dropZoneRef} aria-hidden />
            <OilPistol 
                src={oil2} 
                ref={pistolRef}
                alt="" 
                dragElastic={0}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 800, bounceDamping: 60 }}
                draggable={false}
                animate={getAnimation()}
                dragConstraints={{
                    top: -200,
                    left: -30,
                    right: 45,
                    bottom: 50,
                }}
                drag={!isConnected}
                onDrag={handlePistolDrag}
                onDragStart={() => setIsStarted(true)}
                style={{ touchAction: "none" }}
            />

            <OilPistolDesk
                ref={pistolDeskRef}
                src={oil2Desk} 
                alt="" 
                initial={{scale: '-1,1'}}
                dragElastic={0}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 800, bounceDamping: 60 }}
                draggable={false}
                animate={isConnected ? {x: -90, y: 54} : {}}
                dragConstraints={{
                    top: -100,
                    left: -500,
                    right: 100,
                    bottom: 50,
                }}
                drag={!isConnected}
                onDrag={handlePistolDeskDrag}
                onDragStart={() => setIsStarted(true)}
                style={{ touchAction: "none" }}
            />
                
            <AnimatePresence mode="wait">
                {phrase && !(isEndBlock || isButtonsBlock) && (
                    <ModalBlock key={phrase?.id} $ratio={ratio} $width={phrase?.width * ratio} $height={100 * ratio} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        {phrase?.bg}
                        <p>
                            {phrase?.text}
                        </p>
                    </ModalBlock>
                )}
                {!isStarted && (
                    <StartBlock>
                        <p>Самое время подзарядиться. Перемести пистолет на бак и удерживай его до полной дозаправки</p>
                    </StartBlock>
                )}
                {isEndBlock && !isButtonsBlock && (
                    <>
                        <Block zIndex={10}>
                            <p>Твоя мотивация — топливо для успешного прохождения видеоинтервью или тестирования. Покажи, что этот челлендж тебе под силу. В Mars любят целеустремленных</p>
                        </Block>
                        <Button  zIndex={10} onClick={() => setIsButtonsBlock(true)}>полетели</Button>
                    </>
                )}
                {isButtonsBlock && (
                    <ButtonsBlock>
                        <Button onClick={handleNext}>Продолжить полет</Button>
                        <Button onClick={handleLink}>к программе</Button>
                    </ButtonsBlock>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState } from "react";

import path from '../../../../assets/images/pathSm.png';
import bg from '../../../../assets/images/level4Bg.png';
import rocket from '../../../../assets/images/rocket.png';
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import crush from "../../../../assets/images/crush.png";

import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import {media} from '../../../../constants/media';
import { useProgress } from "../../../../contexts/ProgressContext";
import { useGame } from "./useGame";
import { CRUSH_TEXT_TYPE, crushTexts, ITEMS_BLOCK_HEIGHT, objects } from './constants';
import { QuestionInteractive } from "./QuestionsInteractive";
import { getIsTouchDevice } from "../../../../utils/getIsTouchDevice";
import {reachMetrikaGoal} from '../../../../utils/reachMetrikaGoal';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    padding-bottom: ${({$ratio}) => $ratio * 66}px;
`;

const BgLayer = styled(motion.div)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    user-select: none;
    pointer-events: none;
`;

const BgImage = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    object-fit: contain;
`;

const RocketWrapper = styled(motion.div)`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    user-select: none;
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

const RocketPath = styled.img`
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
    z-index: 10;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    gap: var(--spacing_x3);
    bottom: var(--spacing_x5);
`;

const ActiveBlock = styled(motion.div)`
    position: absolute;
    bottom: 75%;
    left: 50%;
    z-index: 1;

    width: ${({$ratio}) => ($ratio * 145) * 2.5 - 40 * $ratio}px;
    height: ${ITEMS_BLOCK_HEIGHT}px;

    @media screen and (min-height: 700px){
        width: ${({$ratio}) => $ratio * 169 * 2.5 - 40 * $ratio}px;
    } 
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

const Item = styled.div`
    position: absolute;
    bottom: ${({$bottom}) => $bottom}px;
    left: ${({$left}) => $left};
    width: ${({$width}) => $width}px;
    height: ${({$height}) => $height}px;
    background: url(${({$bg}) => $bg}) no-repeat;
    background-position: center 100%;
    background-size: contain;
    pointer-events: none;
    user-select: none;
`;

const ItemCloud = styled(motion.div)`
    position: absolute;
    top: 45%;
    left: 50%;
    display: flex;
    align-items: center;
    pointer-events: none;
    user-select: none;
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
        font-size: ${({$ratio}) => $ratio * 12}px;
        font-weight: 700;
        z-index: 2;
    }
`;

export const InfoCloud = styled(ItemCloud)`
    z-index: 200;
    top: var(--spacing_x3);
    transform: translate(-50%, 0);

    & p {
        font-size: ${({$ratio}) => $ratio * 20}px;
    }
`;

export const EduCloud = styled(InfoCloud)`
    top: 50%;
    transform: translate(-50%, -50%);
`;

const EduArrow = styled(motion.svg)`
    position: absolute;
    bottom: 250px;
    left: 140px;
`;

const EduArrowRight = styled(EduArrow)`
    left: auto;
    right: 140px;
`;

const CrushImage = styled(motion.img)`
    position: absolute;
    left: 49%;
    top: ${({$ratio}) => $ratio * -34}px;
    width: ${({$ratio}) => $ratio * 100}px;
    height: ${({$ratio}) => $ratio * 86}px;
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

export const Level4 = () => {
    const ratio = useSizeRatio();
    const { next, setProgress } = useProgress();
    const [isButtonsBlock, setIsButtonsBlock] = useState(true);

    useEffect(() => {
        setProgress(prev => ({...prev, stage: 'space', current: 223, percent: 82, duration: 0}))
    }, []);

    const {
        isStart,
        isEnd,
        wrapperRef,
        rocketRef,
        rocketX,
        rocketY,
        layerRef,
        imageRef,
        itemsRef,
        isEducation,
        questionId,
        isQuestionsShown,
        crushText,
        isCrushed,
        handleClick,
        handleStart,
        setCrushText,
        handleReplay,
    } = useGame();

    const handleGo = () => {
        reachMetrikaGoal('finishlevel3');
        setIsButtonsBlock(true);
    }

    const handleLink = () => {
        reachMetrikaGoal('program2');
        window.open('https://fut.ru/s/internship_curiosity', '_blank')
    };

    return (
        <Wrapper 
            $ratio={ratio}
            ref={wrapperRef}
        >
            <BgLayer ref={layerRef}>
                <BgImage ref={imageRef} src={bg} alt=""/>
            </BgLayer>
            <LeftAction onClick={() => handleClick('left')}/>
            <RightAction onClick={() => handleClick('right')}/>
            <ActiveBlock 
                ref={itemsRef}
                style={{x: rocketX, y: rocketY}}
                initial={{x: '-50%'}}  
                $ratio={ratio}
            >
               {objects.map((item) => (
                    <Item 
                        key={item.id} 
                        $left={item.left} 
                        $bg={item.bg} 
                        $width={item.width * ratio}  
                        $height={item.height * ratio} 
                        $bottom={item.bottom}
                    >
                        {
                            item.svg && (
                                <ItemCloud 
                                    $ratio={ratio}
                                    $width={item.svgSizes[0] * ratio}  
                                    $height={item.svgSizes[1] * ratio}
                                >
                                    {item.svg}
                                    <p>{item.text}</p>
                                </ItemCloud>
                            )
                        }
                    </Item>
               ))}
            </ActiveBlock>
            <RocketWrapper 
                ref={rocketRef} 
                $ratio={ratio}
            >
                {isCrushed && (
                    <CrushImage $ratio={ratio} initial={{scale: 0, x: '-50%'}} animate={{scale: 1}} exit={{opacity: 0}} src={crush} alt=""/>
                )}
                <Rocket $ratio={ratio} src={rocket} alt=""/>
                <RocketPath $ratio={ratio} src={path} alt=""/>
            </RocketWrapper>
            <AnimatePresence mode="wait">
                {
                    isEducation && (
                        <>
                            <EduCloud 
                                $ratio={ratio}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                $width={326 * ratio}  
                                $height={154 * ratio}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 326 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_f_64_334665)" data-figma-bg-blur-radius="6.84513">
                                    <path d="M291.773 76.5114C350.092 147.347 239.67 118.01 159.094 134.098C47.9162 143.926 -5.92747 116.705 26.4163 76.5114C-0.00696564 31.0875 54.1278 10.6132 159.094 18.925C285.221 14.4229 327.238 33.4706 291.773 76.5114Z" fill="white" fill-opacity="0.9"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_f_64_334665" x="-3.62396e-05" y="0.000452042" width="325.226" height="153.226" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_334665"/>
                                    </filter>
                                    <clipPath id="bgblur_0_64_334665_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M291.773 76.5114C350.092 147.347 239.67 118.01 159.094 134.098C47.9162 143.926 -5.92747 116.705 26.4163 76.5114C-0.00696564 31.0875 54.1278 10.6132 159.094 18.925C285.221 14.4229 327.238 33.4706 291.773 76.5114Z"/>
                                    </clipPath></defs>
                                </svg>
                                <p>
                                    Чтобы увернуться,{'\n'}
                                    {getIsTouchDevice() ? 'нажимай на левую или\nправую половину экрана' : 'управляй ракетой\nс помощью стрелок на клавиатуре'}
                                </p>
                            </EduCloud>
                            {
                                !getIsTouchDevice() && (
                                    <>
                                        <EduArrow 
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1, x: -20}}
                                            transition={{ x: {repeat: Infinity, duration: 0.75, repeatType: 'reverse'}}}
                                            exit={{opacity: 0}}
                                            width="58" height="24" viewBox="0 0 58 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M56 9.54688C57.1046 9.54688 58 10.4423 58 11.5469C58 12.6514 57.1046 13.5469 56 13.5469V11.5469V9.54688ZM0 11.5469L20 -0.000130653V23.0939L0 11.5469ZM56 11.5469V13.5469H18V11.5469V9.54688H56V11.5469Z" fill="#00DCFA"/>
                                        </EduArrow>
                                        <EduArrowRight
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1, x: 20}}
                                            transition={{ x: {repeat: Infinity, duration: 0.75, repeatType: 'reverse'}}}
                                            exit={{opacity: 0}}
                                            width="58" height="24" viewBox="0 0 58 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2 9.54688C0.89543 9.54688 0 10.4423 0 11.5469C0 12.6514 0.89543 13.5469 2 13.5469V11.5469V9.54688ZM58 11.5469L38 -0.000130653V23.0939L58 11.5469ZM2 11.5469V13.5469H40V11.5469V9.54688H2V11.5469Z" fill="#00DCFA"/>
                                        </EduArrowRight>
                                    </>
                                )
                            }
                        </>
                    )
                }
                {
                    crushText && crushTexts[crushText] && (
                        <InfoCloud 
                            key={crushText}
                            $ratio={ratio}
                            exit={{opacity: 0}}
                            $width={crushTexts[crushText]?.svgSizes[0] * ratio}  
                            $height={crushTexts[crushText]?.svgSizes[1] * ratio}
                        >
                            {crushTexts[crushText]?.svg}
                            <p>{crushTexts[crushText]?.text}</p>
                        </InfoCloud>
                    )
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    isQuestionsShown && (
                        <QuestionInteractive id={questionId} onAnswerWrong={() => setCrushText(CRUSH_TEXT_TYPE.wrong)} onPlay={handleReplay}/>
                    )
                }
                {isStart && (
                   <StartWrapper exit={{opacity: 0}}>
                        <Block zIndex={10}>
                            <p>
                                По курсу облако из астероидов каверзных вопросов и космического мусора сомнений. Настало время поверить в себя и преодолеть свои страхи — увернись от всех препятствий
                            </p>
                        </Block>
                        <Button zIndex={10} onClick={handleStart}>ВПЕРЁД</Button>
                   </StartWrapper>
                )}
                {isEnd && !isButtonsBlock &&  (
                   <StartWrapper exit={{opacity: 0}}>
                        <Block zIndex={10}>
                            <p>
                                Ты смог проскользнуть между астероидами. Так и в интервью с рекрутером: 
                                дальше проходит тот, кто гибко мыслит 
                                и не поддается страхам
                            </p>
                        </Block>
                        <Button zIndex={10} onClick={handleGo}>Полетели</Button>
                   </StartWrapper>
                )}
                {isButtonsBlock && (
                    <StartWrapper>
                        <ButtonsBlock>
                            <Button onClick={next}>Продолжить полет</Button>
                            <Button onClick={handleLink}>к программе</Button>
                        </ButtonsBlock>
                    </StartWrapper>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}
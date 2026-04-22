import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import bg from "../../../../assets/images/level2Bg.png";
import station from '../../../../assets/images/stationLevel2.png';
import oil1 from '../../../../assets/images/oil1.png';
import oil2 from '../../../../assets/images/oil2.png';
import { media } from "../../../../constants/media";
import { useMemo, useRef, useState } from "react";
import { CORRECT_COLOR, ERROR_COLOR, questions, SCENE_ZOOM } from "./constants";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import { MIN_MOCKUP_WIDTH } from "../../../ScreenTemplate";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { useProgress } from "../../../../contexts/ProgressContext";
import { CloudBlock } from "../../../shared/LevelCloudBlock";

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

const Stage = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    transform-origin: 82% 34%;

    ${media.desktop`
        transform-origin: 56% 30%;
    `}
`;

const StationImage = styled.img`
    position: absolute;
    z-index: 1;
    width: 546px;
    height: 728px;
    top: 69px;
    right: -79px;

    @media screen and (min-height: 700px) {
        top: auto;
        bottom: -139px;
    }

    ${media.desktop`
        top: -114px;
        bottom: auto;
        right: auto;
        left: -3px;
        width: 844px;
        height: 1125px;
    `}
`;

const ActionFieldWrapper = styled.div`
    position: absolute;
    right: 31px;
    top: 313px;
    padding: 1.5px;
    background: #A595BB;
    z-index: 2;
    border-radius: 4px;
    pointer-events: auto;

    @media screen and (min-height: 700px){
        top: auto;
        bottom: 270px;
    }

    ${media.desktop`
        padding: 4px;
        bottom: auto;
        right: auto;
        top: 264px;
        left: 592px;
    `}
`;

const ActionFieldInner = styled.div`
    padding: 3px;
    background: #EAD7E4;
    border-radius: 2.4px; 
    ${media.desktop`
        padding: 4px;
    `}
`;

const ActionFieldButtonWrapper = styled.div`
    padding: 4px 3px;
    background: #130D25;
    border-radius: 2.4px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 66px;
    width: 41.5px;

    ${media.desktop`
        padding: 6px 4.5px 7px;
        min-height: 102.5px;
        width: 63px;
    `}
`;

const BottomUi = styled(motion.div)`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing_x3);
    width: 100%;
`;

const Field = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 4px;
    width: 100%;
    height: 17.2px;
    border-radius: 2px;
    background: ${({$bg}) => $bg ?? '#3D386A'};
    transition: background 0.3s;
    color: white;

    ${media.desktop`
        height: 26.6px;
    `}

    &::after {
        content: '';
        position: absolute;
        bottom: 3px;
        width: 80%;
        left: 50%;
        background: white;
        height: 1px;
        border-radius: 1px;
        transform: translateX(-50%);

        ${media.desktop`
            bottom: 4px;
        `}
    }
`;

const blinkCaret = keyframes`
    0%, 49% {
        opacity: 1;
    }

    50%, 100% {
        opacity: 0;
    }
`;

const CursorAnimation = styled.span`
    width: 1px;
    height: 8px;
    border-radius: 1px;
    background: white;
    animation: ${blinkCaret} 1.15s steps(1, end) infinite;

    ${media.desktop`
        width: 2px;
        height: 15px;
    `}
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${({$ratio}) => $ratio * 335}px;
`;

const SmallElementsWrapper = styled.div`
    display: flex;
    position: absolute;
    right: 31px;
    top: 299px;
    z-index: 2;

    @media screen and (min-height: 700px){
        top: auto; 
        bottom: 351px;
    }

    ${media.desktop`
        bottom: auto;
        right: auto;
        top: 239px;
        left: 599px;
    `}
`;
const SmallElement = styled.div`
    width: 17px;
    height: 8px;

    background: ${({$bg}) => $bg};
    border: 0.41744px solid #352D41;
    box-shadow: 0px -2.78293px 5.56586px rgba(0, 0, 0, 0.25);
    border-radius: 2px;

    ${media.desktop`
        border-radius: 3.6526px;
        width: 23px;
        height: 11px;
    `}
`;

const AnswerButton = styled.button`
    background: ${({$bg}) => $bg ?? 'var(--color-accent)'};
    color: ${({$bg}) => $bg ? 'white' : 'black'};
    width: ${({$ratio}) => 90 * $ratio}px;
    height: ${({$ratio}) => 54 * $ratio}px;
    transition: background 0.3s;
    font-weight: 700;
    font-size: ${({$ratio}) => 18 * $ratio}px;

    @media (hover:hover) {
        &:hover {
            background: ${({$bg}) => $bg ?? 'var(--color-blue)'};
            color: white;
        }
    } 
`;

const ProblemPart = styled.p`
    font-weight: 700;
    margin-top: var(--spacing_x2);
`;

const AnswerField = styled.p`
    margin-top: -4px;

    ${media.desktop`
        margin-top: 0;
    `}
`;

const ModalBlock = styled(CloudBlock)`
    top: ${({$ratio}) => $ratio * 96}px;
    
    ${media.desktop`
        top: ${({$ratio}) => $ratio * 56}px;
    `}
`;

const OilContainer = styled.img`
    position: absolute;
    object-fit: contain;
    width: 76px;
    height: 403px;
    top: 292px;
    right: 169px;
    z-index: 6;

     @media screen and (min-height: 700px) {
        top: auto;
        bottom: -40px;
    }

    ${media.desktop`
        width: 126px;
        height: 624px;
        bottom: auto;
        top: 251px;
        left: 339px;
    `}
`;

const OilPistol = styled(motion.img)`
    position: absolute;
    object-fit: contain;
    width: 112px;
    height: 403px;
    top: 317px;
    right: 45px;
    z-index: 6;

     @media screen and (min-height: 700px) {
        top: auto;
        bottom: -50px;
    }

    ${media.desktop`
        width: 196px;
        height: 624px;
        bottom: auto;
        top: 268px;
        left: 452px;
    `}
`;

const fieldFocusTransition = {
    duration: 1.25,
    ease: [0.22, 1, 0.36, 1],
};

export const Level2 = () => {
    const ratio = useSizeRatio();
    const {next} = useProgress();
    const [currentField, setCurrentField] = useState(-1);
    const [isError, setIsError] = useState(false);
    const [answered, setAnswered] = useState([]);
    const [focusField, setFocusField] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isNextBlock, setIsNextBlock] = useState(false);
    const nextPressed = useRef(false);

    const question = useMemo(() => questions.find(({id}) => id === currentField), [currentField]);

    const getFieldBg = (index) => {
        if (isError && currentField === index) {
            return ERROR_COLOR;
        }

        if (answered.find(({question}) => question === index)) {
            return CORRECT_COLOR
        }

        if (currentField === index) {
            return 'var(--color-accent)';
        }
    };

    const handleStart = () => {
        setIsStarted(true);
        setFocusField(true);
        setCurrentField(0);
    }

    const getChildren = (index) => {
        const answeredQuestion = answered.find(({question}) => question === index);
        if (answeredQuestion) {
            return <AnswerField><b>{answeredQuestion?.answer?.text}</b></AnswerField>
        } else if (index === currentField) {
            return <CursorAnimation />
        }
    }

    const getAnimation = () => {
        if (!focusField) {
            return ({ scale: 1, x: 0, y: 0 });
        }

        if (window?.innerWidth > MIN_MOCKUP_WIDTH) {
            return ({scale: 1.9, x: -440, y: -130});
        }

        if (window?.innerHeight > 700) {
            return ({scale: 2.8, x: -185, y: -700});
        }

        return ({ scale: SCENE_ZOOM, x: "-37%", y: -200 })
    };

    const getAnswerBg = ({isCorrect, id}) => {
        const answeredQuestion = answered.find(({answer, question}) => question === currentField && answer.id === id);
        
        if (!answeredQuestion) {
            return;
        }

        if (isCorrect) return CORRECT_COLOR;

        return ERROR_COLOR;
    };

    const handleAnswer = (answer) => {
        nextPressed.current = false;
        const answeredId = answered.findIndex(({question}) => question === currentField);

        if (answered?.[answeredId]?.answer?.isCorrect) {
            return;
        }

        setIsError(!answer.isCorrect);

        if (answeredId >= 0) {
            setAnswered(prev => {
                const newAnswered = [...prev];
                newAnswered[answeredId] = {...newAnswered[answeredId], answer }

                return newAnswered;
            })
        } else {
            setAnswered(prev => ([...prev, {
                question: currentField,
                answer
            }]))
        }

        if (answer.isCorrect) {
            setTimeout(() => setIsNextBlock(true), 350);
        }
    }

    const handleNext = () => {
        if (nextPressed.current) {
            return;
        }

        if (currentField + 1 < questions.length) {
            nextPressed.current = true;
            setCurrentField(prev => prev + 1);
            
            setIsNextBlock(false);

            return;
        }

        setFocusField(false);
    }

    return (
        <Wrapper>
            <Stage
                initial={false}
                animate={getAnimation()}
                transition={fieldFocusTransition}
            >
                <StationImage src={station} alt="" />
                <OilContainer src={oil1} alt="" />
                <OilPistol 
                    src={oil2} 
                    alt="" 
                    animate={!focusField && answered.length > 0 ? {x: -30, y: 30} : {}}
                    transition={{duration: 1, delay: fieldFocusTransition.duration / 2}}
                    onAnimationComplete={next}
                />
                <SmallElementsWrapper>
                    <SmallElement $bg={"var(--color-accent)"} />
                    <SmallElement $bg={CORRECT_COLOR} />
                    <SmallElement $bg={ERROR_COLOR} />
                </SmallElementsWrapper>
                <ActionFieldWrapper>
                    <ActionFieldInner>
                        <ActionFieldButtonWrapper>
                            {Array.from({length: 3}).map((_, index) => (
                                <Field key={`field_${index}`} $bg={getFieldBg(index)}>
                                    {getChildren(index)}
                                </Field>
                            ))}
                        </ActionFieldButtonWrapper>
                    </ActionFieldInner>
                </ActionFieldWrapper>
            </Stage>
            <AnimatePresence>
                {isError && (
                    <ModalBlock $ratio={ratio} $width={326} $height={128} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <svg width="100%" height="100%" viewBox="0 0 326 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_64_88963)" data-figma-bg-blur-radius="6.84513">
                            <path d="M291.661 63.8885C349.957 119.671 239.58 96.5687 159.037 109.237C47.9037 116.977 -5.91814 95.5406 26.4125 63.8885C-3.62396e-05 28.1174 54.1128 11.994 159.037 18.5395C285.113 14.9941 327.113 29.9941 291.661 63.8885Z" fill="white" fill-opacity="0.9"/>
                            </g>
                            <defs>
                            <filter id="filter0_f_64_88963" x="-3.62396e-05" y="-3.62396e-05" width="325.108" height="127.938" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_88963"/>
                            </filter>
                            <clipPath id="bgblur_0_64_88963_clip_path" transform="translate(3.62396e-05 3.62396e-05)"><path d="M291.661 63.8885C349.957 119.671 239.58 96.5687 159.037 109.237C47.9037 116.977 -5.91814 95.5406 26.4125 63.8885C-3.62396e-05 28.1174 54.1128 11.994 159.037 18.5395C285.113 14.9941 327.113 29.9941 291.661 63.8885Z"/>
                            </clipPath></defs>
                            </svg>
                        <p>
                            <span style={{color: ERROR_COLOR}}>404:</span> код не найден в этой галактике
                        </p>
                    </ModalBlock>
                )}
                {currentField === 0 && !answered.length && (
                    <ModalBlock $ratio={ratio} $width={326} $height={128} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <svg width="100%" height="100%" viewBox="0 0 326 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_64_14793)" data-figma-bg-blur-radius="6.84513">
                        <path d="M291.661 63.889C349.957 119.672 239.58 96.5692 159.037 109.238C47.9038 116.977 -5.91808 95.5411 26.4126 63.889C2.47955e-05 28.1179 54.1129 11.9945 159.037 18.54C285.113 14.9946 327.113 29.9946 291.661 63.889Z" fill="white" fill-opacity="0.9"/>
                        </g>
                        <defs>
                        <filter id="filter0_f_64_14793" x="2.47955e-05" y="0.000452042" width="325.108" height="127.938" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_14793"/>
                        </filter>
                        <clipPath id="bgblur_0_64_14793_clip_path" transform="translate(-2.47955e-05 -0.000452042)"><path d="M291.661 63.889C349.957 119.672 239.58 96.5692 159.037 109.238C47.9038 116.977 -5.91808 95.5411 26.4126 63.889C2.47955e-05 28.1179 54.1129 11.9945 159.037 18.54C285.113 14.9946 327.113 29.9946 291.661 63.889Z"/>
                        </clipPath></defs>
                        </svg>


                        <p>
                            Реши примеры и введи правильные ответы{'\n'}
                            в ячейки замка
                        </p>
                    </ModalBlock>
                )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {
                    !isStarted ? (
                        <BottomUi exit={{opacity: 0}}>
                            <Block zIndex={13}>
                                <p>
                                Для дальнего полёта ракете нужно топливо, а тебе — мотивация. Заправься энергией перед следующим этапом отбора: видеоинтервью или тестированием. Подбери код, чтобы открыть замок
                                на колонке
                                </p>
                            </Block>
                            <Button onClick={handleStart}>Вперед!</Button>
                        </BottomUi>
                    ) : focusField && (
                        <BottomUi key={`question_${currentField}`} exit={{opacity: 0}} inital={{opacity: 0}} animate={{opacity: 1}}>
                            {isNextBlock ? (
                                <>
                                    <Block zIndex={13}>
                                        <p>{question.afterText}</p>
                                    </Block>
                                    <Button onClick={handleNext}>Далее</Button>
                                </>
                                ) : (
                                <>
                                    <Block>
                                        <p>{question.title}</p>
                                        <ProblemPart>{question.problem}</ProblemPart>
                                    </Block>
                                    <ButtonsWrapper $ratio={ratio}>
                                        {question.answers.map((answer) => (
                                            <AnswerButton 
                                                key={answer.id}
                                                $ratio={ratio}
                                                $bg={getAnswerBg(answer)}
                                                onClick={() => handleAnswer(answer)}
                                            >
                                                {answer.text}
                                            </AnswerButton>
                                        ))}
                                    </ButtonsWrapper>
                                </>
                            )}
                        </BottomUi>
                    )
                }
                
            </AnimatePresence>
        </Wrapper>
    )
}
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion, } from "framer-motion";
import bg from '../../../../assets/images/bgLevel1.png';
import path from '../../../../assets/images/pathLong.png';
import bgDesk from '../../../../assets/images/bgLevel1Desk.png';
import { media } from "../../../../constants/media";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { Modal } from "../../../shared/Modal";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import { useGame } from "./useGame";
import { ITEMS, ROCKET_MOVE_DELAY_SEC } from './constants';


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
`;

const HookItem = styled(motion.div)`
    position: absolute;
    height: ${({$height}) => $height}px;
    left: 50%;
    top: ${({ $ratio }) => $ratio * -18}px;
    width: ${({ $width }) => $width}px;
    z-index: 104;
`;

const HoldingItem = styled(motion.div)`
    position: absolute;
    left: 50%;
    top:  ${({$top}) => $top}px;
    width: ${({ $width }) => $width}px;
    height: ${({ $height }) => $height}px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${({ $bg }) => $bg});
    opacity: ${({ $isHidden }) => +(!$isHidden)};
    z-index: ${({$zIndex}) => $zIndex ?? 100};
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x3);
`;

const StartBlock = styled.div`
    margin-top: auto;
    padding-bottom: var(--spacing_x5);
`;

const TextBlock = styled(motion.div)`
    position: absolute;
    left: 50%;
    bottom: calc(6 * var(--spacing_x1));
    display: flex;
    align-items: center;
    text-align: center;
    width: ${({$ratio}) => $ratio * 190}px;
    height: ${({$ratio}) => $ratio * 75}px;
    white-space: pre-line;

    & svg {
        position: absolute;
        inset: 0;
    }

    & p {
        width: 100%;
        position: relative;
        z-index: 2;
        color: var(--color-dark-blue);
        font-weight: 500;
        font-size: ${({$ratio}) => $ratio * 14}px;
    }
`;

const SvgWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 351}px;
    height: ${({$ratio}) => $ratio * 130}px;
`;

const SvgText = styled.p`
    position: absolute;
    width: 100%;
    
    text-align: center;
    font-size: ${({$ratio}) => $ratio * 20}px;
    font-weight: 600;
    color: var(--color-dark-blue);
`;

const DarkenBlock = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgba(52,52,52,0.35);
`;

const BgLayer = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: url(${bg}) center 100% no-repeat;
    background-size: cover;

    ${media.desktop`
        background-image: url(${bgDesk});
    `}
`;


const Lights = styled(motion.img)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * -265}px;
    left: 50%;
    width: ${({$ratio}) => $ratio * 295 * 1.1}px;
    height: ${({$ratio}) => $ratio * 375 * 1.1}px;
    object-fit: contain;
    z-index: 0;
`;


const Hook = styled.div`
    position: absolute;
    inset: 0;
    z-index: 106;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${({ $bg }) => $bg});
`;

export const Level1 = () => {
    const ratio = useSizeRatio();
    const [isStartScreen, setIsStartScreen] = useState(true);

    const {
        isEnded, 
        handleScreenClick,
        initialXRight,
        x,
        isFalling,
        currentItem,
        fallenItems,
        getYPosition,
        xBlocks,
        isStarted,
        handleStart,
        scope,
        scopeItem,
        textId,
        blockWidth,
        rocketScope,
        handleEndGame,
        isShownLights,
    } = useGame(ratio);

    return (
        <>
            <BgLayer ref={rocketScope}/>
            <AnimatePresence>
                {!(isEnded || isShownLights) && (
                    <DarkenBlock exit={{opacity: 0}} />
                )}
            </AnimatePresence>
            <Wrapper $ratio={ratio} onClick={handleScreenClick}>
                <HookItem 
                    $ratio={ratio}
                    ref={scope}
                    key={`hook_item_${ITEMS[currentItem]?.id}`}
                    $height={ITEMS[currentItem]?.holding?.height * ratio}
                    $width={blockWidth}
                    initial={{ x: currentItem === 0 ? '-50%' : initialXRight.current }}
                    style={{x}}
                >
                    <Hook key={`hook_${currentItem}`} $bg={ITEMS[currentItem]?.holding?.src} />
                    <HoldingItem
                        $ratio={ratio}
                        $top={ITEMS[currentItem].top * ratio}
                        initial={{ x: '-50%' }}
                        $width={blockWidth}
                        $isHidden={isFalling || isShownLights}
                        $bg={ITEMS[currentItem]?.bg}
                        $height={ITEMS[currentItem]?.height * ratio}
                    />
                </HookItem>
                <HoldingItem
                    key={currentItem}
                    ref={scopeItem}
                    $top={ITEMS[currentItem].top * ratio}
                    $ratio={ratio}
                    initial={{ y: 0 }}
                    $isHidden={!isFalling || isEnded || isShownLights}
                    $width={blockWidth}
                    $bg={ITEMS[currentItem]?.bg}
                    $height={ITEMS[currentItem]?.height * ratio}
                />
                {fallenItems.map((item, index) => 
                    (
                        <HoldingItem
                            key={`static-${item.id}-${currentItem}`}
                            $bg={item.bg}
                            $ratio={ratio}
                            $zIndex={index + 1}
                            $width={blockWidth}
                            $top={item.top * ratio}
                            $height={item.height * ratio}
                            style={{y: getYPosition(index), x: (xBlocks ?? '-50%')}}
                            animate={ isShownLights ? {y: getYPosition(index) - 150 * ratio} : {}}
                            transition={{delay: 0.5, duration: 0.5}}
                        />
                    )
                )}
                <AnimatePresence>
                    {
                        isShownLights && (
                            <Lights 
                                $ratio={ratio} 
                                src={path}
                                animate={ isShownLights ? {y: -150 * ratio, opacity: 1 } : {opacity: 1}} 
                                initial={{opacity: 0, x: '-50%'}}
                                transition={ {
                                    y:{delay: ROCKET_MOVE_DELAY_SEC - 0.2, duration: 0.5},
                                    opacity:{ delay: ROCKET_MOVE_DELAY_SEC - 0.5, duration: 0.5},
                                }}
                                alt=""
                            />
                        )
                    }
                    {
                        textId > 0 && !isEnded && !isShownLights && (
                            <TextBlock
                                $ratio={ratio}
                                key={textId > 0 ? 'shown' : 'hidden'} 
                                initial={{
                                    opacity: 0,
                                    x: '-50%'
                                }}
                                exit={{opacity: 0}}
                                animate={{opacity: 1}}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 190 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_f_64_136951)" data-figma-bg-blur-radius="4">
                                    <path d="M170.434 37.4031C204.5 70 140 56.5 92.9343 63.9031C27.9929 68.4256 -3.45828 55.8992 15.4343 37.4031C0 16.5 50.1323 10.9031 92.9343 10.9031C143.674 6.26222 174.871 20.1735 170.434 37.4031Z" fill="white" fill-opacity="0.9"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_f_64_136951" x="0" y="0" width="189.979" height="74.8306" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_64_136951"/>
                                    </filter>
                                    <clipPath id="bgblur_0_64_136951_clip_path" transform="translate(0 0)"><path d="M170.434 37.4031C204.5 70 140 56.5 92.9343 63.9031C27.9929 68.4256 -3.45828 55.8992 15.4343 37.4031C0 16.5 50.1323 10.9031 92.9343 10.9031C143.674 6.26222 174.871 20.1735 170.434 37.4031Z"/>
                                    </clipPath></defs>
                                </svg>
                                <p>
                                    {ITEMS[textId - 1].text}
                                </p>
                            </TextBlock>
                        )
                    }
                </AnimatePresence>
            </Wrapper>
            <Modal isOpen={!isStartScreen && !isStarted} isDarken={false} onClick={handleStart}>
                <SvgWrapper $ratio={ratio}>
                    <svg width="100%" height="100%" viewBox="0 0 351 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_64_122727)">
                            <path d="M316.362 64.0323C378.69 119.986 260.678 96.8131 174.565 109.521C10.8253 121.113 -1.79845 95.7818 32.7682 64.0323C4.52896 28.1513 62.3843 11.9783 174.565 18.5439C309.361 14.9876 354.265 30.0337 316.362 64.0323Z" fill="white" fill-opacity="0.9"/>
                        </g>
                        <defs>
                        <filter id="filter0_f_64_122727" x="-3.62396e-05" y="-3.62396e-05" width="350.938" height="129.494" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_122727"/>
                        </filter>
                        <clipPath id="bgblur_0_64_122727_clip_path" transform="translate(3.62396e-05 3.62396e-05)"><path d="M316.362 64.0323C378.69 119.986 260.678 96.8131 174.565 109.521C10.8253 121.113 -1.79845 95.7818 32.7682 64.0323C4.52896 28.1513 62.3843 11.9783 174.565 18.5439C309.361 14.9876 354.265 30.0337 316.362 64.0323Z"/>
                        </clipPath></defs>
                    </svg>
                    <SvgText $ratio={ratio}>
                        Нажимай на экран, чтобы создать качественный фундамент из своего резюме
                    </SvgText>
                </SvgWrapper>
                
            </Modal>
            <Modal isOpen={isStartScreen} isDarken={false} isCentered={false}>
                <StartBlock>
                    <Block>
                        <p>Чтобы ракета смогла отправиться в полёт,
                            ей нужен крепкий каркас. Так же
                            и на лидерской программе Curiosity —
                            без структурного и качественного резюме
                            не получится пройти первый этап отбора</p>
                    </Block>
                    <ButtonStyled onClick={() => setIsStartScreen(false)}>Вперёд!</ButtonStyled>
                </StartBlock>
            </Modal>
            <Modal isOpen={isEnded} transition={{delay: 0.3}}>
                    <div>
                        <Block>
                        <p>
                            Ракета состоит из множества блоков,
                            а резюме — из фактов о тебе. Они рассказывают о тебе как о потенциальном кандидате и становятся первым шагом
                            на пути к цели
                        </p>
                    </Block>
                    <ButtonStyled onClick={handleEndGame}>Вперёд!</ButtonStyled>
                    </div>
            </Modal>
        </>
    )
}
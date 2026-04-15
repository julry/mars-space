import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import {ITEMS, LEAVE_DURATION_SEC, BLOCK_START_POSITION, BLOCK_BOTTOM_POSITION, NEXT_BLOCK_TIMEOUT, BLOCK_WIDTH, BLOCK_WIDTH_KOEF} from './constants';
import { Modal } from "../../../shared/Modal";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import {MIN_MOCKUP_WIDTH} from '../../../ScreenTemplate';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    background-color: ${({ $isEnded }) => $isEnded ? 'black' : 'transparent'};
`;

const HookItem = styled(motion.div)`
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: yellow;
    left: 50%;
    top: 0;
    width: ${({ $ratio }) => $ratio * BLOCK_WIDTH * BLOCK_WIDTH_KOEF}px;

    @media screen and (min-width: ${MIN_MOCKUP_WIDTH}px){
        width: ${BLOCK_WIDTH}px;
    }
`;

const HoldingItem = styled(motion.div)`
    position: absolute;
    left: 50%;
    top: 100px;
    width: ${({ $ratio }) => $ratio * BLOCK_WIDTH * BLOCK_WIDTH_KOEF}px;
    height: ${({ $height }) => $height}px;
    background-color: ${({ $bg }) => $bg};
    opacity: ${({ $isHidden }) => +(!$isHidden)};
    z-index: ${({$zIndex}) => $zIndex ?? 100};

    @media screen and (min-width: ${MIN_MOCKUP_WIDTH}px){
        width: ${BLOCK_WIDTH}px;
    }
`;

const StartBlock = styled.div`
    margin-top: auto;
    padding-bottom: var(--spacing_x5);

    & button {
      margin-top: var(--spacing_x3);
    }
`;

export const Level1 = () => {
    const ratio = useSizeRatio();
    const controls = useAnimation();
    const itemControls = useAnimation();
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [isFalling, setIsFalling] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fallenItems, setFallenItems] = useState([]);
    const [currentX, setCurrentX] = useState(0);
    const [isFailed, setIsFailed] = useState(false);
    const timeoutRef = useRef(null);
    const initialXRight = useRef(0);
    const blockWidth = useRef(0);
    const fallenY = useRef(0);
    const isReturningRef = useRef(false);
    const [xBlocks, setXBlocks] = useState([]);
    const x = useMotionValue(0);
    const x1 = useMotionValue(0);

    useEffect(() => {
        blockWidth.current = (window.innerWidth < MIN_MOCKUP_WIDTH ? BLOCK_WIDTH_KOEF : 1) * BLOCK_WIDTH;
        initialXRight.current = (window.innerWidth >= MIN_MOCKUP_WIDTH ? MIN_MOCKUP_WIDTH : window.innerWidth) / 2;
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = (BLOCK_START_POSITION + BLOCK_BOTTOM_POSITION) * ratio;

        fallenY.current = gameHeight - spacing;
    }, [])

    const getYPosition = (index) => {
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = (BLOCK_START_POSITION + BLOCK_BOTTOM_POSITION) * ratio;

        const heights = ITEMS.reduce((res, current) => {
            if (current.id < index) {
                res = res + current.height;
            }

            return res;
        }, 0);

        const bottomPostition = (ITEMS[index].y ?? heights) * ratio;

        return gameHeight - bottomPostition * ratio - (ITEMS[index]?.height ?? 0) * ratio - spacing;
    }

    useMotionValueEvent(x, 'change', (latest) => {
        x1.set(latest);
    })

    const handleScreenClick = () => {
        if (isEnded) {
            return;
        }

        if (isAnimating || !isStarted) return;

        setIsAnimating(true);
        isReturningRef.current = false;
        setIsFalling(true);
        itemControls.stop();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        itemControls.start({
            y: getYPosition(currentItem),
            transition: {
                type: "spring",
                damping: 20
            }
        })

        controls.stop();

        setXBlocks(prev => [...prev, x.get()]);

        if (xBlocks.length > 0) {
            const dist = Math.abs(x.get() - xBlocks[xBlocks.length - 1]);

            if (dist > blockWidth.current) {
                setIsFailed(true);

                return;
            }
        }
        controls.start({
            x: -1 * initialXRight.current - blockWidth.current,
            transition: { duration: LEAVE_DURATION_SEC, ease: "easeInOut" }
        });
    };

    const handleMove = (itemMove = 0, timeout = 10) => {
        const width = (window.innerWidth < MIN_MOCKUP_WIDTH ? BLOCK_WIDTH_KOEF : 1) * BLOCK_WIDTH;

        timeoutRef.current = setTimeout(() => {
            controls.start({
                x: [initialXRight.current - width, -initialXRight.current, initialXRight.current - width],
                transition: {
                    repeat: Infinity,
                    duration: 4,
                    ease: 'linear',
                    repeatType: 'mirror'
                },
            });
        }, timeout)
    }

    const restartAnimation = (args) => {
        if (currentItem + 1 > ITEMS.length) {
            return;
        }

        if (Array.isArray(args.x) && args.x[1] === (initialXRight.current - blockWidth.current)) {
            handleMove();
            setIsAnimating(false);

            return;
        }

        if (currentItem + 1 >= ITEMS.length || args.x > -1 * initialXRight.current - blockWidth.current) {
            return;
        }

        setCurrentItem(prev => prev + 1);

        setIsFalling(false);
        setFallenItems(prev => [...prev, ITEMS[currentItem]]);
        controls.set({
            x: initialXRight.current
        });
        x.set(initialXRight.current);
        itemControls.set({
            y: 0,
        });


        setTimeout(() => {
            controls.start({
                x: [initialXRight.current, initialXRight.current - blockWidth.current],
                transition: {
                    duration: 1,
                    ease: 'linear',
                },
            });
            
        }, 10);
    }

    const handleStart = () => {
        setIsStarted(true);
        const width = (window.innerWidth < MIN_MOCKUP_WIDTH ? BLOCK_WIDTH_KOEF : 1) * BLOCK_WIDTH;

        // TODO: duration based on screen size;
        controls.start({
            x: initialXRight.current - width,
            transition: {
                duration: 1.6,
                ease: 'linear',
            },
        });

        handleMove(0, 1601);
    }

    return (
        <>
            <Wrapper $ratio={ratio} $isEnded={isEnded} onClick={handleScreenClick}>
                    <HookItem 
                        $ratio={ratio}
                        key={ITEMS[currentItem]?.id}
                        animate={controls}
                        initial={{ x: currentItem === 0 ? '-50%' : initialXRight.current }}
                        onAnimationComplete={restartAnimation}
                        style={{x}}
                    >
                        <HoldingItem
                            $ratio={ratio}
                            initial={{ x: '-50%' }}
                            $isHidden={isFalling}
                            $bg={ITEMS[currentItem]?.bg}
                            $height={ITEMS[currentItem]?.height * ratio}
                        />
                    </HookItem>
                    <HoldingItem
                        key={{currentItem}}
                        $ratio={ratio}
                        initial={{ y: 0 }}
                        animate={itemControls}
                        style={xBlocks[currentItem] !== undefined ? {x: xBlocks[currentItem]} : {x: x1}}
                        $isHidden={!isFalling}
                        $bg={ITEMS[currentItem]?.bg}
                        $height={ITEMS[currentItem]?.height * ratio}
                    />
                    {fallenItems.map((item, index) => 
                        (
                            <HoldingItem
                                key={`static-${item.id}-${currentItem}`}
                                $bg={item.bg}
                                $zIndex={index}
                                $height={item.height * ratio}
                                initial={{ y: getYPosition(index), x: xBlocks[index] }}
                            />
                        )
                    )}
                {/* {ITEMS.map((item, index) => (
                    <HoldingItem
                        key={`static-${item.id}-${currentItem}`}
                        $bg={item.bg}
                        $height={item.height * ratio}
                        initial={{ x: xBlocks[index] ?? x.get(), y: index < currentItem ? getYPosition(index) : 0 }}
                        $isHidden={index > currentItem || (index === currentItem && !isFalling)}
                        animate={index === currentItem ? itemControls : {}}
                    />
                ))} */}
            </Wrapper>
            <Modal isOpen={!isStarted} isDarken={false} isCentered={false}>
                <StartBlock>
                    <Block>
                        <p>Чтобы ракета смогла отправиться в полёт,
                            ей нужен крепкий каркас. Так же
                            и на лидерской программе Curiosity —
                            без структурного и качественного резюме
                            не получится пройти первый этап отбора</p>
                    </Block>
                    <Button onClick={handleStart}>Вперёд!</Button>
                </StartBlock>
            </Modal>
        </>
    )
}
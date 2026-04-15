import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import {ITEMS, LEAVE_DURATION_SEC, BLOCK_START_POSITION, BLOCK_TOP_START_POSITION, BLOCK_BOTTOM_POSITION, NEXT_BLOCK_TIMEOUT, BLOCK_WIDTH} from './constants';
import { Modal } from "../../../shared/Modal";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    background-color: ${({ $isEnded }) => $isEnded ? 'black' : 'transparent'};
`;

const HookItem = styled(motion.div)`
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    background-color: yellow;
`;

const HoldingItem = styled(motion.div)`
    position: absolute;
    left: 50%;
    top: 100px;
    width: ${BLOCK_WIDTH}px;
    height: ${({ $height }) => $height}px;
    background-color: ${({ $bg }) => $bg};
    opacity: ${({ $isHidden }) => +(!$isHidden)};
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
    const [currentX, setCurrentX] = useState(0);
    const timeoutRef = useRef(null);
    const isReturningRef = useRef(false);
    const [xBlocks, setXBlocks] = useState([]);
    const x = useMotionValue(0);
    const x1 = useMotionValue(0);

    const getYPosition = (index) => {
        const gameHeight = (window.innerWidth >= 750 ? 677 : window.innerHeight);
        const spacing = (BLOCK_START_POSITION + BLOCK_BOTTOM_POSITION) * ratio;

        const heights = ITEMS.reduce((res, current) => {
            if (current.id < index) {
                res = res + current.height
            }

            return res;
        }, 0);

        return gameHeight - heights * ratio - (ITEMS[index]?.height ?? 0) * ratio - spacing;
    }

    useMotionValueEvent(x, 'change', (latest) => {
        // console.log(latest);
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
        setXBlocks(prev => [...prev, x.get() - BLOCK_WIDTH / 2]);

        itemControls.start({
            y: getYPosition(currentItem),
            transition: {
                type: "spring",
                damping: 20
            }
        })
        controls.start({
            x: -1 * Math.min(750, window.innerWidth),
            transition: { duration: LEAVE_DURATION_SEC, ease: "easeInOut" }
        });
    };

    const handleMove = (timeout = 10) => {
        setTimeout(() => {
            controls.start({
                x: [0, -1 * Math.min(750, window.innerWidth) / 2, 0, Math.min(750, window.innerWidth) / 2, 0],
                transition: {
                    repeat: Infinity,
                    duration: 4,
                    ease: 'linear',
                },
            })

            itemControls.start({
                x: [-BLOCK_WIDTH / 2, -1 * Math.min(750, window.innerWidth) / 2 - BLOCK_WIDTH / 2, 0, Math.min(750, window.innerWidth) / 2 + BLOCK_WIDTH / 2, -BLOCK_WIDTH / 2],
                transition: {
                    repeat: Infinity,
                    duration: 4,
                    ease: 'linear',
                },
            })
        }, timeout)
    }

    const handleAnimationComplete = () => {
        if (!isReturningRef.current) {
            if (currentItem === ITEMS.length - 1) {
                return;
            }
            // Первая анимация завершена (уехал влево)
            isReturningRef.current = true;
            setIsFalling(false);
            setCurrentItem(prev => prev + 1);

            // Через 0.5 сек начинаем движение справа в центр
            timeoutRef.current = setTimeout(() => {
                setCurrentX(Math.min(750, window.innerWidth));

                // Небольшая задержка чтобы DOM обновился
                setTimeout(() => {
                    controls.start({
                        x: 0,
                        transition: { duration: LEAVE_DURATION_SEC, ease: "easeInOut" }
                    });
                }, 20);
            }, NEXT_BLOCK_TIMEOUT);
        } else {
            // Вторая анимация завершена (вернулся в центр)
            setCurrentX(0);
            setIsAnimating(false);
            isReturningRef.current = false;

            handleMove();
        }
    };


    const handleStart = () => {
        setIsStarted(true);
        handleMove()
    }

    return (
        <>
            <Wrapper $ratio={ratio} $isEnded={isEnded} onClick={handleScreenClick}>
                <HookItem
                    key={currentX} // Пересоздаем при смене currentX
                    animate={controls}
                    initial={{ x: currentX }}
                    onAnimationComplete={handleAnimationComplete}
                    style={{x}}
                >
                    {ITEMS.map((item, index) => (
                        <HoldingItem
                            initial={{ x: '-50%' }}
                            key={item.id}
                            $isHidden={isFalling || index !== currentItem}
                            $bg={item.bg}
                            $height={item.height * ratio}
                        />
                    ))}
                </HookItem>

                {/* <HoldingItem
                    id="hui"
                    initial={{ x: '-50%' }}
                    style={{x1}}
                    $bg={ITEMS[currentItem].bg}
                    $height={ITEMS[currentItem].height * ratio}
                /> */}
                {ITEMS.map((item, index) => (
                    <HoldingItem
                        key={`static-${item.id}-${currentItem}`}
                        $bg={item.bg}
                        $height={item.height * ratio}
                        initial={{ x: xBlocks[index] ?? x.get(), y: index < currentItem ? getYPosition(index) : 0 }}
                        $isHidden={index > currentItem || (index === currentItem && !isFalling)}
                        animate={index === currentItem ? itemControls : {}}
                    />
                ))}
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
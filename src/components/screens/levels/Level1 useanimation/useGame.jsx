import { useEffect, useRef, useState } from 'react';
import { useAnimate, useAnimation, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { ITEMS, LEAVE_DURATION_SEC, BLOCK_START_POSITION, BLOCK_BOTTOM_POSITION, BLOCK_WIDTH, BLOCK_WIDTH_KOEF } from './constants';
import { MIN_MOCKUP_WIDTH } from '../../../ScreenTemplate';

export const useGame = (ratio) => {
    const controls = useAnimation();
    const [scope, animate] = useAnimate();
    const itemControls = useAnimation();
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [isFalling, setIsFalling] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fallenItems, setFallenItems] = useState([]);
    const [isFailed, setIsFailed] = useState(false);
    const timeoutRef = useRef(null);
    const initialXRight = useRef(0);
    const blockWidth = useRef(0);
    const fallenY = useRef(0);
    const fallenItem = useRef();
    const direction = useRef();
    const xPrev = useRef();
    const isReturningRef = useRef(false);
    const [xBlocks, setXBlocks] = useState();
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

        animate.stop();

        if (xBlocks !== undefined) {
            const dist = Math.abs(x.get() - xBlocks);

            if (dist > blockWidth.current) {
                setIsFailed(true);

                itemControls.start({
                    y: fallenY.current - ITEMS[currentItem].height,
                    x: [x.get(), x.get()],
                    transition: {
                        type: "spring",
                        damping: 20
                    }
                });

                return;
            }
        }

        if (currentItem === 0) {
            setXBlocks(x.get());
        }
        
        itemControls.start({
            y: getYPosition(currentItem),
            x: [x.get(), xBlocks ?? x.get()],
            transition: {
                type: "spring",
                damping: 20
            }
        })

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
                onUpdate: (latest) => {
                    console.log(latest);
                }
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

    const handleCompleteItemAnimation = (args) => {
        console.log(Math.abs(x.getPrevious()) - Math.abs(x.get()));
        console.log(x.getPrevious() + initialXRight.current);
        console.log(x.get() + initialXRight.current);
        if (x.getPrevious() - x.get() > 0) {
            console.log('left');
        }  else {
            console.log('right')
        }

        if (isFailed && !fallenItem.current) {
            itemControls.start({
                y: 0,
                transition: {
                    type: "spring",
                    damping: 20
                }
            });

            setIsFailed(false);
            setIsFalling(false);
            fallenItem.current = true;

            return;
        } else if (fallenItem.current) {

            // controls.start();
        }
    };

    return {
        controls,
        currentItem,
        fallenItems,
        initialXRight,
        isEnded, 
        isStarted,
        isFalling,
        itemControls,
        xBlocks,
        x,
        getYPosition,
        handleCompleteItemAnimation,
        handleStart,
        handleScreenClick,
        restartAnimation,
        scope
    }
}
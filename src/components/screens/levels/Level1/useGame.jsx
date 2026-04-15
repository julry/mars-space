import { useEffect, useRef, useState } from 'react';
import { useAnimate, useAnimation, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import {ITEMS, LEAVE_DURATION_SEC, BLOCK_START_POSITION, BLOCK_BOTTOM_POSITION, BLOCK_WIDTH, BLOCK_WIDTH_KOEF, SPRING_TRANSITION, FULL_MOVE_SEC} from './constants';
import { MIN_MOCKUP_WIDTH } from '../../../ScreenTemplate';

export const useGame = (ratio) => {
    const controls = useRef();
    const [scope, animate] = useAnimate();
    const [blockWidth, setBlockWidth] = useState(0);
    const [textId, setTextId] = useState(0);
    const [scopeItem, animateItem] = useAnimate();
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [isFalling, setIsFalling] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fallenItems, setFallenItems] = useState([]);
    const initialXRight = useRef(0);
    const isEmptyList = useRef(false);
    const fallenY = useRef(0);
    const durationK = useRef(0);
    const initialXBlock = useRef(0);
    const isReturningRef = useRef(false);
    const [xBlocks, setXBlocks] = useState();
    const x = useMotionValue(0);

    useEffect(() => {
        setBlockWidth((window.innerWidth < MIN_MOCKUP_WIDTH ? BLOCK_WIDTH_KOEF : 1) * BLOCK_WIDTH * ratio);
        initialXRight.current = (window.innerWidth >= MIN_MOCKUP_WIDTH ? MIN_MOCKUP_WIDTH : window.innerWidth) / 2;
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = (BLOCK_START_POSITION + BLOCK_BOTTOM_POSITION) * ratio;
        initialXBlock.current = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 255 : scope.current.getBoundingClientRect().left);
        durationK.current = (2 * initialXRight.current) / MIN_MOCKUP_WIDTH;
        fallenY.current = gameHeight - spacing;
    }, [ratio])

    const getYPosition = (index) => {
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = (BLOCK_START_POSITION + BLOCK_BOTTOM_POSITION) * ratio;

        const heights = ITEMS.reduce((res, current) => {
            if (current.id < index) {
                res = res + (current.height ?? 0) * ratio;
            }

            return res;
        }, 0);

        const bottomPostition = (ITEMS[index].y ?? heights) * ratio;

        return gameHeight - bottomPostition * ratio - (ITEMS[index]?.height ?? 0) * ratio - spacing;
    }

    const handleScreenClick = () => {
        if (isEmptyList.current) {
            setIsEnded(true);

            return;
        };

        if (isEnded || isAnimating || !isStarted) {
            return;
        }

        setIsAnimating(true);
        isReturningRef.current = false;
        setIsFalling(true);

        controls.current.pause();

        if (xBlocks !== undefined) {
            const dist = Math.abs(x.get() - xBlocks);

            if (dist > blockWidth) {

                animateItem(scopeItem.current,
                    {
                        y: [0, fallenY.current - ITEMS[currentItem].height * ratio],
                        x: [x.get(), x.get()],
                    }, 
                    SPRING_TRANSITION
                ).then(returnToBlock);

                return;
            }
        }

        controls.current.stop();

        if (currentItem === 0) {
            setXBlocks(x.get());
        }
        
        animateItem(scopeItem.current,
            {
                y: [0, getYPosition(currentItem)],
                x: [x.get(), xBlocks ?? x.get()],
            }, 
            SPRING_TRANSITION
        ).then(() => setTextId(prev => prev + 1));

        animate(scope.current, {
            x: -1 * initialXRight.current - blockWidth,
        }, { duration: LEAVE_DURATION_SEC, ease: "easeInOut" }).then(() => {
            startNewBlock();
        });
    };

    const handleMove = () => {
        controls.current = animate(scope.current, {
            x: [initialXRight.current - blockWidth, -initialXRight.current, initialXRight.current - blockWidth],
        }, {
                repeat: Infinity,
                duration: FULL_MOVE_SEC * durationK.current,
                ease: 'linear',
                repeatType: 'mirror'
            },);
    }

    const startNewBlock = () => {
        if (currentItem + 1 >= ITEMS.length) {
            isEmptyList.current = true;
            return;
        }

        setCurrentItem(prev => prev + 1);
        setIsFalling(false);
        setFallenItems(prev => [...prev, ITEMS[currentItem]]);

        setTimeout(() => {
            animate(scope.current,
                {
                    x: [initialXRight.current, initialXRight.current - blockWidth],
                }, 
                {
                    duration: 1 * durationK.current,
                    ease: 'linear',
                },
            ).then(() => {
                handleMove();
                setIsAnimating(false);
            });
            
        }, 10);
    };

    const handleStart = async () => {
        setIsStarted(true);
        const duration = durationK.current * FULL_MOVE_SEC * 1.25; 


        console.log(blockWidth);
        // TODO: duration based on screen size;
        controls.current = animate(scope.current, {
            x: [-blockWidth / 2, -initialXRight.current, initialXRight.current - blockWidth],
        }, {
                duration,
                times: [0, 0.25, 1],
                ease: 'linear',
        },);

        controls.current.then(() => {
            handleMove();
        })
    }

    const returnToBlock = () => {
        animateItem(scopeItem.current, 
            {
                y: 0
            }, 
            SPRING_TRANSITION
        ).then(() => {
            setIsFalling(false);
            setIsAnimating(false);
            controls.current.play();
        })
    }

    return {
        currentItem,
        fallenItems,
        initialXRight,
        isEnded, 
        isStarted,
        isFalling,
        xBlocks,
        x,
        getYPosition,
        handleStart,
        handleScreenClick,
        scope,
        scopeItem, 
        textId,
        blockWidth
    }
}
import { useEffect, useRef, useState } from 'react';
import { useAnimate, useMotionValue } from 'framer-motion';
import { ITEMS, LEAVE_DURATION_SEC, BLOCK_BOTTOM_POSITION, BLOCK_WIDTH, 
        BLOCK_WIDTH_KOEF, SPRING_TRANSITION, FULL_MOVE_SEC, ROCKET_MOVE_DELAY_SEC
} from './constants';
import { MIN_MOCKUP_WIDTH } from '../../../ScreenTemplate';
import { useSizeRatio } from '../../../../contexts/SizeRatioContext';

export const useGame = () => {
    const controls = useRef();
    const ratio = useSizeRatio();
    const [scope, animate] = useAnimate();
    const [rocketScope, animateRocket] = useAnimate();
    const [scopeItem, animateItem] = useAnimate();
    const [blockWidth, setBlockWidth] = useState(0);
    const [textId, setTextId] = useState(0);
    const [isShownLights, setIsShownLights] = useState(false);
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
    const [xBlocks, setXBlocks] = useState([]);
    const x = useMotionValue(0);

    useEffect(() => {
        setBlockWidth((window.innerWidth < MIN_MOCKUP_WIDTH ? BLOCK_WIDTH_KOEF : 1) * BLOCK_WIDTH * ratio);
        initialXRight.current = (window.innerWidth >= MIN_MOCKUP_WIDTH ? MIN_MOCKUP_WIDTH : window.innerWidth) / 2;
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = BLOCK_BOTTOM_POSITION * ratio;
        initialXBlock.current = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 255 : scope.current.getBoundingClientRect().left);
        durationK.current = (2 * initialXRight.current) / MIN_MOCKUP_WIDTH;
        fallenY.current = gameHeight - spacing;
    }, [ratio])

    const getYPosition = (index) => {
        const gameHeight = (window.innerWidth >= MIN_MOCKUP_WIDTH ? 677 : window.innerHeight);
        const spacing = (BLOCK_BOTTOM_POSITION + ITEMS[index].top) * ratio;

        const bottomPostition = (ITEMS[index].y ?? 0) * ratio;

        return gameHeight - bottomPostition - (ITEMS[index]?.height ?? 0) * ratio - spacing;
    }

    const getIsMissing = () => {
        const actualX = x.get() + (blockWidth - ITEMS[currentItem].actualWidth * ratio) / 2;
        const actualXPrevious = xBlocks[currentItem - 1] + (blockWidth -  ITEMS[currentItem - 1].actualWidth * ratio) / 2;

        const dist = Math.abs(actualX - actualXPrevious);

        return dist > ITEMS[currentItem].actualWidth * ratio;
    };

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

        if (xBlocks[currentItem - 1] !== undefined) {
            const shouldFall = getIsMissing(x.get(), ITEMS[currentItem]);

            // TODO: поправить с учетом того что объекты меньше чем blockWidth
            if (shouldFall) {
                animateItem(scopeItem.current,
                    {
                        y: [0, fallenY.current - ITEMS[currentItem].height * ratio],
                        x: [x.get(), x.get()],
                    }, 
                    SPRING_TRANSITION
                )
                .then(returnToBlock);

                return;
            }
        }

        controls.current.stop();
        setXBlocks(prev => [...prev, x.get()]);
        
        animateItem(scopeItem.current,
            {
                y: [0, getYPosition(currentItem)],
                x: [x.get(), xBlocks[0] ?? x.get()],
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
        setFallenItems(prev => [...prev, ITEMS[currentItem]]);

        if (currentItem + 1 >= ITEMS.length) {
            isEmptyList.current = true;
            return;
        }

        setIsFalling(false);
        setCurrentItem(prev => prev + 1);

        //TODO: think about edges
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
                y: 0,
            }, 
            SPRING_TRANSITION
        ).then(() => {
            setIsFalling(false);
            setIsAnimating(false);
            controls.current.play();
        })
    }

    const handleEndGame = () => {  
        setIsEnded(false);
        setIsShownLights(true);
        setTimeout(() => {
            animateRocket(rocketScope.current, {
                backgroundPositionY: ['100%', 0],
            }, {
                duration: 5.6,
                ease: 'linear',
            });}, 
            ROCKET_MOVE_DELAY_SEC * 1000);
    }

    return {
        isShownLights,
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
        blockWidth,
        rocketScope,
        animateRocket,
        handleEndGame
    }
}
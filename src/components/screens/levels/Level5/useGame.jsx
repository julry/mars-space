import {useAnimate, useMotionValue} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import {DIRECTIONS, DURATION_LANDING, DURATION_PATH} from './constants';
import {getIsTouchDevice} from '../../../../utils/getIsTouchDevice';
import { useSizeRatio } from '../../../../contexts/SizeRatioContext';
export const useGame = () => {
    const ratio = useSizeRatio();

    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isPath, setIsPath] = useState(true);

    const [layerRef, animate] = useAnimate();
    const [rocketRef, animateRocket] = useAnimate();
    const rocketX = useMotionValue(0);
    const rocketY = useMotionValue(0);
    const imageRef = useRef();
    const wrapperRef = useRef();
    const xRef = useRef(0);
    const moveDist = useRef();
    const direction = useRef();
    const isMoving = useRef(false);
    const rocketMovingUp = useRef();
    const rocketRotate = useRef();

    const moveLeft = () => {
        if (isMoving.current) {
            return;
        }
        isMoving.current = true;
        if (direction.current === DIRECTIONS.right) {
            animateRocket(rocketRef.current, {
                x: 0,
            }).then(() => {
                isMoving.current = false
            });
            direction.current = undefined;
        } else {
            animateRocket(rocketRef.current, {
                x: -moveDist.current,
            }).then(() => {
                isMoving.current = false
            });
            direction.current = DIRECTIONS.left;
        }
    };

    const moveRight = () => {
        if (isMoving.current) {
            return;
        }

        isMoving.current = true;

        if (direction.current === DIRECTIONS.left) {
            animateRocket(rocketRef.current, {
                x: 0,
            }).then(() => {
                isMoving.current = false
            });
            direction.current = undefined;
        } else {
            animateRocket(rocketRef.current, {
                x: moveDist.current,
            }).then(() => {
                isMoving.current = false
            });
            direction.current = DIRECTIONS.right;
        }
    };

    const handlePressKey = (e) => {
        const leftKeys = [37, 65];
        const rightKeys = [39, 68];
        const isLeft = leftKeys.includes(e.which) || leftKeys.includes(e.keyCode);
        const isRight = rightKeys.includes(e.which) || rightKeys.includes(e.keyCode);

        if (isLeft && direction.current !== DIRECTIONS.left) {
            moveLeft();
        }

        if (isRight && direction.current !== DIRECTIONS.right) {
            moveRight();
        }
    };

    useEffect(() => {
        moveDist.current = rocketRef.current.getBoundingClientRect().width - 40 * ratio;
        window.addEventListener('keydown', handlePressKey);

        return () => window.removeEventListener('keydown', handlePressKey);
    }, []);

    const handleStart = () => {
        const wrapperRect = wrapperRef.current.getBoundingClientRect(); 
        setIsStart(false);
        rocketMovingUp.current = animate(layerRef.current, {
                y: -imageRef.current.getBoundingClientRect().height + wrapperRect.height
            },
            {
                duration: DURATION_PATH,
                ease: 'linear'
            }
        )

        rocketMovingUp.current.then(() => {
            setIsPath(false);
            animateRocket(rocketRef.current, {
                y: wrapperRect.bottom - rocketRef.current.getBoundingClientRect().bottom - 80 * ratio
            },
            {
                duration: DURATION_LANDING
            }).then(() => {
                setIsEnd(true);
            })
        }, []);

        setTimeout(() => {
            rocketRotate.current = animateRocket(rocketRef.current, {
                rotate: 60,
            },
            {
                duration: 3
            }
        )
        }, 200)
    };

    const handleClick = (e) => {
        if (!getIsTouchDevice()) {
            return;
        }
        if (e.clientX < (wrapperRef.current.getBoundingClientRect().width / 2)) {
            moveLeft();
        } else {
            moveRight();
        }
    }

    return {
        wrapperRef,
        rocketRef,
        rocketX,
        rocketY,
        layerRef,
        imageRef,
        isStart,
        isEnd,
        isPath,
        handleClick,
        handleStart
    }
}
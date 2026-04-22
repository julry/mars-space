import {useAnimate, useMotionValue} from 'framer-motion';
import {useRef, useState} from 'react';
import {DIRECTIONS, DURATION_LANDING, DURATION_PATH, DURATION_REVEAL, DURATION_ROTATION} from './constants';
import { useSizeRatio } from '../../../../contexts/SizeRatioContext';
export const useGame = () => {
    const ratio = useSizeRatio();

    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isPath, setIsPath] = useState(true);
    const [phrase, setPhrase] = useState();

    const [layerRef, animate] = useAnimate();
    const [rocketRef, animateRocket] = useAnimate();
    const rocketY = useMotionValue(0);
    const imageRef = useRef();
    const wrapperRef = useRef();
    const rotateDirection = useRef(DIRECTIONS.right);
    const rocketMovingUp = useRef();
    const rocketRotate = useRef();
    const isRotating = useRef(false);
    const rotationsAmount = useRef(0);

    const moveDown = () => {
        const wrapperRect = wrapperRef.current.getBoundingClientRect(); 
        
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
                rocketMovingUp.current.pause();
                setIsEnd(true);
            })
        });
    }

    const handleStart = () => {
        setIsStart(false);

        moveDown();

        setTimeout(() => {
            isRotating.current = true;
            rotateRocket();
        }, 200);
    };

    const restartRotation = () => {
        rocketMovingUp.current.pause();
        animate(layerRef.current, {
                y: rocketY.get() > -300 ? 0 : rocketY.get() + 300,
            },
            {
                duration: DURATION_ROTATION / 2,
                ease: 'linear'
            }
        );

        rocketRotate.current = animateRocket(rocketRef.current, {
            rotate: 0,
        },
        {
            duration: DURATION_ROTATION / 2
        }).then(() => {
            moveDown();

            setTimeout(() => {
                isRotating.current = true;
                rotateRocket();
            }, 200)
        });
    }
    

    const rotateRocket = () => {
        if (rotationsAmount.current > 2 || isEnd) {
            return;
        };

        rocketRotate.current = animateRocket(rocketRef.current, {
            rotate: rotateDirection.current === DIRECTIONS.right ? 45 : -45,
        },
        {
            duration: DURATION_ROTATION
        });

        rocketRotate.current.then(() => {
            restartRotation();
        })
    };

   
    const handleClick = (movement) => {
        console.log('gelllo');
        if (!isRotating.current) {
            return;
        }

        rocketRotate.current?.pause?.();

        isRotating.current = false;

        if (movement === 'left') {
            if (rotateDirection.current !== DIRECTIONS.left) {
                restartRotation();

                return;
            }

            rotateDirection.current = DIRECTIONS.right;
        } else {
            if (rotateDirection.current !== DIRECTIONS.right) {
                restartRotation();

                return;
            }

            isRotating.current = false;
            rotateDirection.current = DIRECTIONS.left;
        }

        setPhrase(rotationsAmount.current);
        rotationsAmount.current = rotationsAmount.current + 1;

        rocketRotate.current = animateRocket(rocketRef.current, {
            rotate: 0,
        },
        {
            duration: DURATION_ROTATION / 2
        }).then(() => {
            setPhrase();
            setTimeout(() => {
                isRotating.current = true;
                rotateRocket();
            }, DURATION_REVEAL)
        });
    }

    return {
        wrapperRef,
        rocketRef,
        rocketY,
        layerRef,
        imageRef,
        isStart,
        isEnd,
        isPath,
        phrase,
        handleClick,
        handleStart
    }
}
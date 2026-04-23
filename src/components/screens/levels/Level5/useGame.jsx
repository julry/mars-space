import {useAnimate, useMotionValue, useMotionValueEvent} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

import { useSizeRatio } from '../../../../contexts/SizeRatioContext';
import { useProgress } from '../../../../contexts/ProgressContext';

import {DIRECTIONS, DURATION_LANDING, DURATION_PATH, DURATION_REVEAL, DURATION_ROTATION} from './constants';
import { MIN_MOCKUP_WIDTH } from '../../../ScreenTemplate';

export const useGame = () => {
    const ratio = useSizeRatio();
    const { setProgress } = useProgress();

    const [isStart, setIsStart] = useState(true);
    const [isEdu, setIsEdu] = useState(false);
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
    const rocketYStart = useRef();
    const timeInitial = useRef();
    const lastDuration = useRef();
    const duration = useRef(0);
    const isRotating = useRef(false);
    const rotationsAmount = useRef(0);
    const rotatedPoints = useRef(0);
    const isRestarting = useRef(false);
    const finishY = useRef();
    const rocketHeight = useRef();

    useMotionValueEvent(rocketY, 'change', (latest) => {
        const y = finishY.current;

        const points = [-10, y * 1 / 3, y * 4.5 / 6];

        if ((latest < points[rotatedPoints.current] + 2) && (latest > points[rotatedPoints.current] - 2) && !isRotating.current) {
            rotateRocket();
            rotatedPoints.current = rotatedPoints.current + 1;
        }
    });

    const moveDown = () => {
        rocketMovingUp.current = animate(layerRef.current, {
                y: finishY.current
            },
            {
                duration: DURATION_PATH - duration.current,
                ease: 'linear'
            }
        )
    }

    const handleStart = () => {
        setIsStart(false);
        setIsEdu(true);

        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();

        rocketHeight.current = rocketRef.current.getBoundingClientRect().height;
        finishY.current = -imageRect.height + wrapperRect.height + (window.innerWidth > MIN_MOCKUP_WIDTH ? 110 : 0);

        moveDown();

    };

    const restartRotation = () => {
        rocketMovingUp.current.pause();
        isRestarting.current = true;
        isRotating.current = false;

        duration.current = (+(new Date()) - timeInitial.current) / 1000;

        animate(layerRef.current, {
                y: rocketYStart.current,
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
            isRestarting.current = false;
            moveDown();
            isRotating.current = true;
            rotateRocket();
        });
    }
    
    const rotateRocket = () => {
        if (rotationsAmount.current > 3 || isEnd) {
            return;
        };

        timeInitial.current = +(new Date());

        isRotating.current = true;
        rocketYStart.current = rocketY.get();

        rocketRotate.current = animateRocket(rocketRef.current, {
            rotate: rotateDirection.current === DIRECTIONS.right ? 45 : -45,
        },
        {
            duration: DURATION_ROTATION,
            ease: 'linear'
        });

        rocketRotate.current.then(() => {
            restartRotation();
        })
    };

   
    const handleClick = (movement) => {
        if (!isRotating.current || isRestarting.current) {
            return;
        }

        isRotating.current = false;

        rocketRotate.current?.pause?.();
        
        if (isEdu) {
            setIsEdu(false);
        }

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

        if (rotationsAmount.current === 3) {
            rocketMovingUp.current.pause();
            duration.current = DURATION_PATH - DURATION_LANDING;
            moveDown();
            setIsPath(false);
            setProgress(prev => ({...prev, current: 225, percent: 95, duration: DURATION_LANDING}))

            animateRocket(rocketRef.current, {
                y: wrapperRef.current.getBoundingClientRect().bottom - rocketRef.current.getBoundingClientRect().bottom - 80 * ratio,
            },
            {
                duration: DURATION_LANDING
            }).then(() => {
                setIsEnd(true);
            })
        }
        
        rocketRotate.current = animateRocket(rocketRef.current, {
            rotate: 0,
        },
        {
            duration: DURATION_ROTATION / 2
        }).then(() => {
            setPhrase();
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
        isEdu,
        handleClick,
        handleStart,
    }
}
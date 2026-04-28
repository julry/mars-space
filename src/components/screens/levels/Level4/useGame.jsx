import {useAnimate, useMotionValue, useMotionValueEvent} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import {DIRECTIONS, BG_MOVING_DURATION, ITEMS_BLOCK_HEIGHT, dangerous, unskippableId, CRUSH_TEXT_TYPE, withoutQuestionIds, questions, sameObjects} from './constants';
import {getIsTouchDevice} from '../../../../utils/getIsTouchDevice';
import { useSizeRatio } from '../../../../contexts/SizeRatioContext';
import { reachMetrikaGoal } from '../../../../utils/reachMetrikaGoal';
export const useGame = () => {
    const ratio = useSizeRatio();

    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [layerRef, animate] = useAnimate();
    const [itemsRef, animateItems] = useAnimate();
    const [rocketRef, animateRocket] = useAnimate();
    const [isCrushed, setIsCrushed] = useState(false);
    const [isEducation, setIsEducation] = useState(false);
    const [questionId, setQuestionId] = useState();
    const [isQuestionsShown, setIsQuestionsShown] = useState(false);
    const [crushText, setCrushText] = useState();
    
    const [crushed, setCrushed] = useState([]);
    const rocketX = useMotionValue(0);
    const rocketY = useMotionValue(0);
    const imageRef = useRef();
    const wrapperRef = useRef();
    const xRef = useRef(0);
    const moveDist = useRef();
    const direction = useRef();
    const isMoving = useRef(false);
    const rocketMovingUp = useRef();
    const itemsMoving = useRef();
    const initialBottom = useRef();
    const startRef = useRef(true);
    const educationRef = useRef(false);

    const moveLeft = () => {
        if (isMoving.current || isEnd) {
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
        if (isMoving.current || isEnd) {
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
        if (startRef.current || isCrushed) {
            return;
        }

        if (!educationRef.current) {
            educationRef.current = true;
            setIsEducation(false);
            itemsMoving.current?.play();
            rocketMovingUp.current?.play();
        };

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

    useMotionValueEvent(rocketY, 'change', (latest) => {
        const actualY = latest - initialBottom.current;

        if (!educationRef.current && actualY > -initialBottom.current / 1.2 && actualY < initialBottom.current /1.2 + 2) {
            setIsEducation(true);
            itemsMoving.current?.pause();
            rocketMovingUp.current?.pause();
        }

        if (dangerous[direction.current ?? 'default'].some(danger => (danger - actualY) < 2 && (danger + rocketRef.current.getBoundingClientRect().height / 1.3) > actualY)) {
            const index = dangerous[direction.current ?? 'default'].findIndex(danger => (danger - actualY) < 2 && (danger + rocketRef.current.getBoundingClientRect().height / 1.3 ) > actualY);
            
            const id = `${direction.current ?? 'default'}-${index}`;

            if (crushed.includes(id)) {
                return;
            }

            const isNoQuestion = withoutQuestionIds.includes(id) || questionId + 1 > questions.length -1;
            
            if (unskippableId === index) {
                setCrushText(CRUSH_TEXT_TYPE.unskippable);
                setCrushed(prev => [...prev, `default-1`, 'left-1', 'right-1']);
            } else {
                setCrushText(isNoQuestion ? CRUSH_TEXT_TYPE.onlyText : CRUSH_TEXT_TYPE.common);
                setCrushed(prev => [...prev, id, sameObjects[id] ?? null]);
            }
            setIsCrushed(true);

            if (isNoQuestion) {
                setTimeout(() => {
                    setIsCrushed(false);
                }, 700);

                setTimeout(() => {
                    setCrushText();
                }, 700)
                return;
            };

            itemsMoving.current?.pause();
            rocketMovingUp.current?.pause();

            setTimeout(() => {
                setQuestionId(prev => (prev ?? -1) + 1);
                setIsQuestionsShown(true);
            }, 100);
        }
    });

    useEffect(() => {
        moveDist.current = rocketRef.current.getBoundingClientRect().width - 40 * ratio;
        window.addEventListener('keydown', handlePressKey);

        return () => window.removeEventListener('keydown', handlePressKey);
    }, []);

    const handleStart = (e) => {
        e.stopPropagation();
        reachMetrikaGoal('startlevel3');
        const wrapperRect = wrapperRef.current.getBoundingClientRect(); 
        const rocketRect = rocketRef.current.getBoundingClientRect(); 

        const rocketStart = rocketRect.height + 66 * ratio;
        const itemsBottom = wrapperRect.height * 0.75;

        setIsStart(false);
        startRef.current = false;
        initialBottom.current = itemsBottom - rocketStart;

        rocketMovingUp.current = animate(layerRef.current, {
                y: imageRef.current.getBoundingClientRect().height - wrapperRect.height
            },
            {
                duration: BG_MOVING_DURATION,
                ease: 'linear'
            }
        )

        itemsMoving.current = animateItems(itemsRef.current, {
                y: ITEMS_BLOCK_HEIGHT + wrapperRect.height
            },
            {
                duration: BG_MOVING_DURATION,
                ease: 'linear'
            }
        )

        rocketMovingUp.current.then(() => {
            animateRocket(rocketRef.current, {
                y: wrapperRect.top - rocketRect.top + 30 * ratio
            },
            {
                duration: BG_MOVING_DURATION / 10
            }
        ).then(() => {
                setIsEnd(true);
            })
        }, []);
    };

    const handleStartTouch = (e) => {
        if (!e.touches?.[0]) {
            return;
        }

        xRef.current = e.touches[0].clientX;
    }

    const handleEndTouch = (e) => {
        if (typeof xRef.current !== 'number') {
            return;
        }

        const endX = e.changedTouches[0].clientX;
        const diffX = endX - xRef.current;
        const minDistance = 40;

        if (Math.abs(diffX) > minDistance) {
            if (diffX > 0 && direction.current !== DIRECTIONS.right) {
            } else if (direction.current !== DIRECTIONS.left){
            }
        }
    }

    const handleClick = (side) => {
        if (startRef.current || isCrushed) {
            return;
        }

        if (!getIsTouchDevice()) {
            return;
        }

        if (!educationRef.current) {
            educationRef.current = true;
            setIsEducation(false);
            itemsMoving.current?.play();
            rocketMovingUp.current?.play();
        };

        if (side === 'left') {
            moveLeft();
        } else {
            moveRight();
        }
    }

    const handleReplay = () => {
        setIsCrushed(false);
        setCrushText();
        setIsQuestionsShown(false);
        itemsMoving.current?.play();
        rocketMovingUp.current?.play();
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
        itemsRef,
        questionId,
        handleStartTouch,
        handleEndTouch,
        handleClick,
        handleStart,
        setIsCrushed,
        isCrushed,
        setCrushText,
        crushText,
        handleReplay,
        isQuestionsShown,
        isEducation,
    }
}
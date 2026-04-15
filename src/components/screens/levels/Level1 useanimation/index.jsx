import styled from "styled-components";
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { motion, } from "framer-motion";
import {ITEMS, BLOCK_WIDTH, BLOCK_WIDTH_KOEF} from './constants';
import { Modal } from "../../../shared/Modal";
import { Block } from "../../../shared/Block";
import { Button } from "../../../shared/Button";
import {MIN_MOCKUP_WIDTH} from '../../../ScreenTemplate';
import { useGame } from "./useGame";

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
    const {
        isEnded, 
        handleScreenClick,
        controls,
        initialXRight,
        restartAnimation,
        x,
        isFalling,
        currentItem,
        itemControls,
        handleCompleteItemAnimation,
        fallenItems,
        getYPosition,
        xBlocks,
        isStarted,
        handleStart,
        scope,
    } = useGame(ratio);

    return (
        <>
            <Wrapper $ratio={ratio} $isEnded={isEnded} onClick={handleScreenClick}>
                    <HookItem 
                        $ratio={ratio}
                        ref={scope}
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
                        $isHidden={!isFalling}
                        $bg={ITEMS[currentItem]?.bg}
                        onAnimationComplete={handleCompleteItemAnimation}
                        $height={ITEMS[currentItem]?.height * ratio}
                    />
                    {fallenItems.map((item, index) => 
                        (
                            <HoldingItem
                                key={`static-${item.id}-${currentItem}`}
                                $bg={item.bg}
                                $zIndex={index}
                                $height={item.height * ratio}
                                initial={{ y: getYPosition(index), x: (xBlocks ?? 0) }}
                            />
                        )
                    )}
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
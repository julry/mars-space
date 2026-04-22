import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';

import {useProgress} from "../contexts/ProgressContext";
import { useImagePreloader } from "../hooks/useImagePreloader";
import {images} from '../constants/images';

const Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export function ScreenContent() {
    const {screen: Screen, currentScreenIndex} = useProgress();

    useImagePreloader(images[currentScreenIndex] ?? []);

    return Screen && (
        <AnimatePresence mode="wait">
            <Wrapper
                key={`currentScreen_${currentScreenIndex}`}
                initial={{opacity: 0}}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}}
                transition={{
                    duration: 0.35,
                }}
            >
               <Screen />
            </Wrapper>
        </AnimatePresence>
    )
}
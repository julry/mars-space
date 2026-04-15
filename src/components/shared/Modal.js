
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: ${({$isDarken}) => $isDarken ? 'rgba(52, 52, 52, 0.35)' : 'transparent'};
    ${({$isDarken}) => $isDarken ? 'backdrop-filter: blur(2px);' : ''};

    display: flex;
    justify-content: center;
    align-items: ${({$isCentered}) => $isCentered ? 'center' : 'flex-start'};
    z-index: 1000;
`;

export const Modal = ({isOpen, isCentered = true, isDarken = true, ...props}) => (
    <AnimatePresence>
        {isOpen && (
            <Wrapper $isDarken={isDarken} $isCentered={isCentered} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} {...props}>
                {props.children}
            </Wrapper>
        )}
    </AnimatePresence>
)
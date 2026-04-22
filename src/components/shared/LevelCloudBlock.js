import { motion } from "framer-motion";
import styled from "styled-components";

export const CloudBlock = styled(motion.div)`
    position: absolute;
    left: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    text-align: center;
    width: ${({$width}) => $width}px;
    height: ${({$height}) => $height}px;
    white-space: pre-line;
    transform: translateX(-50%);

    & svg {
        position: absolute;
        inset: 0;
    }

    & p {
        width: 100%;
        position: relative;
        z-index: 2;
        color: var(--color-dark-blue);
        font-weight: 600;
        font-size: ${({$ratio}) => $ratio * 20}px;
    }
`;
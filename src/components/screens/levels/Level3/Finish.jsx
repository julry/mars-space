import { motion, percent } from "framer-motion";
import styled from "styled-components";
import bg from '../../../../assets/images/level3Finish.webp';
import path from '../../../../assets/images/pathLong.webp';
import rocket from '../../../../assets/images/rocket.webp';
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";
import { useProgress } from "../../../../contexts/ProgressContext";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(${bg}) no-repeat;
    background-position: 0% 100%;
    background-size: cover;
    padding-top: 30%;
`;

const Rocket = styled.img`
    position: relative;
    z-index: 2;
    object-fit: contain;
    width: ${({$ratio}) => $ratio * 186 * 0.8}px;
    height: ${({$ratio}) => $ratio * 366 * 0.8}px;

    @media screen and (min-height: 700px){
        width: ${({$ratio}) => $ratio * 186}px;
        height: ${({$ratio}) => $ratio * 366}px;
    } 
`;

const RocketPath = styled.img`
    width: ${({$ratio}) => $ratio * 295 * 0.8}px;
    height: ${({$ratio}) => $ratio * 375 * 0.8}px;
    margin-top: ${({$ratio}) => $ratio * -50 * 0.8}px;
    object-fit: contain;
    object-position: 0 0;

    @media screen and (min-height: 700px){
        width: ${({$ratio}) => $ratio * 295}px;
        height: ${({$ratio}) => $ratio * 375}px;
        margin-top: ${({$ratio}) => $ratio * -50}px;
    } 
`;

export const Level3Finish = () => {
    const { next, setProgress } = useProgress();
    const ratio = useSizeRatio();

    useEffect(() => {
        setTimeout(() => {
            setProgress(prev => ({...prev, percent: 82, duration: window.innerWidth > 400 ? 7 : 5}));
        }, 100)
    }, [])

    return (
        <Wrapper onAnimationComplete={next} animate={{backgroundPositionY: 0}} transition={{duration: window.innerWidth > 400 ? 7 : 5, delay: 0.1}}>
                <Rocket $ratio={ratio} src={rocket} alt=""/>
                <RocketPath $ratio={ratio} src={path} alt=""/>
        </Wrapper>
    )
}
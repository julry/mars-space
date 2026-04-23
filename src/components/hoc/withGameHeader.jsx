import styled from "styled-components";
import logo from '../../assets/images/logo.svg';
import progressBar from '../../assets/images/progressBar.png';
import progressBarFull from '../../assets/images/progressBarFull.png';
import progressIcon from '../../assets/images/progressIcon.png';

import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { media } from "../../constants/media";
import { useProgress } from "../../contexts/ProgressContext";
import { AnimatePresence, motion } from "framer-motion";

const Header = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   padding: ${({$ratio}) => $ratio * 12}px ${({$ratio}) => $ratio * 15}px;
   min-height: ${({$ratio}) => $ratio * 73}px;
   z-index: 20;
`;

const DarkenBlock = styled.div`
    position: absolute;
    left: 0;
    top: -12px;
    width: calc(100% + 40px);
    height: ${({$ratio}) => $ratio * 120}px;
    left: -20px;

    background: linear-gradient(180deg, #00003C 30.83%, rgba(0, 0, 180, 0) 124.17%);
    filter: blur(11.85px);

    ${media.desktop`
        height: 120px;
    `}
`;

const Logo = styled.img`
    position: relative;
    z-index: 2;
    width: ${({$ratio}) => $ratio * 83}px;
    height: ${({$ratio}) => $ratio * 24}px;
`;

const ProgressTextWrapper = styled.div`
    position: relative;
    z-index: 2;

    display: flex;
    align-items: baseline;
    justify-content: ${({$isEnd}) => $isEnd ? 'flex-end' : 'space-between'};

    width: 100%;
    color: white;
    padding: 0 var(--spacing_x2);
    margin-bottom: calc(var(--spacing_x1) / 2);
`;

const ProgressTextBlock = styled.div`
    display: flex;
    align-items: center;
    white-space: pre-line;
`;

const Number = styled.h3`
    font-size: ${({$ratio}) => $ratio * 12}px;
`;

const Text = styled.h3`
    white-space: pre-line;
    line-height: 70%;
    font-size: ${({$ratio}) => $ratio * 8}px;
`;

const ProgressWrapper = styled.div`
    position: relative;
    z-index: 2;
    height: ${({$ratio}) => $ratio * 29}px;
    width: ${({$ratio}) => $ratio * 132}px;
    background: url(${progressBar}) no-repeat center center;
    background-size: contain;
`;

const ProgressIcon = styled(motion.img)`
    position: absolute;
    left: 0;
    bottom: ${({$ratio}) => $ratio * -25}px;
    height: ${({$ratio}) => $ratio * 25}px;
    width: ${({$ratio}) => $ratio * 20}px;
    object-fit: contain;
    object-position: 0% 0%;
`;

const Progress = styled(motion.div)`
    position: absolute;
    inset: 0;
    overflow: hidden;
`;

const ProgressImage = styled.img`
    height: ${({$ratio}) => $ratio * 29}px;
    width: ${({$ratio}) => $ratio * 132}px;
    object-fit: contain;
    object-position: center;
`;

export const withGameHeader = (Component, isDarken, shouldAppendProgress) => () => {
    const ratio = useSizeRatio();
    const { progress} = useProgress();

    return (
        <>
            <Header $isDarken={isDarken} $ratio={ratio}>
                {isDarken && (<DarkenBlock $ratio={ratio}/>)}
                <Logo $ratio={ratio} src={logo} alt="" />
                <AnimatePresence initial={shouldAppendProgress}>
                    {progress && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                            {
                                progress.stage === 'earth' && (
                                    <ProgressTextWrapper>
                                        <ProgressTextBlock>
                                            <Number $ratio={ratio}>{progress.current}</Number>
                                            {progress.current > 0 && (<Text $ratio={ratio}>км</Text>)}
                                        </ProgressTextBlock>
                                        <ProgressTextBlock>
                                            <Number $ratio={ratio}>225</Number>
                                            <Text $ratio={ratio}>млн{progress.current > 0 ? '\n' : ' '}км</Text>
                                        </ProgressTextBlock>
                                    </ProgressTextWrapper>
                                )
                            }
                            {
                                progress.stage === 'space' && (
                                    <ProgressTextWrapper $isEnd>
                                        <ProgressTextBlock>
                                            <Number $ratio={ratio}>{progress.current.toString().replace('.', ',')}</Number>
                                            <Text $ratio={ratio}>млн{'\n'}км</Text>
                                        </ProgressTextBlock>
                                    </ProgressTextWrapper>
                                )
                            }
                            <ProgressWrapper $ratio={ratio}>
                                <Progress 
                                    $ratio={ratio} 
                                    initial={{width: progress.percent + '%'}} 
                                    animate={{width: progress.percent + '%'}} 
                                    transition={{duration: progress.duration}}
                                >
                                    <ProgressImage $ratio={ratio} src={progressBarFull} alt="" />
                                </Progress>
                                <ProgressIcon 
                                    $ratio={ratio} 
                                    initial={{x: '-50%', left: progress.percent + '%'}} 
                                    animate={{left: progress.percent + '%'}} 
                                    src={progressIcon} alt="" 
                                    transition={{duration: progress.duration}}
                                />
                            </ProgressWrapper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Header>
            <Component />
        </>
    )
}
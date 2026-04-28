import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Block } from "../shared/Block";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import bg from '../../assets/images/startBg.png';
import planet from '../../assets/images/marsPlanet.png';
import rocket from '../../assets/images/rocket.png';
import pathStart from '../../assets/images/pathStart.png';
import { media } from "../../constants/media";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: var(--spacing_x5);
    gap: var(--spacing_x3);
    background: url(${bg}) no-repeat 0 100%;
    background-size: cover;
`;

const TitleBlock = styled.div`
    position: absolute;
    top: var(--spacing_x5);
    left: var(--spacing_x3);
`;

const Title = styled.h3`
    color: #fff;
    font-size: ${({$ratio}) => $ratio * 49}px;
    font-size: ${({$ratio}) => $ratio * 45}px;
`;

const LogoStyled = styled.img`
    margin-top: ${({$ratio}) => $ratio * 7}px;
    object-fit: contain;
    width: ${({$ratio}) => $ratio * 164}px;
    height: ${({$ratio}) => $ratio * 47}px;
    margin-left: 4px;
`;

const Planet = styled.img`
    position: absolute;
    top: ${({$ratio}) => $ratio * 48}px;
    left: ${({$ratio}) => $ratio * 204}px;
    width: ${({$ratio}) => $ratio * 201}px;
    height: ${({$ratio}) => $ratio * 202}px;
    object-fit: contain;

    ${media.desktop`
        top: ${({$ratio}) => $ratio * 36}px;
        left: auto;
        right: ${({$ratio}) => $ratio * 47}px;
        width: ${({$ratio}) => $ratio * 251}px;
        height: ${({$ratio}) => $ratio * 252}px;
    `}
`;

const Rocket = styled.img`
    position: absolute;
    transform: rotate(38deg);
    bottom: ${({$ratio}) => $ratio * 206}px;
    left: ${({$ratio}) => $ratio * 101}px;
    width: ${({$ratio}) => $ratio * 165}px;
    height: ${({$ratio}) => $ratio * 332}px;
    object-fit: contain;
    z-index: 2;

    ${media.desktop`
        bottom: ${({$ratio}) => $ratio * 122}px;
        left: ${({$ratio}) => $ratio * 247}px;
        width: ${({$ratio}) => $ratio * 195}px;
        height: ${({$ratio}) => $ratio * 392}px;
    `}
`;

const RocketPath = styled.img`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 115}px;
    left: ${({$ratio}) => $ratio * -91}px;
    width: ${({$ratio}) => $ratio * 355}px;
    height: ${({$ratio}) => $ratio * 355}px;
    object-fit: contain;

    ${media.desktop`
        bottom: 0;
        left: 0;
        width: ${({$ratio}) => $ratio * 456}px;
        height: ${({$ratio}) => $ratio * 456}px;
    `}
`;

const PathPart = styled.svg`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 58}px;
    left: 0;
    width: ${({$ratio}) => $ratio * 69}px;
    height: ${({$ratio}) => $ratio * 92}px;

    ${media.desktop`
        display: none;
    `}
`;

export const Intro = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();

    const handleNext = () => {
        reachMetrikaGoal('start');
        next();
    }

    return (
        <Wrapper>
            <Planet $ratio={ratio} src={planet} alt="" />
            <Rocket $ratio={ratio} src={rocket} alt="" />
            <RocketPath $ratio={ratio} src={pathStart} alt="" />
            <PathPart $ratio={ratio} viewBox="0 0 69 92" fill="none" >
                <path d="M48.9998 60.5L68.9998 34.5H-1.50015L-3.00015 40L-6.50015 37L-8.00015 0L-41.0002 91.5L48.9998 60.5Z" fill="#89ABD6"/>
            </PathPart>
            <TitleBlock>
                    <Title $ratio={ratio}>МИССИЯ:</Title>
                    <LogoStyled $ratio={ratio} src={logo} alt=""/>
            </TitleBlock>
            <Block zIndex={3}>
                <p>
                Чтобы покорить Марс, нужно быть настоящим лидером. Отправься в полёт, пройди 5 уровней и узнай, какие качества помогут тебе достигнуть цели
                </p>
            </Block>
            <Button onClick={handleNext}>НА СТАРТ!</Button>
        </Wrapper>
    );
}
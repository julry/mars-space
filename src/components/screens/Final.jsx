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
import {reachMetrikaGoal} from '../../utils/reachMetrikaGoal';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--spacing_x5);
    padding-top: ${({$ratio}) => $ratio * 191}px;
    gap: var(--spacing_x3);
    background: url(${bg}) no-repeat 0 100%;
    background-size: cover;

    ${media.desktop`
        padding-top: ${({$ratio}) => $ratio * 243}px;
    `}

    & button {
        position: relative;
        z-index: 5;
    }
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
    user-select: none;
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
    bottom: ${({$ratio}) => $ratio * 48}px;
    left: ${({$ratio}) => $ratio * 137}px;
    width: ${({$ratio}) => $ratio * 165}px;
    height: ${({$ratio}) => $ratio * 332}px;
    object-fit: contain;
    z-index: 2;
    pointer-events: none;
    user-select: none;

    ${media.desktop`
        bottom: ${({$ratio}) => $ratio * 13}px;
        left: auto;
        right: ${({$ratio}) => $ratio * 109}px;
        width: ${({$ratio}) => $ratio * 152}px;
        height: ${({$ratio}) => $ratio * 305}px;
    `}
`;

const RocketPath = styled.img`
    position: absolute;
    bottom: 0;
    left:0;
    width: ${({$ratio}) => $ratio * 273}px;
    height: ${({$ratio}) => $ratio * 273}px;
    object-fit: contain;
    pointer-events: none;
    user-select: none;

    ${media.desktop`
        bottom: -83px;
        left: auto;
        right: 98px;
        width: ${({$ratio}) => $ratio * 355}px;
        height: ${({$ratio}) => $ratio * 355}px;
    `}
`;

export const Final = () => {
    const ratio = useSizeRatio();

    const handleLink = () => {
        reachMetrikaGoal('finishplusprogram');
        window.open('https://fut.ru/s/internship_curiosity', '_blank')
    };

    return (
        <Wrapper $ratio={ratio}>
            <Planet $ratio={ratio} src={planet} alt="" />
            <Rocket $ratio={ratio} src={rocket} alt="" />
            <RocketPath $ratio={ratio} src={pathStart} alt="" />
           
            <TitleBlock>
                    <Title $ratio={ratio}>МИССИЯ:</Title>
                    <LogoStyled $ratio={ratio} src={logo} alt=""/>
            </TitleBlock>
            <Block zIndex={3}>
                <p>
                Ты прошёл большой путь и доказал, что вызовы и испытания тебя не пугают. Настало время стать частью команды, которая создает будущее
                </p>
            </Block>
            <Button onClick={handleLink}>Стать лидером!</Button>
        </Wrapper>
    );
}
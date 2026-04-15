import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Block } from "../shared/Block";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: var(--spacing_x5);
    gap: var(--spacing_x3);
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

export const Intro = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();

    return (
        <Wrapper>
            <TitleBlock>
                    <Title $ratio={ratio}>МИССИЯ:</Title>
                    <LogoStyled $ratio={ratio} src={logo} alt=""/>
            </TitleBlock>
            <Block>
                <p>
                    Чтобы покорить Марс, нужно быть настоящим лидером. Отправься в полет 
и узнай, какие качества помогут тебе достигнуть цели
                </p>
            </Block>
            <Button onClick={next}>НА СТАРТ!</Button>
        </Wrapper>
    );
}
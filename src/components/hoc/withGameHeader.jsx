import styled from "styled-components";
import logo from '../../assets/images/logo.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { media } from "../../constants/media";

const Header = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   padding: ${({$ratio}) => $ratio * 12}px ${({$ratio}) => $ratio * 15}px;
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
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
`;

const ProgressTextBlock = styled.div`
    display: flex;
    align-items: flex-end;
`;

const Number = styled.h3`
    font-size: ${({$ratio}) => $ratio * 12}px;
`;

const Text = styled.h3`
    font-size: ${({$ratio}) => $ratio * 8}px;
`;

const ProgressWrapper = styled.div`
    position: relative;
    height: ${({$ratio}) => $ratio * 29}px;
    width: ${({$ratio}) => $ratio * 132}px;
`;

export const withGameHeader = (Component, isDarken) => () => {
    const ratio = useSizeRatio();

    return (
        <>
            <Header $isDarken={isDarken} $ratio={ratio}>
                {isDarken && (<DarkenBlock $ratio={ratio}/>)}
                <Logo $ratio={ratio} src={logo} alt="" />
                <div>
                    {/* <ProgressTextWrapper>
                        <ProgressTextBlock>
                            <Number $ratio={ratio}>418</Number>
                            <Text $ratio={ratio}>км</Text>
                        </ProgressTextBlock>
                        <ProgressTextBlock>
                            <Number $ratio={ratio}>225</Number>
                            <Text $ratio={ratio}>млн{'\n'}км</Text>
                        </ProgressTextBlock>
                    </ProgressTextWrapper> */}
                    {/* <ProgressWrapper $ratio={ratio}></ProgressWrapper> */}
                </div>
            </Header>
            <Component />
        </>
    )
}
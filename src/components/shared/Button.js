import styled from 'styled-components';
import { useSizeRatio } from '../../contexts/SizeRatioContext';

const Wrapper = styled.button`
    outline: none;
    position: relative;
    background: var(--color-blue);
    padding: ${({$ratio}) => $ratio * 16}px;
    font-weight: 600;
    width: 100%;
    font-size: ${({$ratio}) => $ratio * 18}px;
    max-width: ${({$ratio}) => $ratio * 335}px;
    cursor: pointer;
    color: #FFFFFF;
    text-transform: uppercase;
    z-index: ${({$zIndex}) => $zIndex ?? 0};

    &::after, &::before {
        content: '';
        position: absolute;
        height: 7px;
        width: 102px;
        ${({$shouldShowElements}) => !$shouldShowElements ? 'display: none;' : ''};
    }

    &::after {
        top: 0;
        right: 0;
        clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 7px 0%);
        background-color: #fff;
    }
    &::before {
        left: 0;
        bottom: 0;
        clip-path: polygon(100% 0%, 95px 100%, 0% 100%, 0% 0%);
        background-color: var(--color-accent);
    }
`;

export const Button = ({zIndex = 0, type = "main", shouldShowElements = true, ...props}) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $ratio={ratio} $zIndex={zIndex} $type={type} $shouldShowElements={shouldShowElements}/>
}



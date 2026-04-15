import { css } from "styled-components";
import {MIN_MOCKUP_WIDTH} from '../components/ScreenTemplate';

export const media = {
    desktop: (...args) => css`
        @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
            ${css(...args)}
        }
    `,
};
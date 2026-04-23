import part1 from "../../../../assets/images/part1.png";
import part2 from "../../../../assets/images/part2.png";
import part3 from "../../../../assets/images/part3.png";
import part4 from "../../../../assets/images/part4.png";
import part5 from "../../../../assets/images/part5.png";
import part6 from "../../../../assets/images/part6.png";
import hold1 from "../../../../assets/images/hold1.png";
import hold2 from "../../../../assets/images/hold2.png";
import hold3 from "../../../../assets/images/hold3.png";
import hold4 from "../../../../assets/images/hold4.png";
import hold5 from "../../../../assets/images/hold5.png";
import hold6 from "../../../../assets/images/hold6.png";

export const LEAVE_DURATION_SEC = 1.3;
export const FULL_MOVE_SEC = 4.5;
export const ROCKET_MOVE_SEC = 5.6;
export const ROCKET_MOVE_DELAY_SEC = 0.7;

export const ITEMS = [
    {
        id: 0,
        bg: part1,
        height: 146,
        top: 70,
        actualWidth: 182,
        holding: {
            src: hold1,
            height: 136,
        },
        text: 'Укажи образование',
    },
    {
        id: 1,
        height: 135,
        y: 48,
        top: 95,
        actualWidth: 182,
        bg: part2,
        holding: {
            src: hold2,
            height: 136,
        },
        text: 'Напиши про релевантный опыт',
    },
    {
        id: 2,
        bg: part3,
        actualWidth: 122,
        holding: {
            src: hold3,
            height: 162,
        },
        top: 115,
        height: 108,
        y: 160.5,
        text: 'Расскажи\nо достижениях',
    }, 
    {
        id: 3,
        bg: part4,
        actualWidth: 102,
        holding: {
            src: hold4,
            height: 136,
        },
        top: 104,
        y: 253,
        height: 30,
        text: 'Выдели\nключевые навыки',
    }, 
    {
        id: 4,
        bg: part5,
        actualWidth: 94,
        holding: {
            src: hold5,
            height: 175,
        },
        y: 267,
        top: 137,
        height: 30,
        text: 'Добавь\nконтакты и фото',
    }, 
    {
        id: 5,
        actualWidth: 86,
        bg: part6,
        holding: {
            src: hold6,
            height: 183,
        },
        height: 90,
        top: 114,
        y: 281,
        text: 'Добавь\nконтакты и фото',
    }, 
];

export const BLOCK_START_POSITION = 0;
export const BLOCK_BOTTOM_POSITION = 87;
export const BLOCK_WIDTH_KOEF = 1;
export const BLOCK_WIDTH = 182;

export const NEXT_BLOCK_TIMEOUT = 100;
export const SPRING_TRANSITION = {
    type: "spring",
    damping: 20
}

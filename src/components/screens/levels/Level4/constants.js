import aster1 from "../../../../assets/images/aster1.png";
import aster2 from "../../../../assets/images/aster2.png";
import aster3 from "../../../../assets/images/aster3.png";
import trash1 from "../../../../assets/images/trash1.png";
import trash2 from "../../../../assets/images/trash2.png";
import trash3 from "../../../../assets/images/trash3.png";

export const CORRECT_COLOR = "#B7FF3F";
export const ERROR_COLOR = "#FF353D";

export const BG_MOVING_DURATION = 20;
export const ITEMS_BLOCK_HEIGHT = 2278;

export const DIRECTIONS = {
    left: 'left',
    right: 'right'
};

export const dangerous = {
    [DIRECTIONS.left]: [399, 1139],
    [DIRECTIONS.right]: [757, 1158, 1505, 1758, 2184],
    default: [0, 1155, 1505, 1758, 2184],
}

export const sameObjects =  {
    'right-2': 'default-2', 
    'right-3': 'default-3', 
    'right-4': 'default-4', 
    'default-2': 'right-2', 
    'default-3': 'right-3', 
    'default-4': 'right-4', 
};

export const unskippableId = 1;

export const withoutQuestionIds = ['right-0', 'right-2', 'default-2', 'right-4', 'default-4']

export const objects = [
        {
            id: 0,
            bottom: 0,
            left: '33%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 115,
            bg: aster3,
            text: 'Мне страшно',
            svgSizes: [134, 61],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 134 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_64_325527)" data-figma-bg-blur-radius="6.84513">
                    <path d="M110.554 30.091C130.394 45.5677 92.828 39.158 65.4158 42.6729C27.5923 44.8202 9.27435 38.8728 20.2779 30.091C11.2885 20.1665 29.7055 15.6931 65.4158 17.5091C108.325 16.5255 122.619 20.6872 110.554 30.091Z" fill="white" fill-opacity="0.9"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_64_325527" x="-3.62396e-05" y="0.000452042" width="133.226" height="60.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325527"/>
                    </filter>
                    <clipPath id="bgblur_0_64_325527_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M110.554 30.091C130.394 45.5677 92.828 39.158 65.4158 42.6729C27.5923 44.8202 9.27435 38.8728 20.2779 30.091C11.2885 20.1665 29.7055 15.6931 65.4158 17.5091C108.325 16.5255 122.619 20.6872 110.554 30.091Z"/>
                    </clipPath></defs>
                </svg>
            )
        },
        {
            id: 1,
            bottom: 399,
            left: 0,
            width: 98,
            height: 97,
            bg: aster2,
            text: 'Будет сложно',
            svgSizes: [133, 59],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 133 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_64_325490)" data-figma-bg-blur-radius="6.84513">
                <path d="M109.61 29.0927C129.25 43.3789 92.0632 37.4623 64.9279 40.7068C27.4865 42.6889 9.35353 37.199 20.2459 29.0927C11.3474 19.9316 29.5783 15.8023 64.9279 17.4787C107.404 16.5707 121.554 20.4122 109.61 29.0927Z" fill="white" fill-opacity="0.9"/>
                </g>
                <defs>
                <filter id="filter0_f_64_325490" x="-3.62396e-05" y="0.000452042" width="132.226" height="58.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325490"/>
                </filter>
                <clipPath id="bgblur_0_64_325490_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M109.61 29.0927C129.25 43.3789 92.0632 37.4623 64.9279 40.7068C27.4865 42.6889 9.35353 37.199 20.2459 29.0927C11.3474 19.9316 29.5783 15.8023 64.9279 17.4787C107.404 16.5707 121.554 20.4122 109.61 29.0927Z"/>
                </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 2,
            bottom: 757,
            left: '66%',
            transform: 'translateX(-50%)',
            width: 144,
            height: 120,
            bg: trash1,
        },
        {
            id: 3,
            bottom: 1139,
            left: 0,
            width: 126,
            height: 134,
            bg: aster1,
            text: 'Сомневаюсь',
            svgSizes: [120, 63],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 120 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_64_325496)" data-figma-bg-blur-radius="6.84513">
                <path d="M97.3399 31.0893C114.375 47.7565 82.1208 40.8538 58.5851 44.6391C26.1104 46.9515 10.3828 40.5466 19.8303 31.0893C12.1122 20.4013 27.9247 15.5839 58.5851 17.5396C95.4263 16.4803 107.699 20.9621 97.3399 31.0893Z" fill="white" fill-opacity="0.9"/>
                </g>
                <defs>
                <filter id="filter0_f_64_325496" x="-3.62396e-05" y="0.000452042" width="119.226" height="62.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325496"/>
                </filter>
                <clipPath id="bgblur_0_64_325496_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M97.3399 31.0893C114.375 47.7565 82.1208 40.8538 58.5851 44.6391C26.1104 46.9515 10.3828 40.5466 19.8303 31.0893C12.1122 20.4013 27.9247 15.5839 58.5851 17.5396C95.4263 16.4803 107.699 20.9621 97.3399 31.0893Z"/>
                </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 4,
            bottom: 1155,
            left: '33%',
            transform: 'translateX(-50%)',
            width: 118,
            height: 112,
            bg: aster3,
            text: 'Другие\nлучше меня',
            svgSizes: [129, 65],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 129 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_64_325506)" data-figma-bg-blur-radius="6.84513">
                    <path d="M105.834 32.0876C124.673 49.9453 89.004 42.5495 62.9763 46.6052C27.063 49.0828 9.67023 42.2204 20.118 32.0876C11.5827 20.6362 29.0695 15.4746 62.9763 17.57C103.718 16.435 117.291 21.237 105.834 32.0876Z" fill="white" fill-opacity="0.9"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_64_325506" x="-3.62396e-05" y="0.000452042" width="128.226" height="64.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325506"/>
                    </filter>
                    <clipPath id="bgblur_0_64_325506_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M105.834 32.0876C124.673 49.9453 89.004 42.5495 62.9763 46.6052C27.063 49.0828 9.67023 42.2204 20.118 32.0876C11.5827 20.6362 29.0695 15.4746 62.9763 17.57C103.718 16.435 117.291 21.237 105.834 32.0876Z"/>
                    </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 5,
            bottom: 1158,
            left: '66%',
            transform: 'translateX(-50%)',
            width: 110,
            height: 109,
            bg: aster2,
            text: 'Не моё',
            svgSizes: [110, 70],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_64_325501)" data-figma-bg-blur-radius="6.84513">
                    <path d="M87.9014 34.5833C102.932 55.4173 74.4728 46.7889 53.706 51.5205C25.0518 54.4111 11.1746 46.4049 19.5106 34.5833C12.7005 21.2234 26.6527 15.2015 53.706 17.6461C86.2129 16.322 97.0421 21.9243 87.9014 34.5833Z" fill="white" fill-opacity="0.9"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_64_325501" x="-3.62396e-05" y="0.000452042" width="109.226" height="69.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325501"/>
                    </filter>
                    <clipPath id="bgblur_0_64_325501_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M87.9014 34.5833C102.932 55.4173 74.4728 46.7889 53.706 51.5205C25.0518 54.4111 11.1746 46.4049 19.5106 34.5833C12.7005 21.2234 26.6527 15.2015 53.706 17.6461C86.2129 16.322 97.0421 21.9243 87.9014 34.5833Z"/>
                    </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 6,
            bottom: 1505,
            left: '56%',
            transform: 'translateX(-50%)',
            width: 161,
            height: 120,
            bg: trash2,
            text: 'Откажут',
            svgSizes: [104, 61],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 104 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_64_325511)" data-figma-bg-blur-radius="6.84513">
                <path d="M82.2383 30.091C96.0667 45.5677 69.884 39.158 50.7785 42.6729C24.4167 44.8202 11.6496 38.8728 19.3188 30.091C13.0535 20.1665 25.8895 15.6931 50.7785 17.5091C80.6849 16.5255 90.6477 20.6872 82.2383 30.091Z" fill="white" fill-opacity="0.9"/>
                </g>
                <defs>
                <filter id="filter0_f_64_325511" x="-3.62396e-05" y="0.000452042" width="103.226" height="60.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325511"/>
                </filter>
                <clipPath id="bgblur_0_64_325511_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M82.2383 30.091C96.0667 45.5677 69.884 39.158 50.7785 42.6729C24.4167 44.8202 11.6496 38.8728 19.3188 30.091C13.0535 20.1665 25.8895 15.6931 50.7785 17.5091C80.6849 16.5255 90.6477 20.6872 82.2383 30.091Z"/>
                </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 7,
            bottom: 1758,
            left: '40%',
            transform: 'translateX(-50%)',
            width: 141,
            height: 151,
            bg: aster1,
            text: 'Мне страшно',
            svgSizes: [134, 61],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 134 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_64_325516)" data-figma-bg-blur-radius="6.84513">
                <path d="M110.554 30.091C130.394 45.5677 92.828 39.158 65.4158 42.6729C27.5923 44.8202 9.27435 38.8728 20.2779 30.091C11.2885 20.1665 29.7055 15.6931 65.4158 17.5091C108.325 16.5255 122.619 20.6872 110.554 30.091Z" fill="white" fill-opacity="0.9"/>
                </g>
                <defs>
                <filter id="filter0_f_64_325516" x="-3.62396e-05" y="0.000452042" width="133.226" height="60.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325516"/>
                </filter>
                <clipPath id="bgblur_0_64_325516_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M110.554 30.091C130.394 45.5677 92.828 39.158 65.4158 42.6729C27.5923 44.8202 9.27435 38.8728 20.2779 30.091C11.2885 20.1665 29.7055 15.6931 65.4158 17.5091C108.325 16.5255 122.619 20.6872 110.554 30.091Z"/>
                </clipPath></defs>
                </svg>
            ),
        },
        {
            id: 8,
            bottom: 2184,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 134,
            height: 95,
            bg: trash3,
            text: 'Будет сложно',
            svgSizes: [133, 59],
            svg: (
                <svg width="100%" height="100%" viewBox="0 0 133 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_64_325521)" data-figma-bg-blur-radius="6.84513">
                <path d="M109.61 29.0927C129.25 43.3789 92.0632 37.4623 64.9279 40.7068C27.4865 42.6889 9.35353 37.199 20.2459 29.0927C11.3474 19.9316 29.5783 15.8023 64.9279 17.4787C107.404 16.5707 121.554 20.4122 109.61 29.0927Z" fill="white" fill-opacity="0.9"/>
                </g>
                <defs>
                <filter id="filter0_f_64_325521" x="-3.62396e-05" y="0.000452042" width="132.226" height="58.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_325521"/>
                </filter>
                <clipPath id="bgblur_0_64_325521_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M109.61 29.0927C129.25 43.3789 92.0632 37.4623 64.9279 40.7068C27.4865 42.6889 9.35353 37.199 20.2459 29.0927C11.3474 19.9316 29.5783 15.8023 64.9279 17.4787C107.404 16.5707 121.554 20.4122 109.61 29.0927Z"/>
                </clipPath></defs>
                </svg>
            ),
        },
];

export const questions = [
    {
        id: 0,
        text: 'Какой у тебя опыт работы?',
        answers: [
            {
                id: 0,
                text: 'Сейчас расскажу про релевантные учебные проекты',
                isCorrect: true,
            },
            {
                id: 1,
                text: 'Мне всего 22, конечно, у меня\nпока нет опыта'
            },
        ]
    },
    {
        id: 1,
        text: 'Какую позицию ты хочешь занимать в перспективе?',
        answers: [
            {
                id: 0,
                text: 'Никакую, я не знаю, что будет завтра',
            },
            {
                id: 1,
                text: 'В перспективе я хотел бы дорасти до руководителя отдела',
                isCorrect: true,
            },
        ]
    },
    {
        id: 2,
        text: 'Были ли неудачи и как удалось с ними справиться?',
        answers: [
            {
                id: 0,
                text: 'Были, я проанализировал ошибки и предложил новое решение',
                isCorrect: true,
            },
            {
                id: 1,
                text: 'Нет, я всегда идеален',
            },
        ]
    },
]

export const CRUSH_TEXT_TYPE = {
    common: 'common',
    unskippable: 'unskippable',
    onlyText: 'onlyText',
    wrong: 'wrong'
};

export const crushTexts = {
    [CRUSH_TEXT_TYPE.common]: {
        text: 'Осторожнее! Чтобы продолжить путь, ответь на вопрос от HR',
        svgSizes: [321, 129],
        svg: <svg width="100%" height="100%" viewBox="0 0 321 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_64_298082)" data-figma-bg-blur-radius="6.84513">
            <path d="M287.053 64.0328C344.371 119.987 235.846 96.8136 156.655 109.521C47.3869 117.284 -5.53159 95.7823 26.2564 64.0328C0.287188 28.1518 53.4918 11.9788 156.655 18.5444C280.615 14.9881 321.91 30.0342 287.053 64.0328Z" fill="white" fill-opacity="0.9"/>
            </g>
            <defs>
            <filter id="filter0_f_64_298082" x="-3.62396e-05" y="0.000452042" width="320.226" height="128.226" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_298082"/>
            </filter>
            <clipPath id="bgblur_0_64_298082_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M287.053 64.0328C344.371 119.987 235.846 96.8136 156.655 109.521C47.3869 117.284 -5.53159 95.7823 26.2564 64.0328C0.287188 28.1518 53.4918 11.9788 156.655 18.5444C280.615 14.9881 321.91 30.0342 287.053 64.0328Z"/>
            </clipPath></defs>
        </svg>
    },
    [CRUSH_TEXT_TYPE.unskippable]: {
        text: 'Ой! Столкновение было неизбежно. Чтобы продолжить путь, ответь на вопрос',
        svgSizes: [324, 164],
        svg: <svg width="100%" height="100%" viewBox="0 0 324 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_64_277799)" data-figma-bg-blur-radius="9.24093">
            <path d="M284.548 81.5014C340.062 151.146 234.952 122.303 158.253 138.12C52.4238 147.783 1.1705 121.019 31.9582 81.5014C6.80617 36.8409 58.3365 16.7107 158.253 24.8828C278.312 20.4564 318.308 39.184 284.548 81.5014Z" fill="white" fill-opacity="0.9"/>
            </g>
            <defs>
            <filter id="filter0_f_64_277799" x="-2.47955e-05" y="-0.000757217" width="323.205" height="163.205" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="11.5512" result="effect1_foregroundBlur_64_277799"/>
            </filter>
            <clipPath id="bgblur_0_64_277799_clip_path" transform="translate(2.47955e-05 0.000757217)"><path d="M284.548 81.5014C340.062 151.146 234.952 122.303 158.253 138.12C52.4238 147.783 1.1705 121.019 31.9582 81.5014C6.80617 36.8409 58.3365 16.7107 158.253 24.8828C278.312 20.4564 318.308 39.184 284.548 81.5014Z"/>
            </clipPath></defs>
            </svg>
    },
    [CRUSH_TEXT_TYPE.onlyText]: {
        text: 'Осторожнее!',
        svgSizes: [199, 89],
        svg: <svg width="100%" height="100%" viewBox="0 0 199 89" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_2130_4)" data-figma-bg-blur-radius="6.84513">
        <path d="M171.904 44.0182C204.771 76.1038 142.54 62.8155 97.1299 70.1025C34.4728 74.5541 4.1279 62.2242 22.356 44.0182C7.46454 23.443 37.9735 14.169 97.1299 17.9339C168.212 15.8947 191.891 24.5225 171.904 44.0182Z" fill="white" fill-opacity="0.9"/>
        </g>
        <defs>
        <filter id="filter0_f_2130_4" x="-3.62396e-05" y="0.000452042" width="198.226" height="88.128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_2130_4"/>
        </filter>
        <clipPath id="bgblur_0_2130_4_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M171.904 44.0182C204.771 76.1038 142.54 62.8155 97.1299 70.1025C34.4728 74.5541 4.1279 62.2242 22.356 44.0182C7.46454 23.443 37.9735 14.169 97.1299 17.9339C168.212 15.8947 191.891 24.5225 171.904 44.0182Z"/>
        </clipPath></defs>
        </svg>
    },
    [CRUSH_TEXT_TYPE.wrong]: {
        text: 'Попробуй ещё раз!',
        svgSizes: [270, 96],
        svg: <svg width="100%" height="100%" viewBox="0 0 270 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_64_343839)" data-figma-bg-blur-radius="6.84513">
        <path d="M238.917 47.5611C286.014 83.8717 196.841 68.8337 131.771 77.0802C41.9884 82.118 -1.4936 68.1644 24.6259 47.5611C3.28756 24.2765 47.0046 13.7813 131.771 18.042C233.627 15.7342 267.558 25.4981 238.917 47.5611Z" fill="white" fill-opacity="0.9"/>
        </g>
        <defs>
        <filter id="filter0_f_64_343839" x="-3.62396e-05" y="0.000452042" width="269.226" height="95.2257" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="8.55641" result="effect1_foregroundBlur_64_343839"/>
        </filter>
        <clipPath id="bgblur_0_64_343839_clip_path" transform="translate(3.62396e-05 -0.000452042)"><path d="M238.917 47.5611C286.014 83.8717 196.841 68.8337 131.771 77.0802C41.9884 82.118 -1.4936 68.1644 24.6259 47.5611C3.28756 24.2765 47.0046 13.7813 131.771 18.042C233.627 15.7342 267.558 25.4981 238.917 47.5611Z"/>
        </clipPath></defs>
        </svg>
    }
}
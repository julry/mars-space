export const CORRECT_COLOR = "#B7FF3F";
export const ERROR_COLOR = "#FF353D";
export const SCENE_ZOOM = 2.2;

export const questions = [
    {
        id: 0,
        title: 'Сколько направлений\nв лидерской программе\n"Curiosity"?',
        problem: '3×4-5',
        afterText: <>Всего <b>7</b> направлений: продажи, маркетинг, финансы, менеджмент данных и цифровых продуктов, производство, исследования и разработки, закупки</>,
        answers: [
            {
                id: 0,
                text: '-3'
            },
            {
                id: 1,
                text: '7',
                isCorrect: true,
            },
            {
                id: 2,
                text: '9'
            },
        ]
    },
    {
        id: 1,
        title: 'Mars придерживается своих\nпринципов ведения бизнеса.\nСколько их?',
        problem: '1+8÷2',
        afterText: <>Всё верно, <b>5</b>: качество,{'\n'}ответственность,{'\n'}взаимовыгодность,{'\n'}эффективность, свобода</>,
        answers: [
            {
                id: 0,
                text: '5',
                isCorrect: true,
            },
            {
                id: 1,
                text: '4,5',
            },
            {
                id: 2,
                text: '2'
            },
        ]
    },
    {
        id: 2,
        title: 'Сколько брендов Mars\nпредставлено в России сегодня?',
        problem: '(8-5)×9',
        afterText: <>Верно! <b>27</b> брендов кормов для питомцев, шоколадных изделий и жевательной резинки. Среди них: Snickers, Orbit, Whiskas, Royal Canin и многие другие</>,
        answers: [
            {
                id: 0,
                text: '27',
                isCorrect: true,
            },
            {
                id: 1,
                text: '37',
            },
            {
                id: 2,
                text: '3'
            },
        ]
    }
]
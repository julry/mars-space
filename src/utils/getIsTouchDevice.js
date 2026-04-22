export const getIsTouchDevice = () => (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0
)
export const findPlacedCells = (x, y, puzzle, currentPlaced) => {
    const { sizeX, sizeY, id: puzzleId, freePlace } = puzzle;
    const placed = [];
    let isEmpty = true;

    for (let i = x; i < x + sizeX; i++) {
        for (let j = y; j < y + sizeY; j++) {
            if (currentPlaced.find(({y, x, id}) => x === i && y === j && id !== puzzleId)) {
                if (!(i === (x + freePlace?.x) && j === (y + freePlace?.y))) {
                    isEmpty = false;
                }
            }
            
            if (!(i === (x + freePlace?.x) && j === (y + freePlace?.y))) {
                placed.push({x: i, y: j, id: puzzleId});
            }

        }
    }

    return {placed, isEmpty};
}
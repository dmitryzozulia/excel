export function shouldResize(event) {
    return event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type === 'cell'
}
export function nextSelector(key, row, col) {
    const colCount = document.querySelectorAll('.column').length - 1
    const rowCount = document.querySelectorAll('.row-data').length - 2
    switch (key) {
        case 'ArrowDown':
        case 'Enter':
            row = +row + 1 > rowCount ? rowCount : +row + 1
            break
        case 'Tab':
        case 'ArrowRight':
            col = +col + 1 > colCount ? colCount : +col + 1
            break
        case 'ArrowLeft':
            col > 0 ? col-- : col
            break
        case 'ArrowUp':
            row > 0 ? row-- : row
            break
    }
    return `[data-id="${row}:${col}"]`
}

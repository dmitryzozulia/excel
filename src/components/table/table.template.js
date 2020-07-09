const CODES = {
    A: 65,
    Z: 90
}

function toColumn(col, data) {
    return `<div class="column unselectable" 
            data-type="resizable" data-index="${data}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`
}

function toCell(_, data) {
    return `<div class="cell" data-index="${data}" contenteditable>
    </div>`
}

function createRow(index, content) {
    const resizer = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    return `
    <div class="row" data-type="resizable">
       <div class="row-info unselectable">
       ${index}
       ${resizer}
       </div>
       <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow('', cols))

    for (let i = 0; i < rowCount; i++) {
        const cells= new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    return rows.join('')
}

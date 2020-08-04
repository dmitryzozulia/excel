import {initialState} from '@/redux/initialState'
import {toInLineStyles} from '@core/utils'
import {defaultStyles} from '@/constans'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

function widthCol(idCol) {
    const state = initialState
        if ('colState' in state && idCol in state.colState) {
            return `${state.colState[idCol]}px;`
        }
    return `120px`
}

function heightRow(idRow) {
    const state = initialState
        if ('rowState' in state && idRow in state.rowState) {
            return `style = "height: ${state.rowState[idRow]}px;"`
        }
    return ''
}

function dataCell(idCell) {
    const state = initialState
    if ('dataState' in state && idCell in state.dataState) {
        return `${state.dataState[idCell]}`
    }
    return ''
}


function toColumn(col, data) {
    return `<div class="column unselectable" 
                data-type="resizable" 
                data-col="${data}" 
                style="width: ${widthCol(data)}"
             >
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`
}

function toCell(row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const styles = toInLineStyles({
            ...defaultStyles,
            ...initialState.stylesState[id]
        })
        return `
        <div class="cell" 
            data-col="${col}"
            data-row="${row}" 
            data-type="cell"
            data-id="${id}" 
            data-value="${dataCell(id)}"
            contenteditable
            style="${styles}; width: ${widthCol(col)}"
        >${parse(dataCell(id))}</div>`
    }
}

function createRow(index, content) {
    const resizer = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    return `
    <div class="row" 
        data-type="resizable" 
        data-row="${index - 1}" 
        ${heightRow(index - 1)}
    >
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

    for (let row = 0; row < rowCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')
        rows.push(createRow(row + 1, cells))
    }
    return rows.join('')
}

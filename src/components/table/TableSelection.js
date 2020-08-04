import {$} from '@core/dom'
import {parse} from '@core/parse'

export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }

    clear() {
        if (this.current !== null) {
            this.current.text(parse(this.current.data.value))
        }
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    get selectedIds() {
        return this.group.map($el => $el.data.id)
    }

    selectGroupCtrl($el) {
        if ($el.$el.className === 'cell selected') {
            for (let i = 0; i < this.group.length; i++) {
                if (this.group[i].data.id === $el.data.id) {
                    if (this.group.length === 1) {
                        break
                    } else {
                        this.group.splice(i, 1)
                        $el.removeClass(TableSelection.className)
                        break
                    }
                }
            }
        } else {
            this.current = $el
            $el.addClass(TableSelection.className)
            this.group.push($el)
        }
    }

    selectGroupShift($el) {
        const last = this.current.data.id.split(':')
        const target = $el.data.id.split(':')
        this.clear()
        let lastRow = +last[0]
        let targetRow = +target[0]
        let lastCol = +last[1]
        let targetCol = +target[1]
        if (lastRow > targetRow) {
            [targetRow, lastRow] = [lastRow, targetRow]
        }
        if (lastCol > targetCol ) {
            [targetCol, lastCol] = [lastCol, targetCol]
        }
        for (let i = lastRow; i <= targetRow; i++) {
            for (let k = lastCol; k <= targetCol; k++) {
                this.group
                    .push($(document.querySelector(`[data-id="${i}:${k}"]`)))
            }
        }
        this.group.map(i => i.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}


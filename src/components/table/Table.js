import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resize} from '@/components/table/table.resize'
import {
    isCell,
    nextSelector,
    shouldResize
} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constans'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.selectCell($cell)

        this.$on('tools:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resize(event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroupCtrl($target)
            }
            if (event.shiftKey) {
                this.selection.selectGroupShift($target)
            } else if (event.ctrlKey === false && event.shiftKey === false) {
                this.selectCell($target)
            }
            this.$emit('table:select', $target)
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp'
        ]
        const {key} = event
        if (keys.includes(key)) {
            event.preventDefault()
            const id = this.selection.current.data.id.split(':')
            const $next = this.$root
                .find(nextSelector(key, id[0], id[1]))
            this.selectCell($next)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.data.id,
            value
        }))
    }
    onInput(event) {
        $(event.target).data.value = $(event.target).text()
        this.updateTextInStore($(event.target).data.value)
    }
}

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
        console.log(this)
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
       this.selectCell($cell)
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resize(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroupCtrl($target)
            }
            if (event.shiftKey) {
                this.selection.selectGroupShift($target)
            } else if (event.ctrlKey === false && event.shiftKey === false) {
                this.selection.select($target)
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
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}

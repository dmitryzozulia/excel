import {createTools} from '@/components/toolbar/tools.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constans'

export class Tools extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createTools(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('tools:applyStyle', value)
        }
    }
}

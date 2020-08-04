import {ExcelComponent} from '@core/ExcelComponent'
import {changeName} from '@/redux/actions'
import {$} from '@core/dom'
import {debounce} from '@core/utils'
import {defaultName} from '@/constans'


export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const name = this.store.getState().name || defaultName
        return `
            <input type="text" class="input" value="${name}" />
            <div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
            </div>
        `
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeName($target.text()))
    }
}

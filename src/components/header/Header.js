import {ExcelComponent} from '@core/ExcelComponent'
import {changeName} from '@/redux/actions'
import {$} from '@core/dom'
import {debounce} from '@core/utils'
import {defaultName} from '@/constans'
import {ActiveRoute} from '@core/routes/ActiveRoute'


export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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

    onClick(event) {
        const $target = $(event.target)
        if ($target.$el.innerHTML === 'delete') {
            const decision = confirm('Do you really want to delete this table')
            if (decision) {
                localStorage
                    .removeItem('excel:' + ActiveRoute.param)
                    ActiveRoute.navigate('')
            }
        }
        if ($target.$el.innerHTML === 'exit_to_app') {
            ActiveRoute.navigate('')
        }
    }
}

import {Excel} from '@/components/excel/Excel'
import './scss/index.scss'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Tools} from '@/components/toolbar/Tools'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {initialState} from '@/redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Tools, Formula, Table],
    store
})

excel.render()


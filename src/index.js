import {Excel} from '@/components/excel/Excel'
import './scss/index.scss'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Tools} from '@/components/toolbar/Tools'

const excel = new Excel('#app', {
    components: [Header, Tools, Formula, Table]
})

excel.render()


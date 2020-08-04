import {storage} from '@core/utils'
import {defaultStyles, defaultName} from '@/constans'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    name: defaultName,
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState

import {clone} from '@core/utils'
import {defaultStyles, defaultName} from '@/constans'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    name: defaultName,
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}

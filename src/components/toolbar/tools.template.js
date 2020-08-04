function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `
    return `               
        <div 
            class="button ${button.active ? 'active' : ''}"
            ${meta}
        >
            <i class="material-icons" ${meta}>${button.icon}</i>
        </div>
    `
}


export function createTools(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: state['fontWeight'] === 'bold'
                ? {fontWeight: 'normal'}
                : {fontWeight: 'bold'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: state['fontStyle'] === 'italic'
                ? {fontStyle: 'normal'}
                : {fontStyle: 'italic'}
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'underline',
            value: state['textDecoration'] === 'underline'
                ? {textDecoration: 'none'}
                : {textDecoration: 'underline'}
        }
    ]
    return buttons.map(toButton).join('')
}

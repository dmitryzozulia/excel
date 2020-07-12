import {$} from '@core/dom'

export function resize(event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const type = $resizer.data.resize
    const elem = document.getElementsByClassName('excel__table')
    let value
    document.onmousemove = e => {
        const coords = $parent.getCoords()
        let delta
        $resizer.css({
            opacity: 1
        })
        if (type === 'row') {
            delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({
                width: elem[0].clientWidth + 'px',
                bottom: -delta + 'px'
            })
        } else {
            delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({
                opacity: 1,
                height: elem[0].clientHeight + 'px',
                right: -delta + 'px'
            })
        }
    }

    document.onmouseup = () => {
        document.onmouseup = null
        document.onmousemove = null
        $resizer.css({
            opacity: 0,
            width: '',
            height: '',
            right: 0,
            bottom: 0,
            cssBack() {
                if (type === 'col') {
                    return this.width = 100 + '%'
                } else {
                    return this.height = 100 + '%'
                }
            }
        })
        if (type === 'row') {
            $parent.css({
                height: value + 'px'
            })
        } else {
            document.querySelectorAll(
                `[data-col="${$parent.data.col}"]`
            ).forEach(el => el.style.width = value + 'px')
        }
    }
}

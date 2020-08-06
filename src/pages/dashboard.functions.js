import {storage} from '@core/utils'

function toHTML(key) {
    return `
         <li class="db__record">
                <a href="#${key.replace(':', '/')}">
                    ${storage(key).name}
                </a>
                <strong>
                    ${new Date(storage(key).openedDate).toLocaleDateString()}
                    ${new Date(storage(key).openedDate).toLocaleTimeString()}
                </strong>
         </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>You don't create table yet</p>`
    }
    return `        
        <div class="db__list-header">
            <span>Name</span>
            <span>Data</span>
        </div>
        <ul class="db__list">
                ${keys.map(key => toHTML(key)).join('')}
        </ul>`
}

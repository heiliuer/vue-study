export const supportsPassive: boolean = (() => {
    // tslint:disable-next-line:no-shadowed-variable
    let supportsPassive = false
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get() {
                supportsPassive = true
            }
        })
        // @ts-ignore
        window.addEventListener('test', null, opts)
    } catch (e) {

    }
    return supportsPassive
})()

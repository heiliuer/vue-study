export const supportsPassive: boolean = (() => {
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        supportsPassive = true
      }
    })
    // @ts-ignore
    window.addEventListener('test', null, opts)
    // eslint-disable-next-line no-empty
  } catch (e) {

  }
  return supportsPassive
})()

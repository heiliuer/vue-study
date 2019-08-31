export const supportsPassive: boolean = (() => {
  // tslint:disable-next-line:no-shadowed-variable
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        supportsPassive = true;
      },
    });
    // @ts-ignore
    window.addEventListener('test', null, opts);
  } catch (e) {
    // eslint-disable-next-line no-empty
  }
  return supportsPassive;
})();

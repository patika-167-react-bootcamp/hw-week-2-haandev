const state = []
const keepState = []
const useState = function (defaultValue) {
  const i = state.length
  keepState[i] = keepState[i] === undefined ? defaultValue : keepState[i]
  state[i] = keepState[i]
  const setState = function (value) {
    if (typeof value === 'function') {
      keepState[i] = value(keepState[i])
    } else {
      keepState[i] = value
    }
    state.splice(0)
    window.renderFunction()
  }
  const getState = function () {
    return state[i]
  }
  return [getState, setState]
}

const formValues = {}
const handleOnChange = function (event) {
  const name =
    event.target.getAttribute('name') || event.target.getAttribute('id')
  formValues[name] = event.target.value || ''
}
const setFormElement = function (name, value = '') {
  if (typeof name === 'string') {
    const elem =
      document.getElementsByName(name)[0] || document.getElementById(name)
    if (elem) {
      elem.value = value
    }
  } else if (name.constructor === Array) {
    name.forEach((item) => setFormElement(item, value))
  }
}

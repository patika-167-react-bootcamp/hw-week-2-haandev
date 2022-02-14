const AccountHolder = function (props) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${props.name}<span>${props.balance}</span>
    </li>`
}

const AccountHolderList = function (props) {
  return `
    <ul class="list-group list-group-flush" id="account-holders-list">
      ${props.list.map((item) => AccountHolder(item)).join('')}
    </ul>`
}

const OptionAccount = function (props) {
  return `
    <option value="${props.id}">
      ${props.name}
    </option>`
}

const AccountSelect = function (props) {
  return `
    <select
        id="${props.name}"
        name="${props.name}"
        class="form-select" 
        onchange="handleOnChange(event)"
        aria-label="Default select example">
        <option selected>${props.default}</option>
        ${props.list.map((item) => OptionAccount(item)).join('')}
    </select>`
}
const HistoryItem = function (props) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">${props.timestamp.toLocaleString()} - ${
    props.message
  } ${svgHelper[props.type]}</li>`
}
const HistoryList = function (props) {
  return `
    <ul class="list-group list-group-flush" id="history-list">
        ${props.list.map((item) => HistoryItem(item)).join('')}
    </ul>`
}

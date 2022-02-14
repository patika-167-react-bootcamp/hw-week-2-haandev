(function render() {
    const [accountHoldersList, setAccountHoldersList] = useState([])
    const [history, setHistory] = useState([])
    
    window.addHistory=function(value){
        setHistory(prev=>[...prev,value])
    }
    window.newAccountHolder = function () {
        setAccountHoldersList(prev => (
            [...prev, { id:id(),name: formValues.newAccountHolder, balance: Number(formValues.newAccountBalance) }]
        ))
        addHistory({timestamp:new Date(),message:`${formValues.newAccountHolder} became a new customer with balance ${formValues.newAccountBalance}`,type:"success"})
        setFormElement(['newAccountHolder','newAccountBalance'])
    }
    
    window.transactionalAction = function(){
        const copy = [...accountHoldersList()]
        const sender = copy.find(item=>Number(item.id)===Number(formValues.from))
        const receiver = copy.find(item=>Number(item.id)===Number(formValues.to))
        const amount = Number(formValues['transactional-amount'])
        if (sender===receiver){
            addHistory({
                timestamp:new Date(),
                message:'Sender and receiver is same person',
                type:"error"
            })
            return
        }
        if (sender.balance<Number(amount)){
            addHistory({
                timestamp:new Date(),
                message:'Insufficient balance of sender',
                type:"warning"
            })
        }
        if (!sender && !receiver){
            addHistory({
                timestamp:new Date(),
                message:'Invalid sender and receiver',
                type:"error"
            })
            return
        }
        if (!sender){
            addHistory({
                timestamp:new Date(),
                message:'Invalid sender',
                type:"error"
            })
            return
        }
        if (!receiver){
            addHistory({
                timestamp:new Date(),
                message:'Invalid receiver',
                type:"error"
            })
            return
        }
        sender.balance = sender.balance - amount
        receiver.balance = receiver.balance + amount
        addHistory({timestamp:new Date(),message:`${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}`,type:"transfer"}) 
        setAccountHoldersList(copy)
    }
    
    document.getElementById("account-holders-list").innerHTML = AccountHolderList({ list: accountHoldersList() })
    document.getElementById("from-the-account-holder-list").innerHTML= AccountSelect({list: accountHoldersList(),default:"From", name:"from"})
    document.getElementById("send-to-account-holder-list").innerHTML= AccountSelect({list: accountHoldersList(),default:"To", name:"to"})
    document.getElementById("history-container").innerHTML= HistoryList({list: history()})
    
    window.renderFunction = render
})()
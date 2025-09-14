 
const balanceEl=document.querySelector("#total-amount")
const incomeAmount=document.querySelector("#income-amount")
const expenseAmount=document.querySelector("#expense-amount")
const transactionList=document.querySelector("#list")
const transactionForm=document.querySelector("#transaction-form")
const descreptionEL=document.querySelector("#description-txt")
const amount=document.querySelector("#amount")

let transaction=JSON.parse(localStorage.getItem("transaction"))||
[]
//add eventloistner in list
transactionForm.addEventListener("submit",addTransaction)
//add eventlistenr in btn
 
//make addtracsation function
function addTransaction(e){
 e.preventDefault();
 //get for value
const descreptions=descreptionEL.value.trim()
const amountValue=parseFloat(amount.value)
console.log(typeof amountValue)
transaction.push({
    id:Date.now(),
    descreption:descreptions,
    amount:amountValue
    
})
 
localStorage.setItem("transaction",JSON.stringify(transaction))
updatetransactionList()
updateSummary()
   
}
 
 transactionForm.reset()
 function updatetransactionList(){
    transactionList.innerHTML=""
    const sortedtransaction=[...transaction].reverse()
 sortedtransaction.forEach((transactions) => {
   const transactionEL= createTransactionElement(transactions)
    transactionList.appendChild(transactionEL)

 });
}
function removeTransactions(id) {
  transaction = transaction.filter((t) => t.id !== id);
  localStorage.setItem("transaction", JSON.stringify(transaction));
  updatetransactionList();
  updateSummary();
}
function createTransactionElement(transactions){
    const li=document.createElement("li")
    li.classList.add("transactions")
     li.classList.add( transactions.amount > 0 ?"income":"expense")

     li.innerHTML=`
     <span>${transactions.descreption}</span>
     <span>
     ${transactions.amount}
 <button class="delete-btn" onclick="removeTransactions(${transactions.id})">x</button>

     </span>
     `
     return li
}
function updateSummary(){
const balance =transaction.reduce((acc,transactions)=>acc+transactions.amount ,0);
let income=transaction
.filter((transactions)=>transactions.amount>=0)
.reduce((acc,transactions)=>acc+transactions.amount,0 );

let expense=transaction
.filter((transactions)=>transactions.amount<=0)
.reduce((acc,transactions)=>acc+transactions.amount,0 );

balanceEl.textContent=balance;
incomeAmount.textContent=income;
 expenseAmount.textContent=expense;
}

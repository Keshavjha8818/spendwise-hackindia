const seedTransactions = [
  {id:1,title:"Lunch at campus",category:"Food",amount:180,date:"2026-11-05"},
  {id:2,title:"Metro recharge",category:"Travel",amount:500,date:"2026-11-04"},
  {id:3,title:"Notebook & pens",category:"Study",amount:240,date:"2026-11-03"},
  {id:4,title:"Coffee with friends",category:"Food",amount:160,date:"2026-11-02"},
  {id:5,title:"T-shirt",category:"Shopping",amount:890,date:"2026-11-01"},
  {id:6,title:"Auto ride",category:"Travel",amount:120,date:"2026-11-01"}
];
let transactions = [...seedTransactions];
let budget = 12000;
const $ = id => document.getElementById(id);
const currency = n => "₹ " + Number(n).toLocaleString("en-IN");
const icons = {Food:"☕",Travel:"↗",Shopping:"◇",Study:"▤",Other:"✳"};
function total(){return transactions.reduce((s,t)=>s+t.amount,0)}
function grouped(){const result={};transactions.forEach(t=>result[t.category]=(result[t.category]||0)+t.amount);return Object.entries(result).sort((a,b)=>b[1]-a[1])}
function dateLabel(date){return new Date(date+"T12:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
function rowHTML(t){return `<div class="transaction-row"><span class="transaction-icon">${icons[t.category]||"✳"}</span><div><strong>${escapeHTML(t.title)}</strong><small>${t.category} · ${dateLabel(t.date)}</small></div><span class="transaction-amount">− ${currency(t.amount)}</span></div>`}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function barsHTML(){const cats=grouped();if(!cats.length)return emptyHTML("No spending yet","Add your first expense to see your category breakdown.");return cats.map(([name,value])=>`<div class="category-row"><span class="cat-name">${name}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(3,value/Math.max(total(),1)*100)}%"></div></div><span class="cat-amount">${currency(value)}</span></div>`).join("")}
function emptyHTML(title,copy){return `<div class="empty-state"><div style="font-size:25px">✳</div><strong>${title}</strong><p>${copy}</p><button class="primary-button" data-open-add>＋ Add expense</button></div>`}
function render(){
 const spent=total(),left=budget-spent,percent=Math.min(spent/budget*100,100);
 $("spentValue").textContent=currency(spent);$("leftValue").textContent=currency(Math.max(left,0));$("budgetValue").textContent=currency(budget);$("expenseCount").textContent=transactions.length;
 $("budgetSpent").textContent=currency(spent);$("budgetProgress").style.width=percent+"%";$("budgetStatus").textContent=left>=0?`${(left/budget*100).toFixed(1)}% of budget left`:"Budget exceeded";
 $("budgetMessage").textContent=left>=0?"You're on track. You have room for the rest of the month.":"You've crossed your monthly budget. Review your spending before adding more.";
 $("categoryBars").innerHTML=barsHTML();$("insightCategories").innerHTML=barsHTML();$("insightTotal").textContent=currency(spent);
 $("insightTip").textContent=left>=0?`You have ${currency(left)} left in your budget. Keep tracking to stay in control.`:"Your spending is above budget. Check the category breakdown to find room to adjust.";
 const recent=[...transactions].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id).slice(0,4);
 $("recentList").innerHTML=recent.length?recent.map(rowHTML).join(""):emptyHTML("No transactions yet","Your latest expenses will show up here.");
 renderTransactions();
}
function renderTransactions(){
 const q=$("searchInput").value.toLowerCase(),cat=$("categoryFilter").value;
 const filtered=[...transactions].filter(t=>(cat==="all"||t.category===cat)&&(t.title.toLowerCase().includes(q)||t.category.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
 $("transactionList").innerHTML=filtered.length?filtered.map(rowHTML).join(""):emptyHTML(transactions.length?"No matching expenses":"Nothing here yet",transactions.length?"Try another search or category filter.":"Add an expense and it will appear here.");
}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function openExpense(){ $("formError").textContent="";$("expenseForm").reset();$("expenseDate").value=new Date().toISOString().slice(0,10);$("expenseDialog").showModal();$("expenseTitle").focus() }
function showView(name){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));$(name+"View").classList.add("active");document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===name));const titles={overview:"Good morning, Keshav",transactions:"Your transactions",insights:"Your spending, decoded"};$("pageTitle").innerHTML=titles[name]+(name==="overview"?' <span>✦</span>':"");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
$("quickAdd").addEventListener("click",openExpense);$("transactionAdd").addEventListener("click",openExpense);$("closeDialog").addEventListener("click",()=>$("expenseDialog").close());
$("expenseForm").addEventListener("submit",e=>{e.preventDefault();const title=$("expenseTitle").value.trim(),amount=Number($("expenseAmount").value),date=$("expenseDate").value;if(!title||!Number.isFinite(amount)||amount<=0||!date){$("formError").textContent="Please enter a description, a valid amount and a date.";return}transactions.push({id:Date.now(),title,amount,category:$("expenseCategory").value,date});render();$("expenseDialog").close();toast("Expense saved successfully.")});
$("editBudget").addEventListener("click",()=>{$("budgetInput").value=budget;$("budgetError").textContent="";$("budgetDialog").showModal()});$("closeBudget").addEventListener("click",()=>$("budgetDialog").close());
$("budgetForm").addEventListener("submit",e=>{e.preventDefault();const value=Number($("budgetInput").value);if(!Number.isFinite(value)||value<=0){$("budgetError").textContent="Enter a budget greater than ₹0.";return}budget=value;render();$("budgetDialog").close();toast("Monthly budget updated.")});
$("searchInput").addEventListener("input",renderTransactions);$("categoryFilter").addEventListener("change",renderTransactions);
document.addEventListener("click",e=>{if(e.target.closest("[data-open-add]"))openExpense()});
$("themeButton").addEventListener("click",()=>{document.body.classList.toggle("dark");toast(document.body.classList.contains("dark")?"Dark appearance enabled":"Light appearance enabled")});
$("profileButton").addEventListener("click",()=>toast("You're viewing your student account."));
$("dateLabel").textContent=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"}).toUpperCase();
render();
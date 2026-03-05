import {menuArray} from "./data.js"

const container = document.getElementById("container")
const container2 = document.getElementById("container2")
const precoFinal = document.getElementById("preco-final")
const pedido = document.getElementById("pedido")
const submit = document.getElementById("submit-btn")
const modal = document.getElementById("pagamento")
const closeModal = document.getElementById("close-modal")
const form = document.getElementById("form")

function render(arr) {
    return arr.map((item)=>{
        return `
        <div class="item">
            <div class="emoji">${item.emoji}</div>
            <div class="description">
                <h4 class="name">${item.name}</h4>
                <h6 class="ingredients">${item.ingredients.join(", ")}</h6>
                <p class="price">${item.price}$</p>
            </div>
            <button class="add-btn" data-btn=${item.id}>+</button>
        </div>
        `
    }).join("")
    
}

container.innerHTML = render(menuArray)

const pedidoArray = []

container.addEventListener("click", function(e){
    if(e.target.dataset.btn) {
        container2.style.display = 'flex'
        addOrder(e.target.dataset.btn)
        renderOrder()
    }
})

function addOrder(id) {
    
    const exist = pedidoArray.find((item)=>{return item.id == id})
    if (exist) {
        exist.quantity++
    } else {
        const target = menuArray.find((item) => {return item.id ==id})

        if (target) {pedidoArray.push({...target, quantity: 1})}
    }

    
}

function renderOrder() {
    let total = 0

    const pedidoHtml = pedidoArray.map((item) => {
        total += item.price * item.quantity
        
        return `
        <div class="pedido-div">
            <span class="pedido-span">
                <h4>${item.quantity}x ${item.name}</h4>
                <button class="remove-btn" data-remove="${item.id}">-</button>
            </span>
            <h4>${item.price}$</h4>
        </div>
        `
    }).join("")

    pedido.innerHTML = pedidoHtml
    precoFinal.textContent = `${total}$`
}

container2.addEventListener("click", function(e){
    if(e.target.dataset.remove) {
        removeOrder(e.target.dataset.remove)
        renderOrder()
    }
})

function removeOrder(id) {
    const targetItem = pedidoArray.find((item) => item.id == id);
    
    if (targetItem && targetItem.quantity > 1) {
        targetItem.quantity--;
    } else {

        const indexToRemove = pedidoArray.findIndex((item) => item.id == id);
        
        if (indexToRemove !== -1) {
            pedidoArray.splice(indexToRemove, 1);
        }
    }

    if (pedidoArray.length < 1) {
        container2.style.display = 'none';
    }
}

submit.addEventListener("click", function(){
    modal.style.display = "flex"
})

closeModal.addEventListener("click", function(){
    modal.style.display = "none"
})

form.addEventListener("submit", function(e){
    e.preventDefault()
    modal.style.display = "none"
    container2.innerHTML = `
    <div class="obrigado">
        <h1>Obrigado por comprar na Pará Sorvetes</h1>
        <h2 class="emoji">😘</h2>
    </div>                      
    `

})
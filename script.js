import {menuArray} from "./data.js"

const container = document.getElementById("container")
const container2 = document.getElementById("container2")
const precoFinal = document.getElementById("preco-final")
const pedido = document.getElementById("pedido")

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

const pedidoArray = []

container.addEventListener("click", function(e){
    if(e.target.dataset.btn) {
        container2.style.display = 'flex'
        addOrder(e.target.dataset.btn)
        renderOrder()
    }
})

function addOrder(id) {
    
    const target = menuArray.find((item)=>{
        return item.id == id
    })

    if (target) {
        pedidoArray.push(target)
    }
}

function renderOrder() {
    let total = 0

    const pedidoHtml = pedidoArray.map((item) => {
        total += item.price
        return `
        <div class="pedido-div">
            <span class="pedido-span">
                <h4>${item.name}</h4>
                <button class="remove-btn" data-remove="${item.id}">-</button>
            </span>
            <h4>${item.price}$</h4>
        </div>
        `
    }).join("")

    pedido.innerHTML = pedidoHtml
    precoFinal.textContent = `${total}$`
}

container.innerHTML = render(menuArray)

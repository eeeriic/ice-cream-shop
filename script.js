import {menuArray} from "./data.js"

const container = document.getElementById("container")
const container2 = document.getElementById("container2")

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
            <button class="add-btn">+</button>
        </div>
        `
    }).join("")
    
}



container.innerHTML = render(menuArray)

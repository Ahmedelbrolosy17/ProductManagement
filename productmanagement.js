let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("create");
let search = document.getElementById("search");
let srchByTitlte = document.getElementById("sTitle")
let srchByCateg = document.getElementById("sCategory");
let deleteALlBtn = document.getElementById("deleteAll");
let tBody = document.querySelector("tbody");
let inputs = document.querySelector(".inputs");
let chooseCat = document.querySelector(".outputs .choosecat")


let productArr;

if(localStorage.getItem("product")){
    productArr = JSON.parse(localStorage.getItem("product"))
}else{
    productArr = [];
}

createBtn.onclick = function (){
    calcTotal();
    createProduct();
    showData(productArr);
}
showData(productArr);

search.oninput = function(){
        if(search.getAttribute("placeholder") == "search"){
            chooseCat.style.display = "block";
    
        }else if(search.getAttribute("placeholder") == "title"){
            let found = titleSearch();
            showData(found)
        }else if(search.getAttribute("placeholder") == "category"){
            let found = categorySearch();
            showData(found);
        }
   
}
srchByTitlte.onclick = function (){
    search.setAttribute("placeholder", "title");
    chooseCat.style.display = "none";
};
srchByCateg.onclick = function (){
    search.setAttribute("placeholder", "category")
    chooseCat.style.display = "none";
};
deleteALlBtn.onclick = function(){
    productArr = [];
    localStorage.clear();
    showData(productArr);
};
let deleteBtn = document.querySelector("tbody tr .delete");
let updateBtn = document.querySelector("tbody tr .update"); 
let update;
let x;
tBody.addEventListener("click", e =>{
    if(e.target.classList.contains("update")){
        if(document.querySelector(".inputs .goupdate") == null){
        createBtn.style.display = "none"
        update = document.createElement("button");
        update.innerHTML = "update";
        update.classList.add("goupdate");
        category.after(update);
    }
    x = e.target.getAttribute("id");
    updateProduct1(x);

    }
})
inputs.addEventListener("click", e =>{
    if(e.target.classList.contains("goupdate")){
        updateProduct2(x);
        createBtn.style.display = "block";
        (document.querySelector(".goupdate")).style.display = "none"

    }
})
tBody.addEventListener("click", function(e){
    if(e.target.classList.contains("delete")){
        deleteProduct(e.target.getAttribute("id"));
        showData(productArr)
    }
})

//functions

function createProduct(){
    for(let i = 0; i< +count.value; i++){
        let newObj = {
            id : Math.floor(Math.random() * 1e6),
            title : title.value,
            price : price.value,
            taxes : taxes.value,
            ads : ads.value,
            discount : discount.value,
            total : total.innerHTML,
            category : category.value
        };
        productArr.push(newObj);
    }
    window.localStorage.setItem(`product`, JSON.stringify(productArr));
    clearInp();
}
function clearInp(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#9f2c2c"
}
function calcTotal(){
    if(price.value != "" && price.value > 0){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = "#9f2c2c"
    }
}
function showData(array){
    tBody.innerHTML = "";
    array.forEach(ele => {
        tBody.innerHTML += `<tr>
        <td>${ele.id}</td> <td>${ele.title}</td> <td>${ele.price}</td> <td>${ele.taxes}</td> <td>${ele.ads}</td> <td>${ele.discount}</td>
        <td>${ele.total}</td>
        <td>${ele.category}</td> <td><button class="update" id="${ele.id}">update</td> <td><button class="delete" id="${ele.id}">delete</td>
        </tr>`
    });
}

function titleSearch(){
    return productArr.filter(ele =>{
        return ele.title.includes(search.value);
    });
}
function categorySearch(){
    return productArr.filter(ele =>{
        return ele.category.includes(search.value)
    });
}
function updateProduct1(id){
    productArr.forEach(ele =>{
        if(ele.id == id){
            title.value = ele.title;
            price.value = ele.price;
            taxes.value = ele.taxes;
            ads.value = ele.ads;
            discount.value = ele.discount;
            category.value = ele.category;
        }
    })
}
function updateProduct2(id){
    productArr.forEach(ele =>{
        if(ele.id == id){
            ele.title = title.value;
            ele.price = price.value;
            ele.taxes = taxes.value;
            ele.ads = ads.value;
            ele.discount = discount.value;
            ele.category = category.value;
            calcTotal();
            ele.total = total.innerHTML
        }
    })
    clearInp()
    localStorage.setItem("product", JSON.stringify(productArr));
    showData(productArr);
}
function deleteProduct(id){
    productArr = productArr.filter(ele =>{
        return ele.id != id
    })
    localStorage.setItem("product", JSON.stringify(productArr))
}
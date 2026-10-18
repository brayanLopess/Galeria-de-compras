import { getProductData } from "./collectInfoFromInputs.js"
// import { getFilteredProducts } from "./searchingProduct.js"

const form = document.getElementById("productForm")
const searchProduct = document.getElementById("searchingProducts")
let products = JSON.parse(localStorage.getItem("products")) || []
let searchTerm = ""

renderProducts()

function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

function getFilteredProducts() {
    return products.filter((product) => normalize(product.name).includes(normalize(searchTerm)) || normalize(product.category).includes(normalize(searchTerm)))
}

function renderProducts() {
    const container = document.getElementById("productsList")
    container.innerHTML = ""

    const productsQuantity = document.getElementById("productsQuantity")
    productsQuantity.textContent = products.length
    
    const filteredProducts = getFilteredProducts()
    if(filteredProducts.length === 0) {
        const empty = document.createElement("p")
        empty.textContent = "Nenhum produto encontrado."
        container.appendChild(empty)
        return
    }

    filteredProducts.forEach((product) => {
        const item = document.createElement("div")
        item.classList.add("item")
        item.dataset.id = product.id

        const img = document.createElement("img")
        img.src = product.image
        img.alt = `Imagem de ${product.name}`

        const description = document.createElement("div")
        description.classList.add("description")

        const name = document.createElement("h2")
        name.classList.add("itemName")
        name.textContent = product.name

        const category = document.createElement("h4")
        category.classList.add("category")
        category.textContent = product.category

        const price = document.createElement("h3")
        price.classList.add("price")
        price.textContent = `R$ ${Number(product.value).toFixed(2).replace(".", ",")}`

        const moreInfo = document.createElement("button")
        moreInfo.textContent = "Veja mais"
        moreInfo.classList.add("moreInfo")

        const arrowRight = document.createElement("span")
        arrowRight.textContent = "->"

        // Creating elements for description section.
        const descriptionSection = document.createElement("div")
        descriptionSection.classList.add("hideDiv")

        const backgroundSection = document.createElement("div")
        backgroundSection.classList.add("backgroundMoreProductsInfo")

        const funcBtns = document.createElement("div")
        funcBtns.classList.add("funcBtns")

        const btnRemoveProduct = document.createElement("button")
        btnRemoveProduct.classList.add("removeProduct")
        btnRemoveProduct.textContent = "Remover produto"

        const closeBtn = document.createElement("h1")
        closeBtn.textContent = "X"

        const descriptionContent = document.createElement("div")
        descriptionContent.classList.add("descriptionContent")

        const imgDescription = document.createElement("img")
        imgDescription.src = product.image
        imgDescription.alt = `Imagem de ${product.name}`

        const nameDescription = document.createElement("h2")
        nameDescription.textContent = product.name

        const alignment = document.createElement("div")
        alignment.classList.add("priceAndcategoryAlignment")

        const priceDescription = document.createElement("h3")
        priceDescription.classList.add("priceDescriptionProduct")
        priceDescription.textContent = `R$ ${Number(product.value).toFixed(2).replace(".", ",")}`

        const categoryDescription = document.createElement("h4")
        categoryDescription.classList.add("categoryDescription")
        categoryDescription.textContent = product.category

        const descriptionText = document.createElement("h5")
        descriptionText.classList.add("descriptionTextProduct")
        descriptionText.textContent = product.description

        // Creating func to delete the selected product(ID)
        btnRemoveProduct.addEventListener("click", () => {
            if(confirm(`Deletar "${product.name}"?`)) {
                products = products.filter((p) => p.id !== product.id)
                localStorage.setItem("products", JSON.stringify(products))
                renderProducts()
            }
        })

        name.title = product.name

        description.appendChild(category)
        description.appendChild(name)
        description.appendChild(price)
        description.appendChild(moreInfo)
        moreInfo.appendChild(arrowRight)
        item.appendChild(img)
        item.appendChild(description)
        container.appendChild(item)
        container.appendChild(descriptionSection)
        descriptionSection.appendChild(backgroundSection)
        backgroundSection.appendChild(funcBtns)
        funcBtns.appendChild(btnRemoveProduct)
        funcBtns.appendChild(closeBtn)
        backgroundSection.appendChild(descriptionContent)
        descriptionContent.appendChild(imgDescription)
        descriptionContent.appendChild(nameDescription)
        descriptionContent.appendChild(alignment)
        alignment.appendChild(priceDescription)
        alignment.appendChild(categoryDescription)
        descriptionContent.appendChild(descriptionText)

        moreInfo.addEventListener("click", () => {
            descriptionSection.classList.remove("hideDiv")
            descriptionSection.classList.add("centerProductsInfoItems", "itemsDescription")
        })

        closeBtn.addEventListener("click", () => {
            descriptionSection.classList.remove("centerProductsInfoItems", "itemsDescription")
            descriptionSection.classList.add("hideDiv")
        })
    })
}

searchProduct.addEventListener("input", () => {
    searchTerm = searchProduct.value
    renderProducts(getFilteredProducts())
})

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const productsData = getProductData()

    const newProduct = {
        id: Date.now(),
        ...productsData
    }

    console.log(products)
    console.log(newProduct)

    products.push(newProduct)
    localStorage.setItem("products", JSON.stringify(products))
    renderProducts()
    form.reset()
})


// Receiving form and form inputs
const form = document.getElementById("productForm")
const productName = document.getElementById("name")
const productCategory = document.getElementById("category")
const productDescription = document.getElementById("description")
const productPrice = document.getElementById("price")
const productImage = document.getElementById("image")
const submitForm = document.getElementById("submitForm")

let products = JSON.parse(localStorage.getItem("products")) || []

export function getProductData() {
    return {
        name: productName.value,
        category: productCategory.value, 
        description: productDescription.value,
        value: productPrice.value,
        image: productImage.value
    }
}
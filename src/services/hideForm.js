const form = document.getElementById("formContent")
const createProduct = document.getElementById("registerNewProduct")
const closeForm = document.getElementById("closeButton")

createProduct.addEventListener("click", () => {
    form.classList.remove("hideDiv")
    form.classList.add("centerItems")
})

closeForm.addEventListener("click", () => {
    form.classList.remove("centerItems")
    form.classList.add("hideDiv")
})
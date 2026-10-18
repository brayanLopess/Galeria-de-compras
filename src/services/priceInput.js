const productPrice = document.getElementById("price")

productPrice.addEventListener("input", () => {
    const digits = productPrice.value.replace(/\D/g, "")

    if(digits === "") {
        productPrice.value = ""
        return
    }

    const value = Number(digits) / 100

    productPrice.value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
})
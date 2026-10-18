const priceInput = document.getElementById("price")

priceInput.addEventListener("input", () => {
    const digits = priceInput.value.replace(/\D/g, "")

    if(digits === "") {
        priceInput.value = ""
        return
    }

    const value = Number(digits) / 100

    priceInput.value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
})
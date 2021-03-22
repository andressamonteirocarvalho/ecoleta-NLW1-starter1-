const buttonSearch = document.querySelector("#page-home main a") //Pegando o meu <a> e colocando na minha variável buttonsearch
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
buttonSearch.addEventListener("click", () =>{ //quando eu clicar em buttonSearch ouve o evento de click, quando eu clicar neste botão eu quero pegar o meu modal
    modal.classList.remove("hide") // Quando eu clicar em buttonSearch eu removo a classe hide
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})

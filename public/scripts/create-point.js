   

    function populateUFs(){
        const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => {return res.json() })
        .then( states => {

            for( const state of states){
                ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
            }

        })
    }

    populateUFs()

    function getCities(event) {
        const citySelect = document.querySelector("select[name=city]")// Pegando a referência no html
        const stateInput = document.querySelector("input[name=state]")

        const ufValue= event.target.value //texto de onde a pessoa clicou

        const indexOfSelectedState = event.target.selectedIndex // O index entende-se como o indice(posição)  de um array. Neste caso pega o indice de onde foi clicado 
        stateInput.value = event.target.options[indexOfSelectedState].text // Aqui eu chamo A VARIAVEL E PEGO O TEXTO DELA NO OPTION

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value>Selecione a cidade</option>"
        citySelect.disabled = true

        fetch(url)
        .then( (res) => {return res.json() })
        .then( cities => {
            for( const city of cities){
                citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
    }

     document
        .querySelector("select[name=uf]")
        //Existem dois meios de colocar função anônima deste function() {} e deste () => {}
        .addEventListener("change", getCities)

  // Itens de Coleta
  
  const itemsToCollect = document.querySelectorAll(".items-grid li") //Vou buscar todos que estiverem dentro do Items grid Li e colocar no Items to collect

  for (const item of itemsToCollect){ // Para cada um deles você irá fazer algo no Item
      item.addEventListener("click", handleSelectedItem) // você vai adicionar um ouvidor de eventos
  }

  const collectedItems = document.querySelector("input[name=items]")

  let selectedItems = []

  function handleSelectedItem(event){ // Toda vez que o evento for disparado, no caso o click, ele passa para dentro da função um evento
      const itemLi = event.target
      //adicionar ou remover uma classe com JavaScript
      itemLi.classList.toggle("selected")// Quando eu coloco o classList no elemento depois eu posso usar algumas funcionalidades como o add e o remove 
      //ou toggle eu posso falar qual a classe que eu vou colocar, e ele vai fazzer a função de adicionar ou remover de acordo a necessidade.

      const itemId = itemLi.dataset.id

      console.log('ITEM ID:', itemId)
      
      // verificar se existem itens selecionados, se sim
      // pegar os itens selecionados

      // Essa função findIndex ele precisa receber como retorno da função anonimafunction(item) apenas
      //verdadeiro ou falso, se for verdadeiro (find procurar pelo o index) ele achou o index ele vai colocar na variável alreadySelected o index que ele achou.
      const alreadySelected = selectedItems.findIndex( item => {
          const itemFound = item == itemId //isso será true ou false 
          return itemFound;
      })

      //se ja estiver selecionado, 
      if(alreadySelected >= 0) {
          //tirar a seleção
          const filteredItems = selectedItems.filter( item => {
              const itemIsDifferent = item != itemId
              return itemIsDifferent
      })

      selectedItems = filteredItems

      }else{
          //se não estiver selecionado, adicionar a seleção,
          selectedItems.push(itemId)

      }

      //console.log('selectedItems: ', selectedItems) sempre que vc precisar entender algo use o console.log
     
     //atualizar o campo escondido com os itens selecionados
      collectedItems.value = selectedItems
     
        
    }

  
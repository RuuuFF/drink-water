const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

// Para cada item de "smallCups" ele executa uma função passando o item ("cup") e seu index ("index")
smallCups.forEach((cup, index) => {
  // Adiciona um ouvidor de eventos do tipo clique que chama a função "highlightCups" passando o index do item clicado
  cup.addEventListener('click', () => highlightCups(index))
})


// Declara a função "highlightCups"
function highlightCups(index) {
  // Ambos precisam retornar verdadeiro (por causa de "&&")
  // 1: Verifica se "smallCups.length - 1" é igual a "index" (elemento clicado)
  // 2: Verifica se o elemento clicado possuí a classe "full"
  // Se ambos retornarem verdadeiro, ele entra na função e decrementa "index" em 1
  if(smallCups.length - 1 === index && smallCups[index].classList.contains('full')) {
    index--
  }
  
  // Ambos precisam retornar verdadeiro (por causa de "&&")
  // 1: Verifica se o item clicado contém a classe "full"
  // 2: Verifica se o próximo elemento contém a classe "full", se não tiver, retorna true (por causa de "!")
  // Se ambos forem verdadeiro, entra e decrementa o "index" em 1 (Para remover, o item clicado precisa ter e o próximo não)
  if(smallCups[index].classList.contains('full') && !smallCups[index].nextElementSibling.classList.contains('full')) {
    index--
  }
  
  // Para cada item de "smallCups" ele executa uma função passando o item ("cup") e o index ("index2")
  smallCups.forEach((cup, index2) => {
    // Se "index2" for menor ou igual a "index" (valor recebido em "highlightCups"), ele entra e aplica em cada elemento cujo "index2" seja menor ou igual que "index" (se for maior, remove)
    if(index2 <= index) {
      // Adiciona a classe "full"
      cup.classList.add('full')
    } else {
      // Remove a classe "full"
      cup.classList.remove('full')
    }
  })
  
  updateBigCup()
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length
  const totalCups = smallCups.length
  
  if(fullCups === 0) {
    percentage.style.visibility = 'hidden'
    percentage.style.height = 0
  } else {
    percentage.style.visibility = 'visible'
    percentage.style.height = `${fullCups / totalCups * 330}px`
    percentage.innerText = `${fullCups / totalCups * 100}%`
  }
  
  if(fullCups === totalCups) {
    remained.style.visibility = 'hidden'
    remained.style.height = 0
  } else {
    remained.style.visibility = 'visible'
    liters.innerText = `${2 - (250 * fullCups / 1000)}L`
  }
}
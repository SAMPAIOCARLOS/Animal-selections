const myselect = document.getElementById('myselect')
const TwoSelect = document.getElementById('TwoSelect')
const myul = document.getElementById('myul')

const Imagem = document.getElementById('Imagem')
const Nameh1 = document.getElementById('Nameh1')
const TypeAnimal = document.getElementById('TypeAnimal')

document.body.addEventListener('keypress', (event) => {
if (event.key == 'Enter') {
    document.querySelector('.modal').classList.remove('open');
  }
})

myselect.addEventListener('change', ()=> {

    TwoSelect.innerHTML = ''
    Imagem.style.display = 'none'
    Nameh1.innerHTML = '...'
    TypeAnimal.innerHTML = '...'
    myul.innerHTML = ''


     const tipos = [
        {
            type: "Mamíferos",
            animals: ["Elefante", "Leão", "Gorila", "Baleia", "Cachorro", "Macaco"]
        },
        {
            type: "Herbívoros",
            animals: ["Girafa", "Cavalo", "Vaca", "Coelho", "Panda"]
        },
        {
            type: "Crustáceos",
            animals: ["Caranguejo", "Lagosta", "Siri", "Camarão", "Krill"]
        },
        {
            type: "Carnívoros",
            animals: ["Tigre", "Águia", "Leopardo", "Orca", "Hiena"]
        }
    ];

    const optionTitle = document.createElement('option')
    optionTitle.disabled = true;
    optionTitle.selected = true;
    optionTitle.innerText = 'Escolha'
    TwoSelect.append(optionTitle)

    for (let i = 0; i < tipos.length; i++) {
        const tipo = tipos[i];

        const valorSelect = myselect.value

        if(valorSelect === tipo.type) {
            const NamesAnimais = tipo.animals

            for (let index = 0; index < NamesAnimais.length; index++) {
                const NameAnimal = NamesAnimais[index];

                const newOption = document.createElement('option')
                newOption.innerText = NameAnimal

                TwoSelect.append(newOption)
                TwoSelect.style.display = 'block'
                
            }
        }    
    }
})

TwoSelect.addEventListener('change', async ()=> {
    myul.innerHTML = ''
    try {
        const response = await fetch('animais.json')
        const data = await response.json() 

        if(!response.ok) {
            return
        }

        for(let objct of data) {
            const valorTwoSelect = TwoSelect.value
            

            if(valorTwoSelect === objct.nome) {
                Imagem.setAttribute('src', objct.url)
                Imagem.style.display = 'block'

                Nameh1.innerHTML = objct.nome
                TypeAnimal.innerHTML = objct.type

                const Informacoes = objct.infor

                for (let i = 0; i < Informacoes.length; i++) {
                    const Informacao = Informacoes[i];

                    const newli = document.createElement('li')
                    newli.innerHTML = `Característica ${i + 1}`
                    newli.setAttribute('class', 'item')
                    
                    myul.append(newli)

                    const newInfor = document.createElement('p')
                    newInfor.innerHTML = `• ${Informacao}`
                    newInfor.style.display = 'none'

                    newli.append(newInfor)

                    newli.addEventListener('click', ()=> {
                        newli.style.transition = '0.5s'
                       
                        newli.classList.toggle('exibir')

                        if(newli.classList.contains('exibir')) {
                            newInfor.style.display = 'block'
                        } else{
                            newInfor.style.display = 'none'
                        }
                    })             
                }            
            }
        }
    } catch (error) {
        console.log(`Infelizmente Aconteceu ${error}`)
        console.log(error)

        let modal = document.querySelector('.modal')
        document.querySelector('.modal h1').innerHTML = `Infelizmente ocorreu um erro:(`;

        modal.classList.add('open')
    }
    
})
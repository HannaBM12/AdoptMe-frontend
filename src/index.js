
renderAllPets()

function renderAllPets(){
    fetch("http://localhost:3000/pets")
    .then(res => res.json())
    .then(petsArr => petsArr.forEach(pet => {
        renderOnePet(pet)
    }))
}


function renderOnePet(pet){
    console.log(pet)
    const img = document.createElement('img')
    img.src = pet.image
    img.alt = pet.name
    img.dataset.id = pet.id

    const divName = document.createElement('div')
    divName.id = "pet-info"
    divName.dataset.id = pet.id

    const nameH4 = document.createElement('h4')
    nameH4.textContent = pet.name
    const petDiv = document.querySelector('div.card')
    
    const contentDiv = document.querySelector('div.content')
    const breedPTag = document.createElement('p')
    breedPTag.textContent = pet.breed
    // contentDiv.appendChild(breedPTag)
    
    
    petDiv.append(img, divName, contentDiv)
    divName.append(nameH4, breedPTag)


}

const mainDiv = document.querySelector('div.card')
// console.log(mainDiv)

function addDetailInfoToDiv(info){
    const divName = document.querySelector('div#pet-info')
    const petDetailsPTag = document.createElement('p')
    petDetailsPTag.textContent = info
    divName.append('p')
}

mainDiv.addEventListener('click', event => {
    if (event.target.matches('div.card img')){
        fetch(`http://localhost:3000/pets/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(petObj => console.log(petObj))
    }
})



// mainDiv.addEventListener('click', event => {
//     if (event.target.matches('div.card img')){
//         // console.log(event.target)
//         fetch(`http://localhost:3000/pets/${event.target.dataset.id}`)
//         .then (resp => resp.json())
//         .then (data => {
//             detailPetInfo(data)
//         })
//     }
// })

// function detailPetInfo(data){
//     const divName = document.querySelector('div#pet-info')
//     const petDetailsPTag = document.createElement('p')
//     petDetailsPTag.textContent = data.bio

//     divName.append(petDetailsPTag)
// }






















// function renderOneCard(articleObj) {
//     const outerDiv = document.createElement('div')
//     outerDiv.classList.add('card')
//     outerDiv.dataset.id = articleObj.id
//     outerDiv.innerHTML = `<div class="img-container">
//         <img src="${articleObj.image}"
//             alt="${articleObj.title}" />
//         <div class="article-title-container">
//             <h4>${articleObj.title}</h4>
//         </div>
//     </div>
//     <div class="content">
//         <p class='author'>Author: ${articleObj.author}</p>
//         <div class="scroll">
//             <p class='description'>${articleObj.description}</p>
//         </div>
//         <p class="react-count">${articleObj.likes} likes</p>
//         <button class="like-button">♥️ Like</button>
//         <button class='delete-button'>X</button>
//     </div>`
//     const collectionDiv = document.querySelector('div#collection')
//     collectionDiv.append(outerDiv)
// }

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

    const divName = document.createElement('div')
    const nameH4 = document.createElement('h4')
    nameH4.textContent = pet.name
    const petDiv = document.querySelector('div.img-container')
    
    const contentDiv = document.querySelector('div.content')
    const breedPTag = document.createElement('p')
    breedPTag.textContent = pet.breed
    // contentDiv.appendChild(breedPTag)
    
    
    petDiv.append(img, divName, contentDiv)
    divName.append(nameH4, breedPTag)


}



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
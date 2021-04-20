
const mainDiv = document.querySelector('div#pets-display')
renderAllPetsImage()

function renderAllPetsImage(){
    fetch("http://localhost:3000/pets")
    .then(res => res.json())
    .then(petsArr => {
        detailPetInfo(petsArr[0])
        petsArr.forEach(renderOnePet)
    })
}


function renderOnePet(pet){
    const mainDiv = document.querySelector('div#pets-display')
    // console.log(pet)
    // console.log(mainDiv)
    
    const mainImg = document.createElement('img')
    mainImg.src = pet.image
    mainImg.alt = pet.name
    mainImg.dataset.id = pet.id

        
    mainDiv.append(mainImg)  
    
}


mainDiv.addEventListener('click', event => {
    
    if (event.target.matches('div#pets-display img')){
        fetch(`http://localhost:3000/pets/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(petObj => detailPetInfo(petObj))
    }
})


function detailPetInfo(petObj){
    console.log(petObj)
    const petDetailDiv = document.querySelector('div#pet-detail')
    petDetailDiv.dataset.id = petObj.id

    const imgDetail = document.querySelector('div#pet-detail img.detail-image')
    imgDetail.src = petObj.image
    imgDetail.alt = petObj.name

    const nameDetail = document.querySelector('div#pet-detail h2.name')
    nameDetail.textContent = petObj.name

    const breedDetail = document.querySelector('div#pet-detail h3.breed')
    breedDetail.textContent = petObj.breed

    const ageDetail = document.querySelector('div#pet-detail h2.age')
    ageDetail.textContent = `${petObj.age} Years`

    const bioDetail = document.querySelector('div#pet-detail p.bio')
    bioDetail.textContent = petObj.bio
    
    const isAdopted = document.querySelector('div#pet-detail h3.isAdopted')
        if(petObj.isAdopted === false){
            isAdopted.textContent = "Available for Adoption"
        }
        else {
            isAdopted.textContent = "Already Adopted"
        }
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

const mainDiv = document.querySelector('div#pets-display')
const shelterInfoBtn = document.querySelector('button.shelter-btn')
const adoptMeBtn = document.querySelector('button.adopt-btn')
const petDetailDiv = document.querySelector('div#pet-detail')
const petInfoDiv = document.querySelector('div#pet-detail-info')
// console.log(petInfoDiv)
// console.log(shelterInfoBtn) 

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
    // console.log(petObj)
    
    petDetailDiv.dataset.id = petObj.id

    const imgDetail = document.querySelector('div#pet-detail img.detail-image')
    imgDetail.src = petObj.image
    imgDetail.alt = petObj.name

    const nameDetail = document.querySelector('div#pet-detail h2.name')
    nameDetail.textContent = petObj.name

    const breedDetail = document.querySelector('div#pet-detail h3.breed')
    breedDetail.textContent = petObj.breed

    const ageDetail = document.querySelector('div#pet-detail-info h2.age')
    ageDetail.textContent = `${petObj.age} Years`

    const bioDetail = document.querySelector('div#pet-detail-info p.bio')
    bioDetail.textContent = petObj.bio
    
    const isAdopted = document.querySelector('div#pet-detail h3.isAdopted')
        if(petObj.isAdopted === false){
            isAdopted.textContent = "Available for Adoption"
        }
        else {
            isAdopted.textContent = "Already Adopted"
        }

    shelterInfoBtn.dataset.id = petObj.shelterId
    adoptMeBtn.dataset.id = petObj.id
    // console.log(adoptMeBtn)
    
}

//Adopt me button should have a similar functionality as the dark mode toggle from class

shelterInfoBtn.addEventListener('click', event => {
    // console.log(event.target)
    const idOfShelter = event.target.dataset.id
    console.log(idOfShelter)
    fetch(`http://localhost:3000/shelters/${idOfShelter}`)
    .then(resp => resp.json())
    .then(data => {
        const shelterInfoDiv = document.createElement('div')


        shelterInfoDiv.innerHTML = `
            <h2 class="shelter-name"> Shelter Name: ${data.name} </h2>
            <h3 class="shelter-location"> Shelter Location: ${data.location}</h3>
            <h3 class="shelter-description">Shelter Description: ${data.description}</h3>
            `
            petInfoDiv.append(shelterInfoDiv)
        // if (shelterInfoDiv.style.display = "block"){
        //     shelterInfoDiv.innerHTML = `
        //     <h2 class="shelter-name"> Shelter Name: ${data.name} </h2>
        //     <h3 class="shelter-location"> Shelter Location: ${data.location}</h3>
        //     <h3 class="shelter-description">Shelter Description: ${data.description}</h3>
        //     `
        //     petInfoDiv.append(shelterInfoDiv)
        // }
        // else {
        //     shelterInfoDiv.remove(data)
        // }
        // console.dir(shelterInfoDiv)
        
       
        
        
        
    })
   
})






















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
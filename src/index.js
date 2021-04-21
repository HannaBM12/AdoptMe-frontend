
const mainDiv = document.querySelector('div#pets-display')
const shelterInfoBtn = document.querySelector('button.shelter-btn')
const adoptMeBtn = document.querySelector('button.adopt-btn')
const petDetailDiv = document.querySelector('div#pet-detail')
const petInfoDiv = document.querySelector('div#pet-detail-info')
const loginForm = document.querySelector('form#login-form')
const prevDiv = document.querySelector('div#prev')
const nextDiv = document.querySelector('div#next')
const adoptionForm = document.querySelector('form#adoption-form')
adoptionForm.style.display = 'none'
const ownersIdInput = document.querySelector('form input#owner-id')
const ownerNameInput = document.querySelector('form input#owner-name')
const dogNameInput = document.querySelector('form input#dog-name')
const isAdopted = document.querySelector('div#pet-detail h3.isAdopted')
const shelterCommentForm = document.querySelector('form#comment-form')
shelterCommentForm.style.display = 'none'
const shelterInputId = document.querySelector('form input#shelter-id')
const commentDiv = document.querySelector('div#empty-comment-div')
console.log(commentDiv)


// console.log(shelterCommentForm)
// console.log(ownerNameInput)
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
    } else if (event.target === prevDiv) {
		mainDiv.scrollLeft -= 300
	} else if (event.target === nextDiv) {
		mainDiv.scrollLeft += 300
	}
})


function detailPetInfo(petObj){
    
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
    
        if(petObj.isAdopted === false){
            isAdopted.textContent = "Available for Adoption"
        }
        else {
            isAdopted.textContent = "Already Adopted"
        }

    shelterInfoBtn.dataset.id = petObj.shelterId
    adoptMeBtn.dataset.id = petObj.id
    adoptionForm.dataset.id = petObj.id
    let dogNameInput = document.querySelector('form input#dog-name')
    dogNameInput.value = petObj.name


    // let dogBreedInput = document.querySelector('form input#dog-breed')
    // dogBreedInput.value = petObj.breed

    // console.log(adoptMeBtn)
    
}

//Adopt me button should have a similar functionality as the dark mode toggle from class

shelterInfoBtn.addEventListener('click', event => {
    // console.log(event.target)
    const idOfShelter = event.target.dataset.id
    // console.log(idOfShelter)
    fetch(`http://localhost:3000/shelters/${idOfShelter}`)
    .then(resp => resp.json())
    .then(data => {

        // console.log(data)
        const shelterInfoDiv = document.createElement('div')
        shelterInfoDiv.id = "shelter-info-div"
        shelterInputId.dataset.id = data.id 

        
            shelterInfoDiv.innerHTML = `
                <h2 class="shelter-name"> Shelter Name: ${data.name} </h2>
                <h3 class="shelter-location"> Shelter Location: ${data.location}</h3>
                <h3 class="shelter-description">Shelter Description: ${data.description}</h3>
               
                `
                petInfoDiv.append(shelterInfoDiv)
        
    })
})

const navDiv = document.querySelector('div.nav-div')
navDiv.addEventListener('click', event =>{
    // console.log(e.target)
    if(event.target.matches('button#loginBtn')){
        renderLogin()
    } else if (event.target.matches('#logoutBtn')) {
		renderLoggedOut()
	} else if (event.target.matches('#signupBtn')) {
		renderSignUp()
	} else if (event.target.matches('#editUserBtn')) {
		renderEditUser()
	}
})

function renderLogin(){

    mainDiv.style.display = 'none'
    petDetailDiv.style.display = 'none'
    petInfoDiv.style.display = 'none'
    loginForm.style.display = ''
}

loginForm.addEventListener('submit', event =>{
    event.preventDefault()

    const emailInput = event.target.email.value
    // console.log(typeOf(emailInput))

    fetch('http://localhost:3000/owners')
    .then(res => res.json())
    .then(ownersArr => {
        const emailArr = []
        ownersArr.forEach(owner => {
            emailArr.push(owner.email)
        })
        
        if(emailArr.includes(emailInput)){
            mainDiv.style.display = ''
            petDetailDiv.style.display = ''
            petInfoDiv.style.display = ''
            loginForm.style.display = 'none'
            currentOwner = ownersArr.find(owner => owner.email === emailInput)
            ownerId = currentOwner.id 
            ownerName = currentOwner.name
            
            adoptMeBtn.dataset.id = ownerId
            ownerNameInput.value = ownerName
            ownersIdInput.dataset.id = ownerId
            shelterCommentForm.dataset.id = ownerId
            
             
        }
        else{
            alert("Email does not match an existing account. Please try again or sign up.")
                }
            }
    // loginForm.reset()
)})

petInfoDiv.addEventListener('click', event => {
    if (event.target.matches('button.adopt-btn')){
        adoptionForm.style.display = 'block'
    } else {
        adoptionForm.style.display = 'none'
    } 
})




adoptionForm.addEventListener('submit', event => {
    // console.log(event.target)
    event.preventDefault()
    
    const owner_id = ownersIdInput.dataset.id
    const pet_id = adoptionForm.dataset.id
    // console.log(petName)

    fetch(`http://localhost:3000/adoptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify ({owner_id, pet_id})
        
    })
        .then(resp => resp.json())
        .then(data => {
            updatePet(data)
        })
})

function updatePet(data){
    const id = data.petId

    is_adopted = true

    fetch(`http://localhost:3000/pets/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({is_adopted})
    })
    .then(res => res.json())
    .then(updatedPet => {
        console.log(updatedPet)
        isAdopted.textContent = 'Already Adopted'
    })
}

petInfoDiv.addEventListener('click', event => {
    // event.preventDefault()
    if (event.target.matches('button.shelter-btn')){
        shelterCommentForm.style.display = 'block'
    } 
    // else {
    //     shelterCommentForm.style.display = 'none'
    // } 
})

shelterCommentForm.addEventListener('submit', event => {
    // console.log(event.target)
    event.preventDefault()
    
    const owner_id = shelterCommentForm.dataset.id
    const shelter_id = shelterInputId.dataset.id
    const message = event.target.message.value 

    fetch(`http://localhost:3000/comments`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }, 
        body: JSON.stringify({owner_id, shelter_id, message})
    })
    .then(resp => resp.json())
    .then(shelterComments => {
        renderComments(shelterComments)
    })
    shelterCommentForm.reset()
})

function renderComments(shelterComments) {
    const commentUl = document.createElement('ul')
    commentUl.innerHTML = ""

    const commentList = document.createElement('li')
    commentList.textContent = shelterComments.message

    commentUl.append(commentList)
    commentDiv.append(commentUl)

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
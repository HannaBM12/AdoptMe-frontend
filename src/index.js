
let ownerId

const mainDiv = document.querySelector('div#pets-display')
const commentBtn = document.querySelector('button.comment-btn')
const adoptMeBtn = document.querySelector('button.adopt-btn')
const petDetailDiv = document.querySelector('div#pet-detail')
const petInfoDiv = document.querySelector('div#pet-detail-info')
const loginForm = document.querySelector('form#login-form')
const prevDiv = document.querySelector('div#prev')
console.log(prevDiv)
const nextDiv = document.querySelector('div#next')
const adoptionForm = document.querySelector('form#adoption-form')
adoptionForm.style.display = 'none'
const ownersIdInput = document.querySelector('form input#owner-id')
const ownerNameInput = document.querySelector('form input#owner-name')
const dogNameInput = document.querySelector('form input#dog-name')
const isAdopted = document.querySelector('div#pet-detail h3.isAdopted')
const commentForm = document.querySelector('form#comment-form')
commentForm.style.display = 'none'
const shelterInputId = document.querySelector('form input#shelter-id')
const commentDiv = document.querySelector('div#comments')
const updateCommentForm = document.querySelector('form#comment-update-form')
updateCommentForm.style.display = 'none'
// console.log(commentDiv)
// const petSelect = document.querySelector('select#pet-select')
const dogSelected = document.querySelector('#dog-selected')
const signupForm = document.querySelector('#signup-form')
const logOutBtn = document.querySelector('button#logoutBtn')
const loginBtn = document.querySelector('button#loginBtn')
const deleteUserBtn = document.querySelector('button#deleteUserBtn')
const signupBtn = document.querySelector('button#signupBtn')
const petSelect = document.querySelector('#pet-select')
// console.log(commentDiv)


// console.log(shelterCommentForm)
// console.log(ownerNameInput)
// console.log(shelterInfoBtn) 

renderAllPetsImage()

function renderAllPetsImage(){
    fetch("http://localhost:3000/pets")
    .then(res => res.json())
    .then(petsArr => {
        // console.log(petsArr)
        detailPetInfo(petsArr[0])
        petsArr.forEach(renderOnePet)
    })
}


function renderOnePet(pet){
    const mainDiv = document.querySelector('div#pets-display')
    const mainImg = document.createElement('img')
    mainImg.src = pet.image
    mainImg.alt = pet.animalType
    mainImg.dataset.id = pet.id
    
    mainDiv.append(mainImg)  
  
}


mainDiv.addEventListener('click', event => {
    
    if (event.target.matches('div#pets-display img')){
        // commentDiv.innerHTML = ""
        commentForm.style.display = 'none'
        updateCommentForm.style.display = 'none'

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
    
        if(petObj.isAdopted === false){
            isAdopted.textContent = "Available for Adoption"
        }
        else {
            isAdopted.textContent = "Already Adopted"
        }

    // shelterInfoBtn.dataset.id = petObj.shelterId
    adoptMeBtn.dataset.id = petObj.id
    adoptMeBtn.dataset.adopted = petObj.isAdopted
    adoptionForm.dataset.id = petObj.id
    let dogNameInput = document.querySelector('form input#dog-name')
    dogNameInput.value = petObj.name

    // console.log(adoptMeBtn)
    const shelterId = petObj.shelterId
    // console.log(shelterId)
    fetch(`http://localhost:3000/shelters/${shelterId}`)
    .then(resp => resp.json())
    .then(shelterData => {
       

    const shelterName = document.querySelector('div#shelter-info-div h2.shelter-name')
    shelterName.textContent = `Shelter Name: ${shelterData.name}`

    const shelterLocation = document.querySelector('div#shelter-info-div h3.shelter-location')
    shelterLocation.textContent = `Location: ${shelterData.location}`

    const shelterDescription = document.querySelector('div#shelter-info-div h3.shelter-description')
    shelterDescription.textContent = `Description: ${shelterData.description}`
    
    shelterInputId.dataset.id = shelterData.id 
    console.log(shelterData.comments)
    // commentDiv.style.display = 'block'
    // listComment.innerText = shelterData.comments.message
    // console.log(listComment)
    shelterData.comments.forEach(comment =>{
        // renderComments(comment)
        // commentUl.innerHTML = ''
        const commentUl= document.querySelector('ul.ul-list')
        commentUl.innerHTML = ''
        const listComment = document.createElement('li')
        listComment.textContent = comment.message
        commentUl.append(listComment)

        // console.log(comment.message)
    })
    // console.log(petObj)

    })
}

const navDiv = document.querySelector('div.nav-div')
navDiv.addEventListener('click', event =>{
    // console.log(e.target)
    if(event.target.matches('button#loginBtn')){
        renderLogin()
    } else if (event.target.matches('#logoutBtn')) {
		renderLoggedOut()
	} else if (event.target.matches('#signupBtn')) {
		renderSignUp()
	} else if (event.target.matches('#deleteUserBtn')) {
		renderDeleteUser()
	}
})

function renderLogin(){

    mainDiv.style.display = 'none'
    petDetailDiv.style.display = 'none'
    petInfoDiv.style.display = 'none'
    loginForm.style.display = ''
    logOutBtn.style.display = ''
    loginBtn.style.display = 'none'
    deleteUserBtn.style.display = ''
    signupForm.style.display = 'none'
    signupBtn.style.display = 'none'
    
    
    
}

function renderSignUp (){

    mainDiv.style.display = 'none'
    petDetailDiv.style.display = 'none'
    petInfoDiv.style.display = 'none'
    signupForm.style.display = ''
    deleteUserBtn.style.display = 'none'
}

function renderLoggedOut(){
    mainDiv.style.display = ''
    petDetailDiv.style.display = ''
    petInfoDiv.style.display = 'none'
    loginBtn.style.display = ''
    logOutBtn.style.display = 'none'
    deleteUserBtn.style.display = 'none'
    signupBtn.style.display = ''

    alert('Thank you for visiting us!!')

}

function renderDeleteUser(){
    mainDiv.style.display = ''
    petDetailDiv.style.display = ''
    petInfoDiv.style.display = 'none'
    loginBtn.style.display = ''
    logOutBtn.style.display = 'none'
    deleteUserBtn.style.display = ''
}

////signup still in progress 
signupForm.addEventListener('submit', event => {
    event.preventDefault()

    newOwnerObj = {
        email: event.target.email.value,
        name: event.target.name.value,
        location: event.target.location.value,
        age: parseInt(event.target.age.value)
    }
    // console.log(newOwnerObj)

    fetch('http://localhost:3000/owners', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newOwnerObj)
    })
        .then(resp => resp.json())
        // .then(data => console.log(data))
        alert('Thanks for Signing Up! Please login')
    signupForm.reset()

})

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
            
            adoptMeBtn.dataset.owner = ownerId
            ownerNameInput.value = ownerName
            ownersIdInput.dataset.id = ownerId
            commentForm.dataset.id = ownerId
            deleteUserBtn.dataset.id = ownerId 
            
             
        }
        else{
            alert("Email does not match an existing account. Please try again or sign up.")
                }
            }
    // loginForm.reset()
)})

// AdoptMe button - Post-Adoption table/ Patch-Pets table

adoptMeBtn.addEventListener('click', event => {
    console.log(adoptMeBtn.dataset.adopted)
         if(adoptMeBtn.dataset.adopted === true){
             alert('This pet is already adopted, please choose another pet!!')
            } 
        else {
            const owner_id = adoptMeBtn.dataset.owner
            const pet_id = adoptMeBtn.dataset.id
        
    
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
                    // console.log(data)
                    updatePet(data)
                })
        }
    
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
        // console.log(updatedPet)
        isAdopted.textContent = 'Already Adopted'
    })
}


// Comment button 

commentBtn.addEventListener('click', event => {
    // event.preventDefault()
    if (event.target.matches('button.comment-btn')){
        // commentDiv.innerHTML = ""
        commentForm.style.display = 'block'
    } 
    else {
        commentForm.style.display = 'none'
    } 
})

commentForm.addEventListener('submit', event => {
    console.log(event.target)
    event.preventDefault()
    
    const owner_id = commentForm.dataset.id
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
    .then(ownerComments => {
        renderComments(ownerComments)
    })
    commentForm.reset()
})

function renderComments(ownerComments) {
    console.log(ownerComments)
    const commentUl= document.querySelector('ul.ul-list')

    // const commentUl = document.createElement('ul')
    const commentList = document.createElement('li')
    commentList.textContent = ownerComments.message
    
    commentUl.append(commentList)
    // commentUl.innerHTML = ''
    commentDiv.append(commentUl)

    commentList.addEventListener('click', e=>{
        updateCommentForm.style.display = 'block'
        // const updateTextarea = updateCommentForm.querySelector('textarea')
        updateCommentForm.message.value = e.target.textContent
        
        updateCommentForm.addEventListener('submit', e=>{
            e.preventDefault()
            const message = e.target.message.value
            console.log(message)
    
            const id= ownerComments.id
            
            fetch(`http://localhost:3000/comments/${id}`,{
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
    
            }, 
            body: JSON.stringify({message})
                })
                .then(res => res.json())
                .then(updatedComment => {
                    commentList.textContent = updatedComment.message
                })
            updateCommentForm.reset() 
        })
    })

}

deleteUserBtn.addEventListener('click', event =>{
    const id = deleteUserBtn.dataset.id
    console.log(id)

    fetch(`http://localhost:3000/owners/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(deletedUser => console.log(deletedUser))
    alert("Your account has been deleted, please signUp!")
})


petSelect.addEventListener('change', e =>{
    let petType = e.target.value
    selectPets(petType)

    
})

function selectPets(petType){
    mainDiv.innerHTML = `
                <div id="prev">&#10094;</div>
                <div id="next">&#10095;</div>
    `
    mainDiv.addEventListener('click', event =>{
        if (event.target === prevDiv) {
            mainDiv.scrollLeft -= 1000
         } else if (event.target === nextDiv) {
            mainDiv.scrollLeft += 1000
        }
    })

    fetch('http://localhost:3000/pets')
    .then(res => res.json())
    .then(petsArr =>{
    
        const sortedPet = petsArr.filter(pet => pet.animalType === petType)
        if(sortedPet.length === 0){
            renderAllPetsImage()
        } else {

            sortedPet.forEach(pet => {
                // console.log(pet)
                renderOnePet(pet)
            })
        }
    
        
    })
          


}



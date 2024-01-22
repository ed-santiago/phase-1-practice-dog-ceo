console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

fetch(imgUrl)
.then((response) => {
  return response.json();
})
.then((object) => {
  object.message.forEach((element) => {
    const img = document.createElement("img")
    img.src = element
    img.alt = "random dog image"
    document.querySelector("#dog-image-container").append(img)
  })
})

fetch(breedUrl)
.then((response) => {
  return response.json();
})
.then((object) => {
  const breedDropDown = document.querySelector("#breed-dropdown")
  const ul = document.querySelector("#dog-breeds")
  const breeds = Object.keys(object.message)
  const dogsArray = []

  const arrayOfDogs = Object.entries(object.message)
  const filterOfDogs = arrayOfDogs.filter((element) => {
    return element[1].length > 0
  })

  for (const key in object.message) {
    const li = document.createElement("li")
    li.textContent = key
    li.id = key
    document.querySelector("#dog-breeds").append(li)

    const idOfDogs = document.querySelector(`#${key}`)
    dogsArray.push(idOfDogs)
  }

  for (const dog of dogsArray) {
    for (const dog2 of filterOfDogs) {
      if (dog.id === dog2[0]) {
        const ul = document.createElement("ul")
        dog.append(ul)

        for (const dog3 of dog2[1]) {
          const li2 = document.createElement("li")
          li2.textContent = dog3
          ul.append(li2)
        }
        
      }
    }
  }

  breedDropDown.addEventListener("change", (event) => {
    const letter = event.target.value
    const filteredBreeds = breeds.filter(breed => breed.startsWith(letter))
    ul.innerHTML = ''
    
    for (const element of filteredBreeds) {
      const li = document.createElement("li")
      li.textContent = element
      li.style.cursor = "pointer"
      li.addEventListener("click", () => {
        li.style.color = `rgb(${red()}, ${green()}, ${blue()})`
      })
      ul.append(li)
    }
  })
})

function randomInteger(max) {
  return Math.floor(Math.random()*(max + 1));
}

function red() {
  let r = randomInteger(255);
  return r
}

function green() {
  let g = randomInteger(255);
  return g
}

function blue() {
  let b = randomInteger(255);
  return b
}
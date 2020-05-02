const form = document.querySelector('form')
const input = document.querySelector('#searchTerm')
const resultsSection = document.querySelector('#results')
const watchLater = document.querySelector('#watch-later')

const API_URL = 'https://omdb-api.now.sh/?type=movie&s='

form.addEventListener('submit', formSubmitted)

async function formSubmitted(event) {
    event.preventDefault()

    const searchTerm = input.value

    try{
        const results = await getResults(searchTerm)
        showResults(results)
    } catch(error) {
        showError(error);
    }
}

async function getResults(searchTerm) {
    const url = `${API_URL}${searchTerm}`
    const response = await fetch(url)
    const data = await response.json()
    if(data.Error) {
        throw new Error(data.Error)
    }
    return data.Search
}

function showResults(results) {
    resultsSection.innerHTML = results.reduce((html, movie) => {
        return html + getMovie(movie, 4)
    }, '');

    const watchBtn = document.querySelectorAll('.watch-btn')

    watchBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            // console.log(button.dataset.id);
            const {id} = button.dataset  // id фільму
            console.log(id)
            const movie = results.find(movie => movie.imdbID === id)
            watchLater.innerHTML = watchLater.innerHTML + getMovie(movie,12,  false)
        })
    })
}

function getMovie(movie, cols, button = true) {
    return `
    <div class="card col-${cols}">
        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">${movie.Year}</p>
            ${
                button ? `<button data-id='${movie.imdbID}' type="button" class="btn btn-danger watch-btn">
            Watch Later
                </button>`
                : ''
            }
        </div>
    </div>
    `;
}


function showError(error) {
    resultsSection.innerHTML = `
    <div class="alert alert-danger" role="alert">
        ${error.message}
    </div>
    `
}

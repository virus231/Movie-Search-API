const form = document.querySelector('form')
const input = document.querySelector('#searchTerm')
const resultsSection = document.querySelector('#results')

const API_URL = 'https://omdb-api.now.sh/?type=movie&s='

form.addEventListener('submit', formSubmitted)

function formSubmitted(event) {
    event.preventDefault()

    const searchTerm = input.value
    getResults(searchTerm)
}

function getResults(searchTerm) {
    const url = `${API_URL}${searchTerm}`
    fetch(url)
        .then(response => response.json())
        .then(data => showResults(data.Search))

}

function showResults(results) {
    resultsSection.innerHTML = ''
    let html = ''
    results.forEach(movie => {
        html += `
        <div class="card col-3">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `
    });

    resultsSection.innerHTML = html
}
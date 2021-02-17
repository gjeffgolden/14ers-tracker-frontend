const mountainsURL = "http://localhost:3000/mountains"
const commentsURL = "http://localhost:3000/comments"

const queryParams = new URLSearchParams(window.location.search)
const mountainId = queryParams.get('mountain')
const userId = queryParams.get('user_id')

const $conditionsForm = document.querySelector('#conditions-form')
const $conditionsContainer = document.querySelector('#conditions-container')
const $commentsContainer = document.querySelector('#comments-container')
const $summitsNav = document.querySelector('#summits-nav')

$summitsNav.href = `/tracker.html?user_id=${userId}`

fetch(`${mountainsURL}/${mountainId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(mountain => {
        createCard(mountain)
    })

function createCard(mountain) {
    const $mountainContainer = document.querySelector('#mountain-container')
    const $mountainStats = document.querySelector('.stats')

    const $name = document.createElement('h1')
    const $elevation = document.createElement('li')
    const $rank = document.createElement('li')
    const $classRating = document.createElement('li')
    const $range = document.createElement('li')
    const $image = document.createElement('img')

    $image.src = `${mountain.image}`
    $name.textContent = mountain.name
    $elevation.textContent = mountain.elevation
    $rank.innerHTML = `Colorado Rank: ${mountain.rank} of 58`
    $classRating.innerHTML = `Class ${mountain.class_rating}`
    $range.innerHTML = `${mountain.range} Range`

    $mountainStats.append($range, $elevation, $rank, $classRating)

    $mountainContainer.prepend($name)
    $mountainContainer.append($image)
}

$conditionsForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const conditionsText = formData.get('conditions')

    console.log(conditionsText, mountainId)
    
    const newConditions = {
        conditions: conditionsText,
        mountain_id: mountainId,
        user_id: userId
    }

    fetch(commentsURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(newConditions)
    })
    .then(response => response.json())
    setTimeout(() => {window.location.reload()},20)
})

fetch(commentsURL, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(comments => {
        console.log(comments)
        comments["comments"].forEach(comment => {
            renderComment(comment)
        })
    })

function renderComment(comment) {
    if (comment.mountain_id == mountainId) {
        const $commentCard = document.createElement('div')
        let $p = document.createElement('p')

        $p.innerHTML = `<strong>${comment.user.username}:</strong> ${comment.conditions} <em>(${comment.created_at.slice(0,10)})</em>`

        $commentCard.prepend($p)
        $commentCard.className = 'comment-card'

        $commentsContainer.prepend($commentCard)
    }
}


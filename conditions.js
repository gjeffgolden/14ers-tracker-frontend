const mountainsURL = ('http://localhost:3000/mountains')

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('user_id')

const $front = document.querySelector('#front')
const $sawatch = document.querySelector('#sawatch')
const $elk = document.querySelector('#elk')
const $sangreDeCristo = document.querySelector('#sangre-de-cristo')
const $tenmileMosquito = document.querySelector('#tenmile-mosquito')
const $sanJuan = document.querySelector('#san-juan')

const $summitsNav = document.querySelector('#summits-nav')
const $conditionsNav = document.querySelector('#conditions-nav')

$summitsNav.href = `/tracker.html?user_id=${id}`
$conditionsNav.href = `/conditions.html?user_id=${id}`

fetch(mountainsURL, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(mountains => {
        mountains.forEach(mountain => {
            displayMountains(mountain)
        })
    })

function displayMountains(mountain) {
    const $cardSpan = document.createElement('span')
    const $name = document.createElement('h3')

    $name.innerText = mountain.name
    $cardSpan.id = mountain.id
    $name.id = mountain.id
    $cardSpan.className = 'conditions-card'
    $cardSpan.append($name)
    
    switch (mountain.range) {
        case 'Front': 
            $front.append($cardSpan)
        break
        case 'Sawatch':
            $sawatch.append($cardSpan)
        break
        case 'Elk':
            $elk.append($cardSpan)
        break
        case 'Tenmile-Mosquito': 
            $tenmileMosquito.append($cardSpan)
        break
        case 'San Juan':
            $sanJuan.append($cardSpan)
        break
        case 'Sangre de Cristo':
            $sangreDeCristo.append($cardSpan)
        break
        default: 
            null
    }
}

document.querySelector('#summits-container').addEventListener('click', (event) => {
    if (event.target.tagName == "SPAN" || event.target.tagName == "H3") {
        window.location.href = `/mountain.html?mountain=${event.target.id}&user_id=${id}`
    }
})

//banner image
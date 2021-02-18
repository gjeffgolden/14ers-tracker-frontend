const baseURL = 'http://localhost:3000'

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('user_id')

const $userContainer = document.querySelector('#user-container')
const $form = document.querySelector('form')
const $mountainDropdown = document.querySelector('#mountain-dropdown')
const $summitsNav = document.querySelector('#summits-nav')
const $conditionsNav = document.querySelector('#conditions-nav')
const $front = document.querySelector('#front')
const $sawatch = document.querySelector('#sawatch')
const $elk = document.querySelector('#elk')
const $sangreDeCristo = document.querySelector('#sangre-de-cristo')
const $tenmileMosquito = document.querySelector('#tenmile-mosquito')
const $sanJuan = document.querySelector('#san-juan')
const $summitsContainer = document.querySelector('#summits-container')

$summitsNav.href = `/tracker.html?user_id=${id}`
$conditionsNav.href = `/conditions.html?user_id=${id}`

fetch(`${baseURL}/users/${id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(user => {
        let $userList = document.querySelector('.stats')
        let $nameLi = document.createElement('li')
        let $hometownLi = document.createElement('li')
        let $ageLi = document.createElement('li')
        let $summitCountLi = document.createElement('li')
        let $h1 = document.createElement('h1')

        $h1.textContent = `${user["user"].username}'s 14er Registry`
        $nameLi.innerHTML = `<strong>Name:</strong> ${user["user"].first_name} ${user["user"].last_name}`
        $hometownLi.innerHTML = `<strong>Hometown</strong>: ${user["user"].hometown}`
        $ageLi.innerHTML = `<strong>Age:</strong> ${user["user"].age}`
        $summitCountLi.innerHTML = `<strong>14er Count:</strong> ${user["user"].summits.length}/58`
        
        $userContainer.prepend($h1)
        $userList.append($nameLi, $hometownLi, $ageLi, $summitCountLi)
        $userContainer.append($userList)
    })

fetch(`${baseURL}/mountains`, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(mountains => {
        mountains.forEach(mountain => {
            const $option = document.createElement('option')
            $option.textContent = mountain.name
            $option.value = mountain.id
            $mountainDropdown.append($option)
        })
    })

$form.addEventListener('submit', (event) => {
        event.preventDefault()
        const summitFormData = new FormData(event.target)
        const mountainID = summitFormData.get('id')

        const $newSummit = {
            user_id: id,
            mountain_id: mountainID
        }

        fetch(`${baseURL}/summits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify($newSummit)
        }).then(response => response.json())
})

fetch(`${baseURL}/summits`, {
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(summits => {
        summits["summits"].forEach(summit => {
            renderCards(summit)
        })
    })

function renderCards(summit) {
    if(summit.user_id == id) {
        const $cardDiv = document.createElement('div')
        const $name = document.createElement('h3')
        const $deleteSummitButton = document.createElement('button')

        $cardDiv.className = 'mountain-card'
        $name.innerHTML = `<a href="/mountain.html?mountain=${summit.mountain.id}&user_id=${id}">${summit.mountain.name}</a>`
        $deleteSummitButton.textContent = 'x'

        $deleteSummitButton.addEventListener('click', () => {
            let question = confirm("Are you sure you want to delete this peak?")
            if (question == true) {
                fetch(`${baseURL}/summits/${summit.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                .then(response => response.json())
                setTimeout(() => {window.location.reload()},10)
            }
        })

        $cardDiv.append($name, $deleteSummitButton)

        switch (summit.mountain.range) {
            case 'Front': 
                $front.append($cardDiv)
            break
            case 'Sawatch':
                $sawatch.append($cardDiv)
            break
            case 'Elk':
                $elk.append($cardDiv)
            break
            case 'Tenmile-Mosquito': 
                $tenmileMosquito.append($cardDiv)
            break
            case 'San Juan':
                $sanJuan.append($cardDiv)
            break
            case 'Sangre de Cristo':
                $sangreDeCristo.append($cardDiv)
            break
            default: 
                console.log('ooops')
        }
    }
}






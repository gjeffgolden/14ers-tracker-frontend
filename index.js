const usersURL = 'http://localhost:3000/users'
const loginURL = 'http://localhost:3000/login'
const $loginForm = document.querySelector('#login-form')

$loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        let token = data.token
        localStorage.setItem('token', token)
        window.location.replace(`/tracker.html?user_id=${data.user.id}`)
    })
})
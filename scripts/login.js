
const getUsers = () => {
    const usersJson = localStorage.getItem("users")
    return usersJson ? JSON.parse(usersJson) : []
}

const setAuth = ({username, password}) => {
    const credentials = `${username}:${password}`
    const basicToken = btoa(credentials)
    console.log(basicToken)
    localStorage.setItem("token", basicToken)
}

const userForm = {
    username: "",
    password: "",
}

const navigateToHome = () => {
    window.open("/home.html", "_self")
}

const navigateToRegister = () => {
    window.open("/register.html", "_self")
}

const handleChange = (field) => (event) => {
    const { value } = event.target
    console.log(field, value)

    userForm[field] = value 
} 

const handleLogin = () => {
    const { username, password } = userForm

    if (!username || !password) {
        alert("Informe todos os campos!")
        return
    }

    const users = getUsers()

    const userFound = users.find((u) => u.username == username)

    if (!userFound) {
        alert("Usuário não encontrado.")
        return
    }

    if (!userFound.password === password) {
        alert("Senha incorreta.")
        return
    }

    setAuth(userFound)

    alert("Login feito com sucesso!")

    navigateToHome()
}

document.getElementById("username").addEventListener("change", handleChange("username"))
document.getElementById("password").addEventListener("change", handleChange("password"))

document.querySelector("#login-button").addEventListener('click', (event) => {
    event.preventDefault()
    handleLogin()
})

document.querySelector("#register-button").addEventListener('click', (event) => {
    event.preventDefault()
    navigateToRegister()
})
const getUsers = () => {
    const usersJson = localStorage.getItem("users")
    return usersJson ? JSON.parse(usersJson) : []
}

const createuser = (user) => {
    const users = getUsers()
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
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
    confirmPassword: "",
}

const navigateToHome = () => {
    window.open("/home.html", "_self")
}

const handleChange = (field) => (event) => {
    const { value } = event.target
    console.log(field, value)

    userForm[field] = value 
} 

const handleCreateAccount = () => {
    const { username, password, confirmPassword } = userForm

    if (!username || !password || !confirmPassword) {
        alert("Informe todos os campos!")
        return
    }

    if (password !== confirmPassword) {
        alert("As senhas não conferem.")
        return
    }

    if (username.length < 6) {
        alert("O nome de usuário deve ter ao mínimo 6 caracteres.")
        return
    }

    if (password.length < 6) {
        alert("A senha deve ter ao mínimo 6 caracteres.")
        return
    }

    const users = getUsers()
    const usernames = users.map((u) => u.username)

    if (usernames.includes(username)) {
        alert("Nome de usuário já em uso.")
        return
    }

    const user = { username, password } 
    
    createuser(user)

    alert("Usuário criado com sucesso!")

    setAuth(user)

    navigateToHome()
}

document.getElementById("register-button").addEventListener('click', (event) => {
    event.preventDefault()
    handleCreateAccount()
})

document.getElementById("username").addEventListener("change", handleChange("username"))
document.getElementById("password").addEventListener("change", handleChange("password"))
document.getElementById("confirm-password").addEventListener("change", handleChange("confirmPassword"))


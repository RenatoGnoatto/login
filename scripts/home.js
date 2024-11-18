const getUserByUsername = (username) => {
    const usersJson = localStorage.getItem("users")
    const users = JSON.parse(usersJson)
    return users.find((u) => u.username === username)
}

const getAuth = () => {
    const token = localStorage.getItem("token")
    const [username, password] = atob(token).split(":")

    const userFound = getUserByUsername(username)
    
    if (!userFound || userFound.password !== password) {
        alert("Credenciais inválidas.")
        window.open("login.html", "_self")
    }

    return userFound
}

const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout feito com sucesso.")
    window.open("login.html", "_self")
}

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = getAuth()
    document.querySelector("h1").innerHTML = `Olá ${currentUser.username}, seja bem vindo(a)`
})

document.getElementById("logout-button").addEventListener("click", handleLogout)
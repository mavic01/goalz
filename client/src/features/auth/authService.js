import axios from 'axios'

const restUrl = "/api/users/"

//Register user 
const register = async (userData) => {
    const response = await axios.post(restUrl, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //cos u have to put strings in localStorage 
    }

    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(restUrl + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //cos u have to put strings in localStorage 
    }

    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem("user")
}



const authService = {
    register,
    logout,
    login
}

export default authService 
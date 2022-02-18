import axios from 'axios'

const API_URL = "/api/users/"

//Register user 
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //cos u have to put strings in localStorage 
    }

    return response.data
}

// //Logout user
// const logout = () => {
//     localStorage.removeItem("user")
// }

const authService = {
    register,
    // logout
}

export default authService 
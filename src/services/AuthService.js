import axios from "axios";

const API_URL = "https://localhost:5001/api/Login/authentication";


class AuthService {
  
  login(userName, Password) {
    return axios
      .post(API_URL, {
        userName,
        Password
      })
     
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.clear();
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
}
    getCurrentUser() {
        const userStr = localStorage.getItem("token");
        if (userStr) return JSON.parse(userStr);
    
        return null;
      }
     
     
  }
 
  

export default new AuthService();
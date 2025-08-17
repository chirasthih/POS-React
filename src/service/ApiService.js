import axios from "axios";
import CryptoJS from "crypto-js";

export default class ApiService {

    static BASE_URL = "http://localhost:5050/api";
    static ENCRYPTION_KEY = "chira-inventory";


    
    static encrypt(data) {
        return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY.toString());
    }

    
    static decrypt(data) {
        const bytes = CryptoJS.AES.decrypt(data, this.ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    
    static saveToken(token) {
        const encryptedToken = this.encrypt(token);
        localStorage.setItem("token", encryptedToken)
    }

    
    static getToken() {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;
        return this.decrypt(encryptedToken);
    }

    
    static saveRole(role) {
        const encryptedRole = this.encrypt(role);
        localStorage.setItem("role", encryptedRole)
    }

    
    static getRole() {
        const encryptedRole = localStorage.getItem("role");
        if (!encryptedRole) return null;
        return this.decrypt(encryptedRole);
    }

    static clearAuth() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }


    static getHeader() {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

   

    static async registerUser(registerData) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registerData)
        return response.data;
    }


    static async loginUser(loginData) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
        return response.data;
    }


    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    static async getLoggedInUsesInfo() {
        const response = await axios.get(`${this.BASE_URL}/users/current`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUserById(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async updateUser(userId, userData) {
        const response = await axios.put(`${this.BASE_URL}/users/update/${userId}`, userData, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/update/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }




    

    static async addItem(formData) {

        const response = await axios.post(`${this.BASE_URL}/items/add`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateItem(formData) {

        const response = await axios.put(`${this.BASE_URL}/items/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllItems() {
        const response = await axios.get(`${this.BASE_URL}/items/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getItemById(itemId) {
        const response = await axios.get(`${this.BASE_URL}/items/${itemId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async searchItem(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/items/search`, {
            params: { searchValue },
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteItem(itemId) {
        const response = await axios.delete(`${this.BASE_URL}/items/delete/${itemId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }



  
    static async createItemCategory(itemcategory) {
        const response = await axios.post(`${this.BASE_URL}/itemcategories/add`, itemcategory, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllItemCategory() {
        const response = await axios.get(`${this.BASE_URL}/itemcategories/all`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getItemCategoryById(itemcategoryId) {
        const response = await axios.get(`${this.BASE_URL}/itemcategories/${itemcategoryId}`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async updateItemCategory(itemcategoryId, itemcategoryData) {
        const response = await axios.put(`${this.BASE_URL}/itemcategories/update/${itemcategoryId}`, itemcategoryData, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async deleteItemCategory(itemcategoryId) {
        const response = await axios.delete(`${this.BASE_URL}/itemcategories/delete/${itemcategoryId}`, {
            headers: this.getHeader()
        })
        return response.data;
    }




    
    static logout(){
        this.clearAuth()
    }

    static isAuthenticated(){
        const token = this.getToken();
        return !!token;
    }

    static isAdmin(){
        const role = this.getRole();
        return role === "ADMIN";
    }

}
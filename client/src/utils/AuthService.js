import React, { useState } from 'react';
import decode from 'jwt-decode';
import axios from 'axios'; // HTTP 클라이언트 라이브러리
import constants from '../config/constants';

axios.defaults.baseURL = constants.apiUrl;

export default class AuthService extends React.Component {
    constructor() {
        super();
        this.domain = constants.apiUrl; // API server domain
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {
        console.log("login data: ", email, password)
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }
        const reqObj = {
            email: email,
            password: password
        };
        return axios.post(`${this.domain}login`, reqObj, headers)
            .then(res => {
                this.setToken(res.token); 
                return Promise.resolve(res);
        })
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }

    loggedIn() {
        const token = this.getToken(); 
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

}
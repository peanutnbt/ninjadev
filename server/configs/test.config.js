/**
 * Created by sonhh on 0029, April 09, 2018.
 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const SERVER_TEST = 'http://localhost:4000';

chai.use(chaiHttp);

const config = {}

config.request = (type, api) => {
    const chaiRequest = chai.request(SERVER_TEST)
    if (type === 'get') {
        return chaiRequest.get(api)
    }
    if (type === 'post') {
        return chaiRequest.post(api)
    }
    if (type === 'put') {
        return chaiRequest.put(api)
    }
    if (type === 'delete') {
        return chaiRequest.delete(api)
    }
}

config.expect = (data) => {
    return expect(data)
}
// ----------------------------------------------------
// let correctUser = 'test01';
// let correctUser2 = 'test02';
let correctUser = 'test01';
let correctUser2 = 'test02';
let correctPass = '123456';


config.SERVER_TEST = SERVER_TEST;

config.USER_TRUE = {
    id: 1,
    email: 'test.01@gmail.com',
    username: correctUser,
    password: correctPass
}

config.ACCOUNT_NOT_MAIL = {
    id: 4,
    username: 'AccNotMail',
    password: '123456'
}
config.ACCOUNT_USERNAME_SAME_FBID = {
    id: 5,
    username: 'fbaccount',
    password: '123456'
}
config.ACCOUNT_NOT_ACTIVE = {
    id: 6,
    username: 'AccNotActive',
    password: '123456'
}
config.ACCOUNT_BANNED = {
    id: 7,
    username: 'AccBanned',
    password: '123456'
}
config.USER_TRUE_2 = {
    id: 2,
    username: correctUser2,
    password: correctPass
}
config.USER_NOT_EXIST = {
    id: -1,
    username: 'blablabla',
    password: '123456'
}
config.USER_WITH_WRONG_PASS = {
    username: correctUser,
    password: 'whatever'
}
config.USER_NOT_EXIST_TEXT = {
    id: 'ASDF',
    username: 'blablabla',
    password: '123456'
}

config.USER_INVALID_NUMBER = {
    id: 123456789123456789123456789,
    username: 'blablabla',
    password: '123456'
}

config.USER_ADMIN = {
    id: 8,
    username: 'admin',
    password: '123456'
}


module.exports = config;
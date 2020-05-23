/**
 * Created by hoangdv on 0029, Jun, 29, 2017.
 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let express = require('express');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;
let testUser = require('../../configs/test.config');

const SERVER_TEST = 'http://localhost:4000';

chai.use(chaiHttp);
//Our parent block
describe('Authen Specs', () => {

    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });

    /*
     * Test the POST /login
     */

    describe('/Login', () => {

        describe('Login fail ', () => {

            it('Wrong password', (done) => {
                chai.request(SERVER_TEST)
                    .post('/login')
                    .set('Token', 'text/plain')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(testUser.USER_WITH_WRONG_PASS)
                    .end((err, res) => {
                        expect(err).to.be.a('null');
                        expect(res).not.to.be.a('null');
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('code');
                        expect(res.body.code).to.equal(13);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('WRONG_PASSWORD');
                        done();
                    });
            });

            it('Account not exist', (done) => {
                chai.request(SERVER_TEST)
                    .post('/login') 
                    .set('Token', 'text/plain')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(testUser.USER_WITH_WRONG_PASS)
                    .end((err, res) => {
                        expect(err).to.be.a('null');
                        expect(res).not.to.be.a('null');
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('code');
                        expect(res.body.code).to.equal(13);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('WRONG_PASSWORD');
                        done();
                    });
            });

        });

        it('Login success', (done) => {
            chai.request(SERVER_TEST)
                .post('/login') 
                .set('Token', 'text/plain')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser.USER_TRUE)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).not.to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).not.to.have.property('code');
                    expect(res.body).to.have.property('id');
                    done();
                });
        });

    });

});
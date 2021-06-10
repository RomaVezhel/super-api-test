import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = 'dd0cf3e32e432c3f28b4c907761794b6659f42e436b56ba4b3a79d90835efc72';

describe('Users', function () {
    let userId;

    describe('POST', function () {
        it('create user', function () {
            const data = {
                email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
                name: 'Test Name',
                gender: 'Male',
                status: 'Inactive'
            };

            return request
                .post('users')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    expect(res.body.data).to.deep.include(data);         // verified all data
                    userId = res.body.data.id;
                    console.log(res.body.data)

                })
        });

    })

    describe('GET', function () {
        it('user/ :id', function () {
            return request
                .get(`users/${userId}?access-token=${TOKEN}`)
                .then(function (res) {
                    expect(res.body.data.id).to.be.eq(userId);
                    console.log(res.body.data)
                });
        })

        it.skip('users with query param', function () {
            const URL = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`

            return request
                .get(URL)
                .then(function (res) {
                    expect(res.body.meta.pagination.page).to.eq(5);
                    // console.log(res.body.meta.pagination);

                    expect(res.body.data).to.not.be.empty;
                    res.body.data.forEach((data) => {
                        expect(data.gender).to.eq('Female');
                        expect(data.status).to.eq('Active');
                    })
                });
        })
    })

    describe('PUT', function () {
        it('PUT /users', function () {
            const data = {
                name: 'Test Name77',
            };

            return request
                .put(`users/${userId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    expect(res.body.data.name).to.eq(data.name);         // verified all data
                    console.log(res.body.data)
                })
        });

    })

    describe('DELETE', function () {
        it('DELETE /users/ :id', function () {
            return request
                .delete(`users/${userId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .then((res) => {
                    expect(res.body.data).to.eq(null)
                    console.log(res.body.data)
                })
        });
    })

});

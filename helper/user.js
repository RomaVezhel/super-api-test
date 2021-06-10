const supertest = require('supertest');
const request = supertest('https://gorest.co.in/public-api/');

export const createRandomUser = async () => {
    const data = {
        email: 'jmathews' + Math.floor(Math.random() * 99999) + '@mail.ca',
        name: 'John',
        status: 'Active',
        gender: 'Male',
    };
    const res = await request
        .post(`users`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);
    return res.body.data;
};
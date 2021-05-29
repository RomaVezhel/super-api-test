import supertest from 'supertest';
import {expect} from 'chai';


const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = 'dd0cf3e32e432c3f28b4c907761794b6659f42e436b56ba4b3a79d90835efc72';

describe('Users', function () {
    it.skip('GET /users', function () {    //done
        // request                                   // callback
        //     .get(`users?access-token=${TOKEN}`)
        //     .end(function (err, res) {
        //         expect(res.body.data).to.not.be.empty;
        //            done();
        //         console.log(err);
        //         console.log(res.body.data[0].id);

        return request
            .get(`users?access-token=${TOKEN}`)
            .then(function (res) {
                expect(res.body.data).to.not.be.empty;
            });
    });

    it.skip('GET /user/ :id', function () {
        return request
            .get(`users/2?access-token=${TOKEN}`)
            .then(function (res) {
                expect(res.body.data.id).to.be.eq(2);
            });
    })

    it('GET /user/ :id', function () {
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
});

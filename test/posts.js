/** async/await example */

import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = 'dd0cf3e32e432c3f28b4c907761794b6659f42e436b56ba4b3a79d90835efc72';

describe.only('User Posts', function () {
    let postId, userId;

    it('posts', async function () {
        const userData = {
            email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
            name: 'Test John',
            gender: 'Male',
            status: 'Inactive'
        };

        return request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(userData)
            .then(async (res) => {
                expect(res.body.data).to.deep.include(userData);         // verified all data
                userId = res.body.data.id;
                console.log(res.body.data)

                const data = {
                    user_id: userId,
                    title: 'My title',
                    body: 'My blog post'
                };

                const postRes = await request
                    .post('posts')
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .send(data);

                console.log(postRes.body);
                expect(postRes.body.data).to.deep.include(data);
                postId = postRes.body.data.id;
            })
    });

    it('GET /posts/:id', async function () {
        await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);
    });
})
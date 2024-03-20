
import request from "supertest";
import { AppDataSource } from "../database/db.js";
import { app } from '../app.js'

let server: any;
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVjNzMzZjk3YTkxNmIxZWM3YjE2ZWIiLCJyb2xlTmFtZSI6ImFkbWluIiwiaWF0IjoxNzEwMDA5OTAzLCJleHAiOjE3MTA3Mjk5MDN9.2rjIUlELJhkkzn-Gaj5elicN6vek20vFL3Z4LjPnERw";

beforeAll(async () => {
    await AppDataSource.initialize()

    server = app.listen(4002);
})

afterAll(async () => {
    try {
        if (server) {
            await server.close();
            console.log('Server closed');
        }

        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error closing server and destroying database connection:', error);
        throw error;
    }
})


describe('Api healthy', () => {
    test('Server is healthy', async () => {
        const { status, body } = await request(server)
            .get('/healthy')

        expect(status).toBe(200)
        expect(body.success).toBe(true);
        expect(body.message).toBe("Server is healthy");
    })
})


describe('Api Auth', () => {
    test('Register user without password', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/register')
            .send(
                {
                    firstName: "Marina",
                    lastName: "Escrivá",
                    email: "marina@marina.com",
                    password: ""
                }
            )
        expect(status).toBe(400)
    })

    test('Register user without email', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/register')
            .send(
                {
                    firstName: "Marina",
                    lastName: "Escrivá",
                    email: "",
                    password: "123456"
                }
            )
        expect(status).toBe(400)
    })

    // test('Register user', async () => {
    //     const { status, body } = await request(server)
    //         .post('/api/auth/register')
    //         .send(
    //             {
    //                 first_name: "Sergio",
    //                 last_name: "Torres",
    //                 email: "sergio@gmail.com",
    //                 password: "123456"
    //             }
    //         )
    //     expect(status).toBe(201)
    // })



    test('Login user successfully', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/login')
            .send(
                {
                    email: "sergio@torres.com",
                    password: "123456"
                }
            )
        console.log("respuesta: ", body, status);
        // expect(status).toBe(200)

    })


    test('Update User', async () => {
        const { status, body } = await request(server)
            .put('/api/users/self')
            .send(
                {
                    first_name: "Sergio",
                    last_name: "Torresito",
                    email: "sergio@torres.com",
                    password: "123456"
                }
            )
            .set('Authorization', `Bearer ${token}`)
        console.log("respuesta: ", body, status);
        // expect(status).toBe(200)
    })


})






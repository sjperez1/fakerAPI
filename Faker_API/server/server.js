const {faker} = require("@faker-js/faker")
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

class User {
    constructor(){
        this.password = faker.internet.password();
        this.email = faker.internet.email();
        this.phoneNumber = faker.phone.number();
        this.lastName = faker.name.lastName();
        this.firstName = faker.name.firstName();
        this._id = faker.database.mongodbObjectId();
    }
}

class Company {
    constructor(){
        this._id = faker.database.mongodbObjectId()
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.street(),
            city : faker.address.city(),
            state : faker.address.state(),
            zipCode : faker.address.zipCode(),
            country : faker.address.country()
        }
    }
}

// In postman, navigate to these routes and click "body" in both places.
app.get("/api/users/new", (req, res) => {
    const newUser = new User()
    res.json(newUser)
})

app.get("/api/companies/new", (req, res) => {
    const newCompany = new Company()
    res.json(newCompany)
})

app.get("/api/user/company", (req, res) => {
    res.json({
        company : new Company(),
        user : new User()
    })
})

app.listen(8000, ()=>console.log("Listening to port : 8000")) 

import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";

//number of fake users we want to populate DB with
let num_users = 20;

// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    // we hardcode a hashed password we already know 
    user.passwordHash = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456

    return user;
}


const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // hardcoded superadmin
        const superadmin = new User();
        superadmin.firstName = "Super";
        superadmin.lastName = "Super";
        superadmin.email = "super@super.com";
        superadmin.passwordHash = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456
        superadmin.role = new Role();
        superadmin.role.id = 3;
        superadmin.save();

        // hardcoded superadmin
        const admin = new User();
        admin.firstName = "Admin";
        admin.lastName = "Admin";
        admin.email = "admin@admin.com";
        admin.passwordHash = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456
        admin.role = new Role();
        admin.role.id = 2;
        admin.save();

        // fake users (with role_id = 1 by default)
        const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers);
        await User.save(fakeUsers);

        console.log("Users saved correctly");

    } catch (error) {

        console.log(error);

    } finally {

        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

userSeedDatabase()


import { Role } from "../../models/Role";
import { AppDataSource } from "../db";


// Roles hardcoded, there are only 3 types. 
// In the model, user_id = 1 by default ('user')
const roleSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const roleUser = new Role();
        roleUser.name = "user"
        await roleUser.save();

        const roleAdmin = new Role();
        roleAdmin.name = "admin"
        await roleAdmin.save();

        const roleSuper = new Role();
        roleSuper.name = "superadmin"
        await roleSuper.save();

        console.log("Roles saved correctly");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

roleSeedDatabase()

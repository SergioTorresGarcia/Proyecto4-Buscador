
import bcrypt from "bcrypt";

import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { Service } from "../../models/Service";
import { Appointment } from "../../models/Appointment";
import dayjs from "dayjs"
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";


// Variables (double check number of users and services)
// number of fake users and appointments we want to populate DB with
let num_appointments = 100;
// hardcoded seed - in case of adding more services, this need to be changed by hand to adjust "generateFakeAppointments" in seeder)
let num_services = 5;
//number of fake users we want to populate DB with
let num_users = 20;

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

        console.log("---------------------");
        console.log("Roles saved correctly");
        console.log("---------------------");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create false users to populate DB (with Faker)
const birthday = dayjs(faker.date.between({ from: '1950-01-01', to: '2006-01-01' })).format("YYYY-MM-DD")
const generateFakeUsers = () => {
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.birthDate = birthday
    user.email = faker.internet.email();
    user.passwordHash = bcrypt.hashSync("Aa123456", 8)

    return user;
}


const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // hardcoded superadmin
        const superadmin = new User();
        superadmin.firstName = "Superadmin";
        superadmin.lastName = "Superadmin";
        superadmin.birthDate = "1983-11-28";
        superadmin.email = "super@super.com";
        superadmin.passwordHash = bcrypt.hashSync("Aa123456", 8)  // Aa123456
        superadmin.role = new Role();
        superadmin.role.id = 3;
        superadmin.save();

        // hardcoded admin
        const admin = new User();
        admin.firstName = "Admin";
        admin.lastName = "Admin";
        admin.birthDate = "1985-04-07";
        admin.email = "admin@admin.com";
        admin.passwordHash = bcrypt.hashSync("Aa123456", 8) // 123456
        admin.role = new Role();
        admin.role.id = 2;
        admin.save();

        // hardcoded user
        const user = new User();
        user.firstName = "User";
        user.lastName = "User";
        user.birthDate = "1986-12-29";
        user.email = "user@user.com";
        user.passwordHash = bcrypt.hashSync("Aa123456", 8) // 123456
        user.role = new Role();
        user.role.id = 1;
        user.save();

        // fake users (with role_id = 1 by default)
        const fakeUsers = Array.from({ length: num_users - 3 }, generateFakeUsers);
        await User.save(fakeUsers);

        console.log("---------------------");
        console.log("Users saved correctly");
        console.log("---------------------");

    } catch (error) {

        console.log(error);

    } finally {

        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create fake services (5 hardcoded examples - already given in the exercise)
const serviceSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // service number 1
        const service1 = new Service();
        service1.serviceName = "Tatuajes personalizados"
        service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        await service1.save();

        // service number 2
        const service2 = new Service();
        service2.serviceName = "Tatuajes del catálogo"
        service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
        await service2.save();

        // service number 3
        const service3 = new Service();
        service3.serviceName = "Restauración y rejuvenecimiento de trabajos"
        service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
        await service3.save();

        // service number 4
        const service4 = new Service();
        service4.serviceName = "Colocación de piercings y dilatadores"
        service4.description = "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
        await service4.save();

        // service number 5
        const service5 = new Service();
        service5.serviceName = "Venta de piercings y otros artículos"
        service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
        await service5.save();

        console.log("------------------------");
        console.log("Services saved correctly");
        console.log("------------------------");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create appointments (choosing random number in the range of the users and services variables declared above)
const generateFakeAppointments = () => {
    const appointment = new Appointment();
    appointment.appointmentDate = faker.date.future();

    let randomUser = Math.floor(Math.random() * num_users + 1)
    appointment.userId = randomUser;

    let randomService = Math.floor(Math.random() * num_services + 1)
    appointment.serviceId = randomService;

    return appointment;
}


const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const fakeAppointments = Array.from({ length: num_appointments }, generateFakeAppointments);
        await Appointment.save(fakeAppointments);

        console.log("----------------------------");
        console.log("Appointments saved correctly");
        console.log("----------------------------");

    } catch (error) {

        console.log(error);

    } finally {

        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


const startSeeders = async () => {
    // await roleSeedDatabase()
    // await userSeedDatabase()
    // await serviceSeedDatabase()
    await appointmentSeedDatabase()
}

startSeeders();

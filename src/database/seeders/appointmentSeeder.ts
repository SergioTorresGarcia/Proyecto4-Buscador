
import { Appointment } from "../../models/Appointment";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";

// Variables (double check number of users and services)
// number of fake users and appointments we want to populate DB with
// roles and services are hardcoded
let num_users = 20;
let num_appointments = 100;
// hardcoded seed - in case of adding more services, this need to be changed by hand to adjust "generateFakeAppointments" in seeder)
let num_services = 5;

// create appointments (choosing random number in the range of the users and services variables declared above)
const generateFakeAppointments = () => {
    const appointment = new Appointment();
    appointment.appointmentDate = faker.date.future();

    let randomUser = Math.floor(Math.random() * num_users + 1)
    appointment.userId = randomUser.toString();

    let randomService = Math.floor(Math.random() * num_services + 1)
    appointment.serviceId = randomService.toString();

    return appointment;
}


const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const fakeAppointments = Array.from({ length: num_appointments }, generateFakeAppointments);
        await Appointment.save(fakeAppointments);

        console.log("Appointments saved correctly");

    } catch (error) {

        console.log(error);

    } finally {

        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

appointmentSeedDatabase();

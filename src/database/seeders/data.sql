USE project4;

-- populate DB with roles (user (default), admin & superadmin):
INSERT INTO roles (id, name) VALUES (1, 'user');
INSERT INTO roles (id, name) VALUES (2, 'admin');
INSERT INTO roles (id, name) VALUES (3, 'superadmin');


-- populate DB with users:
INSERT INTO users (first_name, last_name, email, password_hash, role_id) 
VALUES ("user", "user", "user@user.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (first_name, last_name, email, password_hash, role_id)
VALUES ("admin", "admin", "admin@admin.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "2");

INSERT INTO users (first_name, last_name, email, password_hash, role_id)
VALUES ("super", "super", "super@super.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "3");

INSERT INTO users (first_name, last_name, email, password_hash, role_id) 
VALUES ("user2", "user2", "user2@user.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (first_name, last_name, email, password_hash, role_id) 
VALUES ("user3", "user3", "user3@user.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (first_name, last_name, email, password_hash, role_id) 
VALUES ("user4", "user4", "user4@user.es", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

-- populate DB with services:
INSERT INTO services (service_name, description)
VALUES ("Tatuajes personalizados", "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos.");

INSERT INTO services (service_name, description)
VALUES ("Tatuajes del catálogo", "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro
catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas.");

INSERT INTO services (service_name, description)
VALUES ("Restauración y rejuvenecimiento de trabajos", "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad.");

INSERT INTO services (service_name, description)
VALUES ("Colocación de piercings y dilatadores", "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes.");

INSERT INTO services (service_name, description)
VALUES ("Venta de piercings y otros artículos", "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único.");


-- populate DB with appointments:
INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("1", "2024-03-05", "1", "1");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("2", "2024-03-05", "4", "4");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("3", "2024-03-05", "5", "5");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("4", "2024-03-05", "6", "2");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("5", "2024-03-06", "5", "3");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("6", "2024-03-07", "6", "2");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("7", "2024-03-08", "4", "5");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("8", "2024-03-08", "1", "3");

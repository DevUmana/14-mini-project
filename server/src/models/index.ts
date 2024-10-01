import sequelize from '../config/connection.js';
import { VolunteerFactory } from './volunteer.js';
import { WorkFactory } from './work.js';


// TODO: Create a One-to-Many relationship (Volunteer can have numerous volunteer works)

// Initialize the models
const Volunteer = VolunteerFactory(sequelize);
const Work = WorkFactory(sequelize);

// Create the One-to-Many relationship (Volunteer can have numerous volunteer works)
Volunteer.hasMany(Work, {
    foreignKey: 'assignedVolunteerId',
    onDelete: 'CASCADE',
    as: 'works',
});

// Create the One-to-Many relationship (Volunteer can have numerous volunteer works)
Work.belongsTo(Volunteer, {
    foreignKey: 'assignedVolunteerId',
    as: 'assignedVolunteer',
});

export { Volunteer, Work };

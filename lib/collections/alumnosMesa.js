import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const AlumnosMesa = new SimpleSchema({
    _id: { type: String }, //es el ID del alumno	
	nombreApellido: {type: String},
    dni: {type: String},
    email: {type: String},
});

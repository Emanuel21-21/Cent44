import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const AlumnosMesa = new SimpleSchema({
    _id: { type: String }, //es el ID del alumno	
	nombreApellido: {type: String},
    dni: {type: String},
    email: {type: String},
    nota: {type: Number,optional: true},
    estado: {type: Boolean,optional: true}, ///si es true es presente y si es false es ausente
});
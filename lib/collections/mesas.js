import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';
import { AlumnosMesa } from './alumnosMesa';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Mesas = new Mongo.Collection('mesas');

export const MesasIndex = new EasySearch.Index({
	collection: Mesas,
	fields: ['nombreMateria','nombreCarrera','nombreLlamado','numeroLlamado'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

Mesas.attachSchema(new SimpleSchema({
	
	idLlamado: {type: String},
	nombreLlamado: {type: String},
	numeroLlamado: {type: String},
	fechaDesde: { type: Date},
	fechaHasta: { type: Date},	
	
	idMateria: {type: String},
	nombreMateria: {type: String},

	idCarrera: {type: String},
	nombreCarrera: {type: String},	

	idPresidente: {type: String},
	nombrePresidente: {type: String},
	idVocal1: {type: String},
	nombreVocal1: {type: String},
	idVocal2: {type: String},
	nombreVocal2: {type: String},
	
	//Tenemos que guardar una coleccion de alumnos
	alumnosMesa: { type: Array, optional: true, 
		autoform: {type: "hidden"}   
	},
	'alumnosMesa.$': AlumnosMesa,

	estado: {type: String, label: 'Estado', optional: true,
		autoform: {	type: "hidden"}
	},

	descripcion:{ type: String, label: 'Descripción del llamado', optional: true, 		
		autoform:{ type: "textarea", row: 10, class: "textarea"	}
	},

	owner:{	type: String, label: "Propietario",
		autoValue() {return this.userId	},
		autoform: {	type: "hidden"}
	},
	created: { type: Date,
			autoValue() {return new Date()},
		autoform: {	type: "hidden"}
	},
	
}));

Mesas.allow({
	insert: function () { return true; },
	update: function () { return true; },
	remove: function () { return true; }
  });

Meteor.methods({
    'mesas.removeAlumno'(memberID, subID) {
        //console.log("MemberID: " + memberID + " | " + "SubID: " + subID);
        Mesas.update(
            {_id: memberID},
            {$pull:{alumnosMesa: {_id: subID}}}, {getAutoValues: false});
    }
});

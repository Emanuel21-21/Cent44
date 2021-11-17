import { Materias } from '../../../lib/collections/materias';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Llamados } from '../../../lib/collections/llamados';
import { Mesas } from '../../../lib/collections/mesas';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.mesasProfesor.onCreated(function(){ 
	this.selMesaInfo = new ReactiveVar(null);
});

Template.mesasProfesor.helpers({
	formCollection() {
		return Materias;
	},
	formCollection() {
		return Llamados;
	},
	formCollection() {
		return Docentes;
	},
	
	mesaInfo: function() {     
		return Template.instance().selMesaInfo.get();        
	  },   
})

Template.mesasProfesor.events({  

	'click .modalMesaInfo': function(event, template){   
		var mesa = Mesas.findOne({"_id":this._id});      
		Template.instance().selMesaInfo.set(mesa);
		$('#modalMesaInfo').modal('show');
	},  

    
});


Template.mesasProfesor.onRendered(function() {

	Meteor.typeahead.inject();
});
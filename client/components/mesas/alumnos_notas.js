import { Materias } from '../../../lib/collections/materias';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Llamados } from '../../../lib/collections/llamados';
import { Mesas } from '../../../lib/collections/mesas';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.alumnosNotas.onCreated(function(){    
  this.selLlamado = new ReactiveVar(null);
  this.selMateria = new ReactiveVar(null);  

  this.selPresidente = new ReactiveVar(null);
  this.selVocal1 = new ReactiveVar(null);
  this.selVocal2 = new ReactiveVar(null);
});

Template.alumnosNotas.helpers({
	formCollection() {
		return Materias;
	},
	formCollection() {
		return Llamados;
	},
	formCollection() {
		return Docentes;
	},
	
	selecLlamado: function(event, suggestion, datasetName) {
		Template.instance().selLlamado.set(suggestion.id);  		
	},
	llamados1: function() {     
		return Llamados.find().fetch().map(function(object){ return {id: object._id, value: object.numeroNombre}; });    
	},

	selecMateria: function(event, suggestion, datasetName) {
		Template.instance().selMateria.set(suggestion.id);  		
	},
	materias1: function() {     
		return Materias.find().fetch().map(function(object){ return {id: object._id, value: object.materiaCarrera}; });    
	},
	
	selecPresidente: function(event, suggestion, datasetName) {
		Template.instance().selPresidente.set(suggestion.id);  		
	},
	selecVocal1: function(event, suggestion, datasetName) {
		Template.instance().selVocal1.set(suggestion.id);  		
	},
	selecVocal2: function(event, suggestion, datasetName) {
		Template.instance().selVocal2.set(suggestion.id);  		
	},

	docentes1: function() {     
		return Docentes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
	},
})

Template.alumnosNotas.events({  

    'submit #formMesa':function(event) {
	    // Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;			
		var ingresoLlamado = null;
		var ingresoMateria = null;
		var ingresoPresidente = null;
		var ingresoVocal1 = null;
		var ingresoVocal2 = null;	
		var ingresoDescripcion = null;
		var ingresoMesa = null;			
		
		ingresoLlamado = Template.instance().selLlamado.get();
		ingresoMateria = Template.instance().selMateria.get();
		

		ingresoPresidente = Template.instance().selPresidente.get(); 	
		ingresoVocal1 = Template.instance().selVocal1.get(); 	
		ingresoVocal2 = Template.instance().selVocal2.get(); 			
		
		if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};					

		var idLlamado;	
		var nombreLlamado;
		var numeroLlamado;
		var llamadoSeleccionado = Llamados.findOne({"_id":ingresoLlamado});
		if (llamadoSeleccionado){
			idLlamado = llamadoSeleccionado._id;
			nombreLlamado = llamadoSeleccionado.nombre;
			numeroLlamado = llamadoSeleccionado.numero;			
		}  

		var idCarrera;	
		var nombreCarrera;	
		var idMateria;			
		var nombreMateria;		
		
		var materiaSeleccionada = Materias.findOne({"_id":ingresoMateria});//obtengo la Carrera seleccionada (objeto)     		
		if (materiaSeleccionada){		
			
			idMateria = materiaSeleccionada._id;	
			nombreMateria = materiaSeleccionada.nombre;	

			idCarrera = materiaSeleccionada.idCarrera;	
			nombreCarrera = materiaSeleccionada.nombreCarrera;
		} 

		var idPresidente;		
		var nombrePresidente;
		var dniPresidente;
		var presidenteSeleccionada = Docentes.findOne({"_id":ingresoPresidente});//obtengo el docente seleccionado (objeto)     
		if (presidenteSeleccionada){
			idPresidente = presidenteSeleccionada._id;			
			nombrePresidente = presidenteSeleccionada.nombreApellido;
			dniPresidente = presidenteSeleccionada.dni;
		} 
		
		var idVocal1;		
		var nombreVocal1;
		var dniVocal1;
		var vocal1Seleccionada = Docentes.findOne({"_id":ingresoVocal1});//obtengo el docente seleccionado (objeto)     
		if (vocal1Seleccionada){
			idVocal1 = vocal1Seleccionada._id;			
			nombreVocal1 = vocal1Seleccionada.nombreApellido;
			dniVocal1 = vocal1Seleccionada.dni;
		}

		var idVocal2;		
		var nombreVocal2;
		var dniVocal2;
		var vocal2Seleccionada = Docentes.findOne({"_id":ingresoVocal2});//obtengo el docente seleccionado (objeto)     
		if (vocal2Seleccionada){
			idVocal2 = vocal2Seleccionada._id;			
			nombreVocal2 = vocal2Seleccionada.nombreApellido;
			dniVocal2 = vocal2Seleccionada.dni;
		}

		
	  	
		Mesas.insert({	
			

			idLlamado:idLlamado, 
			nombreLlamado:nombreLlamado,
			numeroLlamado:numeroLlamado,
					
			idMateria:idMateria,	
			nombreMateria:nombreMateria,
			
			idCarrera:idCarrera,	
			nombreCarrera:nombreCarrera,
			
			idPresidente:idPresidente,			
			nombrePresidente:nombrePresidente,

			idVocal1:idVocal1,
			nombreVocal1:nombreVocal1,

			idVocal2:idVocal2,
			nombreVocal2:nombreVocal2,			
					
		});
			
	    Router.go('/mesas');
		}
});


Template.alumnosNotas.onRendered(function() {

	Meteor.typeahead.inject();
});
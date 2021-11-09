import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Materias } from '../../../lib/collections/materias';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Mesas } from '../../../lib/collections/mesas';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.mesasAlumno.onCreated(function(){       
  this.selMateriaInfo = new ReactiveVar(null);  
  this.selMateriaEditar = new ReactiveVar(null);
  this.selCarrera2 = new ReactiveVar(null);
  this.selDocente2 = new ReactiveVar(null);
  this.selMesaInfo = new ReactiveVar(null);
});

Template.mesasAlumno.helpers({
  	searchAttributes() {
    	return {
      		placeholder: 'Buscar ...',
    	};
  	},

  	materiaInfo: function() {     
    	return Template.instance().selMateriaInfo.get();        
  	},    

  	materiaEditar: function() {     
    	return Template.instance().selMateriaEditar.get();        
  	},
    
    selecCarrera: function(event, suggestion, datasetName) {
      Template.instance().selCarrera2.set(suggestion.id);        
    },
    carreras1: function() {     
      return Carreras.find().fetch().map(function(object){ return {id: object._id, value: object.nombre}; });    
    },


    selecDocente: function(event, suggestion, datasetName) {
      Template.instance().selDocente2.set(suggestion.id);      },

    docentes1: function() {     
      return Docentes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
    },

    mesaInfo: function() {     
      return Template.instance().selMesaInfo.get();        
    },
});


Template.mesasAlumno.events({
	

  	'click .modalMateriaInfo': function(event, template){   
  		var materia = Materias.findOne({"_id":this._id});            
  		Template.instance().selMateriaInfo.set(materia);      
  		$('#modalMateriaInfo').modal('show');
    },    

    'click .modalMateriaEditar': function(event, template){   
      var materia = Materias.findOne({"_id":this._id});      
      Template.instance().selMateriaEditar.set(materia);
      $('#modalMateriaEditar').modal('show');
    }, 
    'click .modalMesaInfo': function(event, template){   
      var mesa = Mesas.findOne({"_id":this._id});      
      Template.instance().selMesaInfo.set(mesa);
      $('#modalMesaInfo').modal('show');
      },  

    'submit #formModificarMateria':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;  

      if (target.nombre.value){var ingresoNombre = target.nombre.value};      
      ingresoCarrera = Template.instance().selCarrera2.get();      
      ingresoDocente = Template.instance().selDocente2.get();            
      if (target.descripcion.value){var ingresoDescripcion = target.descripcion.value};        

      
      var idCarrera;
      var nombreCarrera;
      var carreraSeleccionada = Carreras.findOne({"_id":ingresoCarrera});//obtengo la Carrera seleccionada (objeto)     
      if (carreraSeleccionada){
        idCarrera = carreraSeleccionada._id; 
        nombreCarrera = carreraSeleccionada.nombre;
      }

      var idDocente;
      var nombreDocente;
      var dniDocente;
      var docenteSeleccionada = Docentes.findOne({"_id":ingresoDocente});//obtengo el Docente seleccionado (objeto)     
      if (docenteSeleccionada){
        idDocente = docenteSeleccionada._id; 
        nombreDocente = docenteSeleccionada.nombreApellido;
        dniDocente = docenteSeleccionada.dni;
      }

      var materia = Template.instance().selMateriaEditar.get();

      Materias.update({_id:materia._id},{$set: {
        nombre:ingresoNombre,         
        idCarrera:idCarrera,
        nombreCarrera:nombreCarrera,
        idDocente:idDocente,
        nombreDocente:nombreDocente,
        dniDocente:dniDocente,
        descripcion:ingresoDescripcion,        
      }});

      $('#modalMateriaEditar').modal('hide'); //CIERRO LA VENTANA MODAL      
  },
})


Template.mesasAlumno.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaNacimiento2").inputmask("d-m-y");
  $("#fechaIngreso2").inputmask("d-m-y");

  Meteor.typeahead.inject();

});

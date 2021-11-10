import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Materias } from '../../../lib/collections/materias';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Mesas } from '../../../lib/collections/mesas';
import { Alumnos } from '../../../lib/collections/alumnos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.mesasAlumno.onCreated(function(){       
  this.selMateriaInfo = new ReactiveVar(null);  
  this.selMesaAnotar = new ReactiveVar(null);
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

    formCollection() {
      return Mesas;
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

    mesaAnotar: function() {     
      return Template.instance().selMesaAnotar.get();        
    },
});


Template.mesasAlumno.events({
	

  	'click .modalMateriaInfo': function(event, template){   
  		var materia = Materias.findOne({"_id":this._id});            
  		Template.instance().selMateriaInfo.set(materia);      
  		$('#modalMateriaInfo').modal('show');
    },    

    'click .modalMesaAnotar': function(event, template){   
      var mesa = Mesas.findOne({"_id":this._id});      
      Template.instance().selMesaAnotar.set(mesa);
      $('#modalMesaAnotar').modal('show');
    }, 
    'click .modalMesaInfo': function(event, template){   
      var mesa = Mesas.findOne({"_id":this._id});      
      Template.instance().selMesaInfo.set(mesa);
      $('#modalMesaInfo').modal('show');
      },  

    'submit #formMesaAnotar':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target; 

      //1) Agregar el alumno a la mesa
      //recupero los datos a insertar
      var mesaRecuperada = Template.instance().selMesaAnotar.get();
      var usuarioLogueado = Meteor.user();
      console.log('EL USUARIO LOGUEADO ES: ', usuarioLogueado._id);
      var datosAlumno = Alumnos.findOne({idUser: usuarioLogueado._id});
      console.log('LOS DATOS DEL ALUMNO SON: ', datosAlumno);

      //Creo mi Array con los datos para insertar   
      
		  let alu= {	_id: datosAlumno._id,
                  nombreApellido:datosAlumno.nombreApellido,
                  dni:datosAlumno.dni,
                  email:datosAlumno.email,          
      }; 

      console.log('EL DOCUMENTO PARA INSERTAR ES: ',alu);

      //inserto los datos en la base de datos
      Mesas.update({_id:mesaRecuperada._id},{$push:{alumnosMesas:alu}});	     
      //Profesionales.update({_id:profesional._id},{$push:{mistratamientos:trat}});

      $('#modalMesaAnotar').modal('hide'); //CIERRO LA VENTANA MODAL      
    },
})


Template.mesasAlumno.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaNacimiento2").inputmask("d-m-y");
  $("#fechaIngreso2").inputmask("d-m-y");

  Meteor.typeahead.inject();

});

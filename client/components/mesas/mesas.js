import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Mesas } from '../../../lib/collections/mesas';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Llamados } from '../../../lib/collections/llamados';
import { Materias } from '../../../lib/collections/materias';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.mesas.onCreated(function(){       
  this.selMesaInfo = new ReactiveVar(null);
  this.selMesaEditar = new ReactiveVar(null);  
  this.selLlamado = new ReactiveVar(null);  


  
  this.selMateria = new ReactiveVar(null);  

  this.selPresidente = new ReactiveVar(null);
  this.selVocal1 = new ReactiveVar(null);
  this.selVocal2 = new ReactiveVar(null);
});

Template.mesas.helpers({
    searchAttributes() {
      return {
          placeholder: 'Buscar ...',
      };
    }, 
    
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

    mesaEditar: function() {     
      return Template.instance().selMesaEditar.get();        
    },

    selecLlamado: function(event, suggestion, datasetName) {
      Template.instance().selLlamado.set(suggestion.id);  		
    },

    llamados1: function() {     
      return Llamados.find().fetch().map(function(object){ return {id: object._id, value: object.numeroNombre}; });    
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
    
});

Template.mesas.events({
  'click .remove': function(event, template){   
    Meteor.call('mesas.remove',this._id);
  },

  'click .modalMesaInfo': function(event, template){   
    var mesa = Mesas.findOne({"_id":this._id});      
    Template.instance().selMesaInfo.set(mesa);
    $('#modalMesaInfo').modal('show');
    },  

    'click .modalMesaEditar': function(event, template){   
      var mesa = Mesas.findOne({"_id":this._id});      
      Template.instance().selMesaEditar.set(mesa);
      console.log(Template.instance().selMesaEditar.get());
      $('#modalMesaEditar').modal('show');
    }, 

    'submit #formModificarMesa':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;  

      //RECUPERO EL ID DEL LLAMADO INGRESADO
      var ingresoLlamado = Template.instance().selLlamado.get();	

      //DECLARO LAS VARIABLES
      var idLlamado;	
      var nombreLlamado;
      var numeroLlamado;

      var llamadoSeleccionado = Llamados.findOne({"_id":ingresoLlamado}); //BUSCO LA COLLECION CON EL ID INGRESADO
      
      //AHORA SETEO LAS VARIABLES
      if (llamadoSeleccionado){
        idLlamado = llamadoSeleccionado._id;
        nombreLlamado = llamadoSeleccionado.nombre;
        numeroLlamado = llamadoSeleccionado.numero;			
      }  


      //RECUPERO EL ID DE LA MATERIA INGRESADO
      var ingresoMateria = Template.instance().selMateria.get();

      //DECLARO LAS VARIABLES
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

      var ingresoPresidente = Template.instance().selPresidente.get();  //selecPresidente

      var idPresidente;		
      var nombrePresidente;
      var dniPresidente;
      var presidenteSeleccionada = Docentes.findOne({"_id":ingresoPresidente});//obtengo el docente seleccionado (objeto)     
      if (presidenteSeleccionada){
        idPresidente = presidenteSeleccionada._id;			
        nombrePresidente = presidenteSeleccionada.nombreApellido;
        dniPresidente = presidenteSeleccionada.dni;
      } 

      var ingresoVocal1 = Template.instance().selVocal1.get(); //selecVocal1


      var ingresoVocal2 = Template.instance().selVocal2.get(); 	

      var idVocal1;		
      var nombreVocal1;
      var dniVocal1;
      var vocal1Seleccionada = Docentes.findOne({"_id":ingresoVocal1});//obtengo el docente seleccionado (objeto)     
      if (vocal1Seleccionada){
        idVocal1 = vocal1Seleccionada._id;			
        nombreVocal1 = vocal1Seleccionada.nombreApellido;
        dniVocal1 = vocal1Seleccionada.dni;
      }
  
      if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};	
      
      var idVocal2;		
      var nombreVocal2;
      var dniVocal2;
      var vocal2Seleccionada = Docentes.findOne({"_id":ingresoVocal2});//obtengo el docente seleccionado (objeto)     
      if (vocal2Seleccionada){
        idVocal2 = vocal2Seleccionada._id;			
        nombreVocal2 = vocal2Seleccionada.nombreApellido;
        dniVocal2 = vocal2Seleccionada.dni;
      }
      
      var mesa = Template.instance().selMesaEditar.get()
      Mesas.update({_id:mesa._id},{$set: {            
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
      }});
        $('#modalMesaEditar').modal('hide'); //CIERRO LA VENTANA MODAL              
      }
  });
  
  
  Template.mesas.onRendered(function() {
  
    Meteor.typeahead.inject();
  });
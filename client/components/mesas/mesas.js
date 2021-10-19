import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Mesas } from '../../../lib/collections/mesas';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.mesas.onCreated(function(){       
  this.selMesaInfo = new ReactiveVar(null);
  this.selMesaEditar = new ReactiveVar(null);    
});

Template.mesas.helpers({
    searchAttributes() {
      return {
          placeholder: 'Buscar ...',
      };
    },    

    mesaInfo: function() {     
      return Template.instance().selMesaInfo.get();        
    },

    mesaEditar: function() {     
      return Template.instance().selMesaEditar.get();        
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
      $('#modalMesaEditar').modal('show');
    }, 

    'submit #formModificarMesa':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;  

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
  
  
  Template.mesaForm.onRendered(function() {
  
    Meteor.typeahead.inject();
  });
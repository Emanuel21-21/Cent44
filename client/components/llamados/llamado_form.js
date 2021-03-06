import { Llamados } from '../../../lib/collections/llamados';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.llamadoForm.helpers({
  formCollection() {
    return Llamados;
  },
})

Template.llamadoForm.events({  

    'submit #formLlamado':function(event) {
	    // Prevent default browser form submit
      	event.preventDefault();

        // Get value from form element
        const target = event.target;

        var ingresoNombre = null;
    		var ingresoNumero = null; 
    		var ingresoFechaDesde = null;	
    		var ingresoFechaHasta = null;    		
    		var ingresoDescripcion = null;

        if (target.nombre.value){ingresoNombre = target.nombre.value};
        if (target.numero.value){ingresoNumero = target.numero.value};

        var espacio = " "; 
  	    var combinacion = ingresoNombre.concat(espacio);
  	    combinacion = combinacion.concat(ingresoNumero);

        if (target.fechaDesde.value){
          var fechaDesde = target.fechaDesde.value;
		  fechaDesde = fechaDesde+'T00:00:00';		  
          fechaDesde = new Date(fechaDesde).toDateString("dd-MM-yyyy");		  		  
        };
        
        
        if (target.fechaHasta.value){
          var fechaHasta = target.fechaHasta.value;
		  fechaHasta = fechaHasta+'T00:00:00';          
          fechaHasta = new Date(fechaHasta).toDateString("dd-MM-yyyy");          
        };          
                
        if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};

        //ESTE CODIGO CONCATENA EL NUMERO Y EL NOMBRE DEL LLAMADO
        var espacio = " "; 
        var combinacion = ingresoNombre.concat(espacio);
        combinacion = combinacion.concat(ingresoNumero);
        console.log(combinacion);

      	Llamados.insert({
    			nombre:ingresoNombre, 			
    			numero:ingresoNumero,
          numeroNombre:combinacion,
    			fechaDesde: fechaDesde,
    			fechaHasta: fechaHasta,			
    			descripcion:ingresoDescripcion,			
    		});      	
			
	    Router.go('/llamados');
		}
});

/* Template.llamadoForm.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaDesde").inputmask("d-m-y");
  $("#fechaHasta").inputmask("d-m-y"); 
}); */
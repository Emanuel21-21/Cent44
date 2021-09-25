import { Meteor } from 'meteor/meteor';
import { Docentes } from '../lib/collections/docentes';
import { Alumnos } from '../lib/collections/alumnos';
import { Carreras } from '../lib/collections/carreras';
import { Materias } from '../lib/collections/materias';
import { Llamados } from '../lib/collections/llamados';
import { Mesas } from '../lib/collections/mesas';

Meteor.publish('docentes', function projectsPublication()
{
	return Docentes.find({owner: this.userId});
});

Meteor.publish('alumnos', function projectsPublication()
{
	return Alumnos.find({owner: this.userId});
});

Meteor.publish('carreras', function projectsPublication()
{
	return Carreras.find({owner: this.userId});
});

Meteor.publish('materias', function projectsPublication()
{
	return Materias.find({owner: this.userId});
});

Meteor.publish('llamados', function projectsPublication()
{
	return Llamados.find({owner: this.userId});
});

Meteor.publish('mesas', function projectsPublication()
{
	var mostrar = Roles.userIsInRole(this.userId,['admin']);
    if (mostrar){
      return Mesas.find();  
    }
    else{//alumno
      	usuarioLogueado = Alumnos.findOne({idUser:this.userId});		
		// AHORA TENGO QUE RECUPERAR LA CARRERA DEL ALUMNO
		//var alumno = Alumnos.find({_id:usuarioLogueado});	
		// AHORA TENGO QUE TRAER TODAS LAS MESAS CON LA CARRERA DEL ALUMNO			
      	return Mesas.find({nombreCarrera: usuarioLogueado.carrera});
    }
    
});
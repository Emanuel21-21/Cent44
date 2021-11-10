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
	var mostrar = Roles.userIsInRole(this.userId,['admin']);
    if (mostrar){
      return Alumnos.find();  
    }
    else{
		var mostrar2 = Roles.userIsInRole(this.userId,['alumno']);		
		if (mostrar2){ //ES ALUMNO			
			// AHORA TENGO QUE TRAER SOLO LOS DATOS DEL ALUMNO LOGUEADO
			return Alumnos.find({idUser: this.userId});
		}else{ // ES PROFESOR			
			//profesorLogueado = Docentes.findOne({idUser:this.userId});			
			return Alumnos.find();
		}

      	
    }
	
	//return Alumnos.find({owner: this.userId});
	return Alumnos.find();
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
    else{
		var mostrar2 = Roles.userIsInRole(this.userId,['alumno']);		
		if (mostrar2){ //ES ALUMNO
			alumnoLogueado = Alumnos.findOne({idUser:this.userId});		
			// AHORA TENGO QUE RECUPERAR LA CARRERA DEL ALUMNO
			
			// AHORA TENGO QUE TRAER TODAS LAS MESAS CON LA CARRERA DEL ALUMNO			
			return Mesas.find({nombreCarrera: alumnoLogueado.carrera});
		}else{ // ES PROFESOR			
			profesorLogueado = Docentes.findOne({idUser:this.userId});			
			return Mesas.find({idPresidente: profesorLogueado._id});
		}

      	
    }
    
});
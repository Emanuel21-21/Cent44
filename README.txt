El Profesor debe poder:
    1) Ver las mesas disponibles.(Listo)
    2) Que alumnos se anotaron en las mesas. 
    3) Ingresar las notas de los alumnos. 

El Alumno debe poder:
    1) Ver las mesas disponibles.(Listo)
    2) Anotarse en ellas / Darse de Baja.
    3) Ver la nota que se sacó.

Hay que restringir las vistas a los alumnos y docentes, Por ejemplo el docente no puede acceder a la ruta http://localhost:3000/mesas
Sacar el editar y mostrar el detalle (Listo)

//LOS DATOS QUE SE VAN A GUARDAR DEL ALUMNO EN LA MESA SON:
materia / carrera
MESA1 (MATEMATICA-PETROLEO)
{
    {   alumno1
        id1
        dni1
        email

    }
    {
        alumno2
        id2
        dni2
    }
    {
        alumno3
        id3
        dni3
    }
}

//19-11-2021
PARA HACER:
1) Hay que controlar que el alumno no se cargue mas de una vez a la materia
2) Hay que limitar la nota del (1-10). Tampoco puede aceptar numeros negativos (OK)
3) Hacer el cancelar nota con una fecha limite 
4) Hacer la inscripcion con una fecha limite
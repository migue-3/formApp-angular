import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {


    validate(control: AbstractControl): Observable<ValidationErrors | null> {
       const email = control.value;

       //Creamos un observable manualmente
       const httpCallObservable = new Observable<ValidationErrors|null >( (subscriber) => {

        console.log({ email });

        if ( email === 'miguel@google.com') {
            subscriber.next({ emailTaken: true });
            subscriber.complete(); //una vez se completa el observable mandamos a llamar el complete() para que no siga emitiendo valores
        }

        subscriber.next(null); //lo contrario es decir lo que la persona acaba de escrbir no existe en el backend o BD
        subscriber.complete();
       }).pipe(
        delay( 3000 )
       );

       return httpCallObservable;

    }
    
    // validate(control: AbstractControl): Observable<ValidationErrors | null> {
    //    const email = control.value;
    //    console.log( email );
    
    //    return of({
    //     emailTaken: true
    //    }).pipe(
    //     delay( 2000 )
    //    )
    
    // }

}
import { Component } from '@angular/core';
import { Contacto } from './modelos/contacto';
import { ContactoService } from './servicios/contacto.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  contactoArray : Contacto[] = []; 
  contactoForm: FormGroup;   
  constructor(private formbuilder: FormBuilder,private contactoService:ContactoService)
  {this.contactoForm = this.formbuilder.group({     
    fullnamelist: ['', [Validators.required, Validators.minLength(0)]],
    fullname: ['', [Validators.required, Validators.minLength(0)]],
    phone: ['', [Validators.required, Validators.minLength(0)]],
    email: ['', [Validators.required, Validators.minLength(0)]],
  });}

  ngOnInit(): void{  
    this.getContactos();     
  }

  getContactos(): void {
    this.contactoService.getContactos().subscribe((result: any) => {this.contactoArray = result?.contactos;            
      console.log(this.contactoArray);      
    }, (err:any)=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Aviso...',
        text: '!Ocurrió un error!',
      })
    });  
  }

  registrarContacto(): void {    
    //let fullname = this.contactoForm.controls['fullname'].value;
    //console.log("registrarContacto"); 
    //console.log(fullname); 
    this.contactoService.registrarContacto(this.contactoForm.value).subscribe((result: any) => { }, (err:any)=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Aviso...',
        text: '!Ocurrió un error!',
      })
    });  
    console.log("llamando a getContactos"); 
    this.getContactos();
  }
  
  
   

}

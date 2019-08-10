import { Component, OnInit, ɵConsole } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  validations_form: FormGroup;
  public minDate;
  public validDate: boolean;
  public dateSelected: boolean = false;
  public registerSuccess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private clientApi: ClientsService
  ) { 
    this.minDate = '1900-00-00';
  }

  /** 
   * theValueExist - Verficia que el valor que se le pase por parametro exista
   */
  theValueExist = function(value) {
    if ((value == '') || (value == null) || (value == undefined) || (value == [])) {
        return false;
    } else {
        return true;
    }
  };

  /**
   * setDate - Valida cuando escogen la fecha 
   */
  setDate() {
    if(this.theValueExist(this.validations_form.value.birthdate)){
      // console.log('log > ', this.validations_form.value.birthdate)
      this.dateSelected = true;
      var selectedDate = moment(''+this.validations_form.value.birthdate);
      var dateNow = moment();
      // console.log('Difference is ', dateNow.diff(selectedDate, 'years'), 'years');
      var validYear =  dateNow.diff(selectedDate, 'years');
      if(validYear >= 18){
        this.validDate = true;
      }else{
        this.validDate = false;
      }
    }
  }

  resetForm(){
    this.registerSuccess = false;
    this.validations_form = this.formBuilder.group({
      identification: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // LlwRARzknZgyVILjVLU
    
    this.validations_form = this.formBuilder.group({
      identification: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required)
    });
  }

  validation_messages = {
    'identification': [
      { type: 'required', message: 'La identificación es inválida.' },
      { type: 'pattern', message: 'Debe se un numero mas pequeño.' }
    ],
    'firstname': [
      { type: 'required', message: 'El nombre es requerido.' }
    ],
    'lastname': [
      { type: 'required', message: 'Los apellidos son requeridos.' }
    ],
    'birthdate': [
      { type: 'required', message: 'La fecha es requerida.' }
    ]
  };

  onSubmit(values){
    // no encontré como traer el usuario por numero de identification para verificar si ya se encontraba allí
    // this.clientApi.getClient(123456789).subscribe((data)=>{
    //   console.log('cliente > ', data);
    // })
    if(this.validDate && this.validations_form.valid){
      var convertDate = moment(this.validations_form.value.birthdate).format('DD-MM-YYYY');
      this.validations_form.value.birthdate = convertDate;
      console.log('registre')
      console.log(values);
      this.clientApi.registerClient(values).subscribe((data)=>{
        console.log('respuesta > ', data)
        this.registerSuccess = true;
      })
    }
  }

}

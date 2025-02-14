import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-form-to-create-os',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    StepperModule,
  ],
  templateUrl: './form-to-create-os.component.html',
  styleUrl: './form-to-create-os.component.scss',
})
export class FormToCreateOsComponent implements OnInit {
  @Output() formData = new EventEmitter();
  form!: FormGroup;
  date!: string;

  classifierList = [
    { id: 1, name: 'Jean Soares' },
   
  ];
  typeService = [
    { id: 1, name: 'Classificação' },
    { id: 2, name: 'Auditoria' },
  ];

  ngOnInit() {
    this.form = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      CPFOrCNPJ: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      CEP: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      dataOS: new FormGroup({
        classifier: new FormControl('', [Validators.required]),
        local: new FormControl('', [Validators.required]),
        typeService: new FormControl('', [Validators.required]),
        date: new FormControl(null, [Validators.required]),
        createOffer: new FormArray([]),
      }),
    });
  }

  get createOffer(): FormArray {
    return this.form.get('dataOS.createOffer') as FormArray;
  }

  addOffer() {
    const offerGroup = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
    this.createOffer.push(offerGroup);
  }

  removeOffer(index: number) {
    this.createOffer.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.formData.emit(value);
      this.form.reset();
      console.log(value);
    }
  }
}

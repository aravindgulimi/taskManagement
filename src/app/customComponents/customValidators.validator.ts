import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static noSpaceAllowed(control: AbstractControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      // return { noSpaceAllowed: 'space created' };
      return { noSpaceAllowed: '*No Space allowed in name field'};
    }
    return null;
  }

  static nameValidator(control: AbstractControl){
    // const value = control.value || '';
    const value = control.value ? control.value.trim() : ''; // Trim the value to avoid spaces at the beginning and end

    if(value.length < 3 ){
        return { minLength : 'Minimum length is 3 characters'}
    }else if(value.length > 15){
        return {maxLength: 'Maximum length is 15 characters'};
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (control.value && !nameRegex.test(control.value)) {
      return { invalidName: 'Only alphabets (A-Z, a-z) are allowed' };
    }

    return null;
  }

  static phoneNumberValidator(control: AbstractControl) {
    const phoneRegex = /^[0-9]{10}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { validPhoneNumber: 'Phone number must be exactly 10 digits and contain only numbers (0-9)' };
    }
    return null;
  }

  static emailValidator(control: AbstractControl) {
      if (control.value && !control.value.endsWith('@gmail.com')) {
        return { invalidDomain : 'Only Gmail addresses are allowed' };
      }
      return null;
    }
}

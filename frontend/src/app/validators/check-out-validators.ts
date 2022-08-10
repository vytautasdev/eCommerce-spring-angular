import { FormControl, ValidationErrors } from '@angular/forms';

export class CheckoutValidators {
  // whitespace validation
  static notOnlyWhitespace(formControl: FormControl): ValidationErrors {
    // check if user input only contains whitespace
    if (formControl.value != null && formControl.value.trim().length === 0) {
      // invalid, return error obj
      return { notOnlyWhitespace: true };
    } else {
      // valid, return null
      return null;
    }
  }
}

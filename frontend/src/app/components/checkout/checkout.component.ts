import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2shopFormService } from 'src/app/services/luv2shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private luv2shopFormService: Luv2shopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCardDetails: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate CC exp months
    const startMonth: number = new Date().getMonth() + 1;
    console.log(`startMonth: ${startMonth}`);

    this.luv2shopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log(`Retrieved CC months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      });

    // populate CC exp years
    this.luv2shopFormService.getCreditCardYears().subscribe((data) => {
      console.log(`Retrieved CC years: ${JSON.stringify(data)}`);
      this.creditCardYears = data;
    });

    // populate countries
    this.luv2shopFormService.getCountries().subscribe((data) => {
      console.log(`Retrieved countries: ${JSON.stringify(data)}`);
      this.countries = data;
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCardDetails');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    // if the current year === selected year => start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.luv2shopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log(`Retrieved credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country code: ${countryName}`);

    this.luv2shopFormService.getStates(countryCode).subscribe((data) => {
      formGroupName === 'shippingAddress'
        ? (this.shippingAddressStates = data)
        : (this.billingAddressStates = data);

      // select first item by default
      formGroup.get('state').setValue(data[0]);
    });
  }

  onSubmit() {
    console.log('Form submitted...');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }
}

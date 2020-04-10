import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { WageService } from '../../wage.service';
import { UserService } from '../../../../../shared/user.service';
import { DataStorageService } from '../../../../../shared/data-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total-wage',
  templateUrl: './total-wage.component.html',
  styleUrls: ['./total-wage.component.css'],
})
export class TotalWageComponent implements OnInit, OnDestroy {
  userData: any;
  user: {};
  subscriptionworkingHours: Subscription;
  hourlyWage = 0;
  tax = 15;

  deductions = [];
  totalDeductions = 0;

  totalHoursFloat = 0;

  // forms
  wageForm: FormGroup;
  taxForm: FormGroup;
  deductionsForm: FormGroup;

  constructor(
    private wageService: WageService,
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getData();

    this.userData = JSON.parse(localStorage.getItem('userData'));
    const users = this.userService.getUsers();

    this.user = users.filter((user) => user._id === this.userData.userID)[0];
    if (this.user !== undefined) {
      if (this.user['employeeInfo'].deductions !== undefined) {
        this.deductions = this.user['employeeInfo'].deductions;
      }
      this.wageService.setDeductions(this.deductions);
    }

    this.subscriptionworkingHours = this.wageService.workingHoursChanged.subscribe(
      () => {
        this.getData();
      }
    );

    this.wageForm = new FormGroup({
      hourlyWage: new FormControl(this.hourlyWage, Validators.required),
    });

    this.taxForm = new FormGroup({
      tax: new FormControl(this.tax, Validators.required),
    });

    this.deductionsForm = new FormGroup({
      reason: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.getTotalDeductions();
  }

  getData() {
    this.hourlyWage = this.wageService.getHourlyWage();
    this.totalHoursFloat = this.wageService.getTotalHoursFloat();
    this.deductions = this.wageService.getDeductions();
  }

  onWageSubmit() {
    this.hourlyWage = this.wageForm.value.hourlyWage;
    console.log('hourlyWage: ', this.hourlyWage);
  }

  onTaxSubmit() {
    this.tax = this.taxForm.value.tax;
    console.log('tax: ', this.tax);
  }

  onDeductionsSubmit(event) {
    console.log(this.deductionsForm);
    if (this.deductionsForm.valid) {
      this.deductions.push({
        reason: this.deductionsForm.value.reason,
        amount: parseFloat(this.deductionsForm.value.amount),
      });

      this.deductionsForm.reset();
      event.currentTarget.reset();
      console.log(this.deductionsForm);
      this.getTotalDeductions();

      const updatedUser = {
        ...this.user,
        employeeInfo: {
          ...this.user['employeeInfo'],
          deductions: [...this.deductions],
        },
      };

      this.wageService.setDeductions(this.deductions);
      this.dataStorageService.updateUsers(updatedUser);
    }
  }

  getTotalDeductions() {
    this.totalDeductions = 0;
    if (this.deductions !== undefined) {
      this.deductions.map((x) => {
        this.totalDeductions += x.amount;
      });
    }
  }

  onRemoveDeduction(index) {
    this.deductions.splice(index, 1);
    this.getTotalDeductions();

    const updatedUser = {
      ...this.user,
      employeeInfo: {
        ...this.user['employeeInfo'],
        deductions: [...this.deductions],
      },
    };

    this.wageService.setDeductions(this.deductions);
    this.dataStorageService.updateUsers(updatedUser);
  }

  ngOnDestroy() {
    this.subscriptionworkingHours.unsubscribe();
  }
}

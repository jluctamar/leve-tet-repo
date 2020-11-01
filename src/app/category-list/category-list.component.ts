import { Component, OnInit } from '@angular/core';
import { Category, WordEntry } from '../shared/interfaces';
import * as repository from '../shared/dataBank';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  showWordDisplay = false;
  dataBank: Category[] = [];
  selectedArray: WordEntry[] = [];

  constructor() {}

  ngOnInit() {
    // grab the data from the data repository and place them inside appropriate data structure
    this.setUpDataBank();
  }

  setUpDataBank(): void {
    repository.default.forEach((obj) => {
      let tempCategory: Category = {
        name: {
          creoleText: '',
          engText: '',
        },
        dataArray: [],
      };

      Object.keys(obj).forEach((key) => {
        let tempEntry: WordEntry = {
          creoleText: '',
          engText: '',
        };
        tempEntry.creoleText = obj[key];
        tempEntry.engText = key;

        tempCategory.dataArray.push(tempEntry);
      });

      tempCategory.name = tempCategory.dataArray[0]; // this first element is the caterory name
      tempCategory.dataArray.shift(); // once the name has been isolated and properly assigned, remove it from the data array
      this.dataBank.push(tempCategory);
    });
  }

  selectedCategoryEvent(categoryName): void {
    // event passes in the category name
    console.log('Getting there....', categoryName);

    // set showWordDisplay to true
    this.showWordDisplay = true;

    // assign a copy of the correct category data to the showWordDisplay component
    this.selectedArray = JSON.parse(
      JSON.stringify(
        this.dataBank.find((bank) => bank.name.engText === categoryName.engText)
          .dataArray
      )
    );
  }

  onEndOfRoundEvent(): void {
    this.showWordDisplay = false;
    this.selectedArray = [];
  }
}

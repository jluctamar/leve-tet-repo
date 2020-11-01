import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlideInOutAnimation } from '../shared/animations';
import { Category, WordEntry } from '../shared/interfaces';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss'],
  animations: [ SlideInOutAnimation]
})
export class CategoryChipComponent implements OnInit {
  @Input() category: Category;
  @Output() selectedCategoryEvent: EventEmitter<WordEntry> = new EventEmitter<
    WordEntry
  >();

  categoryCopy: Category;
  animationState = 'out';
  imageSrc: string;
  constructor() {}

  ngOnInit() {
    this.categoryCopy = JSON.parse(JSON.stringify(this.category));
    // capture the image URL location and store it an a variable.
    this.imageSrc = this.categoryCopy.dataArray.find(
      (element) => element.engText === 'IMAGE'
    ).creoleText;
    // remove the element(which should be the first element)
    this.categoryCopy.dataArray.splice(0, 1);
  }

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  onSelectCategory(): void {
    event.stopPropagation();
    this.selectedCategoryEvent.emit(this.categoryCopy.name);
  }
}

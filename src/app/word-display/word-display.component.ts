import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ResultObject, WordEntry } from '../shared/interfaces';



@Component({
  selector: 'app-word-display',
  templateUrl: './word-display.component.html',
  styleUrls: ['./word-display.component.scss']
})
export class WordDisplayComponent implements OnInit {

  @Output() endOfRoundEvent = new EventEmitter();
  @Input() wordsArray = [];

  resultsArray: ResultObject[] = [];
  arrIndex: number;
  pointsCounter: number = 0;
  displayWord: WordEntry;
  activeGame: boolean;
  isLengthy = false;
  correctClip = new Audio("../../assets/correctAudio.mp3");
  passClip = new Audio("../../assets/passAudio.mp3");
  imageSrc: WordEntry;

  constructor() { }

  ngOnInit() {
    this.activeGame = true;
    this.loadAudioCLips();
    this.imageSrc = this.wordsArray[0];
    if (this.imageSrc.creoleText.search('songs') !== -1) {
      this.isLengthy = true;
    }
    this.wordsArray.shift();
    this.updateArrayIndex();
    this.displayWord = this.wordsArray[this.arrIndex];
  }

  loadAudioCLips(): void {
    this.correctClip.load();
    this.passClip.load();

  }

  onTimedOutEvent(): void {
    // calculate final score... maybe display results in the same component before going back to category selection

    this.activeGame = false
    this.resultsArray.push({
      resultEntry: this.displayWord,
      isCorrect: false
    })
  }

  updateArrayIndex(): void {
    this.arrIndex = Math.floor(
      Math.random() * this.wordsArray.length
      );
  }

  updateArray(): void {

    
    
    this.wordsArray.splice(this.arrIndex, 1);
    // End Game Scenario
    if (this.wordsArray.length === 0){
      this.activeGame = false
    } else {
      this.updateArrayIndex();
      this.displayWord = this.wordsArray[this.arrIndex];

    }
  }


  onCorrectResponse(): void {
    this.correctClip.play();
    this.pointsCounter++;
    this.resultsArray.push({
      resultEntry: this.displayWord,
      isCorrect: true
    })
    this.updateArray();
  }

  onPassResponse(): void {
    this.passClip.play();
    this.resultsArray.push({
      resultEntry: this.displayWord,
      isCorrect: false
    })
    this.updateArray();
  }

}

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.scss'],
})
export class CountdownClockComponent implements OnInit {
  @Output() timedOutEvent = new EventEmitter();

  progressBar = null;
  indicator = null;
  pointer = null;
  length = Math.PI * 2 * 100;

  displayOutput = null;
  wholeTime = 600; // for 60 seconds
  timeLeft;
  intervalTimer;
  isStarted = false;
  countdownClip = new Audio('../../assets/10-second-countdown.mp3');

  constructor() {}

  ngOnInit(): void {
    this.setupTimer();
    this.update(this.wholeTime, this.wholeTime); // refreshes progress bar
    this.displayTimeLeft(this.wholeTime);
    this.timer(this.wholeTime);
    this.countdownClip.load();
  }

  setupTimer(): void {
    this.progressBar = document.querySelector('.e-c-progress');
    this.indicator = document.getElementById('e-indicator');
    this.pointer = document.getElementById('e-pointer');
    this.displayOutput = document.querySelector('.display-remain-time');
    this.progressBar.style.strokeDasharray = this.length;
  }

  timer(seconds) {
    // counts time, takes seconds
    let remainTime = Date.now() + seconds * 1000;
    this.displayTimeLeft(seconds);

    this.intervalTimer = setInterval(() => {
      let timeLeft = Math.round((remainTime - Date.now()) / 1000);

      if (timeLeft < 0) {
        clearInterval(this.intervalTimer);

        this.isStarted = false;
        this.displayTimeLeft(this.wholeTime);
        this.timedOutEvent.emit();
        return;
      }

      this.displayTimeLeft(timeLeft);
    }, 1000);
  }

  update(value, timePercent) {
    var offset = -this.length - (this.length * value) / timePercent;
    this.progressBar.style.strokeDashoffset = offset;
    this.pointer.style.transform = `rotate(${(360 * value) / timePercent}deg)`;
    this.updateColorIndicator((360 * value) / timePercent);
  }

  updateColorIndicator(degValue: number): void {
    if (degValue <= 360 && degValue > 270) {
      this.displayOutput.style.color = 'green';
      this.progressBar.style.stroke = 'green';
    } else if (degValue <= 270 && degValue > 180) {
      this.displayOutput.style.color = 'green';
      this.progressBar.style.stroke = 'green';
    } else if (degValue <= 180 && degValue > 90) {
      this.displayOutput.style.color = 'orange';
      this.progressBar.style.stroke = 'orange';
    } else {
      this.displayOutput.style.color = 'red';
      this.progressBar.style.stroke = 'red';
    }
  }

  displayTimeLeft(timeLeft: number): void {
    //displays time on the input
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
    this.displayOutput.textContent = displayString;
    if (seconds === 10) {
      this.countdownClip.play();
    }
    this.update(timeLeft, this.wholeTime);
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
  }
}

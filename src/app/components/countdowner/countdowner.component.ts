import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-countdowner',
  templateUrl: './countdowner.component.html',
  styleUrls: ['./countdowner.component.css']
})
export class CountdownerComponent {

  inprogress: boolean = false;
  timerControl = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+$")])
  percent: number = 0;
  private timeRef: any = null;
  time: string = '';
  constructor() { }

  start() {
    if (!this.timerControl.valid) {
      return;
    }
    this.playSound('assets/sounds/bing_bong.mp3');
    this.inprogress = true;
    const timeInSec = this.timerControl.value * 60;
    let timeleft = timeInSec;
    this.timeRef = setInterval(() => {
      this.percent = Math.round(100 - ((Math.round(timeleft) / timeInSec) * 100));
      let minutes = Math.floor(timeleft / 60);
      let seconds = Math.floor(timeleft % 60);
      this.time = `${minutes}:${seconds}`;
      if (timeleft <= 0) {
        clearInterval(this.timeRef);
        this.playSound('assets/sounds/time_up.mp3');
        this.reset();
      }
      timeleft -= 1;
    }, 1000);
  }

  private playSound(location: string) {
    var audio = new Audio(location);
    audio.loop = false;
    audio.play();
  }

  reset() {
    if (this.timeRef) {
      clearInterval(this.timeRef);
      this.timeRef = null;
    }
    this.timerControl.reset('');
    this.inprogress = false;
    this.percent = 0;
    this.time = '';
  }
}

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
  muted: boolean = false;
  constructor() { }

  async start() {
    if (!this.timerControl.valid) {
      return;
    }
    await this.playSound('assets/sounds/init.mp3');
    this.inprogress = true;
    const timeInSec = this.timerControl.value * 60;
    let timeleft = timeInSec;
    this.timeRef = setInterval(async () => {
      this.percent = Math.round(100 - ((Math.round(timeleft) / timeInSec) * 100));
      this.time = `${new Date(timeleft * 1000).toISOString().substr(11, 8)}`;
      if (timeleft <= 0) {
        clearInterval(this.timeRef);
        await this.playSound('assets/sounds/time_up.mp3');
        this.reset();
      }
      timeleft -= 1;
    }, 1000);
  }

  private async playSound(location: string) {
    var audio = new Audio(location);
    audio.loop = false;
    if (!this.muted) {
      await audio.play();
    }
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

  disableStart(): boolean {
    return this.inprogress || !this.timerControl.valid;
  }
}

import { Component } from '@angular/core';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal [] = []
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  play(animal: Animal) {
    this.pausar_audio(animal);

    if (animal.reproduciendo){
      animal.reproduciendo = false;
    } else {
      this.audio.src = animal.audio;
      animal.reproduciendo = true;

      this.audio.load()
      this.audio.play();

      this.audioTiempo = setTimeout(() => {
        animal.reproduciendo = false;
      }, animal.duracion * 1000);
    }
  }

  private pausar_audio(animal: Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let a of this.animales) {
      if (a.nombre != animal.nombre){
        a.reproduciendo = false;
      }
    }
  }

  borrar_animal (i: number){
    this.animales.splice(i, 1);
  }

  recargar (e: Refresher){
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      e.complete();
    }, 800);
  }

  reordenar (e) {
    this.animales = reorderArray(this.animales, e);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jugador } from '../models/jugador';
import { JugadorService } from '../services/jugador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-jugador',
  templateUrl: '../add-jugador/add-jugador.component.html',
  styleUrls: ['./edit-jugador.component.css']
})

export class EditJugadorComponent implements OnInit {

  public jugador: Jugador;

  constructor(private activatedRoute: ActivatedRoute, private jugadorService: JugadorService, private router: Router) {
    this.jugador = new Jugador('', '', 0);
  }

  ngOnInit() {
    let elId = this.activatedRoute.snapshot.params.id;
    this.jugadorService.getJugador(elId).subscribe(
      result => {
        this.jugador = result['datos'];
      },
      err => {
        alert('Error al cargar el juugador' + err);
      }
    );
  }

  onSubmit() {
    let elId = this.activatedRoute.snapshot.params.id;
    this.jugadorService.updateJugador(elId, this.jugador).subscribe(
      response => {
        this.router.navigate(['/listaJugadores']);
      },
      error => {
        alert('Error al guardar el jugador: ' + error);
      }

    );
  }

}

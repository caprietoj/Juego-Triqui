const celdas = document.querySelectorAll('.celda');
const tablero = document.getElementById('tablero');

let jugadorActual = 'X';

function verificarGanador(jugador) {
    const ganadores = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return ganadores.some(comb => {
        return comb.every(c => {
            return celdas[c].dataset.jugador === jugador;
        });
    });
}

function verificarEmpate() {
    return [...celdas].every(celda => {
        return celda.dataset.jugador !== undefined;
    });
}

function finalizarJuego(mensaje) {
    setTimeout(() => {
        alert(mensaje);
        reiniciar();
          }, 100);
}

function reiniciar() {
    celdas.forEach(celda => {
        delete celda.dataset.jugador;
        celda.textContent = '';
    });
}

function jugar(e) {
    const celda = e.target;

    if (celda.dataset.jugador !== undefined) {
        return;
    }

    celda.dataset.jugador = jugadorActual;
    celda.textContent = jugadorActual;

    if (verificarGanador(jugadorActual)) {
        finalizarJuego(`¡Jugador ${jugadorActual} ha ganado!`);
    } else if (verificarEmpate()) {
        finalizarJuego('¡Empate!');
    } else {
        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
}

tablero.addEventListener('click', jugar);

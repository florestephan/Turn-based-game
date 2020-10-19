class Board {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }


    //Initialisation du plateau
    //Methode d'instance

    initBoard() {
        const table = $('#gameboard');
        const tbody = $('<tbody></tbody>').appendTo(table);
        for (let rows = 0; rows < this.line; rows++) {
            const row = $('<tr></tr>').appendTo(tbody)
            for (let cols = 0; cols < this.column; cols++) {
                const cell = $('<td></td>').appendTo(row)
                    .attr('data-line', rows)
                    .attr('data-col', cols)
                    .attr('class', 'cells')
                    .attr('id', 'feuillage')
            }
        }
    }

    // Initialisation des murs

    createWall(nbcell) {

        const array = $('.cells');
        for (let i = 0; i < nbcell; i++) {
            const wallposition = array[Math.floor(Math.random() * array.length)];
            $(wallposition).removeClass('cells').addClass('wall');

        }
    }

    // Attribution des zones pour les joueurs par deux classes area1 & area2
    //La classe area1 est créer sur les cells 0-1-2 par colonnes && la zone doit être une cells pour eviter une génération sur un mur ou une arme

    createArea() {
        $('[data-col]').each(function () {
            if ($(this).data('col') < 3 && $(this).is(".cells") === true) {
                $(this).attr('class', 'area1');
            }
        });
// La classe area2 est créer sur les cells 5-6-7 && la zone doit être une cells pour eviter une génération sur un mur ou une arme
        $('[data-col]').each(function () {
            if ($(this).data('col') > 6 && $(this).is(".cells") === true) {
                $(this).attr('class', 'area2');
            }
        });
    }


}

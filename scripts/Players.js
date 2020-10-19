class Players {
    constructor(name, nickname, place, statut, action, score) {
        this.name = name
        this.nickname = nickname
        this.place = place
        this.statut = statut
        this.action = action
        this.score = score
        this.weapon = new Weapons("banana", 10)
    }


    // Initialisation des joueurs

    initPlayers() {

        const playerarray = $("." + this.place);
        const playerposition = playerarray[Math.floor(Math.random() * playerarray.length)];

        $(playerposition).removeClass(this.place).removeClass('cells').addClass(this.nickname).addClass(this.statut);

        //Permet de selectionner toutes les classes area et de les remplacer par cells
        $('*[class^="area"]').removeClass(this.place).addClass('cells');
    }
};
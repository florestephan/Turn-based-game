$(document).ready(function () {

    // Création du plateau
    const gameBoard = new Board(8, 8);
    gameBoard.initBoard();

    gameBoard.createWall(7);

    //Création des armes
    const weapon1 = new Weapons("banana", 10);

    const weapon2 = new Weapons("knife", 20);
    weapon2.initWeapon();

    const weapon3 = new Weapons("pistol", 40);
    weapon3.initWeapon();

    const weapon4 = new Weapons("sniper", 60);
    weapon4.initWeapon();

    // créations des joueurs

    gameBoard.createArea();

    const player1 = new Players("Donkey", "donkey", "area1", "active", null, 100);
    player1.initPlayers();

    const player2 = new Players("Kong", "kong", "area2", null, null, 100);
    player2.initPlayers();


    //Deplacement des joueurs

    //Initialisation du jeu

    // Lancement du jeu
    const game = new Gameplay (player1, player2, weapon1, weapon2, weapon3, weapon4);
    game.movePlayers();
})

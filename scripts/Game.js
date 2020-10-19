class Gameplay {
    constructor(player1, player2, weapon1, weapon2, weapon3, weapon4) {
        this.activePlayer = player1
        this.passivePlayer = player2
        this.weapon1 = weapon1
        this.weapon2 = weapon2
        this.weapon3 = weapon3
        this.weapon4 = weapon4
        this.moveCount = 0;
        $('.donkey_score').text(`${this.activePlayer.score}`);
        $('.donkey_weapon').attr('src', 'img/' + this.activePlayer.weapon.name + '.png');
        $('.donkey_weapon_force').text(`${this.activePlayer.weapon.force}`);
        $('.kong_score').text(`${this.passivePlayer.score}`);
        $('.kong_weapon').attr('src', 'img/' + this.passivePlayer.weapon.name + '.png');
        $('.kong_weapon_force').text(`${this.passivePlayer.weapon.force}`);
        $("#turnplayer").text("C'est au tour de " + this.activePlayer.name);

    }


    // Initialisation des mouvements des joueurs
    movePlayers() {
        //Définition de la position du player

        this.activePlayer.position = {
            x: $("." + this.activePlayer.nickname).data('col'),
            y: $("." + this.activePlayer.nickname).data('line')
        }

        this.passivePlayer.position = {
            x: $("." + this.passivePlayer.nickname).data('col'),
            y: $("." + this.passivePlayer.nickname).data('line')
        }

        //Gestion des cellules verte active du futur positionnement

        //Haut

        let listeTop = [];
        // i correspond au cellule verte on le place donc à l'endroit correspondant pour les position = 3 car le joueur peut se déplacer de 3 cases max
        for (let i = -3; i <= 0; i++) {

            //La méthode push () ajoute de nouveaux éléments à la fin d'un tableau et renvoie la nouvelle longueur.
            listeTop.push([this.activePlayer.position.x, this.activePlayer.position.y + i]);
        }
        listeTop.reverse();

        //Every permet de verifier les données en fonction du tableau
        listeTop.every((e) => {
            if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.nickname))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.place))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($(".wall"))) {
                return false;
            } else {
                $("[data-col=" + e[0] + "][data-line=" + e[1] + "]").addClass(this.activePlayer.statut);
                return true;
            }
        })

        //Gauche

        let listeLeft = [];
        for (let i = -3; i <= 0; i++) {
            listeLeft.push([this.activePlayer.position.x + i, this.activePlayer.position.y]);
        }
        listeLeft.reverse();
        listeLeft.every((e) => {
            if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.nickname))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.place))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($(".wall"))) {
                return false;
            } else {
                $("[data-col=" + e[0] + "][data-line=" + e[1] + "]").addClass(this.activePlayer.statut);
                return true;
            }
        })

        //Bas

        let listeDown = [];
        for (let i = 0; i <= 3; i++) {
            listeDown.push([this.activePlayer.position.x, this.activePlayer.position.y + i]);
        }
        listeDown.every((e) => {
            if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.nickname))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.place))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($(".wall"))) {
                return false;
            } else {
                $("[data-col=" + e[0] + "][data-line=" + e[1] + "]").addClass(this.activePlayer.statut);
                return true;
            }
        })

        //Droite
        let listRight = [];
        for (let i = 0; i <= 3; i++) {

            listRight.push([this.activePlayer.position.x + i, this.activePlayer.position.y]);
        }
        listRight.every((e) => {
            if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.nickname))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($("." + this.passivePlayer.place))) {
                return false;
            } else if ($("[data-col=" + e[0] + "][data-line=" + e[1] + "]").is($(".wall"))) {
                return false;
            } else {
                $("[data-col=" + e[0] + "][data-line=" + e[1] + "]").addClass(this.activePlayer.statut);
                return true;
            }
        })


        //Permet d'enlever la cellule active sur le player
        $("." + this.activePlayer.nickname).removeClass(this.activePlayer.statut);

        //Gestion des mouvements, murs
        //Permet d'écouter l'appuis d'une touche sur le keyboard
        $(document).on('keydown', event => {

            if (event.which === 39) {
                // Right

                let moveRight = [];
                let i = 1;
                // i = 1 Car on déplace le joueur case par case
                moveRight.push([this.activePlayer.position.x + i, this.activePlayer.position.y]);
                moveRight.every((rightPos) => {
                    if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($("." + this.weapon1.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon1.name).removeClass('cells');
                        $("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon1.name;
                        this.activePlayer.weapon.force = this.weapon1.force;

                    } else if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($("." + this.weapon2.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon2.name).removeClass('cells');
                        $("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon2.name;
                        this.activePlayer.weapon.force = this.weapon2.force;

                    } else if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($("." + this.weapon3.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon3.name).removeClass('cells');
                        $("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon3.name;
                        this.activePlayer.weapon.force = this.weapon3.force;

                    } else if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($("." + this.weapon4.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon4.name).removeClass('cells');
                        $("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon4.name;
                        this.activePlayer.weapon.force = this.weapon4.force;

                    } else if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($(".wall"))) {
                        return false
                    } else if ($("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").is($(".cells"))) { // le is Cells permet que le joueur de sorte pas de la map
                        //Permet de déplacer le player ( enleve sa classe et remet la classe cells)
                        $("." + this.activePlayer.nickname).removeClass().addClass('cells');
                        //Permet de remove la classe cells active
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        //Permet d'ajouter la classe playeractive sur la cells selectionné
                        $("[data-col=" + rightPos[0] + "][data-line=" + rightPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        return true;

                    }
                })
                //Permet de modifier l'arme actuelle a jour
                $('.' + this.activePlayer.nickname + '_weapon').attr('src', 'img/' + this.activePlayer.weapon.name + '.png');
                //Permer de modifier la force de l'arme actuelle
                $('.' + this.activePlayer.nickname + '_weapon_force').text(`${this.activePlayer.weapon.force}`);

                //Compter le nombre de touche pressé si + 3 on change
                this.moveCount++;

            } else if (event.which === 37) { // Left

                let moveLeft = [];
                let i = -1;
                moveLeft.reverse();
                moveLeft.push([this.activePlayer.position.x + i, this.activePlayer.position.y]);
                moveLeft.every((leftPos) => {
                    if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($("." + this.weapon1.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon1.name).removeClass('cells');
                        $("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon1.name;
                        this.activePlayer.weapon.force = this.weapon1.force;

                    } else if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($("." + this.weapon2.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon2.name).removeClass('cells');
                        $("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon2.name;
                        this.activePlayer.weapon.force = this.weapon2.force;
                    } else if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($("." + this.weapon3.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon3.name).removeClass('cells');
                        $("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon3.name;
                        this.activePlayer.weapon.force = this.weapon3.force;

                    } else if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($("." + this.weapon4.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon4.name).removeClass('cells');
                        $("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon4.name;
                        this.activePlayer.weapon.force = this.weapon4.force;

                    } else if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($(".wall"))) {
                        return false

                    } else if ($("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").is($(".cells"))) {
                        //Permet de remove la classe cells active
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        //Permet de déplacer le player ( enleve sa classe et remet la classe cells)
                        $("." + this.activePlayer.nickname).removeClass().addClass('cells');
                        //Permet d'ajouter la classe playeractive sur la cells selectionné
                        $("[data-col=" + leftPos[0] + "][data-line=" + leftPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        return true;
                    }
                })
                //Permet de modifier l'arme actuelle a jour
                $('.' + this.activePlayer.nickname + '_weapon').attr('src', 'img/' + this.activePlayer.weapon.name + '.png');
                //Permer de modifier la force de l'arme actuelle
                $('.' + this.activePlayer.nickname + '_weapon_force').text(`${this.activePlayer.weapon.force}`);

                this.moveCount++;

            } else if (event.which === 40) { // Bottom

                let moveBottom = [];
                let i = 1;
                moveBottom.push([this.activePlayer.position.x, this.activePlayer.position.y + i]);
                moveBottom.every((bottomPos) => {

                    if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($("." + this.weapon1.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon1.name).removeClass('cells');
                        $("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon1.name;
                        this.activePlayer.weapon.force = this.weapon1.force;

                    } else if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($("." + this.weapon2.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon2.name).removeClass('cells');
                        $("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon2.name;
                        this.activePlayer.weapon.force = this.weapon2.force;
                    } else if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($("." + this.weapon3.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon3.name).removeClass('cells');
                        $("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon3.name;
                        this.activePlayer.weapon.force = this.weapon3.force;

                    } else if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($("." + this.weapon4.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon4.name).removeClass('cells');
                        $("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon4.name;
                        this.activePlayer.weapon.force = this.weapon4.force;

                    } else if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($(".wall"))) {
                        return false
                    } else if ($("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").is($(".cells"))) {
                        //Permet de déplacer le player ( enleve sa classe et remet la classe cells)
                        $("." + this.activePlayer.nickname).removeClass().addClass('cells');
                        //Permet de remove la classe cells active
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        //Permet d'ajouter la classe playeractive sur la cells selectionné
                        $("[data-col=" + bottomPos[0] + "][data-line=" + bottomPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        return true;
                    }
                })
                //Permet de modifier l'arme actuelle a jour
                $('.' + this.activePlayer.nickname + '_weapon').attr('src', 'img/' + this.activePlayer.weapon.name + '.png');
                //Permer de modifier la force de l'arme actuelle
                $('.' + this.activePlayer.nickname + '_weapon_force').text(`${this.activePlayer.weapon.force}`);

                this.moveCount++;

            } else if (event.which === 38) {//Top

                let moveTop = [];
                let i = -1;
                moveTop.reverse();
                moveTop.push([this.activePlayer.position.x, this.activePlayer.position.y + i]);
                moveTop.every((topPos) => {

                    if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($("." + this.weapon1.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon1.name).removeClass('cells');
                        $("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon1.name;
                        this.activePlayer.weapon.force = this.weapon1.force;

                    } else if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($("." + this.weapon2.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon2.name).removeClass('cells');
                        $("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon2.name;
                        this.activePlayer.weapon.force = this.weapon2.force;
                    } else if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($("." + this.weapon3.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon3.name).removeClass('cells');
                        $("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon3.name;
                        this.activePlayer.weapon.force = this.weapon3.force;

                    } else if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($("." + this.weapon4.name)) === true) {
                        $("." + this.activePlayer.nickname).removeClass().addClass(this.activePlayer.weapon.name);
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        $("." + this.weapon4.name).removeClass('cells');
                        $("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        this.activePlayer.weapon.name = this.weapon4.name;
                        this.activePlayer.weapon.force = this.weapon4.force;

                    } else if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($(".wall"))) {
                        return false
                    } else if ($("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").is($(".cells"))) {
                        //Permet de déplacer le player ( enleve sa classe et remet la classe cells)
                        $("." + this.activePlayer.nickname).removeClass().addClass('cells');
                        //Permet de remove la classe cells active
                        $("." + this.activePlayer.statut).removeClass(this.activePlayer.statut).addClass('cells');
                        //Permet d'ajouter la classe playeractive sur la cells selectionné
                        $("[data-col=" + topPos[0] + "][data-line=" + topPos[1] + "]").removeClass().addClass(this.activePlayer.nickname);
                        return true;
                    }
                })

                //Permet de modifier l'arme actuelle a jour
                $('.' + this.activePlayer.nickname + '_weapon').attr('src', 'img/' + this.activePlayer.weapon.name + '.png');
                //Permer de modifier la force de l'arme actuelle
                $('.' + this.activePlayer.nickname + '_weapon_force').text(`${this.activePlayer.weapon.force}`);

                this.moveCount++;

            }


            //Permet de mettre fin au keydown
            if (this.moveCount == 1) {
                $(".validMove").on("click", event => {
                    this.turnbased();
                    $('.' + this.activePlayer.statut).removeClass(this.activePlayer.statut);
                    this.movePlayers()
                    console.log("1")
                })
            } else if (this.moveCount == 3) {
                this.turnbased();
            }

            $(document).off("keydown");
            //Appel de la fonction qui permet de contiuer le déplacement
            this.movePlayers()
            this.positionx()
            this.reload()
        })
    }


    //Vérification pour le lancement du combat
    positionx() {
        let clickPosition = [];
        clickPosition.push([this.activePlayer.position.x, this.activePlayer.position.y]);
        clickPosition.every((clickposition) => {

            //Permet de vérifier si les personnages sont à coté
            if ((clickposition[1] === this.passivePlayer.position.y + 1 && clickposition[0] === this.passivePlayer.position.x) || (clickposition[1] === this.passivePlayer.position.y - 1 && clickposition[0] === this.passivePlayer.position.x) || (clickposition[0] === this.passivePlayer.position.x + 1 && clickposition[1] === this.passivePlayer.position.y) || (clickposition[0] === this.passivePlayer.position.x - 1 && clickposition[1] === this.passivePlayer.position.y)) {

                this.battle()
                alert('Le combat commence')
                //Permet d'enlever les cells verte lors du combat
                $('.' + this.activePlayer.statut).removeClass();

            }
        })
    }

    // Interversion des joueurs
    turnbased() {
        this.moveCount = 0;
        $(document).off("keydown");
        $('.validMove').off("click");
        this.activePlayer.statut = "passive"
        this.passivePlayer.statut = "active"

        //Changement du player actif
        let turn = this.activePlayer;
        this.activePlayer = this.passivePlayer;
        this.passivePlayer = turn;

        $("#turnplayer").text("C'est au tour de " + this.activePlayer.name);
    }

    //Fonctionnement du combat

    battle() {
//Lors du click sur le button attack
        $(".attack").on("click", event => {

            this.activePlayer.action = 'attacks';

            //Si le joueur sélectionne se défendre encaisse 50% de dégâts en moins qu’en temps normal
            if (this.passivePlayer.action === "defend") {
                this.passivePlayer.score -= Math.round(this.activePlayer.weapon.force / 2);
            } else {
                this.passivePlayer.score -= this.activePlayer.weapon.force;
            }

            $('.' + this.passivePlayer.nickname + '_score').text(`${this.passivePlayer.score}`);

            if (this.passivePlayer.score <= 0) {
                $("#turnplayer").html("<h2> Victoire de " + this.activePlayer.name + "</h2>");
                $(".attack").hide();
                $(".defense").hide();
                $('.' + this.passivePlayer.nickname + '_score').text('0');

            } else {
                $('.attack').off('click');
                $('.defense').off('click');
                this.turnbased();
                this.battle();
            }

        })

        $(".defense").on("click", event => {
            this.activePlayer.action = 'defend';
            $('.attack').off('click');
            $('.defense').off('click');
            this.turnbased();
            this.battle();
        })
    }

    reload() {
        $(".reload").on("click", event => {
            location.reload();
        })

    }


}

//
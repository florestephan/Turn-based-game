class Weapons {
    constructor(name, force) {
        this.name = name
        this.force = force
    }

    // Initialisation des armes


    initWeapon() {
        const weaponarray = $('.cells').toArray();;
        const weaponsPosition = weaponarray[Math.floor(Math.random() * weaponarray.length)];
        $(weaponsPosition).attr('class', this.name);
    }
}

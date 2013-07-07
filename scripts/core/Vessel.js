/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {

    if (typeof name != 'undefined' && typeof position != 'undefined' && typeof capacity != 'undefined') {
        this._name = name;
        this._position = position;
        this._capacity = capacity;
        this._load = 0;
        this._landed = false;
        this._landedOn = null;
    }
    else {
        throw new Error('Not all parameters passed to the Vessel constructor');
    }


}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {

    var consoleString = 'Грузовой корабль ' + this._name + '. ';

    consoleString += 'Местоположение: ';
    if (this.isLanded()) {
        consoleString += this._landedOn.getName();
    }
    else {
        consoleString += this._position.toString();
    }
    consoleString += '. ';

    if (this.getOccupiedSpace() == 0) {
        consoleString += 'Товаров нет.'
    }
    else {
        consoleString += 'Груз: ' + this._load + 'т.';
    }
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    var freeSpace = this._capacity - this._load;
    console.log(freeSpace + 'т');

    return freeSpace;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    console.log(this._load + 'т');

    return this._load;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.loadCargo
 * @param {Number} Number of cargo to append
 * @return {Number} Текущая загруженность корабля
 */
Vessel.prototype.loadCargo = function (cargo) {
    if (!this._landed) {
        throw new Error("The vessel is no landed");
    }
    if (cargo > this.getFreeSpace()) {
        throw new Error("Not enough space in the vessel to load the cargo");
    }
    this._load += cargo;

    return this._load;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.unloadCargo
 * @param {Number} Number of cargo to remove (optional)
 * @return {Number} Текущая загруженность корабля
 */
Vessel.prototype.unloadCargo = function (cargo) {
    if (!this._landed) {
        throw new Error("The vessel is no landed");
    }

    if (typeof cargo != 'undefined') {
        if (cargo > this.getOccupiedSpace()) {
            throw new Error("Amount of cargo to unload is too large");
        }
        this._load -= cargo;
    }
    else {
        // removing all the cargo
        this._load = 0;
    }

    return this._load;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    this._landed = false;
    this._landedOn = null;

    if (_.isArray(newPosition)) {
        this._position = newPosition;
    }
    else if (_.isObject(newPosition)) {
        this._position = newPosition.getPosition();
    }
    else {
        throw new Error('Unrecognized parameter type. It\'s neither Array nor Object');
    }

    return this._position;
}

/**
 * Проверяет, приземлился ли корабль на заданной планете. Если планета не передана, проверяет, приземлился ли вообще.
 * @param {Planet} Планета. (Опциональный)
 */
Vessel.prototype.isLanded = function (planet) {
    if (!this._landed) {
        return false;
    }

    if (typeof planet !== 'undefined') {
        if (planet.constructor != Planet) {
            throw new Error('Parameter planet has wrong type');
        }

        var planetPosition = planet.getPosition();
        var vesselPosition = this._position;
        if (planetPosition.length != vesselPosition.length) {
            throw new Error('Number of position dimensions are different');
        }

        for (var i = 0; i < planetPosition.length; i++) {
            if (planetPosition[i] != vesselPosition[i]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Приземляет корабль на планете.
 * @param {Planet} Планета (Опциональный)
 */
Vessel.prototype.landTo = function (planet) {
    if (typeof planet === 'undefined' || planet.constructor !== Planet) {
        throw new Error('Planet is not specified or it\'s type is not correct');
    }

    if (this._landed) {
        throw new Error('The vessel is already landed');
    }

    var planetPosition = planet.getPosition();
    var vesselPosition = this._position;
    if (planetPosition.length != vesselPosition.length) {
        throw new Error('Number of position dimensions are different');
    }

    for (var i = 0; i < planetPosition.length; i++) {
        if (planetPosition[i] != vesselPosition[i]) {
            throw new Error('The vessel needs to fly to a planet prior to land on it');
        }
    }

    this._landed = true;
    this._landedOn = planet;

    return true;
}

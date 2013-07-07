
/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    if (typeof name != 'undefined' && typeof position != 'undefined' && typeof availableAmountOfCargo != 'undefined') {
        this._name = name;
        this._position = position;
        this._availableCargo = availableAmountOfCargo;
    }
    else {
        throw new Error('Not all parameters passed to the Planet constructor');
    }
}

/**
 * Возвращает имя планеты
 * @name Planet.getName
 */
Planet.prototype.getName = function () {
    return this._name;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    console.log('Планета: ' + this._name +
        '. Местоположение: ' + this._position.toString() +
        '. Доступно груза: ' + this._availableCargo + 'т.');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Planet.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return this._availableCargo;
}

/**
 * Возвращает позицию планеты.
 * @name Planet.getPosition
 */
Planet.prototype.getPosition = function () {
    return this._position;
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if (!vessel.isLanded(this)) {
        throw new Error('The vessel isn\'t landed on the planet');
    }

    try {
        if (cargoWeight > this._capacity) {
            throw new Error('Cargo weight is bigger then a planet capacity');
        }
        vessel.loadCargo(cargoWeight);
        this._capacity -= cargoWeight;
    }
    catch (Error) {
        console.error("Can't load cargo to the vessel");
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if (!vessel.isLanded(this)) {
        throw new Error('The vessel isn\'t landed on the planet');
    }

    try {
        vessel.unloadCargo(cargoWeight);
        this._capacity += cargoWeight;
    }
    catch (Error) {
        console.error("Can't unload cargo from the vessel");
    }

}


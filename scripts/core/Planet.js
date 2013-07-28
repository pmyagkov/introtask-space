
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

/*
 * Обработчик, который будет вызываться при вызове метода report
 * */
Planet.onReport = function () {};

/**
 * Возвращает префикс строки для формирования вывода.
 * @name getReportPrefix
 */
Planet.prototype.getReportPrefix = function () {
    return 'Планета ' + this._name + '. ';
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
    var reportString = 'Планета "' + this._name
        + '". Местоположение: ' + this._position.toString()
        + (this._availableCargo > 0 ? '. Доступно груза: ' + this._availableCargo + 'т.' : '. Грузов нет.');

    if (typeof Planet.onReport === 'function') {
        Planet.onReport.call(this, reportString);
    }

    console.info(reportString);
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Planet.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    console.debug(this.getReportPrefix() + 'Груза осталось: ' + this._availableCargo + 'т.');

    return this._availableCargo;
}

/**
 * Возвращает позицию планеты.
 * @name Planet.getPosition
 */
Planet.prototype.getPosition = function () {
    console.debug(this.getReportPrefix() + 'Местоположение: [' + this._position + '].');

    return this._position;
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargo Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargo) {
    var msg;

    if (cargo > this._availableCargo) {
        msg = this.getReportPrefix() + 'Количество груза для загрузки превышает имеющийся на планете.';
        log.error(msg);
        throw new Error(msg);
    }
    vessel.loadCargo(cargo);
    this._availableCargo -= cargo;

    console.debug(this.getReportPrefix() + cargo + 'т груза загружено на корабль ' + vessel.getName() + '. Загруженность: ' + this._availableCargo + 'т.');

    return this._availableCargo;
}

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargo Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargo) {
    vessel.unloadCargo(cargo);
    this._availableCargo += cargo;

    console.debug(this.getReportPrefix() + cargo + 'т груза отгружено с корабля ' + vessel.getName() + '. Загруженность: ' + this._availableCargo + 'т.');

    return this._availableCargo;
}


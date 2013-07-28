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

/*
* Обработчик, который будет вызываться при вызове метода report
* */
Vessel.onReport = function () {};

/**
 * Возвращает префикс строки для формирования вывода.
 * @name getReportPrefix
 */
Vessel.prototype.getReportPrefix = function () {
    return 'Корабль "' + this._name + '". ';
}

/**
 * Возвращает имя корабля
 * @name getName
 */
Vessel.prototype.getName = function () {
    return this._name;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var reportString = this.getReportPrefix();

    reportString += 'Местоположение: ';
    if (this.isLanded()) {
        reportString += this._landedOn.getName();
    }
    else {
        reportString += this._position.toString();
    }
    reportString += '. ';

    if (this.getOccupiedSpace() == 0) {
        reportString += 'Товаров нет.'
    }
    else {
        reportString += 'Груз: ' + this._load + 'т.';
    }

    if (typeof Vessel.onReport === 'function') {
        Vessel.onReport.call(this, reportString);
    }

    console.info(reportString);
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    var freeSpace = this._capacity - this._load;

    var consoleString = this.getReportPrefix();
    console.debug(consoleString + 'Свободного места: ' + (freeSpace > 0 ? freeSpace + 'т' : 'нет'));

    return freeSpace;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    var consoleString = this.getReportPrefix();
    console.debug(consoleString + 'Загруженность: ' + (this._load > 0 ? this._load + 'т' : 'нет'));

    return this._load;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.loadCargo
 * @param {Number} Number of cargo to append
 * @return {Number} Текущая загруженность корабля
 */
Vessel.prototype.loadCargo = function (cargo) {
    var msg;

    if (!this._landed) {
        msg = this.getReportPrefix() + 'Корабль не приземлен, загрузка не может быть произведена.';
        console.error(msg);
        throw new Error(msg);
    }
    if (cargo > this.getFreeSpace()) {
        msg = this.getReportPrefix() + 'В корабле недостаточно свободного места для загрузки ' + cargo + 'т груза.';
        console.error(msg)
        throw new Error(msg);
    }
    this._load += cargo;
    msg = this.getReportPrefix() + cargo + 'т загружены. Загруженность: ' + this._load + 'т.';
    console.debug(msg);

    return this._load;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.unloadCargo
 * @param {Number} Number of cargo to remove (optional)
 * @return {Number} Текущая загруженность корабля
 */
Vessel.prototype.unloadCargo = function (cargo) {
    var msg;

    if (!this._landed) {
        msg = this.getReportPrefix() + 'Корабль не приземлен. Отгрузка не может быть произведена';
        console.error(msg);
        throw new Error(msg);
    }

    if (typeof cargo != 'undefined') {
        if (cargo > this.getOccupiedSpace()) {
            msg = this.getReportPrefix() + 'Корабль не может отгрузить ' + cargo + 'т груза.';
            console.error(msg);
            throw new Error(msg);
        }
        msg = this.getReportPrefix() + cargo + 'т отгружены. Загруженность: ' + this._load + 'т.';
        this._load -= cargo;
        console.debug(msg);
    }
    else {
        msg = this.getReportPrefix() + cargo + 'т отгружены. Корабль пуст.';
        this._load = 0;
        console.debug(msg);
    }

    return this._load;
}

/**
 * Переносит корабль в указанную точку. Если передана планета, то корабль приземляется на нее.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    var msg;

    this._landed = false;
    this._landedOn = null;

    if (_.isArray(newPosition)) {
        this._position = newPosition;
        console.debug(this.getReportPrefix() + 'Корабль переместился на позицию [' + newPosition.toString() + '].');
    }
    else if (_.isObject(newPosition)) {
        this._position = newPosition.getPosition();
        console.debug(this.getReportPrefix() + 'Корабль прилетел к планете ' + newPosition.getName() + '.');
        this.landTo(newPosition);
    }
    else {
        msg = 'Неожиданный тип параметра. Должен быть либо Array, либо Object.';
        console.error(msg);
        throw new Error(msg);
    }

    return this._position;
}

/**
 * Проверяет, приземлился ли корабль на заданной планете. Если планета не передана, проверяет, приземлился ли вообще.
 * @param {Planet} Планета. (Опциональный)
 */
Vessel.prototype.isLanded = function (planet) {
    var msg;
    var result = true;

    if (!this._landed) {
        result = false;
    }

    if (typeof planet !== 'undefined') {
        if (planet.constructor != Planet) {
            msg = 'Неожиданный тип параметра. Должен быть Planet.';
            console.error(msg);
            throw new Error(msg);
        }

        var planetPosition = planet.getPosition();
        var vesselPosition = this._position;
        if (planetPosition.length != vesselPosition.length) {
            msg = 'Количество измерений массива местаположения корабля и планеты различны.';
            console.error(msg);
            throw new Error(msg);
        }

        for (var i = 0; i < planetPosition.length; i++) {
            if (planetPosition[i] != vesselPosition[i]) {
                result = false;
            }
        }
    }

    console.debug(this.getReportPrefix() + 'Корабль ' + (result ? '' : 'не ') + 'приземлен.');
    return result;
}

/**
 * Приземляет корабль на планете.
 * @param {Planet} Планета (Опциональный)
 */
Vessel.prototype.landTo = function (planet) {
    var msg;

    if (typeof planet === 'undefined' || planet.constructor !== Planet) {
        msg = 'Планета не передата или имеет неверный тип.'
        console.error(msg)
        throw new Error(msg);
    }

    if (this._landed) {
        msg = this.getReportPrefix() + 'Корабль уже приземлен.'
        console.error(msg);
        throw new Error(msg);
    }

    var planetPosition = planet.getPosition();
    var vesselPosition = this._position;
    if (planetPosition.length != vesselPosition.length) {
        msg = 'Количество измерений массива местаположения корабля и планеты различны.';
        console.error(msg);
        throw new Error(msg);
    }

    for (var i = 0; i < planetPosition.length; i++) {
        if (planetPosition[i] != vesselPosition[i]) {
            msg = 'Чтобы приземлиться на планету, кораблю сначала необходимо до нее долететь.';
            console.error(msg);
            throw new Error(msg);
        }
    }


    console.debug(this.getReportPrefix() + 'Корабль приземлился на планету ' + planet.getName() + '.');

    this._landed = true;
    this._landedOn = planet;

    return true;
}

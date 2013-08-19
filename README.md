# Задача из анкеты для поступления в Школу Разработки Интерфейсов Яндекса 2013

Вы — пилот грузового межгалактического корабля. Вашей работой является перевозка грузов с одной планету на другую. Грузоподъемность вашего корабля ограничена, поэтому за один рейс вы можете перевезти не более N кг полезного груза. Ваш корабль умеет сообщать свое состояние (местоположение и степень загруженности), а также летать в любую точку пространства или на любую планету. Каждая планета может содержать на себе груз, который может быть погружен на корабль или выгружен обратно на планету.

## Задание

В файле [task.js](task.js) дан интерфейс корабля и планеты. Эти интерфейсы не являются завершенными и скорее всего потребуют доработки. Напишите недостающий код.

## Пример использования

Перевоз 1000т груза с планеты B на планету A.

```js
var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 4500т.
```

#Комментарии

При разработке были написаны тесты (библиотека Jasmine.js) и интерактивная страница, где можно вводить код работы корабля.


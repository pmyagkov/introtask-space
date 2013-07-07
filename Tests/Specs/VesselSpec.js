describe('A vessel', function () {
    var vessel;
    var planet;

    beforeEach(function () {
        vessel = new Vessel('Test Vessel', [0,0], 1000);
        planet = new Planet('Test Planet', [100, 90], 5000);
    });


    it('should be able to fly', function () {
        expect(vessel.flyTo([10, 10])).toEqual([10,10]);
    });

    it('should not be able to land on a planet without preliminary joining', function () {
        expect(function () { vessel.landTo(planet); }).toThrow();
    });

    it('should not be able to land at the second time at once', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet)
        expect(function () { vessel.landTo(planet); }).toThrow();
    });

    it('should not be able to land on the planet with different position', function () {
        vessel.flyTo([10, 10]);
        expect(function () { vessel.landTo(planet); }).toThrow();
    });

    it('should be able to land on a planet', function () {
        vessel.flyTo(planet);
        expect(function () { vessel.landTo(planet); }).not.toThrow();
    });

    it('should not be able to load cargo in space', function () {
        vessel.flyTo([1,1]);
        expect(function () {vessel.loadCargo(1000);}).toThrow();
    });

    it('should not be able to load cargo more then it\'s capacity', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet);
        expect(function () {vessel.loadCargo(1001);}).toThrow();
    });

    it('should not be able to load cargo more then it\'s capacity (already loaded with something)', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet);
        vessel.loadCargo(200);
        expect(function () {vessel.loadCargo(1001);}).toThrow();
    });

    it('should be able to load normal amount of cargo', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet);
        vessel.loadCargo(200);
        expect(vessel.loadCargo(600)).toEqual(800);
    });

    it('should not be able to unload cargo in space', function () {
        vessel.flyTo([1,1]);
        expect(function () {vessel.unloadCargo(1000);}).toThrow();
    });

    it('should not be able to unload cargo more then it has', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet);
        vessel.loadCargo(200);
        expect(function () {vessel.unloadCargo(300);}).toThrow();
    });

    it('should be able to unload normal amount of cargo', function () {
        vessel.flyTo(planet);
        vessel.landTo(planet);
        vessel.loadCargo(200);
        expect(vessel.unloadCargo(100)).toEqual(100);
    });

});

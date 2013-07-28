describe('A planet', function () {
    var vessel;
    var planet;

    beforeEach(function () {
        vessel = new Vessel('Test Vessel', [0,0], 1000);
        planet = new Planet('Test Planet', [100, 90], 500);

        vessel.flyTo(planet);
        vessel.landTo(planet);
    });

    it('should not be able to load cargo over a planet\'s capacity', function () {
        planet.loadCargoTo(vessel, 400);
        expect(function () { planet.loadCargoTo(vessel, 200); }).toThrow();
    });


    it('should be able to load cargo', function () {
        planet.loadCargoTo(vessel, 400);
        expect(function () { planet.loadCargoTo(vessel, 200); }).toThrow();
    });

    it('should be able to unload cargo', function () {
        expect(planet.loadCargoTo(vessel, 500)).toEqual(500);
        expect(planet.unloadCargoFrom(vessel, 400)).toEqual(400);
    });
});
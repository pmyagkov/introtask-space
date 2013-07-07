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

    it('should be able to land on a planet', function () {
        vessel.flyTo(planet);
        expect(function () { vessel.landTo(planet); }).not.toThrow();
    });

});

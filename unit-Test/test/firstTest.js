
const assert = require('chai').assert;
const expect = require('chai').expect;
const libs = require('./../app/calculator');

//=>--------------------- subject test => describe()
//=>--------------------- create test => function it()

//>--------------------- create first test

describe('Calculator Test', function () {
    it("returns 1 + 1 = 2", function () {

        //>-------- TDD test

        assert.strictEqual(libs.cal(1, 1), 2);

        //>-------- BDD Test

        expect(libs.cal(1, 1)).to.equal(2);
    });
});

describe('Calculator Test2', () => {
    it("returns 5 + 5 !== 15", () => {

        //>-------- BDD Test

        expect(libs.cal(5, 5)).to.not.equal(15);

    });
});

//>---------------------- test for method callback , Promise , async  

describe('async Test', () => {

    //>-------------------------- test for callback 

    it('callback: eventually returns the results', (done) => {

        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const filter = (item) => item % 2 == 0;

        libs.delayedFilterWithCallback(input, filter, (result) => {

            assert.deepEqual(result, [2, 4, 6, 8]); // deepEqual for array and object

            done(); // To perform set time operations on callbacks 

        });

    });

    //>-------------------------- test for promise 

    it('promise: eventually returns the results', () => {

        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const filter = (item) => item % 2 == 1;

        return libs.delayedFilterWithPromise(input, filter).then(result => {

            assert.deepEqual(result, [1, 3, 5, 7, 9]); // deepEqual for array and object

        });

    });

    //>-------------------------- test for async 

    it('async: eventually returns the results', async () => {

        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const filter = (item) => item % 2 == 1;

        const result = await libs.delayedFilterWithAsync(input, filter);

        assert.deepEqual(result, [1, 3, 5, 7, 9]); // deepEqual for array and object

        //>-------- BDD Test

        expect(result).to.deep.equal([1, 3, 5, 7, 9]);



    });

});

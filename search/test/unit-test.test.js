const assert = require ('chai').assert;

function sum(ab) {
    return a+b;
}

describe('Prueba unitaria ejemplo', () => {
    it('Deberia retornar 4', () => {
        let va = sum(2,2);
        assert.equal(va,5);
    })
})
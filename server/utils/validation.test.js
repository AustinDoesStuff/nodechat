const expect = require('expect');

const {isRealString} = require('./validation');

describe('Validating String Input', () => {
    it('should reject nonstring values', () => {
        var str = 1234;
        expect(isRealString(str)).toBe(false);
    });

    it('should reject white space only strings', () => {
        var str = '    ';
        expect(isRealString(str)).toBe(false);
    });

    it('should allow strings with whitespace characters', () => {
        var str = 'Austin Tanner';
        expect(isRealString(str)).toBe(true);
    });
});
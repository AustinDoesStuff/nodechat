var expect = require('expect');

const {generateMessage} = require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        var newMessage = generateMessage('austin', 'hello');

        expect(newMessage.from).toBe('austin');
        expect(newMessage.text).toBe('hello');
        expect(newMessage.createdAt).toBeA('number');
    });
});
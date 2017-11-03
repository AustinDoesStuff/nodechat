var expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        var newMessage = generateMessage('austin', 'hello');

        expect(newMessage.from).toBe('austin');
        expect(newMessage.text).toBe('hello');
        expect(newMessage.createdAt).toBeA('number');
    });
});

describe('Generate Location Message', () => {
    it('should generate new location message object', () => {
        var newMessage = generateLocationMessage('austin', 1, 1);

        expect(newMessage.from).toBe('austin');
        expect(newMessage.url).toBe('https://google.com/maps?q=1,1');
        expect(newMessage.createdAt).toBeA('number');
    });
});
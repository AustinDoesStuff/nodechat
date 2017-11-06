const expect = require('expect');

const {Users} = require('./users');

var users;

beforeEach(() => {
    users = new Users();
    users.users = [{
        id: 1,
        name: 'Austin',
        room: 'Married Life'
    }, {
        id: 2,
        name: 'Brady',
        room: 'Dank Life'
    }, {
        id: 3,
        name: 'Morgan',
        room: 'Married Life'
    }];
});

describe('Users', () => {

    describe('Add user', () => {
        it('should add new user', () => {
            var users = new Users();
            var user = {
                id: 123,
                name: 'Morgan',
                room: 'Married Life'
            };

            var resUser = users.addUser(user.id, user.name, user.room);

            expect(users.users).toEqual([user]);
        });
    });

    describe('Remove user', () => {
        it('should remove a user', () => {
            var user = users.removeUser(1);

            expect(user.id).toBe(1);
            expect(users.users.length).toBe(2);
        });

        it('should not remove user', () => {
            //pass in false id
            //array should not change
        });
    });

    describe('Find Users', () => {
        it('should find user', () => {
            var foundUser = users.getUser(1);
            expect(foundUser.id).toBe(1);
        });

        it('should not find user', () => {
            var foundUser = users.getUser(44);
            expect(foundUser).toNotExist();
        });
    });

    describe('Get user list', () => {
        it('should return names for Married Life', () => {
            var userList = users.getUserList('Married Life');
            expect(userList).toEqual(['Austin', 'Morgan']);
        });

        it('should return names for Dank Life', () => {
            var userList = users.getUserList('Dank Life');
            expect(userList).toEqual(['Brady']);
        });
    });
});
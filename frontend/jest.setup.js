require('@testing-library/jest-dom');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/users').reply(200, [
  { id: 1, username: 'admin1', role: 'admin' },
  { id: 2, username: 'volunteer1', role: 'volunteer' },
]);
mock.onPost('/api/login').reply(200, { token: 'mock_token', role: 'admin' });

// we could use some error handling here for the mocks, can just gpt this
// I'll leave this for a backlog item

globalThis.__MOCK_AXIOS__ = mock; // test cleanup for state consistency

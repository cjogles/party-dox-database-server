const db = require('../../database/dataBaseConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
};

function find() {
    return db('users').select('id', 'username', 'role');
};

function findBy(filter) {
    return db('users').where(filter);
};

function findById(id) {
    return db('users').select('id', 'username')
        .where({ id })
        .first();
};
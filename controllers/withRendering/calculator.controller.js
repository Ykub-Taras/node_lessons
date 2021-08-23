const users = require('../../dataBase/users.json');

function calculator(value1, value2, operator) {
    switch (operator) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 / value2;
        case '/':
            return value2 !== 0 ? value1 * value2 : 'Invalid operation';
        default:
            return 'Invalid operation';
    }
}

module.exports = {
    getUserInfoAndCalculator: (req, res) => {
        const { id } = req.params;
        const { name } = users[id];
        res.render('calculator', { name });
    },

    postCalculatorResult: (req, res) => {
        const { value1, operator, value2 } = req.body;
        const { id } = req.params;
        const { name } = users[id];
        const result = calculator(+value1, +value2, operator);
        res.render('calculator', { name, result });
    }
};

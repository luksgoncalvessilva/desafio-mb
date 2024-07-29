const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

function isValidCpf(cpf) {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.substring(10, 11))) return false;

    return true;
}

function isValidCnpj(cnpj) {
    const cleanedCnpj = cnpj.replace(/\D/g, '');
    if (cleanedCnpj.length !== 14) return false;

    let length = cleanedCnpj.length - 2;
    let numbers = cleanedCnpj.substring(0, length);
    const digits = cleanedCnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) return false;

    length += 1;
    numbers = cleanedCnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
}

app.post('/api/submit', (req, res) => {
    const { email, personType, name, cpf, cnpj, birthDate, phone, password } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }

    if (!['Pessoa Física', 'Pessoa Jurídica'].includes(personType)) {
        return res.status(400).json({ error: 'Tipo de pessoa inválido.' });
    }

    if (personType === 'Pessoa Física' && !isValidCpf(cpf)) {
        return res.status(400).json({ error: 'CPF inválido.' });
    }
    if (personType === 'Pessoa Jurídica' && !isValidCnpj(cnpj)) {
        return res.status(400).json({ error: 'CNPJ inválido.' });
    }

    if (isNaN(Date.parse(birthDate))) {
        return res.status(400).json({ error: 'Data de nascimento inválida.' });
    }

    const phonePattern = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        return res.status(400).json({ error: 'Telefone inválido - (XX) X XXXX-XXXX' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    return res.status(200).json({ message: 'Dados recebidos com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

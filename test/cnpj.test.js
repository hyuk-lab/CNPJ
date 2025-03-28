const request = require('supertest');
const app = require('../app');

describe('TEST COM CNPJ', () => {
    it('Teste da Consulta', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<h1>Consulta de CNPJ</h1>');
    });

    it('Deve retornar um erro por cnpj com menos de 14 digitos', async () => {
        const cnpj = '00.808.396/0003-6';
        const response = await request(app)
            .get('/consultar/')
            .query({ cnpj });
        
        expect(response.statusCode).toBe(404);
    });

    it('Deve retornar um erro por conter caracter', async () => {
        const cnpj = '00.808.396/0003-AB';
        const response = await request(app)
            .get('/consultar/')
            .query({ cnpj });
        
        expect(response.statusCode).toBe(404);
    });

    it('Deve retornar erro por cnpj mal formatado', async () => {
        const cnpj = '12.345.678/1234-5';
        const response = await request(app)
            .get('/consultar/')
            .query({ cnpj });
        
        expect(response.statusCode).toBe(404);
    });
});

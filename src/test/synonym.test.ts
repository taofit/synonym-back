import request from 'supertest';
import { app } from '../server';

describe('Synonym API', () => {
    it('should save a list of synonyms for big', async () => {
        const response = await request(app).post('/synonym').send(['large', 'huge', 'giant', 'big', 'big']);
        expect(response.status).toBe(201);
        expect(response.body).toBe('Synonyms created');
    });
    it('should return a list of synonyms', async () => {
        const response = await request(app).get('/synonym/big');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(['large', 'huge', 'giant', 'big']);
    });

    it('should return No synonyms found when searching synonym for small', async () => {
        const response = await request(app).get('/synonym/small');
        expect(response.status).toBe(200);
        expect(response.body).toBe('No synonyms found');
    });
    it('should return No synonyms found when updating synonym for small', async () => {
        const response = await request(app)
            .put('/synonym')
            .send({ word: 'small', newSynonyms: ['tiny'] });
        expect(response.status).toBe(200);
        expect(response.body).toBe('No synonyms found');
    });

    it('should return an error if the input is invalid', async () => {
        const response = await request(app).put('/synonym').send({ word: 'big' });
        expect(response.status).toBe(500);
        expect(response.body).toBe('Invalid input');
    });

    it('should save a list of synonym', async () => {
        const response = await request(app).post('/synonym').send(['great', 'extensive', 'sizable', 'immense']);
        expect(response.status).toBe(201);
        expect(response.body).toBe('Synonyms created');
    });
    it('should save a list of synonym', async () => {
        const response = await request(app).post('/synonym').send(['big', 'great']);
        expect(response.status).toBe(201);
        expect(response.body).toBe('Synonyms created');
    });
    it('should return a list of synonyms', async () => {
        const response = await request(app).get('/synonym/great');
        expect(response.status).toBe(200);
        expect(response.body.sort()).toEqual(['great', 'extensive', 'sizable', 'immense', 'big', 'huge', 'giant', 'large'].sort());
    });
    it('should update a list of synonyms', async () => {
        const response = await request(app)
            .put('/synonym')
            .send({ word: 'big', newSynonyms: ['massive'] });
        expect(response.status).toBe(200);
        expect(response.body).toBe('Synonyms updated');
    });
    it('should return a list of synonyms', async () => {
        const response = await request(app).get('/synonym/big');
        expect(response.status).toBe(200);
        expect(response.body.sort()).toEqual(['massive', 'big'].sort());
    });
    it('should save a list of synonym for ham', async () => {
        const response = await request(app).post('/synonym').send(['ham', 'pork', 'bacon']);
        expect(response.status).toBe(201);
        expect(response.body).toBe('Synonyms created');
    });
    it('should save a list of synonym for vast', async () => {
        const response = await request(app).post('/synonym').send(['vast', 'great']);
        expect(response.status).toBe(201);
        expect(response.body).toBe('Synonyms created');
    });
    it('should update a list of synonyms for vast', async () => {
        const response = await request(app)
            .put('/synonym')
            .send({ word: 'vast', newSynonyms: ['big', 'giant'] });
        expect(response.status).toBe(200);
        expect(response.body).toBe('Synonyms updated');
    });
    it('should return a list of synonyms for vast', async () => {
        const response = await request(app).get('/synonym/vast');
        expect(response.status).toBe(200);
        expect(response.body.sort()).toEqual(['vast', 'big', 'giant', 'massive'].sort());
    });
    it('should return No synonyms found for word great', async () => {
        const response = await request(app).get('/synonym/great');
        expect(response.status).toBe(200);
        expect(response.body).toBe('No synonyms found');
    });
});

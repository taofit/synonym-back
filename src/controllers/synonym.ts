import { Request, Response, NextFunction } from 'express';
import Synonym from '../services/synonym';
import logging from '../library/logging';

const createSynonym = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await Synonym.createSynonyms(req.body);

        return res.status(201).json(resp);
    } catch (error: unknown) {
        logging.error(error);

        return res.status(500).json(error);
    }
};

const getSynonyms = async (req: Request, res: Response) => {
    try {
        const { word } = req.params;
        const synonyms = await Synonym.getSynonyms(word);
        if (synonyms === 'No synonyms found') {
            return res.status(404).json(synonyms);
        }
        res.status(200).json(synonyms);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllSynonyms = async (req: Request, res: Response) => {
    try {
        const synonyms = await Synonym.getAllSynonyms();
        if (synonyms === 'No synonyms found') {
            return res.status(404).json(synonyms);
        }
        res.status(200).json(synonyms);
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateSynonym = async (req: Request, res: Response) => {
    try {
        const { word, newSynonyms } = req.body;
        const synonyms = await Synonym.updateSynonyms(word, newSynonyms);
        if (synonyms === 'No synonyms found') {
            return res.status(404).json(synonyms);
        }
        res.status(200).json(synonyms);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { createSynonym, getSynonyms, updateSynonym, getAllSynonyms };

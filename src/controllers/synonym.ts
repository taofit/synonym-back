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
        const synonyms = await Synonym.getSynonyms(req.params);
        res.status(200).json(synonyms);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateSynonym = async (req: Request, res: Response) => {
    try {
        const synonyms = await Synonym.updateSynonyms(req.body);
        res.status(200).json(synonyms);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { createSynonym, getSynonyms, updateSynonym };

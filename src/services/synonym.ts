import { Request, Response, NextFunction, ParamsDictionary } from 'express-serve-static-core';
import logging from '../library/logging';

//each synonymsGroup consists of a collection of synonyms words
type synonymsGroup = Set<string>;
//storage for all synonyms groups
let synonymsStorage: synonymsGroup[] = [];

const createSynonyms = async (synonymCollection: Request['body']) => {
    return new Promise((resolve, reject) => {
        if (isValidSynonymCollection(synonymCollection)) {
            const newSynonymSet = new Set<string>(synonymCollection);
            const matchingSynonymGroupsIndexSet = getMatchingSynonymsGroupIndices(newSynonymSet);

            if (!!matchingSynonymGroupsIndexSet.size) {
                combineSynonyms(matchingSynonymGroupsIndexSet, newSynonymSet);
            } else {
                synonymsStorage.push(newSynonymSet);
            }
            resolve('Synonyms created');
        } else {
            reject('Invalid input');
        }
    });
};

const getSynonyms = async (reqPara: ParamsDictionary) => {
    return new Promise((resolve, reject) => {
        const { word } = reqPara;
        if (typeof word !== 'undefined') {
            const synonymGroupIndex = getSynonymsGroupIdx(word);
            if (synonymGroupIndex !== -1) {
                resolve([...synonymsStorage[synonymGroupIndex]]);
            } else {
                resolve('No synonyms found');
            }
        } else {
            reject('Invalid input');
        }
    });
};

const getAllSynonyms = async () => {
    return new Promise((resolve) => {
        if (synonymsStorage.length) {
            const allSynonyms: string[] = [];
            synonymsStorage.forEach((synonymsGroup) => {
                synonymsGroup.forEach((synonym) => allSynonyms.push(synonym));
            });

            resolve(allSynonyms);
        } else {
            resolve('No synonyms found');
        }
    });
};

const updateSynonyms = async (reqObj: Request['body']) => {
    return new Promise((resolve, reject) => {
        const { word, newSynonyms } = reqObj;
        if (typeof word !== 'undefined' && isValidStringArr(newSynonyms)) {
            const baseWordSynonymGroupIndex = getSynonymsGroupIdx(word);

            if (baseWordSynonymGroupIndex !== -1) {
                const currentSynonyms = synonymsStorage[baseWordSynonymGroupIndex];
                const newSynonymSet = new Set<string>(newSynonyms);
                currentSynonyms.forEach((synonym) => newSynonymSet.delete(synonym));

                const matchingSynonymGroupsIndexSet = getMatchingSynonymsGroupIndices(newSynonymSet);
                if (!!matchingSynonymGroupsIndexSet.size) {
                    const existingSynonymSet = combineExistingSynonymGroups(matchingSynonymGroupsIndexSet);
                    synonymsStorage[baseWordSynonymGroupIndex] = new Set([...existingSynonymSet, ...newSynonyms, word]);
                    synonymsStorage = synonymsStorage.filter((_, index) => !matchingSynonymGroupsIndexSet.has(index));
                } else {
                    synonymsStorage[baseWordSynonymGroupIndex] = new Set([...newSynonyms, word]);
                }

                resolve('Synonyms updated');
            } else {
                resolve('No synonyms found');
            }
        } else {
            reject('Invalid input');
        }
    });
};

const isValidSynonymCollection = (synonymCollection: any): boolean => Array.isArray(synonymCollection) && synonymCollection.length > 1 && synonymCollection.every((item) => typeof item === 'string');

const isValidStringArr = (arr: any): boolean => Array.isArray(arr) && arr.length > 0 && arr.every((item) => typeof item === 'string');

//check if a word exists in current synonyms storage
const getSynonymsGroupIdx = (word: string): number => {
    for (const [index, synonymsGroup] of synonymsStorage.entries()) {
        if (synonymsGroup.has(word)) {
            return index;
        }
    }

    return -1;
};

const combineExistingSynonymGroups = (synonymGroupsIndexSet: Set<number>): Set<string> => {
    const newSynonymSet = new Set<string>();
    for (const index of synonymGroupsIndexSet) {
        [...synonymsStorage[index]].forEach((synonym) => newSynonymSet.add(synonym));
    }

    return newSynonymSet;
};

const getMatchingSynonymsGroupIndices = (newSynonymSet: Set<string>): Set<number> => {
    let synonymGroupIndex: number;
    const synonymGroupsIndexSet = new Set<number>();

    newSynonymSet.forEach((synonym) => {
        synonymGroupIndex = getSynonymsGroupIdx(synonym);
        if (synonymGroupIndex !== -1) {
            synonymGroupsIndexSet.add(synonymGroupIndex);
        }
    });

    return synonymGroupsIndexSet;
};

const combineSynonyms = (synonymGroupsIndexSet: Set<number>, newSynonymSet: Set<string>): void => {
    const existingSynonymSet = combineExistingSynonymGroups(synonymGroupsIndexSet);
    synonymsStorage = synonymsStorage.filter((_, index) => !synonymGroupsIndexSet.has(index));
    const unionSet = new Set([...existingSynonymSet, ...newSynonymSet]);
    synonymsStorage.push(unionSet);
};

export default { createSynonyms, getSynonyms, updateSynonyms, getAllSynonyms };

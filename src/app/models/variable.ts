import { Score } from './score';
import { Type } from './type.enum';

export class Variable {
    id?: number;
    code?: string;
    coefficient?: number;
    description?: string;
    type?: Type;
    modeleId?: number;
    scores: Score[] = [];
    responseMeaning?: string;
    response?: string;
    constructor(id?: number, code?: string, description?: string, coefficient?: number, type?: Type, scores: Score[] = [],responseMeaning?: string,response?: string) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.coefficient = coefficient;
        this.type = type;
        this.scores = scores;
        this.responseMeaning = responseMeaning;
        this.response = response;
    }
}

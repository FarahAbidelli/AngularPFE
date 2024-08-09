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

    constructor(id?: number, code?: string, description?: string, coefficient?: number, type?: Type, scores: Score[] = []) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.coefficient = coefficient;
        this.type = type;
        this.scores = scores;
    }
}

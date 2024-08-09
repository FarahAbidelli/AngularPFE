import { Type } from './type.enum';

export class Score {
    id?: number;
    score: number = 0;
    valeur?: string | number | Date;
    vmax?: number;
    vmin?: number;
    variableId?: number | null;
    type: 'ENUMERATION' | 'INTERVALE' | 'DATE' | 'NUMBER';
    num?: number;
    enumeration?: string;
    date?: Date;

    constructor(
        id?: number,
        score?: number,
        valeur?: string | number | Date,
        vmax?: number,
        vmin?: number,
        variableId?: number,
        type?: Type,
        enumeration?: string,
        date?: Date
    ) {
        this.id = id;
        this.score = score || 0;
        this.valeur = valeur;
        this.vmax = vmax;
        this.vmin = vmin;
        this.variableId = variableId;
        this.type = type || Type.ENUMERATION;
        this.enumeration = enumeration;
        this.date = date;
    }
}

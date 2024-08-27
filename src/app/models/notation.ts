import { Variable } from './variable';

export class Notation {
  id: number;
  clientId: number;
  variables: Variable[]; // Liste des variables (questions)
  scores: { [variableId: number]: number }; // Scores associés aux variables
  status: 'en cours' | 'finalisé';


   constructor(id: number, clientId: number, variables: Variable[], scores: { [variableId: number]: number }, status: 'en cours' | 'finalisé') {
    this.id = id;
    this.clientId = clientId;
    this.variables = variables;
    this.scores = scores;
    this.status = status;
  }


}

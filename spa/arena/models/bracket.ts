import * as g from '../interfaces/arena-game';

export class Bracket implements g.IBracket
{    
    Round: number;
    BracketPlayers: Array<g.IPlayer>;
    
    constructor()
    {
        this.Round = 0;
        this.BracketPlayers = new Array<g.IPlayer>();
    }

    IsFinished(): boolean { return false;}
    Fight(): void {}
    
    OnFinishDeclared(): ng.IPromise<any> { return null; }
    OnWinnerDeclared(): ng.IPromise<any> { return null; }
    OnLoserDeclared(): ng.IPromise<any> { return null; }
    OnTieDeclared(): ng.IPromise<any> { return null; }
}


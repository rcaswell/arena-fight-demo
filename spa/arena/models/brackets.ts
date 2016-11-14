import * as g from '../interfaces/arena-game';

export class Brackets implements g.IBrackets
{
    BracketA: g.IBracket;
    BracketB: g.IBracket;						
    BracketC: g.IBracket;

    constructor()
    {
        this.BracketA = null;
        this.BracketB = null;
        this.BracketC = null;
    }

    IsFinished(): boolean {return false;}
    Fight(): void {}
    
    OnChampionDeclared(): ng.IPromise<g.IPlayer> { return null; }
    OnRunnerUpDeclared(): ng.IPromise<g.IPlayer> { return null; }    
    OnBracketAWinnerDeclared(): ng.IPromise<any> { return null; }
    OnBracketBWinnerDeclared(): ng.IPromise<any> { return null; }
}


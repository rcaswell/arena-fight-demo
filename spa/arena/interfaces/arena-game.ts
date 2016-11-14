
     export interface IPlayer
    {
        Name: string;
        HP: number;
        MaxHP: number;
        ATK: number;
        DEF: number;
    }

     export interface IBracket
    {
        Round: number;
        BracketPlayers: Array<IPlayer>;
                                
        IsFinished(): boolean;
        Fight(): void;
        
        OnFinishDeclared(): ng.IPromise<any>;
        OnWinnerDeclared(): ng.IPromise<any>;
        OnLoserDeclared(): ng.IPromise<any>;
        OnTieDeclared(): ng.IPromise<any>;
    }

     export interface IBrackets
    {
        BracketA: IBracket;
        BracketB: IBracket;						
        BracketC: IBracket;
            
        OnChampionDeclared(): ng.IPromise<IPlayer>;
        OnRunnerUpDeclared(): ng.IPromise<IPlayer>;    
        OnBracketAWinnerDeclared(): ng.IPromise<any>;
        OnBracketBWinnerDeclared(): ng.IPromise<any>;
            
        IsFinished(): boolean;
        Fight(): void;
    }

     export interface ILog
    {
        LogType: any;   
    }

     export interface IAttackLog extends ILog
    {
        Attacker: IPlayer;
        Target: IPlayer;
        Amount: number;	
        IsDead: boolean; 
    }
    
    export enum LogType
    {
        NotSpecified,
        Attack
    }



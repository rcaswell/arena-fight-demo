import * as g from '../interfaces/arena-game';

export class AttackLog implements g.IAttackLog
{
    LogType: g.LogType;
    Attacker: g.IPlayer;
    Target: g.IPlayer;
    Amount: number;	
    IsDead: boolean; 

    constructor(attacker: g.IPlayer, target: g.IPlayer, amount: number)
    {            
        this.LogType = g.LogType.Attack;
        this.Attacker = attacker;
        this.Target = target;
        this.Amount = amount;	
        this.IsDead = false; 
    }
}


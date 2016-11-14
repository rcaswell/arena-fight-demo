import * as g from '../interfaces/arena-game';

export class Player implements g.IPlayer
{
    Name: string;
    HP: number;
    MaxHP: number;
    ATK: number;
    DEF: number;

    constructor(name: string, hp: number, atk: number, def: number)
    {
        this.Name = name;
        this.MaxHP = hp;
        this.HP = hp;
        this.ATK = atk;
        this.DEF = def;
    }
}


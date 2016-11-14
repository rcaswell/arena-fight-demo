
function player(name, hp, atk, def) 
{
    this.Name = name;
    this.MaxHP = hp;
    this.HP = hp;
    this.ATK = atk;
    this.DEF = def;
    this.state = "alive";
}
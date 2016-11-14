
function log(attacker, target, amount){
    this.attacker = attacker;
    this.target = target;
    this.amount = amount;	
    this.isDead = target.HP < 1;
    if (this.isDead)
        this.target.state = "dead";
}
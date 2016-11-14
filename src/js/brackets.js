function brackets($q, getRandomPlayerFromQue)
{    
    this.BracketA = new Bracket(getRandomPlayerFromQue(), getRandomPlayerFromQue());
    this.BracketB = new Bracket(getRandomPlayerFromQue(), getRandomPlayerFromQue());						
    this.BracketC = null;
    
    var _deferredRunnerUpDeclared = $q.defer();
    var _deferredChampionDeclared = $q.defer();
    
    this.onChampionDeclared = () => {
        return _deferredChampionDeclared.promise;
    };
    
    this.onRunnerUpDeclared = () => {
        return _deferredRunnerUpDeclared.promise;
    };
    
    this.onBracketAWinnerDeclared = () => {
        return this.BracketA.onWinnerDeclared();
    }
    
    this.onBracketBWinnerDeclared = () => {
        return this.BracketB.onWinnerDeclared();
    }
    
    this.isFinished = () => {			
        return (this.BracketA.isFinished()) && (this.BracketB.isFinished()) && (this.BracketC != null && this.BracketC.isFinished());
    }
    
    this.fight = () => {			
        if (!this.BracketA.isFinished()) this.BracketA.fight();
        if (!this.BracketB.isFinished()) this.BracketB.fight();				
        if (this.BracketC != null && !this.BracketC.isFinished()) this.BracketC.fight();					
    }
    
    // assumes no ties
    var bracketWinners = [
        this.BracketA.onWinnerDeclared(), 
        this.BracketB.onWinnerDeclared()
    ];
            
    $q.all(bracketWinners)
        .then((results) => {		
            this.BracketC = new Bracket(results[0].winner, results[1].winner);
            return this.BracketC;
        }).then((bracketC) => {
            return bracketC.onWinnerDeclared();
        }).then((finalist) => {
            _deferredRunnerUpDeclared.resolve(finalist.loser);
            _deferredChampionDeclared.resolve(finalist.winner);
        });			
}
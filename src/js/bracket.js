function bracket(homePlayer, awayPlayer, $q)
{
    var _homePlayer = homePlayer;
    var _awayPlayer = awayPlayer;
    
    this.round = 0;
    this.bracketPlayers = [_homePlayer, _awayPlayer];
                            
    var _deferredWinner = $q.defer();
    var _deferredLoser = $q.defer();
    var _deferredTie = $q.defer();
    var _deferredFinish = $q.defer();
    
    this.isFinished = () => { 
        return (_homePlayer.HP < 1 || _awayPlayer.HP < 1); 
    };
    
    this.fight = () => {
        this.round += 1;
        
        Attack(_homePlayer, _awayPlayer);
        Attack(_awayPlayer, _homePlayer);		
        
        if (this.isFinished())
            declareFinish();
    };
    
    this.onFinishDeclared = () => {				
        return _deferredFinish.promise;
    };
    this.onWinnerDeclared = () => {				
        return _deferredFinish.promise;
    };
    this.onLoserDeclared = () => {				
        return _deferredFinish.promise;
    };
    this.onTieDeclared = () => {				
        return _deferredFinish.promise;
    };						
    
    var declareWinnerAndLoser = (winner, loser) =>
    {
        _deferredWinner.resolve( { winner : winner, rounds : this.round });
        _deferredLoser.resolve( { loser : loser, rounds : this.round });
    }
    
    var declareTie = () =>
    {
        _deferredTie.resolve({rounds : this.round});
    }
                
    var declareFinish = () =>
    {
        if (_homePlayer.HP > 0)
        {
            _deferredFinish.resolve({rounds : this.round, wasTie : false, winner : _homePlayer, loser : _awayPlayer});
            declareWinnerAndLoser(_homePlayer, _awayPlayer);
        }
        else if (_awayPlayer.HP > 0)
        {
            _deferredFinish.resolve({rounds : this.round, wasTie : false, winner : _awayPlayer, loser : _homePlayer});
            declareWinnerAndLoser(_awayPlayer, _homePlayer);
        }
        else
        {
            _deferredFinish.resolve({rounds : this.round, wasTie : true, winner : null, loser : null});
            declareTie();
        }
    }		
}
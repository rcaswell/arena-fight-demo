import { IPromise, IScope, IIntervalService, IQService, isDefined } from 'angular';
import { IAttackLog, IPlayer, ILog, IBracket, IBrackets, LogType } from '../interfaces/arena-game';
import { AttackLog } from '../models/attackLog';
import { Player } from '../models/player';
import { Bracket } from '../models/bracket';
import { Brackets } from '../models/brackets';


export class ArenaController
{
	static $inject = ['$scope', '$interval', '$rootScope', '$q'];
	public LogType = LogType;
	
    format: string = 'MMM dd, yyyy | h:mm a (ss)';

    players: Array<IPlayer> = new Array<IPlayer>();
    logs: Array<ILog> = new Array<ILog>();
    brackets: IBrackets;
    selectedPlayer: IPlayer;
    stop: IPromise<number>;
    availablePlayers: Array<IPlayer> = new Array<IPlayer>();

    constructor(protected $scope: IScope, protected $interval: IIntervalService, protected $rootScope: any, protected $q: IQService)
    {		
		this.players.push(new Player("Brett", 120, 10, 10));
		this.players.push(new Player("Ryan", 120, 1, 120));

		this.logs.push(new AttackLog(this.players[0], this.players[1], 1000));
		this.logs.push(new AttackLog(this.players[1], this.players[0], 1));

        $scope.$on('$destroy', this.StopFight);
    }

	Fight(): any
    {
          // Don't start a new fight if we are already fighting		  
			
			if (isDefined(this.stop)) 
				return {
					getChampion : ():IPromise<any> => { return this.brackets.OnChampionDeclared().then(onFinalistHandler).catch(onErrorHandler); },					
					getRunnerUp : ():IPromise<any> => { return this.brackets.OnRunnerUpDeclared().then(onFinalistHandler).catch(onErrorHandler); },
					getBracketAWinner : ():IPromise<any> => { return this.brackets.OnBracketAWinnerDeclared().then(onBracketHandler).catch(onErrorHandler); },
					getBracketBWinner : ():IPromise<any> => { return this.brackets.OnBracketBWinnerDeclared().then(onBracketHandler).catch(onErrorHandler); }
				};
			
			this.stop = this.$interval(() => {

				this.brackets.Fight();
				if (this.brackets.IsFinished()) this.StopFight();
				
			}, 100);
			
			return {
					getChampion : ():IPromise<any> => { return this.brackets.OnChampionDeclared().then(onFinalistHandler).catch(onErrorHandler); },					
					getRunnerUp : ():IPromise<any> => { return this.brackets.OnRunnerUpDeclared().then(onFinalistHandler).catch(onErrorHandler); },
					getBracketAWinner : ():IPromise<any> => { return this.brackets.OnBracketAWinnerDeclared().then(onBracketHandler).catch(onErrorHandler); },
					getBracketBWinner : ():IPromise<any> => { return this.brackets.OnBracketBWinnerDeclared().then(onBracketHandler).catch(onErrorHandler); }
				};
			
			function onFinalistHandler(player)
			{
				console.log(player); 
				return player; 
			}
			
			function onBracketHandler(result)
			{
				console.log("winner:= %s, loser:= %s", result.winner.Name, result.loser.Name)
				return result.winner;
			}
			
			function onErrorHandler(reason)
			{
				alert(reason); 
			}
        }	

		
		StopFight() : void 
        {
          if (angular.isDefined(this.stop)) {
            this.$interval.cancel(this.stop);
            this.stop = undefined;
          }
        }
		
		ResetFight() : void
         {
			
			for (var idx = 0, max = this.players.length; idx < max; idx++)
			{
				this.players[idx].HP = 100;
			}
			
			this.brackets = null;			
        }

		SelectPlayer(player) : void 
        {
			this.selectedPlayer = player;
			console.log(this.selectedPlayer);
		};
				
		
		Run() : void {
			
			this.brackets = new Brackets();
			
			var promises = this.Fight();
			
			promises.getChampion()
				.then(alertWinner.bind(this, "the final winner is "))
				.then(applyBonus);	
				
			promises.getRunnerUp()
				.then(alertWinner.bind(this, "the runnerup is "))
				.then(applyBonus);				
				
			promises.getBracketAWinner()
				.then(alertWinner.bind(this, "the winner of Bracket A is "));			
				
			promises.getBracketBWinner()
				.then(alertWinner.bind(this, "the winner of Bracket B is "));
			
			
			function alertWinner(prefix, player)
			{				
				if (player)
				{
					alert(prefix + player.Name);
					return { winner : player, bonus :  { ATK : 1, DEF : 0 }};
				} else {
					alert(prefix + "nobody... all dead!");
					return { winner : { ATK : 0, DEF : 0 }, bonus : { ATK : 0, DEF : 0 }};
				}
			}
			
			function applyBonus(data)
			{
				data.winner.ATK += data.bonus.ATK;
				data.winner.DEF += data.bonus.DEF;
			}
		}
		
		Attack(attacker: IPlayer, target: IPlayer) : void
        {
			var currentHP = target.HP;
			target.HP = (attacker.ATK - target.DEF < 1) 
				  ? target.HP
				  : target.HP - (Math.floor(Math.random() * ((attacker.ATK - target.DEF) + 1)));
			this.logs.push(new AttackLog(attacker, target, currentHP - target.HP));
		}
				
		
		setAvailabePlayers() : void
		{			
			for (var idx = 0, max = this.players.length; idx < max; idx++)
			{
				if (this.players[idx].HP > 0)
					this.availablePlayers.push(this.players[idx]);
			}
		}
		
		getRandomPlayerFromQue() : IPlayer
		{
			var randomIndex = Math.floor(Math.random() * this.availablePlayers.length);
			var player = this.availablePlayers[randomIndex];
			this.availablePlayers.splice(randomIndex, 1);
			return player;
		}
}
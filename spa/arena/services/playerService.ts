import * as ng from 'angular';
import * as g from '../interfaces/arena-game';

export class PlayerService 
{
    static $inject = ['$http'];

    private rootUri: string;

    constructor(protected $http: ng.IHttpService) //ng.IHttpService
    {
        this.rootUri = 'api/player';
    }

    GetPlayers(): ng.IPromise<Array<g.IPlayer>>
    {
        return this.$http.get<Array<g.IPlayer>>(this.rootUri)
                .then((result) => { 
                    return result.data; 
                })
                .catch((err) => {
                    throw new Error(err);
                });
    }

    GetPlayer(id: number) : ng.IPromise<g.IPlayer>
    {
        return this.$http.get<g.IPlayer>(this.rootUri + '/{id}')
                .then((result) => { 
                    return result.data; 
                })
                .catch((err) => {
                    throw new Error(err);
                });
    }

    UpdatePlayer(player: g.IPlayer) : ng.IPromise<boolean>
    {
        return this.$http.post<void>(this.rootUri + '/{id}', player)
                .then((result) => {
                    return (result.status === 200)
                })
                .catch((err) => {
                    throw new Error(err);
                });
    }
} 
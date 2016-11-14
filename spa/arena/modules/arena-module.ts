import { ILocationProvider } from 'angular';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import { ArenaController } from '../controllers/ArenaController';
import { PlayerService } from '../services/playerService';

let modules = ['ui.router', 'ui.bootstrap'];
let app = angular.module('arena', modules);

app.controller('ArenaController', ArenaController);
app.service('PlayerService', PlayerService);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 
    ($locationProvider: ILocationProvider, $stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) =>
    {        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('base', {
                url: '/',
                views: {
                    "" : {
                        templateUrl: "./spa/arena/views/arena.html",
                        controller: 'ArenaController',
                        controllerAs: 'ctrl'
                    },
                    "players@base" : {
                        templateUrl : "./spa/arena/views/players.html",
                        controller: 'ArenaController',
                        controllerAs: 'ctrl'
                    },
                    "logger@base" : {
                        templateUrl : "./spa/arena/views/logger.html",
                        controller: 'ArenaController',
                        controllerAs: 'ctrl'
                    }
                }
            });
    }]);

app.config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

angular.bootstrap(document.getElementById("arena"), [app.name]);
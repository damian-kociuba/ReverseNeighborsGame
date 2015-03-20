'use strict';
/* App Module */
var reverseNeighborsGameApp = angular.module('ReverseNeighborsGameApp', [
]);

reverseNeighborsGameApp.controller('ReverseNeighborsGameCtrl', ['$scope', function ($scope) {
        var boardWidth = 10;
        var boardHeight = 10;
        $scope.blackCounter;
        $scope.blackCounter;
        $scope.board = initiateBoard(0);
        randomizeBoard();
        $scope.movesNumber = 0;
        
        function initiateBoard(fieldType) {
            var board = [];
            for (var i = 0; i < boardWidth; i++) {
                board[i] = [];
                for (var j = 0; j < boardHeight; j++) {
                    board[i][j] = {'type': fieldType};
                }
            }
            return board;
        }
        
        $scope.boardClick = function(x,y) {
            $scope.movesNumber++;
            
            reverseNeighbords(x,y);
            
            $scope.isWin = function() {
                if($scope.movesNumber === 0) {
                    return false;
                }
                return isBoardUniform();
            };
        };
        
        function reverseNeighbords(x,y) {
            var fieldsToReverse = [];
            fieldsToReverse.push({'x':x-1, 'y':y});
            fieldsToReverse.push({'x':x, 'y':y-1});
            fieldsToReverse.push({'x':x, 'y':y+1});
            fieldsToReverse.push({'x':x+1, 'y':y});
            
            reverseFields(fieldsToReverse);
            
            recountBlackAndWhiteFields();
        }
        function reverseFields(fieldsCoordinates) {
            for(var i=0; i<fieldsCoordinates.length; i++) {
                if(fieldsCoordinates[i].x<0 || fieldsCoordinates[i].x >= boardWidth) {
                    continue;
                }
                if(fieldsCoordinates[i].y<0 || fieldsCoordinates[i].y >= boardHeight) {
                    continue;
                }
                reverseOneField(fieldsCoordinates[i].x, fieldsCoordinates[i].y);
            }
        }
        
        function reverseOneField(x, y) {
            $scope.board[x][y].type = 1-$scope.board[x][y].type;
        }
        
        function recountBlackAndWhiteFields() {
            var black = 0;
            for (var i = 0; i < boardWidth; i++) {
                for (var j = 0; j < boardHeight; j++) {
                    if($scope.board[i][j].type === 1) {
                        black++;
                    }
                }
            }
            $scope.blackCounter = black;
            $scope.whiteCounter = boardWidth*boardHeight-black;
        }
        function isBoardUniform() {
            var firstFieldType = $scope.board[0][0].type;
            for (var i = 0; i < boardWidth; i++) {
                for (var j = 0; j < boardHeight; j++) {
                    if($scope.board[i][j].type !== firstFieldType) {
                        return false;
                    }
                }
            }
            
            return true;
        }
        
        $scope.restart = function() {
            $scope.movesNumber = 0;
            randomizeBoard();
        };
        
        function randomizeBoard() {
            var randomMovesNumber = Math.round(Math.random()*15+20);
            var randomX;
            var randomY;
            for(var i=0; i< randomMovesNumber; i++) {
                randomX = Math.floor(Math.random()*boardWidth);
                randomY = Math.floor(Math.random()*boardHeight);
                reverseNeighbords(randomX,randomY);
            }
        }
        
    }]);




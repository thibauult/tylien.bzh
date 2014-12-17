/**
 * Created by tibus on 16/12/14.
 */
var tyLienApp = angular.module('tyLienApp', [])

    .controller('HomeCtrl', function ($scope, $http, $location) {

        $scope.url = 'www.google.com';
        $scope.result = {
            host: $location.host(),
            port: $location.port()
        };

        $scope.submit = function() {
            $http.post('/', { url: $scope.url })
                .success(function(data) {
                    console.log(data);

                    $scope.result.key = data._id;
                });
        }

    });


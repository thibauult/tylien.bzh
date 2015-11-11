/**
 * Created by tibus on 16/12/14.
 */
var tyLienApp = angular.module('tyLienApp', [])

    .controller('HomeCtrl', function ($rootScope, $scope, $http, $location, $log) {

        var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

        $scope.url = '';
        $scope.urlPlaceholder = '';
        $scope.urlFormatError = false;

        $scope.customKey = '';
        $scope.customKeyExists = false;
        $scope.customKeyLoading = false;

        $scope.isLoading = false;
        $scope.result = {
            host: $location.host(),
            port: $location.port()
        };

        $scope.submit = function() {

            var url = $scope.url;
            $scope.urlFormatError = false;

            if(/^([a-zA-Z0-9]+.)/.test(url)) {

                url = url.indexOf('www.') == 0 ? 'http://' + url : url;

                if(urlPattern.test(url)) {

                    $scope.isLoading = true;

                    var args = { url: url };
                    if(checkCustomKey($scope.customKey)) {
                        args.customKey = $scope.customKey;
                    }


                    $http.post('/', args)
                        .success(function(data) {
                            $scope.result.key = data._id;
                            $scope.url = url;
                            $scope.isLoading = false;
                        }
                    );
                }
                else {
                    urlFormatError(url);
                }
            }
            else {
                urlFormatError(url);
            }
        };

        $scope.onCustomKeyChanged = function() {

            if($scope.customKey.length > 2) {

                $scope.customKeyExists = false;
                $scope.customKeyLoading = true;

                $http.get('/check/' + $scope.customKey)
                    .success(function() {
                        $log.warn($scope.customKey + ' found.');
                        $scope.customKeyExists = true;
                        $scope.customKeyLoading = false;
                    })
                    .error(function() {
                        $log.info($scope.customKey + ' not found.');
                        $scope.customKeyExists = false;
                        $scope.customKeyLoading = false;
                    });
            }
        };

        function urlFormatError(url) {
            $log.error('url[' + url + '] format error !');
            $scope.urlFormatError = true;
            $scope.result.key = null;
        }

        function checkCustomKey(customKey) {
            //TODO check the custom key
            return true;
        }

    });


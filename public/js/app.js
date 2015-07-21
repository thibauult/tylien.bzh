/**
 * Created by tibus on 16/12/14.
 */
var tyLienApp = angular.module('tyLienApp', [])

    .controller('HomeCtrl', function ($rootScope, $scope, $http, $location, $log) {

        var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

        $scope.url = 'www.google.com';
        $scope.urlPlaceholder = '';
        $scope.urlFormatError = false;

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

                    $http.post('/', { url: url })
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
        }

        function urlFormatError(url) {
            $log.error('url[' + url + '] format error !');
            $scope.urlFormatError = true;
            $scope.result.key = null;
        }

    });


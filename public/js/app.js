/**
 * Created by tibus on 16/12/14.
 */
var tyLienApp = angular.module('tyLienApp', ['pascalprecht.translate'])

    .config(function($translateProvider) {

        $translateProvider.translations('en', {
            'title.app' : 'TyLien.bzh',
            'msg.url' : 'Paste your long URL here',
            'btn.shorten' : 'Shorten',

            'title.shortened.link' : 'Your shortened link'
        });

        $translateProvider.translations('fr', {
            'title.app' : 'TyLien.bzh',
            'msg.url' : 'Collez ici votre lien',
            'btn.shorten' : 'Valider',

            'title.shortened.link' : 'Votre ty lien'
        });

        $translateProvider.translations('bzh', {
            'title.app' : 'TyLien.bzh',
            'msg.url' : 'Colle ton lien ici que c\'est',
            'btn.shorten' : 'Kenavo !',

            'title.shortened.link' : 'Voila ton lien mignon'
        });

        $translateProvider.preferredLanguage('fr');

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    })

    .controller('HeaderCtrl', function($scope, $translate) {

        $scope.currentLang = $translate.preferredLanguage();

        $scope.setLang = function(key) {
            $translate.use(key);
            $scope.currentLang = key;
        };
    })

    .controller('HomeCtrl', function ($rootScope, $scope, $http, $location, $translate) {

        var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

        $scope.url = '';
        $scope.urlPlaceholder = '';

        $scope.result = {
            host: $location.host(),
            port: $location.port()
        };

        $scope.submit = function() {

            var url = $scope.url;

            if(url) {

                url = url.indexOf('www.') == 0 ? 'http://' + url : url;

                if(urlPattern.test(url)) {

                    $http.post('/', { url: url })
                        .success(function(data) {
                            $scope.result.key = data._id;
                            $scope.url = url;
                        }
                    );
                }
            }
        }

        $translate('msg.url').then(function(translation) {
            $scope.urlPlaceholder = translation;
        });

        $rootScope.$on('$translateChangeSuccess', function (data) {

            $translate('msg.url').then(function (translation) {
                $scope.urlPlaceholder = translation;
            });
        });

    });


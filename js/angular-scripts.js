'use strict';
/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('michael', ['ui.bootstrap', 'ngSanitize'])

.controller('MainCtrl', function ( $scope, ProjectService, $uibModal, $log ) {
    $scope.projects = [];
    ProjectService.get().success(function(data){
        $scope.projects = data;
    });
    $scope.openProject = function (project) {

        var modalInstance = $uibModal.open({
            
            templateUrl: '../modals/projectmodal.html',
            controller: 'ProjectModalCtrl',
            size: 'lg',
            resolve: {
                project: function () {
                    return project;
                }
            }
        });

        modalInstance.result.then(function () {
            
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

})
.controller('ProjectModalCtrl', function ($scope, $uibModalInstance, project) {


    $scope.project = project;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
.service('ProjectService', function($http) {
    return {
        get : function() {
            return $http.get('/data/projects.json');
        }
    }
});


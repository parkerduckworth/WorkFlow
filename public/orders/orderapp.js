/**
 * Created by ericd34n on 7/1/17.
 */
/**
 * Created by ericd34n on 6/29/17.
 */
/**
 * Created by ericd34n on 6/24/17.
 */
/**
 * Created by ericd34n on 6/22/17.
 */
(function(){
    angular
        .module("OrderApp", [])
        .controller("OrderAppController", OrderAppController);

    function OrderAppController($scope, $http){
        $scope.getSiteById = getSiteById;
        $scope.getSiteByName = getSiteByName;

        function init(){
            getAllSites();
        }
        init();

        function getAllSites(){
            $http
                .get("/api/site")
                .success(function(sites){
                    $scope.sites = sites;
                });
        }

        function getSiteById(site){
            console.log(site);
            $http
                .get("/api/site/"+site._id, site);
        }

        function getSiteByName(site){
            console.log(site);
            $http
                .get("/api/site/"+site._id, site);
        }
    }
})();
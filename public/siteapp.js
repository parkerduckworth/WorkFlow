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
        .module("SiteApp", [])
        .controller("SiteAppController", SiteAppController);

    function SiteAppController($scope, $http){
        $scope.createSite = createSite;
        $scope.deleteSite = deleteSite;
        $scope.clearPost = clearPost;

        function init(){
            getAllSites();
        }
        init();

        function createSite(site){
            $http
                .post("/api/site", site)
                .success(getAllSites);
        }

        function getAllSites(){
            $http
                .get("/api/site")
                .success(function(sites){
                    $scope.sites = sites;
                });
        }

        function deleteSite(siteId){
            $http
                .delete("/api/site/"+siteId)
                .success(getAllSites);
        }

        function clearPost() {
            $scope.site_name = '';
        }

    }
})();
/**
 * Created by ericd34n on 6/29/17.
 */

(function(){
    angular
        .module("DeliveryApp", [])
        .controller("DeliveryAppController", DeliveryAppController);

    function DeliveryAppController($scope, $http){
        $scope.deliver = deliver;
        $scope.deleteDelivery = deleteDelivery;

        function init(){
            getAllDeliveries();
        }
        init();


        function deliver(deliveries){
            $http
                .post("/api/site/delivery", deliveries)
                .success(getAllDeliveries);
        }

        function deleteDelivery(deliveryId){
            $http
                .delete("/api/site/delivery/"+deliveryId)
                .success(getAllDeliveries);
        }

        function getAllDeliveries(){
            $http
                .get("/api/sites/deliveries")
                .success(function(deliveries){
                    $scope.deliveries = deliveries;
                });
        }
    }
})();
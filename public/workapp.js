/**
 * Created by ericd34n on 6/24/17.
 */
/**
 * Created by ericd34n on 6/22/17.
 */
(function(){
    angular
        .module("WorkApp", [])
        .controller("WorkAppController", WorkAppController);

    function WorkAppController($scope, $http){
        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.flagPost = flagPost;

        function init(){
            getAllPosts();
        }
        init();

        function createPost(post){
            $http
                .post("/api/job", post)
                .success(getAllPosts)
                .then(clearTextEntry);
        }

        function getAllPosts(){
            $http
                .get("/api/job")
                .success(function(posts){
                    $scope.posts = posts;
                });
        }

        function deletePost(postId){
            $http
                .delete("/api/job/"+postId)
                .success(getAllPosts)
                .then(clearTextEntry);
        }

        // Before you continue to define any other functions,
        // This function needs to be fleshed out. The update
        // Logic is incorrect.
        function editPost(postId){
            $http
                .get("/api/job/"+postId)
                .success(function(post){
                    $scope.post = post;
                });
        }

        function clearTextEntry(){
            $scope.post = '';
        }

        function flagPost(){
            $http.get("/api/job");
        }
    }
})();
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
        $scope.updatePost = updatePost;
        $scope.clearPost = clearPost;


        function init(){
            getAllPosts();
        }
        init();

        function createPost(post){
            $http
                .post("/api/job", post)
                .success(getAllPosts)
                .then(clearPost);
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
                .success(getAllPosts);
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

        function updatePost(post){
            console.log(post);
            $http
                .put("/api/job/"+post._id, post)
                .success(getAllPosts);
        }

        function clearPost() {
            $scope.post = '';
        }

        function flagPost(){
            $http.get("/api/job");
        }


    }
})();

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


        function editPost(postId){
            $http
                .put("/api/job/"+postId)
                .success(function(post){
                    $scope.post = post;
                });
        }

        function updatePost(post){
            console.log(post);
            $http
                .get("/api/job/"+post._id, post)
                .success(getAllPosts);
        }

        // Research on Scope 
        function clearPost() {
            $scope.post = '';
        }
    }
})();

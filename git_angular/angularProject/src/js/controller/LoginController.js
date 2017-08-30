/**
 * Created by Administrator on 2017/8/4.
 */
angular.module("myApp")  //引用已存在的myApp模块
    .controller("LoginController",["$scope","$http","$state","$rootScope",function($scope,$http,$state,$rootScope){
        $scope.login=function(){
            $http({
                url:"http://localhost:3000/user/login",
                method:"post",
                data:{
                    phone:$scope.phone,
                    password:$scope.password
                }
            }).then(function success(data){
                console.log(data);
                $rootScope.loginUser=data.data.result.username;
                $state.go("home");
            },function error(err){
                console.log(err);
            });
        }
    }]);
/**
 * Created by Administrator on 2017/8/4.
 */
angular.module("myApp")  //引用已存在的myApp模块
.controller("RegController",["$scope","$http",function($scope,$http){
    $scope.reg=function(isOk){
        console.log("isOk");
        if(isOk){
            $http({
                url:"http://localhost:3000/user/reg",
                method:"post",
                data:{
                    phone:$scope.phone,
                    password:$scope.password,
                    passwordRepeat:$scope.passwordRepeat
                }
            }).then(function success(data){
                console.log(data)
            },function error(err){
                console.log(err);
            });
        }else{
            console.log("表单有不正确的输入项")
        }
    }
}]);
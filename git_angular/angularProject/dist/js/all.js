/**
 * Created by Administrator on 2017/8/4.
 */
/*主模块定义，路由配置及其他配置信息*/
angular.module("myApp",["ui.router"])
    .config(["$stateProvider","$urlRouterProvider","$httpProvider",function($stateProvider,$urlRouterProvider,$httpProvider){
        //路由配置
        $urlRouterProvider.otherwise("/home");//定义默认路由

        $stateProvider
            .state("home",{
                url:"/home",
                templateUrl:"views/home.html",
                controller:"HomeController"
            })
            .state("reg",{
                url:"/reg",
                templateUrl:"views/reg.html",
                controller:"RegController"
            })
            .state("login",{
                url:"/login",
                templateUrl:"views/login.html",
                controller:"LoginController"
            })
            .state("list",{
                url:"/list",
                templateUrl:"views/list.html",
                controller:"ListController"
            });
        //post请求的处理
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        $httpProvider.defaults.transformRequest = [
            function(data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        ];
    }]);
setTimeout(function(){
    var car=document.getElementById("carousel");
    var divs=document.getElementById("content").getElementsByTagName("div");
    var lis=document.getElementById("control").getElementsByTagName("li");
    var oL=document.getElementById("aL");
    var oR=document.getElementById("aR");
    var cur_index=0;
    var t=setInterval(move,2000);
    function move(){
        divs[cur_index].className="";
        lis[cur_index].className="";
        cur_index++;
        if(cur_index==divs.length){
            cur_index=0;
        }
        divs[cur_index].className="current";
        lis[cur_index].className="sel";
    }
    car.onmouseover=function(){
        clearInterval(t);
        oL.style.display="block";
        oR.style.display="block";
    };
    car.onmouseout=function(){
        t=setInterval(move,2000);
        oL.style.display="none";
        oR.style.display="none";
    };
    for(var i=0;i<lis.length;i++){
        lis[i]._index=i;
        lis[i].onclick=function(){
            lis[cur_index].className="";
            divs[cur_index].className="";
            this.className="sel";
            divs[this._index].className="current";
            cur_index=this._index;
        };
    }
    oR.onclick=function(){
        move();
    };
    oL.onclick=function(){
        moveLeft();
    };
    function moveLeft(){
        divs[cur_index].className="";
        lis[cur_index].className="";
        cur_index--;
        if(cur_index==-1){
            cur_index=divs.length-1;
        }
        divs[cur_index].className="current";
        lis[cur_index].className="sel";
    }
},1);


angular.module("myApp")  //引用已存在的myApp模块
    .controller("HomeController",["$scope","$http",function($scope,$http){
        $scope.slides=[];
        $scope.hot=[];
        $scope.new=[];
        $scope.unit=[];
        $http.get("http://localhost:3000/IndexInfo").then(function success(data) {
            console.log(data);
            $scope.slides=data.data.result.slides;
            $scope.hot=data.data.result.hot;
            $scope.new=data.data.result.new;
            $scope.unit=data.data.result.unit;

        },function error (error) {
            console.log(error);
        })
    }]);
/**
 * Created by Administrator on 2017/8/8.
 */
angular.module("myApp")  //引用已存在的myApp模块
    .controller("ListController",["$scope","$http",function($scope,$http){
        $scope.arr=[];
        $scope.arrtype = ["全部","微电影", "电影", "电视剧","戏曲","话剧","书画","相声","戏剧","音乐剧","其他"];

        $scope.changePage=function(p){
            $scope.page=p;
            // console.log(p);
            $scope.getListData();
        };

        var obj={
            init:function(){
                $scope.cid=0;
                $scope.staus=0;
                $scope.page=1;
                $scope.count=9;

                $scope.getListData();
            }
        };

        $scope.getListData=function(){
            $http({
                url:"http://localhost:3000/prolist",
                method:"get",
                params:{
                    cid:$scope.cid,
                    status:$scope.staus,
                    page:$scope.page,
                    count:$scope.count
                }
            }).then(function(data){{
                console.log(data);
                var pageCount=Math.ceil(data.data.result.countAll/data.data.result.count);
                for(var i=0;i<pageCount;i++){
                    $scope.arr.push(i+1);
                }
                console.log(pageCount);
                $scope.listData=data.data.result.list;
            }},function(err){
                console.log(err);
            });
        }

        $scope.choose=function (isOk){
            console.log("...."+isOk);
            $scope.orderna=isOk;
        };

        $scope.allfn=function () {
            $scope.orderna="";
        };


        //初始先加载第一页数据
        obj.init();
    }]);
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
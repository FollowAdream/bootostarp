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
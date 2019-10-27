var app = angular.module('studentsApp', ["ngRoute"]);
app.controller('studentsCtrl', function($scope, $http, $route) {
   $scope.$route = $route;
   $http.get("https://api.myjson.com/bins/1dlper")
     .then(function(response) {
       $scope.studentRecords = response.data;
       $scope.studentsArrayObject = [];
       for(var i in $scope.studentRecords) {
           var obj = $scope.studentRecords[i];
           obj.studentId = i;
           obj.totalMarks = obj.marks.s1 + obj.marks.s2 + obj.marks.s3;
           $scope.studentsArrayObject.push(obj);
       }
     });       
   $scope.marksAscending = true;
   $scope.namesAscending = true;
   $scope.orderByName = function(x) {
      if($scope.namesAscending) {
         $scope.myOrderByValue = "name";
         $scope.namesAscending = false;
      } else {
         $scope.myOrderByValue = "-name";
         $scope.namesAscending = true;
      }
   }
   $scope.orderByMark = function(x) {
      if($scope.marksAscending) {
         $scope.myOrderByValue = "totalMarks";
         $scope.marksAscending = false;
      } else {
         $scope.myOrderByValue = "-totalMarks";
         $scope.marksAscending = true;
      }
         
   }
});
app.config(function($routeProvider) {
   $routeProvider
   .when("/", {
      templateUrl : "student-container.html",
      controller: "studentsCtrl"
   })
   .when("/:id", {
      templateUrl : "student-details.html",
      controller: "studentsCtrl"
   });
});
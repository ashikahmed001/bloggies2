 var app = angular.module('myModule', []);

 app.controller('carouselController', function($scope) {
     $scope.display = 0;
     $scope.tabShow = 1;

     $scope.domSlide = $('.mySlides');
     $scope.carouselNavigator = function(x) {
         $scope.init = $scope.display;

         if ($scope.display + x >= $scope.domSlide.length || $scope.display + x < 0) {
             $scope.display = $scope.init;
         } else {
             $scope.display = $scope.display + x;
         }
     };

 });

 app.controller('thumbnailController', function($scope) {
     $scope.thumbDisplay = 0;
     $scope.newSlideLen = $('.newsThumb').length;
     $scope.thumbClick = function(no) {
         $scope.thumbinit = $scope.thumbDisplay;
         if ($scope.thumbDisplay + no >= $scope.newSlideLen || $scope.thumbDisplay + no < -1) {
             $scope.thumbDisplay = $scope.thumbinit;
         } else {
             $scope.thumbDisplay = $scope.thumbinit + no;
         }

     };
 });

 app.controller('apiController', function($scope, $http) {
     $scope.loading = true;
     $scope.getImage = function(image) {
         if (image.startsWith("//")) {
             return "Images/news.png" /*"https:"+image;*/
         } else {
             return image;
         }
     }
     $http.get('https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=2806bca394a346aa931291650f78bba9').then(function(result) {
         $scope.error = false;
         $scope.NewsSource = function() {
             if (result.data.source == "the-wall-street-journal")
                 return "THE WALL STREET JOURNAL ";
             else
                 return result.data.source;
         };
         $scope.data = result.data.articles;
     }, function(error) {
         $scope.error = true;
         $scope.loading = true;
     }).finally(function() {
         $scope.loading = false;
     });

     $scope.apiCall = function(xSource) {
         $scope.loading = true;
         $http.get('https://newsapi.org/v1/articles?source=' + xSource + '&sortBy=top&apiKey=2806bca394a346aa931291650f78bba9').then(function(result) {
             $scope.error = false;
             $scope.NewsSource = function() {
                 return result.data.source.replace('-', ' ');
             };
             $scope.data = result.data.articles;
         }, function(error) {
             $scope.error = true;
             $scope.loading = true;
         }).finally(function() {
             $scope.loading = false;
         });
     }



 });

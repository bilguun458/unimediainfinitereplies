(function () { 
  angular
   .module('UnimediaInfiniteRepliesApp')
   .controller('homeCtrl', homeCtrl)
   .directive('test', function ($compile, UnimediaInfiniteRepliesData) {
    return {
        restrict: 'E',
        scope: {
            text: '='
        },
        template: '<div class="col-xs-12" ng-repeat="reply in replies | orderBy:\'date\':true">'
                     +'<div class="comment" style="margin-top: 5px;">'
                       +'<div class="comment-image" style="float: left;">'
                         +'<img src="https://dimmi-static.azureedge.net/img/noprofile.png?d=171127" height="40px" width="40px">'
                       +'</div>'
                       +'<div class="comment-body" style="margin-left: 45px;">'
                         +'<div class="comment-header">'
                           +'<span style="font-size: 13pt;">'
                             +'{{ reply.author }}'
                           +'</span>'
                           +'<span> '
                             +'{{ reply.date | date : "yyyy-M-d h:m:s"}}'
                           +'</span>'
                         +'</div>'
                         +'<div  class="comment-content">'
                           +'<p>'
                             +'{{ reply.data }}'
                           +'</p>'
                         +'</div>'
                          +'<div class="comment-write-reply">'
                            +'<a href="" ng-click="write(reply._id, $event)" role="button">REPLY</a>'
                          +'</div>'
                         +'<div class="comment-footer">'
                           +'<a href="" ng-click="add(reply._id, $event)" role="button">Show replies &darr;&darr;</a>'
                         +'</div>'
                       +'</div>'
                     +'</div>'
                  +'</div>',
        controller: function ($scope, $element) {
            $scope.add = function (id, $event) {
                if ($event.target.innerHTML == "Show replies ↓↓") {

                  if ($event.target.parentElement.parentElement.lastElementChild.id == "staticAddedCm") {//static nemsen bsn nuguu reply gee arilgaj bga heseg
                    angular.element($event.target.parentElement.parentElement.lastElementChild).remove();
                  }

                  var el = "<div class=\"reply\"><test text='"+"\""+id+"\""+"'></test></div>";
                  angular.element($event.target).parent().parent().append($compile(el)($scope));
                  $event.target.innerHTML = "Hide replies ↑↑";
                }
                else if ($event.target.innerHTML == "Hide replies ↑↑") {
                  var el = angular.element($event.target.parentElement.parentElement.lastElementChild);
                  el.remove();
                  $event.target.innerHTML = "Show replies ↓↓";
                }
            };
            $scope.write = function (id, $event) {
                if ($event.target.parentElement.lastElementChild == $event.target) {
                  var el = "<write-reply text='"+"\""+id+"\""+"'></write-reply>";
                  angular.element($event.target).parent().append($compile(el)($scope));
                }
            };
            UnimediaInfiniteRepliesData.getchildCommentsList($scope.text)
            .then(function successCallback(response) {
              $scope.replies = response.data ;
            },
            function errorCallback(response) {
            });
        }
      };
    })
   .directive('writeReply', function ($compile, UnimediaInfiniteRepliesData) {
    return {
        restrict: 'E',
        scope: {
            text: '='
        },
        template: '<div class="input-group">'
                    +'<textarea class="form-control custom-control" rows="1" ng-model="textModel" placeholder="Add public reply" style="resize:none"></textarea>'
                    +'<span ng-click="reply($event)" class="input-group-addon btn btn-primary">Reply</span>'
                    +'<span ng-click="cancel($event)" class="input-group-addon btn btn-primary">Cancel</span>'
                  +'</div>',
        controller: function ($scope, $element) {
            $scope.reply = function ($event) {
                var el = angular.element($event.target.parentElement.parentElement.parentElement.parentElement/*.nextElementSibling.nextElementSibling*/);
                //console.log(el);

                if ($scope.textModel != undefined) {
                  UnimediaInfiniteRepliesData.addReply($scope.text, $scope.textModel, 'Guest')
                  .then(function successCallback(response) {
                    var res = response.data;
                    var addElm = '<div id="staticAddedCm" class="comment" style="margin-top: 5px;">'
                               +'<div class="comment-image" style="float: left;">'
                                 +'<img src="https://dimmi-static.azureedge.net/img/noprofile.png?d=171127" height="40px" width="40px">'
                               +'</div>'
                               +'<div class="comment-body" style="margin-left: 45px;">'
                                 +'<div class="comment-header">'
                                   +'<span style="font-size: 13pt;">'
                                     +''+ res.author +''
                                   +'</span>'
                                   +'<span> '
                                     +'{{ '+'\''+ res.date +'\''+' | date : "yyyy-M-d h:m:s"}}'
                                   +'</span>'
                                 +'</div>'
                                 +'<div  class="comment-content">'
                                   +'<p>'
                                     +''+ res.data +''
                                   +'</p>'
                                 +'</div>'
                                 +'<div class="comment-write-reply">'
                                    +'<a href="" ng-click="write('+'\''+ res._id +'\''+', $event)" role="button">REPLY</a>'
                                  +'</div>'
                                 +'<div class="comment-footer">'
                                   +'<a href="" ng-click="add('+'\''+ res._id +'\''+', $event)" role="button">Show replies &darr;&darr;</a>'
                                 +'</div>'
                               +'</div>'
                             +'</div>';
                    el.append($compile(addElm)($scope));
                  },
                  function errorCallback(response) {
                  });

                  angular.element($event.target).parent().parent().remove();
                }
            };
            $scope.cancel = function ($event) {
                angular.element($event.target).parent().parent().remove();
            };
            UnimediaInfiniteRepliesData.getchildCommentsList($scope.text)
            .then(function successCallback(response) {
              $scope.replies = response.data ;
            },
            function errorCallback(response) {
            });

            //------static nemhed ajildag bolgoh geed test dir iin 2 func - ig nemev
            $scope.add = function (id, $event) {
                if ($event.target.innerHTML == "Show replies ↓↓") {
                  //var el = "<div class=\"reply\"><test text='"+"\""+id+"\""+"'></test></div>";
                  //angular.element($event.target).parent().parent().append($compile(el)($scope));
                  //end ugiin shine nemegdsen reply uchir yuuch butsaj irku tul comment bolgov
                  $event.target.innerHTML = "Hide replies ↑↑";
                }
                else if ($event.target.innerHTML == "Hide replies ↑↑") {
                  //var el = angular.element($event.target.parentElement.parentElement.lastElementChild);
                  //el.remove();
                  //end mun adil
                  $event.target.innerHTML = "Show replies ↓↓";
                }
            };
            $scope.write = function (id, $event) {
                if ($event.target.parentElement.lastElementChild == $event.target) {
                  var el = "<write-reply text='"+"\""+id+"\""+"'></write-reply>";
                  angular.element($event.target).parent().append($compile(el)($scope));
                }
            };
        }
      };
    });


  function homeCtrl (UnimediaInfiniteRepliesData, $scope, $compile) {
    var vm = this;

    vm.message = "Checking comments";
    
    UnimediaInfiniteRepliesData.getRootCommentsList()
    .then(function successCallback(response) {
      vm.message = response.data.length > 0 ? "" : "Коммент олдсонгүй";
      vm.rootComments = response.data ;
    },
    function errorCallback(response) {
      vm.message = "Sorry, something's gone wrong";
    });

    vm.makeReply = function (id, $event) {
      if ($event.target.innerHTML == "Show replies ↓↓") {
        if ($event.target.parentElement.parentElement.lastElementChild.id == "staticAddedCm") {//static nemsen bsn nuguu reply gee arilgaj bga heseg
          angular.element($event.target.parentElement.parentElement.lastElementChild).remove();
        }

        var el = "<div class=\"reply\"><test text='"+"\""+id+"\""+"'></test></div>";
        angular.element($event.target).parent().parent().append($compile(el)($scope));
        $event.target.innerHTML = "Hide replies ↑↑";
      } else if ($event.target.innerHTML == "Hide replies ↑↑") {
        var el = angular.element($event.target.parentElement.parentElement.lastElementChild);
        el.remove();
        $event.target.innerHTML = "Show replies ↓↓";
      }
    };
    vm.writeReply = function (id, $event) {
      if ($event.target.parentElement.lastElementChild == $event.target) {
        var el = "<write-reply text='"+"\""+id+"\""+"'></write-reply>";
        angular.element($event.target).parent().append($compile(el)($scope));
      }
    };

    //root comment bichix heseg
    vm.comment = function () {
      if (vm.textModel != undefined) {
        UnimediaInfiniteRepliesData.addComment(vm.textModel, 'Guest')
        .then(function successCallback(response) {
          var res = response.data;
          console.log(res.author);
          var el = '<div class="comment" style="margin-top: 10px;">'
                  +'<div class="comment-image" style="float: left;">'
                    +'<img src="https://dimmi-static.azureedge.net/img/noprofile.png?d=171127" height="70px" width="70px">'
                  +'</div>'
                  +'<div class="comment-body" style="margin-left: 75px;">'
                    +'<div class="comment-header">'
                      +'<span style="font-size: 15pt;">'
                        +''+ res.author +''
                      +'</span>'
                      +'<span>'
                        +'{{ '+'\''+ res.date +'\''+' | date : \'yyyy-M-d h:m:s\'}}'
                      +'</span>'
                    +'</div>'
                    +'<div class="comment-content">'
                      +'<p>'
                        +''+ res.data +''
                      +'</p>'
                    +'</div>'
                    +'<div class="comment-write-reply">'
                      +'<a href="" ng-click="vm.writeReply('+'\''+ res._id +'\''+', $event)" role="button">REPLY</a>'
                    +'</div>'
                    +'<div class="comment-footer">'
                      +'<a href="" ng-click="vm.makeReply('+'\''+ res._id +'\''+', $event)" role="button">Show replies &darr;&darr;</a>'
                    +'</div>'
                  +'</div>'
                +'</div>';
          angular.element(document.getElementById('comments')).prepend($compile(el)($scope));
          vm.textModel = "";
        },
        function errorCallback(response) {
        });
      }
    };
  }
})();
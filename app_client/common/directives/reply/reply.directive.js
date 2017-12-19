(function () {
	angular
	.module('UnimediaInfiniteRepliesApp')
	.directive('reply', reply);
	function reply () {
		return {
			restrict: 'EA',
			scope: {
				replies: '=replies'
			},
			templateUrl: '/common/directives/reply/reply.template.html'
		};
	}
})();
(function () { 
	angular
	 .module('UnimediaInfiniteRepliesApp')
	 .service('UnimediaInfiniteRepliesData', UnimediaInfiniteRepliesData);

	function UnimediaInfiniteRepliesData ($http) {
		var getRootCommentsList = function () {
			return $http.get('/api/rootcomments');
		};
		var getchildCommentsList = function (id) {
			return $http.get('/api/childcomments/' + id);
		};
		var addReply = function (id, data, author) {
			return $http.post('/api/comment/' + data + '/' + author + '/' + id);
		};
		var addComment = function (data, author) {
			return $http.post('/api/comment/' + data + '/' + author);
		};
		return {
			getRootCommentsList : getRootCommentsList,
			getchildCommentsList : getchildCommentsList,
			addReply : addReply,
			addComment : addComment
		};
	}
})();
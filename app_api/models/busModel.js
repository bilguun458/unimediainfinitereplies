var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
	parentId: String,
	date: Date,
	author: String,
	data: String
});

commentsSchema.add({ replies: [commentsSchema] });

mongoose.model('Comments', commentsSchema, 'comments');

/*
db.comments.insert({
busNumber: '1111УНА',
parentId: null,
date: new Date("2017-12-16T20:43:12Z"),
author: 'Билгүүн',
data: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
});
*/
const Review = require('./rev');
const Comment = require('./comments');
const Reply = require('./reply');

Review.hasMany(Comment);
Comment.belongsTo(Review);

Comment.hasMany(Reply);
Reply.belongsTo(Comment);

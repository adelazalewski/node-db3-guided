const db = require("../data/config");

function findPostByUserId(id) {
   return db("posts")
    //left join bc we still want to see posts of the deleted user
    //inner join if not
    .leftJoin("users", "users.id", "posts.user_id")
    //dont forget the select 
    .select("posts.id", "posts.contents", "users.username")
    .where("user_id",id)
}

module.exports = {
    findPostByUserId,
}
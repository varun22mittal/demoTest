const request = require('request');
var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/getPostComments', function (req, res) {
    request.get({url: `https://jsonplaceholder.typicode.com/posts`,json: true}, function (err, result, postData) {
        // console.log(body);
        request.get({ url: `https://jsonplaceholder.typicode.com/comments`,json: true}, function (err, result, commentData) {
            // console.log(body);
            let resutArr = [];
            postData.forEach(post => {
                let commentArr = [];
                commentData.forEach(comment => {
                    if(post.id==comment.postId){
                        commentArr.push(comment);
                    }
                })
                post.comments = commentArr
                resutArr.push(post);
            });
            res.send(resutArr);
        })
    })

})

app.listen(3000, function (result) {
    console.log(`server is running on 3000`);
});
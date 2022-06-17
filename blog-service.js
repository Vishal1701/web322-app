var posts= new Array();

var categories= new Array();

var path = require('path');

var fs = require("fs");


module.exports.initialize = () => {
     return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname,"./data/posts.json"), 'utf8', (err, data) => {
            if (err) {
                reject("Unable to read file.");
                
            }
            else{
            posts = JSON.parse(data);
            }
        
        });

        fs.readFile(path.join(__dirname,"./data/categories.json"), 'utf8', (err, data) => {
            if (err) {
                reject("Unable to read file.");
                
            }
            else{
            categories = JSON.parse(data);
            }
        
        }); 
        resolve();

    });        
}


// promise 



 module.exports.getAllPosts = (() => {
     return new Promise((resolve, reject) => {
      if (posts.length == 0) {
        reject("no results returned")
      }
      else{
        resolve(posts)      
      }
    });
  });
 

  module.exports.getCategories = () => {
    return new Promise((resolve,reject) => {
        if (categories.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (categories);
        }
    })
};
 
 
module.exports.getPublishedPosts = (() => new Promise((resolve, reject) => {
    let p_post = [];

    posts.forEach((post) => {
        if (post.published == true) {
            p_post.push(post);
        }
    });
    if (p_post.length != 0) {
        resolve(p_post);
    }
    else {
        reject("no results returned");
    }
}));
  
//addPost
module.exports.addPost = (postData) => {

    return new Promise((resolve, reject) => {

        if(postData.published != true && postData.published != false)
         {
            postData.published = false; //this gets around the issue of the checkbox not sending "false" if it is unchecked
        }
         else postData.published = true;

        postData.id = posts.length + 1;

        posts[posts.length] = postData;

        resolve(postData)
        
    }) 
    
}

// /posts?category=value
module.exports.getPostsByCategory =  (category) => {
    return new Promise(function (resolve, reject) {

        var post_by_category = new Array();

        for (let i = 0; i < posts.length; i++) {

            if (posts[i].category == category) 
            {
                post_by_category.push(posts[i]);
            }
        }

        if (post_by_category.length == 0) {
            reject("no results returned");
            return;
        }

        resolve(post_by_category);
    });
}

// /posts?minDate=value
module.exports.getPostByMinDate = (minDateStr) => {

    var post_by_date = new Array();

    let respose = new Promise((resolve, reject) => {
        
        for(let i = 0; i<posts.length; i++)
        {
            if(new Date (posts[i].postDate) >= new Date (minDateStr)) post_by_date.push(posts[i])
        }
        if(post_by_date.length === 0) 
        {

            reject("no results returned") 
        }  

        resolve(post_by_date) 
    })
   return respose;
} 


//  /post/value
module.exports.getPostById = (id) => {
    return new Promise((resolve, reject) => 
    {
        var post_by_ids = [];
        
        for (let i = 0; i < posts.length; i++)
         {
            if (posts[i].id == id)
             {
                post_by_ids.push(posts[i]);
            }
        }

        if (post_by_ids.length == 0) {
            reject("no results returned");
            return;
        }

        resolve(post_by_ids);
    });

}
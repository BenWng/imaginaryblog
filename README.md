# imaginaryblog


The code for the website http://cs5610wangzhongxi-firsttestdomain.rhcloud.com
-------------------------


###General Description

This websites is for students in conservatories to post their performance videos and for others to leave feedback

###Testing Google Account
This is the administrator account: alicetestsubject@gmail.com
password: cs5610fall2015
Please use this account to access administrative page

###Mockup data for local testing:
* In the github folder, two mock-up data files are in public/project/server/post.mockup.json and public/project/server/user.mockup.json. To import them to local database, please do:

* mongoimport --db=cs5610fall2015 --file=user.mockup.json --collection=cs5610.project.user --jsonArray
mongoimport --db=cs5610fall2015 --file=post.mockup.json --collection=cs5610.project.post --jsonArray

###Features:
* Google Oauth login and register: This website only uses google oauth to verify users. If a user is not in the database, after he or she logs in with google, this user would be automatically added into database.
* Disqus comments: A user can comment on a particular video using Disqus. Disqus also enables user to view all the comments made by another user (click on the name in Disqus comments)
* Follow and unfollow: (Only available after a user has logged in) There is a follow or unfollow button beside the name of the author of a post.
* Follow management: (Only available after a user has logged in) On the profile page, a user can manage all the people he or she is following.
* Editing post: (Only available to administrators or the creator of a post) The user can see an Editor button on the post page which can lead the user to an editing page for the post
* Upload new post: (Only available after a user has logged in). The upload new post button is on the navigation bar.
* Manage users: (Only available to administrators after they log in) Administrators can edit or delete any user in the database.
* Searching based on tags: On each individual post page, by clicking on one of the tags, all the posts with the same tag will be shown
* View posts by a particular user: By clicking on a user’s name, all the posts created by that user will be shown 

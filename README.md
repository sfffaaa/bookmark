[![Build Status](https://travis-ci.com/sfffaaa/bookmark.svg?branch=master)](https://travis-ci.com/sfffaaa/bookmark)


### TODO
#### 1. Database
Right now, I can choose MongoDB or SQLite. No matter using MongoDB or SQLite,
using the alternative database which is clean and blank is necessary when tests execute. </br>
##### Solution
I use Sequelize and SQLite to implement the database and ORM.
#### 2. Brief API
##### Example
``` bash
Request: URL
Response: description, title, image
Reference: https://www.facebook.com/message_share_attachment/fromURI/?dpr=2
```
##### Implementation
One way is using PhantomJS or ZombieJS for crawling URL data. </br>
[PhantomJS Reference](http://phantomjs.org/page-automation.html) </br>
[PhantomJS Crawler](https://segmentfault.com/a/1190000009409131)
##### Solution
The application doesn't expose this API for users. When create and upgrade API, executed, it called related functions automatically.

#### 3. RESTful API
Maybe I should change the API to RESTful API.

#### 4. Frontend with webpack
[Webpack](https://www.kancloud.cn/hfpp2012/webpack-tutorial/467002)

### Question
#### Note
##### await v.s. promise
There is an inconsistency issue between Await and Promise. I use Await somewhere but use Promise in the other part.
#### Bug
##### prefer-template
Below code fails when running by PhantomJS
``` bash
const filename = `${output}.png`;
```
##### viewportSize seems not to work with PhantomJS
[Reference](https://stackoverflow.com/questions/13390859/viewportsize-seems-not-to-work-with-phantomjs)

##### Travis CI has an error when comparing two picture from capturing tool.
The local machine works fine, but Travis-CI has a failure. The root cause hasn't been found yet, so I mark and ignore this error.

##### Unlink DB file will induce SQLITE_READONLY error
SequelizeDatabaseError: SQLITE_READONLY: attempt to write a read-only database. But if I don't unlink the DB file, everything will be fine. So I guess there is a connection exists even after unlinking the database file.

#### Reference
``` bash
https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er
```
### Reference
``` bash
https://larrylu.blog/improve-code-quality-using-eslint-742cf1f384f1
https://www.kancloud.cn/hfpp2012/webpack-tutorial/467004
https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
https://alligator.io/react/modal-component/
https://www.jianshu.com/p/edaf43e9384f
https://ithelp.ithome.com.tw/articles/10185095
https://github.com/parcel-bundler/parcel/issues/554
https://stackoverflow.com/questions/42196583/webpack-cant-resolve-style
https://fakefish.github.io/react-webpack-cookbook/Loading-CSS.html
```

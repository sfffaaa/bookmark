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

#### 5. Development
Run npm start, all reset actions such as reset db and picture are integreted into command, npm start.

#### 6. Add new redux flow
1. Add action in action-types.js
2. Add api related logic in middleware/api.js.
3. Add business login in bookmarkReducer.js
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

##### Mocha need upgrade for ES6
1. mocha --compilers js:@babel/register test/redux.test/actions.test.js </br>
Error: Cannot find module '@babel/register'
2. After install</br>
Error: Cannot find module '@babel/preset-stage-0' from '/Users/jaypan/code/bookmark-test-02'
3. After install</br>
As of v7.0.0-beta.55, we've removed Babel's Stage presets.
Please consider reading our blog post on this decision at
https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
for more details
4. npx babel-upgrade --write</br>
5. npm install dev environment again</br>
npm install --only=dev
6. mocha --require @babel/register test/redux.test/actions.test.js</br>
(node:13048) DeprecationWarning: "--compilers" will be removed in a future version of Mocha; see https://git.io/vdcSr for more info

##### Jest replace Mocha
1. npm install --save-dev babel-jest babel-core@^7.0.0-bridge.0 regenerator-runtime jest</br>
ReferenceError: regeneratorRuntime is not defined</br>
https://jestjs.io/docs/en/getting-started
2. npm install --save-dev @babel/plugin-transform-runtime
3. "@babel/transform-runtime" in .babelrc</br>
https://segmentfault.com/q/1010000006801859
4. npm install --save-dev @babel/runtime
5. change all specific syntax in Mocha to Jest

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
http://huli.logdown.com/posts/294284-javascript-redux-middleware-details-tutorial
https://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr/36620420#36620420
```

[![Build Status](https://travis-ci.com/sfffaaa/bookmark.svg?branch=master)](https://travis-ci.com/sfffaaa/bookmark)


### TODO
#### 1. Database
Right now, I can choose MongoDB or SQLite. No matter using MongoDB or SQLite,
using the alternative database which is clean and blank is necessary when tests execute. </br>
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

### Question
#### Note
None
#### Bug
##### prefer-template
Below code fails when runninb by PhantomJS
``` bash
const filename = `${output}.png`;
```
##### viewportSize seems not to work with PhantomJS
[Reference](https://stackoverflow.com/questions/13390859/viewportsize-seems-not-to-work-with-phantomjs)

##### Travis CI has error when comparing two picture from capturing tool.
Local machine works fine, but Travis-CI has failure. The root cause isn't found, so I mark and ignore this error.

##### Unlink DB file will induce SQLITE_READONLY error
SequelizeDatabaseError: SQLITE_READONLY: attempt to write a readonly database. But if I don't unlink the db file, everything will be fine. So I guess there is a connection exists even after unlinking the database file.

#### Reference
``` bash
https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er
```

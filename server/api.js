const fs = require('fs');
const db = require('../models');
const { GetURLInfoPromise } = require('./myutils');


module.exports = (router) => {
    router.get('/', async (req, res) => {
        res.json({
            success: false,
        });
    });

    router.post('/api/create', async (req, res) => {
        let urlInfo;
        GetURLInfoPromise(req.body.url).then((data) => {
            urlInfo = data;
            return db.Bookmark.create({
                url: data.url,
                title: data.title,
                description: data.description,
                picPath: data.picPath,
            });
        /* eslint-disable-next-line no-unused-vars */
        }).then((data) => {
            res.json({
                data: urlInfo,
                success: true,
            });
        }).catch((err) => {
            res.json({
                success: false,
                err: err.message,
            });
        });
    });

    router.post('/api/edit', async (req, res) => {
        // [TODO] Need implement
        res.json({
            success: false,
        });
    });

    router.post('/api/list', async (req, res) => {
        const bookmarks = await db.Bookmark.findAll({});
        res.json({
            data: bookmarks,
            success: true,
        });
    });

    router.post('/api/delete', async (req, res) => {
        let deleteParam;
        if (req.body.id) {
            deleteParam = { id: req.body.id };
        } else if (req.body.url) {
            deleteParam = { url: req.body.url };
        } else {
            res.json({
                success: false,
                message: "url and id don't exist",
            });
            return;
        }
        const bookmarks = await db.Bookmark.findAll({ where: deleteParam });
        db.Bookmark.destroy({ where: deleteParam });
        if (bookmarks.length !== 0) {
            fs.unlinkSync(bookmarks[0].picPath);
        }
        res.json({
            success: true,
        });
    });

    router.post('/api/brief', async (req, res) => {
        // [TODO] Need implement
        res.json({
            success: false,
        });
    });
};

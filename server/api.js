const fs = require('fs');
const db = require('../models');
const { GetURLInfoPromise } = require('./myutils');

module.exports = (router) => {
    router.get('/', async (req, res) => {
        console.log(__dirname);
        res.sendFile('index.html', { root: `${__dirname}/../build/` });
    });

    router.post('/api/create', async (req, res) => {
        try {
            const urlInfo = await GetURLInfoPromise(req.body.url);
            await db.Bookmark.create({
                url: urlInfo.url,
                title: urlInfo.title,
                description: urlInfo.description,
                picPath: urlInfo.picPath,
            });
            res.json({
                data: urlInfo,
                success: true,
            });
        } catch (err) {
            res.json({
                success: false,
                err: err.message,
            });
        }
    });

    router.post('/api/list', async (req, res) => {
        try {
            const bookmarks = await db.Bookmark.findAll({});
            res.json({
                data: bookmarks,
                success: true,
            });
        } catch (err) {
            res.json({
                success: false,
                err: err.message,
            });
        }
    });

    router.post('/api/delete', async (req, res) => {
        try {
            let deleteParam;
            if (req.body.id) {
                deleteParam = { id: req.body.id };
            } else if (req.body.url) {
                deleteParam = { url: req.body.url };
            } else {
                throw new Error("url and id don't exist");
            }
            const bookmarks = await db.Bookmark.findAll({ where: deleteParam });
            await db.Bookmark.destroy({ where: deleteParam });
            if (bookmarks.length !== 0) {
                fs.unlinkSync(bookmarks[0].picPath);
            }
            res.json({
                success: true,
            });
        } catch (err) {
            res.json({
                success: false,
                err: err.message,
            });
        }
    });

    router.post('/api/upgrade', async (req, res) => {
        try {
            let upgradeParam;
            if (req.body.id) {
                upgradeParam = { id: req.body.id };
            } else if (req.body.url) {
                upgradeParam = { url: req.body.url };
            } else {
                throw new Error("url and id don't exist");
            }
            const bookmarks = await db.Bookmark.findAll({
                where: upgradeParam,
            });
            if (bookmarks.length === 0) {
                throw new Error("url and id don't exist in database");
            }
            const data = GetURLInfoPromise(bookmarks[0].url);
            await db.Bookmark.update({
                url: data.url,
                title: data.title,
                description: data.description,
                picPath: data.picPath,
            }, {
                where: upgradeParam,
            });
            res.json({
                success: true,
            });
        } catch (err) {
            res.json({
                success: false,
                err: err.message,
            });
        }
    });
};

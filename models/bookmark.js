module.exports = (sequelize, DataTypes) => {
    const bookmark = sequelize.define('Bookmark', {
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        picName: DataTypes.STRING,
    }, {});
    return bookmark;
};

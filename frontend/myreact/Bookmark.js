import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ data, onDeleteClick }) => (
    <li
        onClick={onDeleteClick}
    >
        id: {data.id},
        title: {data.title},
        description: {data.description},
        url: {data.url},
        picPath: {data.picPath}
    </li>
);

Bookmark.propTypes = {
    data: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default Bookmark;

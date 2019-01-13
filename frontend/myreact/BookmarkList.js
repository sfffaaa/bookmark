import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Bookmark from './Bookmark';
import { deleteBookmark } from '../myredux/actions/bookmarks';

const BookmarkList = ({ bookmarks, onBookmarkDeleteClick }) => (
    <ul>
        {bookmarks.map(bookmark => (
            <Bookmark
                key={bookmark.id}
                data={bookmark}
                onDeleteClick={() => onBookmarkDeleteClick(bookmark.id)}
            />
        ))}
    </ul>
);

BookmarkList.propTypes = {
    bookmarks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        picPath: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onBookmarkDeleteClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    bookmarks: state.bookmarks.data,
});

const mapDispatchToProps = dispatch => ({
    onBookmarkDeleteClick: (id) => {
        console.log(`gogogo ${id}`);
        dispatch(deleteBookmark(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);

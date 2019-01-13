import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listBookmark } from '../myredux/actions/bookmarks';

const RefrestBtn = ({ onRefreshClick }) => (
    <button type='button' onClick={onRefreshClick}>Refresh</button>
);

RefrestBtn.propTypes = {
    onRefreshClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onRefreshClick: () => {
        dispatch(listBookmark());
    },
});

export default connect(null, mapDispatchToProps)(RefrestBtn);

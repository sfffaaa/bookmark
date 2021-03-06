const asyncActionType = type => ({
    TYPE: `${type}_TYPE`,
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
});


export const CREATE_BOOKMARK_ACTION_TYPE = asyncActionType('CREATE_BOOKMARK');
export const LIST_BOOKMARK_ACTION_TYPE = asyncActionType('LIST_BOOKMARK');
export const DELETE_BOOKMARK_ACTION_TYPE = asyncActionType('DELETE_BOOKMARK');
export const UPGRADE_BOOKMARK_ACTION_TYPE = asyncActionType('UPGRADE_BOOKMARK');

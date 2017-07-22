/**
 * Created by kenn on 16/7/31.
 */
import { MM, M, Z, RD, LR, F, K } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { LIKE } from '../../../store/api'


export default ( state = {}, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( MM(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.LIKE_FOLDER_ADD] = ( state, data, id, requestData ) => {

    if( !state.fav ) {
        state.fav = {}
    }

    requestData.FolderId = Number(data)
    requestData.FolderData = {}
    state.fav[data] = requestData
    //LR(LIKE, t.LIKE_FOLDER_ADD, state)
    return state
}

c[ t.LIKE_FOLDER_REMOVE] = ( state, data, id, requestData ) => {
    delete state.fav[id]
    return state
}

c[ t.LIKE_EDIT_FOLDERNAME] = ( state, data, id, requestData ) => {
    state.fav[requestData.Id] = M(state.fav[requestData.Id], requestData)
    return state
}

c[ t.LIKE_FOLDER_LOAD] = ( state, data ) => {
    if( !data ) {
        return state
    }

    state.fav = {}

    data.forEach(( folder ) => {
        const id = folder.FolderId
        if( !state.fav[id] ) {
            state.fav[id] = {}
            state.fav[id].FolderName = folder.FolderName
            state.fav[id].FolderId = folder.FolderId
            state.fav[id].FolderType = folder.FolderType
            state.fav[id].CreatedAt = folder.CreatedAt
        }

        if( folder.Id ) {
            delete folder.FolderName
            delete folder.FolderId
            delete folder.FolderType
            delete folder.CreatedAt
            if( !state.fav[id].FolderData ) {
                state.fav[id].FolderData = {}
            }
            if( folder.GoodsSpec && typeof folder.GoodsSpec == 'object' ) {
                folder.GoodsSpec = JSON.parse(folder.GoodsSpec)
            }

            state.fav[id].FolderData[folder.Id] = folder
        }
    })
    LR('likes', t.LIKE_FOLDER_LOAD, state)
    return state
}

c[ t.LIKE_LOAD] = ( state, data, folderData ) => {
    state.fav[folderData.folderId].FolderData = Z(data)
    return state
}

c[ t.LIKE_ADD] = ( state, data, id, requestData ) => {
    requestData.Id = Number(data)
    // LR(LIKE, t.LIKE_ADD, state.fav[requestData.FolderId])
    if( !state.fav[requestData.FolderId].FolderData ) {
        state.fav[requestData.FolderId].FolderData = {}
    }

    state.fav[requestData.FolderId].FolderData[data] = requestData
    return state
}

c[ t.LIKE_COUNT] = ( state, data, id, requestData ) => {
    LR(LIKE, t.LIKE_COUNT, state.fav[requestData.folderId])
    state.fav[requestData.folderId].FolderData[requestData.Id].GoodsNum = requestData.GoodsNum
    return state
}

c[ t.LIKE_REMOVE] = ( state, data, id, requestData ) => {
     //LR(LIKE, t.LIKE_REMOVE, state.fav[requestData.folderId].FolderData)
    delete state.fav[requestData.folderId].FolderData[requestData.Id]
    return state
}

c[ t.LIKE_REMOVE_ALL] = ( state, data, id, requestData ) => {
    // LR(LIKE, t.LIKE_ADD, data)
    // delete state.fav[requestData].FolderData[id]
    let goodId = requestData.GoodsId
    F(state.fav, ( favData, folderId ) => {
        F( favData.FolderData, ( favs, favId ) => {
            if( favs.GoodsId == goodId) {
                delete state.fav[folderId].FolderData[favId]
            }
        } )
    })

    // LR(LIKE, t.LIKE_REMOVE_ALL, requestData.get('GoodsId'))
    return state
}
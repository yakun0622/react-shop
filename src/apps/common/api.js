/**
 * Created by kenn on 2016/10/16.
 */
import * as TYPE from '../../actions/type'
let api = {}
api[TYPE.ORDER_LOAD] = 'POST:order/user'
api[TYPE.ORDER_GOODSES_LOAD] = 'POST:order/goodses'
api[TYPE.ORDER_USER_CHANG_STATE] = 'order/change_state'
api[TYPE.ORDER_USER_RETURN] = 'POST:store/refund_return'

api[TYPE.TAG_USER_REMOVE] = 'POST:goods_tag/remove'

//相册
api[TYPE.ALBUM_LOAD] = 'album_pic'
api[TYPE.ALBUM_EDIT] = 'put:album_pic'
api[TYPE.ALBUM_REMOVE] = 'delete:album_pic'
api[TYPE.ALBUM_ADD] = 'post:album_pic'

export default api
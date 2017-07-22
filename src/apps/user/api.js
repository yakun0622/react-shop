/**
 * Created by kenn on 16/9/8.
 */

import * as  T  from './type'
const api = {}

//群组
api[T.GROUP_ADD] = 'POST:group'
api[T.GROUP_OWNER_LOAD] = 'group'
api[T.GROUP_CHILD_LOAD] = 'group'
api[T.GROUP_JOIN_LOAD] = 'member_group'

api[T.GROUP_MEMBER_APPLY] = 'post:member_group'

//组成员
api[T.MEMBER_LOAD] = 'member_group'
api[T.MEMBER_PASS] = 'put:member_group'
api[T.MEMBER_ASSIGN_ROLE] = 'put:member_group/addrole'
api[T.MEMBER_CHANGE_ROLE] = 'put:member_group/changerole'
api[T.MEMBER_REMOVE] = 'delete:member_group'

//角色
api[T.ROLE_LOAD] = 'role'
api[T.ROLE_ADD] = 'POST:role'
api[T.ROLE_EDIT] = 'put:role'
api[T.ROLE_UNLOCK] = 'put:role/unlock'
api[T.ROLE_LOCK] = 'put:role/lock'
api[T.PERMISSION] = 'role/permission'

//标签
api[T.TAG_LOAD] = 'tag'
api[T.TAG_ADD] = 'POST:tag'
api[T.TAG_SAVE] = 'put:tag'
api[T.TAG_UNLOCK] = 'put:tag/unlock'
api[T.TAG_LOCK] = 'put:tag/lock'

api[T.TAG_SHARE] = 'post:tag/share'
api[T.TAG_UNSHARE] = 'post:tag/unshare'
api[T.TAG_SHARE_LOAD] = 'get:tag/share'

api[T.TAG_ROLE_LOAD] = 'get:tag/role'
api[T.TAG_ROLE_ADD] = 'post:tag/role'
api[T.TAG_ROLE_REMOVE] = 'delete:tag/role'

//审批
api[T.APPROVE_ORDER_LOAD] = 'approve_order'
api[T.APPROVE_ORDER_APPROVE] = 'post:approve_order/approve'


export default api
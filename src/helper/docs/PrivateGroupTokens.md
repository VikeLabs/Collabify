<a name="PrivateGroupTokens"></a>

## PrivateGroupTokens
API to handle group token and local storage

**Kind**: global class  

* [PrivateGroupTokens](#PrivateGroupTokens)
    * [.setGroupToken(groupID, access_token)](#PrivateGroupTokens.setGroupToken)
    * [.getGroupToken(groupID)](#PrivateGroupTokens.getGroupToken) ⇒ <code>string</code> \| <code>null</code>

<a name="PrivateGroupTokens.setGroupToken"></a>

### PrivateGroupTokens.setGroupToken(groupID, access_token)
Maps/overrides a `groupID:token` in private group local storage entry

**Kind**: static method of [<code>PrivateGroupTokens</code>](#PrivateGroupTokens)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| groupID | <code>string</code> | private group ID |
| access_token | <code>string</code> | JWT token |

<a name="PrivateGroupTokens.getGroupToken"></a>

### PrivateGroupTokens.getGroupToken(groupID) ⇒ <code>string</code> \| <code>null</code>
Gets the `access_token` of the provided `groupID`

**Kind**: static method of [<code>PrivateGroupTokens</code>](#PrivateGroupTokens)  
**Returns**: <code>string</code> \| <code>null</code> - jwtToken  
**Access**: public  

| Param | Type |
| --- | --- |
| groupID | <code>string</code> | 


/**
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークン。
 */
function createBaseHeaders_(token) {
  return {
    accept: "application/json",
    "x-chatworktoken": token,
  };
}

/**
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークン。
 */
function createFormHeaders_(token) {
  return {
    ...createBaseHeaders_(token),
    "content-type": "application/x-www-form-urlencoded",
  };
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-me)
 * 自分自身の情報を取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Me}
 */
function getMe(token) {
  const res = UrlFetchApp.fetch(`${ApiV2_}/me`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-my-status)
 * 自分の未読数、未読To数、未完了タスク数を取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {MyStatus}
 */
function getMyStatus(token) {
  const res = UrlFetchApp.fetch(`${ApiV2_}/my/status`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-my-tasks)
 * 自分のタスク一覧を最大100件まで取得します。
 *
 * @param {object} [queryParams]
 * **任意**
 *
 * 取得したデータをカスタマイズするためのパラメータを含むオブジェクト。
 *
 * @param {string | number} [queryParams.assigned_by_account_id]
 * **任意**
 *
 * タスクを割り当てたユーザーのアカウントID。
 *
 * @param {'open' | 'done'} [queryParams.status]
 * **任意**
 *
 *
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {MyTask[]}
 */
function getMyTasks(token, queryParams) {
  const queryString = queryStringFromParamsObject_(queryParams);

  const res = UrlFetchApp.fetch(`${ApiV2_}/my/tasks${queryString}`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-contacts)
 * 自分のコンタクト一覧を取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Contact[]}
 */
function getContacts(token) {
  const res = UrlFetchApp.fetch(`${ApiV2_}/contacts`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms)
 * チャット一覧を取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInfo[]}
 */
function getRooms(token) {
  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`POST`（投稿・追加）](https://developer.chatwork.com/reference/post-rooms)
 * 新しいグループチャットを作成します。
 *
 * @param {object} formData
 *
 * @param {string} formData.name
 * グループチャットの名前
 *
 * @param {string} [formData.description]
 * **任意**
 * グループチャットの概要
 *
 * @param {number} [formData.link]
 * **任意**
 * 招待リンクを作成するか
 *
 * @param {string} [formData.link_code]
 * **任意**
 * 招待リンクのパス部分。
 * 省略するとランダムな文字列となります。使用できない文字を含んでいる場合、
 * またはすでに存在する値が指定された場合は400エラーを返します。
 *
 * @param {number} [formData.link_need_acceptance]
 * **任意**
 * 参加に管理者の承認を必要とするか
 *
 * @param {string | (string | number)[]} formData.members_admin_ids
 * 管理者権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 * 少なくとも1人以上のユーザーを指定する必要があります。
 *
 * @param {string | (string | number)[]} [formData.members_member_ids]
 * **任意**
 * メンバー権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 *
 * @param {string | (string | number)[]} [formData.members_readonly_ids]
 * **任意**
 * 閲覧のみ権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 *
 * @param { 'group'
 *        | 'check'
 *        | 'document'
 *        | 'meeting'
 *        | 'event'
 *        | 'project'
 *        | 'business'
 *        | 'study'
 *        | 'security'
 *        | 'star'
 *        | 'idea'
 *        | 'heart'
 *        | 'magcup'
 *        | 'beer'
 *        | 'music'
 *        | 'sports'
 *        | 'travel'
 * } formData.icon_preset
 * グループチャットのアイコンの種類
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomsPostResponse}
 */
function postRooms(token, formData) {
  if (!formData.name) {
    throw new MissingParameterError_("formData.name");
  }
  if (!formData.members_admin_ids) {
    throw new MissingParameterError_("formData.members_admin_ids");
  }

  if (Array.isArray(formData.members_admin_ids)) {
    console.log("Joining members_admin_ids into comma-separated string...");
    formData.members_admin_ids = formData.members_admin_ids.join(",");
  }
  if (Array.isArray(formData.members_member_ids)) {
    console.log("Joining members_member_ids into comma-separated string...");
    formData.members_member_ids = formData.members_member_ids.join(",");
  }
  if (Array.isArray(formData.members_readonly_ids)) {
    console.log("Joining members_readonly_ids into comma-separated string...");
    formData.members_readonly_ids = formData.members_readonly_ids.join(",");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms`, {
    method: "post",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id)
 * チャットの情報（名前、アイコン、種類など）を取得します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInfoWithDescription}
 */
function getRoom(token, roomId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id)
 * チャットの情報（名前、アイコンなど）を変更します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.name
 * チャットの名前
 *
 * @param {string} formData.description
 * チャットの概要
 *
 * @param {string} formData.icon_preset
 * チャットのアイコンの種類
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomPutResponse}
 */
function putRoom(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}`, {
    method: "put",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`DELETE`（削除）](https://developer.chatwork.com/reference/delete-rooms-room_id)
 * グループチャットを退席、または削除します。
 * グループチャットを退席すると、このグループチャットにある自分が担当のタスク、および自分が送信したファイルがすべて削除されます。
 * グループチャットを削除すると、このグループチャットにあるメッセージ、タスク、ファイルがすべて削除されます。
 * **（一度削除すると元に戻せません。）**
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {'leave'|'delete'} formData.action_type 操作の種類
 * - `leave` → 退席
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * - `delete` → 削除
 */
function deleteRooms(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.action_type) {
    throw new MissingParameterError_("formData.action_type");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}`, {
    method: "delete",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-members)
 * チャットのメンバー一覧を取得します。
 *
 * @param {number} roomId ルームID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomMember[]}
 */
function getRoomMembers(token, roomId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/members`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-members)
 * チャットのメンバーを一括で変更します。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {string | (string | number)[]} formData.members_admin_ids
 * **管理者**権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 * 少なくとも1人以上のユーザーを指定する必要があります。
 *
 * @param {string | (string | number)[]} formData.members_member_ids
 * **メンバー**権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 *
 * @param {string | (string | number)[]} formData.members_readonly_ids
 * **閲覧のみ**権限にしたいユーザーの一覧。
 * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomMembersPutResponse}
 */
function putRoomMembers(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.members_admin_ids) {
    throw new MissingParameterError_("formData.members_admin_ids");
  }

  if (Array.isArray(formData.members_admin_ids)) {
    console.log("Joining members_admin_ids into comma-separated string...");
    formData.members_admin_ids = formData.members_admin_ids.join(",");
  }
  if (Array.isArray(formData.members_member_ids)) {
    console.log("Joining members_member_ids into comma-separated string...");
    formData.members_member_ids = formData.members_member_ids.join(",");
  }
  if (Array.isArray(formData.members_readonly_ids)) {
    console.log("Joining members_readonly_ids into comma-separated string...");
    formData.members_readonly_ids = formData.members_readonly_ids.join(",");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/members`, {
    method: "put",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-messages)
 * チャットのメッセージ一覧を最大100件まで取得します。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} queryParams
 *
 * @param {boolean} queryParams.force
 * 強制的に最大件数まで取得するかどうか。
 * `false`を指定した場合（既定）は前回取得分からの差分のみを返しますが、
 * `true`を指定した場合は強制的に最新のメッセージを最大100件まで取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Message[]}
 */
function getRoomMessages(token, roomId, queryParams) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  queryParams.force = queryParams.force ? "1" : "0";
  const queryString = queryStringFromParamsObject_(queryParams);

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/messages${queryString}`,
    {
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`POST`（投稿・追加）](https://developer.chatwork.com/reference/post-rooms-room_id-messages)
 * チャットに新しいメッセージを投稿します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.body
 * メッセージ本文
 *
 * @param {boolean} formData.self_unread
 * 投稿するメッセージを自分から見て未読にするか。
 * `false`を指定した場合（既定）は既読、`true`を指定した場合は未読にします。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {UpdatedMessage}
 */
function postRoomMessage(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.body) {
    throw new MissingParameterError_("formData.body");
  }

  formData.self_unread = formData.self_unread ? "1" : "0";

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/messages`, {
    method: "post",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-messages-read)
 * チャットのメッセージを既読にします。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.message_id
 * 既読にするメッセージのID。
 * ここで指定したIDまでのメッセージを既読にします。すでに既読になっている場合は400エラーを返します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomMessagesReadPutResponse}
 */
function putRoomMessagesRead(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/messages/read`, {
    method: "put",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "メッセージ");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-messages-unread)
 * チャットのメッセージを未読にします。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.message_id
 * 未読にするメッセージのID。
 * ここで指定したID以降のメッセージを未読にします。すでに未読になっている場合は400エラーを返します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomMessagesUnreadPutResponse}
 */
function putRoomMessagesUnread(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.message_id) {
    throw new MissingParameterError_("formData.message_id");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/messages/unread`, {
    method: "put",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "メッセージ");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-messages-message_id)
 * チャットのメッセージを取得します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {number} messageId
 * メッセージID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Message}
 */
function getRoomMessage(token, roomId, messageId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!messageId) {
    throw new MissingParameterError_("messageId");
  }

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/messages/${messageId}`,
    {
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "メッセージ");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-messages-message_id)
 * チャットのメッセージを変更します。
 *
 * @param {number} roomId ルームID
 *
 * @param {number} messageId メッセージID
 *
 * @param {object} formData
 *
 * @param {string} formData.body
 * 更新するメッセージ本文
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {UpdatedMessage}
 */
function putRoomMessage(token, roomId, messageId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!messageId) {
    throw new MissingParameterError_("messageId");
  }
  if (!formData.body) {
    throw new MissingParameterError_("formData.body");
  }

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/messages/${messageId}`,
    {
      method: "put",
      headers: createFormHeaders_(token),
      payload: formData,
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "メッセージ");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`DELETE`（削除）](https://developer.chatwork.com/reference/delete-rooms-room_id-messages-message_id)
 * チャットのメッセージを削除します。
 *
 * @param {number} roomId ルームID
 *
 * @param {number} messageId メッセージID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {UpdatedMessage}
 */
function deleteRoomMessage(token, roomId, messageId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!messageId) {
    throw new MissingParameterError_("messageId");
  }

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/messages/${messageId}`,
    {
      method: "delete",
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "メッセージ");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-tasks)
 * チャットのタスク一覧を最大100件まで取得します。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} [queryParams]
 * **任意**
 * 取得したデータをカスタマイズするためのパラメータを含むオブジェクト。
 *
 * @param {number} [queryParams.account_id]
 * **任意**
 *
 * @param {string | number} [queryParams.assigned_by_account_id]
 * **任意**
 *
 * @param {'open' | 'done'} [queryParams.status]
 * **任意**
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Task[]}
 */
function getRoomTasks(token, roomId, queryParams) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  if (!isValidTaskStatus_(queryParams.status)) {
    console.warn(
      `Unknown task status "${queryParams.status}", using default (undefined)`
    );
    delete queryParams.status;
  }
  const queryString = queryStringFromParamsObject_(queryParams);

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/tasks${queryString}`,
    {
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`POST`（投稿・追加）](https://developer.chatwork.com/reference/post-rooms-room_id-tasks)
 * チャットに新しいタスクを追加します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.body
 * タスクの内容
 *
 * @param {string | (string | number)[]} formData.to_ids
 * 担当者にしたいユーザーの一覧。
 * チャットに所属しているユーザーのアカウントIDを指定してください。
 *
 * @param {number | string} [formData.limit]
 * **任意**
 *
 * タスクの期限。
 * Unix時間（秒）で指定してください。
 *
 * @param {'none' | 'date' | 'time'} [formData.limit_type='time']
 * **任意**
 *
 * タスクの期限の種類。
 * - `none`を指定した場合は期限なしのタスクを作成します。
 * - `date`を指定した場合は日付期限のタスクを作成します。
 * - `time`を指定した場合は時間期限のタスクを作成します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {PostTasksResponse}
 */
function postRoomTasks(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.body) {
    throw new MissingParameterError_("formData.body");
  }
  if (!formData.to_ids) {
    throw new MissingParameterError_("formData.to_ids");
  }

  if (!formData.limit_type) {
    formData.limit_type = "time";
  } else if (!isValidLimitType_(formData.limit_type)) {
    throw new InvalidParameterError_(
      "formData.limit_type",
      formData.limit_type,
      '"none" または "date" または "time"'
    );
  }

  if (Array.isArray(formData.to_ids)) {
    console.log("Joining to_ids into comma-separated string...");
    formData.to_ids = formData.to_ids.join(",");
  }

  if (typeof formData.limit === "number") {
    formData.limit = formData.limit.toString();
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/tasks`, {
    method: "post",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-tasks-task_id)
 * チャットのタスクの情報を取得します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {number} taskId
 * タスクID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Task}
 */
function getRoomTask(token, roomId, taskId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!taskId) {
    throw new MissingParameterError_("taskId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/tasks/${taskId}`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "タスク");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-tasks-task_id-status)
 * チャットのタスクの完了状態を変更します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {number} taskId
 * タスクID
 *
 * @param {object} formData
 *
 * @param {'open' | 'done'} formData.body タスクの完了状態。
 * - `done`を指定した場合はタスクを完了にします。
 * - `open`を指定した場合はタスクを未完了にします。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {TaskIdResponse}
 */
function putRoomTaskStatus(token, roomId, taskId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!taskId) {
    throw new MissingParameterError_("taskId");
  }
  if (!formData.body) {
    throw new MissingParameterError_("formData.body");
  } else if (!isValidTaskStatus_(formData.body)) {
    throw new InvalidParameterError_(
      "formData.body",
      formData.body,
      '"done" または "open"'
    );
  }

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/tasks/${taskId}/status`,
    {
      method: "put",
      headers: createFormHeaders_(token),
      payload: formData,
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "タスク");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-files)
 * チャットのファイル一覧を最大100件まで取得します。
 *
 * @param {number} roomId
 * ルームID
 *
 * @param {object} [queryParams]
 * **任意**
 *
 * 取得したデータをカスタマイズするためのパラメータを含むオブジェクト。
 *
 *
 * @param {number} [queryParams.account_id]
 * **任意**
 *
 * アップロードしたユーザーのアカウントID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {File[]}
 */
function getRoomFiles(token, roomId, queryParams) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const queryString = queryStringFromParamsObject_(queryParams);

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/files${queryString}`,
    {
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`POST`（投稿・追加）](https://developer.chatwork.com/reference/post-rooms-room_id-files)
 * チャットに新しいファイルをアップロードします。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {Blob | Uint8Array} formData.file
 * アップロードするファイルのバイナリ。
 * ファイルサイズの上限は5MBです。
 *
 * @param {string} formData.message
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {UploadedFiles}
 */
function postRoomFiles(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!formData.file) {
    throw new MissingParameterError_("formData.file");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/files`, {
    method: "post",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-files-file_id)
 * チャットのファイルの情報を取得します。
 *
 * @param {number} roomId ルームID
 *
 * @param {number} fileId ファイルID
 *
 * @param {object} [queryParams]
 * **任意**
 *
 * 取得したデータをカスタマイズするためのパラメータを含むオブジェクト。
 *
 *
 * @param {boolean} [queryParams.create_download_url]
 * **任意**
 *
 * ダウンロードURLを作成するか。
 * 作成されるダウンロードURLは30秒間のみ有効です。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {DownloadableFile}
 */
function getRoomFile(token, roomId, fileId, queryParams) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }
  if (!fileId) {
    throw new MissingParameterError_("fileId");
  }

  if (queryParams.create_download_url) {
    queryParams.create_download_url = queryParams.create_download_url ? 1 : 0;
  }
  const queryString = queryStringFromParamsObject_(queryParams);

  const res = UrlFetchApp.fetch(
    `${ApiV2_}/rooms/${roomId}/files/${fileId}${queryString}`,
    {
      headers: createBaseHeaders_(token),
    }
  );

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "ファイル");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-rooms-room_id-link)
 * チャットへの招待リンクを取得します。
 *
 * @param {number} roomId ルームID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInvitationLink}
 */
function getRoomLink(token, roomId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/link`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`POST`（投稿・追加）](https://developer.chatwork.com/reference/post-rooms-room_id-link)
 * チャットへの招待リンクを変更します。
 * 招待リンクが無効になっている場合は400エラーを返します。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.code
 * 招待リンクのパス部分。
 * 省略するとランダムな文字列となります。
 *
 * @param {boolean} formData.need_acceptance
 * 参加に管理者の承認を必要とするか
 *
 * @param {string} formData.description
 * 招致リンクのページに表示される説明文
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInvitationLink}
 */
function postRoomLink(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  if (queryParams.need_acceptance) {
    queryParams.need_acceptance = queryParams.need_acceptance ? 1 : 0;
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/link`, {
    method: "post",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-rooms-room_id-link)
 * チャットへの招待リンクを変更します。
 * 招待リンクが無効になっている場合は400エラーを返します。
 *
 * @param {number} roomId ルームID
 *
 * @param {object} formData
 *
 * @param {string} formData.code
 * 招待リンクのパス部分。
 * 省略するとランダムな文字列となります。
 *
 * @param {boolean} formData.need_acceptance
 * 参加に管理者の承認を必要とするか
 *
 * @param {string} formData.description
 * 招致リンクのページに表示される説明文
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInvitationLink}
 */
function putRoomLink(token, roomId, formData) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  if (queryParams.need_acceptance) {
    queryParams.need_acceptance = queryParams.need_acceptance ? 1 : 0;
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/link`, {
    method: "put",
    headers: createFormHeaders_(token),
    payload: formData,
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`DELETE`（削除）](https://developer.chatwork.com/reference/delete-rooms-room_id-link)
 * チャットへの招待リンクを削除します。
 * 招待リンクが無効になっている場合は400エラーを返します。
 *
 * @param {number} roomId ルームID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {RoomInvitationLink}
 */
function deleteRoomLink(token, roomId) {
  if (!roomId) {
    throw new MissingParameterError_("roomId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/rooms/${roomId}/link`, {
    method: "delete",
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`GET`（取得）](https://developer.chatwork.com/reference/get-incoming_requests)
 * 自分へのコンタクト承認依頼一覧を最大100件まで取得します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {ContactRequest[]}
 */
function getIncomingRequests(token) {
  const res = UrlFetchApp.fetch(`${ApiV2_}/incoming_requests`, {
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode());
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`PUT`（更新・変更）](https://developer.chatwork.com/reference/put-incoming_requests-request_id)
 * 自分へのコンタクト承認依頼を`承認`します。
 *
 * @param {number} requestId
 * リクエストID
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @return {Omit<ContactRequest, 'request_id'>}
 */
function putIncomingRequests(token, requestId) {
  if (!requestId) {
    throw new MissingParameterError_("requestId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/incoming_requests/${requestId}`, {
    method: "put",
    headers: createFormHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "コンタクト");
  }

  return JSON.parse(res.getContentText());
}

/**
 * [`DELETE`（削除）](https://developer.chatwork.com/reference/delete-incoming_requests-request_id)
 * 自分へのコンタクト承認依頼を`拒否`します。
 *
 * @param {string} token
 * Chatworkメッセージの送信に使用するAPIトークンです。
 * 社内のChatwork管理者からChatwork APIの利用を許可されている場合、
 * APIトークンは[**ここ**](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php)で取得できます。
 *
 * @param {number} requestId リクエストID
 */
function deleteIncomingRequest(token, requestId) {
  if (!requestId) {
    throw new MissingParameterError_("requestId");
  }

  const res = UrlFetchApp.fetch(`${ApiV2_}/incoming_requests/${requestId}`, {
    method: "delete",
    headers: createBaseHeaders_(token),
  });

  if (isHttpError_(res)) {
    throw new ChatworkError_(res.getResponseCode(), "コンタクト");
  }

  return JSON.parse(res.getContentText());
}

/**
 * @arg {string} taskStatus
 * @return {taskStatus is TaskStatus}
 */
function isValidTaskStatus_(taskStatus) {
  return /^(open|done)$/i.test(taskStatus);
}

/**
 * @arg {string} taskLimitType
 * @return {taskLimitType is TaskLimitType}
 */
function isValidLimitType_(taskLimitType) {
  return !taskLimitType || /^(none|date|time)$/i.test(taskLimitType);
}

/**
 * @param {{
 *   [key: string]: string | number
 * }} [queryParams]
 * **任意**
 *
 */
function queryStringFromParamsObject_(queryParams) {
  if (!queryParams) {
    return "";
  }
  const definedParams = [];
  for (const [key, val] of Object.entries(queryParams)) {
    if (!val) {
      continue;
    }
    definedParams.push(`${key}=${val}`);
  }

  const queryString =
    definedParams.length > 0 ? "?" + definedParams.join("&") : "";

  return queryString;
}

/**
 * @arg {UrlFetchApp.HTTPResponse} res
 */
function isHttpError_(res) {
  return res.getResponseCode() >= 400;
}

class ChatworkError_ extends Error {
  /**
   * @arg {number} statusCode
   * @arg {'メッセージ' | 'タスク' | 'ファイル' | 'コンタクト'} [resourceType]
   * **任意**
   */
  constructor(statusCode, resourceType = "リソース") {
    switch (statusCode) {
      case 400:
        super(
          "リクエストまたはアクセストークンのパラメーターが不足している、および不正な値が指定されている"
        );
        this.name = "IncorrectParametersError";
        break;
      case 401:
        super("認証に失敗した");
        this.name = "UnauthorizedError";
        break;
      case 403:
        super("アクセストークンのスコープが不足している");
        this.name = "ForbiddenError";
        break;
      case 404:
        super(`${resourceType}が存在しない`);
        this.name = "NotFoundError";
        break;
      case 429:
        super("APIの利用回数制限を超過した");
        this.name = "RateLimitError";
        break;
      default:
        super("Unknown Error");
        this.name = `UnknownChatworkError ${statusCode}`;
    }
  }
}

class MissingParameterError_ extends Error {
  /**
   * @arg {string} param
   */
  constructor(param) {
    super(`${param} は必須パラメータです。`);
  }
}

class InvalidParameterError_ extends Error {
  /**
   * @arg {string} param
   * @arg {string} paramVal
   * @arg {string} expected
   */
  constructor(param, paramVal, expected) {
    super(
      `${param} が ${paramVal} となっているが、 ${expected} とすべきである。`
    );
  }
}

/**
 * @typedef {object} Me
 * 提供されたAPIトークンに関連付けられたユーザーに関する情報を含むオブジェクト。
 *
 * @prop {number} Me.account_id
 * ユーザーのID
 *
 * @prop {number} Me.room_id
 * ユーザーのルームID
 *
 * @prop {string} Me.name
 * **ユーザー・カスタマイズ可能**
 * ユーザーの名
 *
 * @prop {string} Me.chatwork_id
 * **ユーザー・カスタマイズ可能**
 * ユーザーのChatwork ID
 *
 * @prop {number} Me.organization_id
 * **ユーザー・カスタマイズ可能**
 * ユーザーの会社ID
 *
 * @prop {string} Me.organization_name
 * **ユーザー・カスタマイズ可能**
 * ユーザーの会社名
 *
 * @prop {string} Me.department
 * **ユーザー・カスタマイズ可能**
 * ユーザーの部
 *
 * @prop {string} Me.title
 * **ユーザー・カスタマイズ可能**
 * ユーザーの役職
 *
 * @prop {string} Me.url
 * **ユーザー・カスタマイズ可能**
 * ユーザーが入力したカスタムURL
 *
 * @prop {string} Me.introduction
 * **ユーザー・カスタマイズ可能**
 * ユーザーの紹介
 *
 * @prop {string} Me.mail
 * **ユーザー・カスタマイズ可能**
 * ユーザーのメアド
 *
 * @prop {string} Me.tel_organization
 * **ユーザー・カスタマイズ可能**
 * ユーザーの会社電話番号
 *
 * @prop {string} Me.tel_extension
 * **ユーザー・カスタマイズ可能**
 * ユーザーの会社電話内線番号
 *
 * @prop {string} Me.tel_mobile
 * **ユーザー・カスタマイズ可能**
 * ユーザーの携帯電話番号
 *
 * @prop {string} Me.skype
 * **ユーザー・カスタマイズ可能**
 * ユーザーのスカイプURL
 *
 * @prop {string} Me.facebook
 * **ユーザー・カスタマイズ可能**
 * ユーザーのフェイスブックURL
 *
 * @prop {string} Me.twitter
 * **ユーザー・カスタマイズ可能**
 * ユーザーのX（ツイッター）のURL
 *
 * @prop {string} Me.avatar_image_url
 * **ユーザー・カスタマイズ可能**
 * ユーザーのアバター画像URL
 *
 * @prop {string} Me.login_mail
 * ユーザーのログインに使用するのメアド
 */

/**
 * @typedef {object} MyStatus
 * ユーザーに割り当てられた未読メッセージとタスクの情報を含むオブジェクト。
 *
 * @prop {number} MyStatus.unread_room_num
 * 未読メッセージがある部屋数
 *
 * @prop {number} MyStatus.mention_room_num
 * ユーザーに関する未読メッセージがある部屋の数
 *
 * @prop {number} MyStatus.mytask_room_num
 * ユーザーに割り当てられたタスクがある部屋の数
 *
 * @prop {number} MyStatus.unread_num
 * 未読メッセージ数
 *
 * @prop {number} MyStatus.mention_num
 * ユーザーに関する未読メッセージ数
 *
 * @prop {number} MyStatus.mytask_num
 * ユーザーに割り当てられたタスク数
 */

/**
 * @typedef {object} TaskRoom
 * タスクが割り当てられたチャットルームの詳細を含むオブジェクト。
 *
 * @prop {number} TaskRoom.room_id
 * チャットルームID
 *
 * @prop {string} TaskRoom.name
 * チャットルーム名
 *
 * @prop {string} TaskRoom.icon_path
 * チャットルームのアイコンのURL
 *
 * @typedef {Omit<Task, 'account'> & {room: TaskRoom}} MyTask
 * 現在のAPIトークンに関連付けられたユーザーに割り当てられたタスクの詳細を含むオブジェクト。
 */

/**
 * @typedef {object} Contact
 * Chatworkコンタクトの詳細を含むオブジェクト。
 *
 * @prop {number} Contact.account_id
 * コンタクトのアカウントID。
 *
 * @prop {number} Contact.room_id
 * コンタクトのルームID。
 *
 * @prop {string} Contact.name
 * コンタクトの名前。
 *
 * @prop {string} Contact.chatwork_id
 * コンタクトのChatwork ID。
 *
 * @prop {number} Contact.organization_id
 * コンタクトの会社ID。
 *
 * @prop {string} Contact.organization_name
 * コンタクトの会社名。
 *
 * @prop {string} Contact.department
 * コンタクトの部。
 *
 * @prop {string} Contact.avatar_image_url
 * コンタクトのアイコンのURL。
 */

/**
 * @typedef {object} RoomInfo
 *
 * @prop {number} RoomInfo.room_id
 *
 * @prop {string} RoomInfo.name
 *
 * @prop {'my' | 'direct' | 'group'} RoomInfo.type
 * チャットルームのタイプ。
 * 指定可能な値は：
 * - `my` (ユーザー自身のチャットルーム
 * - `direct` (直接1対1のユーザーチャット)
 * - `group` (任意のユーザー数のカスタムチャットルーム)
 *
 * @prop {'admin' | 'member' | 'readonly'} RoomInfo.role
 * チャットルームのユーザーの役割。
 * 指定可能な値は：
 * - `admin`（管理者）
 * - `member`（メンバー）
 * - `readonly`（閲覧のみ）
 *
 * @prop {boolean} RoomInfo.sticky
 *
 * @prop {number} RoomInfo.unread_num
 *
 * @prop {number} RoomInfo.mention_num
 *
 * @prop {number} RoomInfo.mytask_num
 *
 * @prop {number} RoomInfo.message_num
 *
 * @prop {number} RoomInfo.file_num
 *
 * @prop {number} RoomInfo.task_num
 *
 * @prop {string} RoomInfo.icon_path
 *
 * @prop {number} RoomInfo.last_update_time
 */

/**
 * @typedef {object} RoomsPostResponse
 *
 * @prop {number} RoomsPostResponse.room_id
 * 新しく作ったルームID
 */

/**
 * @typedef {RoomInfo & {description: string}} RoomInfoWithDescription
 */

/**
 * @typedef {object} RoomPutResponse
 *
 * @prop {number} RoomPutResponse.room_id
 */

/**
 * @typedef {object} RoomMember
 *
 * @prop {number} RoomMember.account_id
 *
 * @prop {'admin' | 'member'| 'readonly'} RoomMember.role
 * チャットルームのユーザーの役割。
 * 指定可能な値は：
 * - `admin`（管理者）
 * - `member`（メンバー）
 * - `readonly`（閲覧のみ）
 *
 * @prop {string} RoomMember.name
 *
 * @prop {string} RoomMember.chatwork_id
 *
 * @prop {number} RoomMember.organization_id
 *
 * @prop {string} RoomMember.organization_name
 *
 * @prop {string} RoomMember.department
 *
 * @prop {string} RoomMember.avatar_image_url
 */

/**
 * @typedef {object} RoomMembersPutResponse
 *
 * @prop {number[]} RoomMembersPutResponse.admin
 *
 * @prop {number[]} RoomMembersPutResponse.member
 *
 * @prop {number[]} RoomMembersPutResponse.readonly
 */

/**
 * @typedef {object} Message
 *
 * @prop {string} Message.message_id
 *
 * @prop {AccountInfo} Message.account
 *
 * @prop {string} Message.body
 *
 * @prop {number} Message.send_time
 *
 * @prop {number} Message.update_time
 */

/**
 * @typedef {object} UpdatedMessage
 *
 * @prop {string} UpdatedMessage.message_id
 *
 */

/**
 * @typedef {object} RoomMessagesReadPutResponse
 *
 * @prop {number} RoomMessagesReadPutResponse.unread_num
 * チャットの未読数
 *
 * @prop {number} RoomMessagesReadPutResponse.mention_num
 * 自分へのメンション数
 */

/**
 * @typedef {object} RoomMessagesUnreadPutResponse
 * チャットの未読数および自分へのメンション数
 *
 * @prop {number} RoomMessagesUnreadPutResponse.unread_num
 * チャットの未読数
 *
 * @prop {number} RoomMessagesUnreadPutResponse.mention_num
 * 自分へのメンション数
 */

/**
 * @typedef {object} AccountInfo
 *
 * @prop {number} AccountInfo.account_id
 *
 * @prop {string} AccountInfo.name
 *
 * @prop {string} AccountInfo.avatar_image_url
 */

/**
 * @typedef {object} Task
 *
 * @prop {number} Task.task_id
 *
 * @prop {AccountInfo} Task.account
 *
 * @prop {AccountInfo} Task.assigned_by_account
 *
 * @prop {string} Task.message_id
 *
 * @prop {string} Task.body
 *
 * @prop {number} Task.limit_time
 *
 * @prop {'open' | 'done'} Task.status
 *
 * @prop {'none' | 'date' | 'time'} Task.limit_type
 */

/**
 * @typedef {object} PostTasksResponse
 *
 * @prop {number[]} PostTasksResponse.task_ids
 * チャットのタスクのID一覧
 */

/**
 * @typedef {object} File
 *
 * @prop {number} File.file_id
 *
 * @prop {AccountInfo} File.account
 *
 * @prop {string} File.message_id
 *
 * @prop {string} File.filename
 *
 * @prop {number} File.filesize
 *
 * @prop {number} File.upload_time
 */

/**
 * @typedef {{file_ids: string[]}} UploadedFiles
 */

/**
 * @typedef {object} Downloadable
 *
 * @prop {string} [Downloadable.download_url]
 * ダウンロードURL
 */

/**
 * @typedef {File & Downloadable} DownloadableFile
 * ダウンロード URL を含む File オブジェクト。
 */

/**
 * @typedef {object} RoomInvitationLink
 * チャットへの招待リンク
 *
 * @prop {boolean} RoomInvitationLink.public
 * 公開か。
 *
 * @prop {string} RoomInvitationLink.url
 * 招待リンク。
 *
 * @prop {boolean} RoomInvitationLink.need_acceptance
 * 参加に管理者の承認が必要か。
 *
 * @prop {string} RoomInvitationLink.description
 * 表示される説明文。
 */

/**
 * @typedef {object} ContactRequest
 * コンタクト承認依頼
 *
 * @prop {number} ContactRequest.request_id
 * コンタクト承認依頼のID。
 *
 * @prop {number} ContactRequest.account_id
 * コンタクト承認依頼を行うユーザーアカウントのID。
 *
 * @prop {string} ContactRequest.message
 * コンタクト承認依頼に添付されたメッセージ。
 *
 * @prop {string} ContactRequest.name
 * コンタクト承認依頼を行うユーザーの名前。
 *
 * @prop {string} ContactRequest.chatwork_id
 * コンタクト承認依頼をしたユーザーのチャットワークID。
 *
 * @prop {number} ContactRequest.organization_id
 * コンタクト承認依頼を行うユーザーの組織 ID。
 *
 * @prop {string} ContactRequest.organization_name
 * コンタクト承認依頼を行うユーザーの組織名。
 *
 * @prop {string} ContactRequest.department
 * コンタクト承認依頼を行うユーザーの部署名。
 *
 * @prop {string} ContactRequest.avatar_image_url
 * コンタクト承認依頼を行うユーザーのアイコン画像のURL。
 */

/**
 * @typedef {Omit<ContactRequest, 'request_id'>} ContactRequestApprovalResponse
 */

import sql from "../sql.js";
import tools from "../../tools/tools.js";

let room = {
    /**
     *
     * @param data
     */
    joinRoom:(data)=>{
        let {name,id} = data
        let r
        return sql(`select * from room where roomId = '${name}'`).then(res=>{
            r = res
            if(res.length > 0) {
                return sql(`INSERT INTO userRoom (userId,roomId,creatTime) values ('${id}','${name}','${tools.formatDate((new Date()).getTime())}')`)
            }else{
                return Promise.reject()
            }
        }).then(res=>{
            return Promise.resolve(r[0])
        })
    },
    createRoom: (data) => {
        let id = new Date().getTime().toString().substring(4, 14)
        // 首先查询id有没有占用
        return sql(`SELECT * FROM room WHERE roomId = '${id}' `).then(res => {
            if (res.length === 0) {
                return sql(`INSERT INTO room (roomId,roomName,creatTime,masterId) 
VALUES ('${id}','${data.name}','${tools.formatDate((new Date()).getTime())}','${data.userId}')`)
            } else {
                return this.createRoom({name: data.name, userId: data.userId})
            }
        }).then(res => {
            console.warn("id重复重新获取id", res.insertId)
            return sql(`select * from room where id = ${res.insertId}`)
        })
        // 然后插入

    },
    getRoomList: (data) => {
        let {id} = data
        let list = [], listId = []
        return sql(`select * from room where masterId = '${id}'`).then(res => {
            list = res
            return sql(`select roomId from userRoom where userId = '${id}'`)
        }).then(res => {
            if (res.length > 0) {
                res.forEach(item => {
                    listId.push(item.roomId.toString())
                })
                listId = JSON.stringify(listId)
                listId = listId.substring(1,listId.length-1)
                return sql(`select * from room where roomId in (${listId})`)
            } else {
                return list
            }
        }).then(res=>{
            list.push(...res)
             return list
        })
    }
}

export default room
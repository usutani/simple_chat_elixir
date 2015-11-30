import {Socket} from "deps/phoenix/web/static/js/phoenix"

let message_content   = $("#message_content")
let messagesContainer = $("#messages")

let socket = new Socket("/socket")
socket.connect()
let chan = socket.channel("rooms:lobby", {})

message_content.on("keypress", event => {
  if(event.keyCode === 13){
    chan.push("new_msg", {body: message_content.val()})
    message_content.val("")
    return false
  }
})

chan.on("new_msg", payload => {
  messagesContainer.append(`<br/>${payload.body}`)
})

chan.join().receive("ok", chan => {
  console.log("Welcome to Phoenix Chat!")
})


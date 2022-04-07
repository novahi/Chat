(($, ws) => {
  const tools = new QI();
  let ID = localStorage.getItem("id")
  let name = localStorage.getItem("name")
  if(!ID) {
    name = prompt("Tên bạn là gì ?")
    ID = tools.setIdAndName(name)
    name = localStorage.getItem("name")
  }
  const message = $("#mes")
  ws.addEventListener("open", (e) => {
    console.log("connected with WebSocket")
    $("#btn").addEventListener("click", async (e) => {
      try {
        e.stopPropagation()
        await tools.sendMessage(ws, ID, message.value, name)
        message.value = null
        btn.disabled = true
      } catch (e) {
        console.log(e)
      }
    })
    message.oninput = e => {
      if(e.target.value == null || e.target.value.trim() == "") {
        btn.disabled = true;
      } else {
        btn.disabled = false
      }
    }
  })
  ws.addEventListener("message" ,async ({ data }) => {
    try {
      data = await tools.covertData(data)
      await tools.newMessage(data, ID, ".chat-body")
      tools.getName(data.name, ".header-name")
    } catch (e) {
      console.log(e)
    }
  })
  ws.onerror = e => console.log(e)
  ws.onclose = e => localStorage.clear()
})(document.querySelector.bind(document),new WebSocket(`wss://${window.location.host}`))

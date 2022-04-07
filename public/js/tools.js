class QI {
  async sendMessage(ws, id, message, name) {
    try {
      return new Promise((resolve, reject) => {
        if (message == null || message.length <= 0) {
          reject("Bạn chưa nhập tin nhắn !")
        }
        const options = {
          minute: "2-digit",
          second: "2-digit",
          hour: "2-digit",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
          // timeZoneName: "long"
        };
        let date = new Date()
        date = date.toLocaleDateString("vi-Vi", options)
        ws.send(JSON.stringify({
          id,
          name,
          message: message.trim(),
          date
        }))
        resolve("sent")
      }).catch(console.log)
    } catch (e) {
      console.log(e)
    }
  }
  async newMessage(data, id, body) {
    try {
      body = document.querySelector(body)
      let div = document.createElement("div")
      div.className = `sender ${data.id == id ? "me": "other"}`
      div.textContent = data.message
      body.appendChild(div)
      body.scrollBy(0, window.innerHeight)
    } catch (e) {
      console.log(e)
    }
  }

  setIdAndName(name) {
    if (name == null || name.length <= 0) {
      name = "Tôi Dại Dột"
    }
    let id = (Math.random() + 1).toString(36).substring(2)
    localStorage.setItem("id", id)
    localStorage.setItem("name", name)
    return id
  }
  async covertData(data) {
    try {
      data = await data.text()
      return JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }

  getName(name, selector) {
    selector = document.querySelector(selector)
    if (!selector) {
      return false
    }
    selector.textContent = name.toUpperCase()
    return true
  }
}


async function getImg(selectorAll = "img.FFVAD") {
  try {
    let storage;
    let allImg = document.querySelectorAll(selectorAll);
    if (allImg) {
      return await new Promise((resolve, reject) => {
        let store = storage;
        const interval = setInterval(() => {
          let loading = document.querySelector("svg.By4nA");
          if (!loading) {
            resolve(store);
            clearInterval(interval)
          };
          let loop = [...document.querySelectorAll(selectorAll)];
          store = loop.map(x => {
            let url = x.getAttribute("srcset");
            if (url) {
              url = url.split(",");
              url = url[url.length - 1].split(" ")[0];
              return url
            }
          });
          window.scrollBy(0, window.innerHeight)
        }, 500)
      })
    }
  } catch (e) {
    console.log(`Error loopImg: ${e.message}`)
    return e
  }
}
async function getBase64(listImg = []) {
  try {
    let imgs = listImg;
    let storage = [];
    if (imgs) {
      return await new Promise((resolve, reject) => {
        let store = storage;
        imgs.forEach(x => {
          let img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            let canvas = document.createElement("canvas");
            canvas.height = img.height;
            canvas.width = img.width;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let dataUrl = canvas.toDataURL("image/jpeg");
            store.includes(dataUrl) ? null : store.push(dataUrl);
            store.length == imgs.length ? resolve(store) : null
          };
          img.src = x
        })
      })
    }
  } catch (e) {
    console.log(`Error base64: ${e.message}`)
    return e
  }
};
(async () => {
  try {
    const listImg = await getImg('.FFVAD')
    const base64 = await getBase64(listImg)
    console.log(base64)
  } catch (e) {
    console.log(e)
  }
})()




const listImage = new Promise((resolve, reject) => {
  let storage = [];
  const interval = (() => {
  const loading = document.querySelector("svg.By4nA");
  if(!loading) {
    resolve(storage);
    clearInterval(interval)
  };
  let allImage = [...document.querySelectorAll(".FFVAD")];
  if(allImage) {
    for(x of allImage) {
      let url = x.getAttribute("srcset");
      if(url) {
        url = url.split(",");
        url = url[url.length -1].split(" ")[0];
        storage.includes(url) ? null : storage.push(url)
      }
    }
  };
  window.scrollBy(0, window.innerHeight)
  })
})

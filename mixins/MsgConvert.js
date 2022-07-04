import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      listUserGetter: "listUserGetter",
    }),
  },
  methods: {
    hasMention(_msg) {
      try {
        const messageObj = JSON.parse(_msg)
        if (messageObj.mention) {
          return true
        }
      } catch (error) {
        return false
      }
      return false
    },
    hasMentionFW(_msg) {
      try {
        const messageObj = JSON.parse(_msg)
        if (messageObj.mention) {
          return JSON.parse(messageObj.mention).mentions.length ? true : false
        }
      } catch (error) {
        return false
      }
      return false
    },
    convertContentMention(_msg) {
      let content = _msg
      try {
        let obj_mess = JSON.parse(content)
        if (obj_mess.mention) {
          let mention = JSON.parse(obj_mess.mention)
          let msg = obj_mess.msg
          content = obj_mess.msg

          if (mention) {
            if (mention.mentionType === "@all" && msg.includes("@all")) {
              let arrSplit = msg.split("@all")
              let txt = arrSplit.join('<span class="mention">@all</span>')
              let mentions = mention.mentions
              mentions.forEach((o) => {
                txt = txt.replace(
                  `${o.content}`,
                  `<span class="mention">${o.content} </span>`,
                )
              })
              return txt
            } else {
              let mentions = mention.mentions
              mentions.forEach(function (item) {
                let content = item.content
                let arrSplit = msg.split(content)
                msg = arrSplit.join(
                  '<span class="mention">' + content + " </span>",
                )
              })

              return msg
            }
          }
        }
      } catch (error) {
        return content
      }
      // console.log(content);
      return content
    },
    urlify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      return text.replace(urlRegex, function (url) {
        // let urlm = url.replaceAll('</br>', ' ');
        // console.log(url);
        // console.log(urlm);
        return (
          '<a class="mention" target="_blank" href="' +
          url +
          '">' +
          url +
          "</a>"
        )
      })
    },
    hasUrl(contentMessage) {
      const regexIsUrl = /(https?:\/\/[^\s]+)/g

      return regexIsUrl.test(contentMessage)
    },

    checkQuoteType(_quoteMsg) {
      let obj = JSON.parse(_quoteMsg)
      // TEXT, IMAGE, OTHER_FILE
      return obj.quoteType
    },
    getQuoteObject(msg) {
      let tx = {}
      try {
        let obj_mess = JSON.parse(msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type === "ActionType.QUOTE" && obj_mess.quote) {
            tx = obj_mess
          }
        }
        return tx
      } catch (e) {
        return tx
      }
    },
    parseJson(_string) {
      let tx = {}
      try {
        let obj = JSON.parse(_string)
        if (typeof obj === "object") {
          tx = obj
        }
        return tx
      } catch (e) {
        return tx
      }
    },
    returnQuoteObject(_msg) {
      let ar = Object.values(this.listUserGetter) || []
      let _owner = ar.filter((o) => {
        return `customer.${o.id}` == _msg.u.username
      }).length
        ? ar.filter((o) => {
            return `customer.${o.id}` == _msg.u.username
          })[0].name
        : ""
      let quoteObj = {
        owner: _owner,
        contentMsg: "",
        time: new Date(_msg.ts).getTime().toString(),
        quoteType: "",
        quoteImageUrl: "",
        rootMessageID: _msg ? _msg._id : null,
      }
      switch (_msg.msgType) {
        case "textType":
          quoteObj = {
            ...quoteObj,
            contentMsg: String(_msg.msg),
            quoteType: "TEXT",
          }

          return quoteObj
        case "editType":
          quoteObj = {
            ...quoteObj,
            contentMsg: String(this.parseJson(_msg.msg).msg),
            quoteType: "TEXT",
          }

          return quoteObj
        case "mentionType":
          quoteObj = {
            ...quoteObj,
            contentMsg: String(this.parseJson(_msg.msg).msg),
            quoteType: "TEXT",
          }
          return quoteObj
        case "forwardType":
          quoteObj = {
            ...quoteObj,
            contentMsg: String(this.parseJson(_msg.msg).msg),
            quoteType: "TEXT",
          }
          return quoteObj
        case "quoteType":
          quoteObj = {
            ...quoteObj,
            contentMsg: String(this.getQuoteObject(_msg.msg).msg),
            quoteType: "TEXT",
          }
          return quoteObj
        case "fileType":
          quoteObj = {
            ...quoteObj,
            contentMsg: _msg.attachments[0].title,
            quoteType: "OTHER_FILE",
          }
          return quoteObj
        case "imageType":
          quoteObj = {
            ...quoteObj,
            contentMsg: "",
            quoteType: "IMAGE",
            quoteImageUrl: _msg.attachments[0].title_link,
          }
          return quoteObj
        default:
          return quoteObj
      }
    },
    getShortFileName(_str, numb) {
      if (!_str) {
        return ""
      }
      if (_str.length < numb) {
        return _str
      }
      return _str.slice(0, numb) + "..." + _str.split(".").pop()
    },
  },
}

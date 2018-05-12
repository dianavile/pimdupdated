const marked = require('marked')
const InfoString = require('./info-string')

module.exports = class Renderer {
  constructor (options) {
    this.options = options || {}
    const originalRenderers = Object.getOwnPropertyNames(marked.Renderer.prototype)
    originalRenderers.forEach((key) => {
      if (this[key]) return
      this[key] = function () {
        return marked.Renderer.prototype[key].apply(this, arguments)
      }
    })
  }

  text (text) {
    return text
  }

  code (source, infoString, escapedSource) {
    const info = new InfoString(infoString)
    const lang = info.lang
    return marked.Renderer.prototype.code.call(this, source, lang, escapedSource)
  }
}
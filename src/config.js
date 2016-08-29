generateId  = require('helpers/generate-id.js')
sessionId   = sessionStorage.getItem('pagePerfSessionId')

// First time the reporter was run for this session.
if (!sessionId) {
    sessionId = generateId()
    sessionStorage.setItem('pagePerfSessionId', sessionId)
}

module.exports = {
    endpoint: window.PagePerf.url || 'http://localhost:1337/report/',
    startX: Date.now(),
    sessionId: sessionId
}

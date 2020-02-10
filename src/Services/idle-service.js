let timeoutId
let idleCallback = null
let notIdleEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart' ]
let FIVE_MINUTES_IN_MS = 5 * 60 * 1000

const IdleService = {
    setIdleCallback(method){
        idleCallback = method
    },
    resetIdleTimer(){
        clearTimeout(timeoutId)
        timeoutId = setTimeout(idleCallback,  FIVE_MINUTES_IN_MS)
    },
    registerIdleTimerResets(){
        notIdleEvents.forEach(event =>
            document.addEventListener(event, IdleService.resetIdleTimer, true)
        )
    },
    unregisterIdleResets(){
        clearTimeout(timeoutId)
        notIdleEvents.forEach(event =>
            document.removeEventListener(event, IdleService.resetIdleTimer, true)    
        )
    }
}

export default IdleService;
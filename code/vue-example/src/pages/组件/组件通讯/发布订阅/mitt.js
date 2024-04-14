// mymitt
function mitt() {
    const events = {}
    function emit(eventName, ...prorps) {
        if (!events[eventName] || !Array.isArray(events[eventName])) {
            return void 0
        }
        for (let i = 0; i < events[eventName].length; i++) {
            const currentEvent = events[eventName][i]
            currentEvent(...prorps)
        }
    }
    function on(eventName, callback) {
        if (!events[eventName]) {
            events[eventName] = []
        }
        events[eventName].push(callback)
    }
    function off(eventName) {
        events[eventName] && delete events[eventName]
    }
    const all = {
        clear: function () {
            for (const eventName in events) {
                delete events[eventName]
            }
        },
    }
    return { emit, on, off, all }
}

const mitter = mitt()
export default mitter

// mitt -> new
// function mitt(n) {
//     return {
//         all: (n = n || new Map()),
//         on: function (e, t) {
//             var i = n.get(e)
//             i ? i.push(t) : n.set(e, [t])
//         },
//         off: function (e, t) {
//             var i = n.get(e)
//             i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []))
//         },
//         emit: function (e, t) {
//             var i = n.get(e)
//             i &&
//                 i.slice().map(function (n) {
//                     n(t)
//                 }),
//                 (i = n.get('*')) &&
//                 i.slice().map(function (n) {
//                     n(e, t)
//                 })
//         },
//     }
// }

// test example
// const mitter = mitt()
// mitter.on('click', (...props) => {
//     console.log('click 触发, props: ', ...props)
// })
// mitter.on('abs', (...props) => {
//     console.log('abs 触发, props: ', ...props)
// })

// let count = 0
// setInterval(() => {
//     if (count > 3) {
//         mitter.all.clear()
//     }
//     mitter.emit('abs', 'this abs proprs')
//     mitter.emit('click', 'a', 1, true)
//     mitter.emit('click', ['a', 1, true])
//     count++
// }, 1000)

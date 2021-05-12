var GS = require('./gomesmart')
GS.Device.prototype.opt = jest.fn((as, values) => ({as, values}))
var adapter = require('./adapter').default

describe('adapter', () => {
    beforeAll(() => {
        window.ev_online = new CustomEvent('online', {detail: {result: 1}})
        window.ev_post = new CustomEvent('post', {detail: {result: '{"as":{"1001": 1}}'}})
        
        window.addEventListener('online', (e) => {
            window.online(e.detail.result)
        })
        window.addEventListener('post', (e) => {
            window.post(e.detail.result)
        })

        adapter.ready()
    })

    it('getDeviceStatus', () => {
        window.dispatchEvent(window.ev_online)
        window.dispatchEvent(window.ev_post)
        return adapter.getDeviceStatus().then(d => {
            expect(d).toEqual(expect.objectContaining({status:{1001:1}, online:'2'}))
        })
    })

    it('onStatusChanged', () => {
        var cb = jest.fn(d => d)
        adapter.onStatusChanged(cb)
        window.dispatchEvent(window.ev_post)
        expect(cb.mock.calls.length).toBe(1)
        expect(cb.mock.calls[0][0]).toEqual({status: {'1001': 1}})
    })

    it('setDeviceStatus', () => {
        return adapter.setDeviceStatus({1001: 0}).then(d => {
            expect(GS.Device.prototype.opt.mock.calls[0][0]).toEqual([1001])
            expect(GS.Device.prototype.opt.mock.calls[0][1]).toEqual([0])
        })
    })
})
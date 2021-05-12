var JDSMART = require('./jdsmart.js')
jest.mock('./jdsmart.js')

describe('getDeviceStatus', () => {
    beforeAll(() => {
        JDSMART.io.getSnapshot = jest.fn((suc, fail) => {
            suc({
                status: 1,
                device: {
                    device_name: 'test device name'
                },
                streams: [
                    {
                        stream_id: 'power',
                        current_value: '1'
                    }
                ]
            })
        })
    })

    it('transfrom status received', () => {
        var adapter = require('./adapter.js').default
        return adapter.getDeviceStatus().then(d => {
            expect(d).toEqual({
                online: '2',
                name: 'test device name',
                status: {power: '1'}
            })
        })
    })
})

describe('setDeviceStatus', () => {
    beforeAll(() => {
        JDSMART.io.controlDevice = jest.fn((command, suc, fail) => {
            suc({})
        })
    })

    it('transform command in jd format', () => {
        var adapter = require('./adapter.js').default
        return adapter.setDeviceStatus({power: 1}).then(d => {
            expect(JDSMART.io.controlDevice.mock.calls[0][0]).toEqual({
                command:[
                    {
                        stream_id:'power',
                        current_value: 1
                    }
                ]
            })
        })
    })
})

describe('error', () => {
    beforeAll(() => {
        JDSMART.io.controlDevice = jest.fn((command, suc, fail) => {
            fail({
                errorInfo: 'error info',
                errorCode: -3
            })
        })
    })

    it('transform err', () => {
        var adapter = require('./adapter.js').default
        return adapter.setDeviceStatus({power: 1}).catch(err => {
            expect(err).toEqual(expect.objectContaining({code: -3, msg: 'error info', message: 'error info'}))
        })
    })
})
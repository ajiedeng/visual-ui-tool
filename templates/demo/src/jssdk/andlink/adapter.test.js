var adapter = require('./adapter').default;

const Hejia = window.Hejia;
test('platform shold be andlink', () => expect( adapter.platform).toBe('andlink'));

test('test getDeviceStatus return data structure', () => {
    const resp = {
        "id": "CMCC-30334-34ea3440e518",
        "lastDataReceivedDate": "2018-08-10T11:33:33+08:00",
        "lastDataReceivedDateMs": 1533872013000,
        "lastMeasureDate": "2018-08-10T11:33:33+08:00",
        "lastMeasureDateMs": 1533872013000,
        "parameters": [{
            "name": "connectionStatus",
            "value": "1",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "dataPM25",
            "value": "33",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "degC",
            "value": "28",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "deviceMac",
            "value": "34ea3440e518",
            "lastUpdateTime": "2018-07-27T19:07:24+08:00",
            "lastUpdateTimeMs": 1532689644000
        }
        ]
    };
    Hejia.getCurrentParam = jest.fn((successCb, failedCb) => successCb(resp));

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    return adapter.getDeviceStatus().then(state=>{
        expect(state.online).toBe('2');
        expect(state.status).toEqual({
            dataPM25:'33',
            degC:'28',
            deviceMac:'34ea3440e518',
        });
    });
});

test('Hejia.getCurrentParam failed', () => {

    Hejia.getCurrentParam = jest.fn((successCb, failedCb) => failedCb('error',{
        resultCode:100,
        resultCodeMessage: 'error'
    }));


    return adapter.getDeviceStatus().catch(e => expect(e.code).toBe(100));
});

test('Hejia.setControlParam get called by correct data', () => {

    const mockCall = jest.fn((params,successCb, failedCb)=>successCb());
    Hejia.setControlParam = mockCall;

    return adapter.setDeviceStatus({outletStatus:'1'}).then(()=>{
        expect(mockCall.mock.calls[0][0]).toEqual({
            parameters: {
                param: [{
                    name: 'outletStatus',
                    content: '1'
                }]
            }
        })
    });
});

test('set ready ', () => {

    const resp = {
        "id": "CMCC-30334-34ea3440e518",
        "lastDataReceivedDate": "2018-08-10T11:33:33+08:00",
        "lastDataReceivedDateMs": 1533872013000,
        "lastMeasureDate": "2018-08-10T11:33:33+08:00",
        "lastMeasureDateMs": 1533872013000,
        "parameters": [{
            "name": "connectionStatus",
            "value": "1",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "dataPM25",
            "value": "33",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "degC",
            "value": "28",
            "lastUpdateTime": "2018-08-10T11:33:33+08:00",
            "lastUpdateTimeMs": 1533872013000
        }, {
            "name": "deviceMac",
            "value": "34ea3440e518",
            "lastUpdateTime": "2018-07-27T19:07:24+08:00",
            "lastUpdateTimeMs": 1532689644000
        }
        ]
    };

    const deviceInfo  = {
        "device": {
            "id": "CMCC-30334-34ea3440e518",
            "type": 30334,
            "locationId": 12363,
            "desc": "智能恒氧新风净化机",
            "lastDataReceivedDate": "2018-08-10T15:37:57+08:00",
            "lastDataReceivedDateMs": 1533886677000,
            "lastMeasureDate": "2018-08-10T15:37:57+08:00",
            "lastMeasureDateMs": 1533886677000,
            "connected": false,
            "newDevice": false,
            "typeAttributes": [{
                "name": "deviceListParameters",
                "value": "deviceMac"
            }, {
                "name": "deviceListParameterUnits",
                "value": "string"
            }
            ],
            "parameters": [{
                "name": "deviceMac",
                "value": "34ea3440e518",
                "lastUpdateTime": "2018-07-27T19:07:24+08:00",
                "lastUpdateTimeMs": 1532689644000
            }
            ],
            "andlinkId": "CCF0FD330130",
            "lastOnlineDate": "2018-08-09T13:53:09+08:00",
            "lastOnlineDateMs": 1533793989000,
            "softwareVersion": "V3.2",
            "firmwareVersion": "V3.2",
            "startDate": "2018-07-27T19:07:22+08:00",
            "startDateMs": 1532689642000,
            "cmccCategory": "000018",
            "cmccSubCategory": "000038"
        },
        "location": {
            "id": 12363,
            "startDate": "2018-07-27T19:07:22+08:00",
            "startDateMs": 1532689642000,
            "appName": "CMCC",
            "event": "HOME"
        }
    };

    Hejia.getCurrentParam = jest.fn((successCb, failedCb) => successCb(resp));
    Hejia.getDeviceInfo = jest.fn((successCb, failedCb) => successCb(deviceInfo));
    Hejia.ready = jest.fn(ready => setTimeout(ready,100));

    return adapter.ready().then(state=>{
        expect(state.online).toBe('2');
        expect(state.status).toEqual({
            dataPM25:'33',
            degC:'28',
            deviceMac:'34ea3440e518',
        });
        expect(state.name).toBe('智能恒氧新风净化机');
    })
});
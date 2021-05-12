jest.mock('adapter');
var adapter = require('adapter')
var jssdk = require('./jssdk').default;

process.env.PROTOCOL = 'dna'

describe('do not provide PLATFORM_MAPPING', () => {
    // Applies only to tests in this describe block
    beforeAll(() => {
        window.PLATFORM_MAPPING = null;
    });

    // afterAll(() => console.log('2 - afterAll'));

    test('received status should be updated', () => {
        return jssdk.setDeviceStatus({pwr: 1}).then(data =>
            expect(data.status).toEqual(expect.objectContaining({pwr: 1})))
    });

});

describe('provide PLATFORM_MAPPING', () => {
    // Applies only to tests in this describe block
    beforeAll(() => {
        window.PLATFORM_MAPPING = {
            params:{
                dna:['ac_mode','temp','pwr'],
                jd:['mode','settemp','power'],
                gome:[1001,2003,1],
            },
            vals:{
                //与参数一样的顺序
                dna:[
                    [0,1,2,3,4],
                    //null表示非枚举值，值暂时不做映射
                    null,
                    null,
                ],
                jd:[
                    [0,1,2,3,4],
                    null,
                    null,
                ],
                gome:[
                    [1,3,2,4,0],
                    null,
                    null,
                ],

            }
        }
    });

    afterAll(() => window.PLATFORM_MAPPING = null);

    test('received status should be updated', () => {
        return jssdk.setDeviceStatus({pwr: 1}).then(data =>
            expect(data.status).toEqual(expect.objectContaining({pwr: 1})))
    });

});

describe('transfrom status format -- use dna status format on jd platform', () => {
    // Applies only to tests in this describe block
    beforeAll(() => {
        window.PLATFORM_MAPPING = {
            params:{
                dna:['ac_mode','temp','pwr'],
                jd:['mode','settemp','power'],
                gome:[1001,2003,1],
            },
            vals:{
                //与参数一样的顺序
                dna:[
                    [0,1,2,3,4],
                    //null表示非枚举值，值暂时不做映射
                    null,
                    null,
                ],
                jd:[
                    [0,1,2,3,4],
                    null,
                    null,
                ],
                gome:[
                    [1,3,2,4,0],
                    null,
                    null,
                ],

            }
        }
        adapter.platfrom = 'jd'
        adapter.getDeviceStatus = jest.fn(status=>Promise.resolve({status:{power:'1',mark:'1'}}))
    });

    afterAll(() => {
        window.PLATFORM_MAPPING = null
        adapter.getDeviceStatus=jest.fn(status=>Promise.resolve({status:status}))
    })
    
    test('transform status in PLATFORM_MAPPING', () => {
        return jssdk.getDeviceStatus().then(data =>
            expect(data.status).toEqual(expect.objectContaining({pwr: '1', mark: '1'}))
        )
    });
});

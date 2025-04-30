import type {Executor} from '../';

export class RechargeService {
    
    constructor(private executor: Executor) {}
    
    readonly generateAlipayPage: (options: RechargeServiceOptions['generateAlipayPage']) => Promise<
        string
    > = async(options) => {
        let _uri = '/payment/recharge/alipay/page';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.price;
        _uri += _separator
        _uri += 'price='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<string>;
    }
}

export type RechargeServiceOptions = {
    'generateAlipayPage': {
        price: string
    }
}

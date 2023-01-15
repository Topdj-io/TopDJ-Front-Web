// 手机号(mobile phone)中国(最宽松)
export const REGEX_MOBILE = /^1\d*$/;
// 手机号+电话
export const REGEX_MOBILE_PHONE = /^(?:(?:\+|00)86)?1\d{10}$|^\d{3}-\d{8}$|^\d{4}-\d{7,8}$|^\d{7,8}$/;
// 电话
export const REGEX_PHONE = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$|^\d{7,8}$/;
// 身份证号, 支持1/2代(15位/18位数字)
export const REGEX_IDENTITY_CARD = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
// 护照（包含香港、澳门）
export const REGEX_PASSPORT = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
// 纳税人识别号
export const REGEX_TAX_NO = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;
// 整数
export const INTEGER = /^\d{1,}$/;
// 小数点后两位
export const DECIMAL = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/;
// 链接地址
export const REGEX_LINK = /^https?:\/\/(.+\/)*/i;
// URL格式
export const REGEX_URL = /^([0-9]|[a-z]|[.:/#%&=[\]><?()_"-])*$/i;
// 编码 (字母开头，必须包含字母，可以包含数字，大于4位)
export const REGEX_LETTER_CODE = /^[a-z]([a-z]|[0-9])*$/i;
// 编码 (包含字母或数字，大于4位)
export const REGEX_CODE = /^([a-z]|[0-9])*$/i;
// 编码（数据字典）
export const REGEX_DIC_CODE = /^([a-z]|[0-9]|_)*$/i;
// 邮箱
export const REGEX_EMAIL = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
// 金额
export const REGEX_MONEY = /^\d*\.?\d+$/;

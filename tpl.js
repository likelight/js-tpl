/**
 * @file
 * @author shenruoliang@baidu.com
 */
var htmlTpl = '<div attr=""> #{time1} </div>';
var testDemoTpl = '<li data-id="#{pid}"><img src="#{url}" alt="thumbnail"/></li>';

var data = {time1: '1234', url: '1212', pid: 12212};
/**
 * 对目标字符串进行格式化，同时添加对encode的支持，!{0}保持原有；#{0}html
 *
 * @public
 * @name format
 * @function
 * @grammar format(source, opts)
 * @param {string} source 目标字符串
 * @param {Object|string} opts 提供相应数据的对象或多个字符串
 * @remark
 *
 opts参数为"Object"时，替换目标字符串中的#{property name}部分。<br>
 opts为“string...”时，替换目标字符串中的#{0}、#{1}...部分。
 * @shortcut format
 * @meta standard
 *
 * @return {string} 格式化后的字符串
 */
function format(tpl, opts) {
    var toString = Object.prototype.toString;
    var data = Array.prototype.slice.call(arguments, 1);
    if (tpl && opts) {
        tpl = String(tpl);
        var result = toString.call(opts);
        if (data.length === 1) {
            // 判断是单个数组或对象
            if (/\[object Array\]|\[object Object\]/.test(result)) {
                data = opts;
            } else {
                // 若为字符串则赋值为数组类型
                data = data;
            }
        } else {
            // 多于一个参数将数组整体赋值
            data = data;
        }
        // 处理多余的空格
        tplAf = tpl.replace(/>\s*</g, '><');
        var resultStr = tplAf.replace(/(#|!)\{([\w]+)\}/g, function (match, type, key) {
            var keys = key.split('.');
            var root = data;
            var replacer;
            var val;
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                val = root[k];
                if (val === null) {
                    val = '';
                    break;
                }
                root = val;
            }

            return undefined === typeof val ? '' : val;

        });
        return resultStr;
    } else {
        return tpl;
    }

}

var result =  format(testDemoTpl, data);
console.log(result);
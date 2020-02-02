/*
 * interval: y 年,q 季度,m 月,d 日,w 周,h 小时,n 分钟,s 秒,ms毫秒
 * eg:(new Date("2020/2/1")).dateDiff ("d",new Date("2020/2/2"))	; return 1
 * eg:(new Date("2020/2/1")).dateDiff ("d",new Date("2020/1/31")); return -1
 */
Date.prototype.DateDiff = function(interval, objDate2) {
	var d = this,
		i = {},
		t = d.getTime(),
		t2 = objDate2.getTime()
	i['y'] = objDate2.getFullYear() - d.getFullYear()
	i['q'] =
		i['y'] * 4 +
		Math.floor(objDate2.getMonth() / 4) -
		Math.floor(d.getMonth() / 4)
	i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
	i['ms'] = objDate2.getTime() - d.getTime()
	i['w'] =
		Math.floor((t2 + 345600000) / 604800000) -
		Math.floor((t + 345600000) / 604800000)
	i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
	i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000)
	i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
	i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
	return i[interval]
}
/*
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function(fmt) {
	var o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds(), //毫秒
	}
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1
					? o[k]
					: ('00' + o[k]).substr(('' + o[k]).length)
			)
	return fmt
}
Date.prototype.DateAdd = function(strInterval, Number) {
	var dtTmp = this
	switch (strInterval) {
		case 's':
			return new Date(Date.parse(dtTmp) + 1000 * Number)
		case 'n':
			return new Date(Date.parse(dtTmp) + 60000 * Number)
		case 'h':
			return new Date(Date.parse(dtTmp) + 3600000 * Number)
		case 'd':
			return new Date(Date.parse(dtTmp) + 86400000 * Number)
		case 'w':
			return new Date(Date.parse(dtTmp) + 86400000 * 7 * Number)
		case 'q':
			return new Date(
				dtTmp.getFullYear(),
				dtTmp.getMonth() + Number * 3,
				dtTmp.getDate(),
				dtTmp.getHours(),
				dtTmp.getMinutes(),
				dtTmp.getSeconds()
			)

		case 'm':
			return new Date(
				dtTmp.getFullYear(),
				dtTmp.getMonth() + Number,
				dtTmp.getDate(),
				dtTmp.getHours(),
				dtTmp.getMinutes(),
				dtTmp.getSeconds()
			)

		case 'y':
			return new Date(
				dtTmp.getFullYear() + Number,
				dtTmp.getMonth(),
				dtTmp.getDate(),
				dtTmp.getHours(),
				dtTmp.getMinutes(),
				dtTmp.getSeconds()
			)
	}
}

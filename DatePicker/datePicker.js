// 1. 点击date的input出现下拉日历
//     1. 设定模版
//     2. 获取当前月的第一天和最后一天的日期，把第一天所在的那一周的前几天存入一个arr，
//     把最后一天所在的那一周的后几天存入arr，把这个月的所有日期存入arr
//     3. 根据这个arr渲染日历。通过table表格的html。通过拼装字符串

// 2. 前（后）滚日历
//     1.该月份的第一天和最后一天被获取。把第一天所在的那一周的前几天存入一个arr。
//       把最后一天所在的那一周的后几天存入arr，把这个月的所有日期存入arr
//     2. 根据这个arr渲染日历。通过table表格的html。通过拼装字符串
//     3.重新设置模版的html，再次重绘。
function DatePicker($dateInput) {
    this.$dateInput = $dateInput
    this.init()
    this.bind()

}
DatePicker.prototype.init = function() {
    this.isShow = false
    this.dateNow = new Date()
    this.yearNow = this.dateNow.getFullYear()
    this.monthNow = this.dateNow.getMonth() + 1
    this.dateForWatch = new Date()
    this.yearForWatch = this.dateForWatch.getFullYear()
    this.monthForWatch = this.dateForWatch.getMonth()
    this.renderTemplate() //设置模版
    this.setDate(this.dateNow) //设置日期，最后渲染
}
DatePicker.prototype.renderTemplate = function() {

    var tpl = `<div class="calendar-container">
                            <ul class="calendar-header clearfix">
                                <li class="pre"><a href="#">&lt;</a></li>
                                <li class="current-month">${this.yearNow}年${this.monthNow}月</li>
                                <li class="next"><a href="#">&gt;</a></li>
                            </ul>
                            <table class="panel">
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            </table>
                    </div>`
    this.$dateInput.parent().append($(tpl))

    this.$calendarContainer = this.$dateInput.parent().find('.calendar-container')

    this.$calendarContainer.css({
        'position': 'absolute',
        'left': 20,
        'top': this.$dateInput.offset().top + this.$dateInput.outerHeight(),
        'display': 'none'
    });

}
DatePicker.prototype.setDate = function(date) {
    var dateArr = this.getDateArr(date)
    this.$calendarContainer.find('.current-month').html(`${date.getFullYear()}年${date.getMonth()+1}月`)
    this.renderDate(dateArr)
}

DatePicker.prototype.getDateArr = function(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        firstDay = this.getFirstDay(date), //当前月的第一天
        lastDay = this.getLastDay(date), //当前月的最后一天
        dateArr = []

    for (let i = firstDay.getDay(); i > 0; i--) {
        var dateItem = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000);
        dateArr.push({
            type: 'pre-month',
            date: dateItem
        });
    } //上个月的

    for (let i = 0; i < lastDay.getDate() - firstDay.getDate() + 1; i++) {
        var dateItem = new Date(firstDay.getTime() + i * 24 * 60 * 60 * 1000);
        dateArr.push({
            type: 'cur-month',
            date: dateItem
        });
    } //这个月的

    for (let i = 1; i < 7 - lastDay.getDay(); i++) {
        var dateItem = new Date(lastDay.getTime() + i * 24 * 60 * 60 * 1000);
        dateArr.push({
            type: 'next-month',
            date: dateItem
        })
    } //下个月的
    return dateArr
}
DatePicker.prototype.renderDate = function(dateArr) {
    var dateString = ''
    for (let i = 0; i < dateArr.length; i++) {
        if (i % 7 === 0) {
            dateString += '<tr>'
            dateString += `<td class='${dateArr[i].type}'>${dateArr[i].date.getDate()}</td>`
        } else if (i % 7 === 6) {
            dateString += `<td class='${dateArr[i].type}'>${dateArr[i].date.getDate()}</td>`
            dateString += '</tr>'
        } else {
            dateString += `<td class='${dateArr[i].type}'>${dateArr[i].date.getDate()}</td>`
        }
    }
    this.$calendarContainer.find('tbody').html(dateString)
}

DatePicker.prototype.bind = function() {
    var _this = this

    $(window).on('click', function(e) {
            if ($(e.target)[0] === _this.$dateInput[0]) { //显示
                _this.showCalendar()
                _this.setDate(_this.dateNow)
                _this.$calendarContainer.find('.panel .cur-month').each(function(idx, node) {
                        if ($(node).html() === _this.dateNow.getDate().toString()) {
                            $(node).addClass('cur-date')
                        }

                    }) //设置显示当天的日期
            } else if ($(e.target).parents('.calendar-container')[0] === undefined && _this.isShow) { //关闭
                _this.hideCalendar()
            }
        }) //显示与隐藏日历



    this.$calendarContainer.find('.pre').on('click', function() {
            _this.monthForWatch--
                if (_this.monthForWatch < 0) {
                    _this.monthForWatch = 11
                    _this.yearForWatch--
                }
            _this.dateForWatch = new Date(_this.yearForWatch, _this.monthForWatch, 1) //设置显示的月份的第一天
            _this.setDate(_this.dateForWatch)
        }) //前滚日历
    this.$calendarContainer.find('.next').on('click', function() {
            _this.monthForWatch++
                if (_this.monthForWatch === 12) {
                    _this.monthForWatch = 0
                    _this.yearForWatch++
                }
            _this.dateForWatch = new Date(_this.yearForWatch, _this.monthForWatch, 1) //设置显示的月份的第一天
            _this.setDate(_this.dateForWatch)
        }) //后滚日历

    this.$calendarContainer.on('click', '.cur-month', function() {
            _this.$dateInput.val(`${_this.dateForWatch.getFullYear()}年${_this.dateForWatch.getMonth()+ 1}月${$(this).html()}日`)
            _this.$calendarContainer.css({
                    'display': 'none'
                }) //关闭日历
            _this.isShow = false
        }) //选中日期

    this.$dateInput.on('input', function() {
            _this.$calendarContainer.css({
                    'display': 'none'
                }) //关闭日历
            _this.isShow = false
        }) //输入日期


}

DatePicker.prototype.showCalendar = function() {
    this.$calendarContainer.css({
            'display': 'block'
        }) //显示日历
    this.isShow = true
    console.log('show')
}
DatePicker.prototype.hideCalendar = function() {
    this.$calendarContainer.css({
            'display': 'none'
        }) //显示日历
    this.isShow = false
    console.log('hide')
}
DatePicker.prototype.getFirstDay = function(dateNow) {
    return new Date(dateNow.getFullYear(), dateNow.getMonth(), 1)
}
DatePicker.prototype.getLastDay = function(dateNow) {
    return new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0)
}

// $('.date-input').each(function() {
//     new DatePicker($(this));
// })

$.fn.datePicker = function() {
        this.each(function() {
            new DatePicker($(this))
        })
    } //设置成jquery插件
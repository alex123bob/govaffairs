$(function() {
    var svc = 'http://59.202.58.195:8000/ESBWeb/services/33.1111.zjhz.NwsServerwsdl.SynReq@1.0',
        // info should be retrieved from fields in index.html page.
        // todo: finish ui part later.
        info = {
            idnumber: '123456789011203049',
            username: 'Alex',
            printtype: '0', // 0: 缴费情况，历年; 1: 参保证明，单位; 2: 参保证明,个人专用
            requestdepartment: 'test department',
            operator: 'test operator',
        },
        xmlStr = '<?xml version="1.0" encoding="UTF-8"?><request><head><aac002>idnumber</aac002><aac003>username</aac003><printtype>printtype</printtype><sqbm>requestdepartment</sqbm><czy>operator</czy></head></request>';

    xmlStr = xmlStr.replace(/idnumber|username|printtype|requestdepartment|operator/gi, function(matched) {
        return info[matched];
    });

    $.ajax({
        url: svc,
        type: 'GET',
        dataType: 'xml',
        data: xmlStr
    })
    .done(function(xml, status, xhr) {
        var rc = $(xml).find('rc').text(),
            rm = $(xml).find('rm').text(),
            responsedata,
            err = '';
        
        if (rc == '0') {
            responsedata = $(xml).find('responsedata').text();
            alert('获取成功!');
            // try pdf.js to load specific file
            // window.open("data:application/pdf;base64," + responsedata);
        }
        else {
            err += (rc == '1') ? '[业务异常] ' : (rc == '2' ? '[服务器异常] ' : '[未定义异常] ');
            err += '\n' + rm;
            alert(err);
        }
    })
    .fail(function (xhr, status) {
        alert('请求失败: ' + status);
    });
});
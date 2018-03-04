$(function () {
    $('.scrollbar-outer').scrollbar({
        displayScrollX: false

    });
    initChart(11, false);

    $("#divBigger").click(function () {
        initChart(3, true);
    });

    $("#divSmaller").click(function () {
        initChart(11, false);
    });
    function initChart(maxCount, IsDispScrollbar) {
        $.ajax({
            //url: "/CompAnalyst/ICloud/Sample/SalAjxGetHighchartsData",
            url: "/Sample/SalAjxGetHighchartsData",
            method: "POST"
        }).done(function (data) {
            console.log && console.log(data);

            var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var series = [];

            var dtbCity = data.City;
            var dtbMarketData = data.MarketData;
            var intMarkDataLen = data.MarketData.length;

            for (var i = 0 ; i < dtbCity.length; i++) {
                var objTemp = {
                    name: dtbCity[i].CityName,
                    data: []
                };
                var cityId = dtbCity[i].CityId;

                for (var j = 1; j <= 12; j++) { // j: month
                    var bolHasData = false;

                    for (var k = 0; k < intMarkDataLen; k++) {
                        if (dtbMarketData[k].CityId === cityId && dtbMarketData[k].Month === j) {
                            objTemp.data.push(dtbMarketData[k].Data);
                            bolHasData = true;
                            break;
                        }
                    }

                    if (!bolHasData) {
                        objTemp.data.push(0);
                    }
                }

                series.push(objTemp);
            }
            $('#highchart-container').highcharts({
                title: {
                    text: 'Monthly Average Temperature',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: WorldClimate.com',
                    x: -20
                },
                scrollbar: {
                    enabled: IsDispScrollbar
                },
                xAxis: {
                    categories: categories,
                    max: maxCount
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: series
            });

        });
    }
    $('#DefaultHeader').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxDefaultHeader',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
    $('#PanterHeader').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxPanterHeader',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
    $('#DefaultStyle').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxDefaultCSS',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
    $('#CustomerStyle').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxCustomerCSS',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
    $('#DefaultInternational').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxDefaultInternational',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
    $('#CustomerInternational').click(function () {
        jQuery.ajax({
            url: '/Sample/SalAjxCustomerInternational',
            data: {},
            crossDomain: false,
            type: "POST",
            cache: false,
            async: true,
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
});
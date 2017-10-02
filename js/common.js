$(document).ready(function () {



    $("#main-tabbed-nav").zozoTabs({
        theme: "silver",
        animation: {
            duration: 800,
            effects: "slideH"
        }
    });

    $("#graph-tabbed-nav").zozoTabs({
        theme: "silver",
        animation: {
            duration: 0
        }
    });

    $('.various').fancybox({
        maxWidth	: 800,
        maxHeight   : 600,
        fitToView	: false,
        width		: '75%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none',
        padding: 0,
        preload     : 0
    });

    //CHARTS

    var popularity = [
        [1, 0],
        [2, 150],
        [3, 50],
        [4, 30],
        [5, 200],
        [6, 190],
        [7, 80],
        [8, 80],
        [9, 100],
        [10, 100],
        [11, 100],
        [12, 140],
        [13, 100],
        [14, 150],
        [15, 160],
        [16, 100],
        [17, 130],
        [18, 100],
        [19, 110],
        [20, 100],
        [21, 100],
        [22, 190],
        [23, 50],
        [24, 100],
        [25, 90],
        [26, 10],
        [27, 160],
        [28, 100],
        [29, 45],
        [30, 200]

    ];

    var plot1 = $.plot("#first-chart", [
        { data: popularity}
    ], {
        series: {
            color: "rgba(0, 166, 232, 0.8)",
            lines: {
                show: true,
                fill: true,
                lineWidth: 0.4,
                fillColor: "rgba(0, 166, 232, 0.1)"
            },
            points: {
                show: false,
                radius: 0.3
            },
            labels: [1,3,4,7],
            shadowSize: 0
        },
        grid: {
            labelMargin: 10,
            hoverable: true,
            borderColor: "#FFF"
        },
        xaxis: {
            tickColor: "transparent",
            ticks: 30,
            tickFormatter: function (val, axis) {
              return val.toFixed()
            },
            color: "#212121",
            font: {
                size: 14,
                family: "MuseoSansCyrl, sans-serif"
            }

        },
        yaxis: {
            tickColor: "#e7e8e9",
            color: "#212121",
            min: 0,
            max: 200,
            font: {
                size: 14,
                family: "MuseoSansCyrl, sans-serif"
            },
            tickFormatter: function (val, axis) {
                return val.toFixed(axis.tickDecimals) + " K";
            }

        }

    });

    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid rgba(0, 166, 232, 0.4)",
        "border-radius": "2px",
        padding: "3px 4px",
        "background-color": "rgba(255,255,255, 0.9)",
        opacity: 0.80,
        "z-index": "99"
    }).appendTo("body");

    $("#first-chart").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
        $("#hoverdata").text(str);

        if (item) {
            var x = item.datapoint[1].toFixed(2);
            $("#tooltip").html(x)
                .css({top: item.pageY-35, left: item.pageX-25})
                .fadeIn(50);
        } else {
            $("#tooltip").hide();
        }
    });

    new Chartist.Bar('.age-bars', {
        labels: ['14-17', '17-20', '20-24', '24-30', '30-40', '55+'],
        series: [8, 7, 2, 3, 3, 1]
    }, {
        distributeSeries: true
    });


    //END CHARTS

    $(".drag-area").dropzone({ url: "/file/post" });

    //CARD VALIDATION
    var creditly = Creditly.initialize(
        '.creditly-wrapper .expiration-month-and-year',
        '.creditly-wrapper .credit-card-number',
        '.creditly-wrapper .security-code');
    
    
    $('.js-open-hist').on('click', function (e) {
        $('.settings').toggle();
        $('.payment-history').toggle();
    });

    $('.back-to-sett-btn').on('click', function (e) {
        $('.settings').toggle();
        $('.payment-history').toggle();
    });


    $('.js-open-sett').on('click', function (e) {
       e.preventDefault();
        $('.modal-wrapper').css('display','flex');

        $('.account__dropdown').slideToggle();
        $('.account__dropdown').siblings('.user-account').removeClass('closed-arrow');
        $('.account__dropdown').siblings('.user-account').addClass('opened-arrow');

        $('.settings').toggle();
        $('body').css('overflow', 'hidden');
    });



    $(".js-subs-plans>li").on('click', function () {
       $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    });

    $('.btn-tracking').on('click', function () {
        $('.modal-wrapper').css('display','flex');
        $('.tracking-links').toggle();
        $('body').css('overflow', 'hidden');
    });

    $('.btn-invite').on('click', function () {
        $('.modal-wrapper').css('display','flex');
        $('.invite-links').toggle();
        $('body').css('overflow', 'hidden');
    });

    $('.js-add-camp').on('click', function () {
        $('.modal-wrapper').css('display','flex');
        $('.add-compaign').toggle();
        $('body').css('overflow', 'hidden');
    });

    $('.close').on('click', function () {
        $(this).parent().parent().css('display', 'none');
        $('.modal-wrapper').css('display', 'none');
        $('body').css('overflow', 'auto');
    });



    //changing arrows direction on click
    $('.js-open-dash, .js-side-sub-dropdown, .js-month-dropdown, .js-open-user-account').on('click', function () {
        if($(this).hasClass('closed-arrow')) {
            $(this).removeClass('closed-arrow');
            $(this).addClass('opened-arrow');
        } else {
            $(this).removeClass('opened-arrow');
            $(this).addClass('closed-arrow');
        }
    });

    $('.js-open-dash').on('click', function () {
       $(this).siblings('.side-item__dropdown').slideToggle();
    });

    $('.js-side-sub-dropdown').on('click', function () {
        $(this).next('.subitem__dropdown').slideToggle();
    });
    $('.js-month-dropdown').on('click', function () {
        $(this).next('.month__dropdown-list').slideToggle();
    });

    $('.month__dropdown-list>li').on('click', function () {
        var checkedItem = $(this).text();


        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');

        $(this).parent().siblings('.js-month-dropdown').text(checkedItem);
        $(this).parent().slideToggle();
    });

    $('.js-open-user-account').on('click', function () {
        $(this).next('.account__dropdown').slideToggle();
    });
    $('.js-open-note').on('hover', function () {
       $('.notification').toggle();
    });



    $('aside').height($('main').css('height'));

    $("#datepick").daterangepicker({
        presetRanges: [{
            text: 'One day',
            dateStart: function() { return moment() },
            dateEnd: function() { return moment() }
        }, {
            text: 'First week',
            dateStart: function() { return moment().add(-1, 'day') },
            dateEnd: function() { return moment().add(-1, 'day') }
        }, {
            text: 'Last week',
            dateStart: function() { return moment().startOf('isoWeek') },
            dateEnd: function() { return moment().endOf('isoWeek') }
        }, {
            text: 'First month',
            dateStart: function() { return moment().add('months').startOf('month') },
            dateEnd: function() { return moment().endOf('day') }
        }, {
            text: 'Last month',
            dateStart: function() { return moment().add(-1, 'months').startOf('month') },
            dateEnd: function() { return moment().add(-1, 'months').endOf('month') }
        },{
            text: 'Lifetime',
            dateStart: function() { return moment().add(-1, 'months').startOf('month') },
            dateEnd: function() { return moment().endOf('day') }
        }],
        applyOnMenuSelect: false,
        datepickerOptions : {
            numberOfMonths : 2
        }
    });

    $('.ui-menu-item').on('click', function () {
       $(this).css({
           'list-style-image' : 'url(/img/icons/check-act.png)',
           'opacity' : '1'
       });
        $(this).siblings('li').css({
            'list-style-image' : 'url(/img/icons/check.png)',
            'opacity' : '.7'
        });
    });

});
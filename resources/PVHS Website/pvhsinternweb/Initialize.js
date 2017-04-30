var homeURL = location.protocol + "//" + window.location.hostname;

function parseXML(xml) {
    if (window.ActiveXObject && window.GetObject) {
        var dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.loadXML(xml);
        return dom;
    }

    if (window.DOMParser) {
        return new DOMParser().parseFromString(xml, 'text/xml');
    } else {
        throw new Error('No XML parser available');
    }
}

function GetContent(URL, TargetClientID, Loadingtype, SuccessCallback, FailureCallback, IsOverlay, Append) {
    (Loadingtype === undefined ? LoadingType = 3 : '');
    (SuccessCallback === undefined ? SuccessCallback = '' : '');
    (FailureCallback === undefined ? FailureCallback = '' : '');
    (IsOverlay === undefined ? IsOverlay = '0' : '');
    (Append === undefined ? Append = false : '');

    var LoadingHTML;
    var Selector;

    switch (Loadingtype) {
        //Small
        case 1:
            LoadingHTML = "SMALL LOADER HERE";
            break;
            //Large
        case 2:
            LoadingHTML = "<div class='ui-loading large'></div>";
            break;
            // None
        case 3:
            LoadingHTML = "";
            break;
    }

    Selector = "#" + TargetClientID;

    ajaxCall = $.ajax({
        url: URL,
        cache: false,
        beforeSend: function () {
            if (Loadingtype != 3) { BlockUserInteraction(TargetClientID, LoadingHTML, Loadingtype, 0, IsOverlay); }
        },
        success: function (strhtml) {

            // check for calendar and empty div directly surrounding eventlist uc first 
            //      to avoid memory error in IE (Access violation reading location 0x00000018)
            //      need to figure out exactly why this is happening..
            //      Partially to do with this? http://support.microsoft.com/kb/927917/en-us
            //      The error/crash happens when .empty() is called on Selector 
            //          (.html() calls .empty().append() in jquery)
            //      * no one has come across this issue anywhere else in the product so far

            if ($(Selector).find('#calendar-pnl-calendarlist').length > 0) {
                $('#calendar-pnl-calendarlist').empty();
                $(Selector).html(strhtml);
            } else if (Append) {
                $(Selector).append(strhtml);
            }
            else {
                $(Selector).html(strhtml);
            }


            // check for tabindex 
            if ($(Selector).find(":input[tabindex='1']:first").length > 0) {
                $(Selector).find(":input[tabindex='1']:first").focus();
            } else {
                $(Selector).find(":input[type='text']:first").not('.nofocus').focus();
            }

            //if (CheckDirty(Selector) === true) { BindSetDirty(Selector); }
            //CheckDirty(Selector);
            BlockUserInteraction(TargetClientID, '', '', 1);
            (SuccessCallback != '' ? eval(SuccessCallback) : '');
        },
        failure: function () {
            BlockUserInteraction(TargetClientID, '', '', 1);
            (FailureCallback != '' ? eval(FailureCallback) : '');
        }
    });
}

function BlockUserInteraction(TargetClientID, LoadingHTML, Loadingtype, Unblock, IsOverlay) {
    if (LoadingHTML === undefined) {
        LoadingHTML = "<div class='ui-loading large'></div>";
    }

    if (Unblock == 1) {
        $('#' + TargetClientID).unblockinteraction();
    } else {
        if (IsOverlay == 1) {
            $('#' + TargetClientID).blockinteraction({ message: LoadingHTML, type: Loadingtype, isOverlay: true });
        } else {
            $('#' + TargetClientID).blockinteraction({ message: LoadingHTML, type: Loadingtype });
        }
    }
}

function OpenUltraDialogOverlay(OverlayClientID, options, Callback) {
    var defaults = {
        LoadType: "U",
        LoadURL: "",
        TargetDivID: "",
        LoadContent: "",
        NoResize: false,
        ScrollTop: false,
        CloseCallback: undefined
    };

    jQuery.extend(defaults, options);

    // check what browser/version we're on
    var isIE = GetIEVersion();

    if (isIE == 0) {
        if ($.browser.mozilla) {
            //Firefox/Chrome
            $("body").css("overflow", "hidden");
        } else {
            //Safari
            $("html").css("overflow", "hidden");
        }
    } else {
        // IE
        $("html").css("overflow", "hidden");
    }

    var OverlaySelector;
    var BodyClientID;
    var TargetDivSelector;
    var CurrentScrollPosition;

    if (defaults.ScrollTop) {
        $.scrollTo(0, { duration: 0 });
    }

    OverlaySelector = "#dialog-ultra-overlay-" + OverlayClientID + "-base";
    BodyClientID = "dialog-ultra-overlay-" + OverlayClientID + "-holder";
    TargetDivSelector = "#" + defaults.TargetDivID;

    if ($.trim($("#dialog-ultra-overlay-" + OverlayClientID + "-holder").html()) != "") {
        CloseUltraDialogOverlay(OverlayClientID);
    }

    // U = URL
    // H - HTML
    // D - Divider

    var success = "";

    if (Callback !== undefined) {
        success += Callback;
    }

    // block user interaction
    BlockUserInteraction(BodyClientID, "<div class='ui-loading large'></div>", 2, 0, 1);

    switch (defaults.LoadType) {
        case 'U':
            GetContent(defaults.LoadURL, BodyClientID, 3, success);
            break;
        case 'H':
            $("#" + BodyClientID).html(defaults.LoadContent);
            break;
        case 'D':
            $("#" + BodyClientID).html($(TargetDivSelector).html());
            break;
    };

    // open the lateral panel
    var browserWidth = $(document).width();

    if (OverlayClientID == "UltraOverlayLarge") {
        browserWidth = browserWidth - 200;
    } else {
        browserWidth = browserWidth - 280;
    }

    $("#dialog-ultra-overlay-" + OverlayClientID + "-body").css("width", browserWidth);
    $(OverlaySelector).addClass("is-visible");

    // hide 'X' button if second window opened
    if (OverlayClientID == "UltraOverlayMedium") {
        $("#dialog-ultra-overlay-UltraOverlayLarge-close").hide();
    }
}

function CloseUltraDialogOverlay(OverlayClientID) {
    $("#dialog-ultra-overlay-" + OverlayClientID + "-base").removeClass("is-visible");

    // show 'X' button if second window closed
    if (OverlayClientID == "UltraOverlayMedium") {
        $("#dialog-ultra-overlay-UltraOverlayLarge-close").show();
    }

    if (OverlayClientID != "UltraOverlayMedium") {
        // check what browser/version we're on
        var isIE = GetIEVersion();

        if (isIE == 0) {
            if ($.browser.mozilla) {
                //Firefox/Chrome
                $("body").css("overflow", "auto");
            } else {
                //Safari
                $("html").css("overflow", "auto");
            }
        } else {
            // IE
            $("html").css("overflow", "auto");
        }
    }
}

function OpenDialogOverlay(OverlayClientID, options, Callback) {
    var defaults = {
        LoadType: 'U',
        LoadURL: '',
        TargetDivID: '',
        LoadContent: '',
        NoResize: false,
        ScrollTop: false,
        CloseCallback: undefined
    };

    jQuery.extend(defaults, options);

    //check what browser/version we're on
    var isIE = GetIEVersion();

    //if (isIE == 0) {
    //    if ($.browser.mozilla) {
    //        //Firefox/Chrome
    //        $('body').css('overflow', 'hidden');
    //    } else {
    //        //Safari
    //        $('html').css('overflow', 'hidden');
    //    }
    //} else {
    //    // IE
    //    $('html').css('overflow', 'hidden');
    //}
    $('html').css('overflow', 'hidden');

    var OverlaySelector;
    var BodyClientID;
    var TargetDivSelector;

    if (defaults.ScrollTop) {
        $.scrollTo(0, { duration: 0 });
    }

    OverlaySelector = "#dialog-overlay-" + OverlayClientID + "-base";
    BodyClientID = "dialog-overlay-" + OverlayClientID + "-body";
    TargetDivSelector = "#" + defaults.TargetDivID;

    $(OverlaySelector).appendTo('body');

    $("#" + OverlayClientID).css("top", "5%");

    $("#" + BodyClientID).html("");

    if ($.browser.msie) {
        $(OverlaySelector).show();
    } else {
        $(OverlaySelector).fadeIn();
    }

    if ($.trim($('#dialog-overlay-' + OverlayClientID + '-body').html()) != "") {
        CloseDialogOverlay(OverlayClientID);
    }

    // U = URL
    // H - HTML
    // D - Divider

    var success = "";

    if (Callback !== undefined) {
        success += Callback;
    }

    // Block user interaction
    $('#' + BodyClientID).css({ 'min-height': '100px' });
    BlockUserInteraction(BodyClientID, "<div class='ui-loading large'></div>", 2, 0, 1);

    switch (defaults.LoadType) {
        case 'U':
            GetContent(defaults.LoadURL, BodyClientID, 3, success);
            break;
        case 'H':
            $("#" + BodyClientID).html(defaults.LoadContent);
            break;
        case 'D':
            $("#" + BodyClientID).html($(TargetDivSelector).html());
            break;

    };

    if (defaults.CloseCallback !== undefined) {
        $(OverlaySelector + ' .ui-dialog-overlay-close').attr('onclick', 'CloseDialogOverlay(\'' + OverlayClientID + '\',' + defaults.CloseCallback + ')')
    }

    // check for tabindex 
    if ($("#" + BodyClientID).find(":input[tabindex='1']:first").length > 0) {
        $("#" + BodyClientID).find(":input[tabindex='1']:first").focus();
    } else {
        $("#" + BodyClientID).find(":input[type='text']:first").focus();
    }

    $('#dialog-overlay-' + OverlayClientID + '-base').css({'overflow': 'auto', 'top': '0', 'width': '100%', 'left': '0' });
}

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    if (Idx > 0) {
        // If IE, return version number
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        // If IE 11 then look for Updated user agent string
        return 11;
    } else {
        //It is not IE
        return 0;
    }
}

// DETERMINE TEXT COLOR 

function rgbstringToTriplet(rgbstring) {
    var commadelim = rgbstring.substring(4, rgbstring.length - 1);
    var strings = commadelim.split(",");
    var numeric = [];

    for (var i = 0; i < 3; i++) {
        numeric[i] = parseInt(strings[i]);
    }

    return numeric;
}

function adjustColour(someelement) {
    var rgbstring = someelement.css('background-color');
    var triplet = [];
    var newtriplet = [];

    if (rgbstring != 'transparent') {
        if (/rgba\(0, 0, 0, 0\)/.exec(rgbstring)) {
            triplet = [255, 255, 255];
        } else {
            if (rgbstring.substring(0, 1).toLowerCase() != 'r') {
                CheckScript('RGBColor', staticURL + '/GlobalAssets/Scripts/ThirdParty/rgbcolor.js');
                // not rgb, convert it
                var color = new RGBColor(rgbstring);
                rgbstring = color.toRGB();
            }
            triplet = rgbstringToTriplet(rgbstring);
        }
    } else {
        triplet = [255, 255, 255];
    }

    // black or white:
    var total = 0; for (var i = 0; i < triplet.length; i++) { total += triplet[i]; }

    if (total > (3 * 256 / 2)) {
        newtriplet = [0, 0, 0];
    } else {
        newtriplet = [255, 255, 255];
    }

    var newstring = "rgb(" + newtriplet.join(",") + ")";

    someelement.css('color', newstring);
    someelement.find('*').css('color', newstring);

    return true;
}


// END DETERMINE TEXT color

function CheckScript2(ModuleName, ScriptSRC) {
    $.ajax({
        url: ScriptSRC,
        async: false,
        //context: document.body,
        success: function (html) {
            var script =
				document.createElement('script');
            document.getElementsByTagName('head')[0].appendChild(script);
            script.text = html;
        }
    });
}

// AREA / SCREEN CODES

function setCurrentScreenCode(screenCode) {
    SetCookie('currentScreenCode', screenCode);
    AddAnalyticsEvent(getCurrentAreaCode(), screenCode, 'Page View');
}

function getCurrentScreenCode() {
    var cookieValue = GetCookie('currentScreenCode');
    return (cookieValue != '' ? cookieValue : 0);
}

function setCurrentAreaCode(areaCode) {
    SetCookie('currentAreaCode', areaCode);
}

function getCurrentAreaCode() {
    var cookieValue = GetCookie('currentAreaCode');
    return (cookieValue != '' ? cookieValue : 0);
}

// END AREA / SCREEN CODES

// CLICK HOME TAB IN HEADER SECTION

function GoHome() {
    window.location.href = homeURL + "/cms/Workspace";
}

// END CLICK HOME TAB IN HEADER SECTION

// HELP PANEL

function OpenHelpPanel() {
    var ScreenCode = getCurrentScreenCode();
    OpenDialogOverlay('HelpPanel', { LoadType: 'U', LoadURL: homeURL + '/GlobalUserControls/HelpPanel/HelpPanelWrapper.aspx?ScreenCode=' + ScreenCode });
}

// END HELP PANEL

// COOKIES
function SetCookie(name, value, days, ms) {
    var expires = "";

    if (ms) {
        var date = new Date();

        date.setMilliseconds(date.getMilliseconds() + ms);
        expires = "; expires=" + date.toGMTString();
    } else if (days) {
        var date = new Date();

        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function GetCookie(name) {
    var value = "";

    if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(name + "=");

        if (start != -1) {
            start = start + name.length + 1;

            var end = document.cookie.indexOf(";", start);

            if (end == -1) end = document.cookie.length;
            value = unescape(document.cookie.substring(start, end));
        }
    }

    return value;
}

function DeleteCookie(name) {
    SetCookie(name, '', -1);
}

function SetUnescapedCookie(name, value, days, ms) {
    var expires = "";

    if (ms) {
        var date = new Date();

        date.setMilliseconds(date.getMilliseconds() + ms);
        expires = "; expires=" + date.toGMTString();
    } else if (days) {
        var date = new Date();

        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}
// END COOKIES



// IFRAME FUNCTIONS
function BindResizeFrame(FrameID) {
    $(document).on('load', "#" + FrameID, function () {
        var bodyHeight = $("#" + FrameID).contents().height() + 40;
        $("#" + FrameID).attr("height", bodyHeight + "px");
    });
}

function AdjustLinkTarget(FrameID) {
    $(document).on('load', "#" + FrameID, function () {
        $("#" + FrameID).contents().find("a").attr("target", "_parent");
    });
}

// END IFRAME FUNCTIONS


// SCROLL TOP

function ScrollTop() {
    $.scrollTo(0, { duration: 1000 });
}

// END SCROLL TOP

// ANALYTICS TRACKING

function AddAnalyticsEvent(category, action, label) {
    _gaq.push(['_trackEvent', category, action, label]);
}

// END ANYLYTICS TRACKING


// BEGIN INCLUDE DOC READY SCRIPTS

function IncludeDocReadyScripts() {
    var arrScripts = [
		staticURL + '/GlobalAssets/Scripts/min/external-combined.min.js',
		staticURL + '/GlobalAssets/Scripts/Utilities.js'

    ];

    var script = document.createElement('script');
    script.type = 'text/javascript';

    $.each(arrScripts, function () {
        //script.src = this;
        //$('head').append(script);
        $.ajax({
            url: this,
            async: true,
            cache: true,
            success: function (msg) {
                var result = msg.d;
                script.text = result;

                $('head').append(script);
            }
        });
    });

}
// END INCLUDE DOC READY SCRIPTS

//BEGIN ONSCREEN ALERT SCRIPTS
function OnScreenAlertDialogInit() {
    $("#onscreenalert-message-dialog").hide();
    $(".titleMessage").hide();
    $("#onscreenalert-ctrl-msglist").hide();
    $(".onscreenalert-ctrl-footer").hide();

    $(".icon-icon_alert_round_message").addClass("noBorder");
    $('.onscreenalert-ctrl-modal').addClass('MoveIt2 MoveIt1 Smaller');
    $('.onscreenalert-ctrl-modal').css({ "top": "88%" });
    $("#onscreenalert-message-dialog").show();
}

function OnScreenAlertGotItDialog(serverTime) {
    var alertsID = '';
    alertsID = GetCookie("Alerts");
    var arr = [];

    if (alertsID.length > 0) {
        arr = alertsID.split(',')
    }

    $("#onscreenalertdialoglist li").each(function () {
        arr.push($(this).attr('id'));
    });

    arr.sort();
    var newarr = $.unique(arr);

    SetUnescapedCookie("Alerts", newarr.join(','), 365);
    OnScreenAlertMaskShow(false);

    $('.onscreenalert-ctrl-modal').removeClass("notransition");
    $(".onscreenalert-ctrl-footer").slideUp(200);
    $("#onscreenalert-ctrl-msglist").slideUp(200);

    // check what browser/version we're on
    // if IE 9 or less, don't do CSS 3 transitions (not supported)
    var isIE = GetIEVersion();

    if (isIE == 0) {
        // not IE
        hideOnScreenAlertTransitions();
    } else {
        // IE
        if (isIE == 8 || isIE == 9) {
            hideOnScreenAlertNoTransitions();
        } else if (isIE >= 10) {
            hideOnScreenAlertTransitions();
        }
    }
}

function OnScreenAlertOpenDialog(SiteID) {
    $('#sw-important-message-tooltip').hide();
    var onscreenAlertCookie = GetCookie('Alerts');

    if (onscreenAlertCookie != '' && onscreenAlertCookie != undefined) {
        GetContent(homeURL + "/cms/Tools/OnScreenAlerts/UserControls/OnScreenAlertDialogListWrapper.aspx?OnScreenAlertCookie=" + onscreenAlertCookie + "&SiteID=" + SiteID, "onscreenalert-ctrl-cookielist", 2, "OnScreenAlertCookieSuccess();");
        $('.onscreenalert-ctrl-content').focus();
    }
}

function OnScreenAlertCookieSuccess() {
    OnScreenAlertMaskShow(true);

    $('.onscreenalert-ctrl-modal').removeClass("notransition");
    $('.onscreenalert-ctrl-modal').removeClass("Smaller");

    // check what browser/version we're on
    // if IE 9 or less, don't do CSS 3 transitions (not supported)
    var isIE = GetIEVersion();

    if (isIE == 0) {
        // not IE
        showOnScreenAlertTransitions();
    } else {
        // IE
        if (isIE == 8 || isIE == 9) {
            showOnScreenAlertNoTransitions();
        } else if (isIE >= 10) {
            showOnScreenAlertTransitions();
        }
    }

    $('.onscreenalert-ctrl-modal').addClass('MoveIt3');
    $('.onscreenalert-ctrl-modal').css({
        "top": "5%"
    });

    // move div to top of viewport
    $('.onscreenalert-ctrl-modal').one('transitionend', function (e) {
        var top = $('.onscreenalert-ctrl-modal').offset().top;

        $('.onscreenalert-ctrl-modal').addClass("notransition").removeClass('MoveIt1').addClass('MoveIt4');
        $('.onscreenalert-ctrl-modal').css({
            "top": top
        });
        $('.onscreenalert-ctrl-modal').removeClass('MoveIt2');
    });
}

function showOnScreenAlertTransitions() {
    $('.onscreenalert-ctrl-modal').one('transitionend', function (e) {
        $(".icon-icon_alert_round_message").removeClass("noBorder");
        $(".titleMessage").show();
        $("#onscreenalert-ctrl-msglist").slideDown(200);
        $(".onscreenalert-ctrl-footer").slideDown(200);
    });
}

function showOnScreenAlertNoTransitions() {
    $(".icon-icon_alert_round_message").removeClass("noBorder");
    $(".titleMessage").show();
    $("#onscreenalert-ctrl-msglist").slideDown(200);
    $(".onscreenalert-ctrl-footer").slideDown(200);
}

function hideOnScreenAlertTransitions() {
    $(".titleMessage").fadeOut(200, function () {
        $('.onscreenalert-ctrl-modal').addClass("notransition").removeClass('MoveIt4').addClass('MoveIt1');
        $('.onscreenalert-ctrl-modal').css({
            "top": "5%"
        });
        $('.onscreenalert-ctrl-modal').addClass("Smaller");
        $(".icon-icon_alert_round_message").addClass("noBorder");

        $('.onscreenalert-ctrl-modal').one('transitionend', function (e) {
            $('.onscreenalert-ctrl-modal').removeClass("notransition");
            $('.onscreenalert-ctrl-modal').removeClass('MoveIt3').addClass('MoveIt2');
            $('.onscreenalert-ctrl-modal').css({
                "top": "88%"
            });
        });
    });
}

function hideOnScreenAlertNoTransitions() {
    $(".titleMessage").fadeOut(200, function () {
        $('.onscreenalert-ctrl-modal').addClass("notransition").removeClass('MoveIt4').addClass('MoveIt1');
        $('.onscreenalert-ctrl-modal').css({
            "top": "5%"
        });
        $('.onscreenalert-ctrl-modal').addClass("Smaller");
        $(".icon-icon_alert_round_message").addClass("noBorder");

        $('.onscreenalert-ctrl-modal').removeClass("notransition");
        $('.onscreenalert-ctrl-modal').removeClass('MoveIt3').addClass('MoveIt2');
        $('.onscreenalert-ctrl-modal').css({
            "top": "88%"
        });
    });
}

function OnScreenAlertCheckListItem() {
    var ShowOkGotIt = $("#onscreenalertdialoglist-hid-showokgotit").val();
    var ShowStickyBar = $("#onscreenalertdialoglist-hid-showstickybar").val();

    if (ShowOkGotIt == "True" && ShowStickyBar == "False") {
        OnScreenAlertShowCtrls(true, true, false);
    } else if (ShowOkGotIt == "False" && ShowStickyBar == "True") {
        OnScreenAlertShowCtrls(true, false, true);
    } else {
        OnScreenAlertShowCtrls(false, false, false);
    }
}

function OnScreenAlertDialogShowAndGetFocus() {
    //$("#onscreenalert-message-dialog").show();
    //$('#onscreenalert-message-dialog h3').addClass("onscreenalertcontentfocus");

    //set focus on dialog header
    setTimeout(function () { $("#onscreenalert-message-dialog-icon").focus(); }, 0);
}

function OnScreenAlertShowCtrls(boolOkGotIt, boolMask, boolStickyBar) {
    (boolOkGotIt == true) ? (OnScreenAlertDialogShowAndGetFocus()) : ($("#onscreenalert-message-dialog").hide());
    (boolMask == true) ? (OnScreenAlertMaskShow(true)) : (OnScreenAlertMaskShow(false));

    if (boolStickyBar == true) {
        OnScreenAlertDialogInit();
    };
}

function OnScreenAlertMaskShow(boolShow) {
    if (boolShow == true) {
        $("#onscreenalert-ctrl-mask").css({ "position": "absolute", "background": "#000", "filter": "alpha(opacity=70)", "-moz-opacity": "0.7", "-khtml-opacity": "0.7", "opacity": "0.7", "z-index": "9991", "top": "0", "left": "0" });
        $("#onscreenalert-ctrl-mask").css({ "height": function () { return $(document).height(); } });
        $("#onscreenalert-ctrl-mask").css({ "width": function () { return $(document).width(); } });
        $("#onscreenalert-ctrl-mask").show();
    } else {
        $("#onscreenalert-ctrl-mask").hide();
    }
}
// END ONSCREEN ALERT SCRIPTS


// START SIDEBAR TOUR SCRIPTS
/* 
 *  Wrapping sidebar tour in a function 
 *  to be called when needed.
 */

var hasPasskeys = false;
var hasStudents = false;

function startSidebarTour() {
    // define tour
    var tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-default'
        }
    });

    if ($('#dashboard-sidebar-student0').length > 0) {
        hasStudents = true;
    }

    if ($("#dashboard-sidebar-passkeys").get(0)) {
        hasPasskeys = true;
    }


    // define steps

    tour.addStep('Intro', {
        //title: '',
        text: '<div id="tour-lightbulb-icon"></div><p><span class="shepherd-heading" >Introducing</span> your new personalized dashboard. Would you like to take a quick tour?</p>',
        attachTo: 'body',
        classes: 'dashboard-sidebar-tour-firststep shepherd-theme-default',
        when: {
            show: function () {
                AddAnalyticsEvent('Dashboard', 'Tour', 'View');
            }
        },
        buttons: [
          {
              text: 'Yes! Let\'s go.',
              action: function () {
                  AddAnalyticsEvent('Dashboard', 'Tour', 'Continue');
                  tour.next();
                  TourADAFocus();
              },
              events: {
                  'keydown': function (e) {
                      TourButtonPress(e, tour);
                  }
              }
          },
          {
              text: 'Maybe later.',
              classes: 'shepherd-button-sec',
              action: function () {
                  AddAnalyticsEvent('Dashboard', 'Tour', 'Hide For Now');
                  tour.show('Later');
                  TourADAFocus();
              },
              events: {
                  'keydown': function (e) {
                      TourButtonPress(e, tour, 'Later');
                  }
              }
          },
          {
              text: 'No thanks. I\'ll explore on my own.',
              classes: 'shepherd-button-suboption',
              action: function () {
                  AddAnalyticsEvent('Dashboard', 'Tour', 'Hide Forever');
                  tour.show('Never');
                  TourADAFocus();
              },
              events: {
                  'keydown': function (e) {
                      TourButtonPress(e, tour, 'Never');
                  }
              }
          }
        ]
    }).addStep('Avatar', {
        text: 'Click on your user avatar to access and update your personal information and subscriptions.',
        attachTo: '#dashboard-sidebar-avatar-container right',
        when: {
            show: function() {
                $('h3.shepherd-title').attr('role', 'none'); //ADA compliance
            }
        },
        classes: 'shepherd-theme-default shepherd-element-custom',
        buttons: [
          {
              text: 'Continue',
              action: function () {
                tour.next();
                TourADAFocus();

              },
              events: {
                  'keydown': function (e) {
                      if (hasPasskeys) {
                          TourButtonPress(e, tour);
                      } else {
                          TourButtonPress(e, tour, 'Finish');
                      }
                  }
              }
          }
        ]
    }).addStep('Stream', {
        text: 'Go to your stream to see updates from your district and schools.',
        attachTo: '#dashboard-sidebar-stream right',
        buttons: [
          {
              text: 'Continue',
              action: function () {
                  if (hasPasskeys) {
                      tour.next();
                      TourADAFocus();
                  } else {
                      tour.show('Finish');
                      TourADAFocus();
                  }
              },
              events: {
                  'keydown': function (e) {
                      if(hasPasskeys){
                          TourButtonPress(e, tour);
                      } else {
                          TourButtonPress(e, tour, 'Finish');
                      }
                  }
              }
          }
        ]
    });

    if (hasPasskeys) {
        tour.addStep('Passkeys', {
            text: 'Use your passkeys to log into other district applications or websites.',
            attachTo: '#dashboard-sidebar-passkeys right',
            buttons: [
              {
                  text: 'Continue',
                  action: function () {
                      if (hasStudents) {
                          tour.show('Students');
                          TourADAFocus();
                      }
                      else {
                          tour.show('Finish');
                          TourADAFocus();
                      }
                  },
                  events: {
                      'keydown': function (e) {
                          if (hasStudents) {
                              TourButtonPress(e, tour, 'Students');
                          }
                          else {
                              TourButtonPress(e, tour, 'Finish');
                          }
                      }
                  }
              }
            ]
        })
    }

    if (hasStudents) {
        tour.addStep('Students', {
            text: 'Select a student to view his or her information and records.',
            attachTo: '#dashboard-sidebar-student0 right',
            buttons: [
              {
                  text: 'Continue',
                  action: function () {
                      tour.show('Finish');
                      TourADAFocus();
                  },
                  events: {
                      'keydown': function (e) {
                          TourButtonPress(e, tour, 'Finish');
                      }
                  }
              }
            ]
        })
    }

    tour.addStep('Later', {
        text: 'Ok, we\'ll remind you later. You can access the tour here any time you want.',
        attachTo: '#dashboard-sidebar-help right',
        classes: 'shepherd-theme-default shepherd-element-custom-bottom',
        buttons: [
          {
              text: 'Finish',
              action: function () {
                  SetCookie("DashboardSidebarTour", "true");
                  tour.cancel();
              },
              events: {
                  'keydown': function (e) {
                      e.stopImmediatePropagation();
                      if (e.keyCode == 13) {
                          SetCookie("DashboardSidebarTour", "true");
                          tour.cancel();
                      }
                  }
              }
          }
        ]

    }).addStep('Never', {
        text: 'Ok, we won\'t ask you again. If you change your mind, you can access the tour here any time you want.',
        attachTo: '#dashboard-sidebar-help right',
        classes: 'shepherd-theme-default shepherd-element-custom-bottom',
        buttons: [
          {
              text: 'Finish',
              action: function () {
                  SetCookie("DashboardSidebarTour", "true");
                  DenyTour();
              },
              events: {
                  'keydown': function (e) {
                      e.stopImmediatePropagation();
                      if (e.keyCode == 13) {
                          SetCookie("DashboardSidebarTour", "true");
                          DenyTour();
                      }
                  }
              }
          }
        ]

    }).addStep('Finish', {
        text: 'All finished! Go here any time to view this tour again.',
        attachTo: '#dashboard-sidebar-help right',
        classes: 'shepherd-theme-default shepherd-element-custom-bottom',
        buttons: [
          {
              text: 'Finish',
              action: function () {
                  SetCookie("DashboardSidebarTour", "true");
                  FinishTour();
              },
              events: {
                  'keydown': function (e) {
                      e.stopImmediatePropagation();
                      if (e.keyCode == 13) {
                          SetCookie("DashboardSidebarTour", "true");
                          FinishTour();
                      }
                  }
              }
          }
        ]
    });

    // start tour
    tour.start();
    TourADA();
}

function TourADA() {
    $(".shepherd-content").attr("tabindex", "0");
    $(".shepherd-button").each(function () {
        var $this = $(this);
        $this.attr("title", $this.text());
        $this.attr("tabindex", "0");
    });
}

function TourADAFocus() {
    TourADA();
    $(".shepherd-content").focus();
}

function TourButtonPress(e, tour, next) {
    e.stopImmediatePropagation();
    if (e.keyCode == 13) {
        if (next == undefined) {
            tour.next();
        } else {
            tour.show(next);
        }
        TourADAFocus();
    }
}

function FinishTour() {
    var data = "";
    var success = 'ActiveTourCancel();';
    var failure = 'CallControllerFailure(result[0].errormessage);';
    CallController(homeURL + "/GlobalUserControls/DashBoardSideBar/DashBoardSideBarController.aspx/FinishTour", data, success, failure);
}

function DenyTour() {
    var data = "";
    var success = 'ActiveTourCancel();';
    var failure = 'CallControllerFailure(result[0].errormessage);';
    CallController(homeURL + "/GlobalUserControls/DashBoardSideBar/DashBoardSideBarController.aspx/DenyTour", data, success, failure);
}

function ActiveTourCancel() {
    Shepherd.activeTour.cancel();
}
// END SIDEBAR TOUR SCRIPTS

// BEGIN DOCUMENT READY
$(document).ready(function () {

    if ($('#sw-sidebar').height() > 1500) {
        $('#sw-page').css('min-height', $('#sw-sidebar').height() + 'px');
        $('#sw-inner').css('min-height', $('#sw-sidebar').height() + 'px');
    } else {
        $('#sw-page').css('min-height', $(document).height() + 'px');
        $('#sw-inner').css('min-height', $(document).height() + 'px');
    }

    $('#sw-footer').show();

    // add focus class to textboxes for IE
    $(document).on('focus', 'input', function () {
        $(this).addClass('focus');
    });

    $(document).on('blur', 'input', function () {
        $(this).removeClass('focus');
    });

    // default ajax setup
    $.ajaxSetup({
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //swalert(XMLHttpRequest.status + ' ' + textStatus + ': ' + errorThrown, 'Ajax Error', 'critical', 'ok');
            swalert("Something went wrong. We're sorry this happened. Please refresh your page and try again.", "Error", "critical", "ok");
        }
    });

    // make :Contains (case-insensitive version of :contains)
    jQuery.expr[':'].Contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    // HIDE / SHOW DETAILS IN LIST SCREEN
    $(document).on('click', 'span.ui-show-detail', function () {
        var $this = $(this);

        if ($this.hasClass('open')) {
            // do nothing
        } else {
            $this.addClass('open').parent('div.ui-article-header').nextAll('div.ui-article-detail').slideDown(function () {
                // add close button
                $this.append("<span class='ui-article-detail-close'></span>");
            });
        }
    });

    $(document).on('click', 'span.ui-article-detail-close', function () {
        $this = $(this);
        $this.parents('.ui-article-header').nextAll('.ui-article-detail').slideUp(function () {
            $this.parent('.ui-show-detail').removeClass('open');
            // remove close button
            $this.remove();
        });
    });


    // LIST/EXPANDED VIEW ON LIST PAGES
    $(document).on('click', '#show-list-view', function () {
        $(this).addClass('ui-btn-toolbar-primary').removeClass('ui-btn-toolbar');
        $('#show-expanded-view').addClass('ui-btn-toolbar').removeClass('ui-btn-toolbar-primary');
        $('div.ui-article-detail').slideUp(function () {
            // remove close buttons
            $(this).prevAll('.ui-article-header').find('.ui-article-detail-close').remove();
            //$this.children('.ui-article-detail-close').remove();
        });
        $('span.ui-show-detail').removeClass('open');
    });

    $(document).on('click', '#show-expanded-view', function (i) {
        $(this).addClass('ui-btn-toolbar-primary').removeClass('ui-btn-toolbar');
        $('#show-list-view').addClass('ui-btn-toolbar').removeClass('ui-btn-toolbar-primary');
        $('div.ui-article-detail').slideDown('', function () {
            // add close buttons
            $(this).prevAll('.ui-article-header').children('.ui-show-detail').append("<span class='ui-article-detail-close'></span>");
        });
        $('span.ui-show-detail').addClass('open');
    });

    //Important Message Ok, got it tab=0
    $('#onscreenalert-ctrl-gotit').keydown(function (e) {
        e.stopImmediatePropagation();
        if (e.keyCode == 13) {
            $(this).click();
        }
    });

    $('#onscreenalert-message-dialog-icon').keydown(function (e) {
        e.stopImmediatePropagation();
        if (e.keyCode == 13) {
            $(this).click();
        }
    });

}); // end document ready

// load scripts after everything else
$(window).load(IncludeDocReadyScripts);
//LASTE UPDAED: 11/03/2016

$(window).load(function() {
    if($("#gb-page").hasClass("drt-mywaypremium")) {
        if($(window).width() >= 320 && $(window).width() <= 639){
            calendarListView();
        }
    }
    searchText();
});
$(document).ready(function() {
    drtCentralizedJS();
    if($("#gb-page").hasClass("drt-mywaypremium")) {
        myWayPremiumSpecific();
        $(window).bind("resize", function(){
            if($(window).width() >= 320 && $(window).width() <= 639){
                calendarListView();
            }
        });
    }
    /*if($("#gb-page").hasClass("drt-myway")) {
        myWaySpecific();
    }
    if($("#gb-page").hasClass("drt-express")) {
        expressSpecific();
    }
    if($("#gb-page").hasClass("drt-standard")) {
        standardSpecific();
    }*/
});

function drtCentralizedJS() {
    //ADD BROWSER AND VERSION CLASS ON BODY
    if(isMSIE){ $("body").addClass("msie"); }
    if(isMSIE8){ $("body").addClass("msie8"); }
    if(isMSIE9){ $("body").addClass("msie9"); }
    if(isMSIE10){ $("body").addClass("msie10"); }
    $("body").addClass(navigator.platform + " " + browserName + " " + browserName + browserVersion);
    
    // ********** MYSTART ********** //
    //DOC fixes search box not allowing spaces
    $("#sw-mystart-search").unbind();
    
    //SHOW HIDE DISTRICT HOME BUTTON
    var districtHome = '<SWCtrl controlname="Custom" props="Name:districtButton" />';
    if (districtHome == "false"){
        $(".sw-mystart-button.home").hide();
    } else {
        $(".sw-mystart-button.home").show();
    }
    
    // ********** CHANNEL BAR ********** //
    //DOC add first class to first channel item
    $("li.sw-channel-item").first().addClass("first");

    //DOC add last class to last channel item
    $("li.sw-channel-item").last().addClass("last");
    
    //HIDE EMPTY DROPDOWN THAT GETS PLACED BY THE SYSTEM IF CHANNEL HAS NO SECTIONS BUT CHANNEL HOMEPAGE IS TURNED ON
    $("ul.sw-channel-dropdown").each(function() {
        var systemDropdown = $(this);
        if(!$("li",systemDropdown).length) {
            $(systemDropdown).remove();
        }
    });

    //DOC ADD HAS-DROPDOWN CLASS TO CHANNELS THAT HAVE A SECTION DROPDOWN
    $("li.sw-channel-item").each(function() {
        if($(".sw-channel-dropdown", this).length) {
            $(this).addClass("has-dropdown");
        }
    });
    
    //UNBIND SYSTEM HOVER EVENT AND ADD CUSTOM HOVER EVENT
    $(".sw-channel-item").unbind('hover');
    $(".sw-channel-item").hover(function(){
        var subList = $(this).children('ul');
        if ($.trim(subList.html()) !== "") {
            subList.slideDown(300, "swing");
        }
        $(this).addClass("hover");
    }, function(){
        $(".sw-channel-dropdown").slideUp(300, "swing");
        $(this).removeClass("hover");
    });
    
    // ********** BODY ********** //
    //DOC replace more-link text
	$("a.more-link span").text("More »");
}

function myWayPremiumSpecific() {
    //DOC rename first breadcrumb
    $("li.ui-breadcrumb-first > a > span").text("Home");
    
    //DOC auto-focus username signin field
    $("#swsignin-txt-username").focus();

    //DOC center signed out message and signin button
    if($("div.ui-spn > div > p > span").text() == "You have been signed out."){
        $("div.ui-spn > div").css({"text-align" : "center", "padding" : "50px 0px 50px 0px"});
        //DOC add signed out breadcrumb
        $(".ui-breadcrumbs").append("<li class='ui-breadcrumb-last'><a href='javascript:void(0)'>Signed Out</a></li>");
    }

    //DOC add sign in breadcrumb
    if($("#swlogin").length){
        $(".ui-breadcrumbs").append("<li class='ui-breadcrumb-last'><a href='javascript:void(0)'>Sign In</a></li>");
    }

    //REGISTER BREADCRUMB
    if($("#swageprompt-txt-birthmonth").length && $("#swageprompt-txt-birthday").length && $("#swageprompt-txt-birthyear").length) {
        $("#sw-content-layout-wrapper .ui-widget.app").addClass("register");
        $(".ui-breadcrumbs").append("<li class='ui-breadcrumb-last'><a href='javascript:void(0)'>Register</a></li>");
    }

    //SEARCH RESULTS BREADCRUMB
    if($("#sw-content-layout-wrapper.ui-spn #swsearch-pnl-main").length) {
        $("#sw-content-layout-wrapper").children().wrapAll('<div class="ui-widget app search-results"><div class="ui-widget-detail"></div></div>');
        $(".ui-breadcrumbs").append("<li class='ui-breadcrumb-last'><a href='javascript:void(0)'>Search Results</a></li>");
    }
    
    //APPLY RESPONSIVE DIMENSIONS TO CONTENT IMAGES
    $("div.ui-widget.app .ui-widget-detail img")
        .not($("div.ui-widget.app.cs-rs-multimedia-rotator .ui-widget-detail img"))
        .not($("div.ui-widget.app.gallery.json .ui-widget-detail img"))
        .not($("div.ui-widget.app.headlines .ui-widget-detail img"))
        .each(function() {
          if ($(this).attr('width') !== undefined && $(this).attr('height') !== undefined || $(this).parent('p').attr('style') == 'text-align: center;' ) { // IMAGE HAS INLINE DIMENSIONS
            $(this).css({"width": $(this).attr("width") + "px", "max-width": "100%", "height": "auto", "max-height": $(this).attr("height") + "px"});
          }
    });
    
    //UPCOMING EVENTS
    if($("div.ui-widget.app.upcomingevents .ui-article-description").text() == "There are no upcoming events to display.") {
        $("div.ui-widget.app.upcomingevents .ui-article-description").css("padding","0px");
    }
}

function myWaySpecific() {
    
}

function expressSpecific() {
    
}

function standardSpecific() {
    
}

function searchText() {
    //DOC custom mystart search placeholder
    //SEARCH TEXT
    $("div#sw-mystart-search input#sw-search-input").removeAttr("placeholder");
    $("div#sw-mystart-search input#sw-search-input").attr("value", "Search...");
    $("div#sw-mystart-search input#sw-search-input").focus(function() {
        if($(this).val() == "Search...") {
            $(this).val("");
        }
    });
    $("div#sw-mystart-search input#sw-search-input").blur(function() {
        if($(this).val() == "") {
            $(this).val("Search...");
        }
    });
}

function calendarListView() {
    //DOC auto click function for schoolwires calendar list view for small mobile devices
    if(!$("a.ui-btn-toggle.list").hasClass("active")){
        $("a.ui-btn-toggle.list").click();
    }
}
//</script>

//<script type="text/javascript">
    // CHECK FOR IE AND SET IE VARIABLES
	var isMSIE = 0, isMSIE7 = 0, isMSIE8 = 0, isMSIE9 = 0, isMSIE10 = 0;
	if(navigator.userAgent.indexOf("MSIE") > -1){ isMSIE = 1; }
	if(navigator.userAgent.indexOf("MSIE 7") > -1){	isMSIE7 = 1; }
	if(navigator.userAgent.indexOf("MSIE 8") > -1){	isMSIE8 = 1; }
	if(navigator.userAgent.indexOf("MSIE 9") > -1){	isMSIE9 = 1; }
	if(navigator.userAgent.indexOf("MSIE 10") > -1){ isMSIE10 = 1; }

	//GET BROWSER AND VERSION
	function getBrowser(){
		var N = navigator.appName, ua=navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
		return [M[0], M[1]];
	}
	
	var browser = getBrowser();
	var browserName = browser[0].toLowerCase();
	var browserVersion = Math.floor(parseInt(browser[1]));
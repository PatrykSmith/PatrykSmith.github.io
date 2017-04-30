// jQuery widget for section layers

$.widget("sw.sectionlayer", {

    options: {
        size: 'medium',
        position: 'right',
        elements: []
    },

    _settings: {
        current: null,
        isOpen: false,
        width: null,
        closeBtn: null,
        closeBtnAfter: null,
        layer: 1,
        panel2: null,
        overlay: null,
        layer1Close: null,
        layer2Close: null
    },

    _create: function () {
        var panel = this;

        // get size
        switch (panel.options.size) {
            case "large":
                panel._settings.width = 760;
                break;
            case "xlarge":
                panel._settings.width = 1800;
                break;
            case "small":
                panel._settings.width = 320;
                break;
            default:
                panel._settings.width = 640;
                break;
        }

        var pos = panel.options.position;
        var width = panel._settings.width;
        var size = panel.options.size;
        var classesToAdd = [
            'section-layer ',
            pos,
            size
        ];

        var cssToAdd = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 'auto',
            left: 'auto',
            overflow: 'hidden',
            border: 0,
            height: '100%',
            zIndex: 9999,
            backgroundColor: 'transparent',
            width: '90%',
            maxWidth: width + 'px'
        };

        cssToAdd[pos] = -(width) + 'px';

        var cssToAddInner = {
            display: 'block',
            position: 'absolute',
            height: '100%',
            backgroundColor: '#ffffff',
            overflow: 'auto',
            left: '31px',
            right: 0,
            top: 0,
            bottom: 0
        };

        panel.element.css(cssToAdd).addClass(classesToAdd.join(' ').toString()).appendTo('body');

        panel.element.append("<div class='section-layer-container'></div>");
        panel.element.find('div.section-layer-container').first().css(cssToAddInner);

        // block interaction
        //BlockUserInteraction(panel.element.attr('id') + " div.section-layer-container", "<div class='ui-loading large'></div>", 2, 0, 1);

        // add second layer

        classesToAdd.push('layer2');
        cssToAdd.width = '85%';
        cssToAdd.maxWidth = (width - 50) + 'px';

        panel.element.after("<div id='" + panel.element.attr('id') + "2'></div>");
        panel._settings.panel2 = panel.element.next("div");
        var secondPanel = panel._settings.panel2;
        secondPanel.css(cssToAdd).addClass(classesToAdd.join(' ').toString());

        secondPanel.append("<div class='section-layer-container'></div>");
        secondPanel.find('div.section-layer-container').first().css(cssToAddInner);

        // block interaction
        //BlockUserInteraction(panel.element.attr('id') + "2" + " div.section-layer-container", "<div class='ui-loading large'></div>", 2, 0, 1);

        var cssCloseButton = {
            width: '32px',
            height: '40px',
            position: 'absolute',
            margin: 0,
            zIndex: '99999',
            left: '15px',
            right: 'auto',
            top: '15px',
            cursor: 'pointer',
            backgroundColor: '#c575d5',
            fontFamily: 'OpenSans-Light',
            lineHeight: '1.4',
            boxSizing: 'border-box',
            padding: '0px 0 0 8px', //0 0 0 7
            fontSize: '28px', //30
            color: 'white',
            '-webkit-transition': '-webkit-transform 300ms, background-color 250ms, color 250ms',
            transition: 'transform 300ms, background-color 250ms, color 250ms'
        };

        var cssCloseButtonAfter = {
            width: '0',
            height: '0',
            zIndex: '99999',
            position: 'absolute',
            content: "",
            top: '55px',
            left: '15px',
            right: 'auto',
            border: '8px solid transparent',
            borderTopColor: '#8c4f98',
            borderRightColor: '#8c4f98'
        };

        if (panel.options.position == 'left') {
            cssCloseButton.right = '15px';
            cssCloseButton.left = 'auto';
            cssCloseButtonAfter.right = '15px';
            cssCloseButtonAfter.left = 'auto';
            cssCloseButtonAfter.borderLeftColor = '#8c4f98';
            cssCloseButtonAfter.borderRightColor = 'transparent';
        }

        panel._settings.closeBtn = $("<div class='section-layer-close' title=\"I'm done. Close this.\" tabindex='0'>&times;</div>");
        panel._settings.closeBtnAfter = $("<div class='section-layer-close-after'></div>");

        panel._settings.closeBtn.css(cssCloseButton);
        panel._settings.closeBtnAfter.css(cssCloseButtonAfter);

        panel._settings.closeBtn.click(function () {
            var button = $(this);
            button.css('transform', 'translateY(2px)');

            setTimeout( function () {
                button.css('transform', 'translateY(0px)');
                panel.close();
            }, 150);

        });

        panel._settings.closeBtn.hover(function () {
            $(this).css('background-color', '#bb5cca');
        }, function () {
            $(this).css('background-color', '#c575d5');
        });

        panel._settings.closeBtn.on("keydown", function (e) {
            switch (e.keyCode) {
                case 13://enter
                case 27://esc
                    e.preventDefault();
                    $(this).click();
                    break;
                case 9://tab
                    e.preventDefault();
                    if (e.shiftKey) {
                        //last item with tab but not itself - close button
                        $(this).parent().find("[tabindex]:not([tabindex='-1'])").not(this).last().focus();
                    } else {
                        //first item with tabindex
                        $(this).parent().find("[tabindex]:not([tabindex='-1']):first").focus();
                    }
                    break;
            }
        });

        panel.element.append(panel._settings.closeBtn);
        panel.element.append(panel._settings.closeBtnAfter);

        var cssOverlay = {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: '9999',
            backgroundColor: '#000000',
            opacity: .5
        };

        panel._settings.overlay = $("<div></div>");

        panel._settings.overlay.css(cssOverlay);

        var elementArray = this.options.elements;
        for (var i = 0; i < elementArray.length; i++) {

            var item = elementArray[i];


            $('#' + item.elementId).data({
                loadUrl: item.url
            });

            $('#' + item.elementId).click(function () {

                var thisId = $(this).attr('id');
                var thisData = $(this).data();
                panel._settings.layer1Close = $(this);

                // is this the previous loaded?
                if (panel._settings.current == thisId) {
                    // last loaded. reload and open if closed
                    panel.load(thisData);

                } else {
                    // not last loaded. is panel open?
                    if (panel._settings.isOpen) {
                        // panel opened. block and reload.
                        panel.load(thisData);
                    } else {
                        // panel closed. clear, load, and open
                        panel.load(thisData);
                    }
                }

                // remove selected from current
                if (panel._settings.current) {
                    $('#' + panel._settings.current).removeClass('selected');
                }

                // set current
                panel._settings.current = thisId;
                $(this).addClass('selected');
            });
        }
    },

    _setOption: function (key, value) {
        this.options[key] = value;
        this._update();
    },

    _update: function () {

    },

    load: function (thisData, layer) {
        var panel = this;

        // load content
        if (!layer) {
            // block interaction
            BlockUserInteraction(panel.element.attr('id') + " div.section-layer-container", "<div class='ui-loading large'></div>", 2, 0, 1);

            $.get(thisData.loadUrl, function (data) {
                panel.element.find('div').first().html(data);
            });
        } else {
            // block interaction
            BlockUserInteraction(panel.element.attr('id') + "2" + " div.section-layer-container", "<div class='ui-loading large'></div>", 2, 0, 1);

            if ((thisData.requestType).toLowerCase() == 'post') {
                $.post(thisData.loadUrl, thisData.ajaxData, function (data) {
                    layer.find('div').first().html(data);
                });
            } else {
                $.get(thisData.loadUrl, thisData.ajaxData, function (data) {
                    layer.find('div').first().html(data);
                });
            }
        }

        this.open(layer);
    },

    open: function (layer) {

        var pos = this.options.position;
        var cssToAdd = {};
        var cssToAddInner = {};
        cssToAdd[pos] = '0px';
        cssToAdd.transition = '.5s ease all';

        if (pos == 'left') {
            cssToAddInner.right = '31px';
            cssToAddInner.left = 0;
        }

        if (!layer) {
            this.element.before(this._settings.overlay);
            this.element.css(cssToAdd).addClass('opened').find('div').first().css(cssToAddInner);
            this.close(true);
            $('html').css('overflow', 'hidden');
            //$('body').css('overflow', 'hidden');
        } else {
            this._settings.overlay.remove();
            layer.before(this._settings.overlay);
            layer.css(cssToAdd).addClass('opened').find('div').first().css(cssToAddInner);
            this._settings.closeBtn.appendTo(layer);
            this._settings.closeBtnAfter.appendTo(layer);
            this._settings.layer++;
        }

        this._settings.closeBtn.focus();

        this._settings.isOpen = true;
    },

    openLayer: function (data) {
        if (this._settings.layer === 1 && this._settings.isOpen) {
            // open second layer
            this._settings.panel2.css('display', 'block');
            this._settings.layer2Close = data.opener;
            this.load({
                loadUrl: data.url,
                ajaxData: data.ajaxData || {},
                requestType: data.requestType || 'get'
            }, this._settings.panel2);
        }
    },

    close: function (forceLayerClose, closeAll, callBack) {
        var panel = this;
        var pos = panel.options.position;
        var width = panel._settings.width;

        var cssToAdd = {};
        cssToAdd[pos] = -(width) + 'px';

        function closeLayerOne() {
            panel.element.css(cssToAdd).removeClass('opened');
            panel._settings.isOpen = false;

            if (panel.options.onClose) {
                panel.options.onClose.call();
            }

            panel._settings.overlay.remove();

            $('#' + panel._settings.current).removeClass('selected');
            panel.element.find('div').first().html('');

            //$('body').css('overflow', 'initial');
            $('html').css('overflow', 'auto');

            if (panel._settings.layer1Close != null) {
                panel._settings.layer1Close.focus();
                panel._settings.layer1Close = null;
            }
        }

        function closeLayerTwo() {
            panel._settings.panel2.css(cssToAdd).removeClass('opened');
            setTimeout(function () { panel._settings.panel2.css('display', 'none'); }, 500);

            panel._settings.overlay.remove();
            panel.element.before(panel._settings.overlay);

            panel._settings.closeBtn.appendTo(panel.element);
            panel._settings.closeBtnAfter.appendTo(panel.element);
            panel._settings.layer = 1;
            panel._settings.panel2.find('div').first().html('');

            if (panel._settings.layer2Close != null) {
                panel._settings.layer2Close.focus();
                panel._settings.layer2Close = null;
            }
        }

        if (panel._settings.layer === 1 && !forceLayerClose & !closeAll) {
            closeLayerOne();
        } else if(!closeAll){
            closeLayerTwo();
        } else {
            closeLayerTwo();
            closeLayerOne();
        }

        if (typeof callBack == "function") {
            callBack();
        }
    },

    _destroy: function () {

    }

});

// END jQuery widget for section layers
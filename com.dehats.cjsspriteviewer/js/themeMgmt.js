/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global window, document, CSInterface*/

var themeManager = (function () {
    'use strict';
     
    /**
     * Convert the Color object to string in hexadecimal format;
     */
    function toHex(color, delta) {
        function computeValue(value, delta) {
            var computedValue = !isNaN(delta) ? value + delta : value;
            if (computedValue < 0) {
                computedValue = 0;
            } else if (computedValue > 255) {
                computedValue = 255;
            }
    
            computedValue = computedValue.toString(16);
            return computedValue.length === 1 ? "0" + computedValue : computedValue;
        }
    
        var hex = "";
        if (color) {
            hex = computeValue(color.red, delta) + computeValue(color.green, delta) + computeValue(color.blue, delta);
        }
        return hex;
    }


    function reverseColor(color, delta) {
        return toHex({
            red: Math.abs(255 - color.red),
            green: Math.abs(255 - color.green),
            blue: Math.abs(255 - color.blue)
        },
            delta);
    }
            
    
    /**
     * Update the theme with the AppSkinInfo gotten from the host product.
     */
    function updateThemeWithAppSkinInfo(appSkinInfo) {
        //Update the background color of the panel
        var panelBgColor = appSkinInfo.panelBackgroundColor.color;
        document.body.bgColor = toHex(panelBgColor);
    
        //Update the default text style
        var textStyle = document.styleSheets[0].rules[0].style;
        if (appSkinInfo.baseFontFamily && (appSkinInfo.baseFontFamily !== appSkinInfo.baseFontFamily)) {
            document.body.style.fontFamily = appSkinInfo.baseFontFamily;
        }
        if (appSkinInfo.baseFontSize && textStyle.fontSize !== appSkinInfo.baseFontSize) {
            textStyle.fontSize = appSkinInfo.baseFontSize + "px";
        }
        textStyle.color = "#" + reverseColor(panelBgColor);
    
        //Update the background color value defined in .controlBg
        var controlBgStyle = document.styleSheets[0].rules[1].style;
        controlBgStyle.backgroundColor = "#" + toHex(panelBgColor, 20);
    
        //Update the background color value defined in .controlBg
        var buttonStyle = document.styleSheets[0].rules[2].style;
        buttonStyle.borderColor = "#" + toHex(panelBgColor, -50);
    }
    
    
    function onAppThemeColorChanged(event) {
        // Should get a latest HostEnvironment object from application.
        var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
        // Gets the style information such as color info from the skinInfo, 
        // and redraw all UI controls of your extension according to the style info.
        updateThemeWithAppSkinInfo(skinInfo);
    }
    
    

    function init() {
        var csInterface = new CSInterface();
    
        updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
        // Update the color of the panel when the theme color of the product changed.
        csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
    }
    
    return {
        init: init
    };
    
}());

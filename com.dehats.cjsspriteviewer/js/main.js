/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

        
    var csInterface = new CSInterface();
    

    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }
    
    function reloadPanel() {
        location.reload();
    }
    
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('$.cjs_ext.evalFile("' + scriptPath + '")');
    }
    
    function loadJSXFiles() {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        csInterface.evalScript('$.cjs_ext.evalFiles("' + extensionRoot + '")');
    }
    
    
    
    
    function publish() {
        csInterface.evalScript('$.cjs_ext.exportCreateJS()');
    }
    
    function updatePreview() {
        var folderPath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/sprites/";
        csInterface.evalScript('$.cjs_ext.exportCreateJS("' + folderPath + '")', reloadPanel);
    }
    

    
    function init() {
        
        loadJSXFile("/jsx/exportToEaselJSPanel.jsxbin");
                    
        themeManager.init();
        
        $("#btn_update").click(function () {
            updatePreview();
        });
        
        $("#btn_publish").click(function () {
            publish();
        });
                
        $("#btn_refresh").click(reloadPanel);
        $("#btn_debug").click(showDevTools);
        
    }
        
    init();

}());
    

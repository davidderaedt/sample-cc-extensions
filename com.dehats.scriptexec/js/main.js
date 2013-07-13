/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    
    
    var MSG = "";
    MSG += "/*\nUse [Ctrl]+[Enter] to execute code\n";   
    MSG += "log(\"my message\"); to output to console\n";     
    MSG += "_props(obj); to list an object's properties\n";
    MSG += "_inspect(obj) to inspect an object's properties\n*/\n\n";
    MSG += "//var doc = app.activeDocument;\n";

    var csInterface = new CSInterface();
    
    // Opens the chrome developer tools in host app
    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }
    
    // Reloads extension panel
    function reloadPanel() {
        location.reload();
    }
    
    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('$.hs.evalFile("' + scriptPath + '")');
    }
    
    // Loads / executes all jsx files in the given folder
    function loadJSXFiles(pFolderPath) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + pFolderPath;
        csInterface.evalScript('$.hs.evalFiles("' + extensionRoot + '")');
    }
    
    function execCode() {
        
        var code = $("#codeTA").val();
            
        var codeStart = "(function(){\n$._log=''\n";
        var codeEnd = "\nreturn $._log;})();";

        var fullCode = codeStart + code + codeEnd;
        console.log(fullCode);
        
        csInterface.evalScript(fullCode, function (result) {
            console.log("result:" + result);
            $("#resultTA").html(result.toString());
        });
        
    }
    
    
    function init() {
                
        themeManager.init();
        
        $("#btn_debug").click(showDevTools);
        $("#codeTA").keydown(function (evt) {
            if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
                evt.preventDefault();
                execCode();
            }
        });
        $("#btn_reload").click(reloadPanel);
        $("#btn_exec").click(execCode);
        
        
        $("#codeTA").html(MSG);
    }
        
    init();

}());
    

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder, ExportType*/

// Full debug mode
$.level = 2;


$._ext = (function () {
    'use strict';
    
    var ext = {};
    
    ext.exportLayers = function (pVal) {
        
        var eType;
        if (pVal === 0) {
            eType = ExportType.SVG;
        } else {
            eType = ExportType.PNG24;
        }
        try {
            $.exportLayers(eType);
        } catch (e) {
            alert("Exception:" + e);
        }        
        return eType;
    };
    
    //Evaluate a file and catch the exception.
    ext.evalFile = function (path) {
        try {
            $.evalFile(path);
        } catch (e) {
            alert("Exception:" + e);
        }
    };
    
    // Evaluate all the files in the given folder 
    ext.evalFiles = function (jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            var i;
            for (i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
        }
    };
    
    return ext;
    
}());

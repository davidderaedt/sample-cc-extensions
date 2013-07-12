/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// Full debug mode
$.level = 2;

// Those are at the global level
// to make them easily accessible from the
// scripting interface

function _inspect(obj) {
    var str = "";
    var z;
    for (z in obj) {
        if (obj.hasOwnProperty(z)) {
            try {
                if(obj[z]) str += "." + z + " (" + typeof(obj[z]) + "):" + obj[z] + "\n";
            }
            catch(e){
                str += "." + z + ":" + e.toString() + "\n";
            }
        }
    }
    return str;
}

function _props(obj) {
    var str = "";
    var z;
    for (z in obj) {
        str += "." + z + "\n";
    }
    return str;
}

function log(msg) {
    return msg+"\n";
}


$.hs = (function () {
    'use strict';
    
    var ext = {};
        
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

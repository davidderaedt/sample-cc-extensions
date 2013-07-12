// full debug mode
$.level = 2;


$.cjs_ext = {
    
    //Evaluate a file and catch the exception.
    evalFile : function (path) {
        try {
            $.evalFile(path);
        } catch (e) {
            alert("Exception:" + e);
        }
    },
    
    // Evaluate all the files in the given folder 
    evalFiles: function (jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            for (var i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
        }
    },
    
    exportCreateJS: function (path) {
        try {
            $.cjs_xport.doExport(path);
        } catch (e) {
            alert("Exception:" + e);
        }         
    }
};
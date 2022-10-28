// 2022-10-17 API call_batch zum aufrufen einer Batch Datei
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
var { FileUtils }       = ChromeUtils.import("resource://gre/modules/FileUtils.jsm");
var { XPCOMUtils }      = ChromeUtils.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyGlobalGetters(this, ["IOUtils"]);

async function execute(executable, arrParams) {
  var fileExists = await IOUtils.exists(executable);
  if (!fileExists) {
    Services.wm.getMostRecentWindow("mail:3pane").alert("Executable [" + executable + "] not found!");
    return false;
  }
  var progPath = new FileUtils.File(executable);

  let process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
  process.init(progPath);
  process.startHidden = false;
  process.noShell = true;
  process.run(true, arrParams, arrParams.length);
  return true;
}

var xmasapi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      xmasapi: {
        async call_batch(batchname, args) {
//				Services.wm.getMostRecentWindow("mail:3pane").concole.log("call_batch " + batchname + " " + args);
				execute(batchname, args);
//				Services.wm.getMostRecentWindow("mail:3pane").alert("call_batch");
        }
      }
    }
  }
};

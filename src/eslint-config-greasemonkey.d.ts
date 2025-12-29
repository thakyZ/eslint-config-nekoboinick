declare module "eslint-config-greasemonkey" {
  declare const greasemonkeyConfig: {
    globals: {
      GM: "readonly";
      GM_addElement: "readonly";
      GM_addStyle: "readonly";
      GM_addValueChangeListener: "readonly";
      GM_deleteValue: "readonly";
      GM_download: "readonly";
      GM_getResourceText: "readonly";
      GM_getResourceURL: "readonly";
      GM_getTab: "readonly";
      GM_getTabs: "readonly";
      GM_getValue: "readonly";
      GM_info: "readonly";
      GM_listValues: "readonly";
      GM_log: "readonly";
      GM_notification: "readonly";
      GM_openInTab: "readonly";
      GM_registerMenuCommand: "readonly";
      GM_removeValueChangeListener: "readonly";
      GM_saveTab: "readonly";
      GM_setClipboard: "readonly";
      GM_setValue: "readonly";
      GM_unregisterMenuCommand: "readonly";
      GM_xmlhttpRequest: "readonly";
      unsafeWindow: "readonly";
    };
  };

  export = greasemonkeyConfig;
}

declare module "eslint-config-greasemonkey/writable" {
  declare const greasemonkeyConfig: {
    globals: {
      GM: "writable";
      GM_addElement: "writable";
      GM_addStyle: "writable";
      GM_addValueChangeListener: "writable";
      GM_deleteValue: "writable";
      GM_download: "writable";
      GM_getResourceText: "writable";
      GM_getResourceURL: "writable";
      GM_getTab: "writable";
      GM_getTabs: "writable";
      GM_getValue: "writable";
      GM_info: "writable";
      GM_listValues: "writable";
      GM_log: "writable";
      GM_notification: "writable";
      GM_openInTab: "writable";
      GM_registerMenuCommand: "writable";
      GM_removeValueChangeListener: "writable";
      GM_saveTab: "writable";
      GM_setClipboard: "writable";
      GM_setValue: "writable";
      GM_unregisterMenuCommand: "writable";
      GM_xmlhttpRequest: "writable";
      unsafeWindow: "writable";
    };
  };

  export = greasemonkeyConfig;
}

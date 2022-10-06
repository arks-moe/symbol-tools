function ll(t) {
  var r = this.constructor;
  return this.then(
    function(e) {
      return r.resolve(t()).then(function() {
        return e;
      });
    },
    function(e) {
      return r.resolve(t()).then(function() {
        return r.reject(e);
      });
    }
  );
}
function fl(t) {
  var r = this;
  return new r(function(e, i) {
    if (!(t && typeof t.length < "u"))
      return i(
        new TypeError(
          typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    var n = Array.prototype.slice.call(t);
    if (n.length === 0)
      return e([]);
    var a = n.length;
    function s(h, u) {
      if (u && (typeof u == "object" || typeof u == "function")) {
        var l = u.then;
        if (typeof l == "function") {
          l.call(
            u,
            function(f) {
              s(h, f);
            },
            function(f) {
              n[h] = { status: "rejected", reason: f }, --a === 0 && e(n);
            }
          );
          return;
        }
      }
      n[h] = { status: "fulfilled", value: u }, --a === 0 && e(n);
    }
    for (var o = 0; o < n.length; o++)
      s(o, n[o]);
  });
}
var cl = setTimeout;
function gu(t) {
  return Boolean(t && typeof t.length < "u");
}
function dl() {
}
function pl(t, r) {
  return function() {
    t.apply(r, arguments);
  };
}
function mt(t) {
  if (!(this instanceof mt))
    throw new TypeError("Promises must be constructed via new");
  if (typeof t != "function")
    throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], Tu(t, this);
}
function bu(t, r) {
  for (; t._state === 3; )
    t = t._value;
  if (t._state === 0) {
    t._deferreds.push(r);
    return;
  }
  t._handled = !0, mt._immediateFn(function() {
    var e = t._state === 1 ? r.onFulfilled : r.onRejected;
    if (e === null) {
      (t._state === 1 ? Pn : Cr)(r.promise, t._value);
      return;
    }
    var i;
    try {
      i = e(t._value);
    } catch (n) {
      Cr(r.promise, n);
      return;
    }
    Pn(r.promise, i);
  });
}
function Pn(t, r) {
  try {
    if (r === t)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (r && (typeof r == "object" || typeof r == "function")) {
      var e = r.then;
      if (r instanceof mt) {
        t._state = 3, t._value = r, Un(t);
        return;
      } else if (typeof e == "function") {
        Tu(pl(e, r), t);
        return;
      }
    }
    t._state = 1, t._value = r, Un(t);
  } catch (i) {
    Cr(t, i);
  }
}
function Cr(t, r) {
  t._state = 2, t._value = r, Un(t);
}
function Un(t) {
  t._state === 2 && t._deferreds.length === 0 && mt._immediateFn(function() {
    t._handled || mt._unhandledRejectionFn(t._value);
  });
  for (var r = 0, e = t._deferreds.length; r < e; r++)
    bu(t, t._deferreds[r]);
  t._deferreds = null;
}
function vl(t, r, e) {
  this.onFulfilled = typeof t == "function" ? t : null, this.onRejected = typeof r == "function" ? r : null, this.promise = e;
}
function Tu(t, r) {
  var e = !1;
  try {
    t(
      function(i) {
        e || (e = !0, Pn(r, i));
      },
      function(i) {
        e || (e = !0, Cr(r, i));
      }
    );
  } catch (i) {
    if (e)
      return;
    e = !0, Cr(r, i);
  }
}
mt.prototype.catch = function(t) {
  return this.then(null, t);
};
mt.prototype.then = function(t, r) {
  var e = new this.constructor(dl);
  return bu(this, new vl(t, r, e)), e;
};
mt.prototype.finally = ll;
mt.all = function(t) {
  return new mt(function(r, e) {
    if (!gu(t))
      return e(new TypeError("Promise.all accepts an array"));
    var i = Array.prototype.slice.call(t);
    if (i.length === 0)
      return r([]);
    var n = i.length;
    function a(o, h) {
      try {
        if (h && (typeof h == "object" || typeof h == "function")) {
          var u = h.then;
          if (typeof u == "function") {
            u.call(
              h,
              function(l) {
                a(o, l);
              },
              e
            );
            return;
          }
        }
        i[o] = h, --n === 0 && r(i);
      } catch (l) {
        e(l);
      }
    }
    for (var s = 0; s < i.length; s++)
      a(s, i[s]);
  });
};
mt.allSettled = fl;
mt.resolve = function(t) {
  return t && typeof t == "object" && t.constructor === mt ? t : new mt(function(r) {
    r(t);
  });
};
mt.reject = function(t) {
  return new mt(function(r, e) {
    e(t);
  });
};
mt.race = function(t) {
  return new mt(function(r, e) {
    if (!gu(t))
      return e(new TypeError("Promise.race accepts an array"));
    for (var i = 0, n = t.length; i < n; i++)
      mt.resolve(t[i]).then(r, e);
  });
};
mt._immediateFn = typeof setImmediate == "function" && function(t) {
  setImmediate(t);
} || function(t) {
  cl(t, 0);
};
mt._unhandledRejectionFn = function(r) {
  typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", r);
};
var $i = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ya = Object.getOwnPropertySymbols, _l = Object.prototype.hasOwnProperty, ml = Object.prototype.propertyIsEnumerable;
function yl(t) {
  if (t == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(t);
}
function xl() {
  try {
    if (!Object.assign)
      return !1;
    var t = new String("abc");
    if (t[5] = "de", Object.getOwnPropertyNames(t)[0] === "5")
      return !1;
    for (var r = {}, e = 0; e < 10; e++)
      r["_" + String.fromCharCode(e)] = e;
    var i = Object.getOwnPropertyNames(r).map(function(a) {
      return r[a];
    });
    if (i.join("") !== "0123456789")
      return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(a) {
      n[a] = a;
    }), Object.keys(Object.assign({}, n)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var gl = xl() ? Object.assign : function(t, r) {
  for (var e, i = yl(t), n, a = 1; a < arguments.length; a++) {
    e = Object(arguments[a]);
    for (var s in e)
      _l.call(e, s) && (i[s] = e[s]);
    if (Ya) {
      n = Ya(e);
      for (var o = 0; o < n.length; o++)
        ml.call(e, n[o]) && (i[n[o]] = e[n[o]]);
    }
  }
  return i;
};
/*!
 * @pixi/polyfill - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/polyfill is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
typeof globalThis > "u" && (typeof self < "u" ? self.globalThis = self : typeof global < "u" && (global.globalThis = global));
globalThis.Promise || (globalThis.Promise = mt);
Object.assign || (Object.assign = gl);
var bl = 16;
Date.now && Date.prototype.getTime || (Date.now = function() {
  return new Date().getTime();
});
if (!(globalThis.performance && globalThis.performance.now)) {
  var Tl = Date.now();
  globalThis.performance || (globalThis.performance = {}), globalThis.performance.now = function() {
    return Date.now() - Tl;
  };
}
var qi = Date.now(), Za = ["ms", "moz", "webkit", "o"];
for (var Yi = 0; Yi < Za.length && !globalThis.requestAnimationFrame; ++Yi) {
  var Zi = Za[Yi];
  globalThis.requestAnimationFrame = globalThis[Zi + "RequestAnimationFrame"], globalThis.cancelAnimationFrame = globalThis[Zi + "CancelAnimationFrame"] || globalThis[Zi + "CancelRequestAnimationFrame"];
}
globalThis.requestAnimationFrame || (globalThis.requestAnimationFrame = function(t) {
  if (typeof t != "function")
    throw new TypeError(t + "is not a function");
  var r = Date.now(), e = bl + qi - r;
  return e < 0 && (e = 0), qi = r, globalThis.self.setTimeout(function() {
    qi = Date.now(), t(performance.now());
  }, e);
});
globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(t) {
  return clearTimeout(t);
});
Math.sign || (Math.sign = function(r) {
  return r = Number(r), r === 0 || isNaN(r) ? r : r > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(r) {
  return typeof r == "number" && isFinite(r) && Math.floor(r) === r;
});
globalThis.ArrayBuffer || (globalThis.ArrayBuffer = Array);
globalThis.Float32Array || (globalThis.Float32Array = Array);
globalThis.Uint32Array || (globalThis.Uint32Array = Array);
globalThis.Uint16Array || (globalThis.Uint16Array = Array);
globalThis.Uint8Array || (globalThis.Uint8Array = Array);
globalThis.Int32Array || (globalThis.Int32Array = Array);
/*!
 * @pixi/settings - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ja;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(Ja || (Ja = {}));
var Ka;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Ka || (Ka = {}));
var Qa;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Qa || (Qa = {}));
var ts;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(ts || (ts = {}));
var es;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(es || (es = {}));
var rs;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(rs || (rs = {}));
var is;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(is || (is = {}));
var ns;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(ns || (ns = {}));
var as;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(as || (as = {}));
var On;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(On || (On = {}));
var Fn;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Fn || (Fn = {}));
var Ln;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(Ln || (Ln = {}));
var ss;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(ss || (ss = {}));
var os;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(os || (os = {}));
var Sn;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(Sn || (Sn = {}));
var br;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(br || (br = {}));
var hs;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(hs || (hs = {}));
var us;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(us || (us = {}));
var Gn;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Gn || (Gn = {}));
var ls;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(ls || (ls = {}));
var Il = {
  createCanvas: function(t, r) {
    var e = document.createElement("canvas");
    return e.width = t, e.height = r, e;
  },
  getWebGLRenderingContext: function() {
    return WebGLRenderingContext;
  },
  getNavigator: function() {
    return navigator;
  },
  getBaseUrl: function() {
    var t;
    return (t = document.baseURI) !== null && t !== void 0 ? t : window.location.href;
  },
  fetch: function(t, r) {
    return fetch(t, r);
  }
}, Ji = /iPhone/i, fs = /iPod/i, cs = /iPad/i, ds = /\biOS-universal(?:.+)Mac\b/i, Ki = /\bAndroid(?:.+)Mobile\b/i, ps = /Android/i, Xe = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, qr = /Silk/i, re = /Windows Phone/i, vs = /\bWindows(?:.+)ARM\b/i, _s = /BlackBerry/i, ms = /BB10/i, ys = /Opera Mini/i, xs = /\b(CriOS|Chrome)(?:.+)Mobile/i, gs = /Mobile(?:.+)Firefox\b/i, bs = function(t) {
  return typeof t < "u" && t.platform === "MacIntel" && typeof t.maxTouchPoints == "number" && t.maxTouchPoints > 1 && typeof MSStream > "u";
};
function El(t) {
  return function(r) {
    return r.test(t);
  };
}
function wl(t) {
  var r = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !t && typeof navigator < "u" ? r = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof t == "string" ? r.userAgent = t : t && t.userAgent && (r = {
    userAgent: t.userAgent,
    platform: t.platform,
    maxTouchPoints: t.maxTouchPoints || 0
  });
  var e = r.userAgent, i = e.split("[FBAN");
  typeof i[1] < "u" && (e = i[0]), i = e.split("Twitter"), typeof i[1] < "u" && (e = i[0]);
  var n = El(e), a = {
    apple: {
      phone: n(Ji) && !n(re),
      ipod: n(fs),
      tablet: !n(Ji) && (n(cs) || bs(r)) && !n(re),
      universal: n(ds),
      device: (n(Ji) || n(fs) || n(cs) || n(ds) || bs(r)) && !n(re)
    },
    amazon: {
      phone: n(Xe),
      tablet: !n(Xe) && n(qr),
      device: n(Xe) || n(qr)
    },
    android: {
      phone: !n(re) && n(Xe) || !n(re) && n(Ki),
      tablet: !n(re) && !n(Xe) && !n(Ki) && (n(qr) || n(ps)),
      device: !n(re) && (n(Xe) || n(qr) || n(Ki) || n(ps)) || n(/\bokhttp\b/i)
    },
    windows: {
      phone: n(re),
      tablet: n(vs),
      device: n(re) || n(vs)
    },
    other: {
      blackberry: n(_s),
      blackberry10: n(ms),
      opera: n(ys),
      firefox: n(gs),
      chrome: n(xs),
      device: n(_s) || n(ms) || n(ys) || n(gs) || n(xs)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return a.any = a.apple.device || a.android.device || a.windows.device || a.other.device, a.phone = a.apple.phone || a.android.phone || a.windows.phone, a.tablet = a.apple.tablet || a.android.tablet || a.windows.tablet, a;
}
var qt = wl(globalThis.navigator);
function Rl() {
  return !qt.apple.device;
}
function Cl(t) {
  var r = !0;
  if (qt.tablet || qt.phone) {
    if (qt.apple.device) {
      var e = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (e) {
        var i = parseInt(e[1], 10);
        i < 11 && (r = !1);
      }
    }
    if (qt.android.device) {
      var e = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (e) {
        var i = parseInt(e[1], 10);
        i < 7 && (r = !1);
      }
    }
  }
  return r ? t : 4;
}
var O = {
  ADAPTER: Il,
  MIPMAP_TEXTURES: Ln.POW2,
  ANISOTROPIC_LEVEL: 0,
  RESOLUTION: 1,
  FILTER_RESOLUTION: 1,
  FILTER_MULTISAMPLE: Gn.NONE,
  SPRITE_MAX_TEXTURES: Cl(32),
  SPRITE_BATCH_SIZE: 4096,
  RENDER_OPTIONS: {
    view: null,
    antialias: !1,
    autoDensity: !1,
    backgroundColor: 0,
    backgroundAlpha: 1,
    useContextAlpha: !0,
    clearBeforeRender: !0,
    preserveDrawingBuffer: !1,
    width: 800,
    height: 600,
    legacy: !1
  },
  GC_MODE: Sn.AUTO,
  GC_MAX_IDLE: 60 * 60,
  GC_MAX_CHECK_COUNT: 60 * 10,
  WRAP_MODE: Fn.CLAMP,
  SCALE_MODE: On.LINEAR,
  PRECISION_VERTEX: br.HIGH,
  PRECISION_FRAGMENT: qt.apple.device ? br.HIGH : br.MEDIUM,
  CAN_UPLOAD_SAME_BUFFER: Rl(),
  CREATE_IMAGE_BITMAP: !1,
  ROUND_PIXELS: !1
}, Iu = { exports: {} };
(function(t) {
  var r = Object.prototype.hasOwnProperty, e = "~";
  function i() {
  }
  Object.create && (i.prototype = /* @__PURE__ */ Object.create(null), new i().__proto__ || (e = !1));
  function n(h, u, l) {
    this.fn = h, this.context = u, this.once = l || !1;
  }
  function a(h, u, l, f, c) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var d = new n(l, f || h, c), p = e ? e + u : u;
    return h._events[p] ? h._events[p].fn ? h._events[p] = [h._events[p], d] : h._events[p].push(d) : (h._events[p] = d, h._eventsCount++), h;
  }
  function s(h, u) {
    --h._eventsCount === 0 ? h._events = new i() : delete h._events[u];
  }
  function o() {
    this._events = new i(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var u = [], l, f;
    if (this._eventsCount === 0)
      return u;
    for (f in l = this._events)
      r.call(l, f) && u.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(l)) : u;
  }, o.prototype.listeners = function(u) {
    var l = e ? e + u : u, f = this._events[l];
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var c = 0, d = f.length, p = new Array(d); c < d; c++)
      p[c] = f[c].fn;
    return p;
  }, o.prototype.listenerCount = function(u) {
    var l = e ? e + u : u, f = this._events[l];
    return f ? f.fn ? 1 : f.length : 0;
  }, o.prototype.emit = function(u, l, f, c, d, p) {
    var v = e ? e + u : u;
    if (!this._events[v])
      return !1;
    var _ = this._events[v], m = arguments.length, y, g;
    if (_.fn) {
      switch (_.once && this.removeListener(u, _.fn, void 0, !0), m) {
        case 1:
          return _.fn.call(_.context), !0;
        case 2:
          return _.fn.call(_.context, l), !0;
        case 3:
          return _.fn.call(_.context, l, f), !0;
        case 4:
          return _.fn.call(_.context, l, f, c), !0;
        case 5:
          return _.fn.call(_.context, l, f, c, d), !0;
        case 6:
          return _.fn.call(_.context, l, f, c, d, p), !0;
      }
      for (g = 1, y = new Array(m - 1); g < m; g++)
        y[g - 1] = arguments[g];
      _.fn.apply(_.context, y);
    } else {
      var T = _.length, b;
      for (g = 0; g < T; g++)
        switch (_[g].once && this.removeListener(u, _[g].fn, void 0, !0), m) {
          case 1:
            _[g].fn.call(_[g].context);
            break;
          case 2:
            _[g].fn.call(_[g].context, l);
            break;
          case 3:
            _[g].fn.call(_[g].context, l, f);
            break;
          case 4:
            _[g].fn.call(_[g].context, l, f, c);
            break;
          default:
            if (!y)
              for (b = 1, y = new Array(m - 1); b < m; b++)
                y[b - 1] = arguments[b];
            _[g].fn.apply(_[g].context, y);
        }
    }
    return !0;
  }, o.prototype.on = function(u, l, f) {
    return a(this, u, l, f, !1);
  }, o.prototype.once = function(u, l, f) {
    return a(this, u, l, f, !0);
  }, o.prototype.removeListener = function(u, l, f, c) {
    var d = e ? e + u : u;
    if (!this._events[d])
      return this;
    if (!l)
      return s(this, d), this;
    var p = this._events[d];
    if (p.fn)
      p.fn === l && (!c || p.once) && (!f || p.context === f) && s(this, d);
    else {
      for (var v = 0, _ = [], m = p.length; v < m; v++)
        (p[v].fn !== l || c && !p[v].once || f && p[v].context !== f) && _.push(p[v]);
      _.length ? this._events[d] = _.length === 1 ? _[0] : _ : s(this, d);
    }
    return this;
  }, o.prototype.removeAllListeners = function(u) {
    var l;
    return u ? (l = e ? e + u : u, this._events[l] && s(this, l)) : (this._events = new i(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = e, o.EventEmitter = o, t.exports = o;
})(Iu);
const Mr = Iu.exports;
var ki = { exports: {} };
ki.exports = Hi;
ki.exports.default = Hi;
function Hi(t, r, e) {
  e = e || 2;
  var i = r && r.length, n = i ? r[0] * e : t.length, a = Eu(t, 0, n, e, !0), s = [];
  if (!a || a.next === a.prev)
    return s;
  var o, h, u, l, f, c, d;
  if (i && (a = Ol(t, r, a, e)), t.length > 80 * e) {
    o = u = t[0], h = l = t[1];
    for (var p = e; p < n; p += e)
      f = t[p], c = t[p + 1], f < o && (o = f), c < h && (h = c), f > u && (u = f), c > l && (l = c);
    d = Math.max(u - o, l - h), d = d !== 0 ? 32767 / d : 0;
  }
  return Nr(a, s, e, o, h, d, 0), s;
}
function Eu(t, r, e, i, n) {
  var a, s;
  if (n === Dn(t, r, e, i) > 0)
    for (a = r; a < e; a += i)
      s = Ts(a, t[a], t[a + 1], s);
  else
    for (a = e - i; a >= r; a -= i)
      s = Ts(a, t[a], t[a + 1], s);
  return s && Xi(s, s.next) && (Pr(s), s = s.next), s;
}
function Oe(t, r) {
  if (!t)
    return t;
  r || (r = t);
  var e = t, i;
  do
    if (i = !1, !e.steiner && (Xi(e, e.next) || pt(e.prev, e, e.next) === 0)) {
      if (Pr(e), e = r = e.prev, e === e.next)
        break;
      i = !0;
    } else
      e = e.next;
  while (i || e !== r);
  return r;
}
function Nr(t, r, e, i, n, a, s) {
  if (!!t) {
    !s && a && Bl(t, i, n, a);
    for (var o = t, h, u; t.prev !== t.next; ) {
      if (h = t.prev, u = t.next, a ? Al(t, i, n, a) : Nl(t)) {
        r.push(h.i / e | 0), r.push(t.i / e | 0), r.push(u.i / e | 0), Pr(t), t = u.next, o = u.next;
        continue;
      }
      if (t = u, t === o) {
        s ? s === 1 ? (t = Pl(Oe(t), r, e), Nr(t, r, e, i, n, a, 2)) : s === 2 && Ul(t, r, e, i, n, a) : Nr(Oe(t), r, e, i, n, a, 1);
        break;
      }
    }
  }
}
function Nl(t) {
  var r = t.prev, e = t, i = t.next;
  if (pt(r, e, i) >= 0)
    return !1;
  for (var n = r.x, a = e.x, s = i.x, o = r.y, h = e.y, u = i.y, l = n < a ? n < s ? n : s : a < s ? a : s, f = o < h ? o < u ? o : u : h < u ? h : u, c = n > a ? n > s ? n : s : a > s ? a : s, d = o > h ? o > u ? o : u : h > u ? h : u, p = i.next; p !== r; ) {
    if (p.x >= l && p.x <= c && p.y >= f && p.y <= d && qe(n, o, a, h, s, u, p.x, p.y) && pt(p.prev, p, p.next) >= 0)
      return !1;
    p = p.next;
  }
  return !0;
}
function Al(t, r, e, i) {
  var n = t.prev, a = t, s = t.next;
  if (pt(n, a, s) >= 0)
    return !1;
  for (var o = n.x, h = a.x, u = s.x, l = n.y, f = a.y, c = s.y, d = o < h ? o < u ? o : u : h < u ? h : u, p = l < f ? l < c ? l : c : f < c ? f : c, v = o > h ? o > u ? o : u : h > u ? h : u, _ = l > f ? l > c ? l : c : f > c ? f : c, m = Bn(d, p, r, e, i), y = Bn(v, _, r, e, i), g = t.prevZ, T = t.nextZ; g && g.z >= m && T && T.z <= y; ) {
    if (g.x >= d && g.x <= v && g.y >= p && g.y <= _ && g !== n && g !== s && qe(o, l, h, f, u, c, g.x, g.y) && pt(g.prev, g, g.next) >= 0 || (g = g.prevZ, T.x >= d && T.x <= v && T.y >= p && T.y <= _ && T !== n && T !== s && qe(o, l, h, f, u, c, T.x, T.y) && pt(T.prev, T, T.next) >= 0))
      return !1;
    T = T.nextZ;
  }
  for (; g && g.z >= m; ) {
    if (g.x >= d && g.x <= v && g.y >= p && g.y <= _ && g !== n && g !== s && qe(o, l, h, f, u, c, g.x, g.y) && pt(g.prev, g, g.next) >= 0)
      return !1;
    g = g.prevZ;
  }
  for (; T && T.z <= y; ) {
    if (T.x >= d && T.x <= v && T.y >= p && T.y <= _ && T !== n && T !== s && qe(o, l, h, f, u, c, T.x, T.y) && pt(T.prev, T, T.next) >= 0)
      return !1;
    T = T.nextZ;
  }
  return !0;
}
function Pl(t, r, e) {
  var i = t;
  do {
    var n = i.prev, a = i.next.next;
    !Xi(n, a) && wu(n, i, i.next, a) && Ar(n, a) && Ar(a, n) && (r.push(n.i / e | 0), r.push(i.i / e | 0), r.push(a.i / e | 0), Pr(i), Pr(i.next), i = t = a), i = i.next;
  } while (i !== t);
  return Oe(i);
}
function Ul(t, r, e, i, n, a) {
  var s = t;
  do {
    for (var o = s.next.next; o !== s.prev; ) {
      if (s.i !== o.i && kl(s, o)) {
        var h = Ru(s, o);
        s = Oe(s, s.next), h = Oe(h, h.next), Nr(s, r, e, i, n, a, 0), Nr(h, r, e, i, n, a, 0);
        return;
      }
      o = o.next;
    }
    s = s.next;
  } while (s !== t);
}
function Ol(t, r, e, i) {
  var n = [], a, s, o, h, u;
  for (a = 0, s = r.length; a < s; a++)
    o = r[a] * i, h = a < s - 1 ? r[a + 1] * i : t.length, u = Eu(t, o, h, i, !1), u === u.next && (u.steiner = !0), n.push(Dl(u));
  for (n.sort(Fl), a = 0; a < n.length; a++)
    e = Ll(n[a], e);
  return e;
}
function Fl(t, r) {
  return t.x - r.x;
}
function Ll(t, r) {
  var e = Sl(t, r);
  if (!e)
    return r;
  var i = Ru(e, t);
  return Oe(i, i.next), Oe(e, e.next);
}
function Sl(t, r) {
  var e = r, i = t.x, n = t.y, a = -1 / 0, s;
  do {
    if (n <= e.y && n >= e.next.y && e.next.y !== e.y) {
      var o = e.x + (n - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (o <= i && o > a && (a = o, s = e.x < e.next.x ? e : e.next, o === i))
        return s;
    }
    e = e.next;
  } while (e !== r);
  if (!s)
    return null;
  var h = s, u = s.x, l = s.y, f = 1 / 0, c;
  e = s;
  do
    i >= e.x && e.x >= u && i !== e.x && qe(n < l ? i : a, n, u, l, n < l ? a : i, n, e.x, e.y) && (c = Math.abs(n - e.y) / (i - e.x), Ar(e, t) && (c < f || c === f && (e.x > s.x || e.x === s.x && Gl(s, e))) && (s = e, f = c)), e = e.next;
  while (e !== h);
  return s;
}
function Gl(t, r) {
  return pt(t.prev, t, r.prev) < 0 && pt(r.next, t, t.next) < 0;
}
function Bl(t, r, e, i) {
  var n = t;
  do
    n.z === 0 && (n.z = Bn(n.x, n.y, r, e, i)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next;
  while (n !== t);
  n.prevZ.nextZ = null, n.prevZ = null, Ml(n);
}
function Ml(t) {
  var r, e, i, n, a, s, o, h, u = 1;
  do {
    for (e = t, t = null, a = null, s = 0; e; ) {
      for (s++, i = e, o = 0, r = 0; r < u && (o++, i = i.nextZ, !!i); r++)
        ;
      for (h = u; o > 0 || h > 0 && i; )
        o !== 0 && (h === 0 || !i || e.z <= i.z) ? (n = e, e = e.nextZ, o--) : (n = i, i = i.nextZ, h--), a ? a.nextZ = n : t = n, n.prevZ = a, a = n;
      e = i;
    }
    a.nextZ = null, u *= 2;
  } while (s > 1);
  return t;
}
function Bn(t, r, e, i, n) {
  return t = (t - e) * n | 0, r = (r - i) * n | 0, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, t | r << 1;
}
function Dl(t) {
  var r = t, e = t;
  do
    (r.x < e.x || r.x === e.x && r.y < e.y) && (e = r), r = r.next;
  while (r !== t);
  return e;
}
function qe(t, r, e, i, n, a, s, o) {
  return (n - s) * (r - o) >= (t - s) * (a - o) && (t - s) * (i - o) >= (e - s) * (r - o) && (e - s) * (a - o) >= (n - s) * (i - o);
}
function kl(t, r) {
  return t.next.i !== r.i && t.prev.i !== r.i && !Hl(t, r) && (Ar(t, r) && Ar(r, t) && Xl(t, r) && (pt(t.prev, t, r.prev) || pt(t, r.prev, r)) || Xi(t, r) && pt(t.prev, t, t.next) > 0 && pt(r.prev, r, r.next) > 0);
}
function pt(t, r, e) {
  return (r.y - t.y) * (e.x - r.x) - (r.x - t.x) * (e.y - r.y);
}
function Xi(t, r) {
  return t.x === r.x && t.y === r.y;
}
function wu(t, r, e, i) {
  var n = Zr(pt(t, r, e)), a = Zr(pt(t, r, i)), s = Zr(pt(e, i, t)), o = Zr(pt(e, i, r));
  return !!(n !== a && s !== o || n === 0 && Yr(t, e, r) || a === 0 && Yr(t, i, r) || s === 0 && Yr(e, t, i) || o === 0 && Yr(e, r, i));
}
function Yr(t, r, e) {
  return r.x <= Math.max(t.x, e.x) && r.x >= Math.min(t.x, e.x) && r.y <= Math.max(t.y, e.y) && r.y >= Math.min(t.y, e.y);
}
function Zr(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}
function Hl(t, r) {
  var e = t;
  do {
    if (e.i !== t.i && e.next.i !== t.i && e.i !== r.i && e.next.i !== r.i && wu(e, e.next, t, r))
      return !0;
    e = e.next;
  } while (e !== t);
  return !1;
}
function Ar(t, r) {
  return pt(t.prev, t, t.next) < 0 ? pt(t, r, t.next) >= 0 && pt(t, t.prev, r) >= 0 : pt(t, r, t.prev) < 0 || pt(t, t.next, r) < 0;
}
function Xl(t, r) {
  var e = t, i = !1, n = (t.x + r.x) / 2, a = (t.y + r.y) / 2;
  do
    e.y > a != e.next.y > a && e.next.y !== e.y && n < (e.next.x - e.x) * (a - e.y) / (e.next.y - e.y) + e.x && (i = !i), e = e.next;
  while (e !== t);
  return i;
}
function Ru(t, r) {
  var e = new Mn(t.i, t.x, t.y), i = new Mn(r.i, r.x, r.y), n = t.next, a = r.prev;
  return t.next = r, r.prev = t, e.next = n, n.prev = e, i.next = e, e.prev = i, a.next = i, i.prev = a, i;
}
function Ts(t, r, e, i) {
  var n = new Mn(t, r, e);
  return i ? (n.next = i.next, n.prev = i, i.next.prev = n, i.next = n) : (n.prev = n, n.next = n), n;
}
function Pr(t) {
  t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
}
function Mn(t, r, e) {
  this.i = t, this.x = r, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
Hi.deviation = function(t, r, e, i) {
  var n = r && r.length, a = n ? r[0] * e : t.length, s = Math.abs(Dn(t, 0, a, e));
  if (n)
    for (var o = 0, h = r.length; o < h; o++) {
      var u = r[o] * e, l = o < h - 1 ? r[o + 1] * e : t.length;
      s -= Math.abs(Dn(t, u, l, e));
    }
  var f = 0;
  for (o = 0; o < i.length; o += 3) {
    var c = i[o] * e, d = i[o + 1] * e, p = i[o + 2] * e;
    f += Math.abs(
      (t[c] - t[p]) * (t[d + 1] - t[c + 1]) - (t[c] - t[d]) * (t[p + 1] - t[c + 1])
    );
  }
  return s === 0 && f === 0 ? 0 : Math.abs((f - s) / s);
};
function Dn(t, r, e, i) {
  for (var n = 0, a = r, s = e - i; a < e; a += i)
    n += (t[s] - t[a]) * (t[a + 1] + t[s + 1]), s = a;
  return n;
}
Hi.flatten = function(t) {
  for (var r = t[0][0].length, e = { vertices: [], holes: [], dimensions: r }, i = 0, n = 0; n < t.length; n++) {
    for (var a = 0; a < t[n].length; a++)
      for (var s = 0; s < r; s++)
        e.vertices.push(t[n][a][s]);
    n > 0 && (i += t[n - 1].length, e.holes.push(i));
  }
  return e;
};
var kn = { exports: {} };
/*! https://mths.be/punycode v1.3.2 by @mathias */
(function(t, r) {
  (function(e) {
    var i = r && !r.nodeType && r, n = t && !t.nodeType && t, a = typeof $i == "object" && $i;
    (a.global === a || a.window === a || a.self === a) && (e = a);
    var s, o = 2147483647, h = 36, u = 1, l = 26, f = 38, c = 700, d = 72, p = 128, v = "-", _ = /^xn--/, m = /[^\x20-\x7E]/, y = /[\x2E\u3002\uFF0E\uFF61]/g, g = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, T = h - u, b = Math.floor, x = String.fromCharCode, E;
    function C(I) {
      throw RangeError(g[I]);
    }
    function w(I, N) {
      for (var U = I.length, B = []; U--; )
        B[U] = N(I[U]);
      return B;
    }
    function R(I, N) {
      var U = I.split("@"), B = "";
      U.length > 1 && (B = U[0] + "@", I = U[1]), I = I.replace(y, ".");
      var H = I.split("."), Y = w(H, N).join(".");
      return B + Y;
    }
    function F(I) {
      for (var N = [], U = 0, B = I.length, H, Y; U < B; )
        H = I.charCodeAt(U++), H >= 55296 && H <= 56319 && U < B ? (Y = I.charCodeAt(U++), (Y & 64512) == 56320 ? N.push(((H & 1023) << 10) + (Y & 1023) + 65536) : (N.push(H), U--)) : N.push(H);
      return N;
    }
    function M(I) {
      return w(I, function(N) {
        var U = "";
        return N > 65535 && (N -= 65536, U += x(N >>> 10 & 1023 | 55296), N = 56320 | N & 1023), U += x(N), U;
      }).join("");
    }
    function k(I) {
      return I - 48 < 10 ? I - 22 : I - 65 < 26 ? I - 65 : I - 97 < 26 ? I - 97 : h;
    }
    function Q(I, N) {
      return I + 22 + 75 * (I < 26) - ((N != 0) << 5);
    }
    function A(I, N, U) {
      var B = 0;
      for (I = U ? b(I / c) : I >> 1, I += b(I / N); I > T * l >> 1; B += h)
        I = b(I / T);
      return b(B + (T + 1) * I / (I + f));
    }
    function L(I) {
      var N = [], U = I.length, B, H = 0, Y = p, V = d, tt, at, it, nt, j, Z, X, lt, ht;
      for (tt = I.lastIndexOf(v), tt < 0 && (tt = 0), at = 0; at < tt; ++at)
        I.charCodeAt(at) >= 128 && C("not-basic"), N.push(I.charCodeAt(at));
      for (it = tt > 0 ? tt + 1 : 0; it < U; ) {
        for (nt = H, j = 1, Z = h; it >= U && C("invalid-input"), X = k(I.charCodeAt(it++)), (X >= h || X > b((o - H) / j)) && C("overflow"), H += X * j, lt = Z <= V ? u : Z >= V + l ? l : Z - V, !(X < lt); Z += h)
          ht = h - lt, j > b(o / ht) && C("overflow"), j *= ht;
        B = N.length + 1, V = A(H - nt, B, nt == 0), b(H / B) > o - Y && C("overflow"), Y += b(H / B), H %= B, N.splice(H++, 0, Y);
      }
      return M(N);
    }
    function W(I) {
      var N, U, B, H, Y, V, tt, at, it, nt, j, Z = [], X, lt, ht, J;
      for (I = F(I), X = I.length, N = p, U = 0, Y = d, V = 0; V < X; ++V)
        j = I[V], j < 128 && Z.push(x(j));
      for (B = H = Z.length, H && Z.push(v); B < X; ) {
        for (tt = o, V = 0; V < X; ++V)
          j = I[V], j >= N && j < tt && (tt = j);
        for (lt = B + 1, tt - N > b((o - U) / lt) && C("overflow"), U += (tt - N) * lt, N = tt, V = 0; V < X; ++V)
          if (j = I[V], j < N && ++U > o && C("overflow"), j == N) {
            for (at = U, it = h; nt = it <= Y ? u : it >= Y + l ? l : it - Y, !(at < nt); it += h)
              J = at - nt, ht = h - nt, Z.push(
                x(Q(nt + J % ht, 0))
              ), at = b(J / ht);
            Z.push(x(Q(at, 0))), Y = A(U, lt, B == H), U = 0, ++B;
          }
        ++U, ++N;
      }
      return Z.join("");
    }
    function vt(I) {
      return R(I, function(N) {
        return _.test(N) ? L(N.slice(4).toLowerCase()) : N;
      });
    }
    function rt(I) {
      return R(I, function(N) {
        return m.test(N) ? "xn--" + W(N) : N;
      });
    }
    if (s = {
      version: "1.3.2",
      ucs2: {
        decode: F,
        encode: M
      },
      decode: L,
      encode: W,
      toASCII: rt,
      toUnicode: vt
    }, i && n)
      if (t.exports == i)
        n.exports = s;
      else
        for (E in s)
          s.hasOwnProperty(E) && (i[E] = s[E]);
    else
      e.punycode = s;
  })($i);
})(kn, kn.exports);
var Vl = {
  isString: function(t) {
    return typeof t == "string";
  },
  isObject: function(t) {
    return typeof t == "object" && t !== null;
  },
  isNull: function(t) {
    return t === null;
  },
  isNullOrUndefined: function(t) {
    return t == null;
  }
}, Ur = {};
function jl(t, r) {
  return Object.prototype.hasOwnProperty.call(t, r);
}
var zl = function(t, r, e, i) {
  r = r || "&", e = e || "=";
  var n = {};
  if (typeof t != "string" || t.length === 0)
    return n;
  var a = /\+/g;
  t = t.split(r);
  var s = 1e3;
  i && typeof i.maxKeys == "number" && (s = i.maxKeys);
  var o = t.length;
  s > 0 && o > s && (o = s);
  for (var h = 0; h < o; ++h) {
    var u = t[h].replace(a, "%20"), l = u.indexOf(e), f, c, d, p;
    l >= 0 ? (f = u.substr(0, l), c = u.substr(l + 1)) : (f = u, c = ""), d = decodeURIComponent(f), p = decodeURIComponent(c), jl(n, d) ? Array.isArray(n[d]) ? n[d].push(p) : n[d] = [n[d], p] : n[d] = p;
  }
  return n;
}, hr = function(t) {
  switch (typeof t) {
    case "string":
      return t;
    case "boolean":
      return t ? "true" : "false";
    case "number":
      return isFinite(t) ? t : "";
    default:
      return "";
  }
}, Wl = function(t, r, e, i) {
  return r = r || "&", e = e || "=", t === null && (t = void 0), typeof t == "object" ? Object.keys(t).map(function(n) {
    var a = encodeURIComponent(hr(n)) + e;
    return Array.isArray(t[n]) ? t[n].map(function(s) {
      return a + encodeURIComponent(hr(s));
    }).join(r) : a + encodeURIComponent(hr(t[n]));
  }).join(r) : i ? encodeURIComponent(hr(i)) + e + encodeURIComponent(hr(t)) : "";
};
Ur.decode = Ur.parse = zl;
Ur.encode = Ur.stringify = Wl;
var $l = kn.exports, $t = Vl, ql = Vi, Yl = of, Zl = sf;
function kt() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var Jl = /^([a-z0-9.+-]+:)/i, Kl = /:[0-9]*$/, Ql = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, tf = ["<", ">", '"', "`", " ", "\r", `
`, "	"], ef = ["{", "}", "|", "\\", "^", "`"].concat(tf), Hn = ["'"].concat(ef), Is = ["%", "/", "?", ";", "#"].concat(Hn), Es = ["/", "?", "#"], rf = 255, ws = /^[+a-z0-9A-Z_-]{0,63}$/, nf = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, af = {
  javascript: !0,
  "javascript:": !0
}, Xn = {
  javascript: !0,
  "javascript:": !0
}, tr = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, Vn = Ur;
function Vi(t, r, e) {
  if (t && $t.isObject(t) && t instanceof kt)
    return t;
  var i = new kt();
  return i.parse(t, r, e), i;
}
kt.prototype.parse = function(t, r, e) {
  if (!$t.isString(t))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
  var i = t.indexOf("?"), n = i !== -1 && i < t.indexOf("#") ? "?" : "#", a = t.split(n), s = /\\/g;
  a[0] = a[0].replace(s, "/"), t = a.join(n);
  var o = t;
  if (o = o.trim(), !e && t.split("#").length === 1) {
    var h = Ql.exec(o);
    if (h)
      return this.path = o, this.href = o, this.pathname = h[1], h[2] ? (this.search = h[2], r ? this.query = Vn.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : r && (this.search = "", this.query = {}), this;
  }
  var u = Jl.exec(o);
  if (u) {
    u = u[0];
    var l = u.toLowerCase();
    this.protocol = l, o = o.substr(u.length);
  }
  if (e || u || o.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var f = o.substr(0, 2) === "//";
    f && !(u && Xn[u]) && (o = o.substr(2), this.slashes = !0);
  }
  if (!Xn[u] && (f || u && !tr[u])) {
    for (var c = -1, d = 0; d < Es.length; d++) {
      var p = o.indexOf(Es[d]);
      p !== -1 && (c === -1 || p < c) && (c = p);
    }
    var v, _;
    c === -1 ? _ = o.lastIndexOf("@") : _ = o.lastIndexOf("@", c), _ !== -1 && (v = o.slice(0, _), o = o.slice(_ + 1), this.auth = decodeURIComponent(v)), c = -1;
    for (var d = 0; d < Is.length; d++) {
      var p = o.indexOf(Is[d]);
      p !== -1 && (c === -1 || p < c) && (c = p);
    }
    c === -1 && (c = o.length), this.host = o.slice(0, c), o = o.slice(c), this.parseHost(), this.hostname = this.hostname || "";
    var m = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!m)
      for (var y = this.hostname.split(/\./), d = 0, g = y.length; d < g; d++) {
        var T = y[d];
        if (!!T && !T.match(ws)) {
          for (var b = "", x = 0, E = T.length; x < E; x++)
            T.charCodeAt(x) > 127 ? b += "x" : b += T[x];
          if (!b.match(ws)) {
            var C = y.slice(0, d), w = y.slice(d + 1), R = T.match(nf);
            R && (C.push(R[1]), w.unshift(R[2])), w.length && (o = "/" + w.join(".") + o), this.hostname = C.join(".");
            break;
          }
        }
      }
    this.hostname.length > rf ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), m || (this.hostname = $l.toASCII(this.hostname));
    var F = this.port ? ":" + this.port : "", M = this.hostname || "";
    this.host = M + F, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), o[0] !== "/" && (o = "/" + o));
  }
  if (!af[l])
    for (var d = 0, g = Hn.length; d < g; d++) {
      var k = Hn[d];
      if (o.indexOf(k) !== -1) {
        var Q = encodeURIComponent(k);
        Q === k && (Q = escape(k)), o = o.split(k).join(Q);
      }
    }
  var A = o.indexOf("#");
  A !== -1 && (this.hash = o.substr(A), o = o.slice(0, A));
  var L = o.indexOf("?");
  if (L !== -1 ? (this.search = o.substr(L), this.query = o.substr(L + 1), r && (this.query = Vn.parse(this.query)), o = o.slice(0, L)) : r && (this.search = "", this.query = {}), o && (this.pathname = o), tr[l] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var F = this.pathname || "", W = this.search || "";
    this.path = F + W;
  }
  return this.href = this.format(), this;
};
function sf(t) {
  return $t.isString(t) && (t = Vi(t)), t instanceof kt ? t.format() : kt.prototype.format.call(t);
}
kt.prototype.format = function() {
  var t = this.auth || "";
  t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
  var r = this.protocol || "", e = this.pathname || "", i = this.hash || "", n = !1, a = "";
  this.host ? n = t + this.host : this.hostname && (n = t + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && $t.isObject(this.query) && Object.keys(this.query).length && (a = Vn.stringify(this.query));
  var s = this.search || a && "?" + a || "";
  return r && r.substr(-1) !== ":" && (r += ":"), this.slashes || (!r || tr[r]) && n !== !1 ? (n = "//" + (n || ""), e && e.charAt(0) !== "/" && (e = "/" + e)) : n || (n = ""), i && i.charAt(0) !== "#" && (i = "#" + i), s && s.charAt(0) !== "?" && (s = "?" + s), e = e.replace(/[?#]/g, function(o) {
    return encodeURIComponent(o);
  }), s = s.replace("#", "%23"), r + n + e + s + i;
};
function of(t, r) {
  return Vi(t, !1, !0).resolve(r);
}
kt.prototype.resolve = function(t) {
  return this.resolveObject(Vi(t, !1, !0)).format();
};
kt.prototype.resolveObject = function(t) {
  if ($t.isString(t)) {
    var r = new kt();
    r.parse(t, !1, !0), t = r;
  }
  for (var e = new kt(), i = Object.keys(this), n = 0; n < i.length; n++) {
    var a = i[n];
    e[a] = this[a];
  }
  if (e.hash = t.hash, t.href === "")
    return e.href = e.format(), e;
  if (t.slashes && !t.protocol) {
    for (var s = Object.keys(t), o = 0; o < s.length; o++) {
      var h = s[o];
      h !== "protocol" && (e[h] = t[h]);
    }
    return tr[e.protocol] && e.hostname && !e.pathname && (e.path = e.pathname = "/"), e.href = e.format(), e;
  }
  if (t.protocol && t.protocol !== e.protocol) {
    if (!tr[t.protocol]) {
      for (var u = Object.keys(t), l = 0; l < u.length; l++) {
        var f = u[l];
        e[f] = t[f];
      }
      return e.href = e.format(), e;
    }
    if (e.protocol = t.protocol, !t.host && !Xn[t.protocol]) {
      for (var g = (t.pathname || "").split("/"); g.length && !(t.host = g.shift()); )
        ;
      t.host || (t.host = ""), t.hostname || (t.hostname = ""), g[0] !== "" && g.unshift(""), g.length < 2 && g.unshift(""), e.pathname = g.join("/");
    } else
      e.pathname = t.pathname;
    if (e.search = t.search, e.query = t.query, e.host = t.host || "", e.auth = t.auth, e.hostname = t.hostname || t.host, e.port = t.port, e.pathname || e.search) {
      var c = e.pathname || "", d = e.search || "";
      e.path = c + d;
    }
    return e.slashes = e.slashes || t.slashes, e.href = e.format(), e;
  }
  var p = e.pathname && e.pathname.charAt(0) === "/", v = t.host || t.pathname && t.pathname.charAt(0) === "/", _ = v || p || e.host && t.pathname, m = _, y = e.pathname && e.pathname.split("/") || [], g = t.pathname && t.pathname.split("/") || [], T = e.protocol && !tr[e.protocol];
  if (T && (e.hostname = "", e.port = null, e.host && (y[0] === "" ? y[0] = e.host : y.unshift(e.host)), e.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && (g[0] === "" ? g[0] = t.host : g.unshift(t.host)), t.host = null), _ = _ && (g[0] === "" || y[0] === "")), v)
    e.host = t.host || t.host === "" ? t.host : e.host, e.hostname = t.hostname || t.hostname === "" ? t.hostname : e.hostname, e.search = t.search, e.query = t.query, y = g;
  else if (g.length)
    y || (y = []), y.pop(), y = y.concat(g), e.search = t.search, e.query = t.query;
  else if (!$t.isNullOrUndefined(t.search)) {
    if (T) {
      e.hostname = e.host = y.shift();
      var b = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
      b && (e.auth = b.shift(), e.host = e.hostname = b.shift());
    }
    return e.search = t.search, e.query = t.query, (!$t.isNull(e.pathname) || !$t.isNull(e.search)) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.href = e.format(), e;
  }
  if (!y.length)
    return e.pathname = null, e.search ? e.path = "/" + e.search : e.path = null, e.href = e.format(), e;
  for (var x = y.slice(-1)[0], E = (e.host || t.host || y.length > 1) && (x === "." || x === "..") || x === "", C = 0, w = y.length; w >= 0; w--)
    x = y[w], x === "." ? y.splice(w, 1) : x === ".." ? (y.splice(w, 1), C++) : C && (y.splice(w, 1), C--);
  if (!_ && !m)
    for (; C--; C)
      y.unshift("..");
  _ && y[0] !== "" && (!y[0] || y[0].charAt(0) !== "/") && y.unshift(""), E && y.join("/").substr(-1) !== "/" && y.push("");
  var R = y[0] === "" || y[0] && y[0].charAt(0) === "/";
  if (T) {
    e.hostname = e.host = R ? "" : y.length ? y.shift() : "";
    var b = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
    b && (e.auth = b.shift(), e.host = e.hostname = b.shift());
  }
  return _ = _ || e.host && y.length, _ && !R && y.unshift(""), y.length ? e.pathname = y.join("/") : (e.pathname = null, e.path = null), (!$t.isNull(e.pathname) || !$t.isNull(e.search)) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.auth = t.auth || e.auth, e.slashes = e.slashes || t.slashes, e.href = e.format(), e;
};
kt.prototype.parseHost = function() {
  var t = this.host, r = Kl.exec(t);
  r && (r = r[0], r !== ":" && (this.port = r.substr(1)), t = t.substr(0, t.length - r.length)), t && (this.hostname = t);
};
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ue;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(ue || (ue = {}));
var Or;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Or || (Or = {}));
var Ei;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Ei || (Ei = {}));
var D;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(D || (D = {}));
var Ot;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Ot || (Ot = {}));
var P;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(P || (P = {}));
var Pe;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(Pe || (Pe = {}));
var G;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(G || (G = {}));
var wi;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(wi || (wi = {}));
var he;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(he || (he = {}));
var Ft;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Ft || (Ft = {}));
var te;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(te || (te = {}));
var Xt;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Xt || (Xt = {}));
var pe;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(pe || (pe = {}));
var jn;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(jn || (jn = {}));
var Yt;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Yt || (Yt = {}));
var bt;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(bt || (bt = {}));
var Rs;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(Rs || (Rs = {}));
var xt;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(xt || (xt = {}));
var Jt;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Jt || (Jt = {}));
/*!
 * @pixi/utils - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ye = {
  parse: ql,
  format: Zl,
  resolve: Yl
};
O.RETINA_PREFIX = /@([0-9\.]+)x/;
O.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var Cs = !1, Ns = "6.5.5";
function hf(t) {
  var r;
  if (!Cs) {
    if (O.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      var e = [
        `
 %c %c %c PixiJS ` + Ns + " - \u2730 " + t + ` \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 

`,
        "background: #ff66a5; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "color: #ff66a5; background: #030307; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "background: #ffc3dc; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;"
      ];
      (r = globalThis.console).log.apply(r, e);
    } else
      globalThis.console && globalThis.console.log("PixiJS " + Ns + " - " + t + " - http://www.pixijs.com/");
    Cs = !0;
  }
}
var Qi;
function uf() {
  return typeof Qi > "u" && (Qi = function() {
    var r = {
      stencil: !0,
      failIfMajorPerformanceCaveat: O.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!O.ADAPTER.getWebGLRenderingContext())
        return !1;
      var e = O.ADAPTER.createCanvas(), i = e.getContext("webgl", r) || e.getContext("experimental-webgl", r), n = !!(i && i.getContextAttributes().stencil);
      if (i) {
        var a = i.getExtension("WEBGL_lose_context");
        a && a.loseContext();
      }
      return i = null, n;
    } catch {
      return !1;
    }
  }()), Qi;
}
var lf = "#f0f8ff", ff = "#faebd7", cf = "#00ffff", df = "#7fffd4", pf = "#f0ffff", vf = "#f5f5dc", _f = "#ffe4c4", mf = "#000000", yf = "#ffebcd", xf = "#0000ff", gf = "#8a2be2", bf = "#a52a2a", Tf = "#deb887", If = "#5f9ea0", Ef = "#7fff00", wf = "#d2691e", Rf = "#ff7f50", Cf = "#6495ed", Nf = "#fff8dc", Af = "#dc143c", Pf = "#00ffff", Uf = "#00008b", Of = "#008b8b", Ff = "#b8860b", Lf = "#a9a9a9", Sf = "#006400", Gf = "#a9a9a9", Bf = "#bdb76b", Mf = "#8b008b", Df = "#556b2f", kf = "#ff8c00", Hf = "#9932cc", Xf = "#8b0000", Vf = "#e9967a", jf = "#8fbc8f", zf = "#483d8b", Wf = "#2f4f4f", $f = "#2f4f4f", qf = "#00ced1", Yf = "#9400d3", Zf = "#ff1493", Jf = "#00bfff", Kf = "#696969", Qf = "#696969", tc = "#1e90ff", ec = "#b22222", rc = "#fffaf0", ic = "#228b22", nc = "#ff00ff", ac = "#dcdcdc", sc = "#f8f8ff", oc = "#daa520", hc = "#ffd700", uc = "#808080", lc = "#008000", fc = "#adff2f", cc = "#808080", dc = "#f0fff0", pc = "#ff69b4", vc = "#cd5c5c", _c = "#4b0082", mc = "#fffff0", yc = "#f0e68c", xc = "#fff0f5", gc = "#e6e6fa", bc = "#7cfc00", Tc = "#fffacd", Ic = "#add8e6", Ec = "#f08080", wc = "#e0ffff", Rc = "#fafad2", Cc = "#d3d3d3", Nc = "#90ee90", Ac = "#d3d3d3", Pc = "#ffb6c1", Uc = "#ffa07a", Oc = "#20b2aa", Fc = "#87cefa", Lc = "#778899", Sc = "#778899", Gc = "#b0c4de", Bc = "#ffffe0", Mc = "#00ff00", Dc = "#32cd32", kc = "#faf0e6", Hc = "#ff00ff", Xc = "#800000", Vc = "#66cdaa", jc = "#0000cd", zc = "#ba55d3", Wc = "#9370db", $c = "#3cb371", qc = "#7b68ee", Yc = "#00fa9a", Zc = "#48d1cc", Jc = "#c71585", Kc = "#191970", Qc = "#f5fffa", td = "#ffe4e1", ed = "#ffe4b5", rd = "#ffdead", id = "#000080", nd = "#fdf5e6", ad = "#808000", sd = "#6b8e23", od = "#ffa500", hd = "#ff4500", ud = "#da70d6", ld = "#eee8aa", fd = "#98fb98", cd = "#afeeee", dd = "#db7093", pd = "#ffefd5", vd = "#ffdab9", _d = "#cd853f", md = "#ffc0cb", yd = "#dda0dd", xd = "#b0e0e6", gd = "#800080", bd = "#663399", Td = "#ff0000", Id = "#bc8f8f", Ed = "#4169e1", wd = "#8b4513", Rd = "#fa8072", Cd = "#f4a460", Nd = "#2e8b57", Ad = "#fff5ee", Pd = "#a0522d", Ud = "#c0c0c0", Od = "#87ceeb", Fd = "#6a5acd", Ld = "#708090", Sd = "#708090", Gd = "#fffafa", Bd = "#00ff7f", Md = "#4682b4", Dd = "#d2b48c", kd = "#008080", Hd = "#d8bfd8", Xd = "#ff6347", Vd = "#40e0d0", jd = "#ee82ee", zd = "#f5deb3", Wd = "#ffffff", $d = "#f5f5f5", qd = "#ffff00", Yd = "#9acd32", Zd = {
  aliceblue: lf,
  antiquewhite: ff,
  aqua: cf,
  aquamarine: df,
  azure: pf,
  beige: vf,
  bisque: _f,
  black: mf,
  blanchedalmond: yf,
  blue: xf,
  blueviolet: gf,
  brown: bf,
  burlywood: Tf,
  cadetblue: If,
  chartreuse: Ef,
  chocolate: wf,
  coral: Rf,
  cornflowerblue: Cf,
  cornsilk: Nf,
  crimson: Af,
  cyan: Pf,
  darkblue: Uf,
  darkcyan: Of,
  darkgoldenrod: Ff,
  darkgray: Lf,
  darkgreen: Sf,
  darkgrey: Gf,
  darkkhaki: Bf,
  darkmagenta: Mf,
  darkolivegreen: Df,
  darkorange: kf,
  darkorchid: Hf,
  darkred: Xf,
  darksalmon: Vf,
  darkseagreen: jf,
  darkslateblue: zf,
  darkslategray: Wf,
  darkslategrey: $f,
  darkturquoise: qf,
  darkviolet: Yf,
  deeppink: Zf,
  deepskyblue: Jf,
  dimgray: Kf,
  dimgrey: Qf,
  dodgerblue: tc,
  firebrick: ec,
  floralwhite: rc,
  forestgreen: ic,
  fuchsia: nc,
  gainsboro: ac,
  ghostwhite: sc,
  goldenrod: oc,
  gold: hc,
  gray: uc,
  green: lc,
  greenyellow: fc,
  grey: cc,
  honeydew: dc,
  hotpink: pc,
  indianred: vc,
  indigo: _c,
  ivory: mc,
  khaki: yc,
  lavenderblush: xc,
  lavender: gc,
  lawngreen: bc,
  lemonchiffon: Tc,
  lightblue: Ic,
  lightcoral: Ec,
  lightcyan: wc,
  lightgoldenrodyellow: Rc,
  lightgray: Cc,
  lightgreen: Nc,
  lightgrey: Ac,
  lightpink: Pc,
  lightsalmon: Uc,
  lightseagreen: Oc,
  lightskyblue: Fc,
  lightslategray: Lc,
  lightslategrey: Sc,
  lightsteelblue: Gc,
  lightyellow: Bc,
  lime: Mc,
  limegreen: Dc,
  linen: kc,
  magenta: Hc,
  maroon: Xc,
  mediumaquamarine: Vc,
  mediumblue: jc,
  mediumorchid: zc,
  mediumpurple: Wc,
  mediumseagreen: $c,
  mediumslateblue: qc,
  mediumspringgreen: Yc,
  mediumturquoise: Zc,
  mediumvioletred: Jc,
  midnightblue: Kc,
  mintcream: Qc,
  mistyrose: td,
  moccasin: ed,
  navajowhite: rd,
  navy: id,
  oldlace: nd,
  olive: ad,
  olivedrab: sd,
  orange: od,
  orangered: hd,
  orchid: ud,
  palegoldenrod: ld,
  palegreen: fd,
  paleturquoise: cd,
  palevioletred: dd,
  papayawhip: pd,
  peachpuff: vd,
  peru: _d,
  pink: md,
  plum: yd,
  powderblue: xd,
  purple: gd,
  rebeccapurple: bd,
  red: Td,
  rosybrown: Id,
  royalblue: Ed,
  saddlebrown: wd,
  salmon: Rd,
  sandybrown: Cd,
  seagreen: Nd,
  seashell: Ad,
  sienna: Pd,
  silver: Ud,
  skyblue: Od,
  slateblue: Fd,
  slategray: Ld,
  slategrey: Sd,
  snow: Gd,
  springgreen: Bd,
  steelblue: Md,
  tan: Dd,
  teal: kd,
  thistle: Hd,
  tomato: Xd,
  turquoise: Vd,
  violet: jd,
  wheat: zd,
  white: Wd,
  whitesmoke: $d,
  yellow: qd,
  yellowgreen: Yd
};
function nr(t, r) {
  return r === void 0 && (r = []), r[0] = (t >> 16 & 255) / 255, r[1] = (t >> 8 & 255) / 255, r[2] = (t & 255) / 255, r;
}
function Cu(t) {
  var r = t.toString(16);
  return r = "000000".substring(0, 6 - r.length) + r, "#" + r;
}
function Nu(t) {
  return typeof t == "string" && (t = Zd[t.toLowerCase()] || t, t[0] === "#" && (t = t.slice(1))), parseInt(t, 16);
}
function Jd() {
  for (var t = [], r = [], e = 0; e < 32; e++)
    t[e] = e, r[e] = e;
  t[D.NORMAL_NPM] = D.NORMAL, t[D.ADD_NPM] = D.ADD, t[D.SCREEN_NPM] = D.SCREEN, r[D.NORMAL] = D.NORMAL_NPM, r[D.ADD] = D.ADD_NPM, r[D.SCREEN] = D.SCREEN_NPM;
  var i = [];
  return i.push(r), i.push(t), i;
}
var Pa = Jd();
function Ua(t, r) {
  return Pa[r ? 1 : 0][t];
}
function Kd(t, r, e, i) {
  return e = e || new Float32Array(4), i || i === void 0 ? (e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r) : (e[0] = t[0], e[1] = t[1], e[2] = t[2]), e[3] = r, e;
}
function Dr(t, r) {
  if (r === 1)
    return (r * 255 << 24) + t;
  if (r === 0)
    return 0;
  var e = t >> 16 & 255, i = t >> 8 & 255, n = t & 255;
  return e = e * r + 0.5 | 0, i = i * r + 0.5 | 0, n = n * r + 0.5 | 0, (r * 255 << 24) + (e << 16) + (i << 8) + n;
}
function Oa(t, r, e, i) {
  return e = e || new Float32Array(4), e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (t & 255) / 255, (i || i === void 0) && (e[0] *= r, e[1] *= r, e[2] *= r), e[3] = r, e;
}
function Qd(t, r) {
  r === void 0 && (r = null);
  var e = t * 6;
  if (r = r || new Uint16Array(e), r.length !== e)
    throw new Error("Out buffer length is incorrect, got " + r.length + " and expected " + e);
  for (var i = 0, n = 0; i < e; i += 6, n += 4)
    r[i + 0] = n + 0, r[i + 1] = n + 1, r[i + 2] = n + 2, r[i + 3] = n + 0, r[i + 4] = n + 2, r[i + 5] = n + 3;
  return r;
}
function Au(t) {
  if (t.BYTES_PER_ELEMENT === 4)
    return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (t.BYTES_PER_ELEMENT === 2) {
    if (t instanceof Uint16Array)
      return "Uint16Array";
  } else if (t.BYTES_PER_ELEMENT === 1 && t instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function Ri(t) {
  return t += t === 0 ? 1 : 0, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t + 1;
}
function As(t) {
  return !(t & t - 1) && !!t;
}
function Ps(t) {
  var r = (t > 65535 ? 1 : 0) << 4;
  t >>>= r;
  var e = (t > 255 ? 1 : 0) << 3;
  return t >>>= e, r |= e, e = (t > 15 ? 1 : 0) << 2, t >>>= e, r |= e, e = (t > 3 ? 1 : 0) << 1, t >>>= e, r |= e, r | t >> 1;
}
function er(t, r, e) {
  var i = t.length, n;
  if (!(r >= i || e === 0)) {
    e = r + e > i ? i - r : e;
    var a = i - e;
    for (n = r; n < a; ++n)
      t[n] = t[n + e];
    t.length = a;
  }
}
function Ze(t) {
  return t === 0 ? 0 : t < 0 ? -1 : 1;
}
var tp = 0;
function Fe() {
  return ++tp;
}
var Us = {};
function Kt(t, r, e) {
  if (e === void 0 && (e = 3), !Us[r]) {
    var i = new Error().stack;
    typeof i > "u" ? console.warn("PixiJS Deprecation Warning: ", r + `
Deprecated since v` + t) : (i = i.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", r + `
Deprecated since v` + t), console.warn(i), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", r + `
Deprecated since v` + t), console.warn(i))), Us[r] = !0;
  }
}
var Os = {}, Mt = /* @__PURE__ */ Object.create(null), ae = /* @__PURE__ */ Object.create(null);
function ep() {
  var t;
  for (t in Mt)
    Mt[t].destroy();
  for (t in ae)
    ae[t].destroy();
}
var Fs = function() {
  function t(r, e, i) {
    this.canvas = O.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = i || O.RESOLUTION, this.resize(r, e);
  }
  return t.prototype.clear = function() {
    this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }, t.prototype.resize = function(r, e) {
    this.canvas.width = Math.round(r * this.resolution), this.canvas.height = Math.round(e * this.resolution);
  }, t.prototype.destroy = function() {
    this.context = null, this.canvas = null;
  }, Object.defineProperty(t.prototype, "width", {
    get: function() {
      return this.canvas.width;
    },
    set: function(r) {
      this.canvas.width = Math.round(r);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "height", {
    get: function() {
      return this.canvas.height;
    },
    set: function(r) {
      this.canvas.height = Math.round(r);
    },
    enumerable: !1,
    configurable: !0
  }), t;
}();
function rp(t) {
  var r = t.width, e = t.height, i = t.getContext("2d"), n = i.getImageData(0, 0, r, e), a = n.data, s = a.length, o = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }, h = null, u, l, f;
  for (u = 0; u < s; u += 4)
    a[u + 3] !== 0 && (l = u / 4 % r, f = ~~(u / 4 / r), o.top === null && (o.top = f), (o.left === null || l < o.left) && (o.left = l), (o.right === null || o.right < l) && (o.right = l + 1), (o.bottom === null || o.bottom < f) && (o.bottom = f));
  return o.top !== null && (r = o.right - o.left, e = o.bottom - o.top + 1, h = i.getImageData(o.left, o.top, r, e)), {
    height: e,
    width: r,
    data: h
  };
}
var Jr;
function ip(t, r) {
  if (r === void 0 && (r = globalThis.location), t.indexOf("data:") === 0)
    return "";
  r = r || globalThis.location, Jr || (Jr = document.createElement("a")), Jr.href = t;
  var e = Ye.parse(Jr.href), i = !e.port && r.port === "" || e.port === r.port;
  return e.hostname !== r.hostname || !i || e.protocol !== r.protocol ? "anonymous" : "";
}
function Ci(t, r) {
  var e = O.RETINA_PREFIX.exec(t);
  return e ? parseFloat(e[1]) : r !== void 0 ? r : 1;
}
/*!
 * @pixi/math - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ni = Math.PI * 2, np = 180 / Math.PI, ap = Math.PI / 180, It;
(function(t) {
  t[t.POLY = 0] = "POLY", t[t.RECT = 1] = "RECT", t[t.CIRC = 2] = "CIRC", t[t.ELIP = 3] = "ELIP", t[t.RREC = 4] = "RREC";
})(It || (It = {}));
var $ = function() {
  function t(r, e) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), this.x = 0, this.y = 0, this.x = r, this.y = e;
  }
  return t.prototype.clone = function() {
    return new t(this.x, this.y);
  }, t.prototype.copyFrom = function(r) {
    return this.set(r.x, r.y), this;
  }, t.prototype.copyTo = function(r) {
    return r.set(this.x, this.y), r;
  }, t.prototype.equals = function(r) {
    return r.x === this.x && r.y === this.y;
  }, t.prototype.set = function(r, e) {
    return r === void 0 && (r = 0), e === void 0 && (e = r), this.x = r, this.y = e, this;
  }, t.prototype.toString = function() {
    return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
  }, t;
}(), Kr = [new $(), new $(), new $(), new $()], K = function() {
  function t(r, e, i, n) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), i === void 0 && (i = 0), n === void 0 && (n = 0), this.x = Number(r), this.y = Number(e), this.width = Number(i), this.height = Number(n), this.type = It.RECT;
  }
  return Object.defineProperty(t.prototype, "left", {
    get: function() {
      return this.x;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "right", {
    get: function() {
      return this.x + this.width;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "top", {
    get: function() {
      return this.y;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bottom", {
    get: function() {
      return this.y + this.height;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "EMPTY", {
    get: function() {
      return new t(0, 0, 0, 0);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.clone = function() {
    return new t(this.x, this.y, this.width, this.height);
  }, t.prototype.copyFrom = function(r) {
    return this.x = r.x, this.y = r.y, this.width = r.width, this.height = r.height, this;
  }, t.prototype.copyTo = function(r) {
    return r.x = this.x, r.y = this.y, r.width = this.width, r.height = this.height, r;
  }, t.prototype.contains = function(r, e) {
    return this.width <= 0 || this.height <= 0 ? !1 : r >= this.x && r < this.x + this.width && e >= this.y && e < this.y + this.height;
  }, t.prototype.intersects = function(r, e) {
    if (!e) {
      var i = this.x < r.x ? r.x : this.x, n = this.right > r.right ? r.right : this.right;
      if (n <= i)
        return !1;
      var a = this.y < r.y ? r.y : this.y, s = this.bottom > r.bottom ? r.bottom : this.bottom;
      return s > a;
    }
    var o = this.left, h = this.right, u = this.top, l = this.bottom;
    if (h <= o || l <= u)
      return !1;
    var f = Kr[0].set(r.left, r.top), c = Kr[1].set(r.left, r.bottom), d = Kr[2].set(r.right, r.top), p = Kr[3].set(r.right, r.bottom);
    if (d.x <= f.x || c.y <= f.y)
      return !1;
    var v = Math.sign(e.a * e.d - e.b * e.c);
    if (v === 0 || (e.apply(f, f), e.apply(c, c), e.apply(d, d), e.apply(p, p), Math.max(f.x, c.x, d.x, p.x) <= o || Math.min(f.x, c.x, d.x, p.x) >= h || Math.max(f.y, c.y, d.y, p.y) <= u || Math.min(f.y, c.y, d.y, p.y) >= l))
      return !1;
    var _ = v * (c.y - f.y), m = v * (f.x - c.x), y = _ * o + m * u, g = _ * h + m * u, T = _ * o + m * l, b = _ * h + m * l;
    if (Math.max(y, g, T, b) <= _ * f.x + m * f.y || Math.min(y, g, T, b) >= _ * p.x + m * p.y)
      return !1;
    var x = v * (f.y - d.y), E = v * (d.x - f.x), C = x * o + E * u, w = x * h + E * u, R = x * o + E * l, F = x * h + E * l;
    return !(Math.max(C, w, R, F) <= x * f.x + E * f.y || Math.min(C, w, R, F) >= x * p.x + E * p.y);
  }, t.prototype.pad = function(r, e) {
    return r === void 0 && (r = 0), e === void 0 && (e = r), this.x -= r, this.y -= e, this.width += r * 2, this.height += e * 2, this;
  }, t.prototype.fit = function(r) {
    var e = Math.max(this.x, r.x), i = Math.min(this.x + this.width, r.x + r.width), n = Math.max(this.y, r.y), a = Math.min(this.y + this.height, r.y + r.height);
    return this.x = e, this.width = Math.max(i - e, 0), this.y = n, this.height = Math.max(a - n, 0), this;
  }, t.prototype.ceil = function(r, e) {
    r === void 0 && (r = 1), e === void 0 && (e = 1e-3);
    var i = Math.ceil((this.x + this.width - e) * r) / r, n = Math.ceil((this.y + this.height - e) * r) / r;
    return this.x = Math.floor((this.x + e) * r) / r, this.y = Math.floor((this.y + e) * r) / r, this.width = i - this.x, this.height = n - this.y, this;
  }, t.prototype.enlarge = function(r) {
    var e = Math.min(this.x, r.x), i = Math.max(this.x + this.width, r.x + r.width), n = Math.min(this.y, r.y), a = Math.max(this.y + this.height, r.y + r.height);
    return this.x = e, this.width = i - e, this.y = n, this.height = a - n, this;
  }, t.prototype.toString = function() {
    return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
  }, t;
}(), sp = function() {
  function t(r, e, i) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), i === void 0 && (i = 0), this.x = r, this.y = e, this.radius = i, this.type = It.CIRC;
  }
  return t.prototype.clone = function() {
    return new t(this.x, this.y, this.radius);
  }, t.prototype.contains = function(r, e) {
    if (this.radius <= 0)
      return !1;
    var i = this.radius * this.radius, n = this.x - r, a = this.y - e;
    return n *= n, a *= a, n + a <= i;
  }, t.prototype.getBounds = function() {
    return new K(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }, t.prototype.toString = function() {
    return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
  }, t;
}(), op = function() {
  function t(r, e, i, n) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), i === void 0 && (i = 0), n === void 0 && (n = 0), this.x = r, this.y = e, this.width = i, this.height = n, this.type = It.ELIP;
  }
  return t.prototype.clone = function() {
    return new t(this.x, this.y, this.width, this.height);
  }, t.prototype.contains = function(r, e) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    var i = (r - this.x) / this.width, n = (e - this.y) / this.height;
    return i *= i, n *= n, i + n <= 1;
  }, t.prototype.getBounds = function() {
    return new K(this.x - this.width, this.y - this.height, this.width, this.height);
  }, t.prototype.toString = function() {
    return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
  }, t;
}(), Ti = function() {
  function t() {
    for (var r = arguments, e = [], i = 0; i < arguments.length; i++)
      e[i] = r[i];
    var n = Array.isArray(e[0]) ? e[0] : e;
    if (typeof n[0] != "number") {
      for (var a = [], s = 0, o = n.length; s < o; s++)
        a.push(n[s].x, n[s].y);
      n = a;
    }
    this.points = n, this.type = It.POLY, this.closeStroke = !0;
  }
  return t.prototype.clone = function() {
    var r = this.points.slice(), e = new t(r);
    return e.closeStroke = this.closeStroke, e;
  }, t.prototype.contains = function(r, e) {
    for (var i = !1, n = this.points.length / 2, a = 0, s = n - 1; a < n; s = a++) {
      var o = this.points[a * 2], h = this.points[a * 2 + 1], u = this.points[s * 2], l = this.points[s * 2 + 1], f = h > e != l > e && r < (u - o) * ((e - h) / (l - h)) + o;
      f && (i = !i);
    }
    return i;
  }, t.prototype.toString = function() {
    return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(r, e) {
      return r + ", " + e;
    }, "") + "]");
  }, t;
}(), hp = function() {
  function t(r, e, i, n, a) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), i === void 0 && (i = 0), n === void 0 && (n = 0), a === void 0 && (a = 20), this.x = r, this.y = e, this.width = i, this.height = n, this.radius = a, this.type = It.RREC;
  }
  return t.prototype.clone = function() {
    return new t(this.x, this.y, this.width, this.height, this.radius);
  }, t.prototype.contains = function(r, e) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    if (r >= this.x && r <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
      var i = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (e >= this.y + i && e <= this.y + this.height - i || r >= this.x + i && r <= this.x + this.width - i)
        return !0;
      var n = r - (this.x + i), a = e - (this.y + i), s = i * i;
      if (n * n + a * a <= s || (n = r - (this.x + this.width - i), n * n + a * a <= s) || (a = e - (this.y + this.height - i), n * n + a * a <= s) || (n = r - (this.x + i), n * n + a * a <= s))
        return !0;
    }
    return !1;
  }, t.prototype.toString = function() {
    return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
  }, t;
}(), _e = function() {
  function t(r, e, i, n) {
    i === void 0 && (i = 0), n === void 0 && (n = 0), this._x = i, this._y = n, this.cb = r, this.scope = e;
  }
  return t.prototype.clone = function(r, e) {
    return r === void 0 && (r = this.cb), e === void 0 && (e = this.scope), new t(r, e, this._x, this._y);
  }, t.prototype.set = function(r, e) {
    return r === void 0 && (r = 0), e === void 0 && (e = r), (this._x !== r || this._y !== e) && (this._x = r, this._y = e, this.cb.call(this.scope)), this;
  }, t.prototype.copyFrom = function(r) {
    return (this._x !== r.x || this._y !== r.y) && (this._x = r.x, this._y = r.y, this.cb.call(this.scope)), this;
  }, t.prototype.copyTo = function(r) {
    return r.set(this._x, this._y), r;
  }, t.prototype.equals = function(r) {
    return r.x === this._x && r.y === this._y;
  }, t.prototype.toString = function() {
    return "[@pixi/math:ObservablePoint x=" + 0 + " y=" + 0 + " scope=" + this.scope + "]";
  }, Object.defineProperty(t.prototype, "x", {
    get: function() {
      return this._x;
    },
    set: function(r) {
      this._x !== r && (this._x = r, this.cb.call(this.scope));
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "y", {
    get: function() {
      return this._y;
    },
    set: function(r) {
      this._y !== r && (this._y = r, this.cb.call(this.scope));
    },
    enumerable: !1,
    configurable: !0
  }), t;
}(), ft = function() {
  function t(r, e, i, n, a, s) {
    r === void 0 && (r = 1), e === void 0 && (e = 0), i === void 0 && (i = 0), n === void 0 && (n = 1), a === void 0 && (a = 0), s === void 0 && (s = 0), this.array = null, this.a = r, this.b = e, this.c = i, this.d = n, this.tx = a, this.ty = s;
  }
  return t.prototype.fromArray = function(r) {
    this.a = r[0], this.b = r[1], this.c = r[3], this.d = r[4], this.tx = r[2], this.ty = r[5];
  }, t.prototype.set = function(r, e, i, n, a, s) {
    return this.a = r, this.b = e, this.c = i, this.d = n, this.tx = a, this.ty = s, this;
  }, t.prototype.toArray = function(r, e) {
    this.array || (this.array = new Float32Array(9));
    var i = e || this.array;
    return r ? (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1) : (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1), i;
  }, t.prototype.apply = function(r, e) {
    e = e || new $();
    var i = r.x, n = r.y;
    return e.x = this.a * i + this.c * n + this.tx, e.y = this.b * i + this.d * n + this.ty, e;
  }, t.prototype.applyInverse = function(r, e) {
    e = e || new $();
    var i = 1 / (this.a * this.d + this.c * -this.b), n = r.x, a = r.y;
    return e.x = this.d * i * n + -this.c * i * a + (this.ty * this.c - this.tx * this.d) * i, e.y = this.a * i * a + -this.b * i * n + (-this.ty * this.a + this.tx * this.b) * i, e;
  }, t.prototype.translate = function(r, e) {
    return this.tx += r, this.ty += e, this;
  }, t.prototype.scale = function(r, e) {
    return this.a *= r, this.d *= e, this.c *= r, this.b *= e, this.tx *= r, this.ty *= e, this;
  }, t.prototype.rotate = function(r) {
    var e = Math.cos(r), i = Math.sin(r), n = this.a, a = this.c, s = this.tx;
    return this.a = n * e - this.b * i, this.b = n * i + this.b * e, this.c = a * e - this.d * i, this.d = a * i + this.d * e, this.tx = s * e - this.ty * i, this.ty = s * i + this.ty * e, this;
  }, t.prototype.append = function(r) {
    var e = this.a, i = this.b, n = this.c, a = this.d;
    return this.a = r.a * e + r.b * n, this.b = r.a * i + r.b * a, this.c = r.c * e + r.d * n, this.d = r.c * i + r.d * a, this.tx = r.tx * e + r.ty * n + this.tx, this.ty = r.tx * i + r.ty * a + this.ty, this;
  }, t.prototype.setTransform = function(r, e, i, n, a, s, o, h, u) {
    return this.a = Math.cos(o + u) * a, this.b = Math.sin(o + u) * a, this.c = -Math.sin(o - h) * s, this.d = Math.cos(o - h) * s, this.tx = r - (i * this.a + n * this.c), this.ty = e - (i * this.b + n * this.d), this;
  }, t.prototype.prepend = function(r) {
    var e = this.tx;
    if (r.a !== 1 || r.b !== 0 || r.c !== 0 || r.d !== 1) {
      var i = this.a, n = this.c;
      this.a = i * r.a + this.b * r.c, this.b = i * r.b + this.b * r.d, this.c = n * r.a + this.d * r.c, this.d = n * r.b + this.d * r.d;
    }
    return this.tx = e * r.a + this.ty * r.c + r.tx, this.ty = e * r.b + this.ty * r.d + r.ty, this;
  }, t.prototype.decompose = function(r) {
    var e = this.a, i = this.b, n = this.c, a = this.d, s = r.pivot, o = -Math.atan2(-n, a), h = Math.atan2(i, e), u = Math.abs(o + h);
    return u < 1e-5 || Math.abs(Ni - u) < 1e-5 ? (r.rotation = h, r.skew.x = r.skew.y = 0) : (r.rotation = 0, r.skew.x = o, r.skew.y = h), r.scale.x = Math.sqrt(e * e + i * i), r.scale.y = Math.sqrt(n * n + a * a), r.position.x = this.tx + (s.x * e + s.y * n), r.position.y = this.ty + (s.x * i + s.y * a), r;
  }, t.prototype.invert = function() {
    var r = this.a, e = this.b, i = this.c, n = this.d, a = this.tx, s = r * n - e * i;
    return this.a = n / s, this.b = -e / s, this.c = -i / s, this.d = r / s, this.tx = (i * this.ty - n * a) / s, this.ty = -(r * this.ty - e * a) / s, this;
  }, t.prototype.identity = function() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }, t.prototype.clone = function() {
    var r = new t();
    return r.a = this.a, r.b = this.b, r.c = this.c, r.d = this.d, r.tx = this.tx, r.ty = this.ty, r;
  }, t.prototype.copyTo = function(r) {
    return r.a = this.a, r.b = this.b, r.c = this.c, r.d = this.d, r.tx = this.tx, r.ty = this.ty, r;
  }, t.prototype.copyFrom = function(r) {
    return this.a = r.a, this.b = r.b, this.c = r.c, this.d = r.d, this.tx = r.tx, this.ty = r.ty, this;
  }, t.prototype.toString = function() {
    return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
  }, Object.defineProperty(t, "IDENTITY", {
    get: function() {
      return new t();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "TEMP_MATRIX", {
    get: function() {
      return new t();
    },
    enumerable: !1,
    configurable: !0
  }), t;
}(), Re = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Ce = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Ne = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], Ae = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], zn = [], Pu = [], Qr = Math.sign;
function up() {
  for (var t = 0; t < 16; t++) {
    var r = [];
    zn.push(r);
    for (var e = 0; e < 16; e++)
      for (var i = Qr(Re[t] * Re[e] + Ne[t] * Ce[e]), n = Qr(Ce[t] * Re[e] + Ae[t] * Ce[e]), a = Qr(Re[t] * Ne[e] + Ne[t] * Ae[e]), s = Qr(Ce[t] * Ne[e] + Ae[t] * Ae[e]), o = 0; o < 16; o++)
        if (Re[o] === i && Ce[o] === n && Ne[o] === a && Ae[o] === s) {
          r.push(o);
          break;
        }
  }
  for (var t = 0; t < 16; t++) {
    var h = new ft();
    h.set(Re[t], Ce[t], Ne[t], Ae[t], 0, 0), Pu.push(h);
  }
}
up();
var ct = {
  E: 0,
  SE: 1,
  S: 2,
  SW: 3,
  W: 4,
  NW: 5,
  N: 6,
  NE: 7,
  MIRROR_VERTICAL: 8,
  MAIN_DIAGONAL: 10,
  MIRROR_HORIZONTAL: 12,
  REVERSE_DIAGONAL: 14,
  uX: function(t) {
    return Re[t];
  },
  uY: function(t) {
    return Ce[t];
  },
  vX: function(t) {
    return Ne[t];
  },
  vY: function(t) {
    return Ae[t];
  },
  inv: function(t) {
    return t & 8 ? t & 15 : -t & 7;
  },
  add: function(t, r) {
    return zn[t][r];
  },
  sub: function(t, r) {
    return zn[t][ct.inv(r)];
  },
  rotate180: function(t) {
    return t ^ 4;
  },
  isVertical: function(t) {
    return (t & 3) === 2;
  },
  byDirection: function(t, r) {
    return Math.abs(t) * 2 <= Math.abs(r) ? r >= 0 ? ct.S : ct.N : Math.abs(r) * 2 <= Math.abs(t) ? t > 0 ? ct.E : ct.W : r > 0 ? t > 0 ? ct.SE : ct.SW : t > 0 ? ct.NE : ct.NW;
  },
  matrixAppendRotationInv: function(t, r, e, i) {
    e === void 0 && (e = 0), i === void 0 && (i = 0);
    var n = Pu[ct.inv(r)];
    n.tx = e, n.ty = i, t.append(n);
  }
}, sr = function() {
  function t() {
    this.worldTransform = new ft(), this.localTransform = new ft(), this.position = new _e(this.onChange, this, 0, 0), this.scale = new _e(this.onChange, this, 1, 1), this.pivot = new _e(this.onChange, this, 0, 0), this.skew = new _e(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
  }
  return t.prototype.onChange = function() {
    this._localID++;
  }, t.prototype.updateSkew = function() {
    this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
  }, t.prototype.toString = function() {
    return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]";
  }, t.prototype.updateLocalTransform = function() {
    var r = this.localTransform;
    this._localID !== this._currentLocalID && (r.a = this._cx * this.scale.x, r.b = this._sx * this.scale.x, r.c = this._cy * this.scale.y, r.d = this._sy * this.scale.y, r.tx = this.position.x - (this.pivot.x * r.a + this.pivot.y * r.c), r.ty = this.position.y - (this.pivot.x * r.b + this.pivot.y * r.d), this._currentLocalID = this._localID, this._parentID = -1);
  }, t.prototype.updateTransform = function(r) {
    var e = this.localTransform;
    if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== r._worldID) {
      var i = r.worldTransform, n = this.worldTransform;
      n.a = e.a * i.a + e.b * i.c, n.b = e.a * i.b + e.b * i.d, n.c = e.c * i.a + e.d * i.c, n.d = e.c * i.b + e.d * i.d, n.tx = e.tx * i.a + e.ty * i.c + i.tx, n.ty = e.tx * i.b + e.ty * i.d + i.ty, this._parentID = r._worldID, this._worldID++;
    }
  }, t.prototype.setFromMatrix = function(r) {
    r.decompose(this), this._localID++;
  }, Object.defineProperty(t.prototype, "rotation", {
    get: function() {
      return this._rotation;
    },
    set: function(r) {
      this._rotation !== r && (this._rotation = r, this.updateSkew());
    },
    enumerable: !1,
    configurable: !0
  }), t.IDENTITY = new t(), t;
}();
/*!
 * @pixi/display - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
O.SORTABLE_CHILDREN = !1;
var Ai = function() {
  function t() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
  }
  return t.prototype.isEmpty = function() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }, t.prototype.clear = function() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
  }, t.prototype.getRectangle = function(r) {
    return this.minX > this.maxX || this.minY > this.maxY ? K.EMPTY : (r = r || new K(0, 0, 1, 1), r.x = this.minX, r.y = this.minY, r.width = this.maxX - this.minX, r.height = this.maxY - this.minY, r);
  }, t.prototype.addPoint = function(r) {
    this.minX = Math.min(this.minX, r.x), this.maxX = Math.max(this.maxX, r.x), this.minY = Math.min(this.minY, r.y), this.maxY = Math.max(this.maxY, r.y);
  }, t.prototype.addPointMatrix = function(r, e) {
    var i = r.a, n = r.b, a = r.c, s = r.d, o = r.tx, h = r.ty, u = i * e.x + a * e.y + o, l = n * e.x + s * e.y + h;
    this.minX = Math.min(this.minX, u), this.maxX = Math.max(this.maxX, u), this.minY = Math.min(this.minY, l), this.maxY = Math.max(this.maxY, l);
  }, t.prototype.addQuad = function(r) {
    var e = this.minX, i = this.minY, n = this.maxX, a = this.maxY, s = r[0], o = r[1];
    e = s < e ? s : e, i = o < i ? o : i, n = s > n ? s : n, a = o > a ? o : a, s = r[2], o = r[3], e = s < e ? s : e, i = o < i ? o : i, n = s > n ? s : n, a = o > a ? o : a, s = r[4], o = r[5], e = s < e ? s : e, i = o < i ? o : i, n = s > n ? s : n, a = o > a ? o : a, s = r[6], o = r[7], e = s < e ? s : e, i = o < i ? o : i, n = s > n ? s : n, a = o > a ? o : a, this.minX = e, this.minY = i, this.maxX = n, this.maxY = a;
  }, t.prototype.addFrame = function(r, e, i, n, a) {
    this.addFrameMatrix(r.worldTransform, e, i, n, a);
  }, t.prototype.addFrameMatrix = function(r, e, i, n, a) {
    var s = r.a, o = r.b, h = r.c, u = r.d, l = r.tx, f = r.ty, c = this.minX, d = this.minY, p = this.maxX, v = this.maxY, _ = s * e + h * i + l, m = o * e + u * i + f;
    c = _ < c ? _ : c, d = m < d ? m : d, p = _ > p ? _ : p, v = m > v ? m : v, _ = s * n + h * i + l, m = o * n + u * i + f, c = _ < c ? _ : c, d = m < d ? m : d, p = _ > p ? _ : p, v = m > v ? m : v, _ = s * e + h * a + l, m = o * e + u * a + f, c = _ < c ? _ : c, d = m < d ? m : d, p = _ > p ? _ : p, v = m > v ? m : v, _ = s * n + h * a + l, m = o * n + u * a + f, c = _ < c ? _ : c, d = m < d ? m : d, p = _ > p ? _ : p, v = m > v ? m : v, this.minX = c, this.minY = d, this.maxX = p, this.maxY = v;
  }, t.prototype.addVertexData = function(r, e, i) {
    for (var n = this.minX, a = this.minY, s = this.maxX, o = this.maxY, h = e; h < i; h += 2) {
      var u = r[h], l = r[h + 1];
      n = u < n ? u : n, a = l < a ? l : a, s = u > s ? u : s, o = l > o ? l : o;
    }
    this.minX = n, this.minY = a, this.maxX = s, this.maxY = o;
  }, t.prototype.addVertices = function(r, e, i, n) {
    this.addVerticesMatrix(r.worldTransform, e, i, n);
  }, t.prototype.addVerticesMatrix = function(r, e, i, n, a, s) {
    a === void 0 && (a = 0), s === void 0 && (s = a);
    for (var o = r.a, h = r.b, u = r.c, l = r.d, f = r.tx, c = r.ty, d = this.minX, p = this.minY, v = this.maxX, _ = this.maxY, m = i; m < n; m += 2) {
      var y = e[m], g = e[m + 1], T = o * y + u * g + f, b = l * g + h * y + c;
      d = Math.min(d, T - a), v = Math.max(v, T + a), p = Math.min(p, b - s), _ = Math.max(_, b + s);
    }
    this.minX = d, this.minY = p, this.maxX = v, this.maxY = _;
  }, t.prototype.addBounds = function(r) {
    var e = this.minX, i = this.minY, n = this.maxX, a = this.maxY;
    this.minX = r.minX < e ? r.minX : e, this.minY = r.minY < i ? r.minY : i, this.maxX = r.maxX > n ? r.maxX : n, this.maxY = r.maxY > a ? r.maxY : a;
  }, t.prototype.addBoundsMask = function(r, e) {
    var i = r.minX > e.minX ? r.minX : e.minX, n = r.minY > e.minY ? r.minY : e.minY, a = r.maxX < e.maxX ? r.maxX : e.maxX, s = r.maxY < e.maxY ? r.maxY : e.maxY;
    if (i <= a && n <= s) {
      var o = this.minX, h = this.minY, u = this.maxX, l = this.maxY;
      this.minX = i < o ? i : o, this.minY = n < h ? n : h, this.maxX = a > u ? a : u, this.maxY = s > l ? s : l;
    }
  }, t.prototype.addBoundsMatrix = function(r, e) {
    this.addFrameMatrix(e, r.minX, r.minY, r.maxX, r.maxY);
  }, t.prototype.addBoundsArea = function(r, e) {
    var i = r.minX > e.x ? r.minX : e.x, n = r.minY > e.y ? r.minY : e.y, a = r.maxX < e.x + e.width ? r.maxX : e.x + e.width, s = r.maxY < e.y + e.height ? r.maxY : e.y + e.height;
    if (i <= a && n <= s) {
      var o = this.minX, h = this.minY, u = this.maxX, l = this.maxY;
      this.minX = i < o ? i : o, this.minY = n < h ? n : h, this.maxX = a > u ? a : u, this.maxY = s > l ? s : l;
    }
  }, t.prototype.pad = function(r, e) {
    r === void 0 && (r = 0), e === void 0 && (e = r), this.isEmpty() || (this.minX -= r, this.maxX += r, this.minY -= e, this.maxY += e);
  }, t.prototype.addFramePad = function(r, e, i, n, a, s) {
    r -= a, e -= s, i += a, n += s, this.minX = this.minX < r ? this.minX : r, this.maxX = this.maxX > i ? this.maxX : i, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > n ? this.maxY : n;
  }, t;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Wn = function(t, r) {
  return Wn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, Wn(t, r);
};
function Fa(t, r) {
  Wn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var yt = function(t) {
  Fa(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.tempDisplayObjectParent = null, e.transform = new sr(), e.alpha = 1, e.visible = !0, e.renderable = !0, e.cullable = !1, e.cullArea = null, e.parent = null, e.worldAlpha = 1, e._lastSortedIndex = 0, e._zIndex = 0, e.filterArea = null, e.filters = null, e._enabledFilters = null, e._bounds = new Ai(), e._localBounds = null, e._boundsID = 0, e._boundsRect = null, e._localBoundsRect = null, e._mask = null, e._maskRefCount = 0, e._destroyed = !1, e.isSprite = !1, e.isMask = !1, e;
  }
  return r.mixin = function(e) {
    for (var i = Object.keys(e), n = 0; n < i.length; ++n) {
      var a = i[n];
      Object.defineProperty(r.prototype, a, Object.getOwnPropertyDescriptor(e, a));
    }
  }, Object.defineProperty(r.prototype, "destroyed", {
    get: function() {
      return this._destroyed;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._recursivePostUpdateTransform = function() {
    this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
  }, r.prototype.updateTransform = function() {
    this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
  }, r.prototype.getBounds = function(e, i) {
    return e || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), i || (this._boundsRect || (this._boundsRect = new K()), i = this._boundsRect), this._bounds.getRectangle(i);
  }, r.prototype.getLocalBounds = function(e) {
    e || (this._localBoundsRect || (this._localBoundsRect = new K()), e = this._localBoundsRect), this._localBounds || (this._localBounds = new Ai());
    var i = this.transform, n = this.parent;
    this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
    var a = this._bounds, s = this._boundsID;
    this._bounds = this._localBounds;
    var o = this.getBounds(!1, e);
    return this.parent = n, this.transform = i, this._bounds = a, this._bounds.updateID += this._boundsID - s, o;
  }, r.prototype.toGlobal = function(e, i, n) {
    return n === void 0 && (n = !1), n || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(e, i);
  }, r.prototype.toLocal = function(e, i, n, a) {
    return i && (e = i.toGlobal(e, n, a)), a || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(e, n);
  }, r.prototype.setParent = function(e) {
    if (!e || !e.addChild)
      throw new Error("setParent: Argument must be a Container");
    return e.addChild(this), e;
  }, r.prototype.setTransform = function(e, i, n, a, s, o, h, u, l) {
    return e === void 0 && (e = 0), i === void 0 && (i = 0), n === void 0 && (n = 1), a === void 0 && (a = 1), s === void 0 && (s = 0), o === void 0 && (o = 0), h === void 0 && (h = 0), u === void 0 && (u = 0), l === void 0 && (l = 0), this.position.x = e, this.position.y = i, this.scale.x = n || 1, this.scale.y = a || 1, this.rotation = s, this.skew.x = o, this.skew.y = h, this.pivot.x = u, this.pivot.y = l, this;
  }, r.prototype.destroy = function(e) {
    this.parent && this.parent.removeChild(this), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
  }, Object.defineProperty(r.prototype, "_tempDisplayObjectParent", {
    get: function() {
      return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new Uu()), this.tempDisplayObjectParent;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.enableTempParent = function() {
    var e = this.parent;
    return this.parent = this._tempDisplayObjectParent, e;
  }, r.prototype.disableTempParent = function(e) {
    this.parent = e;
  }, Object.defineProperty(r.prototype, "x", {
    get: function() {
      return this.position.x;
    },
    set: function(e) {
      this.transform.position.x = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "y", {
    get: function() {
      return this.position.y;
    },
    set: function(e) {
      this.transform.position.y = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "worldTransform", {
    get: function() {
      return this.transform.worldTransform;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "localTransform", {
    get: function() {
      return this.transform.localTransform;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "position", {
    get: function() {
      return this.transform.position;
    },
    set: function(e) {
      this.transform.position.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "scale", {
    get: function() {
      return this.transform.scale;
    },
    set: function(e) {
      this.transform.scale.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "pivot", {
    get: function() {
      return this.transform.pivot;
    },
    set: function(e) {
      this.transform.pivot.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "skew", {
    get: function() {
      return this.transform.skew;
    },
    set: function(e) {
      this.transform.skew.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "rotation", {
    get: function() {
      return this.transform.rotation;
    },
    set: function(e) {
      this.transform.rotation = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "angle", {
    get: function() {
      return this.transform.rotation * np;
    },
    set: function(e) {
      this.transform.rotation = e * ap;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "zIndex", {
    get: function() {
      return this._zIndex;
    },
    set: function(e) {
      this._zIndex = e, this.parent && (this.parent.sortDirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "worldVisible", {
    get: function() {
      var e = this;
      do {
        if (!e.visible)
          return !1;
        e = e.parent;
      } while (e);
      return !0;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "mask", {
    get: function() {
      return this._mask;
    },
    set: function(e) {
      if (this._mask !== e) {
        if (this._mask) {
          var i = this._mask.isMaskData ? this._mask.maskObject : this._mask;
          i && (i._maskRefCount--, i._maskRefCount === 0 && (i.renderable = !0, i.isMask = !1));
        }
        if (this._mask = e, this._mask) {
          var i = this._mask.isMaskData ? this._mask.maskObject : this._mask;
          i && (i._maskRefCount === 0 && (i.renderable = !1, i.isMask = !0), i._maskRefCount++);
        }
      }
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Mr), Uu = function(t) {
  Fa(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.sortDirty = null, e;
  }
  return r;
}(yt);
yt.prototype.displayObjectUpdateTransform = yt.prototype.updateTransform;
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ls;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(Ls || (Ls = {}));
var Ss;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Ss || (Ss = {}));
var Gs;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Gs || (Gs = {}));
var Bs;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(Bs || (Bs = {}));
var Ms;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Ms || (Ms = {}));
var Ds;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Ds || (Ds = {}));
var ks;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(ks || (ks = {}));
var Hs;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(Hs || (Hs = {}));
var Xs;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(Xs || (Xs = {}));
var Vs;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Vs || (Vs = {}));
var js;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(js || (js = {}));
var zs;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(zs || (zs = {}));
var Ws;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Ws || (Ws = {}));
var $s;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})($s || ($s = {}));
var qs;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(qs || (qs = {}));
var Ys;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Ys || (Ys = {}));
var $n;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})($n || ($n = {}));
var Zs;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(Zs || (Zs = {}));
var Js;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Js || (Js = {}));
var Ks;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Ks || (Ks = {}));
function lp(t, r) {
  return t.zIndex === r.zIndex ? t._lastSortedIndex - r._lastSortedIndex : t.zIndex - r.zIndex;
}
var gt = function(t) {
  Fa(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.children = [], e.sortableChildren = O.SORTABLE_CHILDREN, e.sortDirty = !1, e;
  }
  return r.prototype.onChildrenChange = function(e) {
  }, r.prototype.addChild = function() {
    for (var e = arguments, i = [], n = 0; n < arguments.length; n++)
      i[n] = e[n];
    if (i.length > 1)
      for (var a = 0; a < i.length; a++)
        this.addChild(i[a]);
    else {
      var s = i[0];
      s.parent && s.parent.removeChild(s), s.parent = this, this.sortDirty = !0, s.transform._parentID = -1, this.children.push(s), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", s, this, this.children.length - 1), s.emit("added", this);
    }
    return i[0];
  }, r.prototype.addChildAt = function(e, i) {
    if (i < 0 || i > this.children.length)
      throw new Error(e + "addChildAt: The index " + i + " supplied is out of bounds " + this.children.length);
    return e.parent && e.parent.removeChild(e), e.parent = this, this.sortDirty = !0, e.transform._parentID = -1, this.children.splice(i, 0, e), this._boundsID++, this.onChildrenChange(i), e.emit("added", this), this.emit("childAdded", e, this, i), e;
  }, r.prototype.swapChildren = function(e, i) {
    if (e !== i) {
      var n = this.getChildIndex(e), a = this.getChildIndex(i);
      this.children[n] = i, this.children[a] = e, this.onChildrenChange(n < a ? n : a);
    }
  }, r.prototype.getChildIndex = function(e) {
    var i = this.children.indexOf(e);
    if (i === -1)
      throw new Error("The supplied DisplayObject must be a child of the caller");
    return i;
  }, r.prototype.setChildIndex = function(e, i) {
    if (i < 0 || i >= this.children.length)
      throw new Error("The index " + i + " supplied is out of bounds " + this.children.length);
    var n = this.getChildIndex(e);
    er(this.children, n, 1), this.children.splice(i, 0, e), this.onChildrenChange(i);
  }, r.prototype.getChildAt = function(e) {
    if (e < 0 || e >= this.children.length)
      throw new Error("getChildAt: Index (" + e + ") does not exist.");
    return this.children[e];
  }, r.prototype.removeChild = function() {
    for (var e = arguments, i = [], n = 0; n < arguments.length; n++)
      i[n] = e[n];
    if (i.length > 1)
      for (var a = 0; a < i.length; a++)
        this.removeChild(i[a]);
    else {
      var s = i[0], o = this.children.indexOf(s);
      if (o === -1)
        return null;
      s.parent = null, s.transform._parentID = -1, er(this.children, o, 1), this._boundsID++, this.onChildrenChange(o), s.emit("removed", this), this.emit("childRemoved", s, this, o);
    }
    return i[0];
  }, r.prototype.removeChildAt = function(e) {
    var i = this.getChildAt(e);
    return i.parent = null, i.transform._parentID = -1, er(this.children, e, 1), this._boundsID++, this.onChildrenChange(e), i.emit("removed", this), this.emit("childRemoved", i, this, e), i;
  }, r.prototype.removeChildren = function(e, i) {
    e === void 0 && (e = 0), i === void 0 && (i = this.children.length);
    var n = e, a = i, s = a - n, o;
    if (s > 0 && s <= a) {
      o = this.children.splice(n, s);
      for (var h = 0; h < o.length; ++h)
        o[h].parent = null, o[h].transform && (o[h].transform._parentID = -1);
      this._boundsID++, this.onChildrenChange(e);
      for (var h = 0; h < o.length; ++h)
        o[h].emit("removed", this), this.emit("childRemoved", o[h], this, h);
      return o;
    } else if (s === 0 && this.children.length === 0)
      return [];
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  }, r.prototype.sortChildren = function() {
    for (var e = !1, i = 0, n = this.children.length; i < n; ++i) {
      var a = this.children[i];
      a._lastSortedIndex = i, !e && a.zIndex !== 0 && (e = !0);
    }
    e && this.children.length > 1 && this.children.sort(lp), this.sortDirty = !1;
  }, r.prototype.updateTransform = function() {
    this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    for (var e = 0, i = this.children.length; e < i; ++e) {
      var n = this.children[e];
      n.visible && n.updateTransform();
    }
  }, r.prototype.calculateBounds = function() {
    this._bounds.clear(), this._calculateBounds();
    for (var e = 0; e < this.children.length; e++) {
      var i = this.children[e];
      if (!(!i.visible || !i.renderable))
        if (i.calculateBounds(), i._mask) {
          var n = i._mask.isMaskData ? i._mask.maskObject : i._mask;
          n ? (n.calculateBounds(), this._bounds.addBoundsMask(i._bounds, n._bounds)) : this._bounds.addBounds(i._bounds);
        } else
          i.filterArea ? this._bounds.addBoundsArea(i._bounds, i.filterArea) : this._bounds.addBounds(i._bounds);
    }
    this._bounds.updateID = this._boundsID;
  }, r.prototype.getLocalBounds = function(e, i) {
    i === void 0 && (i = !1);
    var n = t.prototype.getLocalBounds.call(this, e);
    if (!i)
      for (var a = 0, s = this.children.length; a < s; ++a) {
        var o = this.children[a];
        o.visible && o.updateTransform();
      }
    return n;
  }, r.prototype._calculateBounds = function() {
  }, r.prototype._renderWithCulling = function(e) {
    var i = e.renderTexture.sourceFrame;
    if (i.width > 0 && i.height > 0) {
      var n, a;
      if (this.cullArea ? (n = this.cullArea, a = this.worldTransform) : this._render !== r.prototype._render && (n = this.getBounds(!0)), n && i.intersects(n, a))
        this._render(e);
      else if (this.cullArea)
        return;
      for (var s = 0, o = this.children.length; s < o; ++s) {
        var h = this.children[s], u = h.cullable;
        h.cullable = u || !this.cullArea, h.render(e), h.cullable = u;
      }
    }
  }, r.prototype.render = function(e) {
    if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
      if (this._mask || this.filters && this.filters.length)
        this.renderAdvanced(e);
      else if (this.cullable)
        this._renderWithCulling(e);
      else {
        this._render(e);
        for (var i = 0, n = this.children.length; i < n; ++i)
          this.children[i].render(e);
      }
  }, r.prototype.renderAdvanced = function(e) {
    var i = this.filters, n = this._mask;
    if (i) {
      this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
      for (var a = 0; a < i.length; a++)
        i[a].enabled && this._enabledFilters.push(i[a]);
    }
    var s = i && this._enabledFilters && this._enabledFilters.length || n && (!n.isMaskData || n.enabled && (n.autoDetect || n.type !== $n.NONE));
    if (s && e.batch.flush(), i && this._enabledFilters && this._enabledFilters.length && e.filter.push(this, this._enabledFilters), n && e.mask.push(this, this._mask), this.cullable)
      this._renderWithCulling(e);
    else {
      this._render(e);
      for (var a = 0, o = this.children.length; a < o; ++a)
        this.children[a].render(e);
    }
    s && e.batch.flush(), n && e.mask.pop(this), i && this._enabledFilters && this._enabledFilters.length && e.filter.pop();
  }, r.prototype._render = function(e) {
  }, r.prototype.destroy = function(e) {
    t.prototype.destroy.call(this), this.sortDirty = !1;
    var i = typeof e == "boolean" ? e : e && e.children, n = this.removeChildren(0, this.children.length);
    if (i)
      for (var a = 0; a < n.length; ++a)
        n[a].destroy(e);
  }, Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this.scale.x * this.getLocalBounds().width;
    },
    set: function(e) {
      var i = this.getLocalBounds().width;
      i !== 0 ? this.scale.x = e / i : this.scale.x = 1, this._width = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this.scale.y * this.getLocalBounds().height;
    },
    set: function(e) {
      var i = this.getLocalBounds().height;
      i !== 0 ? this.scale.y = e / i : this.scale.y = 1, this._height = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(yt);
gt.prototype.containerUpdateTransform = gt.prototype.updateTransform;
/*!
 * @pixi/extensions - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/extensions is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Tr = function() {
  return Tr = Object.assign || function(r) {
    for (var e = arguments, i, n = 1, a = arguments.length; n < a; n++) {
      i = e[n];
      for (var s in i)
        Object.prototype.hasOwnProperty.call(i, s) && (r[s] = i[s]);
    }
    return r;
  }, Tr.apply(this, arguments);
}, ot;
(function(t) {
  t.Application = "application", t.RendererPlugin = "renderer-webgl-plugin", t.CanvasRendererPlugin = "renderer-canvas-plugin", t.Loader = "loader", t.LoadParser = "load-parser", t.ResolveParser = "resolve-parser", t.CacheParser = "cache-parser", t.DetectionParser = "detection-parser";
})(ot || (ot = {}));
var Qs = function(t) {
  if (typeof t == "function" || typeof t == "object" && t.extension) {
    if (!t.extension)
      throw new Error("Extension class must have an extension object");
    var r = typeof t.extension != "object" ? { type: t.extension } : t.extension;
    t = Tr(Tr({}, r), { ref: t });
  }
  if (typeof t == "object")
    t = Tr({}, t);
  else
    throw new Error("Invalid extension type");
  return typeof t.type == "string" && (t.type = [t.type]), t;
}, fe = {
  _addHandlers: null,
  _removeHandlers: null,
  _queue: {},
  remove: function() {
    for (var t = arguments, r = this, e = [], i = 0; i < arguments.length; i++)
      e[i] = t[i];
    return e.map(Qs).forEach(function(n) {
      n.type.forEach(function(a) {
        var s, o;
        return (o = (s = r._removeHandlers)[a]) === null || o === void 0 ? void 0 : o.call(s, n);
      });
    }), this;
  },
  add: function() {
    for (var t = arguments, r = this, e = [], i = 0; i < arguments.length; i++)
      e[i] = t[i];
    return e.map(Qs).forEach(function(n) {
      n.type.forEach(function(a) {
        var s = r._addHandlers, o = r._queue;
        s[a] ? s[a](n) : (o[a] = o[a] || [], o[a].push(n));
      });
    }), this;
  },
  handle: function(t, r, e) {
    var i = this._addHandlers = this._addHandlers || {}, n = this._removeHandlers = this._removeHandlers || {};
    if (i[t] || n[t])
      throw new Error("Extension type " + t + " already has a handler");
    i[t] = r, n[t] = e;
    var a = this._queue;
    return a[t] && (a[t].forEach(function(s) {
      return r(s);
    }), delete a[t]), this;
  },
  handleByMap: function(t, r) {
    return this.handle(t, function(e) {
      r[e.name] = e.ref;
    }, function(e) {
      delete r[e.name];
    });
  },
  handleByList: function(t, r) {
    return this.handle(t, function(e) {
      var i, n;
      r.push(e.ref), t === ot.Loader && ((n = (i = e.ref).add) === null || n === void 0 || n.call(i));
    }, function(e) {
      var i = r.indexOf(e.ref);
      i !== -1 && r.splice(i, 1);
    });
  }
};
/*!
 * @pixi/runner - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/runner is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Rt = function() {
  function t(r) {
    this.items = [], this._name = r, this._aliasCount = 0;
  }
  return t.prototype.emit = function(r, e, i, n, a, s, o, h) {
    if (arguments.length > 8)
      throw new Error("max arguments reached");
    var u = this, l = u.name, f = u.items;
    this._aliasCount++;
    for (var c = 0, d = f.length; c < d; c++)
      f[c][l](r, e, i, n, a, s, o, h);
    return f === this.items && this._aliasCount--, this;
  }, t.prototype.ensureNonAliasedItems = function() {
    this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
  }, t.prototype.add = function(r) {
    return r[this._name] && (this.ensureNonAliasedItems(), this.remove(r), this.items.push(r)), this;
  }, t.prototype.remove = function(r) {
    var e = this.items.indexOf(r);
    return e !== -1 && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this;
  }, t.prototype.contains = function(r) {
    return this.items.indexOf(r) !== -1;
  }, t.prototype.removeAll = function() {
    return this.ensureNonAliasedItems(), this.items.length = 0, this;
  }, t.prototype.destroy = function() {
    this.removeAll(), this.items = null, this._name = null;
  }, Object.defineProperty(t.prototype, "empty", {
    get: function() {
      return this.items.length === 0;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this._name;
    },
    enumerable: !1,
    configurable: !0
  }), t;
}();
Object.defineProperties(Rt.prototype, {
  dispatch: { value: Rt.prototype.emit },
  run: { value: Rt.prototype.emit }
});
/*!
 * @pixi/ticker - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/ticker is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
O.TARGET_FPMS = 0.06;
var le;
(function(t) {
  t[t.INTERACTION = 50] = "INTERACTION", t[t.HIGH = 25] = "HIGH", t[t.NORMAL = 0] = "NORMAL", t[t.LOW = -25] = "LOW", t[t.UTILITY = -50] = "UTILITY";
})(le || (le = {}));
var tn = function() {
  function t(r, e, i, n) {
    e === void 0 && (e = null), i === void 0 && (i = 0), n === void 0 && (n = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = r, this.context = e, this.priority = i, this.once = n;
  }
  return t.prototype.match = function(r, e) {
    return e === void 0 && (e = null), this.fn === r && this.context === e;
  }, t.prototype.emit = function(r) {
    this.fn && (this.context ? this.fn.call(this.context, r) : this.fn(r));
    var e = this.next;
    return this.once && this.destroy(!0), this._destroyed && (this.next = null), e;
  }, t.prototype.connect = function(r) {
    this.previous = r, r.next && (r.next.previous = this), this.next = r.next, r.next = this;
  }, t.prototype.destroy = function(r) {
    r === void 0 && (r = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    var e = this.next;
    return this.next = r ? null : e, this.previous = null, e;
  }, t;
}(), wt = function() {
  function t() {
    var r = this;
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new tn(null, null, 1 / 0), this.deltaMS = 1 / O.TARGET_FPMS, this.elapsedMS = 1 / O.TARGET_FPMS, this._tick = function(e) {
      r._requestId = null, r.started && (r.update(e), r.started && r._requestId === null && r._head.next && (r._requestId = requestAnimationFrame(r._tick)));
    };
  }
  return t.prototype._requestIfNeeded = function() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }, t.prototype._cancelIfNeeded = function() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }, t.prototype._startIfPossible = function() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }, t.prototype.add = function(r, e, i) {
    return i === void 0 && (i = le.NORMAL), this._addListener(new tn(r, e, i));
  }, t.prototype.addOnce = function(r, e, i) {
    return i === void 0 && (i = le.NORMAL), this._addListener(new tn(r, e, i, !0));
  }, t.prototype._addListener = function(r) {
    var e = this._head.next, i = this._head;
    if (!e)
      r.connect(i);
    else {
      for (; e; ) {
        if (r.priority > e.priority) {
          r.connect(i);
          break;
        }
        i = e, e = e.next;
      }
      r.previous || r.connect(i);
    }
    return this._startIfPossible(), this;
  }, t.prototype.remove = function(r, e) {
    for (var i = this._head.next; i; )
      i.match(r, e) ? i = i.destroy() : i = i.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }, Object.defineProperty(t.prototype, "count", {
    get: function() {
      if (!this._head)
        return 0;
      for (var r = 0, e = this._head; e = e.next; )
        r++;
      return r;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.start = function() {
    this.started || (this.started = !0, this._requestIfNeeded());
  }, t.prototype.stop = function() {
    this.started && (this.started = !1, this._cancelIfNeeded());
  }, t.prototype.destroy = function() {
    if (!this._protected) {
      this.stop();
      for (var r = this._head.next; r; )
        r = r.destroy(!0);
      this._head.destroy(), this._head = null;
    }
  }, t.prototype.update = function(r) {
    r === void 0 && (r = performance.now());
    var e;
    if (r > this.lastTime) {
      if (e = this.elapsedMS = r - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
        var i = r - this._lastFrame | 0;
        if (i < this._minElapsedMS)
          return;
        this._lastFrame = r - i % this._minElapsedMS;
      }
      this.deltaMS = e, this.deltaTime = this.deltaMS * O.TARGET_FPMS;
      for (var n = this._head, a = n.next; a; )
        a = a.emit(this.deltaTime);
      n.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = r;
  }, Object.defineProperty(t.prototype, "FPS", {
    get: function() {
      return 1e3 / this.elapsedMS;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "minFPS", {
    get: function() {
      return 1e3 / this._maxElapsedMS;
    },
    set: function(r) {
      var e = Math.min(this.maxFPS, r), i = Math.min(Math.max(0, e) / 1e3, O.TARGET_FPMS);
      this._maxElapsedMS = 1 / i;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "maxFPS", {
    get: function() {
      return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
    },
    set: function(r) {
      if (r === 0)
        this._minElapsedMS = 0;
      else {
        var e = Math.max(this.minFPS, r);
        this._minElapsedMS = 1 / (e / 1e3);
      }
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "shared", {
    get: function() {
      if (!t._shared) {
        var r = t._shared = new t();
        r.autoStart = !0, r._protected = !0;
      }
      return t._shared;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "system", {
    get: function() {
      if (!t._system) {
        var r = t._system = new t();
        r.autoStart = !0, r._protected = !0;
      }
      return t._system;
    },
    enumerable: !1,
    configurable: !0
  }), t;
}(), fp = function() {
  function t() {
  }
  return t.init = function(r) {
    var e = this;
    r = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, r), Object.defineProperty(this, "ticker", {
      set: function(i) {
        this._ticker && this._ticker.remove(this.render, this), this._ticker = i, i && i.add(this.render, this, le.LOW);
      },
      get: function() {
        return this._ticker;
      }
    }), this.stop = function() {
      e._ticker.stop();
    }, this.start = function() {
      e._ticker.start();
    }, this._ticker = null, this.ticker = r.sharedTicker ? wt.shared : new wt(), r.autoStart && this.start();
  }, t.destroy = function() {
    if (this._ticker) {
      var r = this._ticker;
      this.ticker = null, r.destroy();
    }
  }, t.extension = ot.Application, t;
}();
/*!
 * @pixi/core - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
O.PREFER_ENV = qt.any ? ue.WEBGL : ue.WEBGL2;
O.STRICT_TEXTURE_CACHE = !1;
var qn = [];
function Ou(t, r) {
  if (!t)
    return null;
  var e = "";
  if (typeof t == "string") {
    var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
    i && (e = i[1].toLowerCase());
  }
  for (var n = qn.length - 1; n >= 0; --n) {
    var a = qn[n];
    if (a.test && a.test(t, e))
      return new a(t, r);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Yn = function(t, r) {
  return Yn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, Yn(t, r);
};
function ut(t, r) {
  Yn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Zn = function() {
  return Zn = Object.assign || function(r) {
    for (var e = arguments, i, n = 1, a = arguments.length; n < a; n++) {
      i = e[n];
      for (var s in i)
        Object.prototype.hasOwnProperty.call(i, s) && (r[s] = i[s]);
    }
    return r;
  }, Zn.apply(this, arguments);
};
function cp(t, r) {
  var e = {};
  for (var i in t)
    Object.prototype.hasOwnProperty.call(t, i) && r.indexOf(i) < 0 && (e[i] = t[i]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(t); n < i.length; n++)
      r.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[n]) && (e[i[n]] = t[i[n]]);
  return e;
}
var Fr = function() {
  function t(r, e) {
    r === void 0 && (r = 0), e === void 0 && (e = 0), this._width = r, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new Rt("setRealSize"), this.onUpdate = new Rt("update"), this.onError = new Rt("onError");
  }
  return t.prototype.bind = function(r) {
    this.onResize.add(r), this.onUpdate.add(r), this.onError.add(r), (this._width || this._height) && this.onResize.emit(this._width, this._height);
  }, t.prototype.unbind = function(r) {
    this.onResize.remove(r), this.onUpdate.remove(r), this.onError.remove(r);
  }, t.prototype.resize = function(r, e) {
    (r !== this._width || e !== this._height) && (this._width = r, this._height = e, this.onResize.emit(r, e));
  }, Object.defineProperty(t.prototype, "valid", {
    get: function() {
      return !!this._width && !!this._height;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.update = function() {
    this.destroyed || this.onUpdate.emit();
  }, t.prototype.load = function() {
    return Promise.resolve(this);
  }, Object.defineProperty(t.prototype, "width", {
    get: function() {
      return this._width;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "height", {
    get: function() {
      return this._height;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.style = function(r, e, i) {
    return !1;
  }, t.prototype.dispose = function() {
  }, t.prototype.destroy = function() {
    this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
  }, t.test = function(r, e) {
    return !1;
  }, t;
}(), kr = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this, a = i || {}, s = a.width, o = a.height;
    if (!s || !o)
      throw new Error("BufferResource width or height invalid");
    return n = t.call(this, s, o) || this, n.data = e, n;
  }
  return r.prototype.upload = function(e, i, n) {
    var a = e.gl;
    a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === Xt.UNPACK);
    var s = i.realWidth, o = i.realHeight;
    return n.width === s && n.height === o ? a.texSubImage2D(i.target, 0, 0, 0, s, o, i.format, n.type, this.data) : (n.width = s, n.height = o, a.texImage2D(i.target, 0, n.internalFormat, s, o, 0, i.format, n.type, this.data)), !0;
  }, r.prototype.dispose = function() {
    this.data = null;
  }, r.test = function(e) {
    return e instanceof Float32Array || e instanceof Uint8Array || e instanceof Uint32Array;
  }, r;
}(Fr), dp = {
  scaleMode: he.NEAREST,
  format: P.RGBA,
  alphaMode: Xt.NPM
}, et = function(t) {
  ut(r, t);
  function r(e, i) {
    e === void 0 && (e = null), i === void 0 && (i = null);
    var n = t.call(this) || this;
    i = i || {};
    var a = i.alphaMode, s = i.mipmap, o = i.anisotropicLevel, h = i.scaleMode, u = i.width, l = i.height, f = i.wrapMode, c = i.format, d = i.type, p = i.target, v = i.resolution, _ = i.resourceOptions;
    return e && !(e instanceof Fr) && (e = Ou(e, _), e.internal = !0), n.resolution = v || O.RESOLUTION, n.width = Math.round((u || 0) * n.resolution) / n.resolution, n.height = Math.round((l || 0) * n.resolution) / n.resolution, n._mipmap = s !== void 0 ? s : O.MIPMAP_TEXTURES, n.anisotropicLevel = o !== void 0 ? o : O.ANISOTROPIC_LEVEL, n._wrapMode = f || O.WRAP_MODE, n._scaleMode = h !== void 0 ? h : O.SCALE_MODE, n.format = c || P.RGBA, n.type = d || G.UNSIGNED_BYTE, n.target = p || Pe.TEXTURE_2D, n.alphaMode = a !== void 0 ? a : Xt.UNPACK, n.uid = Fe(), n.touched = 0, n.isPowerOfTwo = !1, n._refreshPOT(), n._glTextures = {}, n.dirtyId = 0, n.dirtyStyleId = 0, n.cacheId = null, n.valid = u > 0 && l > 0, n.textureCacheIds = [], n.destroyed = !1, n.resource = null, n._batchEnabled = 0, n._batchLocation = 0, n.parentTextureArray = null, n.setResource(e), n;
  }
  return Object.defineProperty(r.prototype, "realWidth", {
    get: function() {
      return Math.round(this.width * this.resolution);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "realHeight", {
    get: function() {
      return Math.round(this.height * this.resolution);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "mipmap", {
    get: function() {
      return this._mipmap;
    },
    set: function(e) {
      this._mipmap !== e && (this._mipmap = e, this.dirtyStyleId++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "scaleMode", {
    get: function() {
      return this._scaleMode;
    },
    set: function(e) {
      this._scaleMode !== e && (this._scaleMode = e, this.dirtyStyleId++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "wrapMode", {
    get: function() {
      return this._wrapMode;
    },
    set: function(e) {
      this._wrapMode !== e && (this._wrapMode = e, this.dirtyStyleId++);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.setStyle = function(e, i) {
    var n;
    return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e, n = !0), i !== void 0 && i !== this.mipmap && (this.mipmap = i, n = !0), n && this.dirtyStyleId++, this;
  }, r.prototype.setSize = function(e, i, n) {
    return n = n || this.resolution, this.setRealSize(e * n, i * n, n);
  }, r.prototype.setRealSize = function(e, i, n) {
    return this.resolution = n || this.resolution, this.width = Math.round(e) / this.resolution, this.height = Math.round(i) / this.resolution, this._refreshPOT(), this.update(), this;
  }, r.prototype._refreshPOT = function() {
    this.isPowerOfTwo = As(this.realWidth) && As(this.realHeight);
  }, r.prototype.setResolution = function(e) {
    var i = this.resolution;
    return i === e ? this : (this.resolution = e, this.valid && (this.width = Math.round(this.width * i) / e, this.height = Math.round(this.height * i) / e, this.emit("update", this)), this._refreshPOT(), this);
  }, r.prototype.setResource = function(e) {
    if (this.resource === e)
      return this;
    if (this.resource)
      throw new Error("Resource can be set only once");
    return e.bind(this), this.resource = e, this;
  }, r.prototype.update = function() {
    this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
  }, r.prototype.onError = function(e) {
    this.emit("error", this, e);
  }, r.prototype.destroy = function() {
    this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete ae[this.cacheId], delete Mt[this.cacheId], this.cacheId = null), this.dispose(), r.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
  }, r.prototype.dispose = function() {
    this.emit("dispose", this);
  }, r.prototype.castToBaseTexture = function() {
    return this;
  }, r.from = function(e, i, n) {
    n === void 0 && (n = O.STRICT_TEXTURE_CACHE);
    var a = typeof e == "string", s = null;
    if (a)
      s = e;
    else {
      if (!e._pixiId) {
        var o = i && i.pixiIdPrefix || "pixiid";
        e._pixiId = o + "_" + Fe();
      }
      s = e._pixiId;
    }
    var h = ae[s];
    if (a && n && !h)
      throw new Error('The cacheId "' + s + '" does not exist in BaseTextureCache.');
    return h || (h = new r(e, i), h.cacheId = s, r.addToCache(h, s)), h;
  }, r.fromBuffer = function(e, i, n, a) {
    e = e || new Float32Array(i * n * 4);
    var s = new kr(e, { width: i, height: n }), o = e instanceof Float32Array ? G.FLOAT : G.UNSIGNED_BYTE;
    return new r(s, Object.assign(dp, a || { width: i, height: n, type: o }));
  }, r.addToCache = function(e, i) {
    i && (e.textureCacheIds.indexOf(i) === -1 && e.textureCacheIds.push(i), ae[i] && console.warn("BaseTexture added to the cache with an id [" + i + "] that already had an entry"), ae[i] = e);
  }, r.removeFromCache = function(e) {
    if (typeof e == "string") {
      var i = ae[e];
      if (i) {
        var n = i.textureCacheIds.indexOf(e);
        return n > -1 && i.textureCacheIds.splice(n, 1), delete ae[e], i;
      }
    } else if (e && e.textureCacheIds) {
      for (var a = 0; a < e.textureCacheIds.length; ++a)
        delete ae[e.textureCacheIds[a]];
      return e.textureCacheIds.length = 0, e;
    }
    return null;
  }, r._globalBatch = 0, r;
}(Mr), Fu = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this, a = i || {}, s = a.width, o = a.height;
    n = t.call(this, s, o) || this, n.items = [], n.itemDirtyIds = [];
    for (var h = 0; h < e; h++) {
      var u = new et();
      n.items.push(u), n.itemDirtyIds.push(-2);
    }
    return n.length = e, n._load = null, n.baseTexture = null, n;
  }
  return r.prototype.initFromArray = function(e, i) {
    for (var n = 0; n < this.length; n++)
      !e[n] || (e[n].castToBaseTexture ? this.addBaseTextureAt(e[n].castToBaseTexture(), n) : e[n] instanceof Fr ? this.addResourceAt(e[n], n) : this.addResourceAt(Ou(e[n], i), n));
  }, r.prototype.dispose = function() {
    for (var e = 0, i = this.length; e < i; e++)
      this.items[e].destroy();
    this.items = null, this.itemDirtyIds = null, this._load = null;
  }, r.prototype.addResourceAt = function(e, i) {
    if (!this.items[i])
      throw new Error("Index " + i + " is out of bounds");
    return e.valid && !this.valid && this.resize(e.width, e.height), this.items[i].setResource(e), this;
  }, r.prototype.bind = function(e) {
    if (this.baseTexture !== null)
      throw new Error("Only one base texture per TextureArray is allowed");
    t.prototype.bind.call(this, e);
    for (var i = 0; i < this.length; i++)
      this.items[i].parentTextureArray = e, this.items[i].on("update", e.update, e);
  }, r.prototype.unbind = function(e) {
    t.prototype.unbind.call(this, e);
    for (var i = 0; i < this.length; i++)
      this.items[i].parentTextureArray = null, this.items[i].off("update", e.update, e);
  }, r.prototype.load = function() {
    var e = this;
    if (this._load)
      return this._load;
    var i = this.items.map(function(a) {
      return a.resource;
    }).filter(function(a) {
      return a;
    }), n = i.map(function(a) {
      return a.load();
    });
    return this._load = Promise.all(n).then(function() {
      var a = e.items[0], s = a.realWidth, o = a.realHeight;
      return e.resize(s, o), Promise.resolve(e);
    }), this._load;
  }, r;
}(Fr), pp = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this, a = i || {}, s = a.width, o = a.height, h, u;
    return Array.isArray(e) ? (h = e, u = e.length) : u = e, n = t.call(this, u, { width: s, height: o }) || this, h && n.initFromArray(h, i), n;
  }
  return r.prototype.addBaseTextureAt = function(e, i) {
    if (e.resource)
      this.addResourceAt(e.resource, i);
    else
      throw new Error("ArrayResource does not support RenderTexture");
    return this;
  }, r.prototype.bind = function(e) {
    t.prototype.bind.call(this, e), e.target = Pe.TEXTURE_2D_ARRAY;
  }, r.prototype.upload = function(e, i, n) {
    var a = this, s = a.length, o = a.itemDirtyIds, h = a.items, u = e.gl;
    n.dirtyId < 0 && u.texImage3D(u.TEXTURE_2D_ARRAY, 0, n.internalFormat, this._width, this._height, s, 0, i.format, n.type, null);
    for (var l = 0; l < s; l++) {
      var f = h[l];
      o[l] < f.dirtyId && (o[l] = f.dirtyId, f.valid && u.texSubImage3D(
        u.TEXTURE_2D_ARRAY,
        0,
        0,
        0,
        l,
        f.resource.width,
        f.resource.height,
        1,
        i.format,
        n.type,
        f.resource.source
      ));
    }
    return !0;
  }, r;
}(Fu), ge = function(t) {
  ut(r, t);
  function r(e) {
    var i = this, n = e, a = n.naturalWidth || n.videoWidth || n.width, s = n.naturalHeight || n.videoHeight || n.height;
    return i = t.call(this, a, s) || this, i.source = e, i.noSubImage = !1, i;
  }
  return r.crossOrigin = function(e, i, n) {
    n === void 0 && i.indexOf("data:") !== 0 ? e.crossOrigin = ip(i) : n !== !1 && (e.crossOrigin = typeof n == "string" ? n : "anonymous");
  }, r.prototype.upload = function(e, i, n, a) {
    var s = e.gl, o = i.realWidth, h = i.realHeight;
    if (a = a || this.source, a instanceof HTMLImageElement) {
      if (!a.complete || a.naturalWidth === 0)
        return !1;
    } else if (a instanceof HTMLVideoElement && a.readyState <= 1)
      return !1;
    return s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === Xt.UNPACK), !this.noSubImage && i.target === s.TEXTURE_2D && n.width === o && n.height === h ? s.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, i.format, n.type, a) : (n.width = o, n.height = h, s.texImage2D(i.target, 0, n.internalFormat, i.format, n.type, a)), !0;
  }, r.prototype.update = function() {
    if (!this.destroyed) {
      var e = this.source, i = e.naturalWidth || e.videoWidth || e.width, n = e.naturalHeight || e.videoHeight || e.height;
      this.resize(i, n), t.prototype.update.call(this);
    }
  }, r.prototype.dispose = function() {
    this.source = null;
  }, r;
}(Fr), vp = function(t) {
  ut(r, t);
  function r(e) {
    return t.call(this, e) || this;
  }
  return r.test = function(e) {
    var i = globalThis.OffscreenCanvas;
    return i && e instanceof i ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
  }, r;
}(ge), _p = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this, a = i || {}, s = a.width, o = a.height, h = a.autoLoad, u = a.linkBaseTexture;
    if (e && e.length !== r.SIDES)
      throw new Error("Invalid length. Got " + e.length + ", expected 6");
    n = t.call(this, 6, { width: s, height: o }) || this;
    for (var l = 0; l < r.SIDES; l++)
      n.items[l].target = Pe.TEXTURE_CUBE_MAP_POSITIVE_X + l;
    return n.linkBaseTexture = u !== !1, e && n.initFromArray(e, i), h !== !1 && n.load(), n;
  }
  return r.prototype.bind = function(e) {
    t.prototype.bind.call(this, e), e.target = Pe.TEXTURE_CUBE_MAP;
  }, r.prototype.addBaseTextureAt = function(e, i, n) {
    if (!this.items[i])
      throw new Error("Index " + i + " is out of bounds");
    if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0)
      if (e.resource)
        this.addResourceAt(e.resource, i);
      else
        throw new Error("CubeResource does not support copying of renderTexture.");
    else
      e.target = Pe.TEXTURE_CUBE_MAP_POSITIVE_X + i, e.parentTextureArray = this.baseTexture, this.items[i] = e;
    return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[i] = e, this;
  }, r.prototype.upload = function(e, i, n) {
    for (var a = this.itemDirtyIds, s = 0; s < r.SIDES; s++) {
      var o = this.items[s];
      (a[s] < o.dirtyId || n.dirtyId < i.dirtyId) && (o.valid && o.resource ? (o.resource.upload(e, o, n), a[s] = o.dirtyId) : a[s] < -1 && (e.gl.texImage2D(o.target, 0, n.internalFormat, i.realWidth, i.realHeight, 0, i.format, n.type, null), a[s] = -1));
    }
    return !0;
  }, r.test = function(e) {
    return Array.isArray(e) && e.length === r.SIDES;
  }, r.SIDES = 6, r;
}(Fu), Lu = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this;
    if (i = i || {}, !(e instanceof HTMLImageElement)) {
      var a = new Image();
      ge.crossOrigin(a, e, i.crossorigin), a.src = e, e = a;
    }
    return n = t.call(this, e) || this, !e.complete && !!n._width && !!n._height && (n._width = 0, n._height = 0), n.url = e.src, n._process = null, n.preserveBitmap = !1, n.createBitmap = (i.createBitmap !== void 0 ? i.createBitmap : O.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, n.alphaMode = typeof i.alphaMode == "number" ? i.alphaMode : null, n.bitmap = null, n._load = null, i.autoLoad !== !1 && n.load(), n;
  }
  return r.prototype.load = function(e) {
    var i = this;
    return this._load ? this._load : (e !== void 0 && (this.createBitmap = e), this._load = new Promise(function(n, a) {
      var s = i.source;
      i.url = s.src;
      var o = function() {
        i.destroyed || (s.onload = null, s.onerror = null, i.resize(s.width, s.height), i._load = null, i.createBitmap ? n(i.process()) : n(i));
      };
      s.complete && s.src ? o() : (s.onload = o, s.onerror = function(h) {
        a(h), i.onError.emit(h);
      });
    }), this._load);
  }, r.prototype.process = function() {
    var e = this, i = this.source;
    if (this._process !== null)
      return this._process;
    if (this.bitmap !== null || !globalThis.createImageBitmap)
      return Promise.resolve(this);
    var n = globalThis.createImageBitmap, a = !i.crossOrigin || i.crossOrigin === "anonymous";
    return this._process = fetch(i.src, {
      mode: a ? "cors" : "no-cors"
    }).then(function(s) {
      return s.blob();
    }).then(function(s) {
      return n(s, 0, 0, i.width, i.height, {
        premultiplyAlpha: e.alphaMode === Xt.UNPACK ? "premultiply" : "none"
      });
    }).then(function(s) {
      return e.destroyed ? Promise.reject() : (e.bitmap = s, e.update(), e._process = null, Promise.resolve(e));
    }), this._process;
  }, r.prototype.upload = function(e, i, n) {
    if (typeof this.alphaMode == "number" && (i.alphaMode = this.alphaMode), !this.createBitmap)
      return t.prototype.upload.call(this, e, i, n);
    if (!this.bitmap && (this.process(), !this.bitmap))
      return !1;
    if (t.prototype.upload.call(this, e, i, n, this.bitmap), !this.preserveBitmap) {
      var a = !0, s = i._glTextures;
      for (var o in s) {
        var h = s[o];
        if (h !== n && h.dirtyId !== i.dirtyId) {
          a = !1;
          break;
        }
      }
      a && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
    }
    return !0;
  }, r.prototype.dispose = function() {
    this.source.onload = null, this.source.onerror = null, t.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
  }, r.test = function(e) {
    return typeof e == "string" || e instanceof HTMLImageElement;
  }, r;
}(ge), mp = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this;
    return i = i || {}, n = t.call(this, O.ADAPTER.createCanvas()) || this, n._width = 0, n._height = 0, n.svg = e, n.scale = i.scale || 1, n._overrideWidth = i.width, n._overrideHeight = i.height, n._resolve = null, n._crossorigin = i.crossorigin, n._load = null, i.autoLoad !== !1 && n.load(), n;
  }
  return r.prototype.load = function() {
    var e = this;
    return this._load ? this._load : (this._load = new Promise(function(i) {
      if (e._resolve = function() {
        e.resize(e.source.width, e.source.height), i(e);
      }, r.SVG_XML.test(e.svg.trim())) {
        if (!btoa)
          throw new Error("Your browser doesn't support base64 conversions.");
        e.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e.svg)));
      }
      e._loadSvg();
    }), this._load);
  }, r.prototype._loadSvg = function() {
    var e = this, i = new Image();
    ge.crossOrigin(i, this.svg, this._crossorigin), i.src = this.svg, i.onerror = function(n) {
      !e._resolve || (i.onerror = null, e.onError.emit(n));
    }, i.onload = function() {
      if (!!e._resolve) {
        var n = i.width, a = i.height;
        if (!n || !a)
          throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
        var s = n * e.scale, o = a * e.scale;
        (e._overrideWidth || e._overrideHeight) && (s = e._overrideWidth || e._overrideHeight / a * n, o = e._overrideHeight || e._overrideWidth / n * a), s = Math.round(s), o = Math.round(o);
        var h = e.source;
        h.width = s, h.height = o, h._pixiId = "canvas_" + Fe(), h.getContext("2d").drawImage(i, 0, 0, n, a, 0, 0, s, o), e._resolve(), e._resolve = null;
      }
    };
  }, r.getSize = function(e) {
    var i = r.SVG_SIZE.exec(e), n = {};
    return i && (n[i[1]] = Math.round(parseFloat(i[3])), n[i[5]] = Math.round(parseFloat(i[7]))), n;
  }, r.prototype.dispose = function() {
    t.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
  }, r.test = function(e, i) {
    return i === "svg" || typeof e == "string" && e.startsWith("data:image/svg+xml") || typeof e == "string" && r.SVG_XML.test(e);
  }, r.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, r.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, r;
}(ge), yp = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = this;
    if (i = i || {}, !(e instanceof HTMLVideoElement)) {
      var a = document.createElement("video");
      a.setAttribute("preload", "auto"), a.setAttribute("webkit-playsinline", ""), a.setAttribute("playsinline", ""), typeof e == "string" && (e = [e]);
      var s = e[0].src || e[0];
      ge.crossOrigin(a, s, i.crossorigin);
      for (var o = 0; o < e.length; ++o) {
        var h = document.createElement("source"), u = e[o], l = u.src, f = u.mime;
        l = l || e[o];
        var c = l.split("?").shift().toLowerCase(), d = c.slice(c.lastIndexOf(".") + 1);
        f = f || r.MIME_TYPES[d] || "video/" + d, h.src = l, h.type = f, a.appendChild(h);
      }
      e = a;
    }
    return n = t.call(this, e) || this, n.noSubImage = !0, n._autoUpdate = !0, n._isConnectedToTicker = !1, n._updateFPS = i.updateFPS || 0, n._msToNextUpdate = 0, n.autoPlay = i.autoPlay !== !1, n._load = null, n._resolve = null, n._onCanPlay = n._onCanPlay.bind(n), n._onError = n._onError.bind(n), i.autoLoad !== !1 && n.load(), n;
  }
  return r.prototype.update = function(e) {
    if (!this.destroyed) {
      var i = wt.shared.elapsedMS * this.source.playbackRate;
      this._msToNextUpdate = Math.floor(this._msToNextUpdate - i), (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
    }
  }, r.prototype.load = function() {
    var e = this;
    if (this._load)
      return this._load;
    var i = this.source;
    return (i.readyState === i.HAVE_ENOUGH_DATA || i.readyState === i.HAVE_FUTURE_DATA) && i.width && i.height && (i.complete = !0), i.addEventListener("play", this._onPlayStart.bind(this)), i.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (i.addEventListener("canplay", this._onCanPlay), i.addEventListener("canplaythrough", this._onCanPlay), i.addEventListener("error", this._onError, !0)), this._load = new Promise(function(n) {
      e.valid ? n(e) : (e._resolve = n, i.load());
    }), this._load;
  }, r.prototype._onError = function(e) {
    this.source.removeEventListener("error", this._onError, !0), this.onError.emit(e);
  }, r.prototype._isSourcePlaying = function() {
    var e = this.source;
    return e.currentTime > 0 && e.paused === !1 && e.ended === !1 && e.readyState > 2;
  }, r.prototype._isSourceReady = function() {
    var e = this.source;
    return e.readyState === 3 || e.readyState === 4;
  }, r.prototype._onPlayStart = function() {
    this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (wt.shared.add(this.update, this), this._isConnectedToTicker = !0);
  }, r.prototype._onPlayStop = function() {
    this._isConnectedToTicker && (wt.shared.remove(this.update, this), this._isConnectedToTicker = !1);
  }, r.prototype._onCanPlay = function() {
    var e = this.source;
    e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
    var i = this.valid;
    this.resize(e.videoWidth, e.videoHeight), !i && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
  }, r.prototype.dispose = function() {
    this._isConnectedToTicker && (wt.shared.remove(this.update, this), this._isConnectedToTicker = !1);
    var e = this.source;
    e && (e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), t.prototype.dispose.call(this);
  }, Object.defineProperty(r.prototype, "autoUpdate", {
    get: function() {
      return this._autoUpdate;
    },
    set: function(e) {
      e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (wt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (wt.shared.add(this.update, this), this._isConnectedToTicker = !0));
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "updateFPS", {
    get: function() {
      return this._updateFPS;
    },
    set: function(e) {
      e !== this._updateFPS && (this._updateFPS = e);
    },
    enumerable: !1,
    configurable: !0
  }), r.test = function(e, i) {
    return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || r.TYPES.indexOf(i) > -1;
  }, r.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], r.MIME_TYPES = {
    ogv: "video/ogg",
    mov: "video/quicktime",
    m4v: "video/mp4"
  }, r;
}(ge), xp = function(t) {
  ut(r, t);
  function r(e) {
    return t.call(this, e) || this;
  }
  return r.test = function(e) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && e instanceof ImageBitmap;
  }, r;
}(ge);
qn.push(Lu, xp, vp, yp, mp, kr, _p, pp);
var gp = function(t) {
  ut(r, t);
  function r() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return r.prototype.upload = function(e, i, n) {
    var a = e.gl;
    a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === Xt.UNPACK);
    var s = i.realWidth, o = i.realHeight;
    return n.width === s && n.height === o ? a.texSubImage2D(i.target, 0, 0, 0, s, o, i.format, n.type, this.data) : (n.width = s, n.height = o, a.texImage2D(i.target, 0, n.internalFormat, s, o, 0, i.format, n.type, this.data)), !0;
  }, r;
}(kr), Jn = function() {
  function t(r, e) {
    this.width = Math.round(r || 100), this.height = Math.round(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Rt("disposeFramebuffer"), this.multisample = xt.NONE;
  }
  return Object.defineProperty(t.prototype, "colorTexture", {
    get: function() {
      return this.colorTextures[0];
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.addColorTexture = function(r, e) {
    return r === void 0 && (r = 0), this.colorTextures[r] = e || new et(null, {
      scaleMode: he.NEAREST,
      resolution: 1,
      mipmap: te.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }, t.prototype.addDepthTexture = function(r) {
    return this.depthTexture = r || new et(new gp(null, { width: this.width, height: this.height }), {
      scaleMode: he.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: te.OFF,
      format: P.DEPTH_COMPONENT,
      type: G.UNSIGNED_SHORT
    }), this.dirtyId++, this.dirtyFormat++, this;
  }, t.prototype.enableDepth = function() {
    return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
  }, t.prototype.enableStencil = function() {
    return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
  }, t.prototype.resize = function(r, e) {
    if (r = Math.round(r), e = Math.round(e), !(r === this.width && e === this.height)) {
      this.width = r, this.height = e, this.dirtyId++, this.dirtySize++;
      for (var i = 0; i < this.colorTextures.length; i++) {
        var n = this.colorTextures[i], a = n.resolution;
        n.setSize(r / a, e / a);
      }
      if (this.depthTexture) {
        var a = this.depthTexture.resolution;
        this.depthTexture.setSize(r / a, e / a);
      }
    }
  }, t.prototype.dispose = function() {
    this.disposeRunner.emit(this, !1);
  }, t.prototype.destroyDepthTexture = function() {
    this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
  }, t;
}(), Su = function(t) {
  ut(r, t);
  function r(e) {
    e === void 0 && (e = {});
    var i = this;
    if (typeof e == "number") {
      var n = arguments[0], a = arguments[1], s = arguments[2], o = arguments[3];
      e = { width: n, height: a, scaleMode: s, resolution: o };
    }
    return e.width = e.width || 100, e.height = e.height || 100, e.multisample = e.multisample !== void 0 ? e.multisample : xt.NONE, i = t.call(this, null, e) || this, i.mipmap = te.OFF, i.valid = !0, i.clearColor = [0, 0, 0, 0], i.framebuffer = new Jn(i.realWidth, i.realHeight).addColorTexture(0, i), i.framebuffer.multisample = e.multisample, i.maskStack = [], i.filterStack = [{}], i;
  }
  return r.prototype.resize = function(e, i) {
    this.framebuffer.resize(e * this.resolution, i * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }, r.prototype.dispose = function() {
    this.framebuffer.dispose(), t.prototype.dispose.call(this);
  }, r.prototype.destroy = function() {
    t.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
  }, r;
}(et), Gu = function() {
  function t() {
    this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
  }
  return t.prototype.set = function(r, e, i) {
    var n = e.width, a = e.height;
    if (i) {
      var s = r.width / 2 / n, o = r.height / 2 / a, h = r.x / n + s, u = r.y / a + o;
      i = ct.add(i, ct.NW), this.x0 = h + s * ct.uX(i), this.y0 = u + o * ct.uY(i), i = ct.add(i, 2), this.x1 = h + s * ct.uX(i), this.y1 = u + o * ct.uY(i), i = ct.add(i, 2), this.x2 = h + s * ct.uX(i), this.y2 = u + o * ct.uY(i), i = ct.add(i, 2), this.x3 = h + s * ct.uX(i), this.y3 = u + o * ct.uY(i);
    } else
      this.x0 = r.x / n, this.y0 = r.y / a, this.x1 = (r.x + r.width) / n, this.y1 = r.y / a, this.x2 = (r.x + r.width) / n, this.y2 = (r.y + r.height) / a, this.x3 = r.x / n, this.y3 = (r.y + r.height) / a;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }, t.prototype.toString = function() {
    return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]";
  }, t;
}(), to = new Gu();
function ti(t) {
  t.destroy = function() {
  }, t.on = function() {
  }, t.once = function() {
  }, t.emit = function() {
  };
}
var z = function(t) {
  ut(r, t);
  function r(e, i, n, a, s, o) {
    var h = t.call(this) || this;
    if (h.noFrame = !1, i || (h.noFrame = !0, i = new K(0, 0, 1, 1)), e instanceof r && (e = e.baseTexture), h.baseTexture = e, h._frame = i, h.trim = a, h.valid = !1, h._uvs = to, h.uvMatrix = null, h.orig = n || i, h._rotate = Number(s || 0), s === !0)
      h._rotate = 2;
    else if (h._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    return h.defaultAnchor = o ? new $(o.x, o.y) : new $(0, 0), h._updateID = 0, h.textureCacheIds = [], e.valid ? h.noFrame ? e.valid && h.onBaseTextureUpdated(e) : h.frame = i : e.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && e.on("update", h.onBaseTextureUpdated, h), h;
  }
  return r.prototype.update = function() {
    this.baseTexture.resource && this.baseTexture.resource.update();
  }, r.prototype.onBaseTextureUpdated = function(e) {
    if (this.noFrame) {
      if (!this.baseTexture.valid)
        return;
      this._frame.width = e.width, this._frame.height = e.height, this.valid = !0, this.updateUvs();
    } else
      this.frame = this._frame;
    this.emit("update", this);
  }, r.prototype.destroy = function(e) {
    if (this.baseTexture) {
      if (e) {
        var i = this.baseTexture.resource;
        i && i.url && Mt[i.url] && r.removeFromCache(i.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, r.removeFromCache(this), this.textureCacheIds = null;
  }, r.prototype.clone = function() {
    var e = this._frame.clone(), i = this._frame === this.orig ? e : this.orig.clone(), n = new r(this.baseTexture, !this.noFrame && e, i, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
    return this.noFrame && (n._frame = e), n;
  }, r.prototype.updateUvs = function() {
    this._uvs === to && (this._uvs = new Gu()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
  }, r.from = function(e, i, n) {
    i === void 0 && (i = {}), n === void 0 && (n = O.STRICT_TEXTURE_CACHE);
    var a = typeof e == "string", s = null;
    if (a)
      s = e;
    else if (e instanceof et) {
      if (!e.cacheId) {
        var o = i && i.pixiIdPrefix || "pixiid";
        e.cacheId = o + "-" + Fe(), et.addToCache(e, e.cacheId);
      }
      s = e.cacheId;
    } else {
      if (!e._pixiId) {
        var o = i && i.pixiIdPrefix || "pixiid";
        e._pixiId = o + "_" + Fe();
      }
      s = e._pixiId;
    }
    var h = Mt[s];
    if (a && n && !h)
      throw new Error('The cacheId "' + s + '" does not exist in TextureCache.');
    return !h && !(e instanceof et) ? (i.resolution || (i.resolution = Ci(e)), h = new r(new et(e, i)), h.baseTexture.cacheId = s, et.addToCache(h.baseTexture, s), r.addToCache(h, s)) : !h && e instanceof et && (h = new r(e), r.addToCache(h, s)), h;
  }, r.fromURL = function(e, i) {
    var n = Object.assign({ autoLoad: !1 }, i == null ? void 0 : i.resourceOptions), a = r.from(e, Object.assign({ resourceOptions: n }, i), !1), s = a.baseTexture.resource;
    return a.baseTexture.valid ? Promise.resolve(a) : s.load().then(function() {
      return Promise.resolve(a);
    });
  }, r.fromBuffer = function(e, i, n, a) {
    return new r(et.fromBuffer(e, i, n, a));
  }, r.fromLoader = function(e, i, n, a) {
    var s = new et(e, Object.assign({
      scaleMode: O.SCALE_MODE,
      resolution: Ci(i)
    }, a)), o = s.resource;
    o instanceof Lu && (o.url = i);
    var h = new r(s);
    return n || (n = i), et.addToCache(h.baseTexture, n), r.addToCache(h, n), n !== i && (et.addToCache(h.baseTexture, i), r.addToCache(h, i)), h.baseTexture.valid ? Promise.resolve(h) : new Promise(function(u) {
      h.baseTexture.once("loaded", function() {
        return u(h);
      });
    });
  }, r.addToCache = function(e, i) {
    i && (e.textureCacheIds.indexOf(i) === -1 && e.textureCacheIds.push(i), Mt[i] && console.warn("Texture added to the cache with an id [" + i + "] that already had an entry"), Mt[i] = e);
  }, r.removeFromCache = function(e) {
    if (typeof e == "string") {
      var i = Mt[e];
      if (i) {
        var n = i.textureCacheIds.indexOf(e);
        return n > -1 && i.textureCacheIds.splice(n, 1), delete Mt[e], i;
      }
    } else if (e && e.textureCacheIds) {
      for (var a = 0; a < e.textureCacheIds.length; ++a)
        Mt[e.textureCacheIds[a]] === e && delete Mt[e.textureCacheIds[a]];
      return e.textureCacheIds.length = 0, e;
    }
    return null;
  }, Object.defineProperty(r.prototype, "resolution", {
    get: function() {
      return this.baseTexture.resolution;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "frame", {
    get: function() {
      return this._frame;
    },
    set: function(e) {
      this._frame = e, this.noFrame = !1;
      var i = e.x, n = e.y, a = e.width, s = e.height, o = i + a > this.baseTexture.width, h = n + s > this.baseTexture.height;
      if (o || h) {
        var u = o && h ? "and" : "or", l = "X: " + i + " + " + a + " = " + (i + a) + " > " + this.baseTexture.width, f = "Y: " + n + " + " + s + " = " + (n + s) + " > " + this.baseTexture.height;
        throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (l + " " + u + " " + f));
      }
      this.valid = a && s && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "rotate", {
    get: function() {
      return this._rotate;
    },
    set: function(e) {
      this._rotate = e, this.valid && this.updateUvs();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this.orig.width;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this.orig.height;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.castToBaseTexture = function() {
    return this.baseTexture;
  }, Object.defineProperty(r, "EMPTY", {
    get: function() {
      return r._EMPTY || (r._EMPTY = new r(new et()), ti(r._EMPTY), ti(r._EMPTY.baseTexture)), r._EMPTY;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r, "WHITE", {
    get: function() {
      if (!r._WHITE) {
        var e = O.ADAPTER.createCanvas(16, 16), i = e.getContext("2d");
        e.width = 16, e.height = 16, i.fillStyle = "white", i.fillRect(0, 0, 16, 16), r._WHITE = new r(et.from(e)), ti(r._WHITE), ti(r._WHITE.baseTexture);
      }
      return r._WHITE;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Mr), Le = function(t) {
  ut(r, t);
  function r(e, i) {
    var n = t.call(this, e, i) || this;
    return n.valid = !0, n.filterFrame = null, n.filterPoolKey = null, n.updateUvs(), n;
  }
  return Object.defineProperty(r.prototype, "framebuffer", {
    get: function() {
      return this.baseTexture.framebuffer;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "multisample", {
    get: function() {
      return this.framebuffer.multisample;
    },
    set: function(e) {
      this.framebuffer.multisample = e;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.resize = function(e, i, n) {
    n === void 0 && (n = !0);
    var a = this.baseTexture.resolution, s = Math.round(e * a) / a, o = Math.round(i * a) / a;
    this.valid = s > 0 && o > 0, this._frame.width = this.orig.width = s, this._frame.height = this.orig.height = o, n && this.baseTexture.resize(s, o), this.updateUvs();
  }, r.prototype.setResolution = function(e) {
    var i = this.baseTexture;
    i.resolution !== e && (i.setResolution(e), this.resize(i.width, i.height, !1));
  }, r.create = function(e) {
    for (var i = arguments, n = [], a = 1; a < arguments.length; a++)
      n[a - 1] = i[a];
    return typeof e == "number" && (Kt("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), e = {
      width: e,
      height: n[0],
      scaleMode: n[1],
      resolution: n[2]
    }), new r(new Su(e));
  }, r;
}(z), bp = function() {
  function t(r) {
    this.texturePool = {}, this.textureOptions = r || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
  }
  return t.prototype.createTexture = function(r, e, i) {
    i === void 0 && (i = xt.NONE);
    var n = new Su(Object.assign({
      width: r,
      height: e,
      resolution: 1,
      multisample: i
    }, this.textureOptions));
    return new Le(n);
  }, t.prototype.getOptimalTexture = function(r, e, i, n) {
    i === void 0 && (i = 1), n === void 0 && (n = xt.NONE);
    var a;
    r = Math.ceil(r * i - 1e-6), e = Math.ceil(e * i - 1e-6), !this.enableFullScreen || r !== this._pixelsWidth || e !== this._pixelsHeight ? (r = Ri(r), e = Ri(e), a = ((r & 65535) << 16 | e & 65535) >>> 0, n > 1 && (a += n * 4294967296)) : a = n > 1 ? -n : -1, this.texturePool[a] || (this.texturePool[a] = []);
    var s = this.texturePool[a].pop();
    return s || (s = this.createTexture(r, e, n)), s.filterPoolKey = a, s.setResolution(i), s;
  }, t.prototype.getFilterTexture = function(r, e, i) {
    var n = this.getOptimalTexture(r.width, r.height, e || r.resolution, i || xt.NONE);
    return n.filterFrame = r.filterFrame, n;
  }, t.prototype.returnTexture = function(r) {
    var e = r.filterPoolKey;
    r.filterFrame = null, this.texturePool[e].push(r);
  }, t.prototype.returnFilterTexture = function(r) {
    this.returnTexture(r);
  }, t.prototype.clear = function(r) {
    if (r = r !== !1, r)
      for (var e in this.texturePool) {
        var i = this.texturePool[e];
        if (i)
          for (var n = 0; n < i.length; n++)
            i[n].destroy(!0);
      }
    this.texturePool = {};
  }, t.prototype.setScreenSize = function(r) {
    if (!(r.width === this._pixelsWidth && r.height === this._pixelsHeight)) {
      this.enableFullScreen = r.width > 0 && r.height > 0;
      for (var e in this.texturePool)
        if (Number(e) < 0) {
          var i = this.texturePool[e];
          if (i)
            for (var n = 0; n < i.length; n++)
              i[n].destroy(!0);
          this.texturePool[e] = [];
        }
      this._pixelsWidth = r.width, this._pixelsHeight = r.height;
    }
  }, t.SCREEN_KEY = -1, t;
}(), eo = function() {
  function t(r, e, i, n, a, s, o) {
    e === void 0 && (e = 0), i === void 0 && (i = !1), n === void 0 && (n = G.FLOAT), this.buffer = r, this.size = e, this.normalized = i, this.type = n, this.stride = a, this.start = s, this.instance = o;
  }
  return t.prototype.destroy = function() {
    this.buffer = null;
  }, t.from = function(r, e, i, n, a) {
    return new t(r, e, i, n, a);
  }, t;
}(), Tp = 0, dt = function() {
  function t(r, e, i) {
    e === void 0 && (e = !0), i === void 0 && (i = !1), this.data = r || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = i, this.static = e, this.id = Tp++, this.disposeRunner = new Rt("disposeBuffer");
  }
  return t.prototype.update = function(r) {
    r instanceof Array && (r = new Float32Array(r)), this.data = r || this.data, this._updateID++;
  }, t.prototype.dispose = function() {
    this.disposeRunner.emit(this, !1);
  }, t.prototype.destroy = function() {
    this.dispose(), this.data = null;
  }, Object.defineProperty(t.prototype, "index", {
    get: function() {
      return this.type === Jt.ELEMENT_ARRAY_BUFFER;
    },
    set: function(r) {
      this.type = r ? Jt.ELEMENT_ARRAY_BUFFER : Jt.ARRAY_BUFFER;
    },
    enumerable: !1,
    configurable: !0
  }), t.from = function(r) {
    return r instanceof Array && (r = new Float32Array(r)), new t(r);
  }, t;
}(), Ip = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function Ep(t, r) {
  for (var e = 0, i = 0, n = {}, a = 0; a < t.length; a++)
    i += r[a], e += t[a].length;
  for (var s = new ArrayBuffer(e * 4), o = null, h = 0, a = 0; a < t.length; a++) {
    var u = r[a], l = t[a], f = Au(l);
    n[f] || (n[f] = new Ip[f](s)), o = n[f];
    for (var c = 0; c < l.length; c++) {
      var d = (c / u | 0) * i + h, p = c % u;
      o[d + p] = l[c];
    }
    h += u;
  }
  return new Float32Array(s);
}
var ro = { 5126: 4, 5123: 2, 5121: 1 }, wp = 0, Rp = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
}, Be = function() {
  function t(r, e) {
    r === void 0 && (r = []), e === void 0 && (e = {}), this.buffers = r, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = wp++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Rt("disposeGeometry"), this.refCount = 0;
  }
  return t.prototype.addAttribute = function(r, e, i, n, a, s, o, h) {
    if (i === void 0 && (i = 0), n === void 0 && (n = !1), h === void 0 && (h = !1), !e)
      throw new Error("You must pass a buffer when creating an attribute");
    e instanceof dt || (e instanceof Array && (e = new Float32Array(e)), e = new dt(e));
    var u = r.split("|");
    if (u.length > 1) {
      for (var l = 0; l < u.length; l++)
        this.addAttribute(u[l], e, i, n, a);
      return this;
    }
    var f = this.buffers.indexOf(e);
    return f === -1 && (this.buffers.push(e), f = this.buffers.length - 1), this.attributes[r] = new eo(f, i, n, a, s, o, h), this.instanced = this.instanced || h, this;
  }, t.prototype.getAttribute = function(r) {
    return this.attributes[r];
  }, t.prototype.getBuffer = function(r) {
    return this.buffers[this.getAttribute(r).buffer];
  }, t.prototype.addIndex = function(r) {
    return r instanceof dt || (r instanceof Array && (r = new Uint16Array(r)), r = new dt(r)), r.type = Jt.ELEMENT_ARRAY_BUFFER, this.indexBuffer = r, this.buffers.indexOf(r) === -1 && this.buffers.push(r), this;
  }, t.prototype.getIndex = function() {
    return this.indexBuffer;
  }, t.prototype.interleave = function() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    var r = [], e = [], i = new dt(), n;
    for (n in this.attributes) {
      var a = this.attributes[n], s = this.buffers[a.buffer];
      r.push(s.data), e.push(a.size * ro[a.type] / 4), a.buffer = 0;
    }
    for (i.data = Ep(r, e), n = 0; n < this.buffers.length; n++)
      this.buffers[n] !== this.indexBuffer && this.buffers[n].destroy();
    return this.buffers = [i], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
  }, t.prototype.getSize = function() {
    for (var r in this.attributes) {
      var e = this.attributes[r], i = this.buffers[e.buffer];
      return i.data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }, t.prototype.dispose = function() {
    this.disposeRunner.emit(this, !1);
  }, t.prototype.destroy = function() {
    this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
  }, t.prototype.clone = function() {
    for (var r = new t(), e = 0; e < this.buffers.length; e++)
      r.buffers[e] = new dt(this.buffers[e].data.slice(0));
    for (var e in this.attributes) {
      var i = this.attributes[e];
      r.attributes[e] = new eo(i.buffer, i.size, i.normalized, i.type, i.stride, i.start, i.instance);
    }
    return this.indexBuffer && (r.indexBuffer = r.buffers[this.buffers.indexOf(this.indexBuffer)], r.indexBuffer.type = Jt.ELEMENT_ARRAY_BUFFER), r;
  }, t.merge = function(r) {
    for (var e = new t(), i = [], n = [], a = [], s, o = 0; o < r.length; o++) {
      s = r[o];
      for (var h = 0; h < s.buffers.length; h++)
        n[h] = n[h] || 0, n[h] += s.buffers[h].data.length, a[h] = 0;
    }
    for (var o = 0; o < s.buffers.length; o++)
      i[o] = new Rp[Au(s.buffers[o].data)](n[o]), e.buffers[o] = new dt(i[o]);
    for (var o = 0; o < r.length; o++) {
      s = r[o];
      for (var h = 0; h < s.buffers.length; h++)
        i[h].set(s.buffers[h].data, a[h]), a[h] += s.buffers[h].data.length;
    }
    if (e.attributes = s.attributes, s.indexBuffer) {
      e.indexBuffer = e.buffers[s.buffers.indexOf(s.indexBuffer)], e.indexBuffer.type = Jt.ELEMENT_ARRAY_BUFFER;
      for (var u = 0, l = 0, f = 0, c = 0, o = 0; o < s.buffers.length; o++)
        if (s.buffers[o] !== s.indexBuffer) {
          c = o;
          break;
        }
      for (var o in s.attributes) {
        var d = s.attributes[o];
        (d.buffer | 0) === c && (l += d.size * ro[d.type] / 4);
      }
      for (var o = 0; o < r.length; o++) {
        for (var p = r[o].indexBuffer.data, h = 0; h < p.length; h++)
          e.indexBuffer.data[h + f] += u;
        u += r[o].buffers[c].data.length / l, f += p.length;
      }
    }
    return e;
  }, t;
}(), Cp = function(t) {
  ut(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]), e;
  }
  return r;
}(Be), La = function(t) {
  ut(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]), e.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]), e.vertexBuffer = new dt(e.vertices), e.uvBuffer = new dt(e.uvs), e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), e;
  }
  return r.prototype.map = function(e, i) {
    var n = 0, a = 0;
    return this.uvs[0] = n, this.uvs[1] = a, this.uvs[2] = n + i.width / e.width, this.uvs[3] = a, this.uvs[4] = n + i.width / e.width, this.uvs[5] = a + i.height / e.height, this.uvs[6] = n, this.uvs[7] = a + i.height / e.height, n = i.x, a = i.y, this.vertices[0] = n, this.vertices[1] = a, this.vertices[2] = n + i.width, this.vertices[3] = a, this.vertices[4] = n + i.width, this.vertices[5] = a + i.height, this.vertices[6] = n, this.vertices[7] = a + i.height, this.invalidate(), this;
  }, r.prototype.invalidate = function() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
  }, r;
}(Be), Np = 0, Ue = function() {
  function t(r, e, i) {
    this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = Np++, this.static = !!e, this.ubo = !!i, r instanceof dt ? (this.buffer = r, this.buffer.type = Jt.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = r, this.ubo && (this.buffer = new dt(new Float32Array(1)), this.buffer.type = Jt.UNIFORM_BUFFER, this.autoManage = !0));
  }
  return t.prototype.update = function() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }, t.prototype.add = function(r, e, i) {
    if (!this.ubo)
      this.uniforms[r] = new t(e, i);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }, t.from = function(r, e, i) {
    return new t(r, e, i);
  }, t.uboFrom = function(r, e) {
    return new t(r, e != null ? e : !0, !0);
  }, t;
}(), Ap = function() {
  function t() {
    this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = xt.NONE, this.sourceFrame = new K(), this.destinationFrame = new K(), this.bindingSourceFrame = new K(), this.bindingDestinationFrame = new K(), this.filters = [], this.transform = null;
  }
  return t.prototype.clear = function() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }, t;
}(), ei = [new $(), new $(), new $(), new $()], en = new ft(), Pp = function() {
  function t(r) {
    this.renderer = r, this.defaultFilterStack = [{}], this.texturePool = new bp(), this.texturePool.setScreenSize(r.view), this.statePool = [], this.quad = new Cp(), this.quadUv = new La(), this.tempRect = new K(), this.activeState = {}, this.globalUniforms = new Ue({
      outputFrame: new K(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, !0), this.forceClear = !1, this.useMaxPadding = !1;
  }
  return t.prototype.push = function(r, e) {
    for (var i, n, a = this.renderer, s = this.defaultFilterStack, o = this.statePool.pop() || new Ap(), h = this.renderer.renderTexture, u = e[0].resolution, l = e[0].multisample, f = e[0].padding, c = e[0].autoFit, d = (i = e[0].legacy) !== null && i !== void 0 ? i : !0, p = 1; p < e.length; p++) {
      var v = e[p];
      u = Math.min(u, v.resolution), l = Math.min(l, v.multisample), f = this.useMaxPadding ? Math.max(f, v.padding) : f + v.padding, c = c && v.autoFit, d = d || ((n = v.legacy) !== null && n !== void 0 ? n : !0);
    }
    s.length === 1 && (this.defaultFilterStack[0].renderTexture = h.current), s.push(o), o.resolution = u, o.multisample = l, o.legacy = d, o.target = r, o.sourceFrame.copyFrom(r.filterArea || r.getBounds(!0)), o.sourceFrame.pad(f);
    var _ = this.tempRect.copyFrom(h.sourceFrame);
    a.projection.transform && this.transformAABB(en.copyFrom(a.projection.transform).invert(), _), c ? (o.sourceFrame.fit(_), (o.sourceFrame.width <= 0 || o.sourceFrame.height <= 0) && (o.sourceFrame.width = 0, o.sourceFrame.height = 0)) : o.sourceFrame.intersects(_) || (o.sourceFrame.width = 0, o.sourceFrame.height = 0), this.roundFrame(o.sourceFrame, h.current ? h.current.resolution : a.resolution, h.sourceFrame, h.destinationFrame, a.projection.transform), o.renderTexture = this.getOptimalFilterTexture(o.sourceFrame.width, o.sourceFrame.height, u, l), o.filters = e, o.destinationFrame.width = o.renderTexture.width, o.destinationFrame.height = o.renderTexture.height;
    var m = this.tempRect;
    m.x = 0, m.y = 0, m.width = o.sourceFrame.width, m.height = o.sourceFrame.height, o.renderTexture.filterFrame = o.sourceFrame, o.bindingSourceFrame.copyFrom(h.sourceFrame), o.bindingDestinationFrame.copyFrom(h.destinationFrame), o.transform = a.projection.transform, a.projection.transform = null, h.bind(o.renderTexture, o.sourceFrame, m), a.framebuffer.clear(0, 0, 0, 0);
  }, t.prototype.pop = function() {
    var r = this.defaultFilterStack, e = r.pop(), i = e.filters;
    this.activeState = e;
    var n = this.globalUniforms.uniforms;
    n.outputFrame = e.sourceFrame, n.resolution = e.resolution;
    var a = n.inputSize, s = n.inputPixel, o = n.inputClamp;
    if (a[0] = e.destinationFrame.width, a[1] = e.destinationFrame.height, a[2] = 1 / a[0], a[3] = 1 / a[1], s[0] = Math.round(a[0] * e.resolution), s[1] = Math.round(a[1] * e.resolution), s[2] = 1 / s[0], s[3] = 1 / s[1], o[0] = 0.5 * s[2], o[1] = 0.5 * s[3], o[2] = e.sourceFrame.width * a[2] - 0.5 * s[2], o[3] = e.sourceFrame.height * a[3] - 0.5 * s[3], e.legacy) {
      var h = n.filterArea;
      h[0] = e.destinationFrame.width, h[1] = e.destinationFrame.height, h[2] = e.sourceFrame.x, h[3] = e.sourceFrame.y, n.filterClamp = n.inputClamp;
    }
    this.globalUniforms.update();
    var u = r[r.length - 1];
    if (this.renderer.framebuffer.blit(), i.length === 1)
      i[0].apply(this, e.renderTexture, u.renderTexture, pe.BLEND, e), this.returnFilterTexture(e.renderTexture);
    else {
      var l = e.renderTexture, f = this.getOptimalFilterTexture(l.width, l.height, e.resolution);
      f.filterFrame = l.filterFrame;
      var c = 0;
      for (c = 0; c < i.length - 1; ++c) {
        c === 1 && e.multisample > 1 && (f = this.getOptimalFilterTexture(l.width, l.height, e.resolution), f.filterFrame = l.filterFrame), i[c].apply(this, l, f, pe.CLEAR, e);
        var d = l;
        l = f, f = d;
      }
      i[c].apply(this, l, u.renderTexture, pe.BLEND, e), c > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(l), this.returnFilterTexture(f);
    }
    e.clear(), this.statePool.push(e);
  }, t.prototype.bindAndClear = function(r, e) {
    e === void 0 && (e = pe.CLEAR);
    var i = this.renderer, n = i.renderTexture, a = i.state;
    if (r === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, r && r.filterFrame) {
      var s = this.tempRect;
      s.x = 0, s.y = 0, s.width = r.filterFrame.width, s.height = r.filterFrame.height, n.bind(r, r.filterFrame, s);
    } else
      r !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? n.bind(r) : this.renderer.renderTexture.bind(r, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
    var o = a.stateId & 1 || this.forceClear;
    (e === pe.CLEAR || e === pe.BLIT && o) && this.renderer.framebuffer.clear(0, 0, 0, 0);
  }, t.prototype.applyFilter = function(r, e, i, n) {
    var a = this.renderer;
    a.state.set(r.state), this.bindAndClear(i, n), r.uniforms.uSampler = e, r.uniforms.filterGlobals = this.globalUniforms, a.shader.bind(r), r.legacy = !!r.program.attributeData.aTextureCoord, r.legacy ? (this.quadUv.map(e._frame, e.filterFrame), a.geometry.bind(this.quadUv), a.geometry.draw(Ot.TRIANGLES)) : (a.geometry.bind(this.quad), a.geometry.draw(Ot.TRIANGLE_STRIP));
  }, t.prototype.calculateSpriteMatrix = function(r, e) {
    var i = this.activeState, n = i.sourceFrame, a = i.destinationFrame, s = e._texture.orig, o = r.set(a.width, 0, 0, a.height, n.x, n.y), h = e.worldTransform.copyTo(ft.TEMP_MATRIX);
    return h.invert(), o.prepend(h), o.scale(1 / s.width, 1 / s.height), o.translate(e.anchor.x, e.anchor.y), o;
  }, t.prototype.destroy = function() {
    this.renderer = null, this.texturePool.clear(!1);
  }, t.prototype.getOptimalFilterTexture = function(r, e, i, n) {
    return i === void 0 && (i = 1), n === void 0 && (n = xt.NONE), this.texturePool.getOptimalTexture(r, e, i, n);
  }, t.prototype.getFilterTexture = function(r, e, i) {
    if (typeof r == "number") {
      var n = r;
      r = e, e = n;
    }
    r = r || this.activeState.renderTexture;
    var a = this.texturePool.getOptimalTexture(r.width, r.height, e || r.resolution, i || xt.NONE);
    return a.filterFrame = r.filterFrame, a;
  }, t.prototype.returnFilterTexture = function(r) {
    this.texturePool.returnTexture(r);
  }, t.prototype.emptyPool = function() {
    this.texturePool.clear(!0);
  }, t.prototype.resize = function() {
    this.texturePool.setScreenSize(this.renderer.view);
  }, t.prototype.transformAABB = function(r, e) {
    var i = ei[0], n = ei[1], a = ei[2], s = ei[3];
    i.set(e.left, e.top), n.set(e.left, e.bottom), a.set(e.right, e.top), s.set(e.right, e.bottom), r.apply(i, i), r.apply(n, n), r.apply(a, a), r.apply(s, s);
    var o = Math.min(i.x, n.x, a.x, s.x), h = Math.min(i.y, n.y, a.y, s.y), u = Math.max(i.x, n.x, a.x, s.x), l = Math.max(i.y, n.y, a.y, s.y);
    e.x = o, e.y = h, e.width = u - o, e.height = l - h;
  }, t.prototype.roundFrame = function(r, e, i, n, a) {
    if (!(r.width <= 0 || r.height <= 0 || i.width <= 0 || i.height <= 0)) {
      if (a) {
        var s = a.a, o = a.b, h = a.c, u = a.d;
        if ((Math.abs(o) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(s) > 1e-4 || Math.abs(u) > 1e-4))
          return;
      }
      a = a ? en.copyFrom(a) : en.identity(), a.translate(-i.x, -i.y).scale(n.width / i.width, n.height / i.height).translate(n.x, n.y), this.transformAABB(a, r), r.ceil(e), this.transformAABB(a.invert(), r);
    }
  }, t;
}(), Hr = function() {
  function t(r) {
    this.renderer = r;
  }
  return t.prototype.flush = function() {
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t.prototype.start = function() {
  }, t.prototype.stop = function() {
    this.flush();
  }, t.prototype.render = function(r) {
  }, t;
}(), Up = function() {
  function t(r) {
    this.renderer = r, this.emptyRenderer = new Hr(r), this.currentRenderer = this.emptyRenderer;
  }
  return t.prototype.setObjectRenderer = function(r) {
    this.currentRenderer !== r && (this.currentRenderer.stop(), this.currentRenderer = r, this.currentRenderer.start());
  }, t.prototype.flush = function() {
    this.setObjectRenderer(this.emptyRenderer);
  }, t.prototype.reset = function() {
    this.setObjectRenderer(this.emptyRenderer);
  }, t.prototype.copyBoundTextures = function(r, e) {
    for (var i = this.renderer.texture.boundTextures, n = e - 1; n >= 0; --n)
      r[n] = i[n] || null, r[n] && (r[n]._batchLocation = n);
  }, t.prototype.boundArray = function(r, e, i, n) {
    for (var a = r.elements, s = r.ids, o = r.count, h = 0, u = 0; u < o; u++) {
      var l = a[u], f = l._batchLocation;
      if (f >= 0 && f < n && e[f] === l) {
        s[u] = f;
        continue;
      }
      for (; h < n; ) {
        var c = e[h];
        if (c && c._batchEnabled === i && c._batchLocation === h) {
          h++;
          continue;
        }
        s[u] = h, l._batchLocation = h, e[h] = l;
        break;
      }
    }
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), io = 0, Op = function() {
  function t(r) {
    this.renderer = r, this.webGLVersion = 1, this.extensions = {}, this.supports = {
      uint32Indices: !1
    }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), r.view.addEventListener("webglcontextlost", this.handleContextLost, !1), r.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
  }
  return Object.defineProperty(t.prototype, "isLost", {
    get: function() {
      return !this.gl || this.gl.isContextLost();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.contextChange = function(r) {
    this.gl = r, this.renderer.gl = r, this.renderer.CONTEXT_UID = io++, r.isContextLost() && r.getExtension("WEBGL_lose_context") && r.getExtension("WEBGL_lose_context").restoreContext();
  }, t.prototype.initFromContext = function(r) {
    this.gl = r, this.validateContext(r), this.renderer.gl = r, this.renderer.CONTEXT_UID = io++, this.renderer.runners.contextChange.emit(r);
  }, t.prototype.initFromOptions = function(r) {
    var e = this.createContext(this.renderer.view, r);
    this.initFromContext(e);
  }, t.prototype.createContext = function(r, e) {
    var i;
    if (O.PREFER_ENV >= ue.WEBGL2 && (i = r.getContext("webgl2", e)), i)
      this.webGLVersion = 2;
    else if (this.webGLVersion = 1, i = r.getContext("webgl", e) || r.getContext("experimental-webgl", e), !i)
      throw new Error("This browser does not support WebGL. Try using the canvas renderer");
    return this.gl = i, this.getExtensions(), this.gl;
  }, t.prototype.getExtensions = function() {
    var r = this.gl, e = {
      anisotropicFiltering: r.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: r.getExtension("OES_texture_float_linear"),
      s3tc: r.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: r.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      etc: r.getExtension("WEBGL_compressed_texture_etc"),
      etc1: r.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: r.getExtension("WEBGL_compressed_texture_pvrtc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: r.getExtension("WEBGL_compressed_texture_atc"),
      astc: r.getExtension("WEBGL_compressed_texture_astc")
    };
    this.webGLVersion === 1 ? Object.assign(this.extensions, e, {
      drawBuffers: r.getExtension("WEBGL_draw_buffers"),
      depthTexture: r.getExtension("WEBGL_depth_texture"),
      loseContext: r.getExtension("WEBGL_lose_context"),
      vertexArrayObject: r.getExtension("OES_vertex_array_object") || r.getExtension("MOZ_OES_vertex_array_object") || r.getExtension("WEBKIT_OES_vertex_array_object"),
      uint32ElementIndex: r.getExtension("OES_element_index_uint"),
      floatTexture: r.getExtension("OES_texture_float"),
      floatTextureLinear: r.getExtension("OES_texture_float_linear"),
      textureHalfFloat: r.getExtension("OES_texture_half_float"),
      textureHalfFloatLinear: r.getExtension("OES_texture_half_float_linear")
    }) : this.webGLVersion === 2 && Object.assign(this.extensions, e, {
      colorBufferFloat: r.getExtension("EXT_color_buffer_float")
    });
  }, t.prototype.handleContextLost = function(r) {
    r.preventDefault();
  }, t.prototype.handleContextRestored = function() {
    this.renderer.runners.contextChange.emit(this.gl);
  }, t.prototype.destroy = function() {
    var r = this.renderer.view;
    this.renderer = null, r.removeEventListener("webglcontextlost", this.handleContextLost), r.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
  }, t.prototype.postrender = function() {
    this.renderer.renderingToScreen && this.gl.flush();
  }, t.prototype.validateContext = function(r) {
    var e = r.getContextAttributes(), i = "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext;
    i && (this.webGLVersion = 2), e && !e.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    var n = i || !!r.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = n, n || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
  }, t;
}(), Fp = function() {
  function t(r) {
    this.framebuffer = r, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = xt.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
  }
  return t;
}(), Lp = new K(), Sp = function() {
  function t(r) {
    this.renderer = r, this.managedFramebuffers = [], this.unknownFramebuffer = new Jn(10, 10), this.msaaSamples = null;
  }
  return t.prototype.contextChange = function() {
    var r = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new K(), this.hasMRT = !0, this.writeDepthTexture = !0, this.disposeAll(!0), this.renderer.context.webGLVersion === 1) {
      var e = this.renderer.context.extensions.drawBuffers, i = this.renderer.context.extensions.depthTexture;
      O.PREFER_ENV === ue.WEBGL_LEGACY && (e = null, i = null), e ? r.drawBuffers = function(n) {
        return e.drawBuffersWEBGL(n);
      } : (this.hasMRT = !1, r.drawBuffers = function() {
      }), i || (this.writeDepthTexture = !1);
    } else
      this.msaaSamples = r.getInternalformatParameter(r.RENDERBUFFER, r.RGBA8, r.SAMPLES);
  }, t.prototype.bind = function(r, e, i) {
    i === void 0 && (i = 0);
    var n = this.gl;
    if (r) {
      var a = r.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(r);
      this.current !== r && (this.current = r, n.bindFramebuffer(n.FRAMEBUFFER, a.framebuffer)), a.mipLevel !== i && (r.dirtyId++, r.dirtyFormat++, a.mipLevel = i), a.dirtyId !== r.dirtyId && (a.dirtyId = r.dirtyId, a.dirtyFormat !== r.dirtyFormat ? (a.dirtyFormat = r.dirtyFormat, a.dirtySize = r.dirtySize, this.updateFramebuffer(r, i)) : a.dirtySize !== r.dirtySize && (a.dirtySize = r.dirtySize, this.resizeFramebuffer(r)));
      for (var s = 0; s < r.colorTextures.length; s++) {
        var o = r.colorTextures[s];
        this.renderer.texture.unbind(o.parentTextureArray || o);
      }
      if (r.depthTexture && this.renderer.texture.unbind(r.depthTexture), e) {
        var h = e.width >> i, u = e.height >> i, l = h / e.width;
        this.setViewport(e.x * l, e.y * l, h, u);
      } else {
        var h = r.width >> i, u = r.height >> i;
        this.setViewport(0, 0, h, u);
      }
    } else
      this.current && (this.current = null, n.bindFramebuffer(n.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
  }, t.prototype.setViewport = function(r, e, i, n) {
    var a = this.viewport;
    r = Math.round(r), e = Math.round(e), i = Math.round(i), n = Math.round(n), (a.width !== i || a.height !== n || a.x !== r || a.y !== e) && (a.x = r, a.y = e, a.width = i, a.height = n, this.gl.viewport(r, e, i, n));
  }, Object.defineProperty(t.prototype, "size", {
    get: function() {
      return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.clear = function(r, e, i, n, a) {
    a === void 0 && (a = Ei.COLOR | Ei.DEPTH);
    var s = this.gl;
    s.clearColor(r, e, i, n), s.clear(a);
  }, t.prototype.initFramebuffer = function(r) {
    var e = this.gl, i = new Fp(e.createFramebuffer());
    return i.multisample = this.detectSamples(r.multisample), r.glFramebuffers[this.CONTEXT_UID] = i, this.managedFramebuffers.push(r), r.disposeRunner.add(this), i;
  }, t.prototype.resizeFramebuffer = function(r) {
    var e = this.gl, i = r.glFramebuffers[this.CONTEXT_UID];
    i.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, i.multisample, e.RGBA8, r.width, r.height)), i.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, i.stencil), i.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, i.multisample, e.DEPTH24_STENCIL8, r.width, r.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, r.width, r.height));
    var n = r.colorTextures, a = n.length;
    e.drawBuffers || (a = Math.min(a, 1));
    for (var s = 0; s < a; s++) {
      var o = n[s], h = o.parentTextureArray || o;
      this.renderer.texture.bind(h, 0);
    }
    r.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(r.depthTexture, 0);
  }, t.prototype.updateFramebuffer = function(r, e) {
    var i = this.gl, n = r.glFramebuffers[this.CONTEXT_UID], a = r.colorTextures, s = a.length;
    i.drawBuffers || (s = Math.min(s, 1)), n.multisample > 1 && this.canMultisampleFramebuffer(r) ? (n.msaaBuffer = n.msaaBuffer || i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, n.msaaBuffer), i.renderbufferStorageMultisample(i.RENDERBUFFER, n.multisample, i.RGBA8, r.width, r.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, n.msaaBuffer)) : n.msaaBuffer && (i.deleteRenderbuffer(n.msaaBuffer), n.msaaBuffer = null, n.blitFramebuffer && (n.blitFramebuffer.dispose(), n.blitFramebuffer = null));
    for (var o = [], h = 0; h < s; h++) {
      var u = a[h], l = u.parentTextureArray || u;
      this.renderer.texture.bind(l, 0), !(h === 0 && n.msaaBuffer) && (i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + h, u.target, l._glTextures[this.CONTEXT_UID].texture, e), o.push(i.COLOR_ATTACHMENT0 + h));
    }
    if (o.length > 1 && i.drawBuffers(o), r.depthTexture) {
      var f = this.writeDepthTexture;
      if (f) {
        var c = r.depthTexture;
        this.renderer.texture.bind(c, 0), i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, c._glTextures[this.CONTEXT_UID].texture, e);
      }
    }
    (r.stencil || r.depth) && !(r.depthTexture && this.writeDepthTexture) ? (n.stencil = n.stencil || i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, n.stencil), n.msaaBuffer ? i.renderbufferStorageMultisample(i.RENDERBUFFER, n.multisample, i.DEPTH24_STENCIL8, r.width, r.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, r.width, r.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, n.stencil)) : n.stencil && (i.deleteRenderbuffer(n.stencil), n.stencil = null);
  }, t.prototype.canMultisampleFramebuffer = function(r) {
    return this.renderer.context.webGLVersion !== 1 && r.colorTextures.length <= 1 && !r.depthTexture;
  }, t.prototype.detectSamples = function(r) {
    var e = this.msaaSamples, i = xt.NONE;
    if (r <= 1 || e === null)
      return i;
    for (var n = 0; n < e.length; n++)
      if (e[n] <= r) {
        i = e[n];
        break;
      }
    return i === 1 && (i = xt.NONE), i;
  }, t.prototype.blit = function(r, e, i) {
    var n = this, a = n.current, s = n.renderer, o = n.gl, h = n.CONTEXT_UID;
    if (s.context.webGLVersion === 2 && !!a) {
      var u = a.glFramebuffers[h];
      if (!!u) {
        if (!r) {
          if (!u.msaaBuffer)
            return;
          var l = a.colorTextures[0];
          if (!l)
            return;
          u.blitFramebuffer || (u.blitFramebuffer = new Jn(a.width, a.height), u.blitFramebuffer.addColorTexture(0, l)), r = u.blitFramebuffer, r.colorTextures[0] !== l && (r.colorTextures[0] = l, r.dirtyId++, r.dirtyFormat++), (r.width !== a.width || r.height !== a.height) && (r.width = a.width, r.height = a.height, r.dirtyId++, r.dirtySize++);
        }
        e || (e = Lp, e.width = a.width, e.height = a.height), i || (i = e);
        var f = e.width === i.width && e.height === i.height;
        this.bind(r), o.bindFramebuffer(o.READ_FRAMEBUFFER, u.framebuffer), o.blitFramebuffer(e.left, e.top, e.right, e.bottom, i.left, i.top, i.right, i.bottom, o.COLOR_BUFFER_BIT, f ? o.NEAREST : o.LINEAR);
      }
    }
  }, t.prototype.disposeFramebuffer = function(r, e) {
    var i = r.glFramebuffers[this.CONTEXT_UID], n = this.gl;
    if (!!i) {
      delete r.glFramebuffers[this.CONTEXT_UID];
      var a = this.managedFramebuffers.indexOf(r);
      a >= 0 && this.managedFramebuffers.splice(a, 1), r.disposeRunner.remove(this), e || (n.deleteFramebuffer(i.framebuffer), i.msaaBuffer && n.deleteRenderbuffer(i.msaaBuffer), i.stencil && n.deleteRenderbuffer(i.stencil)), i.blitFramebuffer && i.blitFramebuffer.dispose();
    }
  }, t.prototype.disposeAll = function(r) {
    var e = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (var i = 0; i < e.length; i++)
      this.disposeFramebuffer(e[i], r);
  }, t.prototype.forceStencil = function() {
    var r = this.current;
    if (!!r) {
      var e = r.glFramebuffers[this.CONTEXT_UID];
      if (!(!e || e.stencil)) {
        r.stencil = !0;
        var i = r.width, n = r.height, a = this.gl, s = a.createRenderbuffer();
        a.bindRenderbuffer(a.RENDERBUFFER, s), e.msaaBuffer ? a.renderbufferStorageMultisample(a.RENDERBUFFER, e.multisample, a.DEPTH24_STENCIL8, i, n) : a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, i, n), e.stencil = s, a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, s);
      }
    }
  }, t.prototype.reset = function() {
    this.current = this.unknownFramebuffer, this.viewport = new K();
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), rn = { 5126: 4, 5123: 2, 5121: 1 }, Gp = function() {
  function t(r) {
    this.renderer = r, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
  }
  return t.prototype.contextChange = function() {
    this.disposeAll(!0);
    var r = this.gl = this.renderer.gl, e = this.renderer.context;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, e.webGLVersion !== 2) {
      var i = this.renderer.context.extensions.vertexArrayObject;
      O.PREFER_ENV === ue.WEBGL_LEGACY && (i = null), i ? (r.createVertexArray = function() {
        return i.createVertexArrayOES();
      }, r.bindVertexArray = function(a) {
        return i.bindVertexArrayOES(a);
      }, r.deleteVertexArray = function(a) {
        return i.deleteVertexArrayOES(a);
      }) : (this.hasVao = !1, r.createVertexArray = function() {
        return null;
      }, r.bindVertexArray = function() {
        return null;
      }, r.deleteVertexArray = function() {
        return null;
      });
    }
    if (e.webGLVersion !== 2) {
      var n = r.getExtension("ANGLE_instanced_arrays");
      n ? (r.vertexAttribDivisor = function(a, s) {
        return n.vertexAttribDivisorANGLE(a, s);
      }, r.drawElementsInstanced = function(a, s, o, h, u) {
        return n.drawElementsInstancedANGLE(a, s, o, h, u);
      }, r.drawArraysInstanced = function(a, s, o, h) {
        return n.drawArraysInstancedANGLE(a, s, o, h);
      }) : this.hasInstance = !1;
    }
    this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex;
  }, t.prototype.bind = function(r, e) {
    e = e || this.renderer.shader.shader;
    var i = this.gl, n = r.glVertexArrayObjects[this.CONTEXT_UID], a = !1;
    n || (this.managedGeometries[r.id] = r, r.disposeRunner.add(this), r.glVertexArrayObjects[this.CONTEXT_UID] = n = {}, a = !0);
    var s = n[e.program.id] || this.initGeometryVao(r, e, a);
    this._activeGeometry = r, this._activeVao !== s && (this._activeVao = s, this.hasVao ? i.bindVertexArray(s) : this.activateVao(r, e.program)), this.updateBuffers();
  }, t.prototype.reset = function() {
    this.unbind();
  }, t.prototype.updateBuffers = function() {
    for (var r = this._activeGeometry, e = this.renderer.buffer, i = 0; i < r.buffers.length; i++) {
      var n = r.buffers[i];
      e.update(n);
    }
  }, t.prototype.checkCompatibility = function(r, e) {
    var i = r.attributes, n = e.attributeData;
    for (var a in n)
      if (!i[a])
        throw new Error('shader and geometry incompatible, geometry missing the "' + a + '" attribute');
  }, t.prototype.getSignature = function(r, e) {
    var i = r.attributes, n = e.attributeData, a = ["g", r.id];
    for (var s in i)
      n[s] && a.push(s, n[s].location);
    return a.join("-");
  }, t.prototype.initGeometryVao = function(r, e, i) {
    i === void 0 && (i = !0);
    var n = this.gl, a = this.CONTEXT_UID, s = this.renderer.buffer, o = e.program;
    o.glPrograms[a] || this.renderer.shader.generateProgram(e), this.checkCompatibility(r, o);
    var h = this.getSignature(r, o), u = r.glVertexArrayObjects[this.CONTEXT_UID], l = u[h];
    if (l)
      return u[o.id] = l, l;
    var f = r.buffers, c = r.attributes, d = {}, p = {};
    for (var v in f)
      d[v] = 0, p[v] = 0;
    for (var v in c)
      !c[v].size && o.attributeData[v] ? c[v].size = o.attributeData[v].size : c[v].size || console.warn("PIXI Geometry attribute '" + v + "' size cannot be determined (likely the bound shader does not have the attribute)"), d[c[v].buffer] += c[v].size * rn[c[v].type];
    for (var v in c) {
      var _ = c[v], m = _.size;
      _.stride === void 0 && (d[_.buffer] === m * rn[_.type] ? _.stride = 0 : _.stride = d[_.buffer]), _.start === void 0 && (_.start = p[_.buffer], p[_.buffer] += m * rn[_.type]);
    }
    l = n.createVertexArray(), n.bindVertexArray(l);
    for (var y = 0; y < f.length; y++) {
      var g = f[y];
      s.bind(g), i && g._glBuffers[a].refCount++;
    }
    return this.activateVao(r, o), this._activeVao = l, u[o.id] = l, u[h] = l, l;
  }, t.prototype.disposeGeometry = function(r, e) {
    var i;
    if (!!this.managedGeometries[r.id]) {
      delete this.managedGeometries[r.id];
      var n = r.glVertexArrayObjects[this.CONTEXT_UID], a = this.gl, s = r.buffers, o = (i = this.renderer) === null || i === void 0 ? void 0 : i.buffer;
      if (r.disposeRunner.remove(this), !!n) {
        if (o)
          for (var h = 0; h < s.length; h++) {
            var u = s[h]._glBuffers[this.CONTEXT_UID];
            u && (u.refCount--, u.refCount === 0 && !e && o.dispose(s[h], e));
          }
        if (!e) {
          for (var l in n)
            if (l[0] === "g") {
              var f = n[l];
              this._activeVao === f && this.unbind(), a.deleteVertexArray(f);
            }
        }
        delete r.glVertexArrayObjects[this.CONTEXT_UID];
      }
    }
  }, t.prototype.disposeAll = function(r) {
    for (var e = Object.keys(this.managedGeometries), i = 0; i < e.length; i++)
      this.disposeGeometry(this.managedGeometries[e[i]], r);
  }, t.prototype.activateVao = function(r, e) {
    var i = this.gl, n = this.CONTEXT_UID, a = this.renderer.buffer, s = r.buffers, o = r.attributes;
    r.indexBuffer && a.bind(r.indexBuffer);
    var h = null;
    for (var u in o) {
      var l = o[u], f = s[l.buffer], c = f._glBuffers[n];
      if (e.attributeData[u]) {
        h !== c && (a.bind(f), h = c);
        var d = e.attributeData[u].location;
        if (i.enableVertexAttribArray(d), i.vertexAttribPointer(d, l.size, l.type || i.FLOAT, l.normalized, l.stride, l.start), l.instance)
          if (this.hasInstance)
            i.vertexAttribDivisor(d, 1);
          else
            throw new Error("geometry error, GPU Instancing is not supported on this device");
      }
    }
  }, t.prototype.draw = function(r, e, i, n) {
    var a = this.gl, s = this._activeGeometry;
    if (s.indexBuffer) {
      var o = s.indexBuffer.data.BYTES_PER_ELEMENT, h = o === 2 ? a.UNSIGNED_SHORT : a.UNSIGNED_INT;
      o === 2 || o === 4 && this.canUseUInt32ElementIndex ? s.instanced ? a.drawElementsInstanced(r, e || s.indexBuffer.data.length, h, (i || 0) * o, n || 1) : a.drawElements(r, e || s.indexBuffer.data.length, h, (i || 0) * o) : console.warn("unsupported index buffer type: uint32");
    } else
      s.instanced ? a.drawArraysInstanced(r, i, e || s.getSize(), n || 1) : a.drawArrays(r, i, e || s.getSize());
    return this;
  }, t.prototype.unbind = function() {
    this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), Bp = function() {
  function t(r) {
    r === void 0 && (r = null), this.type = bt.NONE, this.autoDetect = !0, this.maskObject = r || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = O.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
  }
  return Object.defineProperty(t.prototype, "filter", {
    get: function() {
      return this._filters ? this._filters[0] : null;
    },
    set: function(r) {
      r ? this._filters ? this._filters[0] = r : this._filters = [r] : this._filters = null;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.reset = function() {
    this.pooled && (this.maskObject = null, this.type = bt.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
  }, t.prototype.copyCountersOrReset = function(r) {
    r ? (this._stencilCounter = r._stencilCounter, this._scissorCounter = r._scissorCounter, this._scissorRect = r._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
  }, t;
}();
function no(t, r, e) {
  var i = t.createShader(r);
  return t.shaderSource(i, e), t.compileShader(i), i;
}
function ao(t, r) {
  var e = t.getShaderSource(r).split(`
`).map(function(u, l) {
    return l + ": " + u;
  }), i = t.getShaderInfoLog(r), n = i.split(`
`), a = {}, s = n.map(function(u) {
    return parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
  }).filter(function(u) {
    return u && !a[u] ? (a[u] = !0, !0) : !1;
  }), o = [""];
  s.forEach(function(u) {
    e[u - 1] = "%c" + e[u - 1] + "%c", o.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  var h = e.join(`
`);
  o[0] = h, console.error(i), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, o), console.groupEnd();
}
function Mp(t, r, e, i) {
  t.getProgramParameter(r, t.LINK_STATUS) || (t.getShaderParameter(e, t.COMPILE_STATUS) || ao(t, e), t.getShaderParameter(i, t.COMPILE_STATUS) || ao(t, i), console.error("PixiJS Error: Could not initialize shader."), t.getProgramInfoLog(r) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(r)));
}
function nn(t) {
  for (var r = new Array(t), e = 0; e < r.length; e++)
    r[e] = !1;
  return r;
}
function Bu(t, r) {
  switch (t) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * r);
    case "vec3":
      return new Float32Array(3 * r);
    case "vec4":
      return new Float32Array(4 * r);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * r);
    case "ivec3":
      return new Int32Array(3 * r);
    case "ivec4":
      return new Int32Array(4 * r);
    case "uvec2":
      return new Uint32Array(2 * r);
    case "uvec3":
      return new Uint32Array(3 * r);
    case "uvec4":
      return new Uint32Array(4 * r);
    case "bool":
      return !1;
    case "bvec2":
      return nn(2 * r);
    case "bvec3":
      return nn(3 * r);
    case "bvec4":
      return nn(4 * r);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}
var Mu = {}, ur = Mu;
function Dp() {
  if (ur === Mu || ur && ur.isContextLost()) {
    var t = O.ADAPTER.createCanvas(), r = void 0;
    O.PREFER_ENV >= ue.WEBGL2 && (r = t.getContext("webgl2", {})), r || (r = t.getContext("webgl", {}) || t.getContext("experimental-webgl", {}), r ? r.getExtension("WEBGL_draw_buffers") : r = null), ur = r;
  }
  return ur;
}
var ri;
function kp() {
  if (!ri) {
    ri = Yt.MEDIUM;
    var t = Dp();
    if (t && t.getShaderPrecisionFormat) {
      var r = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
      ri = r.precision ? Yt.HIGH : Yt.MEDIUM;
    }
  }
  return ri;
}
function so(t, r, e) {
  if (t.substring(0, 9) !== "precision") {
    var i = r;
    return r === Yt.HIGH && e !== Yt.HIGH && (i = Yt.MEDIUM), "precision " + i + ` float;
` + t;
  } else if (e !== Yt.HIGH && t.substring(0, 15) === "precision highp")
    return t.replace("precision highp", "precision mediump");
  return t;
}
var Hp = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function Du(t) {
  return Hp[t];
}
var ii = null, oo = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function ku(t, r) {
  if (!ii) {
    var e = Object.keys(oo);
    ii = {};
    for (var i = 0; i < e.length; ++i) {
      var n = e[i];
      ii[t[n]] = oo[n];
    }
  }
  return ii[r];
}
var rr = [
  {
    test: function(t) {
      return t.type === "float" && t.size === 1 && !t.isArray;
    },
    code: function(t) {
      return `
            if(uv["` + t + '"] !== ud["' + t + `"].value)
            {
                ud["` + t + '"].value = uv["' + t + `"]
                gl.uniform1f(ud["` + t + '"].location, uv["' + t + `"])
            }
            `;
    }
  },
  {
    test: function(t, r) {
      return (t.type === "sampler2D" || t.type === "samplerCube" || t.type === "sampler2DArray") && t.size === 1 && !t.isArray && (r == null || r.castToBaseTexture !== void 0);
    },
    code: function(t) {
      return `t = syncData.textureCount++;

            renderer.texture.bind(uv["` + t + `"], t);

            if(ud["` + t + `"].value !== t)
            {
                ud["` + t + `"].value = t;
                gl.uniform1i(ud["` + t + `"].location, t);
; // eslint-disable-line max-len
            }`;
    }
  },
  {
    test: function(t, r) {
      return t.type === "mat3" && t.size === 1 && !t.isArray && r.a !== void 0;
    },
    code: function(t) {
      return `
            gl.uniformMatrix3fv(ud["` + t + '"].location, false, uv["' + t + `"].toArray(true));
            `;
    },
    codeUbo: function(t) {
      return `
                var ` + t + "_matrix = uv." + t + `.toArray(true);

                data[offset] = ` + t + `_matrix[0];
                data[offset+1] = ` + t + `_matrix[1];
                data[offset+2] = ` + t + `_matrix[2];
        
                data[offset + 4] = ` + t + `_matrix[3];
                data[offset + 5] = ` + t + `_matrix[4];
                data[offset + 6] = ` + t + `_matrix[5];
        
                data[offset + 8] = ` + t + `_matrix[6];
                data[offset + 9] = ` + t + `_matrix[7];
                data[offset + 10] = ` + t + `_matrix[8];
            `;
    }
  },
  {
    test: function(t, r) {
      return t.type === "vec2" && t.size === 1 && !t.isArray && r.x !== void 0;
    },
    code: function(t) {
      return `
                cv = ud["` + t + `"].value;
                v = uv["` + t + `"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["` + t + `"].location, v.x, v.y);
                }`;
    },
    codeUbo: function(t) {
      return `
                v = uv.` + t + `;

                data[offset] = v.x;
                data[offset+1] = v.y;
            `;
    }
  },
  {
    test: function(t) {
      return t.type === "vec2" && t.size === 1 && !t.isArray;
    },
    code: function(t) {
      return `
                cv = ud["` + t + `"].value;
                v = uv["` + t + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["` + t + `"].location, v[0], v[1]);
                }
            `;
    }
  },
  {
    test: function(t, r) {
      return t.type === "vec4" && t.size === 1 && !t.isArray && r.width !== void 0;
    },
    code: function(t) {
      return `
                cv = ud["` + t + `"].value;
                v = uv["` + t + `"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["` + t + `"].location, v.x, v.y, v.width, v.height)
                }`;
    },
    codeUbo: function(t) {
      return `
                    v = uv.` + t + `;

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `;
    }
  },
  {
    test: function(t) {
      return t.type === "vec4" && t.size === 1 && !t.isArray;
    },
    code: function(t) {
      return `
                cv = ud["` + t + `"].value;
                v = uv["` + t + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["` + t + `"].location, v[0], v[1], v[2], v[3])
                }`;
    }
  }
], Xp = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
}, Vp = {
  float: "gl.uniform1fv(location, v)",
  vec2: "gl.uniform2fv(location, v)",
  vec3: "gl.uniform3fv(location, v)",
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function jp(t, r) {
  var e, i = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (var n in t.uniforms) {
    var a = r[n];
    if (!a) {
      !((e = t.uniforms[n]) === null || e === void 0) && e.group && (t.uniforms[n].ubo ? i.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + n + ", '" + n + `');
                    `) : i.push(`
                        renderer.shader.syncUniformGroup(uv.` + n + `, syncData);
                    `));
      continue;
    }
    for (var s = t.uniforms[n], o = !1, h = 0; h < rr.length; h++)
      if (rr[h].test(a, s)) {
        i.push(rr[h].code(n, s)), o = !0;
        break;
      }
    if (!o) {
      var u = a.size === 1 && !a.isArray ? Xp : Vp, l = u[a.type].replace("location", 'ud["' + n + '"].location');
      i.push(`
            cu = ud["` + n + `"];
            cv = cu.value;
            v = uv["` + n + `"];
            ` + l + ";");
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", i.join(`
`));
}
var zp = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function Wp(t) {
  for (var r = "", e = 0; e < t; ++e)
    e > 0 && (r += `
else `), e < t - 1 && (r += "if(test == " + e + ".0){}");
  return r;
}
function $p(t, r) {
  if (t === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  for (var e = r.createShader(r.FRAGMENT_SHADER); ; ) {
    var i = zp.replace(/%forloop%/gi, Wp(t));
    if (r.shaderSource(e, i), r.compileShader(e), !r.getShaderParameter(e, r.COMPILE_STATUS))
      t = t / 2 | 0;
    else
      break;
  }
  return t;
}
var lr;
function qp() {
  if (typeof lr == "boolean")
    return lr;
  try {
    var t = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    lr = t({ a: "b" }, "a", "b") === !0;
  } catch {
    lr = !1;
  }
  return lr;
}
var Yp = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, Zp = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`, Jp = 0, ni = {}, Me = function() {
  function t(r, e, i) {
    i === void 0 && (i = "pixi-shader"), this.id = Jp++, this.vertexSrc = r || t.defaultVertexSrc, this.fragmentSrc = e || t.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (i = i.replace(/\s+/g, "-"), ni[i] ? (ni[i]++, i += "-" + ni[i]) : ni[i] = 1, this.vertexSrc = "#define SHADER_NAME " + i + `
` + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + i + `
` + this.fragmentSrc, this.vertexSrc = so(this.vertexSrc, O.PRECISION_VERTEX, Yt.HIGH), this.fragmentSrc = so(this.fragmentSrc, O.PRECISION_FRAGMENT, kp())), this.glPrograms = {}, this.syncUniforms = null;
  }
  return Object.defineProperty(t, "defaultVertexSrc", {
    get: function() {
      return Zp;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "defaultFragmentSrc", {
    get: function() {
      return Yp;
    },
    enumerable: !1,
    configurable: !0
  }), t.from = function(r, e, i) {
    var n = r + e, a = Os[n];
    return a || (Os[n] = a = new t(r, e, i)), a;
  }, t;
}(), Qt = function() {
  function t(r, e) {
    this.uniformBindCount = 0, this.program = r, e ? e instanceof Ue ? this.uniformGroup = e : this.uniformGroup = new Ue(e) : this.uniformGroup = new Ue({});
  }
  return t.prototype.checkUniformExists = function(r, e) {
    if (e.uniforms[r])
      return !0;
    for (var i in e.uniforms) {
      var n = e.uniforms[i];
      if (n.group && this.checkUniformExists(r, n))
        return !0;
    }
    return !1;
  }, t.prototype.destroy = function() {
    this.uniformGroup = null;
  }, Object.defineProperty(t.prototype, "uniforms", {
    get: function() {
      return this.uniformGroup.uniforms;
    },
    enumerable: !1,
    configurable: !0
  }), t.from = function(r, e, i) {
    var n = Me.from(r, e);
    return new t(n, i);
  }, t;
}(), an = 0, sn = 1, on = 2, hn = 3, un = 4, ln = 5, De = function() {
  function t() {
    this.data = 0, this.blendMode = D.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  return Object.defineProperty(t.prototype, "blend", {
    get: function() {
      return !!(this.data & 1 << an);
    },
    set: function(r) {
      !!(this.data & 1 << an) !== r && (this.data ^= 1 << an);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "offsets", {
    get: function() {
      return !!(this.data & 1 << sn);
    },
    set: function(r) {
      !!(this.data & 1 << sn) !== r && (this.data ^= 1 << sn);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "culling", {
    get: function() {
      return !!(this.data & 1 << on);
    },
    set: function(r) {
      !!(this.data & 1 << on) !== r && (this.data ^= 1 << on);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "depthTest", {
    get: function() {
      return !!(this.data & 1 << hn);
    },
    set: function(r) {
      !!(this.data & 1 << hn) !== r && (this.data ^= 1 << hn);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "depthMask", {
    get: function() {
      return !!(this.data & 1 << ln);
    },
    set: function(r) {
      !!(this.data & 1 << ln) !== r && (this.data ^= 1 << ln);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "clockwiseFrontFace", {
    get: function() {
      return !!(this.data & 1 << un);
    },
    set: function(r) {
      !!(this.data & 1 << un) !== r && (this.data ^= 1 << un);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "blendMode", {
    get: function() {
      return this._blendMode;
    },
    set: function(r) {
      this.blend = r !== D.NONE, this._blendMode = r;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "polygonOffset", {
    get: function() {
      return this._polygonOffset;
    },
    set: function(r) {
      this.offsets = !!r, this._polygonOffset = r;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.toString = function() {
    return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
  }, t.for2d = function() {
    var r = new t();
    return r.depthTest = !1, r.blend = !0, r;
  }, t;
}(), Kp = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, Qp = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`, ce = function(t) {
  ut(r, t);
  function r(e, i, n) {
    var a = this, s = Me.from(e || r.defaultVertexSrc, i || r.defaultFragmentSrc);
    return a = t.call(this, s, n) || this, a.padding = 0, a.resolution = O.FILTER_RESOLUTION, a.multisample = O.FILTER_MULTISAMPLE, a.enabled = !0, a.autoFit = !0, a.state = new De(), a;
  }
  return r.prototype.apply = function(e, i, n, a, s) {
    e.applyFilter(this, i, n, a);
  }, Object.defineProperty(r.prototype, "blendMode", {
    get: function() {
      return this.state.blendMode;
    },
    set: function(e) {
      this.state.blendMode = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "resolution", {
    get: function() {
      return this._resolution;
    },
    set: function(e) {
      this._resolution = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r, "defaultVertexSrc", {
    get: function() {
      return Qp;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r, "defaultFragmentSrc", {
    get: function() {
      return Kp;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Qt), tv = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`, ev = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`, ho = new ft(), Xr = function() {
  function t(r, e) {
    this._texture = r, this.mapCoord = new ft(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof e > "u" ? 0.5 : e, this.isSimple = !1;
  }
  return Object.defineProperty(t.prototype, "texture", {
    get: function() {
      return this._texture;
    },
    set: function(r) {
      this._texture = r, this._textureID = -1;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.multiplyUvs = function(r, e) {
    e === void 0 && (e = r);
    for (var i = this.mapCoord, n = 0; n < r.length; n += 2) {
      var a = r[n], s = r[n + 1];
      e[n] = a * i.a + s * i.c + i.tx, e[n + 1] = a * i.b + s * i.d + i.ty;
    }
    return e;
  }, t.prototype.update = function(r) {
    var e = this._texture;
    if (!e || !e.valid || !r && this._textureID === e._updateID)
      return !1;
    this._textureID = e._updateID, this._updateID++;
    var i = e._uvs;
    this.mapCoord.set(i.x1 - i.x0, i.y1 - i.y0, i.x3 - i.x0, i.y3 - i.y0, i.x0, i.y0);
    var n = e.orig, a = e.trim;
    a && (ho.set(n.width / a.width, 0, 0, n.height / a.height, -a.x / a.width, -a.y / a.height), this.mapCoord.append(ho));
    var s = e.baseTexture, o = this.uClampFrame, h = this.clampMargin / s.resolution, u = this.clampOffset;
    return o[0] = (e._frame.x + h + u) / s.width, o[1] = (e._frame.y + h + u) / s.height, o[2] = (e._frame.x + e._frame.width - h + u) / s.width, o[3] = (e._frame.y + e._frame.height - h + u) / s.height, this.uClampOffset[0] = u / s.realWidth, this.uClampOffset[1] = u / s.realHeight, this.isSimple = e._frame.width === s.width && e._frame.height === s.height && e.rotate === 0, !0;
  }, t;
}(), rv = function(t) {
  ut(r, t);
  function r(e, i, n) {
    var a = this, s = null;
    return typeof e != "string" && i === void 0 && n === void 0 && (s = e, e = void 0, i = void 0, n = void 0), a = t.call(this, e || tv, i || ev, n) || this, a.maskSprite = s, a.maskMatrix = new ft(), a;
  }
  return Object.defineProperty(r.prototype, "maskSprite", {
    get: function() {
      return this._maskSprite;
    },
    set: function(e) {
      this._maskSprite = e, this._maskSprite && (this._maskSprite.renderable = !1);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.apply = function(e, i, n, a) {
    var s = this._maskSprite, o = s._texture;
    !o.valid || (o.uvMatrix || (o.uvMatrix = new Xr(o, 0)), o.uvMatrix.update(), this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, s).prepend(o.uvMatrix.mapCoord), this.uniforms.alpha = s.worldAlpha, this.uniforms.maskClamp = o.uvMatrix.uClampFrame, e.applyFilter(this, i, n, a));
  }, r;
}(ce), Hu = function() {
  function t(r) {
    this.renderer = r, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
  }
  return t.prototype.setMaskStack = function(r) {
    this.maskStack = r, this.renderer.scissor.setMaskStack(r), this.renderer.stencil.setMaskStack(r);
  }, t.prototype.push = function(r, e) {
    var i = e;
    if (!i.isMaskData) {
      var n = this.maskDataPool.pop() || new Bp();
      n.pooled = !0, n.maskObject = e, i = n;
    }
    var a = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (i.copyCountersOrReset(a), i._colorMask = a ? a._colorMask : 15, i.autoDetect && this.detect(i), i._target = r, i.type !== bt.SPRITE && this.maskStack.push(i), i.enabled)
      switch (i.type) {
        case bt.SCISSOR:
          this.renderer.scissor.push(i);
          break;
        case bt.STENCIL:
          this.renderer.stencil.push(i);
          break;
        case bt.SPRITE:
          i.copyCountersOrReset(null), this.pushSpriteMask(i);
          break;
        case bt.COLOR:
          this.pushColorMask(i);
          break;
      }
    i.type === bt.SPRITE && this.maskStack.push(i);
  }, t.prototype.pop = function(r) {
    var e = this.maskStack.pop();
    if (!(!e || e._target !== r)) {
      if (e.enabled)
        switch (e.type) {
          case bt.SCISSOR:
            this.renderer.scissor.pop(e);
            break;
          case bt.STENCIL:
            this.renderer.stencil.pop(e.maskObject);
            break;
          case bt.SPRITE:
            this.popSpriteMask(e);
            break;
          case bt.COLOR:
            this.popColorMask(e);
            break;
        }
      if (e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0) {
        var i = this.maskStack[this.maskStack.length - 1];
        i.type === bt.SPRITE && i._filters && (i._filters[0].maskSprite = i.maskObject);
      }
    }
  }, t.prototype.detect = function(r) {
    var e = r.maskObject;
    e ? e.isSprite ? r.type = bt.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(r) ? r.type = bt.SCISSOR : r.type = bt.STENCIL : r.type = bt.COLOR;
  }, t.prototype.pushSpriteMask = function(r) {
    var e, i, n = r.maskObject, a = r._target, s = r._filters;
    s || (s = this.alphaMaskPool[this.alphaMaskIndex], s || (s = this.alphaMaskPool[this.alphaMaskIndex] = [new rv()]));
    var o = this.renderer, h = o.renderTexture, u, l;
    if (h.current) {
      var f = h.current;
      u = r.resolution || f.resolution, l = (e = r.multisample) !== null && e !== void 0 ? e : f.multisample;
    } else
      u = r.resolution || o.resolution, l = (i = r.multisample) !== null && i !== void 0 ? i : o.multisample;
    s[0].resolution = u, s[0].multisample = l, s[0].maskSprite = n;
    var c = a.filterArea;
    a.filterArea = n.getBounds(!0), o.filter.push(a, s), a.filterArea = c, r._filters || this.alphaMaskIndex++;
  }, t.prototype.popSpriteMask = function(r) {
    this.renderer.filter.pop(), r._filters ? r._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
  }, t.prototype.pushColorMask = function(r) {
    var e = r._colorMask, i = r._colorMask = e & r.colorMask;
    i !== e && this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0);
  }, t.prototype.popColorMask = function(r) {
    var e = r._colorMask, i = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    i !== e && this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0);
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), Xu = function() {
  function t(r) {
    this.renderer = r, this.maskStack = [], this.glConst = 0;
  }
  return t.prototype.getStackLength = function() {
    return this.maskStack.length;
  }, t.prototype.setMaskStack = function(r) {
    var e = this.renderer.gl, i = this.getStackLength();
    this.maskStack = r;
    var n = this.getStackLength();
    n !== i && (n === 0 ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()));
  }, t.prototype._useCurrent = function() {
  }, t.prototype.destroy = function() {
    this.renderer = null, this.maskStack = null;
  }, t;
}(), uo = new ft(), lo = [], iv = function(t) {
  ut(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return i.glConst = O.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, i;
  }
  return r.prototype.getStackLength = function() {
    var e = this.maskStack[this.maskStack.length - 1];
    return e ? e._scissorCounter : 0;
  }, r.prototype.calcScissorRect = function(e) {
    var i;
    if (!e._scissorRectLocal) {
      var n = e._scissorRect, a = e.maskObject, s = this.renderer, o = s.renderTexture, h = a.getBounds(!0, (i = lo.pop()) !== null && i !== void 0 ? i : new K());
      this.roundFrameToPixels(h, o.current ? o.current.resolution : s.resolution, o.sourceFrame, o.destinationFrame, s.projection.transform), n && h.fit(n), e._scissorRectLocal = h;
    }
  }, r.isMatrixRotated = function(e) {
    if (!e)
      return !1;
    var i = e.a, n = e.b, a = e.c, s = e.d;
    return (Math.abs(n) > 1e-4 || Math.abs(a) > 1e-4) && (Math.abs(i) > 1e-4 || Math.abs(s) > 1e-4);
  }, r.prototype.testScissor = function(e) {
    var i = e.maskObject;
    if (!i.isFastRect || !i.isFastRect() || r.isMatrixRotated(i.worldTransform) || r.isMatrixRotated(this.renderer.projection.transform))
      return !1;
    this.calcScissorRect(e);
    var n = e._scissorRectLocal;
    return n.width > 0 && n.height > 0;
  }, r.prototype.roundFrameToPixels = function(e, i, n, a, s) {
    r.isMatrixRotated(s) || (s = s ? uo.copyFrom(s) : uo.identity(), s.translate(-n.x, -n.y).scale(a.width / n.width, a.height / n.height).translate(a.x, a.y), this.renderer.filter.transformAABB(s, e), e.fit(a), e.x = Math.round(e.x * i), e.y = Math.round(e.y * i), e.width = Math.round(e.width * i), e.height = Math.round(e.height * i));
  }, r.prototype.push = function(e) {
    e._scissorRectLocal || this.calcScissorRect(e);
    var i = this.renderer.gl;
    e._scissorRect || i.enable(i.SCISSOR_TEST), e._scissorCounter++, e._scissorRect = e._scissorRectLocal, this._useCurrent();
  }, r.prototype.pop = function(e) {
    var i = this.renderer.gl;
    e && lo.push(e._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : i.disable(i.SCISSOR_TEST);
  }, r.prototype._useCurrent = function() {
    var e = this.maskStack[this.maskStack.length - 1]._scissorRect, i;
    this.renderer.renderTexture.current ? i = e.y : i = this.renderer.height - e.height - e.y, this.renderer.gl.scissor(e.x, i, e.width, e.height);
  }, r;
}(Xu), nv = function(t) {
  ut(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return i.glConst = O.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, i;
  }
  return r.prototype.getStackLength = function() {
    var e = this.maskStack[this.maskStack.length - 1];
    return e ? e._stencilCounter : 0;
  }, r.prototype.push = function(e) {
    var i = e.maskObject, n = this.renderer.gl, a = e._stencilCounter;
    a === 0 && (this.renderer.framebuffer.forceStencil(), n.clearStencil(0), n.clear(n.STENCIL_BUFFER_BIT), n.enable(n.STENCIL_TEST)), e._stencilCounter++;
    var s = e._colorMask;
    s !== 0 && (e._colorMask = 0, n.colorMask(!1, !1, !1, !1)), n.stencilFunc(n.EQUAL, a, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.INCR), i.renderable = !0, i.render(this.renderer), this.renderer.batch.flush(), i.renderable = !1, s !== 0 && (e._colorMask = s, n.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)), this._useCurrent();
  }, r.prototype.pop = function(e) {
    var i = this.renderer.gl;
    if (this.getStackLength() === 0)
      i.disable(i.STENCIL_TEST);
    else {
      var n = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, a = n ? n._colorMask : 15;
      a !== 0 && (n._colorMask = 0, i.colorMask(!1, !1, !1, !1)), i.stencilOp(i.KEEP, i.KEEP, i.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, a !== 0 && (n._colorMask = a, i.colorMask((a & 1) !== 0, (a & 2) !== 0, (a & 4) !== 0, (a & 8) !== 0)), this._useCurrent();
    }
  }, r.prototype._useCurrent = function() {
    var e = this.renderer.gl;
    e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
  }, r;
}(Xu), av = function() {
  function t(r) {
    this.renderer = r, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new ft(), this.transform = null;
  }
  return t.prototype.update = function(r, e, i, n) {
    this.destinationFrame = r || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || r, this.calculateProjection(this.destinationFrame, this.sourceFrame, i, n), this.transform && this.projectionMatrix.append(this.transform);
    var a = this.renderer;
    a.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, a.globalUniforms.update(), a.shader.shader && a.shader.syncUniformGroup(a.shader.shader.uniforms.globals);
  }, t.prototype.calculateProjection = function(r, e, i, n) {
    var a = this.projectionMatrix, s = n ? -1 : 1;
    a.identity(), a.a = 1 / e.width * 2, a.d = s * (1 / e.height * 2), a.tx = -1 - e.x * a.a, a.ty = -s - e.y * a.d;
  }, t.prototype.setTransform = function(r) {
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), be = new K(), fr = new K(), sv = function() {
  function t(r) {
    this.renderer = r, this.clearColor = r._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new K(), this.destinationFrame = new K(), this.viewportFrame = new K();
  }
  return t.prototype.bind = function(r, e, i) {
    r === void 0 && (r = null);
    var n = this.renderer;
    this.current = r;
    var a, s, o;
    r ? (a = r.baseTexture, o = a.resolution, e || (be.width = r.frame.width, be.height = r.frame.height, e = be), i || (fr.x = r.frame.x, fr.y = r.frame.y, fr.width = e.width, fr.height = e.height, i = fr), s = a.framebuffer) : (o = n.resolution, e || (be.width = n.screen.width, be.height = n.screen.height, e = be), i || (i = be, i.width = e.width, i.height = e.height));
    var h = this.viewportFrame;
    h.x = i.x * o, h.y = i.y * o, h.width = i.width * o, h.height = i.height * o, r || (h.y = n.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(s, h), this.renderer.projection.update(i, e, o, !s), r ? this.renderer.mask.setMaskStack(a.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(i);
  }, t.prototype.clear = function(r, e) {
    this.current ? r = r || this.current.baseTexture.clearColor : r = r || this.clearColor;
    var i = this.destinationFrame, n = this.current ? this.current.baseTexture : this.renderer.screen, a = i.width !== n.width || i.height !== n.height;
    if (a) {
      var s = this.viewportFrame, o = s.x, h = s.y, u = s.width, l = s.height;
      o = Math.round(o), h = Math.round(h), u = Math.round(u), l = Math.round(l), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(o, h, u, l);
    }
    this.renderer.framebuffer.clear(r[0], r[1], r[2], r[3], e), a && this.renderer.scissor.pop();
  }, t.prototype.resize = function() {
    this.bind(null);
  }, t.prototype.reset = function() {
    this.bind(null);
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}();
function ov(t, r, e, i, n) {
  e.buffer.update(n);
}
var hv = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}, Vu = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function uv(t) {
  for (var r = t.map(function(h) {
    return {
      data: h,
      offset: 0,
      dataLen: 0,
      dirty: 0
    };
  }), e = 0, i = 0, n = 0, a = 0; a < r.length; a++) {
    var s = r[a];
    if (e = Vu[s.data.type], s.data.size > 1 && (e = Math.max(e, 16) * s.data.size), s.dataLen = e, i % e !== 0 && i < 16) {
      var o = i % e % 16;
      i += o, n += o;
    }
    i + e > 16 ? (n = Math.ceil(n / 16) * 16, s.offset = n, n += e, i = e) : (s.offset = n, i += e, n += e);
  }
  return n = Math.ceil(n / 16) * 16, { uboElements: r, size: n };
}
function lv(t, r) {
  var e = [];
  for (var i in t)
    r[i] && e.push(r[i]);
  return e.sort(function(n, a) {
    return n.index - a.index;
  }), e;
}
function fv(t, r) {
  if (!t.autoManage)
    return { size: 0, syncFunc: ov };
  for (var e = lv(t.uniforms, r), i = uv(e), n = i.uboElements, a = i.size, s = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], o = 0; o < n.length; o++) {
    for (var h = n[o], u = t.uniforms[h.data.name], l = h.data.name, f = !1, c = 0; c < rr.length; c++) {
      var d = rr[c];
      if (d.codeUbo && d.test(h.data, u)) {
        s.push("offset = " + h.offset / 4 + ";", rr[c].codeUbo(h.data.name, u)), f = !0;
        break;
      }
    }
    if (!f)
      if (h.data.size > 1) {
        var p = Du(h.data.type), v = Math.max(Vu[h.data.type] / 16, 1), _ = p / v, m = (4 - _ % 4) % 4;
        s.push(`
                cv = ud.` + l + `.value;
                v = uv.` + l + `;
                offset = ` + h.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + h.data.size * v + `; i++)
                {
                    for(var j = 0; j < ` + _ + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + m + `;
                }

                `);
      } else {
        var y = hv[h.data.type];
        s.push(`
                cv = ud.` + l + `.value;
                v = uv.` + l + `;
                offset = ` + h.offset / 4 + `;
                ` + y + `;
                `);
      }
  }
  return s.push(`
       renderer.buffer.update(buffer);
    `), {
    size: a,
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", s.join(`
`))
  };
}
var cv = function() {
  function t(r, e) {
    this.program = r, this.uniformData = e, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
  }
  return t.prototype.destroy = function() {
    this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
  }, t;
}();
function dv(t, r) {
  for (var e = {}, i = r.getProgramParameter(t, r.ACTIVE_ATTRIBUTES), n = 0; n < i; n++) {
    var a = r.getActiveAttrib(t, n);
    if (a.name.indexOf("gl_") !== 0) {
      var s = ku(r, a.type), o = {
        type: s,
        name: a.name,
        size: Du(s),
        location: r.getAttribLocation(t, a.name)
      };
      e[a.name] = o;
    }
  }
  return e;
}
function pv(t, r) {
  for (var e = {}, i = r.getProgramParameter(t, r.ACTIVE_UNIFORMS), n = 0; n < i; n++) {
    var a = r.getActiveUniform(t, n), s = a.name.replace(/\[.*?\]$/, ""), o = !!a.name.match(/\[.*?\]$/), h = ku(r, a.type);
    e[s] = {
      name: s,
      index: n,
      type: h,
      size: a.size,
      isArray: o,
      value: Bu(h, a.size)
    };
  }
  return e;
}
function vv(t, r) {
  var e = no(t, t.VERTEX_SHADER, r.vertexSrc), i = no(t, t.FRAGMENT_SHADER, r.fragmentSrc), n = t.createProgram();
  if (t.attachShader(n, e), t.attachShader(n, i), t.linkProgram(n), t.getProgramParameter(n, t.LINK_STATUS) || Mp(t, n, e, i), r.attributeData = dv(n, t), r.uniformData = pv(n, t), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(r.vertexSrc)) {
    var a = Object.keys(r.attributeData);
    a.sort(function(l, f) {
      return l > f ? 1 : -1;
    });
    for (var s = 0; s < a.length; s++)
      r.attributeData[a[s]].location = s, t.bindAttribLocation(n, s, a[s]);
    t.linkProgram(n);
  }
  t.deleteShader(e), t.deleteShader(i);
  var o = {};
  for (var s in r.uniformData) {
    var h = r.uniformData[s];
    o[s] = {
      location: t.getUniformLocation(n, s),
      value: Bu(h.type, h.size)
    };
  }
  var u = new cv(n, o);
  return u;
}
var _v = 0, ai = { textureCount: 0, uboCount: 0 }, mv = function() {
  function t(r) {
    this.destroyed = !1, this.renderer = r, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = _v++;
  }
  return t.prototype.systemCheck = function() {
    if (!qp())
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
  }, t.prototype.contextChange = function(r) {
    this.gl = r, this.reset();
  }, t.prototype.bind = function(r, e) {
    r.uniforms.globals = this.renderer.globalUniforms;
    var i = r.program, n = i.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(r);
    return this.shader = r, this.program !== i && (this.program = i, this.gl.useProgram(n.program)), e || (ai.textureCount = 0, ai.uboCount = 0, this.syncUniformGroup(r.uniformGroup, ai)), n;
  }, t.prototype.setUniforms = function(r) {
    var e = this.shader.program, i = e.glPrograms[this.renderer.CONTEXT_UID];
    e.syncUniforms(i.uniformData, r, this.renderer);
  }, t.prototype.syncUniformGroup = function(r, e) {
    var i = this.getGlProgram();
    (!r.static || r.dirtyId !== i.uniformDirtyGroups[r.id]) && (i.uniformDirtyGroups[r.id] = r.dirtyId, this.syncUniforms(r, i, e));
  }, t.prototype.syncUniforms = function(r, e, i) {
    var n = r.syncUniforms[this.shader.program.id] || this.createSyncGroups(r);
    n(e.uniformData, r.uniforms, this.renderer, i);
  }, t.prototype.createSyncGroups = function(r) {
    var e = this.getSignature(r, this.shader.program.uniformData, "u");
    return this.cache[e] || (this.cache[e] = jp(r, this.shader.program.uniformData)), r.syncUniforms[this.shader.program.id] = this.cache[e], r.syncUniforms[this.shader.program.id];
  }, t.prototype.syncUniformBufferGroup = function(r, e) {
    var i = this.getGlProgram();
    if (!r.static || r.dirtyId !== 0 || !i.uniformGroups[r.id]) {
      r.dirtyId = 0;
      var n = i.uniformGroups[r.id] || this.createSyncBufferGroup(r, i, e);
      r.buffer.update(), n(i.uniformData, r.uniforms, this.renderer, ai, r.buffer);
    }
    this.renderer.buffer.bindBufferBase(r.buffer, i.uniformBufferBindings[e]);
  }, t.prototype.createSyncBufferGroup = function(r, e, i) {
    var n = this.renderer.gl;
    this.renderer.buffer.bind(r.buffer);
    var a = this.gl.getUniformBlockIndex(e.program, i);
    e.uniformBufferBindings[i] = this.shader.uniformBindCount, n.uniformBlockBinding(e.program, a, this.shader.uniformBindCount), this.shader.uniformBindCount++;
    var s = this.getSignature(r, this.shader.program.uniformData, "ubo"), o = this._uboCache[s];
    if (o || (o = this._uboCache[s] = fv(r, this.shader.program.uniformData)), r.autoManage) {
      var h = new Float32Array(o.size / 4);
      r.buffer.update(h);
    }
    return e.uniformGroups[r.id] = o.syncFunc, e.uniformGroups[r.id];
  }, t.prototype.getSignature = function(r, e, i) {
    var n = r.uniforms, a = [i + "-"];
    for (var s in n)
      a.push(s), e[s] && a.push(e[s].type);
    return a.join("-");
  }, t.prototype.getGlProgram = function() {
    return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
  }, t.prototype.generateProgram = function(r) {
    var e = this.gl, i = r.program, n = vv(e, i);
    return i.glPrograms[this.renderer.CONTEXT_UID] = n, n;
  }, t.prototype.reset = function() {
    this.program = null, this.shader = null;
  }, t.prototype.destroy = function() {
    this.renderer = null, this.destroyed = !0;
  }, t;
}();
function yv(t, r) {
  return r === void 0 && (r = []), r[D.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.ADD] = [t.ONE, t.ONE], r[D.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.NONE] = [0, 0], r[D.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE], r[D.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], r[D.SRC_IN] = [t.DST_ALPHA, t.ZERO], r[D.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO], r[D.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA], r[D.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE], r[D.DST_IN] = [t.ZERO, t.SRC_ALPHA], r[D.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA], r[D.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA], r[D.XOR] = [t.ONE_MINUS_DST_ALPHA, t.ONE_MINUS_SRC_ALPHA], r[D.SUBTRACT] = [t.ONE, t.ONE, t.ONE, t.ONE, t.FUNC_REVERSE_SUBTRACT, t.FUNC_ADD], r;
}
var xv = 0, gv = 1, bv = 2, Tv = 3, Iv = 4, Ev = 5, wv = function() {
  function t() {
    this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = D.NONE, this._blendEq = !1, this.map = [], this.map[xv] = this.setBlend, this.map[gv] = this.setOffset, this.map[bv] = this.setCullFace, this.map[Tv] = this.setDepthTest, this.map[Iv] = this.setFrontFace, this.map[Ev] = this.setDepthMask, this.checks = [], this.defaultState = new De(), this.defaultState.blend = !0;
  }
  return t.prototype.contextChange = function(r) {
    this.gl = r, this.blendModes = yv(r), this.set(this.defaultState), this.reset();
  }, t.prototype.set = function(r) {
    if (r = r || this.defaultState, this.stateId !== r.data) {
      for (var e = this.stateId ^ r.data, i = 0; e; )
        e & 1 && this.map[i].call(this, !!(r.data & 1 << i)), e = e >> 1, i++;
      this.stateId = r.data;
    }
    for (var i = 0; i < this.checks.length; i++)
      this.checks[i](this, r);
  }, t.prototype.forceState = function(r) {
    r = r || this.defaultState;
    for (var e = 0; e < this.map.length; e++)
      this.map[e].call(this, !!(r.data & 1 << e));
    for (var e = 0; e < this.checks.length; e++)
      this.checks[e](this, r);
    this.stateId = r.data;
  }, t.prototype.setBlend = function(r) {
    this.updateCheck(t.checkBlendMode, r), this.gl[r ? "enable" : "disable"](this.gl.BLEND);
  }, t.prototype.setOffset = function(r) {
    this.updateCheck(t.checkPolygonOffset, r), this.gl[r ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }, t.prototype.setDepthTest = function(r) {
    this.gl[r ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }, t.prototype.setDepthMask = function(r) {
    this.gl.depthMask(r);
  }, t.prototype.setCullFace = function(r) {
    this.gl[r ? "enable" : "disable"](this.gl.CULL_FACE);
  }, t.prototype.setFrontFace = function(r) {
    this.gl.frontFace(this.gl[r ? "CW" : "CCW"]);
  }, t.prototype.setBlendMode = function(r) {
    if (r !== this.blendMode) {
      this.blendMode = r;
      var e = this.blendModes[r], i = this.gl;
      e.length === 2 ? i.blendFunc(e[0], e[1]) : i.blendFuncSeparate(e[0], e[1], e[2], e[3]), e.length === 6 ? (this._blendEq = !0, i.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD));
    }
  }, t.prototype.setPolygonOffset = function(r, e) {
    this.gl.polygonOffset(r, e);
  }, t.prototype.reset = function() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
  }, t.prototype.updateCheck = function(r, e) {
    var i = this.checks.indexOf(r);
    e && i === -1 ? this.checks.push(r) : !e && i !== -1 && this.checks.splice(i, 1);
  }, t.checkBlendMode = function(r, e) {
    r.setBlendMode(e.blendMode);
  }, t.checkPolygonOffset = function(r, e) {
    r.setPolygonOffset(1, e.polygonOffset);
  }, t.prototype.destroy = function() {
    this.gl = null;
  }, t;
}(), Rv = function() {
  function t(r) {
    this.renderer = r, this.count = 0, this.checkCount = 0, this.maxIdle = O.GC_MAX_IDLE, this.checkCountMax = O.GC_MAX_CHECK_COUNT, this.mode = O.GC_MODE;
  }
  return t.prototype.postrender = function() {
    !this.renderer.renderingToScreen || (this.count++, this.mode !== jn.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }, t.prototype.run = function() {
    for (var r = this.renderer.texture, e = r.managedTextures, i = !1, n = 0; n < e.length; n++) {
      var a = e[n];
      !a.framebuffer && this.count - a.touched > this.maxIdle && (r.destroyTexture(a, !0), e[n] = null, i = !0);
    }
    if (i) {
      for (var s = 0, n = 0; n < e.length; n++)
        e[n] !== null && (e[s++] = e[n]);
      e.length = s;
    }
  }, t.prototype.unload = function(r) {
    var e = this.renderer.texture, i = r._texture;
    i && !i.framebuffer && e.destroyTexture(i);
    for (var n = r.children.length - 1; n >= 0; n--)
      this.unload(r.children[n]);
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}();
function Cv(t) {
  var r, e, i, n, a, s, o, h, u, l, f, c, d, p, v, _, m, y, g, T, b, x, E;
  return "WebGL2RenderingContext" in globalThis && t instanceof globalThis.WebGL2RenderingContext ? E = (r = {}, r[G.UNSIGNED_BYTE] = (e = {}, e[P.RGBA] = t.RGBA8, e[P.RGB] = t.RGB8, e[P.RG] = t.RG8, e[P.RED] = t.R8, e[P.RGBA_INTEGER] = t.RGBA8UI, e[P.RGB_INTEGER] = t.RGB8UI, e[P.RG_INTEGER] = t.RG8UI, e[P.RED_INTEGER] = t.R8UI, e[P.ALPHA] = t.ALPHA, e[P.LUMINANCE] = t.LUMINANCE, e[P.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, e), r[G.BYTE] = (i = {}, i[P.RGBA] = t.RGBA8_SNORM, i[P.RGB] = t.RGB8_SNORM, i[P.RG] = t.RG8_SNORM, i[P.RED] = t.R8_SNORM, i[P.RGBA_INTEGER] = t.RGBA8I, i[P.RGB_INTEGER] = t.RGB8I, i[P.RG_INTEGER] = t.RG8I, i[P.RED_INTEGER] = t.R8I, i), r[G.UNSIGNED_SHORT] = (n = {}, n[P.RGBA_INTEGER] = t.RGBA16UI, n[P.RGB_INTEGER] = t.RGB16UI, n[P.RG_INTEGER] = t.RG16UI, n[P.RED_INTEGER] = t.R16UI, n[P.DEPTH_COMPONENT] = t.DEPTH_COMPONENT16, n), r[G.SHORT] = (a = {}, a[P.RGBA_INTEGER] = t.RGBA16I, a[P.RGB_INTEGER] = t.RGB16I, a[P.RG_INTEGER] = t.RG16I, a[P.RED_INTEGER] = t.R16I, a), r[G.UNSIGNED_INT] = (s = {}, s[P.RGBA_INTEGER] = t.RGBA32UI, s[P.RGB_INTEGER] = t.RGB32UI, s[P.RG_INTEGER] = t.RG32UI, s[P.RED_INTEGER] = t.R32UI, s[P.DEPTH_COMPONENT] = t.DEPTH_COMPONENT24, s), r[G.INT] = (o = {}, o[P.RGBA_INTEGER] = t.RGBA32I, o[P.RGB_INTEGER] = t.RGB32I, o[P.RG_INTEGER] = t.RG32I, o[P.RED_INTEGER] = t.R32I, o), r[G.FLOAT] = (h = {}, h[P.RGBA] = t.RGBA32F, h[P.RGB] = t.RGB32F, h[P.RG] = t.RG32F, h[P.RED] = t.R32F, h[P.DEPTH_COMPONENT] = t.DEPTH_COMPONENT32F, h), r[G.HALF_FLOAT] = (u = {}, u[P.RGBA] = t.RGBA16F, u[P.RGB] = t.RGB16F, u[P.RG] = t.RG16F, u[P.RED] = t.R16F, u), r[G.UNSIGNED_SHORT_5_6_5] = (l = {}, l[P.RGB] = t.RGB565, l), r[G.UNSIGNED_SHORT_4_4_4_4] = (f = {}, f[P.RGBA] = t.RGBA4, f), r[G.UNSIGNED_SHORT_5_5_5_1] = (c = {}, c[P.RGBA] = t.RGB5_A1, c), r[G.UNSIGNED_INT_2_10_10_10_REV] = (d = {}, d[P.RGBA] = t.RGB10_A2, d[P.RGBA_INTEGER] = t.RGB10_A2UI, d), r[G.UNSIGNED_INT_10F_11F_11F_REV] = (p = {}, p[P.RGB] = t.R11F_G11F_B10F, p), r[G.UNSIGNED_INT_5_9_9_9_REV] = (v = {}, v[P.RGB] = t.RGB9_E5, v), r[G.UNSIGNED_INT_24_8] = (_ = {}, _[P.DEPTH_STENCIL] = t.DEPTH24_STENCIL8, _), r[G.FLOAT_32_UNSIGNED_INT_24_8_REV] = (m = {}, m[P.DEPTH_STENCIL] = t.DEPTH32F_STENCIL8, m), r) : E = (y = {}, y[G.UNSIGNED_BYTE] = (g = {}, g[P.RGBA] = t.RGBA, g[P.RGB] = t.RGB, g[P.ALPHA] = t.ALPHA, g[P.LUMINANCE] = t.LUMINANCE, g[P.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, g), y[G.UNSIGNED_SHORT_5_6_5] = (T = {}, T[P.RGB] = t.RGB, T), y[G.UNSIGNED_SHORT_4_4_4_4] = (b = {}, b[P.RGBA] = t.RGBA, b), y[G.UNSIGNED_SHORT_5_5_5_1] = (x = {}, x[P.RGBA] = t.RGBA, x), y), E;
}
var fn = function() {
  function t(r) {
    this.texture = r, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = G.UNSIGNED_BYTE, this.internalFormat = P.RGBA, this.samplerType = 0;
  }
  return t;
}(), Nv = function() {
  function t(r) {
    this.renderer = r, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new et(), this.hasIntegerTextures = !1;
  }
  return t.prototype.contextChange = function() {
    var r = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = Cv(r);
    var e = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = e;
    for (var i = 0; i < e; i++)
      this.boundTextures[i] = null;
    this.emptyTextures = {};
    var n = new fn(r.createTexture());
    r.bindTexture(r.TEXTURE_2D, n.texture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[r.TEXTURE_2D] = n, this.emptyTextures[r.TEXTURE_CUBE_MAP] = new fn(r.createTexture()), r.bindTexture(r.TEXTURE_CUBE_MAP, this.emptyTextures[r.TEXTURE_CUBE_MAP].texture);
    for (var i = 0; i < 6; i++)
      r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, null);
    r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_MIN_FILTER, r.LINEAR);
    for (var i = 0; i < this.boundTextures.length; i++)
      this.bind(null, i);
  }, t.prototype.bind = function(r, e) {
    e === void 0 && (e = 0);
    var i = this.gl;
    if (r = r == null ? void 0 : r.castToBaseTexture(), r && r.valid && !r.parentTextureArray) {
      r.touched = this.renderer.textureGC.count;
      var n = r._glTextures[this.CONTEXT_UID] || this.initTexture(r);
      this.boundTextures[e] !== r && (this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), i.bindTexture(r.target, n.texture)), n.dirtyId !== r.dirtyId ? (this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), this.updateTexture(r)) : n.dirtyStyleId !== r.dirtyStyleId && this.updateTextureStyle(r), this.boundTextures[e] = r;
    } else
      this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), i.bindTexture(i.TEXTURE_2D, this.emptyTextures[i.TEXTURE_2D].texture), this.boundTextures[e] = null;
  }, t.prototype.reset = function() {
    this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
    for (var r = 0; r < this.boundTextures.length; r++)
      this.boundTextures[r] = this.unknownTexture;
  }, t.prototype.unbind = function(r) {
    var e = this, i = e.gl, n = e.boundTextures;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = !1;
      for (var a = 0; a < n.length; a++)
        n[a] === this.unknownTexture && this.bind(null, a);
    }
    for (var a = 0; a < n.length; a++)
      n[a] === r && (this.currentLocation !== a && (i.activeTexture(i.TEXTURE0 + a), this.currentLocation = a), i.bindTexture(r.target, this.emptyTextures[r.target].texture), n[a] = null);
  }, t.prototype.ensureSamplerType = function(r) {
    var e = this, i = e.boundTextures, n = e.hasIntegerTextures, a = e.CONTEXT_UID;
    if (!!n)
      for (var s = r - 1; s >= 0; --s) {
        var o = i[s];
        if (o) {
          var h = o._glTextures[a];
          h.samplerType !== wi.FLOAT && this.renderer.texture.unbind(o);
        }
      }
  }, t.prototype.initTexture = function(r) {
    var e = new fn(this.gl.createTexture());
    return e.dirtyId = -1, r._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(r), r.on("dispose", this.destroyTexture, this), e;
  }, t.prototype.initTextureType = function(r, e) {
    var i, n;
    e.internalFormat = (n = (i = this.internalFormats[r.type]) === null || i === void 0 ? void 0 : i[r.format]) !== null && n !== void 0 ? n : r.format, this.webGLVersion === 2 && r.type === G.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = r.type;
  }, t.prototype.updateTexture = function(r) {
    var e = r._glTextures[this.CONTEXT_UID];
    if (!!e) {
      var i = this.renderer;
      if (this.initTextureType(r, e), r.resource && r.resource.upload(i, r, e))
        e.samplerType !== wi.FLOAT && (this.hasIntegerTextures = !0);
      else {
        var n = r.realWidth, a = r.realHeight, s = i.gl;
        (e.width !== n || e.height !== a || e.dirtyId < 0) && (e.width = n, e.height = a, s.texImage2D(r.target, 0, e.internalFormat, n, a, 0, r.format, e.type, null));
      }
      r.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(r), e.dirtyId = r.dirtyId;
    }
  }, t.prototype.destroyTexture = function(r, e) {
    var i = this.gl;
    if (r = r.castToBaseTexture(), r._glTextures[this.CONTEXT_UID] && (this.unbind(r), i.deleteTexture(r._glTextures[this.CONTEXT_UID].texture), r.off("dispose", this.destroyTexture, this), delete r._glTextures[this.CONTEXT_UID], !e)) {
      var n = this.managedTextures.indexOf(r);
      n !== -1 && er(this.managedTextures, n, 1);
    }
  }, t.prototype.updateTextureStyle = function(r) {
    var e = r._glTextures[this.CONTEXT_UID];
    !e || ((r.mipmap === te.POW2 || this.webGLVersion !== 2) && !r.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = r.mipmap >= 1, this.webGLVersion !== 2 && !r.isPowerOfTwo ? e.wrapMode = Ft.CLAMP : e.wrapMode = r.wrapMode, r.resource && r.resource.style(this.renderer, r, e) || this.setStyle(r, e), e.dirtyStyleId = r.dirtyStyleId);
  }, t.prototype.setStyle = function(r, e) {
    var i = this.gl;
    if (e.mipmap && r.mipmap !== te.ON_MANUAL && i.generateMipmap(r.target), i.texParameteri(r.target, i.TEXTURE_WRAP_S, e.wrapMode), i.texParameteri(r.target, i.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
      i.texParameteri(r.target, i.TEXTURE_MIN_FILTER, r.scaleMode === he.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
      var n = this.renderer.context.extensions.anisotropicFiltering;
      if (n && r.anisotropicLevel > 0 && r.scaleMode === he.LINEAR) {
        var a = Math.min(r.anisotropicLevel, i.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        i.texParameterf(r.target, n.TEXTURE_MAX_ANISOTROPY_EXT, a);
      }
    } else
      i.texParameteri(r.target, i.TEXTURE_MIN_FILTER, r.scaleMode === he.LINEAR ? i.LINEAR : i.NEAREST);
    i.texParameteri(r.target, i.TEXTURE_MAG_FILTER, r.scaleMode === he.LINEAR ? i.LINEAR : i.NEAREST);
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t;
}(), cn = new ft(), Av = function(t) {
  ut(r, t);
  function r(e, i) {
    e === void 0 && (e = Or.UNKNOWN);
    var n = t.call(this) || this;
    return i = Object.assign({}, O.RENDER_OPTIONS, i), n.options = i, n.type = e, n.screen = new K(0, 0, i.width, i.height), n.view = i.view || O.ADAPTER.createCanvas(), n.resolution = i.resolution || O.RESOLUTION, n.useContextAlpha = i.useContextAlpha, n.autoDensity = !!i.autoDensity, n.preserveDrawingBuffer = i.preserveDrawingBuffer, n.clearBeforeRender = i.clearBeforeRender, n._backgroundColor = 0, n._backgroundColorRgba = [0, 0, 0, 1], n._backgroundColorString = "#000000", n.backgroundColor = i.backgroundColor || n._backgroundColor, n.backgroundAlpha = i.backgroundAlpha, i.transparent !== void 0 && (Kt("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), n.useContextAlpha = i.transparent, n.backgroundAlpha = i.transparent ? 0 : 1), n._lastObjectRendered = null, n.plugins = {}, n;
  }
  return r.prototype.initPlugins = function(e) {
    for (var i in e)
      this.plugins[i] = new e[i](this);
  }, Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this.view.width;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this.view.height;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.resize = function(e, i) {
    this.view.width = Math.round(e * this.resolution), this.view.height = Math.round(i * this.resolution);
    var n = this.view.width / this.resolution, a = this.view.height / this.resolution;
    this.screen.width = n, this.screen.height = a, this.autoDensity && (this.view.style.width = n + "px", this.view.style.height = a + "px"), this.emit("resize", n, a);
  }, r.prototype.generateTexture = function(e, i, n, a) {
    i === void 0 && (i = {}), typeof i == "number" && (Kt("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), i = { scaleMode: i, resolution: n, region: a });
    var s = i.region, o = cp(i, ["region"]);
    a = s || e.getLocalBounds(null, !0), a.width === 0 && (a.width = 1), a.height === 0 && (a.height = 1);
    var h = Le.create(Zn({ width: a.width, height: a.height }, o));
    return cn.tx = -a.x, cn.ty = -a.y, this.render(e, {
      renderTexture: h,
      clear: !1,
      transform: cn,
      skipUpdateTransform: !!e.parent
    }), h;
  }, r.prototype.destroy = function(e) {
    for (var i in this.plugins)
      this.plugins[i].destroy(), this.plugins[i] = null;
    e && this.view.parentNode && this.view.parentNode.removeChild(this.view);
    var n = this;
    n.plugins = null, n.type = Or.UNKNOWN, n.view = null, n.screen = null, n._tempDisplayObjectParent = null, n.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
  }, Object.defineProperty(r.prototype, "backgroundColor", {
    get: function() {
      return this._backgroundColor;
    },
    set: function(e) {
      this._backgroundColor = e, this._backgroundColorString = Cu(e), nr(e, this._backgroundColorRgba);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "backgroundAlpha", {
    get: function() {
      return this._backgroundColorRgba[3];
    },
    set: function(e) {
      this._backgroundColorRgba[3] = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Mr), Pv = function() {
  function t(r) {
    this.buffer = r || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
  }
  return t;
}(), Uv = function() {
  function t(r) {
    this.renderer = r, this.managedBuffers = {}, this.boundBufferBases = {};
  }
  return t.prototype.destroy = function() {
    this.renderer = null;
  }, t.prototype.contextChange = function() {
    this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }, t.prototype.bind = function(r) {
    var e = this, i = e.gl, n = e.CONTEXT_UID, a = r._glBuffers[n] || this.createGLBuffer(r);
    i.bindBuffer(r.type, a.buffer);
  }, t.prototype.bindBufferBase = function(r, e) {
    var i = this, n = i.gl, a = i.CONTEXT_UID;
    if (this.boundBufferBases[e] !== r) {
      var s = r._glBuffers[a] || this.createGLBuffer(r);
      this.boundBufferBases[e] = r, n.bindBufferBase(n.UNIFORM_BUFFER, e, s.buffer);
    }
  }, t.prototype.bindBufferRange = function(r, e, i) {
    var n = this, a = n.gl, s = n.CONTEXT_UID;
    i = i || 0;
    var o = r._glBuffers[s] || this.createGLBuffer(r);
    a.bindBufferRange(a.UNIFORM_BUFFER, e || 0, o.buffer, i * 256, 256);
  }, t.prototype.update = function(r) {
    var e = this, i = e.gl, n = e.CONTEXT_UID, a = r._glBuffers[n];
    if (r._updateID !== a.updateID)
      if (a.updateID = r._updateID, i.bindBuffer(r.type, a.buffer), a.byteLength >= r.data.byteLength)
        i.bufferSubData(r.type, 0, r.data);
      else {
        var s = r.static ? i.STATIC_DRAW : i.DYNAMIC_DRAW;
        a.byteLength = r.data.byteLength, i.bufferData(r.type, r.data, s);
      }
  }, t.prototype.dispose = function(r, e) {
    if (!!this.managedBuffers[r.id]) {
      delete this.managedBuffers[r.id];
      var i = r._glBuffers[this.CONTEXT_UID], n = this.gl;
      r.disposeRunner.remove(this), i && (e || n.deleteBuffer(i.buffer), delete r._glBuffers[this.CONTEXT_UID]);
    }
  }, t.prototype.disposeAll = function(r) {
    for (var e = Object.keys(this.managedBuffers), i = 0; i < e.length; i++)
      this.dispose(this.managedBuffers[e[i]], r);
  }, t.prototype.createGLBuffer = function(r) {
    var e = this, i = e.CONTEXT_UID, n = e.gl;
    return r._glBuffers[i] = new Pv(n.createBuffer()), this.managedBuffers[r.id] = r, r.disposeRunner.add(this), r._glBuffers[i];
  }, t;
}(), Vr = function(t) {
  ut(r, t);
  function r(e) {
    var i = t.call(this, Or.WEBGL, e) || this;
    return e = i.options, i.gl = null, i.CONTEXT_UID = 0, i.runners = {
      destroy: new Rt("destroy"),
      contextChange: new Rt("contextChange"),
      reset: new Rt("reset"),
      update: new Rt("update"),
      postrender: new Rt("postrender"),
      prerender: new Rt("prerender"),
      resize: new Rt("resize")
    }, i.runners.contextChange.add(i), i.globalUniforms = new Ue({
      projectionMatrix: new ft()
    }, !0), i.addSystem(Hu, "mask").addSystem(Op, "context").addSystem(wv, "state").addSystem(mv, "shader").addSystem(Nv, "texture").addSystem(Uv, "buffer").addSystem(Gp, "geometry").addSystem(Sp, "framebuffer").addSystem(iv, "scissor").addSystem(nv, "stencil").addSystem(av, "projection").addSystem(Rv, "textureGC").addSystem(Pp, "filter").addSystem(sv, "renderTexture").addSystem(Up, "batch"), i.initPlugins(r.__plugins), i.multisample = void 0, e.context ? i.context.initFromContext(e.context) : i.context.initFromOptions({
      alpha: !!i.useContextAlpha,
      antialias: e.antialias,
      premultipliedAlpha: i.useContextAlpha && i.useContextAlpha !== "notMultiplied",
      stencil: !0,
      preserveDrawingBuffer: e.preserveDrawingBuffer,
      powerPreference: i.options.powerPreference
    }), i.renderingToScreen = !0, hf(i.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"), i.resize(i.options.width, i.options.height), i;
  }
  return r.create = function(e) {
    if (uf())
      return new r(e);
    throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
  }, r.prototype.contextChange = function() {
    var e = this.gl, i;
    if (this.context.webGLVersion === 1) {
      var n = e.getParameter(e.FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.FRAMEBUFFER, null), i = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, n);
    } else {
      var n = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), i = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, n);
    }
    i >= xt.HIGH ? this.multisample = xt.HIGH : i >= xt.MEDIUM ? this.multisample = xt.MEDIUM : i >= xt.LOW ? this.multisample = xt.LOW : this.multisample = xt.NONE;
  }, r.prototype.addSystem = function(e, i) {
    var n = new e(this);
    if (this[i])
      throw new Error('Whoops! The name "' + i + '" is already in use');
    this[i] = n;
    for (var a in this.runners)
      this.runners[a].add(n);
    return this;
  }, r.prototype.render = function(e, i) {
    var n, a, s, o;
    if (i && (i instanceof Le ? (Kt("6.0.0", "Renderer#render arguments changed, use options instead."), n = i, a = arguments[2], s = arguments[3], o = arguments[4]) : (n = i.renderTexture, a = i.clear, s = i.transform, o = i.skipUpdateTransform)), this.renderingToScreen = !n, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = s, !this.context.isLost) {
      if (n || (this._lastObjectRendered = e), !o) {
        var h = e.enableTempParent();
        e.updateTransform(), e.disableTempParent(h);
      }
      this.renderTexture.bind(n), this.batch.currentRenderer.start(), (a !== void 0 ? a : this.clearBeforeRender) && this.renderTexture.clear(), e.render(this), this.batch.currentRenderer.flush(), n && n.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
    }
  }, r.prototype.generateTexture = function(e, i, n, a) {
    i === void 0 && (i = {});
    var s = t.prototype.generateTexture.call(this, e, i, n, a);
    return this.framebuffer.blit(), s;
  }, r.prototype.resize = function(e, i) {
    t.prototype.resize.call(this, e, i), this.runners.resize.emit(this.screen.height, this.screen.width);
  }, r.prototype.reset = function() {
    return this.runners.reset.emit(), this;
  }, r.prototype.clear = function() {
    this.renderTexture.bind(), this.renderTexture.clear();
  }, r.prototype.destroy = function(e) {
    this.runners.destroy.emit();
    for (var i in this.runners)
      this.runners[i].destroy();
    t.prototype.destroy.call(this, e), this.gl = null;
  }, Object.defineProperty(r.prototype, "extract", {
    get: function() {
      return Kt("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."), this.plugins.extract;
    },
    enumerable: !1,
    configurable: !0
  }), r.registerPlugin = function(e, i) {
    Kt("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."), fe.add({
      name: e,
      type: ot.RendererPlugin,
      ref: i
    });
  }, r.__plugins = {}, r;
}(Av);
fe.handleByMap(ot.RendererPlugin, Vr.__plugins);
function Ov(t) {
  return Vr.create(t);
}
var Fv = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`, Lv = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`, Sv = Fv, ju = Lv, Kn = function() {
  function t() {
    this.texArray = null, this.blend = 0, this.type = Ot.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
  }
  return t;
}(), Qn = function() {
  function t() {
    this.elements = [], this.ids = [], this.count = 0;
  }
  return t.prototype.clear = function() {
    for (var r = 0; r < this.count; r++)
      this.elements[r] = null;
    this.count = 0;
  }, t;
}(), ta = function() {
  function t(r) {
    typeof r == "number" ? this.rawBinaryData = new ArrayBuffer(r) : r instanceof Uint8Array ? this.rawBinaryData = r.buffer : this.rawBinaryData = r, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
  }
  return Object.defineProperty(t.prototype, "int8View", {
    get: function() {
      return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "uint8View", {
    get: function() {
      return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "int16View", {
    get: function() {
      return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "uint16View", {
    get: function() {
      return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "int32View", {
    get: function() {
      return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.view = function(r) {
    return this[r + "View"];
  }, t.prototype.destroy = function() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }, t.sizeOf = function(r) {
    switch (r) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(r + " isn't a valid view type");
    }
  }, t;
}(), Ir = function(t) {
  ut(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return i.shaderGenerator = null, i.geometryClass = null, i.vertexSize = null, i.state = De.for2d(), i.size = O.SPRITE_BATCH_SIZE * 4, i._vertexCount = 0, i._indexCount = 0, i._bufferedElements = [], i._bufferedTextures = [], i._bufferSize = 0, i._shader = null, i._packedGeometries = [], i._packedGeometryPoolSize = 2, i._flushId = 0, i._aBuffers = {}, i._iBuffers = {}, i.MAX_TEXTURES = 1, i.renderer.on("prerender", i.onPrerender, i), e.runners.contextChange.add(i), i._dcIndex = 0, i._aIndex = 0, i._iIndex = 0, i._attributeBuffer = null, i._indexBuffer = null, i._tempBoundTextures = [], i;
  }
  return r.prototype.contextChange = function() {
    var e = this.renderer.gl;
    O.PREFER_ENV === ue.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), O.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = $p(this.MAX_TEXTURES, e)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
    for (var i = 0; i < this._packedGeometryPoolSize; i++)
      this._packedGeometries[i] = new this.geometryClass();
    this.initFlushBuffers();
  }, r.prototype.initFlushBuffers = function() {
    for (var e = r._drawCallPool, i = r._textureArrayPool, n = this.size / 4, a = Math.floor(n / this.MAX_TEXTURES) + 1; e.length < n; )
      e.push(new Kn());
    for (; i.length < a; )
      i.push(new Qn());
    for (var s = 0; s < this.MAX_TEXTURES; s++)
      this._tempBoundTextures[s] = null;
  }, r.prototype.onPrerender = function() {
    this._flushId = 0;
  }, r.prototype.render = function(e) {
    !e._texture.valid || (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
  }, r.prototype.buildTexturesAndDrawCalls = function() {
    var e = this, i = e._bufferedTextures, n = e.MAX_TEXTURES, a = r._textureArrayPool, s = this.renderer.batch, o = this._tempBoundTextures, h = this.renderer.textureGC.count, u = ++et._globalBatch, l = 0, f = a[0], c = 0;
    s.copyBoundTextures(o, n);
    for (var d = 0; d < this._bufferSize; ++d) {
      var p = i[d];
      i[d] = null, p._batchEnabled !== u && (f.count >= n && (s.boundArray(f, o, u, n), this.buildDrawCalls(f, c, d), c = d, f = a[++l], ++u), p._batchEnabled = u, p.touched = h, f.elements[f.count++] = p);
    }
    f.count > 0 && (s.boundArray(f, o, u, n), this.buildDrawCalls(f, c, this._bufferSize), ++l, ++u);
    for (var d = 0; d < o.length; d++)
      o[d] = null;
    et._globalBatch = u;
  }, r.prototype.buildDrawCalls = function(e, i, n) {
    var a = this, s = a._bufferedElements, o = a._attributeBuffer, h = a._indexBuffer, u = a.vertexSize, l = r._drawCallPool, f = this._dcIndex, c = this._aIndex, d = this._iIndex, p = l[f];
    p.start = this._iIndex, p.texArray = e;
    for (var v = i; v < n; ++v) {
      var _ = s[v], m = _._texture.baseTexture, y = Pa[m.alphaMode ? 1 : 0][_.blendMode];
      s[v] = null, i < v && p.blend !== y && (p.size = d - p.start, i = v, p = l[++f], p.texArray = e, p.start = d), this.packInterleavedGeometry(_, o, h, c, d), c += _.vertexData.length / 2 * u, d += _.indices.length, p.blend = y;
    }
    i < n && (p.size = d - p.start, ++f), this._dcIndex = f, this._aIndex = c, this._iIndex = d;
  }, r.prototype.bindAndClearTexArray = function(e) {
    for (var i = this.renderer.texture, n = 0; n < e.count; n++)
      i.bind(e.elements[n], e.ids[n]), e.elements[n] = null;
    e.count = 0;
  }, r.prototype.updateGeometry = function() {
    var e = this, i = e._packedGeometries, n = e._attributeBuffer, a = e._indexBuffer;
    O.CAN_UPLOAD_SAME_BUFFER ? (i[this._flushId]._buffer.update(n.rawBinaryData), i[this._flushId]._indexBuffer.update(a), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, i[this._flushId] = new this.geometryClass()), i[this._flushId]._buffer.update(n.rawBinaryData), i[this._flushId]._indexBuffer.update(a), this.renderer.geometry.bind(i[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }, r.prototype.drawBatches = function() {
    for (var e = this._dcIndex, i = this.renderer, n = i.gl, a = i.state, s = r._drawCallPool, o = null, h = 0; h < e; h++) {
      var u = s[h], l = u.texArray, f = u.type, c = u.size, d = u.start, p = u.blend;
      o !== l && (o = l, this.bindAndClearTexArray(l)), this.state.blendMode = p, a.set(this.state), n.drawElements(f, c, n.UNSIGNED_SHORT, d * 2);
    }
  }, r.prototype.flush = function() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }, r.prototype.start = function() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), O.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
  }, r.prototype.stop = function() {
    this.flush();
  }, r.prototype.destroy = function() {
    for (var e = 0; e < this._packedGeometryPoolSize; e++)
      this._packedGeometries[e] && this._packedGeometries[e].destroy();
    this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), t.prototype.destroy.call(this);
  }, r.prototype.getAttributeBuffer = function(e) {
    var i = Ri(Math.ceil(e / 8)), n = Ps(i), a = i * 8;
    this._aBuffers.length <= n && (this._iBuffers.length = n + 1);
    var s = this._aBuffers[a];
    return s || (this._aBuffers[a] = s = new ta(a * this.vertexSize * 4)), s;
  }, r.prototype.getIndexBuffer = function(e) {
    var i = Ri(Math.ceil(e / 12)), n = Ps(i), a = i * 12;
    this._iBuffers.length <= n && (this._iBuffers.length = n + 1);
    var s = this._iBuffers[n];
    return s || (this._iBuffers[n] = s = new Uint16Array(a)), s;
  }, r.prototype.packInterleavedGeometry = function(e, i, n, a, s) {
    for (var o = i.uint32View, h = i.float32View, u = a / this.vertexSize, l = e.uvs, f = e.indices, c = e.vertexData, d = e._texture.baseTexture._batchLocation, p = Math.min(e.worldAlpha, 1), v = p < 1 && e._texture.baseTexture.alphaMode ? Dr(e._tintRGB, p) : e._tintRGB + (p * 255 << 24), _ = 0; _ < c.length; _ += 2)
      h[a++] = c[_], h[a++] = c[_ + 1], h[a++] = l[_], h[a++] = l[_ + 1], o[a++] = v, h[a++] = d;
    for (var _ = 0; _ < f.length; _++)
      n[s++] = u + f[_];
  }, r._drawCallPool = [], r._textureArrayPool = [], r;
}(Hr), Sa = function() {
  function t(r, e) {
    if (this.vertexSrc = r, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0)
      throw new Error('Fragment template must contain "%count%".');
    if (e.indexOf("%forloop%") < 0)
      throw new Error('Fragment template must contain "%forloop%".');
  }
  return t.prototype.generateShader = function(r) {
    if (!this.programCache[r]) {
      for (var e = new Int32Array(r), i = 0; i < r; i++)
        e[i] = i;
      this.defaultGroupCache[r] = Ue.from({ uSamplers: e }, !0);
      var n = this.fragTemplate;
      n = n.replace(/%count%/gi, "" + r), n = n.replace(/%forloop%/gi, this.generateSampleSrc(r)), this.programCache[r] = new Me(this.vertexSrc, n);
    }
    var a = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new ft(),
      default: this.defaultGroupCache[r]
    };
    return new Qt(this.programCache[r], a);
  }, t.prototype.generateSampleSrc = function(r) {
    var e = "";
    e += `
`, e += `
`;
    for (var i = 0; i < r; i++)
      i > 0 && (e += `
else `), i < r - 1 && (e += "if(vTextureId < " + i + ".5)"), e += `
{`, e += `
	color = texture2D(uSamplers[` + i + "], vTextureCoord);", e += `
}`;
    return e += `
`, e += `
`, e;
  }, t;
}(), zu = function(t) {
  ut(r, t);
  function r(e) {
    e === void 0 && (e = !1);
    var i = t.call(this) || this;
    return i._buffer = new dt(null, e, !1), i._indexBuffer = new dt(null, e, !0), i.addAttribute("aVertexPosition", i._buffer, 2, !1, G.FLOAT).addAttribute("aTextureCoord", i._buffer, 2, !1, G.FLOAT).addAttribute("aColor", i._buffer, 4, !0, G.UNSIGNED_BYTE).addAttribute("aTextureId", i._buffer, 1, !0, G.FLOAT).addIndex(i._indexBuffer), i;
  }
  return r;
}(Be), fo = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`, co = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, Gv = function() {
  function t() {
  }
  return t.create = function(r) {
    var e = Object.assign({
      vertex: fo,
      fragment: co,
      geometryClass: zu,
      vertexSize: 6
    }, r), i = e.vertex, n = e.fragment, a = e.vertexSize, s = e.geometryClass;
    return function(o) {
      ut(h, o);
      function h(u) {
        var l = o.call(this, u) || this;
        return l.shaderGenerator = new Sa(i, n), l.geometryClass = s, l.vertexSize = a, l;
      }
      return h;
    }(Ir);
  }, Object.defineProperty(t, "defaultVertexSrc", {
    get: function() {
      return fo;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "defaultFragmentTemplate", {
    get: function() {
      return co;
    },
    enumerable: !1,
    configurable: !0
  }), t;
}(), Wu = Gv.create();
Object.assign(Wu, {
  extension: {
    name: "batch",
    type: ot.RendererPlugin
  }
});
/*!
 * @pixi/accessibility - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/accessibility is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Bv = {
  accessible: !1,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  _accessibleActive: !1,
  _accessibleDiv: null,
  accessibleType: "button",
  accessiblePointerEvents: "auto",
  accessibleChildren: !0,
  renderId: -1
};
yt.mixin(Bv);
var Mv = 9, si = 100, Dv = 0, kv = 0, po = 2, vo = 1, Hv = -1e3, Xv = -1e3, Vv = 2, jv = function() {
  function t(r) {
    this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (qt.tablet || qt.phone) && this.createTouchHook();
    var e = document.createElement("div");
    e.style.width = si + "px", e.style.height = si + "px", e.style.position = "absolute", e.style.top = Dv + "px", e.style.left = kv + "px", e.style.zIndex = po.toString(), this.div = e, this.renderer = r, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
  }
  return Object.defineProperty(t.prototype, "isActive", {
    get: function() {
      return this._isActive;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "isMobileAccessibility", {
    get: function() {
      return this._isMobileAccessibility;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.createTouchHook = function() {
    var r = this, e = document.createElement("button");
    e.style.width = vo + "px", e.style.height = vo + "px", e.style.position = "absolute", e.style.top = Hv + "px", e.style.left = Xv + "px", e.style.zIndex = Vv.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", function() {
      r._isMobileAccessibility = !0, r.activate(), r.destroyTouchHook();
    }), document.body.appendChild(e), this._hookDiv = e;
  }, t.prototype.destroyTouchHook = function() {
    !this._hookDiv || (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }, t.prototype.activate = function() {
    var r;
    this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (r = this.renderer.view.parentNode) === null || r === void 0 || r.appendChild(this.div));
  }, t.prototype.deactivate = function() {
    var r;
    !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (r = this.div.parentNode) === null || r === void 0 || r.removeChild(this.div));
  }, t.prototype.updateAccessibleObjects = function(r) {
    if (!(!r.visible || !r.accessibleChildren)) {
      r.accessible && r.interactive && (r._accessibleActive || this.addChild(r), r.renderId = this.renderId);
      var e = r.children;
      if (e)
        for (var i = 0; i < e.length; i++)
          this.updateAccessibleObjects(e[i]);
    }
  }, t.prototype.update = function() {
    var r = performance.now();
    if (!(qt.android.device && r < this.androidUpdateCount) && (this.androidUpdateCount = r + this.androidUpdateFrequency, !!this.renderer.renderingToScreen)) {
      this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
      var e = this.renderer.view.getBoundingClientRect(), i = e.left, n = e.top, a = e.width, s = e.height, o = this.renderer, h = o.width, u = o.height, l = o.resolution, f = a / h * l, c = s / u * l, d = this.div;
      d.style.left = i + "px", d.style.top = n + "px", d.style.width = h + "px", d.style.height = u + "px";
      for (var p = 0; p < this.children.length; p++) {
        var v = this.children[p];
        if (v.renderId !== this.renderId)
          v._accessibleActive = !1, er(this.children, p, 1), this.div.removeChild(v._accessibleDiv), this.pool.push(v._accessibleDiv), v._accessibleDiv = null, p--;
        else {
          d = v._accessibleDiv;
          var _ = v.hitArea, m = v.worldTransform;
          v.hitArea ? (d.style.left = (m.tx + _.x * m.a) * f + "px", d.style.top = (m.ty + _.y * m.d) * c + "px", d.style.width = _.width * m.a * f + "px", d.style.height = _.height * m.d * c + "px") : (_ = v.getBounds(), this.capHitArea(_), d.style.left = _.x * f + "px", d.style.top = _.y * c + "px", d.style.width = _.width * f + "px", d.style.height = _.height * c + "px", d.title !== v.accessibleTitle && v.accessibleTitle !== null && (d.title = v.accessibleTitle), d.getAttribute("aria-label") !== v.accessibleHint && v.accessibleHint !== null && d.setAttribute("aria-label", v.accessibleHint)), (v.accessibleTitle !== d.title || v.tabIndex !== d.tabIndex) && (d.title = v.accessibleTitle, d.tabIndex = v.tabIndex, this.debug && this.updateDebugHTML(d));
        }
      }
      this.renderId++;
    }
  }, t.prototype.updateDebugHTML = function(r) {
    r.innerHTML = "type: " + r.type + "</br> title : " + r.title + "</br> tabIndex: " + r.tabIndex;
  }, t.prototype.capHitArea = function(r) {
    r.x < 0 && (r.width += r.x, r.x = 0), r.y < 0 && (r.height += r.y, r.y = 0);
    var e = this.renderer, i = e.width, n = e.height;
    r.x + r.width > i && (r.width = i - r.x), r.y + r.height > n && (r.height = n - r.y);
  }, t.prototype.addChild = function(r) {
    var e = this.pool.pop();
    e || (e = document.createElement("button"), e.style.width = si + "px", e.style.height = si + "px", e.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = po.toString(), e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.style.pointerEvents = r.accessiblePointerEvents, e.type = r.accessibleType, r.accessibleTitle && r.accessibleTitle !== null ? e.title = r.accessibleTitle : (!r.accessibleHint || r.accessibleHint === null) && (e.title = "displayObject " + r.tabIndex), r.accessibleHint && r.accessibleHint !== null && e.setAttribute("aria-label", r.accessibleHint), this.debug && this.updateDebugHTML(e), r._accessibleActive = !0, r._accessibleDiv = e, e.displayObject = r, this.children.push(r), this.div.appendChild(r._accessibleDiv), r._accessibleDiv.tabIndex = r.tabIndex;
  }, t.prototype._onClick = function(r) {
    var e = this.renderer.plugins.interaction, i = r.target.displayObject, n = e.eventData;
    e.dispatchEvent(i, "click", n), e.dispatchEvent(i, "pointertap", n), e.dispatchEvent(i, "tap", n);
  }, t.prototype._onFocus = function(r) {
    r.target.getAttribute("aria-live") || r.target.setAttribute("aria-live", "assertive");
    var e = this.renderer.plugins.interaction, i = r.target.displayObject, n = e.eventData;
    e.dispatchEvent(i, "mouseover", n);
  }, t.prototype._onFocusOut = function(r) {
    r.target.getAttribute("aria-live") || r.target.setAttribute("aria-live", "polite");
    var e = this.renderer.plugins.interaction, i = r.target.displayObject, n = e.eventData;
    e.dispatchEvent(i, "mouseout", n);
  }, t.prototype._onKeyDown = function(r) {
    r.keyCode === Mv && this.activate();
  }, t.prototype._onMouseMove = function(r) {
    r.movementX === 0 && r.movementY === 0 || this.deactivate();
  }, t.prototype.destroy = function() {
    this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
  }, t.extension = {
    name: "accessibility",
    type: [
      ot.RendererPlugin,
      ot.CanvasRendererPlugin
    ]
  }, t;
}();
/*!
 * @pixi/interaction - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/interaction is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var _o = function() {
  function t() {
    this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new $(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
  }
  return Object.defineProperty(t.prototype, "pointerId", {
    get: function() {
      return this.identifier;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.getLocalPosition = function(r, e, i) {
    return r.worldTransform.applyInverse(i || this.global, e);
  }, t.prototype.copyEvent = function(r) {
    "isPrimary" in r && r.isPrimary && (this.isPrimary = !0), this.button = "button" in r && r.button;
    var e = "buttons" in r && r.buttons;
    this.buttons = Number.isInteger(e) ? e : "which" in r && r.which, this.width = "width" in r && r.width, this.height = "height" in r && r.height, this.tiltX = "tiltX" in r && r.tiltX, this.tiltY = "tiltY" in r && r.tiltY, this.pointerType = "pointerType" in r && r.pointerType, this.pressure = "pressure" in r && r.pressure, this.rotationAngle = "rotationAngle" in r && r.rotationAngle, this.twist = "twist" in r && r.twist || 0, this.tangentialPressure = "tangentialPressure" in r && r.tangentialPressure || 0;
  }, t.prototype.reset = function() {
    this.isPrimary = !1;
  }, t;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ea = function(t, r) {
  return ea = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ea(t, r);
};
function zv(t, r) {
  ea(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Wv = function() {
  function t() {
    this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
  }
  return t.prototype.stopPropagation = function() {
    this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
  }, t.prototype.reset = function() {
    this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
  }, t;
}(), dn = function() {
  function t(r) {
    this._pointerId = r, this._flags = t.FLAGS.NONE;
  }
  return t.prototype._doSet = function(r, e) {
    e ? this._flags = this._flags | r : this._flags = this._flags & ~r;
  }, Object.defineProperty(t.prototype, "pointerId", {
    get: function() {
      return this._pointerId;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "flags", {
    get: function() {
      return this._flags;
    },
    set: function(r) {
      this._flags = r;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "none", {
    get: function() {
      return this._flags === t.FLAGS.NONE;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "over", {
    get: function() {
      return (this._flags & t.FLAGS.OVER) !== 0;
    },
    set: function(r) {
      this._doSet(t.FLAGS.OVER, r);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "rightDown", {
    get: function() {
      return (this._flags & t.FLAGS.RIGHT_DOWN) !== 0;
    },
    set: function(r) {
      this._doSet(t.FLAGS.RIGHT_DOWN, r);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "leftDown", {
    get: function() {
      return (this._flags & t.FLAGS.LEFT_DOWN) !== 0;
    },
    set: function(r) {
      this._doSet(t.FLAGS.LEFT_DOWN, r);
    },
    enumerable: !1,
    configurable: !0
  }), t.FLAGS = Object.freeze({
    NONE: 0,
    OVER: 1 << 0,
    LEFT_DOWN: 1 << 1,
    RIGHT_DOWN: 1 << 2
  }), t;
}(), $v = function() {
  function t() {
    this._tempPoint = new $();
  }
  return t.prototype.recursiveFindHit = function(r, e, i, n, a) {
    var s;
    if (!e || !e.visible)
      return !1;
    var o = r.data.global;
    a = e.interactive || a;
    var h = !1, u = a, l = !0;
    if (e.hitArea)
      n && (e.worldTransform.applyInverse(o, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? h = !0 : (n = !1, l = !1)), u = !1;
    else if (e._mask && n) {
      var f = e._mask.isMaskData ? e._mask.maskObject : e._mask;
      f && !(!((s = f.containsPoint) === null || s === void 0) && s.call(f, o)) && (n = !1);
    }
    if (l && e.interactiveChildren && e.children)
      for (var c = e.children, d = c.length - 1; d >= 0; d--) {
        var p = c[d], v = this.recursiveFindHit(r, p, i, n, u);
        if (v) {
          if (!p.parent)
            continue;
          u = !1, v && (r.target && (n = !1), h = !0);
        }
      }
    return a && (n && !r.target && !e.hitArea && e.containsPoint && e.containsPoint(o) && (h = !0), e.interactive && (h && !r.target && (r.target = e), i && i(r, e, !!h))), h;
  }, t.prototype.findHit = function(r, e, i, n) {
    this.recursiveFindHit(r, e, i, n, !1);
  }, t;
}(), qv = {
  interactive: !1,
  interactiveChildren: !0,
  hitArea: null,
  get buttonMode() {
    return this.cursor === "pointer";
  },
  set buttonMode(t) {
    t ? this.cursor = "pointer" : this.cursor === "pointer" && (this.cursor = null);
  },
  cursor: null,
  get trackedPointers() {
    return this._trackedPointers === void 0 && (this._trackedPointers = {}), this._trackedPointers;
  },
  _trackedPointers: void 0
};
yt.mixin(qv);
var oi = 1, hi = {
  target: null,
  data: {
    global: null
  }
}, Yv = function(t) {
  zv(r, t);
  function r(e, i) {
    var n = t.call(this) || this;
    return i = i || {}, n.renderer = e, n.autoPreventDefault = i.autoPreventDefault !== void 0 ? i.autoPreventDefault : !0, n.interactionFrequency = i.interactionFrequency || 10, n.mouse = new _o(), n.mouse.identifier = oi, n.mouse.global.set(-999999), n.activeInteractionData = {}, n.activeInteractionData[oi] = n.mouse, n.interactionDataPool = [], n.eventData = new Wv(), n.interactionDOMElement = null, n.moveWhenInside = !1, n.eventsAdded = !1, n.tickerAdded = !1, n.mouseOverRenderer = !("PointerEvent" in globalThis), n.supportsTouchEvents = "ontouchstart" in globalThis, n.supportsPointerEvents = !!globalThis.PointerEvent, n.onPointerUp = n.onPointerUp.bind(n), n.processPointerUp = n.processPointerUp.bind(n), n.onPointerCancel = n.onPointerCancel.bind(n), n.processPointerCancel = n.processPointerCancel.bind(n), n.onPointerDown = n.onPointerDown.bind(n), n.processPointerDown = n.processPointerDown.bind(n), n.onPointerMove = n.onPointerMove.bind(n), n.processPointerMove = n.processPointerMove.bind(n), n.onPointerOut = n.onPointerOut.bind(n), n.processPointerOverOut = n.processPointerOverOut.bind(n), n.onPointerOver = n.onPointerOver.bind(n), n.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    }, n.currentCursorMode = null, n.cursor = null, n.resolution = 1, n.delayedEvents = [], n.search = new $v(), n._tempDisplayObject = new Uu(), n._eventListenerOptions = { capture: !0, passive: !1 }, n._useSystemTicker = i.useSystemTicker !== void 0 ? i.useSystemTicker : !0, n.setTargetElement(n.renderer.view, n.renderer.resolution), n;
  }
  return Object.defineProperty(r.prototype, "useSystemTicker", {
    get: function() {
      return this._useSystemTicker;
    },
    set: function(e) {
      this._useSystemTicker = e, e ? this.addTickerListener() : this.removeTickerListener();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "lastObjectRendered", {
    get: function() {
      return this.renderer._lastObjectRendered || this._tempDisplayObject;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.hitTest = function(e, i) {
    return hi.target = null, hi.data.global = e, i || (i = this.lastObjectRendered), this.processInteractive(hi, i, null, !0), hi.target;
  }, r.prototype.setTargetElement = function(e, i) {
    i === void 0 && (i = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = e, this.resolution = i, this.addEvents(), this.addTickerListener();
  }, r.prototype.addTickerListener = function() {
    this.tickerAdded || !this.interactionDOMElement || !this._useSystemTicker || (wt.system.add(this.tickerUpdate, this, le.INTERACTION), this.tickerAdded = !0);
  }, r.prototype.removeTickerListener = function() {
    !this.tickerAdded || (wt.system.remove(this.tickerUpdate, this), this.tickerAdded = !1);
  }, r.prototype.addEvents = function() {
    if (!(this.eventsAdded || !this.interactionDOMElement)) {
      var e = this.interactionDOMElement.style;
      globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "none", e.msTouchAction = "none") : this.supportsPointerEvents && (e.touchAction = "none"), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.addEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.eventsAdded = !0;
    }
  }, r.prototype.removeEvents = function() {
    if (!(!this.eventsAdded || !this.interactionDOMElement)) {
      var e = this.interactionDOMElement.style;
      globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "", e.msTouchAction = "") : this.supportsPointerEvents && (e.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.removeEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.interactionDOMElement = null, this.eventsAdded = !1;
    }
  }, r.prototype.tickerUpdate = function(e) {
    this._deltaTime += e, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.update());
  }, r.prototype.update = function() {
    if (!!this.interactionDOMElement) {
      if (this._didMove) {
        this._didMove = !1;
        return;
      }
      this.cursor = null;
      for (var e in this.activeInteractionData)
        if (this.activeInteractionData.hasOwnProperty(e)) {
          var i = this.activeInteractionData[e];
          if (i.originalEvent && i.pointerType !== "touch") {
            var n = this.configureInteractionEventForDOMEvent(this.eventData, i.originalEvent, i);
            this.processInteractive(n, this.lastObjectRendered, this.processPointerOverOut, !0);
          }
        }
      this.setCursorMode(this.cursor);
    }
  }, r.prototype.setCursorMode = function(e) {
    e = e || "default";
    var i = !0;
    if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (i = !1), this.currentCursorMode !== e) {
      this.currentCursorMode = e;
      var n = this.cursorStyles[e];
      if (n)
        switch (typeof n) {
          case "string":
            i && (this.interactionDOMElement.style.cursor = n);
            break;
          case "function":
            n(e);
            break;
          case "object":
            i && Object.assign(this.interactionDOMElement.style, n);
            break;
        }
      else
        i && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.interactionDOMElement.style.cursor = e);
    }
  }, r.prototype.dispatchEvent = function(e, i, n) {
    (!n.stopPropagationHint || e === n.stopsPropagatingAt) && (n.currentTarget = e, n.type = i, e.emit(i, n), e[i] && e[i](n));
  }, r.prototype.delayDispatchEvent = function(e, i, n) {
    this.delayedEvents.push({ displayObject: e, eventString: i, eventData: n });
  }, r.prototype.mapPositionToPoint = function(e, i, n) {
    var a;
    this.interactionDOMElement.parentElement ? a = this.interactionDOMElement.getBoundingClientRect() : a = {
      x: 0,
      y: 0,
      width: this.interactionDOMElement.width,
      height: this.interactionDOMElement.height,
      left: 0,
      top: 0
    };
    var s = 1 / this.resolution;
    e.x = (i - a.left) * (this.interactionDOMElement.width / a.width) * s, e.y = (n - a.top) * (this.interactionDOMElement.height / a.height) * s;
  }, r.prototype.processInteractive = function(e, i, n, a) {
    var s = this.search.findHit(e, i, n, a), o = this.delayedEvents;
    if (!o.length)
      return s;
    e.stopPropagationHint = !1;
    var h = o.length;
    this.delayedEvents = [];
    for (var u = 0; u < h; u++) {
      var l = o[u], f = l.displayObject, c = l.eventString, d = l.eventData;
      d.stopsPropagatingAt === f && (d.stopPropagationHint = !0), this.dispatchEvent(f, c, d);
    }
    return s;
  }, r.prototype.onPointerDown = function(e) {
    if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
      var i = this.normalizeToPointerData(e);
      if (this.autoPreventDefault && i[0].isNormalized) {
        var n = e.cancelable || !("cancelable" in e);
        n && e.preventDefault();
      }
      for (var a = i.length, s = 0; s < a; s++) {
        var o = i[s], h = this.getInteractionDataForPointerId(o), u = this.configureInteractionEventForDOMEvent(this.eventData, o, h);
        if (u.data.originalEvent = e, this.processInteractive(u, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", u), o.pointerType === "touch")
          this.emit("touchstart", u);
        else if (o.pointerType === "mouse" || o.pointerType === "pen") {
          var l = o.button === 2;
          this.emit(l ? "rightdown" : "mousedown", this.eventData);
        }
      }
    }
  }, r.prototype.processPointerDown = function(e, i, n) {
    var a = e.data, s = e.data.identifier;
    if (n) {
      if (i.trackedPointers[s] || (i.trackedPointers[s] = new dn(s)), this.dispatchEvent(i, "pointerdown", e), a.pointerType === "touch")
        this.dispatchEvent(i, "touchstart", e);
      else if (a.pointerType === "mouse" || a.pointerType === "pen") {
        var o = a.button === 2;
        o ? i.trackedPointers[s].rightDown = !0 : i.trackedPointers[s].leftDown = !0, this.dispatchEvent(i, o ? "rightdown" : "mousedown", e);
      }
    }
  }, r.prototype.onPointerComplete = function(e, i, n) {
    var a = this.normalizeToPointerData(e), s = a.length, o = e.target;
    e.composedPath && e.composedPath().length > 0 && (o = e.composedPath()[0]);
    for (var h = o !== this.interactionDOMElement ? "outside" : "", u = 0; u < s; u++) {
      var l = a[u], f = this.getInteractionDataForPointerId(l), c = this.configureInteractionEventForDOMEvent(this.eventData, l, f);
      if (c.data.originalEvent = e, this.processInteractive(c, this.lastObjectRendered, n, i || !h), this.emit(i ? "pointercancel" : "pointerup" + h, c), l.pointerType === "mouse" || l.pointerType === "pen") {
        var d = l.button === 2;
        this.emit(d ? "rightup" + h : "mouseup" + h, c);
      } else
        l.pointerType === "touch" && (this.emit(i ? "touchcancel" : "touchend" + h, c), this.releaseInteractionDataForPointerId(l.pointerId));
    }
  }, r.prototype.onPointerCancel = function(e) {
    this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !0, this.processPointerCancel);
  }, r.prototype.processPointerCancel = function(e, i) {
    var n = e.data, a = e.data.identifier;
    i.trackedPointers[a] !== void 0 && (delete i.trackedPointers[a], this.dispatchEvent(i, "pointercancel", e), n.pointerType === "touch" && this.dispatchEvent(i, "touchcancel", e));
  }, r.prototype.onPointerUp = function(e) {
    this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !1, this.processPointerUp);
  }, r.prototype.processPointerUp = function(e, i, n) {
    var a = e.data, s = e.data.identifier, o = i.trackedPointers[s], h = a.pointerType === "touch", u = a.pointerType === "mouse" || a.pointerType === "pen", l = !1;
    if (u) {
      var f = a.button === 2, c = dn.FLAGS, d = f ? c.RIGHT_DOWN : c.LEFT_DOWN, p = o !== void 0 && o.flags & d;
      n ? (this.dispatchEvent(i, f ? "rightup" : "mouseup", e), p && (this.dispatchEvent(i, f ? "rightclick" : "click", e), l = !0)) : p && this.dispatchEvent(i, f ? "rightupoutside" : "mouseupoutside", e), o && (f ? o.rightDown = !1 : o.leftDown = !1);
    }
    n ? (this.dispatchEvent(i, "pointerup", e), h && this.dispatchEvent(i, "touchend", e), o && ((!u || l) && this.dispatchEvent(i, "pointertap", e), h && (this.dispatchEvent(i, "tap", e), o.over = !1))) : o && (this.dispatchEvent(i, "pointerupoutside", e), h && this.dispatchEvent(i, "touchendoutside", e)), o && o.none && delete i.trackedPointers[s];
  }, r.prototype.onPointerMove = function(e) {
    if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
      var i = this.normalizeToPointerData(e);
      (i[0].pointerType === "mouse" || i[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
      for (var n = i.length, a = 0; a < n; a++) {
        var s = i[a], o = this.getInteractionDataForPointerId(s), h = this.configureInteractionEventForDOMEvent(this.eventData, s, o);
        h.data.originalEvent = e, this.processInteractive(h, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", h), s.pointerType === "touch" && this.emit("touchmove", h), (s.pointerType === "mouse" || s.pointerType === "pen") && this.emit("mousemove", h);
      }
      i[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
    }
  }, r.prototype.processPointerMove = function(e, i, n) {
    var a = e.data, s = a.pointerType === "touch", o = a.pointerType === "mouse" || a.pointerType === "pen";
    o && this.processPointerOverOut(e, i, n), (!this.moveWhenInside || n) && (this.dispatchEvent(i, "pointermove", e), s && this.dispatchEvent(i, "touchmove", e), o && this.dispatchEvent(i, "mousemove", e));
  }, r.prototype.onPointerOut = function(e) {
    if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
      var i = this.normalizeToPointerData(e), n = i[0];
      n.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
      var a = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, a);
      s.data.originalEvent = n, this.processInteractive(s, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", s), n.pointerType === "mouse" || n.pointerType === "pen" ? this.emit("mouseout", s) : this.releaseInteractionDataForPointerId(a.identifier);
    }
  }, r.prototype.processPointerOverOut = function(e, i, n) {
    var a = e.data, s = e.data.identifier, o = a.pointerType === "mouse" || a.pointerType === "pen", h = i.trackedPointers[s];
    n && !h && (h = i.trackedPointers[s] = new dn(s)), h !== void 0 && (n && this.mouseOverRenderer ? (h.over || (h.over = !0, this.delayDispatchEvent(i, "pointerover", e), o && this.delayDispatchEvent(i, "mouseover", e)), o && this.cursor === null && (this.cursor = i.cursor)) : h.over && (h.over = !1, this.dispatchEvent(i, "pointerout", this.eventData), o && this.dispatchEvent(i, "mouseout", e), h.none && delete i.trackedPointers[s]));
  }, r.prototype.onPointerOver = function(e) {
    if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
      var i = this.normalizeToPointerData(e), n = i[0], a = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, a);
      s.data.originalEvent = n, n.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", s), (n.pointerType === "mouse" || n.pointerType === "pen") && this.emit("mouseover", s);
    }
  }, r.prototype.getInteractionDataForPointerId = function(e) {
    var i = e.pointerId, n;
    return i === oi || e.pointerType === "mouse" ? n = this.mouse : this.activeInteractionData[i] ? n = this.activeInteractionData[i] : (n = this.interactionDataPool.pop() || new _o(), n.identifier = i, this.activeInteractionData[i] = n), n.copyEvent(e), n;
  }, r.prototype.releaseInteractionDataForPointerId = function(e) {
    var i = this.activeInteractionData[e];
    i && (delete this.activeInteractionData[e], i.reset(), this.interactionDataPool.push(i));
  }, r.prototype.configureInteractionEventForDOMEvent = function(e, i, n) {
    return e.data = n, this.mapPositionToPoint(n.global, i.clientX, i.clientY), i.pointerType === "touch" && (i.globalX = n.global.x, i.globalY = n.global.y), n.originalEvent = i, e.reset(), e;
  }, r.prototype.normalizeToPointerData = function(e) {
    var i = [];
    if (this.supportsTouchEvents && e instanceof TouchEvent)
      for (var n = 0, a = e.changedTouches.length; n < a; n++) {
        var s = e.changedTouches[n];
        typeof s.button > "u" && (s.button = e.touches.length ? 1 : 0), typeof s.buttons > "u" && (s.buttons = e.touches.length ? 1 : 0), typeof s.isPrimary > "u" && (s.isPrimary = e.touches.length === 1 && e.type === "touchstart"), typeof s.width > "u" && (s.width = s.radiusX || 1), typeof s.height > "u" && (s.height = s.radiusY || 1), typeof s.tiltX > "u" && (s.tiltX = 0), typeof s.tiltY > "u" && (s.tiltY = 0), typeof s.pointerType > "u" && (s.pointerType = "touch"), typeof s.pointerId > "u" && (s.pointerId = s.identifier || 0), typeof s.pressure > "u" && (s.pressure = s.force || 0.5), typeof s.twist > "u" && (s.twist = 0), typeof s.tangentialPressure > "u" && (s.tangentialPressure = 0), typeof s.layerX > "u" && (s.layerX = s.offsetX = s.clientX), typeof s.layerY > "u" && (s.layerY = s.offsetY = s.clientY), s.isNormalized = !0, i.push(s);
      }
    else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
      var o = e;
      typeof o.isPrimary > "u" && (o.isPrimary = !0), typeof o.width > "u" && (o.width = 1), typeof o.height > "u" && (o.height = 1), typeof o.tiltX > "u" && (o.tiltX = 0), typeof o.tiltY > "u" && (o.tiltY = 0), typeof o.pointerType > "u" && (o.pointerType = "mouse"), typeof o.pointerId > "u" && (o.pointerId = oi), typeof o.pressure > "u" && (o.pressure = 0.5), typeof o.twist > "u" && (o.twist = 0), typeof o.tangentialPressure > "u" && (o.tangentialPressure = 0), o.isNormalized = !0, i.push(o);
    } else
      i.push(e);
    return i;
  }, r.prototype.destroy = function() {
    this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
  }, r.extension = {
    name: "interaction",
    type: [
      ot.RendererPlugin,
      ot.CanvasRendererPlugin
    ]
  }, r;
}(Mr);
/*!
 * @pixi/extract - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/extract is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var mo = new K(), yo = 4, Zv = function() {
  function t(r) {
    this.renderer = r;
  }
  return t.prototype.image = function(r, e, i) {
    var n = new Image();
    return n.src = this.base64(r, e, i), n;
  }, t.prototype.base64 = function(r, e, i) {
    return this.canvas(r).toDataURL(e, i);
  }, t.prototype.canvas = function(r, e) {
    var i = this.renderer, n, a = !1, s, o = !1;
    r && (r instanceof Le ? s = r : (s = this.renderer.generateTexture(r), o = !0)), s ? (n = s.baseTexture.resolution, e = e != null ? e : s.frame, a = !1, i.renderTexture.bind(s)) : (n = i.resolution, e || (e = mo, e.width = i.width, e.height = i.height), a = !0, i.renderTexture.bind(null));
    var h = Math.round(e.width * n), u = Math.round(e.height * n), l = new Fs(h, u, 1), f = new Uint8Array(yo * h * u), c = i.gl;
    c.readPixels(Math.round(e.x * n), Math.round(e.y * n), h, u, c.RGBA, c.UNSIGNED_BYTE, f);
    var d = l.context.getImageData(0, 0, h, u);
    if (t.arrayPostDivide(f, d.data), l.context.putImageData(d, 0, 0), a) {
      var p = new Fs(l.width, l.height, 1);
      p.context.scale(1, -1), p.context.drawImage(l.canvas, 0, -u), l.destroy(), l = p;
    }
    return o && s.destroy(!0), l.canvas;
  }, t.prototype.pixels = function(r, e) {
    var i = this.renderer, n, a, s = !1;
    r && (r instanceof Le ? a = r : (a = this.renderer.generateTexture(r), s = !0)), a ? (n = a.baseTexture.resolution, e = e != null ? e : a.frame, i.renderTexture.bind(a)) : (n = i.resolution, e || (e = mo, e.width = i.width, e.height = i.height), i.renderTexture.bind(null));
    var o = Math.round(e.width * n), h = Math.round(e.height * n), u = new Uint8Array(yo * o * h), l = i.gl;
    return l.readPixels(Math.round(e.x * n), Math.round(e.y * n), o, h, l.RGBA, l.UNSIGNED_BYTE, u), s && a.destroy(!0), t.arrayPostDivide(u, u), u;
  }, t.prototype.destroy = function() {
    this.renderer = null;
  }, t.arrayPostDivide = function(r, e) {
    for (var i = 0; i < r.length; i += 4) {
      var n = e[i + 3] = r[i + 3];
      n !== 0 ? (e[i] = Math.round(Math.min(r[i] * 255 / n, 255)), e[i + 1] = Math.round(Math.min(r[i + 1] * 255 / n, 255)), e[i + 2] = Math.round(Math.min(r[i + 2] * 255 / n, 255))) : (e[i] = r[i], e[i + 1] = r[i + 1], e[i + 2] = r[i + 2]);
    }
  }, t.extension = {
    name: "extract",
    type: ot.RendererPlugin
  }, t;
}();
/*!
 * @pixi/loaders - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/loaders is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ui = function() {
  function t(r, e, i) {
    e === void 0 && (e = !1), this._fn = r, this._once = e, this._thisArg = i, this._next = this._prev = this._owner = null;
  }
  return t.prototype.detach = function() {
    return this._owner === null ? !1 : (this._owner.detach(this), !0);
  }, t;
}();
function xo(t, r) {
  return t._head ? (t._tail._next = r, r._prev = t._tail, t._tail = r) : (t._head = r, t._tail = r), r._owner = t, r;
}
var se = function() {
  function t() {
    this._head = this._tail = void 0;
  }
  return t.prototype.handlers = function(r) {
    r === void 0 && (r = !1);
    var e = this._head;
    if (r)
      return !!e;
    for (var i = []; e; )
      i.push(e), e = e._next;
    return i;
  }, t.prototype.has = function(r) {
    if (!(r instanceof ui))
      throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
    return r._owner === this;
  }, t.prototype.dispatch = function() {
    for (var r = arguments, e = [], i = 0; i < arguments.length; i++)
      e[i] = r[i];
    var n = this._head;
    if (!n)
      return !1;
    for (; n; )
      n._once && this.detach(n), n._fn.apply(n._thisArg, e), n = n._next;
    return !0;
  }, t.prototype.add = function(r, e) {
    if (e === void 0 && (e = null), typeof r != "function")
      throw new Error("MiniSignal#add(): First arg must be a Function.");
    return xo(this, new ui(r, !1, e));
  }, t.prototype.once = function(r, e) {
    if (e === void 0 && (e = null), typeof r != "function")
      throw new Error("MiniSignal#once(): First arg must be a Function.");
    return xo(this, new ui(r, !0, e));
  }, t.prototype.detach = function(r) {
    if (!(r instanceof ui))
      throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
    return r._owner !== this ? this : (r._prev && (r._prev._next = r._next), r._next && (r._next._prev = r._prev), r === this._head ? (this._head = r._next, r._next === null && (this._tail = null)) : r === this._tail && (this._tail = r._prev, this._tail._next = null), r._owner = null, this);
  }, t.prototype.detachAll = function() {
    var r = this._head;
    if (!r)
      return this;
    for (this._head = this._tail = null; r; )
      r._owner = null, r = r._next;
    return this;
  }, t;
}();
function $u(t, r) {
  r = r || {};
  for (var e = {
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  }, i = e.parser[r.strictMode ? "strict" : "loose"].exec(t), n = {}, a = 14; a--; )
    n[e.key[a]] = i[a] || "";
  return n[e.q.name] = {}, n[e.key[12]].replace(e.q.parser, function(s, o, h) {
    o && (n[e.q.name][o] = h);
  }), n;
}
var pn, li = null, Jv = 0, go = 200, Kv = 204, Qv = 1223, t0 = 2;
function bo() {
}
function To(t, r, e) {
  r && r.indexOf(".") === 0 && (r = r.substring(1)), r && (t[r] = e);
}
function vn(t) {
  return t.toString().replace("object ", "");
}
var _t = function() {
  function t(r, e, i) {
    if (this._dequeue = bo, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof r != "string" || typeof e != "string")
      throw new Error("Both name and url are required for constructing a resource.");
    i = i || {}, this._flags = 0, this._setFlag(t.STATUS_FLAGS.DATA_URL, e.indexOf("data:") === 0), this.name = r, this.url = e, this.extension = this._getExtension(), this.data = null, this.crossOrigin = i.crossOrigin === !0 ? "anonymous" : i.crossOrigin, this.timeout = i.timeout || 0, this.loadType = i.loadType || this._determineLoadType(), this.xhrType = i.xhrType, this.metadata = i.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = t.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = bo, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new se(), this.onProgress = new se(), this.onComplete = new se(), this.onAfterMiddleware = new se();
  }
  return t.setExtensionLoadType = function(r, e) {
    To(t._loadTypeMap, r, e);
  }, t.setExtensionXhrType = function(r, e) {
    To(t._xhrTypeMap, r, e);
  }, Object.defineProperty(t.prototype, "isDataUrl", {
    get: function() {
      return this._hasFlag(t.STATUS_FLAGS.DATA_URL);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "isComplete", {
    get: function() {
      return this._hasFlag(t.STATUS_FLAGS.COMPLETE);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "isLoading", {
    get: function() {
      return this._hasFlag(t.STATUS_FLAGS.LOADING);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.complete = function() {
    this._clearEvents(), this._finish();
  }, t.prototype.abort = function(r) {
    if (!this.error) {
      if (this.error = new Error(r), this._clearEvents(), this.xhr)
        this.xhr.abort();
      else if (this.xdr)
        this.xdr.abort();
      else if (this.data)
        if (this.data.src)
          this.data.src = t.EMPTY_GIF;
        else
          for (; this.data.firstChild; )
            this.data.removeChild(this.data.firstChild);
      this._finish();
    }
  }, t.prototype.load = function(r) {
    var e = this;
    if (!this.isLoading) {
      if (this.isComplete) {
        r && setTimeout(function() {
          return r(e);
        }, 1);
        return;
      } else
        r && this.onComplete.once(r);
      switch (this._setFlag(t.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
        case t.LOAD_TYPE.IMAGE:
          this.type = t.TYPE.IMAGE, this._loadElement("image");
          break;
        case t.LOAD_TYPE.AUDIO:
          this.type = t.TYPE.AUDIO, this._loadSourceElement("audio");
          break;
        case t.LOAD_TYPE.VIDEO:
          this.type = t.TYPE.VIDEO, this._loadSourceElement("video");
          break;
        case t.LOAD_TYPE.XHR:
        default:
          typeof pn > "u" && (pn = !!(globalThis.XDomainRequest && !("withCredentials" in new XMLHttpRequest()))), pn && this.crossOrigin ? this._loadXdr() : this._loadXhr();
          break;
      }
    }
  }, t.prototype._hasFlag = function(r) {
    return (this._flags & r) !== 0;
  }, t.prototype._setFlag = function(r, e) {
    this._flags = e ? this._flags | r : this._flags & ~r;
  }, t.prototype._clearEvents = function() {
    clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
  }, t.prototype._finish = function() {
    if (this.isComplete)
      throw new Error("Complete called again for an already completed resource.");
    this._setFlag(t.STATUS_FLAGS.COMPLETE, !0), this._setFlag(t.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
  }, t.prototype._loadElement = function(r) {
    this.metadata.loadElement ? this.data = this.metadata.loadElement : r === "image" && typeof globalThis.Image < "u" ? this.data = new Image() : this.data = document.createElement(r), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
  }, t.prototype._loadSourceElement = function(r) {
    if (this.metadata.loadElement ? this.data = this.metadata.loadElement : r === "audio" && typeof globalThis.Audio < "u" ? this.data = new Audio() : this.data = document.createElement(r), this.data === null) {
      this.abort("Unsupported element: " + r);
      return;
    }
    if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource)
      if (navigator.isCocoonJS)
        this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
      else if (Array.isArray(this.url))
        for (var e = this.metadata.mimeType, i = 0; i < this.url.length; ++i)
          this.data.appendChild(this._createSource(r, this.url[i], Array.isArray(e) ? e[i] : e));
      else {
        var e = this.metadata.mimeType;
        this.data.appendChild(this._createSource(r, this.url, Array.isArray(e) ? e[0] : e));
      }
    this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
  }, t.prototype._loadXhr = function() {
    typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
    var r = this.xhr = new XMLHttpRequest();
    this.crossOrigin === "use-credentials" && (r.withCredentials = !0), r.open("GET", this.url, !0), r.timeout = this.timeout, this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? r.responseType = t.XHR_RESPONSE_TYPE.TEXT : r.responseType = this.xhrType, r.addEventListener("error", this._boundXhrOnError, !1), r.addEventListener("timeout", this._boundXhrOnTimeout, !1), r.addEventListener("abort", this._boundXhrOnAbort, !1), r.addEventListener("progress", this._boundOnProgress, !1), r.addEventListener("load", this._boundXhrOnLoad, !1), r.send();
  }, t.prototype._loadXdr = function() {
    typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
    var r = this.xhr = new globalThis.XDomainRequest();
    r.timeout = this.timeout || 5e3, r.onerror = this._boundXhrOnError, r.ontimeout = this._boundXhrOnTimeout, r.onprogress = this._boundOnProgress, r.onload = this._boundXhrOnLoad, r.open("GET", this.url, !0), setTimeout(function() {
      return r.send();
    }, 1);
  }, t.prototype._createSource = function(r, e, i) {
    i || (i = r + "/" + this._getExtension(e));
    var n = document.createElement("source");
    return n.src = e, n.type = i, n;
  }, t.prototype._onError = function(r) {
    this.abort("Failed to load element using: " + r.target.nodeName);
  }, t.prototype._onProgress = function(r) {
    r && r.lengthComputable && this.onProgress.dispatch(this, r.loaded / r.total);
  }, t.prototype._onTimeout = function() {
    this.abort("Load timed out.");
  }, t.prototype._xhrOnError = function() {
    var r = this.xhr;
    this.abort(vn(r) + " Request failed. Status: " + r.status + ', text: "' + r.statusText + '"');
  }, t.prototype._xhrOnTimeout = function() {
    var r = this.xhr;
    this.abort(vn(r) + " Request timed out.");
  }, t.prototype._xhrOnAbort = function() {
    var r = this.xhr;
    this.abort(vn(r) + " Request was aborted by the user.");
  }, t.prototype._xhrOnLoad = function() {
    var r = this.xhr, e = "", i = typeof r.status > "u" ? go : r.status;
    (r.responseType === "" || r.responseType === "text" || typeof r.responseType > "u") && (e = r.responseText), i === Jv && (e.length > 0 || r.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? i = go : i === Qv && (i = Kv);
    var n = i / 100 | 0;
    if (n === t0)
      if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT)
        this.data = e, this.type = t.TYPE.TEXT;
      else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON)
        try {
          this.data = JSON.parse(e), this.type = t.TYPE.JSON;
        } catch (o) {
          this.abort("Error trying to parse loaded json: " + o);
          return;
        }
      else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT)
        try {
          if (globalThis.DOMParser) {
            var a = new DOMParser();
            this.data = a.parseFromString(e, "text/xml");
          } else {
            var s = document.createElement("div");
            s.innerHTML = e, this.data = s;
          }
          this.type = t.TYPE.XML;
        } catch (o) {
          this.abort("Error trying to parse loaded xml: " + o);
          return;
        }
      else
        this.data = r.response || e;
    else {
      this.abort("[" + r.status + "] " + r.statusText + ": " + r.responseURL);
      return;
    }
    this.complete();
  }, t.prototype._determineCrossOrigin = function(r, e) {
    if (r.indexOf("data:") === 0)
      return "";
    if (globalThis.origin !== globalThis.location.origin)
      return "anonymous";
    e = e || globalThis.location, li || (li = document.createElement("a")), li.href = r;
    var i = $u(li.href, { strictMode: !0 }), n = !i.port && e.port === "" || i.port === e.port, a = i.protocol ? i.protocol + ":" : "";
    return i.host !== e.hostname || !n || a !== e.protocol ? "anonymous" : "";
  }, t.prototype._determineXhrType = function() {
    return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT;
  }, t.prototype._determineLoadType = function() {
    return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR;
  }, t.prototype._getExtension = function(r) {
    r === void 0 && (r = this.url);
    var e = "";
    if (this.isDataUrl) {
      var i = r.indexOf("/");
      e = r.substring(i + 1, r.indexOf(";", i));
    } else {
      var n = r.indexOf("?"), a = r.indexOf("#"), s = Math.min(n > -1 ? n : r.length, a > -1 ? a : r.length);
      r = r.substring(0, s), e = r.substring(r.lastIndexOf(".") + 1);
    }
    return e.toLowerCase();
  }, t.prototype._getMimeFromXhrType = function(r) {
    switch (r) {
      case t.XHR_RESPONSE_TYPE.BUFFER:
        return "application/octet-binary";
      case t.XHR_RESPONSE_TYPE.BLOB:
        return "application/blob";
      case t.XHR_RESPONSE_TYPE.DOCUMENT:
        return "application/xml";
      case t.XHR_RESPONSE_TYPE.JSON:
        return "application/json";
      case t.XHR_RESPONSE_TYPE.DEFAULT:
      case t.XHR_RESPONSE_TYPE.TEXT:
      default:
        return "text/plain";
    }
  }, t;
}();
(function(t) {
  (function(r) {
    r[r.NONE = 0] = "NONE", r[r.DATA_URL = 1] = "DATA_URL", r[r.COMPLETE = 2] = "COMPLETE", r[r.LOADING = 4] = "LOADING";
  })(t.STATUS_FLAGS || (t.STATUS_FLAGS = {})), function(r) {
    r[r.UNKNOWN = 0] = "UNKNOWN", r[r.JSON = 1] = "JSON", r[r.XML = 2] = "XML", r[r.IMAGE = 3] = "IMAGE", r[r.AUDIO = 4] = "AUDIO", r[r.VIDEO = 5] = "VIDEO", r[r.TEXT = 6] = "TEXT";
  }(t.TYPE || (t.TYPE = {})), function(r) {
    r[r.XHR = 1] = "XHR", r[r.IMAGE = 2] = "IMAGE", r[r.AUDIO = 3] = "AUDIO", r[r.VIDEO = 4] = "VIDEO";
  }(t.LOAD_TYPE || (t.LOAD_TYPE = {})), function(r) {
    r.DEFAULT = "text", r.BUFFER = "arraybuffer", r.BLOB = "blob", r.DOCUMENT = "document", r.JSON = "json", r.TEXT = "text";
  }(t.XHR_RESPONSE_TYPE || (t.XHR_RESPONSE_TYPE = {})), t._loadTypeMap = {
    gif: t.LOAD_TYPE.IMAGE,
    png: t.LOAD_TYPE.IMAGE,
    bmp: t.LOAD_TYPE.IMAGE,
    jpg: t.LOAD_TYPE.IMAGE,
    jpeg: t.LOAD_TYPE.IMAGE,
    tif: t.LOAD_TYPE.IMAGE,
    tiff: t.LOAD_TYPE.IMAGE,
    webp: t.LOAD_TYPE.IMAGE,
    tga: t.LOAD_TYPE.IMAGE,
    svg: t.LOAD_TYPE.IMAGE,
    "svg+xml": t.LOAD_TYPE.IMAGE,
    mp3: t.LOAD_TYPE.AUDIO,
    ogg: t.LOAD_TYPE.AUDIO,
    wav: t.LOAD_TYPE.AUDIO,
    mp4: t.LOAD_TYPE.VIDEO,
    webm: t.LOAD_TYPE.VIDEO
  }, t._xhrTypeMap = {
    xhtml: t.XHR_RESPONSE_TYPE.DOCUMENT,
    html: t.XHR_RESPONSE_TYPE.DOCUMENT,
    htm: t.XHR_RESPONSE_TYPE.DOCUMENT,
    xml: t.XHR_RESPONSE_TYPE.DOCUMENT,
    tmx: t.XHR_RESPONSE_TYPE.DOCUMENT,
    svg: t.XHR_RESPONSE_TYPE.DOCUMENT,
    tsx: t.XHR_RESPONSE_TYPE.DOCUMENT,
    gif: t.XHR_RESPONSE_TYPE.BLOB,
    png: t.XHR_RESPONSE_TYPE.BLOB,
    bmp: t.XHR_RESPONSE_TYPE.BLOB,
    jpg: t.XHR_RESPONSE_TYPE.BLOB,
    jpeg: t.XHR_RESPONSE_TYPE.BLOB,
    tif: t.XHR_RESPONSE_TYPE.BLOB,
    tiff: t.XHR_RESPONSE_TYPE.BLOB,
    webp: t.XHR_RESPONSE_TYPE.BLOB,
    tga: t.XHR_RESPONSE_TYPE.BLOB,
    json: t.XHR_RESPONSE_TYPE.JSON,
    text: t.XHR_RESPONSE_TYPE.TEXT,
    txt: t.XHR_RESPONSE_TYPE.TEXT,
    ttf: t.XHR_RESPONSE_TYPE.BUFFER,
    otf: t.XHR_RESPONSE_TYPE.BUFFER
  }, t.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
})(_t || (_t = {}));
function Te() {
}
function e0(t) {
  return function() {
    for (var e = arguments, i = [], n = 0; n < arguments.length; n++)
      i[n] = e[n];
    if (t === null)
      throw new Error("Callback was already called.");
    var a = t;
    t = null, a.apply(this, i);
  };
}
var r0 = function() {
  function t(r, e) {
    this.data = r, this.callback = e;
  }
  return t;
}(), _n = function() {
  function t(r, e) {
    var i = this;
    if (e === void 0 && (e = 1), this.workers = 0, this.saturated = Te, this.unsaturated = Te, this.empty = Te, this.drain = Te, this.error = Te, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(n, a, s) {
      if (s && typeof s != "function")
        throw new Error("task callback must be a function");
      if (i.started = !0, n == null && i.idle()) {
        setTimeout(function() {
          return i.drain();
        }, 1);
        return;
      }
      var o = new r0(n, typeof s == "function" ? s : Te);
      a ? i._tasks.unshift(o) : i._tasks.push(o), setTimeout(i.process, 1);
    }, this.process = function() {
      for (; !i.paused && i.workers < i.concurrency && i._tasks.length; ) {
        var n = i._tasks.shift();
        i._tasks.length === 0 && i.empty(), i.workers += 1, i.workers === i.concurrency && i.saturated(), i._worker(n.data, e0(i._next(n)));
      }
    }, this._worker = r, e === 0)
      throw new Error("Concurrency must not be zero");
    this.concurrency = e, this.buffer = e / 4;
  }
  return t.prototype._next = function(r) {
    var e = this;
    return function() {
      for (var i = arguments, n = [], a = 0; a < arguments.length; a++)
        n[a] = i[a];
      e.workers -= 1, r.callback.apply(r, n), n[0] != null && e.error(n[0], r.data), e.workers <= e.concurrency - e.buffer && e.unsaturated(), e.idle() && e.drain(), e.process();
    };
  }, t.prototype.push = function(r, e) {
    this._insert(r, !1, e);
  }, t.prototype.kill = function() {
    this.workers = 0, this.drain = Te, this.started = !1, this._tasks = [];
  }, t.prototype.unshift = function(r, e) {
    this._insert(r, !0, e);
  }, t.prototype.length = function() {
    return this._tasks.length;
  }, t.prototype.running = function() {
    return this.workers;
  }, t.prototype.idle = function() {
    return this._tasks.length + this.workers === 0;
  }, t.prototype.pause = function() {
    this.paused !== !0 && (this.paused = !0);
  }, t.prototype.resume = function() {
    if (this.paused !== !1) {
      this.paused = !1;
      for (var r = 1; r <= this.concurrency; r++)
        this.process();
    }
  }, t.eachSeries = function(r, e, i, n) {
    var a = 0, s = r.length;
    function o(h) {
      if (h || a === s) {
        i && i(h);
        return;
      }
      n ? setTimeout(function() {
        e(r[a++], o);
      }, 1) : e(r[a++], o);
    }
    o();
  }, t.queue = function(r, e) {
    return new t(r, e);
  }, t;
}(), mn = 100, i0 = /(#[\w-]+)?$/, Pi = function() {
  function t(r, e) {
    var i = this;
    r === void 0 && (r = ""), e === void 0 && (e = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, u) {
      return i._loadResource(h, u);
    }, this.resources = {}, this.baseUrl = r, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, u) {
      return i._loadResource(h, u);
    }, this._queue = _n.queue(this._boundLoadResource, e), this._queue.pause(), this.resources = {}, this.onProgress = new se(), this.onError = new se(), this.onLoad = new se(), this.onStart = new se(), this.onComplete = new se();
    for (var n = 0; n < t._plugins.length; ++n) {
      var a = t._plugins[n], s = a.pre, o = a.use;
      s && this.pre(s), o && this.use(o);
    }
    this._protected = !1;
  }
  return t.prototype._add = function(r, e, i, n) {
    if (this.loading && (!i || !i.parentResource))
      throw new Error("Cannot add resources while the loader is running.");
    if (this.resources[r])
      throw new Error('Resource named "' + r + '" already exists.');
    if (e = this._prepareUrl(e), this.resources[r] = new _t(r, e, i), typeof n == "function" && this.resources[r].onAfterMiddleware.once(n), this.loading) {
      for (var a = i.parentResource, s = [], o = 0; o < a.children.length; ++o)
        a.children[o].isComplete || s.push(a.children[o]);
      var h = a.progressChunk * (s.length + 1), u = h / (s.length + 2);
      a.children.push(this.resources[r]), a.progressChunk = u;
      for (var o = 0; o < s.length; ++o)
        s[o].progressChunk = u;
      this.resources[r].progressChunk = u;
    }
    return this._queue.push(this.resources[r]), this;
  }, t.prototype.pre = function(r) {
    return this._beforeMiddleware.push(r), this;
  }, t.prototype.use = function(r) {
    return this._afterMiddleware.push(r), this;
  }, t.prototype.reset = function() {
    this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
    for (var r in this.resources) {
      var e = this.resources[r];
      e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort("loader reset");
    }
    return this.resources = {}, this;
  }, t.prototype.load = function(r) {
    if (Kt("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof r == "function" && this.onComplete.once(r), this.loading)
      return this;
    if (this._queue.idle())
      this._onStart(), this._onComplete();
    else {
      for (var e = this._queue._tasks.length, i = mn / e, n = 0; n < this._queue._tasks.length; ++n)
        this._queue._tasks[n].data.progressChunk = i;
      this._onStart(), this._queue.resume();
    }
    return this;
  }, Object.defineProperty(t.prototype, "concurrency", {
    get: function() {
      return this._queue.concurrency;
    },
    set: function(r) {
      this._queue.concurrency = r;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._prepareUrl = function(r) {
    var e = $u(r, { strictMode: !0 }), i;
    if (e.protocol || !e.path || r.indexOf("//") === 0 ? i = r : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && r.charAt(0) !== "/" ? i = this.baseUrl + "/" + r : i = this.baseUrl + r, this.defaultQueryString) {
      var n = i0.exec(i)[0];
      i = i.slice(0, i.length - n.length), i.indexOf("?") !== -1 ? i += "&" + this.defaultQueryString : i += "?" + this.defaultQueryString, i += n;
    }
    return i;
  }, t.prototype._loadResource = function(r, e) {
    var i = this;
    r._dequeue = e, _n.eachSeries(this._beforeMiddleware, function(n, a) {
      n.call(i, r, function() {
        a(r.isComplete ? {} : null);
      });
    }, function() {
      r.isComplete ? i._onLoad(r) : (r._onLoadBinding = r.onComplete.once(i._onLoad, i), r.load());
    }, !0);
  }, t.prototype._onStart = function() {
    this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
  }, t.prototype._onComplete = function() {
    this.progress = mn, this.loading = !1, this.onComplete.dispatch(this, this.resources);
  }, t.prototype._onLoad = function(r) {
    var e = this;
    r._onLoadBinding = null, this._resourcesParsing.push(r), r._dequeue(), _n.eachSeries(this._afterMiddleware, function(i, n) {
      i.call(e, r, n);
    }, function() {
      r.onAfterMiddleware.dispatch(r), e.progress = Math.min(mn, e.progress + r.progressChunk), e.onProgress.dispatch(e, r), r.error ? e.onError.dispatch(r.error, e, r) : e.onLoad.dispatch(e, r), e._resourcesParsing.splice(e._resourcesParsing.indexOf(r), 1), e._queue.idle() && e._resourcesParsing.length === 0 && e._onComplete();
    }, !0);
  }, t.prototype.destroy = function() {
    this._protected || this.reset();
  }, Object.defineProperty(t, "shared", {
    get: function() {
      var r = t._shared;
      return r || (r = new t(), r._protected = !0, t._shared = r), r;
    },
    enumerable: !1,
    configurable: !0
  }), t.registerPlugin = function(r) {
    return Kt("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), fe.add({
      type: ot.Loader,
      ref: r
    }), t;
  }, t._plugins = [], t;
}();
fe.handleByList(ot.Loader, Pi._plugins);
Pi.prototype.add = function(r, e, i, n) {
  if (Array.isArray(r)) {
    for (var a = 0; a < r.length; ++a)
      this.add(r[a]);
    return this;
  }
  if (typeof r == "object" && (i = r, n = e || i.callback || i.onComplete, e = i.url, r = i.name || i.key || i.url), typeof e != "string" && (n = i, i = e, e = r), typeof e != "string")
    throw new Error("No url passed to add resource to loader.");
  return typeof i == "function" && (n = i, i = null), this._add(r, e, i, n);
};
var n0 = function() {
  function t() {
  }
  return t.init = function(r) {
    r = Object.assign({
      sharedLoader: !1
    }, r), this.loader = r.sharedLoader ? Pi.shared : new Pi();
  }, t.destroy = function() {
    this.loader && (this.loader.destroy(), this.loader = null);
  }, t.extension = ot.Application, t;
}(), a0 = function() {
  function t() {
  }
  return t.add = function() {
    _t.setExtensionLoadType("svg", _t.LOAD_TYPE.XHR), _t.setExtensionXhrType("svg", _t.XHR_RESPONSE_TYPE.TEXT);
  }, t.use = function(r, e) {
    if (r.data && (r.type === _t.TYPE.IMAGE || r.extension === "svg")) {
      var i = r.data, n = r.url, a = r.name, s = r.metadata;
      z.fromLoader(i, n, a, s).then(function(o) {
        r.texture = o, e();
      }).catch(e);
    } else
      e();
  }, t.extension = ot.Loader, t;
}(), s0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function o0(t) {
  for (var r = "", e = 0; e < t.length; ) {
    for (var i = [0, 0, 0], n = [0, 0, 0, 0], a = 0; a < i.length; ++a)
      e < t.length ? i[a] = t.charCodeAt(e++) & 255 : i[a] = 0;
    n[0] = i[0] >> 2, n[1] = (i[0] & 3) << 4 | i[1] >> 4, n[2] = (i[1] & 15) << 2 | i[2] >> 6, n[3] = i[2] & 63;
    var s = e - (t.length - 1);
    switch (s) {
      case 2:
        n[3] = 64, n[2] = 64;
        break;
      case 1:
        n[3] = 64;
        break;
    }
    for (var a = 0; a < n.length; ++a)
      r += s0.charAt(n[a]);
  }
  return r;
}
function h0(t, r) {
  if (!t.data) {
    r();
    return;
  }
  if (t.xhr && t.xhrType === _t.XHR_RESPONSE_TYPE.BLOB) {
    if (!self.Blob || typeof t.data == "string") {
      var e = t.xhr.getResponseHeader("content-type");
      if (e && e.indexOf("image") === 0) {
        t.data = new Image(), t.data.src = "data:" + e + ";base64," + o0(t.xhr.responseText), t.type = _t.TYPE.IMAGE, t.data.onload = function() {
          t.data.onload = null, r();
        };
        return;
      }
    } else if (t.data.type.indexOf("image") === 0) {
      var i = globalThis.URL || globalThis.webkitURL, n = i.createObjectURL(t.data);
      t.blob = t.data, t.data = new Image(), t.data.src = n, t.type = _t.TYPE.IMAGE, t.data.onload = function() {
        i.revokeObjectURL(n), t.data.onload = null, r();
      };
      return;
    }
  }
  r();
}
var u0 = function() {
  function t() {
  }
  return t.extension = ot.Loader, t.use = h0, t;
}();
fe.add(a0, u0);
/*!
 * @pixi/compressed-textures - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/compressed-textures is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var st, q;
(function(t) {
  t[t.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", t[t.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", t[t.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", t[t.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", t[t.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", t[t.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", t[t.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", t[t.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", t[t.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", t[t.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", t[t.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", t[t.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", t[t.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL";
})(q || (q = {}));
var Ui = (st = {}, st[q.COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5, st[q.COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5, st[q.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, st[q.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, st[q.COMPRESSED_SRGB_S3TC_DXT1_EXT] = 0.5, st[q.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = 0.5, st[q.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, st[q.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, st[q.COMPRESSED_R11_EAC] = 0.5, st[q.COMPRESSED_SIGNED_R11_EAC] = 0.5, st[q.COMPRESSED_RG11_EAC] = 1, st[q.COMPRESSED_SIGNED_RG11_EAC] = 1, st[q.COMPRESSED_RGB8_ETC2] = 0.5, st[q.COMPRESSED_RGBA8_ETC2_EAC] = 1, st[q.COMPRESSED_SRGB8_ETC2] = 0.5, st[q.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, st[q.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, st[q.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, st[q.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5, st[q.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5, st[q.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25, st[q.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25, st[q.COMPRESSED_RGB_ETC1_WEBGL] = 0.5, st[q.COMPRESSED_RGB_ATC_WEBGL] = 0.5, st[q.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, st[q.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, st);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ra = function(t, r) {
  return ra = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ra(t, r);
};
function qu(t, r) {
  ra(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
function l0(t, r, e, i) {
  function n(a) {
    return a instanceof e ? a : new e(function(s) {
      s(a);
    });
  }
  return new (e || (e = Promise))(function(a, s) {
    function o(l) {
      try {
        u(i.next(l));
      } catch (f) {
        s(f);
      }
    }
    function h(l) {
      try {
        u(i.throw(l));
      } catch (f) {
        s(f);
      }
    }
    function u(l) {
      l.done ? a(l.value) : n(l.value).then(o, h);
    }
    u((i = i.apply(t, r || [])).next());
  });
}
function f0(t, r) {
  var e = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, i, n, a, s;
  return s = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function o(u) {
    return function(l) {
      return h([u, l]);
    };
  }
  function h(u) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (i = 1, n && (a = u[0] & 2 ? n.return : u[0] ? n.throw || ((a = n.return) && a.call(n), 0) : n.next) && !(a = a.call(n, u[1])).done)
          return a;
        switch (n = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
          case 0:
          case 1:
            a = u;
            break;
          case 4:
            return e.label++, { value: u[1], done: !1 };
          case 5:
            e.label++, n = u[1], u = [0];
            continue;
          case 7:
            u = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (a = e.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              e = 0;
              continue;
            }
            if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
              e.label = u[1];
              break;
            }
            if (u[0] === 6 && e.label < a[1]) {
              e.label = a[1], a = u;
              break;
            }
            if (a && e.label < a[2]) {
              e.label = a[2], e.ops.push(u);
              break;
            }
            a[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        u = r.call(t, e);
      } catch (l) {
        u = [6, l], n = 0;
      } finally {
        i = a = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
var c0 = function(t) {
  qu(r, t);
  function r(e, i) {
    i === void 0 && (i = { width: 1, height: 1, autoLoad: !0 });
    var n = this, a, s;
    return typeof e == "string" ? (a = e, s = new Uint8Array()) : (a = null, s = e), n = t.call(this, s, i) || this, n.origin = a, n.buffer = s ? new ta(s) : null, n.origin && i.autoLoad !== !1 && n.load(), s && s.length && (n.loaded = !0, n.onBlobLoaded(n.buffer.rawBinaryData)), n;
  }
  return r.prototype.onBlobLoaded = function(e) {
  }, r.prototype.load = function() {
    return l0(this, void 0, Promise, function() {
      var e, i, n;
      return f0(this, function(a) {
        switch (a.label) {
          case 0:
            return [4, fetch(this.origin)];
          case 1:
            return e = a.sent(), [4, e.blob()];
          case 2:
            return i = a.sent(), [4, i.arrayBuffer()];
          case 3:
            return n = a.sent(), this.data = new Uint32Array(n), this.buffer = new ta(n), this.loaded = !0, this.onBlobLoaded(n), this.update(), [2, this];
        }
      });
    });
  }, r;
}(kr), ia = function(t) {
  qu(r, t);
  function r(e, i) {
    var n = t.call(this, e, i) || this;
    return n.format = i.format, n.levels = i.levels || 1, n._width = i.width, n._height = i.height, n._extension = r._formatToExtension(n.format), (i.levelBuffers || n.buffer) && (n._levelBuffers = i.levelBuffers || r._createLevelBuffers(
      e instanceof Uint8Array ? e : n.buffer.uint8View,
      n.format,
      n.levels,
      4,
      4,
      n.width,
      n.height
    )), n;
  }
  return r.prototype.upload = function(e, i, n) {
    var a = e.gl, s = e.context.extensions[this._extension];
    if (!s)
      throw new Error(this._extension + " textures are not supported on the current machine");
    if (!this._levelBuffers)
      return !1;
    for (var o = 0, h = this.levels; o < h; o++) {
      var u = this._levelBuffers[o], l = u.levelID, f = u.levelWidth, c = u.levelHeight, d = u.levelBuffer;
      a.compressedTexImage2D(a.TEXTURE_2D, l, this.format, f, c, 0, d);
    }
    return !0;
  }, r.prototype.onBlobLoaded = function() {
    this._levelBuffers = r._createLevelBuffers(
      this.buffer.uint8View,
      this.format,
      this.levels,
      4,
      4,
      this.width,
      this.height
    );
  }, r._formatToExtension = function(e) {
    if (e >= 33776 && e <= 33779)
      return "s3tc";
    if (e >= 37488 && e <= 37497)
      return "etc";
    if (e >= 35840 && e <= 35843)
      return "pvrtc";
    if (e >= 36196)
      return "etc1";
    if (e >= 35986 && e <= 34798)
      return "atc";
    throw new Error("Invalid (compressed) texture format given!");
  }, r._createLevelBuffers = function(e, i, n, a, s, o, h) {
    for (var u = new Array(n), l = e.byteOffset, f = o, c = h, d = f + a - 1 & ~(a - 1), p = c + s - 1 & ~(s - 1), v = d * p * Ui[i], _ = 0; _ < n; _++)
      u[_] = {
        levelID: _,
        levelWidth: n > 1 ? f : d,
        levelHeight: n > 1 ? c : p,
        levelBuffer: new Uint8Array(e.buffer, l, v)
      }, l += v, f = f >> 1 || 1, c = c >> 1 || 1, d = f + a - 1 & ~(a - 1), p = c + s - 1 & ~(s - 1), v = d * p * Ui[i];
    return u;
  }, r;
}(c0), d0 = function() {
  function t() {
  }
  return t.use = function(r, e) {
    var i = r.data, n = this;
    if (r.type === _t.TYPE.JSON && i && i.cacheID && i.textures) {
      for (var a = i.textures, s = void 0, o = void 0, h = 0, u = a.length; h < u; h++) {
        var l = a[h], f = l.src, c = l.format;
        if (c || (o = f), t.textureFormats[c]) {
          s = f;
          break;
        }
      }
      if (s = s || o, !s) {
        e(new Error("Cannot load compressed-textures in " + r.url + ", make sure you provide a fallback"));
        return;
      }
      if (s === r.url) {
        e(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
        return;
      }
      var d = {
        crossOrigin: r.crossOrigin,
        metadata: r.metadata.imageMetadata,
        parentResource: r
      }, p = Ye.resolve(r.url.replace(n.baseUrl, ""), s), v = i.cacheID;
      n.add(v, p, d, function(_) {
        if (_.error) {
          e(_.error);
          return;
        }
        var m = _.texture, y = m === void 0 ? null : m, g = _.textures, T = g === void 0 ? {} : g;
        Object.assign(r, { texture: y, textures: T }), e();
      });
    } else
      e();
  }, Object.defineProperty(t, "textureExtensions", {
    get: function() {
      if (!t._textureExtensions) {
        var r = O.ADAPTER.createCanvas(), e = r.getContext("webgl");
        if (!e)
          return console.warn("WebGL not available for compressed textures. Silently failing."), {};
        var i = {
          s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
          s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
          etc: e.getExtension("WEBGL_compressed_texture_etc"),
          etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
          pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
          atc: e.getExtension("WEBGL_compressed_texture_atc"),
          astc: e.getExtension("WEBGL_compressed_texture_astc")
        };
        t._textureExtensions = i;
      }
      return t._textureExtensions;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "textureFormats", {
    get: function() {
      if (!t._textureFormats) {
        var r = t.textureExtensions;
        t._textureFormats = {};
        for (var e in r) {
          var i = r[e];
          !i || Object.assign(t._textureFormats, Object.getPrototypeOf(i));
        }
      }
      return t._textureFormats;
    },
    enumerable: !1,
    configurable: !0
  }), t.extension = ot.Loader, t;
}();
function Yu(t, r, e) {
  var i = {
    textures: {},
    texture: null
  };
  if (!r)
    return i;
  var n = r.map(function(a) {
    return new z(new et(a, Object.assign({
      mipmap: te.OFF,
      alphaMode: Xt.NO_PREMULTIPLIED_ALPHA
    }, e)));
  });
  return n.forEach(function(a, s) {
    var o = a.baseTexture, h = t + "-" + (s + 1);
    et.addToCache(o, h), z.addToCache(a, h), s === 0 && (et.addToCache(o, t), z.addToCache(a, t), i.texture = a), i.textures[h] = a;
  }), i;
}
var cr, St, yn = 4, fi = 124, p0 = 32, Io = 20, v0 = 542327876, ci = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
}, _0 = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
}, di = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
}, Bt;
(function(t) {
  t[t.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", t[t.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", t[t.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", t[t.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", t[t.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", t[t.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", t[t.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", t[t.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", t[t.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", t[t.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", t[t.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", t[t.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", t[t.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", t[t.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", t[t.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", t[t.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", t[t.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", t[t.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", t[t.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", t[t.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", t[t.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", t[t.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", t[t.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", t[t.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", t[t.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", t[t.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", t[t.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", t[t.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", t[t.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", t[t.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", t[t.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", t[t.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", t[t.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", t[t.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", t[t.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", t[t.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", t[t.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", t[t.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", t[t.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", t[t.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", t[t.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", t[t.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", t[t.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", t[t.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", t[t.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", t[t.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", t[t.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", t[t.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", t[t.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", t[t.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", t[t.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", t[t.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", t[t.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", t[t.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", t[t.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", t[t.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", t[t.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", t[t.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", t[t.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", t[t.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", t[t.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", t[t.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", t[t.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", t[t.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", t[t.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", t[t.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", t[t.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", t[t.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", t[t.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", t[t.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", t[t.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", t[t.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", t[t.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", t[t.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", t[t.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", t[t.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", t[t.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", t[t.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", t[t.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", t[t.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", t[t.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", t[t.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", t[t.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", t[t.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", t[t.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", t[t.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", t[t.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", t[t.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", t[t.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", t[t.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", t[t.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", t[t.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", t[t.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", t[t.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", t[t.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", t[t.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", t[t.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", t[t.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", t[t.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", t[t.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", t[t.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", t[t.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", t[t.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", t[t.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", t[t.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", t[t.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", t[t.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", t[t.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", t[t.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", t[t.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", t[t.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", t[t.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
})(Bt || (Bt = {}));
var na;
(function(t) {
  t[t.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", t[t.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", t[t.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(na || (na = {}));
var m0 = 1, y0 = 2, x0 = 4, g0 = 64, b0 = 512, T0 = 131072, I0 = 827611204, E0 = 861165636, w0 = 894720068, R0 = 808540228, C0 = 4, N0 = (cr = {}, cr[I0] = q.COMPRESSED_RGBA_S3TC_DXT1_EXT, cr[E0] = q.COMPRESSED_RGBA_S3TC_DXT3_EXT, cr[w0] = q.COMPRESSED_RGBA_S3TC_DXT5_EXT, cr), A0 = (St = {}, St[Bt.DXGI_FORMAT_BC1_TYPELESS] = q.COMPRESSED_RGBA_S3TC_DXT1_EXT, St[Bt.DXGI_FORMAT_BC1_UNORM] = q.COMPRESSED_RGBA_S3TC_DXT1_EXT, St[Bt.DXGI_FORMAT_BC2_TYPELESS] = q.COMPRESSED_RGBA_S3TC_DXT3_EXT, St[Bt.DXGI_FORMAT_BC2_UNORM] = q.COMPRESSED_RGBA_S3TC_DXT3_EXT, St[Bt.DXGI_FORMAT_BC3_TYPELESS] = q.COMPRESSED_RGBA_S3TC_DXT5_EXT, St[Bt.DXGI_FORMAT_BC3_UNORM] = q.COMPRESSED_RGBA_S3TC_DXT5_EXT, St[Bt.DXGI_FORMAT_BC1_UNORM_SRGB] = q.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, St[Bt.DXGI_FORMAT_BC2_UNORM_SRGB] = q.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, St[Bt.DXGI_FORMAT_BC3_UNORM_SRGB] = q.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, St);
function P0(t) {
  var r = new Uint32Array(t), e = r[0];
  if (e !== v0)
    throw new Error("Invalid DDS file magic word");
  var i = new Uint32Array(t, 0, fi / Uint32Array.BYTES_PER_ELEMENT), n = i[ci.HEIGHT], a = i[ci.WIDTH], s = i[ci.MIPMAP_COUNT], o = new Uint32Array(t, ci.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, p0 / Uint32Array.BYTES_PER_ELEMENT), h = o[m0];
  if (h & x0) {
    var u = o[_0.FOURCC];
    if (u !== R0) {
      var l = N0[u], f = yn + fi, c = new Uint8Array(t, f), d = new ia(c, {
        format: l,
        width: a,
        height: n,
        levels: s
      });
      return [d];
    }
    var p = yn + fi, v = new Uint32Array(r.buffer, p, Io / Uint32Array.BYTES_PER_ELEMENT), _ = v[di.DXGI_FORMAT], m = v[di.RESOURCE_DIMENSION], y = v[di.MISC_FLAG], g = v[di.ARRAY_SIZE], T = A0[_];
    if (T === void 0)
      throw new Error("DDSParser cannot parse texture data with DXGI format " + _);
    if (y === C0)
      throw new Error("DDSParser does not support cubemap textures");
    if (m === na.DDS_DIMENSION_TEXTURE3D)
      throw new Error("DDSParser does not supported 3D texture data");
    var b = new Array(), x = yn + fi + Io;
    if (g === 1)
      b.push(new Uint8Array(t, x));
    else {
      for (var E = Ui[T], C = 0, w = a, R = n, F = 0; F < s; F++) {
        var M = Math.max(1, w + 3 & -4), k = Math.max(1, R + 3 & -4), Q = M * k * E;
        C += Q, w = w >>> 1, R = R >>> 1;
      }
      for (var A = x, F = 0; F < g; F++)
        b.push(new Uint8Array(t, A, C)), A += C;
    }
    return b.map(function(L) {
      return new ia(L, {
        format: T,
        width: a,
        height: n,
        levels: s
      });
    });
  }
  throw h & g0 ? new Error("DDSParser does not support uncompressed texture data.") : h & b0 ? new Error("DDSParser does not supported YUV uncompressed texture data.") : h & T0 ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : h & y0 ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
var de, ie, dr, Eo = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10], U0 = 67305985, Gt = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
}, aa = 64, wo = (de = {}, de[G.UNSIGNED_BYTE] = 1, de[G.UNSIGNED_SHORT] = 2, de[G.INT] = 4, de[G.UNSIGNED_INT] = 4, de[G.FLOAT] = 4, de[G.HALF_FLOAT] = 8, de), O0 = (ie = {}, ie[P.RGBA] = 4, ie[P.RGB] = 3, ie[P.RG] = 2, ie[P.RED] = 1, ie[P.LUMINANCE] = 1, ie[P.LUMINANCE_ALPHA] = 2, ie[P.ALPHA] = 1, ie), F0 = (dr = {}, dr[G.UNSIGNED_SHORT_4_4_4_4] = 2, dr[G.UNSIGNED_SHORT_5_5_5_1] = 2, dr[G.UNSIGNED_SHORT_5_6_5] = 2, dr);
function L0(t, r, e) {
  e === void 0 && (e = !1);
  var i = new DataView(r);
  if (!S0(t, i))
    return null;
  var n = i.getUint32(Gt.ENDIANNESS, !0) === U0, a = i.getUint32(Gt.GL_TYPE, n), s = i.getUint32(Gt.GL_FORMAT, n), o = i.getUint32(Gt.GL_INTERNAL_FORMAT, n), h = i.getUint32(Gt.PIXEL_WIDTH, n), u = i.getUint32(Gt.PIXEL_HEIGHT, n) || 1, l = i.getUint32(Gt.PIXEL_DEPTH, n) || 1, f = i.getUint32(Gt.NUMBER_OF_ARRAY_ELEMENTS, n) || 1, c = i.getUint32(Gt.NUMBER_OF_FACES, n), d = i.getUint32(Gt.NUMBER_OF_MIPMAP_LEVELS, n), p = i.getUint32(Gt.BYTES_OF_KEY_VALUE_DATA, n);
  if (u === 0 || l !== 1)
    throw new Error("Only 2D textures are supported");
  if (c !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (f !== 1)
    throw new Error("WebGL does not support array textures");
  var v = 4, _ = 4, m = h + 3 & -4, y = u + 3 & -4, g = new Array(f), T = h * u;
  a === 0 && (T = m * y);
  var b;
  if (a !== 0 ? wo[a] ? b = wo[a] * O0[s] : b = F0[a] : b = Ui[o], b === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  for (var x = e ? B0(i, p, n) : null, E = T * b, C = E, w = h, R = u, F = m, M = y, k = aa + p, Q = 0; Q < d; Q++) {
    for (var A = i.getUint32(k, n), L = k + 4, W = 0; W < f; W++) {
      var vt = g[W];
      vt || (vt = g[W] = new Array(d)), vt[Q] = {
        levelID: Q,
        levelWidth: d > 1 || a !== 0 ? w : F,
        levelHeight: d > 1 || a !== 0 ? R : M,
        levelBuffer: new Uint8Array(r, L, C)
      }, L += C;
    }
    k += A + 4, k = k % 4 !== 0 ? k + 4 - k % 4 : k, w = w >> 1 || 1, R = R >> 1 || 1, F = w + v - 1 & ~(v - 1), M = R + _ - 1 & ~(_ - 1), C = F * M * b;
  }
  return a !== 0 ? {
    uncompressed: g.map(function(rt) {
      var I = rt[0].levelBuffer, N = !1;
      return a === G.FLOAT ? I = new Float32Array(rt[0].levelBuffer.buffer, rt[0].levelBuffer.byteOffset, rt[0].levelBuffer.byteLength / 4) : a === G.UNSIGNED_INT ? (N = !0, I = new Uint32Array(rt[0].levelBuffer.buffer, rt[0].levelBuffer.byteOffset, rt[0].levelBuffer.byteLength / 4)) : a === G.INT && (N = !0, I = new Int32Array(rt[0].levelBuffer.buffer, rt[0].levelBuffer.byteOffset, rt[0].levelBuffer.byteLength / 4)), {
        resource: new kr(I, {
          width: rt[0].levelWidth,
          height: rt[0].levelHeight
        }),
        type: a,
        format: N ? G0(s) : s
      };
    }),
    kvData: x
  } : {
    compressed: g.map(function(rt) {
      return new ia(null, {
        format: o,
        width: h,
        height: u,
        levels: d,
        levelBuffers: rt
      });
    }),
    kvData: x
  };
}
function S0(t, r) {
  for (var e = 0; e < Eo.length; e++)
    if (r.getUint8(e) !== Eo[e])
      return console.error(t + " is not a valid *.ktx file!"), !1;
  return !0;
}
function G0(t) {
  switch (t) {
    case P.RGBA:
      return P.RGBA_INTEGER;
    case P.RGB:
      return P.RGB_INTEGER;
    case P.RG:
      return P.RG_INTEGER;
    case P.RED:
      return P.RED_INTEGER;
    default:
      return t;
  }
}
function B0(t, r, e) {
  for (var i = /* @__PURE__ */ new Map(), n = 0; n < r; ) {
    var a = t.getUint32(aa + n, e), s = aa + n + 4, o = 3 - (a + 3) % 4;
    if (a === 0 || a > r - n) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    for (var h = 0; h < a && t.getUint8(s + h) !== 0; h++)
      ;
    if (h === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    var u = new TextDecoder().decode(new Uint8Array(t.buffer, s, h)), l = new DataView(t.buffer, s + h + 1, a - h - 1);
    i.set(u, l), n += 4 + a + o;
  }
  return i;
}
_t.setExtensionXhrType("dds", _t.XHR_RESPONSE_TYPE.BUFFER);
var M0 = function() {
  function t() {
  }
  return t.use = function(r, e) {
    if (r.extension === "dds" && r.data)
      try {
        Object.assign(r, Yu(r.name || r.url, P0(r.data), r.metadata));
      } catch (i) {
        e(i);
        return;
      }
    e();
  }, t.extension = ot.Loader, t;
}();
_t.setExtensionXhrType("ktx", _t.XHR_RESPONSE_TYPE.BUFFER);
var D0 = function() {
  function t() {
  }
  return t.use = function(r, e) {
    if (r.extension === "ktx" && r.data)
      try {
        var i = r.name || r.url, n = L0(i, r.data, this.loadKeyValueData), a = n.compressed, s = n.uncompressed, o = n.kvData;
        if (a) {
          var h = Yu(i, a, r.metadata);
          if (o && h.textures)
            for (var u in h.textures)
              h.textures[u].baseTexture.ktxKeyValueData = o;
          Object.assign(r, h);
        } else if (s) {
          var l = {};
          s.forEach(function(f, c) {
            var d = new z(new et(f.resource, {
              mipmap: te.OFF,
              alphaMode: Xt.NO_PREMULTIPLIED_ALPHA,
              type: f.type,
              format: f.format
            })), p = i + "-" + (c + 1);
            o && (d.baseTexture.ktxKeyValueData = o), et.addToCache(d.baseTexture, p), z.addToCache(d, p), c === 0 && (l[i] = d, et.addToCache(d.baseTexture, i), z.addToCache(d, i)), l[p] = d;
          }), Object.assign(r, { textures: l });
        }
      } catch (f) {
        e(f);
        return;
      }
    e();
  }, t.extension = ot.Loader, t.loadKeyValueData = !1, t;
}();
/*!
 * @pixi/particle-container - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/particle-container is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var sa = function(t, r) {
  return sa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, sa(t, r);
};
function Zu(t, r) {
  sa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
(function(t) {
  Zu(r, t);
  function r(e, i, n, a) {
    e === void 0 && (e = 1500), n === void 0 && (n = 16384), a === void 0 && (a = !1);
    var s = t.call(this) || this, o = 16384;
    return n > o && (n = o), s._properties = [!1, !0, !1, !1, !1], s._maxSize = e, s._batchSize = n, s._buffers = null, s._bufferUpdateIDs = [], s._updateID = 0, s.interactiveChildren = !1, s.blendMode = D.NORMAL, s.autoResize = a, s.roundPixels = !0, s.baseTexture = null, s.setProperties(i), s._tint = 0, s.tintRgb = new Float32Array(4), s.tint = 16777215, s;
  }
  return r.prototype.setProperties = function(e) {
    e && (this._properties[0] = "vertices" in e || "scale" in e ? !!e.vertices || !!e.scale : this._properties[0], this._properties[1] = "position" in e ? !!e.position : this._properties[1], this._properties[2] = "rotation" in e ? !!e.rotation : this._properties[2], this._properties[3] = "uvs" in e ? !!e.uvs : this._properties[3], this._properties[4] = "tint" in e || "alpha" in e ? !!e.tint || !!e.alpha : this._properties[4]);
  }, r.prototype.updateTransform = function() {
    this.displayObjectUpdateTransform();
  }, Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return this._tint;
    },
    set: function(e) {
      this._tint = e, nr(e, this.tintRgb);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.render = function(e) {
    var i = this;
    !this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable || (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
      return i.onChildrenChange(0);
    })), e.batch.setObjectRenderer(e.plugins.particle), e.plugins.particle.render(this));
  }, r.prototype.onChildrenChange = function(e) {
    for (var i = Math.floor(e / this._batchSize); this._bufferUpdateIDs.length < i; )
      this._bufferUpdateIDs.push(0);
    this._bufferUpdateIDs[i] = ++this._updateID;
  }, r.prototype.dispose = function() {
    if (this._buffers) {
      for (var e = 0; e < this._buffers.length; ++e)
        this._buffers[e].destroy();
      this._buffers = null;
    }
  }, r.prototype.destroy = function(e) {
    t.prototype.destroy.call(this, e), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
  }, r;
})(gt);
var Ro = function() {
  function t(r, e, i) {
    this.geometry = new Be(), this.indexBuffer = null, this.size = i, this.dynamicProperties = [], this.staticProperties = [];
    for (var n = 0; n < r.length; ++n) {
      var a = r[n];
      a = {
        attributeName: a.attributeName,
        size: a.size,
        uploadFunction: a.uploadFunction,
        type: a.type || G.FLOAT,
        offset: a.offset
      }, e[n] ? this.dynamicProperties.push(a) : this.staticProperties.push(a);
    }
    this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
  }
  return t.prototype.initBuffers = function() {
    var r = this.geometry, e = 0;
    this.indexBuffer = new dt(Qd(this.size), !0, !0), r.addIndex(this.indexBuffer), this.dynamicStride = 0;
    for (var i = 0; i < this.dynamicProperties.length; ++i) {
      var n = this.dynamicProperties[i];
      n.offset = e, e += n.size, this.dynamicStride += n.size;
    }
    var a = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
    this.dynamicData = new Float32Array(a), this.dynamicDataUint32 = new Uint32Array(a), this.dynamicBuffer = new dt(this.dynamicData, !1, !1);
    var s = 0;
    this.staticStride = 0;
    for (var i = 0; i < this.staticProperties.length; ++i) {
      var n = this.staticProperties[i];
      n.offset = s, s += n.size, this.staticStride += n.size;
    }
    var o = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
    this.staticData = new Float32Array(o), this.staticDataUint32 = new Uint32Array(o), this.staticBuffer = new dt(this.staticData, !0, !1);
    for (var i = 0; i < this.dynamicProperties.length; ++i) {
      var n = this.dynamicProperties[i];
      r.addAttribute(n.attributeName, this.dynamicBuffer, 0, n.type === G.UNSIGNED_BYTE, n.type, this.dynamicStride * 4, n.offset * 4);
    }
    for (var i = 0; i < this.staticProperties.length; ++i) {
      var n = this.staticProperties[i];
      r.addAttribute(n.attributeName, this.staticBuffer, 0, n.type === G.UNSIGNED_BYTE, n.type, this.staticStride * 4, n.offset * 4);
    }
  }, t.prototype.uploadDynamic = function(r, e, i) {
    for (var n = 0; n < this.dynamicProperties.length; n++) {
      var a = this.dynamicProperties[n];
      a.uploadFunction(r, e, i, a.type === G.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, a.offset);
    }
    this.dynamicBuffer._updateID++;
  }, t.prototype.uploadStatic = function(r, e, i) {
    for (var n = 0; n < this.staticProperties.length; n++) {
      var a = this.staticProperties[n];
      a.uploadFunction(r, e, i, a.type === G.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, a.offset);
    }
    this.staticBuffer._updateID++;
  }, t.prototype.destroy = function() {
    this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
  }, t;
}(), k0 = `varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`, H0 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`, X0 = function(t) {
  Zu(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return i.shader = null, i.properties = null, i.tempMatrix = new ft(), i.properties = [
      {
        attributeName: "aVertexPosition",
        size: 2,
        uploadFunction: i.uploadVertices,
        offset: 0
      },
      {
        attributeName: "aPositionCoord",
        size: 2,
        uploadFunction: i.uploadPosition,
        offset: 0
      },
      {
        attributeName: "aRotation",
        size: 1,
        uploadFunction: i.uploadRotation,
        offset: 0
      },
      {
        attributeName: "aTextureCoord",
        size: 2,
        uploadFunction: i.uploadUvs,
        offset: 0
      },
      {
        attributeName: "aColor",
        size: 1,
        type: G.UNSIGNED_BYTE,
        uploadFunction: i.uploadTint,
        offset: 0
      }
    ], i.shader = Qt.from(H0, k0, {}), i.state = De.for2d(), i;
  }
  return r.prototype.render = function(e) {
    var i = e.children, n = e._maxSize, a = e._batchSize, s = this.renderer, o = i.length;
    if (o !== 0) {
      o > n && !e.autoResize && (o = n);
      var h = e._buffers;
      h || (h = e._buffers = this.generateBuffers(e));
      var u = i[0]._texture.baseTexture, l = u.alphaMode > 0;
      this.state.blendMode = Ua(e.blendMode, l), s.state.set(this.state);
      var f = s.gl, c = e.worldTransform.copyTo(this.tempMatrix);
      c.prepend(s.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = c.toArray(!0), this.shader.uniforms.uColor = Kd(e.tintRgb, e.worldAlpha, this.shader.uniforms.uColor, l), this.shader.uniforms.uSampler = u, this.renderer.shader.bind(this.shader);
      for (var d = !1, p = 0, v = 0; p < o; p += a, v += 1) {
        var _ = o - p;
        _ > a && (_ = a), v >= h.length && h.push(this._generateOneMoreBuffer(e));
        var m = h[v];
        m.uploadDynamic(i, p, _);
        var y = e._bufferUpdateIDs[v] || 0;
        d = d || m._updateID < y, d && (m._updateID = e._updateID, m.uploadStatic(i, p, _)), s.geometry.bind(m.geometry), f.drawElements(f.TRIANGLES, _ * 6, f.UNSIGNED_SHORT, 0);
      }
    }
  }, r.prototype.generateBuffers = function(e) {
    for (var i = [], n = e._maxSize, a = e._batchSize, s = e._properties, o = 0; o < n; o += a)
      i.push(new Ro(this.properties, s, a));
    return i;
  }, r.prototype._generateOneMoreBuffer = function(e) {
    var i = e._batchSize, n = e._properties;
    return new Ro(this.properties, n, i);
  }, r.prototype.uploadVertices = function(e, i, n, a, s, o) {
    for (var h = 0, u = 0, l = 0, f = 0, c = 0; c < n; ++c) {
      var d = e[i + c], p = d._texture, v = d.scale.x, _ = d.scale.y, m = p.trim, y = p.orig;
      m ? (u = m.x - d.anchor.x * y.width, h = u + m.width, f = m.y - d.anchor.y * y.height, l = f + m.height) : (h = y.width * (1 - d.anchor.x), u = y.width * -d.anchor.x, l = y.height * (1 - d.anchor.y), f = y.height * -d.anchor.y), a[o] = u * v, a[o + 1] = f * _, a[o + s] = h * v, a[o + s + 1] = f * _, a[o + s * 2] = h * v, a[o + s * 2 + 1] = l * _, a[o + s * 3] = u * v, a[o + s * 3 + 1] = l * _, o += s * 4;
    }
  }, r.prototype.uploadPosition = function(e, i, n, a, s, o) {
    for (var h = 0; h < n; h++) {
      var u = e[i + h].position;
      a[o] = u.x, a[o + 1] = u.y, a[o + s] = u.x, a[o + s + 1] = u.y, a[o + s * 2] = u.x, a[o + s * 2 + 1] = u.y, a[o + s * 3] = u.x, a[o + s * 3 + 1] = u.y, o += s * 4;
    }
  }, r.prototype.uploadRotation = function(e, i, n, a, s, o) {
    for (var h = 0; h < n; h++) {
      var u = e[i + h].rotation;
      a[o] = u, a[o + s] = u, a[o + s * 2] = u, a[o + s * 3] = u, o += s * 4;
    }
  }, r.prototype.uploadUvs = function(e, i, n, a, s, o) {
    for (var h = 0; h < n; ++h) {
      var u = e[i + h]._texture._uvs;
      u ? (a[o] = u.x0, a[o + 1] = u.y0, a[o + s] = u.x1, a[o + s + 1] = u.y1, a[o + s * 2] = u.x2, a[o + s * 2 + 1] = u.y2, a[o + s * 3] = u.x3, a[o + s * 3 + 1] = u.y3, o += s * 4) : (a[o] = 0, a[o + 1] = 0, a[o + s] = 0, a[o + s + 1] = 0, a[o + s * 2] = 0, a[o + s * 2 + 1] = 0, a[o + s * 3] = 0, a[o + s * 3 + 1] = 0, o += s * 4);
    }
  }, r.prototype.uploadTint = function(e, i, n, a, s, o) {
    for (var h = 0; h < n; ++h) {
      var u = e[i + h], l = u._texture.baseTexture.alphaMode > 0, f = u.alpha, c = f < 1 && l ? Dr(u._tintRGB, f) : u._tintRGB + (f * 255 << 24);
      a[o] = c, a[o + s] = c, a[o + s * 2] = c, a[o + s * 3] = c, o += s * 4;
    }
  }, r.prototype.destroy = function() {
    t.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
  }, r.extension = {
    name: "particle",
    type: ot.RendererPlugin
  }, r;
}(Hr);
/*!
 * @pixi/graphics - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var me;
(function(t) {
  t.MITER = "miter", t.BEVEL = "bevel", t.ROUND = "round";
})(me || (me = {}));
var ye;
(function(t) {
  t.BUTT = "butt", t.ROUND = "round", t.SQUARE = "square";
})(ye || (ye = {}));
var Lr = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount: function(t, r) {
    if (r === void 0 && (r = 20), !this.adaptive || !t || isNaN(t))
      return r;
    var e = Math.ceil(t / this.maxLength);
    return e < this.minSegments ? e = this.minSegments : e > this.maxSegments && (e = this.maxSegments), e;
  }
}, Ju = function() {
  function t() {
    this.color = 16777215, this.alpha = 1, this.texture = z.WHITE, this.matrix = null, this.visible = !1, this.reset();
  }
  return t.prototype.clone = function() {
    var r = new t();
    return r.color = this.color, r.alpha = this.alpha, r.texture = this.texture, r.matrix = this.matrix, r.visible = this.visible, r;
  }, t.prototype.reset = function() {
    this.color = 16777215, this.alpha = 1, this.texture = z.WHITE, this.matrix = null, this.visible = !1;
  }, t.prototype.destroy = function() {
    this.texture = null, this.matrix = null;
  }, t;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var oa = function(t, r) {
  return oa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, oa(t, r);
};
function Ga(t, r) {
  oa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
function Co(t, r) {
  var e, i;
  r === void 0 && (r = !1);
  var n = t.length;
  if (!(n < 6)) {
    for (var a = 0, s = 0, o = t[n - 2], h = t[n - 1]; s < n; s += 2) {
      var u = t[s], l = t[s + 1];
      a += (u - o) * (l + h), o = u, h = l;
    }
    if (!r && a > 0 || r && a <= 0)
      for (var f = n / 2, s = f + f % 2; s < n; s += 2) {
        var c = n - s - 2, d = n - s - 1, p = s, v = s + 1;
        e = [t[p], t[c]], t[c] = e[0], t[p] = e[1], i = [t[v], t[d]], t[d] = i[0], t[v] = i[1];
      }
  }
}
var Ku = {
  build: function(t) {
    t.points = t.shape.points.slice();
  },
  triangulate: function(t, r) {
    var e = t.points, i = t.holes, n = r.points, a = r.indices;
    if (e.length >= 6) {
      Co(e, !1);
      for (var s = [], o = 0; o < i.length; o++) {
        var h = i[o];
        Co(h.points, !0), s.push(e.length / 2), e = e.concat(h.points);
      }
      var u = ki.exports(e, s, 2);
      if (!u)
        return;
      for (var l = n.length / 2, o = 0; o < u.length; o += 3)
        a.push(u[o] + l), a.push(u[o + 1] + l), a.push(u[o + 2] + l);
      for (var o = 0; o < e.length; o++)
        n.push(e[o]);
    }
  }
}, Oi = {
  build: function(t) {
    var r = t.points, e, i, n, a, s, o;
    if (t.type === It.CIRC) {
      var h = t.shape;
      e = h.x, i = h.y, s = o = h.radius, n = a = 0;
    } else if (t.type === It.ELIP) {
      var u = t.shape;
      e = u.x, i = u.y, s = u.width, o = u.height, n = a = 0;
    } else {
      var l = t.shape, f = l.width / 2, c = l.height / 2;
      e = l.x + f, i = l.y + c, s = o = Math.max(0, Math.min(l.radius, Math.min(f, c))), n = f - s, a = c - o;
    }
    if (!(s >= 0 && o >= 0 && n >= 0 && a >= 0)) {
      r.length = 0;
      return;
    }
    var d = Math.ceil(2.3 * Math.sqrt(s + o)), p = d * 8 + (n ? 4 : 0) + (a ? 4 : 0);
    if (r.length = p, p !== 0) {
      if (d === 0) {
        r.length = 8, r[0] = r[6] = e + n, r[1] = r[3] = i + a, r[2] = r[4] = e - n, r[5] = r[7] = i - a;
        return;
      }
      var v = 0, _ = d * 4 + (n ? 2 : 0) + 2, m = _, y = p;
      {
        var g = n + s, T = a, b = e + g, x = e - g, E = i + T;
        if (r[v++] = b, r[v++] = E, r[--_] = E, r[--_] = x, a) {
          var C = i - T;
          r[m++] = x, r[m++] = C, r[--y] = C, r[--y] = b;
        }
      }
      for (var w = 1; w < d; w++) {
        var R = Math.PI / 2 * (w / d), g = n + Math.cos(R) * s, T = a + Math.sin(R) * o, b = e + g, x = e - g, E = i + T, C = i - T;
        r[v++] = b, r[v++] = E, r[--_] = E, r[--_] = x, r[m++] = x, r[m++] = C, r[--y] = C, r[--y] = b;
      }
      {
        var g = n, T = a + o, b = e + g, x = e - g, E = i + T, C = i - T;
        r[v++] = b, r[v++] = E, r[--y] = C, r[--y] = b, n && (r[v++] = x, r[v++] = E, r[--y] = C, r[--y] = x);
      }
    }
  },
  triangulate: function(t, r) {
    var e = t.points, i = r.points, n = r.indices;
    if (e.length !== 0) {
      var a = i.length / 2, s = a, o, h;
      if (t.type !== It.RREC) {
        var u = t.shape;
        o = u.x, h = u.y;
      } else {
        var l = t.shape;
        o = l.x + l.width / 2, h = l.y + l.height / 2;
      }
      var f = t.matrix;
      i.push(t.matrix ? f.a * o + f.c * h + f.tx : o, t.matrix ? f.b * o + f.d * h + f.ty : h), a++, i.push(e[0], e[1]);
      for (var c = 2; c < e.length; c += 2)
        i.push(e[c], e[c + 1]), n.push(a++, s, a);
      n.push(s + 1, s, a);
    }
  }
}, V0 = {
  build: function(t) {
    var r = t.shape, e = r.x, i = r.y, n = r.width, a = r.height, s = t.points;
    s.length = 0, s.push(e, i, e + n, i, e + n, i + a, e, i + a);
  },
  triangulate: function(t, r) {
    var e = t.points, i = r.points, n = i.length / 2;
    i.push(e[0], e[1], e[2], e[3], e[6], e[7], e[4], e[5]), r.indices.push(n, n + 1, n + 2, n + 1, n + 2, n + 3);
  }
};
function Ve(t, r, e) {
  var i = r - t;
  return t + i * e;
}
function pi(t, r, e, i, n, a, s) {
  s === void 0 && (s = []);
  for (var o = 20, h = s, u = 0, l = 0, f = 0, c = 0, d = 0, p = 0, v = 0, _ = 0; v <= o; ++v)
    _ = v / o, u = Ve(t, e, _), l = Ve(r, i, _), f = Ve(e, n, _), c = Ve(i, a, _), d = Ve(u, f, _), p = Ve(l, c, _), !(v === 0 && h[h.length - 2] === d && h[h.length - 1] === p) && h.push(d, p);
  return h;
}
var j0 = {
  build: function(t) {
    if (Fi.nextRoundedRectBehavior) {
      Oi.build(t);
      return;
    }
    var r = t.shape, e = t.points, i = r.x, n = r.y, a = r.width, s = r.height, o = Math.max(0, Math.min(r.radius, Math.min(a, s) / 2));
    e.length = 0, o ? (pi(i, n + o, i, n, i + o, n, e), pi(i + a - o, n, i + a, n, i + a, n + o, e), pi(i + a, n + s - o, i + a, n + s, i + a - o, n + s, e), pi(i + o, n + s, i, n + s, i, n + s - o, e)) : e.push(i, n, i + a, n, i + a, n + s, i, n + s);
  },
  triangulate: function(t, r) {
    if (Fi.nextRoundedRectBehavior) {
      Oi.triangulate(t, r);
      return;
    }
    for (var e = t.points, i = r.points, n = r.indices, a = i.length / 2, s = ki.exports(e, null, 2), o = 0, h = s.length; o < h; o += 3)
      n.push(s[o] + a), n.push(s[o + 1] + a), n.push(s[o + 2] + a);
    for (var o = 0, h = e.length; o < h; o++)
      i.push(e[o], e[++o]);
  }
};
function No(t, r, e, i, n, a, s, o) {
  var h = t - e * n, u = r - i * n, l = t + e * a, f = r + i * a, c, d;
  s ? (c = i, d = -e) : (c = -i, d = e);
  var p = h + c, v = u + d, _ = l + c, m = f + d;
  return o.push(p, v), o.push(_, m), 2;
}
function je(t, r, e, i, n, a, s, o) {
  var h = e - t, u = i - r, l = Math.atan2(h, u), f = Math.atan2(n - t, a - r);
  o && l < f ? l += Math.PI * 2 : !o && l > f && (f += Math.PI * 2);
  var c = l, d = f - l, p = Math.abs(d), v = Math.sqrt(h * h + u * u), _ = (15 * p * Math.sqrt(v) / Math.PI >> 0) + 1, m = d / _;
  if (c += m, o) {
    s.push(t, r), s.push(e, i);
    for (var y = 1, g = c; y < _; y++, g += m)
      s.push(t, r), s.push(t + Math.sin(g) * v, r + Math.cos(g) * v);
    s.push(t, r), s.push(n, a);
  } else {
    s.push(e, i), s.push(t, r);
    for (var y = 1, g = c; y < _; y++, g += m)
      s.push(t + Math.sin(g) * v, r + Math.cos(g) * v), s.push(t, r);
    s.push(n, a), s.push(t, r);
  }
  return _ * 2;
}
function z0(t, r) {
  var e = t.shape, i = t.points || e.points.slice(), n = r.closePointEps;
  if (i.length !== 0) {
    var a = t.lineStyle, s = new $(i[0], i[1]), o = new $(i[i.length - 2], i[i.length - 1]), h = e.type !== It.POLY || e.closeStroke, u = Math.abs(s.x - o.x) < n && Math.abs(s.y - o.y) < n;
    if (h) {
      i = i.slice(), u && (i.pop(), i.pop(), o.set(i[i.length - 2], i[i.length - 1]));
      var l = (s.x + o.x) * 0.5, f = (o.y + s.y) * 0.5;
      i.unshift(l, f), i.push(l, f);
    }
    var c = r.points, d = i.length / 2, p = i.length, v = c.length / 2, _ = a.width / 2, m = _ * _, y = a.miterLimit * a.miterLimit, g = i[0], T = i[1], b = i[2], x = i[3], E = 0, C = 0, w = -(T - x), R = g - b, F = 0, M = 0, k = Math.sqrt(w * w + R * R);
    w /= k, R /= k, w *= _, R *= _;
    var Q = a.alignment, A = (1 - Q) * 2, L = Q * 2;
    h || (a.cap === ye.ROUND ? p += je(g - w * (A - L) * 0.5, T - R * (A - L) * 0.5, g - w * A, T - R * A, g + w * L, T + R * L, c, !0) + 2 : a.cap === ye.SQUARE && (p += No(g, T, w, R, A, L, !0, c))), c.push(g - w * A, T - R * A), c.push(g + w * L, T + R * L);
    for (var W = 1; W < d - 1; ++W) {
      g = i[(W - 1) * 2], T = i[(W - 1) * 2 + 1], b = i[W * 2], x = i[W * 2 + 1], E = i[(W + 1) * 2], C = i[(W + 1) * 2 + 1], w = -(T - x), R = g - b, k = Math.sqrt(w * w + R * R), w /= k, R /= k, w *= _, R *= _, F = -(x - C), M = b - E, k = Math.sqrt(F * F + M * M), F /= k, M /= k, F *= _, M *= _;
      var vt = b - g, rt = T - x, I = b - E, N = C - x, U = rt * I - N * vt, B = U < 0;
      if (Math.abs(U) < 0.1) {
        c.push(b - w * A, x - R * A), c.push(b + w * L, x + R * L);
        continue;
      }
      var H = (-w + g) * (-R + x) - (-w + b) * (-R + T), Y = (-F + E) * (-M + x) - (-F + b) * (-M + C), V = (vt * Y - I * H) / U, tt = (N * H - rt * Y) / U, at = (V - b) * (V - b) + (tt - x) * (tt - x), it = b + (V - b) * A, nt = x + (tt - x) * A, j = b - (V - b) * L, Z = x - (tt - x) * L, X = Math.min(vt * vt + rt * rt, I * I + N * N), lt = B ? A : L, ht = X + lt * lt * m, J = at <= ht;
      J ? a.join === me.BEVEL || at / m > y ? (B ? (c.push(it, nt), c.push(b + w * L, x + R * L), c.push(it, nt), c.push(b + F * L, x + M * L)) : (c.push(b - w * A, x - R * A), c.push(j, Z), c.push(b - F * A, x - M * A), c.push(j, Z)), p += 2) : a.join === me.ROUND ? B ? (c.push(it, nt), c.push(b + w * L, x + R * L), p += je(b, x, b + w * L, x + R * L, b + F * L, x + M * L, c, !0) + 4, c.push(it, nt), c.push(b + F * L, x + M * L)) : (c.push(b - w * A, x - R * A), c.push(j, Z), p += je(b, x, b - w * A, x - R * A, b - F * A, x - M * A, c, !1) + 4, c.push(b - F * A, x - M * A), c.push(j, Z)) : (c.push(it, nt), c.push(j, Z)) : (c.push(b - w * A, x - R * A), c.push(b + w * L, x + R * L), a.join === me.ROUND ? B ? p += je(b, x, b + w * L, x + R * L, b + F * L, x + M * L, c, !0) + 2 : p += je(b, x, b - w * A, x - R * A, b - F * A, x - M * A, c, !1) + 2 : a.join === me.MITER && at / m <= y && (B ? (c.push(j, Z), c.push(j, Z)) : (c.push(it, nt), c.push(it, nt)), p += 2), c.push(b - F * A, x - M * A), c.push(b + F * L, x + M * L), p += 2);
    }
    g = i[(d - 2) * 2], T = i[(d - 2) * 2 + 1], b = i[(d - 1) * 2], x = i[(d - 1) * 2 + 1], w = -(T - x), R = g - b, k = Math.sqrt(w * w + R * R), w /= k, R /= k, w *= _, R *= _, c.push(b - w * A, x - R * A), c.push(b + w * L, x + R * L), h || (a.cap === ye.ROUND ? p += je(b - w * (A - L) * 0.5, x - R * (A - L) * 0.5, b - w * A, x - R * A, b + w * L, x + R * L, c, !1) + 2 : a.cap === ye.SQUARE && (p += No(b, x, w, R, A, L, !1, c)));
    for (var jt = r.indices, He = Lr.epsilon * Lr.epsilon, W = v; W < p + v - 2; ++W)
      g = c[W * 2], T = c[W * 2 + 1], b = c[(W + 1) * 2], x = c[(W + 1) * 2 + 1], E = c[(W + 2) * 2], C = c[(W + 2) * 2 + 1], !(Math.abs(g * (x - C) + b * (C - T) + E * (T - x)) < He) && jt.push(W, W + 1, W + 2);
  }
}
function W0(t, r) {
  var e = 0, i = t.shape, n = t.points || i.points, a = i.type !== It.POLY || i.closeStroke;
  if (n.length !== 0) {
    var s = r.points, o = r.indices, h = n.length / 2, u = s.length / 2, l = u;
    for (s.push(n[0], n[1]), e = 1; e < h; e++)
      s.push(n[e * 2], n[e * 2 + 1]), o.push(l, l + 1), l++;
    a && o.push(l, u);
  }
}
function Ao(t, r) {
  t.lineStyle.native ? W0(t, r) : z0(t, r);
}
var Po = function() {
  function t() {
  }
  return t.curveTo = function(r, e, i, n, a, s) {
    var o = s[s.length - 2], h = s[s.length - 1], u = h - e, l = o - r, f = n - e, c = i - r, d = Math.abs(u * c - l * f);
    if (d < 1e-8 || a === 0)
      return (s[s.length - 2] !== r || s[s.length - 1] !== e) && s.push(r, e), null;
    var p = u * u + l * l, v = f * f + c * c, _ = u * f + l * c, m = a * Math.sqrt(p) / d, y = a * Math.sqrt(v) / d, g = m * _ / p, T = y * _ / v, b = m * c + y * l, x = m * f + y * u, E = l * (y + g), C = u * (y + g), w = c * (m + T), R = f * (m + T), F = Math.atan2(C - x, E - b), M = Math.atan2(R - x, w - b);
    return {
      cx: b + r,
      cy: x + e,
      radius: a,
      startAngle: F,
      endAngle: M,
      anticlockwise: l * f > c * u
    };
  }, t.arc = function(r, e, i, n, a, s, o, h, u) {
    for (var l = o - s, f = Lr._segmentsCount(Math.abs(l) * a, Math.ceil(Math.abs(l) / Ni) * 40), c = l / (f * 2), d = c * 2, p = Math.cos(c), v = Math.sin(c), _ = f - 1, m = _ % 1 / _, y = 0; y <= _; ++y) {
      var g = y + m * y, T = c + s + d * g, b = Math.cos(T), x = -Math.sin(T);
      u.push((p * b + v * x) * a + i, (p * -x + v * b) * a + n);
    }
  }, t;
}(), $0 = function() {
  function t() {
  }
  return t.curveLength = function(r, e, i, n, a, s, o, h) {
    for (var u = 10, l = 0, f = 0, c = 0, d = 0, p = 0, v = 0, _ = 0, m = 0, y = 0, g = 0, T = 0, b = r, x = e, E = 1; E <= u; ++E)
      f = E / u, c = f * f, d = c * f, p = 1 - f, v = p * p, _ = v * p, m = _ * r + 3 * v * f * i + 3 * p * c * a + d * o, y = _ * e + 3 * v * f * n + 3 * p * c * s + d * h, g = b - m, T = x - y, b = m, x = y, l += Math.sqrt(g * g + T * T);
    return l;
  }, t.curveTo = function(r, e, i, n, a, s, o) {
    var h = o[o.length - 2], u = o[o.length - 1];
    o.length -= 2;
    var l = Lr._segmentsCount(t.curveLength(h, u, r, e, i, n, a, s)), f = 0, c = 0, d = 0, p = 0, v = 0;
    o.push(h, u);
    for (var _ = 1, m = 0; _ <= l; ++_)
      m = _ / l, f = 1 - m, c = f * f, d = c * f, p = m * m, v = p * m, o.push(d * h + 3 * c * m * r + 3 * f * p * i + v * a, d * u + 3 * c * m * e + 3 * f * p * n + v * s);
  }, t;
}(), q0 = function() {
  function t() {
  }
  return t.curveLength = function(r, e, i, n, a, s) {
    var o = r - 2 * i + a, h = e - 2 * n + s, u = 2 * i - 2 * r, l = 2 * n - 2 * e, f = 4 * (o * o + h * h), c = 4 * (o * u + h * l), d = u * u + l * l, p = 2 * Math.sqrt(f + c + d), v = Math.sqrt(f), _ = 2 * f * v, m = 2 * Math.sqrt(d), y = c / v;
    return (_ * p + v * c * (p - m) + (4 * d * f - c * c) * Math.log((2 * v + y + p) / (y + m))) / (4 * _);
  }, t.curveTo = function(r, e, i, n, a) {
    for (var s = a[a.length - 2], o = a[a.length - 1], h = Lr._segmentsCount(t.curveLength(s, o, r, e, i, n)), u = 0, l = 0, f = 1; f <= h; ++f) {
      var c = f / h;
      u = s + (r - s) * c, l = o + (e - o) * c, a.push(u + (r + (i - r) * c - u) * c, l + (e + (n - e) * c - l) * c);
    }
  }, t;
}(), Y0 = function() {
  function t() {
    this.reset();
  }
  return t.prototype.begin = function(r, e, i) {
    this.reset(), this.style = r, this.start = e, this.attribStart = i;
  }, t.prototype.end = function(r, e) {
    this.attribSize = e - this.attribStart, this.size = r - this.start;
  }, t.prototype.reset = function() {
    this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
  }, t;
}(), Ie, xn = (Ie = {}, Ie[It.POLY] = Ku, Ie[It.CIRC] = Oi, Ie[It.ELIP] = Oi, Ie[It.RECT] = V0, Ie[It.RREC] = j0, Ie), Uo = [], vi = [], Oo = function() {
  function t(r, e, i, n) {
    e === void 0 && (e = null), i === void 0 && (i = null), n === void 0 && (n = null), this.points = [], this.holes = [], this.shape = r, this.lineStyle = i, this.fillStyle = e, this.matrix = n, this.type = r.type;
  }
  return t.prototype.clone = function() {
    return new t(this.shape, this.fillStyle, this.lineStyle, this.matrix);
  }, t.prototype.destroy = function() {
    this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
  }, t;
}(), ze = new $(), Z0 = function(t) {
  Ga(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.closePointEps = 1e-4, e.boundsPadding = 0, e.uvsFloat32 = null, e.indicesUint16 = null, e.batchable = !1, e.points = [], e.colors = [], e.uvs = [], e.indices = [], e.textureIds = [], e.graphicsData = [], e.drawCalls = [], e.batchDirty = -1, e.batches = [], e.dirty = 0, e.cacheDirty = -1, e.clearDirty = 0, e.shapeIndex = 0, e._bounds = new Ai(), e.boundsDirty = -1, e;
  }
  return Object.defineProperty(r.prototype, "bounds", {
    get: function() {
      return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.invalidate = function() {
    this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
    for (var e = 0; e < this.drawCalls.length; e++)
      this.drawCalls[e].texArray.clear(), vi.push(this.drawCalls[e]);
    this.drawCalls.length = 0;
    for (var e = 0; e < this.batches.length; e++) {
      var i = this.batches[e];
      i.reset(), Uo.push(i);
    }
    this.batches.length = 0;
  }, r.prototype.clear = function() {
    return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
  }, r.prototype.drawShape = function(e, i, n, a) {
    i === void 0 && (i = null), n === void 0 && (n = null), a === void 0 && (a = null);
    var s = new Oo(e, i, n, a);
    return this.graphicsData.push(s), this.dirty++, this;
  }, r.prototype.drawHole = function(e, i) {
    if (i === void 0 && (i = null), !this.graphicsData.length)
      return null;
    var n = new Oo(e, null, null, i), a = this.graphicsData[this.graphicsData.length - 1];
    return n.lineStyle = a.lineStyle, a.holes.push(n), this.dirty++, this;
  }, r.prototype.destroy = function() {
    t.prototype.destroy.call(this);
    for (var e = 0; e < this.graphicsData.length; ++e)
      this.graphicsData[e].destroy();
    this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
  }, r.prototype.containsPoint = function(e) {
    for (var i = this.graphicsData, n = 0; n < i.length; ++n) {
      var a = i[n];
      if (!!a.fillStyle.visible && a.shape && (a.matrix ? a.matrix.applyInverse(e, ze) : ze.copyFrom(e), a.shape.contains(ze.x, ze.y))) {
        var s = !1;
        if (a.holes)
          for (var o = 0; o < a.holes.length; o++) {
            var h = a.holes[o];
            if (h.shape.contains(ze.x, ze.y)) {
              s = !0;
              break;
            }
          }
        if (!s)
          return !0;
      }
    }
    return !1;
  }, r.prototype.updateBatches = function() {
    if (!this.graphicsData.length) {
      this.batchable = !0;
      return;
    }
    if (!!this.validateBatching()) {
      this.cacheDirty = this.dirty;
      var e = this.uvs, i = this.graphicsData, n = null, a = null;
      this.batches.length > 0 && (n = this.batches[this.batches.length - 1], a = n.style);
      for (var s = this.shapeIndex; s < i.length; s++) {
        this.shapeIndex++;
        var o = i[s], h = o.fillStyle, u = o.lineStyle, l = xn[o.type];
        l.build(o), o.matrix && this.transformPoints(o.points, o.matrix), (h.visible || u.visible) && this.processHoles(o.holes);
        for (var f = 0; f < 2; f++) {
          var c = f === 0 ? h : u;
          if (!!c.visible) {
            var d = c.texture.baseTexture, p = this.indices.length, v = this.points.length / 2;
            d.wrapMode = Ft.REPEAT, f === 0 ? this.processFill(o) : this.processLine(o);
            var _ = this.points.length / 2 - v;
            _ !== 0 && (n && !this._compareStyles(a, c) && (n.end(p, v), n = null), n || (n = Uo.pop() || new Y0(), n.begin(c, p, v), this.batches.push(n), a = c), this.addUvs(this.points, e, c.texture, v, _, c.matrix));
          }
        }
      }
      var m = this.indices.length, y = this.points.length / 2;
      if (n && n.end(m, y), this.batches.length === 0) {
        this.batchable = !0;
        return;
      }
      var g = y > 65535;
      this.indicesUint16 && this.indices.length === this.indicesUint16.length && g === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = g ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
    }
  }, r.prototype._compareStyles = function(e, i) {
    return !(!e || !i || e.texture.baseTexture !== i.texture.baseTexture || e.color + e.alpha !== i.color + i.alpha || !!e.native != !!i.native);
  }, r.prototype.validateBatching = function() {
    if (this.dirty === this.cacheDirty || !this.graphicsData.length)
      return !1;
    for (var e = 0, i = this.graphicsData.length; e < i; e++) {
      var n = this.graphicsData[e], a = n.fillStyle, s = n.lineStyle;
      if (a && !a.texture.baseTexture.valid || s && !s.texture.baseTexture.valid)
        return !1;
    }
    return !0;
  }, r.prototype.packBatches = function() {
    this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
    for (var e = this.batches, i = 0, n = e.length; i < n; i++)
      for (var a = e[i], s = 0; s < a.size; s++) {
        var o = a.start + s;
        this.indicesUint16[o] = this.indicesUint16[o] - a.attribStart;
      }
  }, r.prototype.isBatchable = function() {
    if (this.points.length > 65535 * 2)
      return !1;
    for (var e = this.batches, i = 0; i < e.length; i++)
      if (e[i].style.native)
        return !1;
    return this.points.length < r.BATCHABLE_SIZE * 2;
  }, r.prototype.buildDrawCalls = function() {
    for (var e = ++et._globalBatch, i = 0; i < this.drawCalls.length; i++)
      this.drawCalls[i].texArray.clear(), vi.push(this.drawCalls[i]);
    this.drawCalls.length = 0;
    var n = this.colors, a = this.textureIds, s = vi.pop();
    s || (s = new Kn(), s.texArray = new Qn()), s.texArray.count = 0, s.start = 0, s.size = 0, s.type = Ot.TRIANGLES;
    var o = 0, h = null, u = 0, l = !1, f = Ot.TRIANGLES, c = 0;
    this.drawCalls.push(s);
    for (var i = 0; i < this.batches.length; i++) {
      var d = this.batches[i], p = 8, v = d.style, _ = v.texture.baseTexture;
      l !== !!v.native && (l = !!v.native, f = l ? Ot.LINES : Ot.TRIANGLES, h = null, o = p, e++), h !== _ && (h = _, _._batchEnabled !== e && (o === p && (e++, o = 0, s.size > 0 && (s = vi.pop(), s || (s = new Kn(), s.texArray = new Qn()), this.drawCalls.push(s)), s.start = c, s.size = 0, s.texArray.count = 0, s.type = f), _.touched = 1, _._batchEnabled = e, _._batchLocation = o, _.wrapMode = Ft.REPEAT, s.texArray.elements[s.texArray.count++] = _, o++)), s.size += d.size, c += d.size, u = _._batchLocation, this.addColors(n, v.color, v.alpha, d.attribSize, d.attribStart), this.addTextureIds(a, u, d.attribSize, d.attribStart);
    }
    et._globalBatch = e, this.packAttributes();
  }, r.prototype.packAttributes = function() {
    for (var e = this.points, i = this.uvs, n = this.colors, a = this.textureIds, s = new ArrayBuffer(e.length * 3 * 4), o = new Float32Array(s), h = new Uint32Array(s), u = 0, l = 0; l < e.length / 2; l++)
      o[u++] = e[l * 2], o[u++] = e[l * 2 + 1], o[u++] = i[l * 2], o[u++] = i[l * 2 + 1], h[u++] = n[l], o[u++] = a[l];
    this._buffer.update(s), this._indexBuffer.update(this.indicesUint16);
  }, r.prototype.processFill = function(e) {
    if (e.holes.length)
      Ku.triangulate(e, this);
    else {
      var i = xn[e.type];
      i.triangulate(e, this);
    }
  }, r.prototype.processLine = function(e) {
    Ao(e, this);
    for (var i = 0; i < e.holes.length; i++)
      Ao(e.holes[i], this);
  }, r.prototype.processHoles = function(e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i], a = xn[n.type];
      a.build(n), n.matrix && this.transformPoints(n.points, n.matrix);
    }
  }, r.prototype.calculateBounds = function() {
    var e = this._bounds;
    e.clear(), e.addVertexData(this.points, 0, this.points.length), e.pad(this.boundsPadding, this.boundsPadding);
  }, r.prototype.transformPoints = function(e, i) {
    for (var n = 0; n < e.length / 2; n++) {
      var a = e[n * 2], s = e[n * 2 + 1];
      e[n * 2] = i.a * a + i.c * s + i.tx, e[n * 2 + 1] = i.b * a + i.d * s + i.ty;
    }
  }, r.prototype.addColors = function(e, i, n, a, s) {
    s === void 0 && (s = 0);
    var o = (i >> 16) + (i & 65280) + ((i & 255) << 16), h = Dr(o, n);
    e.length = Math.max(e.length, s + a);
    for (var u = 0; u < a; u++)
      e[s + u] = h;
  }, r.prototype.addTextureIds = function(e, i, n, a) {
    a === void 0 && (a = 0), e.length = Math.max(e.length, a + n);
    for (var s = 0; s < n; s++)
      e[a + s] = i;
  }, r.prototype.addUvs = function(e, i, n, a, s, o) {
    o === void 0 && (o = null);
    for (var h = 0, u = i.length, l = n.frame; h < s; ) {
      var f = e[(a + h) * 2], c = e[(a + h) * 2 + 1];
      if (o) {
        var d = o.a * f + o.c * c + o.tx;
        c = o.b * f + o.d * c + o.ty, f = d;
      }
      h++, i.push(f / l.width, c / l.height);
    }
    var p = n.baseTexture;
    (l.width < p.width || l.height < p.height) && this.adjustUvs(i, n, u, s);
  }, r.prototype.adjustUvs = function(e, i, n, a) {
    for (var s = i.baseTexture, o = 1e-6, h = n + a * 2, u = i.frame, l = u.width / s.width, f = u.height / s.height, c = u.x / u.width, d = u.y / u.height, p = Math.floor(e[n] + o), v = Math.floor(e[n + 1] + o), _ = n + 2; _ < h; _ += 2)
      p = Math.min(p, Math.floor(e[_] + o)), v = Math.min(v, Math.floor(e[_ + 1] + o));
    c -= p, d -= v;
    for (var _ = n; _ < h; _ += 2)
      e[_] = (e[_] + c) * l, e[_ + 1] = (e[_ + 1] + d) * f;
  }, r.BATCHABLE_SIZE = 100, r;
}(zu), J0 = function(t) {
  Ga(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.width = 0, e.alignment = 0.5, e.native = !1, e.cap = ye.BUTT, e.join = me.MITER, e.miterLimit = 10, e;
  }
  return r.prototype.clone = function() {
    var e = new r();
    return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e.width = this.width, e.alignment = this.alignment, e.native = this.native, e.cap = this.cap, e.join = this.join, e.miterLimit = this.miterLimit, e;
  }, r.prototype.reset = function() {
    t.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
  }, r;
}(Ju), K0 = new Float32Array(3), gn = {}, Fi = function(t) {
  Ga(r, t);
  function r(e) {
    e === void 0 && (e = null);
    var i = t.call(this) || this;
    return i.shader = null, i.pluginName = "batch", i.currentPath = null, i.batches = [], i.batchTint = -1, i.batchDirty = -1, i.vertexData = null, i._fillStyle = new Ju(), i._lineStyle = new J0(), i._matrix = null, i._holeMode = !1, i.state = De.for2d(), i._geometry = e || new Z0(), i._geometry.refCount++, i._transformID = -1, i.tint = 16777215, i.blendMode = D.NORMAL, i;
  }
  return Object.defineProperty(r.prototype, "geometry", {
    get: function() {
      return this._geometry;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.clone = function() {
    return this.finishPoly(), new r(this._geometry);
  }, Object.defineProperty(r.prototype, "blendMode", {
    get: function() {
      return this.state.blendMode;
    },
    set: function(e) {
      this.state.blendMode = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return this._tint;
    },
    set: function(e) {
      this._tint = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "fill", {
    get: function() {
      return this._fillStyle;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "line", {
    get: function() {
      return this._lineStyle;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.lineStyle = function(e, i, n, a, s) {
    return e === void 0 && (e = null), i === void 0 && (i = 0), n === void 0 && (n = 1), a === void 0 && (a = 0.5), s === void 0 && (s = !1), typeof e == "number" && (e = { width: e, color: i, alpha: n, alignment: a, native: s }), this.lineTextureStyle(e);
  }, r.prototype.lineTextureStyle = function(e) {
    e = Object.assign({
      width: 0,
      texture: z.WHITE,
      color: e && e.texture ? 16777215 : 0,
      alpha: 1,
      matrix: null,
      alignment: 0.5,
      native: !1,
      cap: ye.BUTT,
      join: me.MITER,
      miterLimit: 10
    }, e), this.currentPath && this.startPoly();
    var i = e.width > 0 && e.alpha > 0;
    return i ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._lineStyle, { visible: i }, e)) : this._lineStyle.reset(), this;
  }, r.prototype.startPoly = function() {
    if (this.currentPath) {
      var e = this.currentPath.points, i = this.currentPath.points.length;
      i > 2 && (this.drawShape(this.currentPath), this.currentPath = new Ti(), this.currentPath.closeStroke = !1, this.currentPath.points.push(e[i - 2], e[i - 1]));
    } else
      this.currentPath = new Ti(), this.currentPath.closeStroke = !1;
  }, r.prototype.finishPoly = function() {
    this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
  }, r.prototype.moveTo = function(e, i) {
    return this.startPoly(), this.currentPath.points[0] = e, this.currentPath.points[1] = i, this;
  }, r.prototype.lineTo = function(e, i) {
    this.currentPath || this.moveTo(0, 0);
    var n = this.currentPath.points, a = n[n.length - 2], s = n[n.length - 1];
    return (a !== e || s !== i) && n.push(e, i), this;
  }, r.prototype._initCurve = function(e, i) {
    e === void 0 && (e = 0), i === void 0 && (i = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [e, i]) : this.moveTo(e, i);
  }, r.prototype.quadraticCurveTo = function(e, i, n, a) {
    this._initCurve();
    var s = this.currentPath.points;
    return s.length === 0 && this.moveTo(0, 0), q0.curveTo(e, i, n, a, s), this;
  }, r.prototype.bezierCurveTo = function(e, i, n, a, s, o) {
    return this._initCurve(), $0.curveTo(e, i, n, a, s, o, this.currentPath.points), this;
  }, r.prototype.arcTo = function(e, i, n, a, s) {
    this._initCurve(e, i);
    var o = this.currentPath.points, h = Po.curveTo(e, i, n, a, s, o);
    if (h) {
      var u = h.cx, l = h.cy, f = h.radius, c = h.startAngle, d = h.endAngle, p = h.anticlockwise;
      this.arc(u, l, f, c, d, p);
    }
    return this;
  }, r.prototype.arc = function(e, i, n, a, s, o) {
    if (o === void 0 && (o = !1), a === s)
      return this;
    !o && s <= a ? s += Ni : o && a <= s && (a += Ni);
    var h = s - a;
    if (h === 0)
      return this;
    var u = e + Math.cos(a) * n, l = i + Math.sin(a) * n, f = this._geometry.closePointEps, c = this.currentPath ? this.currentPath.points : null;
    if (c) {
      var d = Math.abs(c[c.length - 2] - u), p = Math.abs(c[c.length - 1] - l);
      d < f && p < f || c.push(u, l);
    } else
      this.moveTo(u, l), c = this.currentPath.points;
    return Po.arc(u, l, e, i, n, a, s, o, c), this;
  }, r.prototype.beginFill = function(e, i) {
    return e === void 0 && (e = 0), i === void 0 && (i = 1), this.beginTextureFill({ texture: z.WHITE, color: e, alpha: i });
  }, r.prototype.beginTextureFill = function(e) {
    e = Object.assign({
      texture: z.WHITE,
      color: 16777215,
      alpha: 1,
      matrix: null
    }, e), this.currentPath && this.startPoly();
    var i = e.alpha > 0;
    return i ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._fillStyle, { visible: i }, e)) : this._fillStyle.reset(), this;
  }, r.prototype.endFill = function() {
    return this.finishPoly(), this._fillStyle.reset(), this;
  }, r.prototype.drawRect = function(e, i, n, a) {
    return this.drawShape(new K(e, i, n, a));
  }, r.prototype.drawRoundedRect = function(e, i, n, a, s) {
    return this.drawShape(new hp(e, i, n, a, s));
  }, r.prototype.drawCircle = function(e, i, n) {
    return this.drawShape(new sp(e, i, n));
  }, r.prototype.drawEllipse = function(e, i, n, a) {
    return this.drawShape(new op(e, i, n, a));
  }, r.prototype.drawPolygon = function() {
    for (var e = arguments, i = [], n = 0; n < arguments.length; n++)
      i[n] = e[n];
    var a, s = !0, o = i[0];
    o.points ? (s = o.closeStroke, a = o.points) : Array.isArray(i[0]) ? a = i[0] : a = i;
    var h = new Ti(a);
    return h.closeStroke = s, this.drawShape(h), this;
  }, r.prototype.drawShape = function(e) {
    return this._holeMode ? this._geometry.drawHole(e, this._matrix) : this._geometry.drawShape(e, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
  }, r.prototype.clear = function() {
    return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
  }, r.prototype.isFastRect = function() {
    var e = this._geometry.graphicsData;
    return e.length === 1 && e[0].shape.type === It.RECT && !e[0].matrix && !e[0].holes.length && !(e[0].lineStyle.visible && e[0].lineStyle.width);
  }, r.prototype._render = function(e) {
    this.finishPoly();
    var i = this._geometry;
    i.updateBatches(), i.batchable ? (this.batchDirty !== i.batchDirty && this._populateBatches(), this._renderBatched(e)) : (e.batch.flush(), this._renderDirect(e));
  }, r.prototype._populateBatches = function() {
    var e = this._geometry, i = this.blendMode, n = e.batches.length;
    this.batchTint = -1, this._transformID = -1, this.batchDirty = e.batchDirty, this.batches.length = n, this.vertexData = new Float32Array(e.points);
    for (var a = 0; a < n; a++) {
      var s = e.batches[a], o = s.style.color, h = new Float32Array(this.vertexData.buffer, s.attribStart * 4 * 2, s.attribSize * 2), u = new Float32Array(e.uvsFloat32.buffer, s.attribStart * 4 * 2, s.attribSize * 2), l = new Uint16Array(e.indicesUint16.buffer, s.start * 2, s.size), f = {
        vertexData: h,
        blendMode: i,
        indices: l,
        uvs: u,
        _batchRGB: nr(o),
        _tintRGB: o,
        _texture: s.style.texture,
        alpha: s.style.alpha,
        worldAlpha: 1
      };
      this.batches[a] = f;
    }
  }, r.prototype._renderBatched = function(e) {
    if (!!this.batches.length) {
      e.batch.setObjectRenderer(e.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
      for (var i = 0, n = this.batches.length; i < n; i++) {
        var a = this.batches[i];
        a.worldAlpha = this.worldAlpha * a.alpha, e.plugins[this.pluginName].render(a);
      }
    }
  }, r.prototype._renderDirect = function(e) {
    var i = this._resolveDirectShader(e), n = this._geometry, a = this.tint, s = this.worldAlpha, o = i.uniforms, h = n.drawCalls;
    o.translationMatrix = this.transform.worldTransform, o.tint[0] = (a >> 16 & 255) / 255 * s, o.tint[1] = (a >> 8 & 255) / 255 * s, o.tint[2] = (a & 255) / 255 * s, o.tint[3] = s, e.shader.bind(i), e.geometry.bind(n, i), e.state.set(this.state);
    for (var u = 0, l = h.length; u < l; u++)
      this._renderDrawCallDirect(e, n.drawCalls[u]);
  }, r.prototype._renderDrawCallDirect = function(e, i) {
    for (var n = i.texArray, a = i.type, s = i.size, o = i.start, h = n.count, u = 0; u < h; u++)
      e.texture.bind(n.elements[u], u);
    e.geometry.draw(a, s, o);
  }, r.prototype._resolveDirectShader = function(e) {
    var i = this.shader, n = this.pluginName;
    if (!i) {
      if (!gn[n]) {
        for (var a = e.plugins[n].MAX_TEXTURES, s = new Int32Array(a), o = 0; o < a; o++)
          s[o] = o;
        var h = {
          tint: new Float32Array([1, 1, 1, 1]),
          translationMatrix: new ft(),
          default: Ue.from({ uSamplers: s }, !0)
        }, u = e.plugins[n]._shader.program;
        gn[n] = new Qt(u, h);
      }
      i = gn[n];
    }
    return i;
  }, r.prototype._calculateBounds = function() {
    this.finishPoly();
    var e = this._geometry;
    if (!!e.graphicsData.length) {
      var i = e.bounds, n = i.minX, a = i.minY, s = i.maxX, o = i.maxY;
      this._bounds.addFrame(this.transform, n, a, s, o);
    }
  }, r.prototype.containsPoint = function(e) {
    return this.worldTransform.applyInverse(e, r._TEMP_POINT), this._geometry.containsPoint(r._TEMP_POINT);
  }, r.prototype.calculateTints = function() {
    if (this.batchTint !== this.tint) {
      this.batchTint = this.tint;
      for (var e = nr(this.tint, K0), i = 0; i < this.batches.length; i++) {
        var n = this.batches[i], a = n._batchRGB, s = e[0] * a[0] * 255, o = e[1] * a[1] * 255, h = e[2] * a[2] * 255, u = (s << 16) + (o << 8) + (h | 0);
        n._tintRGB = (u >> 16) + (u & 65280) + ((u & 255) << 16);
      }
    }
  }, r.prototype.calculateVertices = function() {
    var e = this.transform._worldID;
    if (this._transformID !== e) {
      this._transformID = e;
      for (var i = this.transform.worldTransform, n = i.a, a = i.b, s = i.c, o = i.d, h = i.tx, u = i.ty, l = this._geometry.points, f = this.vertexData, c = 0, d = 0; d < l.length; d += 2) {
        var p = l[d], v = l[d + 1];
        f[c++] = n * p + s * v + h, f[c++] = o * v + a * p + u;
      }
    }
  }, r.prototype.closePath = function() {
    var e = this.currentPath;
    return e && (e.closeStroke = !0, this.finishPoly()), this;
  }, r.prototype.setMatrix = function(e) {
    return this._matrix = e, this;
  }, r.prototype.beginHole = function() {
    return this.finishPoly(), this._holeMode = !0, this;
  }, r.prototype.endHole = function() {
    return this.finishPoly(), this._holeMode = !1, this;
  }, r.prototype.destroy = function(e) {
    this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, t.prototype.destroy.call(this, e);
  }, r.nextRoundedRectBehavior = !1, r._TEMP_POINT = new $(), r;
}(gt);
/*!
 * @pixi/sprite - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/sprite is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ha = function(t, r) {
  return ha = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ha(t, r);
};
function Q0(t, r) {
  ha(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var pr = new $(), t_ = new Uint16Array([0, 1, 2, 0, 2, 3]), Vt = function(t) {
  Q0(r, t);
  function r(e) {
    var i = t.call(this) || this;
    return i._anchor = new _e(i._onAnchorUpdate, i, e ? e.defaultAnchor.x : 0, e ? e.defaultAnchor.y : 0), i._texture = null, i._width = 0, i._height = 0, i._tint = null, i._tintRGB = null, i.tint = 16777215, i.blendMode = D.NORMAL, i._cachedTint = 16777215, i.uvs = null, i.texture = e || z.EMPTY, i.vertexData = new Float32Array(8), i.vertexTrimmedData = null, i._transformID = -1, i._textureID = -1, i._transformTrimmedID = -1, i._textureTrimmedID = -1, i.indices = t_, i.pluginName = "batch", i.isSprite = !0, i._roundPixels = O.ROUND_PIXELS, i;
  }
  return r.prototype._onTextureUpdate = function() {
    this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = Ze(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = Ze(this.scale.y) * this._height / this._texture.orig.height);
  }, r.prototype._onAnchorUpdate = function() {
    this._transformID = -1, this._transformTrimmedID = -1;
  }, r.prototype.calculateVertices = function() {
    var e = this._texture;
    if (!(this._transformID === this.transform._worldID && this._textureID === e._updateID)) {
      this._textureID !== e._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = e._updateID;
      var i = this.transform.worldTransform, n = i.a, a = i.b, s = i.c, o = i.d, h = i.tx, u = i.ty, l = this.vertexData, f = e.trim, c = e.orig, d = this._anchor, p = 0, v = 0, _ = 0, m = 0;
      if (f ? (v = f.x - d._x * c.width, p = v + f.width, m = f.y - d._y * c.height, _ = m + f.height) : (v = -d._x * c.width, p = v + c.width, m = -d._y * c.height, _ = m + c.height), l[0] = n * v + s * m + h, l[1] = o * m + a * v + u, l[2] = n * p + s * m + h, l[3] = o * m + a * p + u, l[4] = n * p + s * _ + h, l[5] = o * _ + a * p + u, l[6] = n * v + s * _ + h, l[7] = o * _ + a * v + u, this._roundPixels)
        for (var y = O.RESOLUTION, g = 0; g < l.length; ++g)
          l[g] = Math.round((l[g] * y | 0) / y);
    }
  }, r.prototype.calculateTrimmedVertices = function() {
    if (!this.vertexTrimmedData)
      this.vertexTrimmedData = new Float32Array(8);
    else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
      return;
    this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
    var e = this._texture, i = this.vertexTrimmedData, n = e.orig, a = this._anchor, s = this.transform.worldTransform, o = s.a, h = s.b, u = s.c, l = s.d, f = s.tx, c = s.ty, d = -a._x * n.width, p = d + n.width, v = -a._y * n.height, _ = v + n.height;
    i[0] = o * d + u * v + f, i[1] = l * v + h * d + c, i[2] = o * p + u * v + f, i[3] = l * v + h * p + c, i[4] = o * p + u * _ + f, i[5] = l * _ + h * p + c, i[6] = o * d + u * _ + f, i[7] = l * _ + h * d + c;
  }, r.prototype._render = function(e) {
    this.calculateVertices(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this);
  }, r.prototype._calculateBounds = function() {
    var e = this._texture.trim, i = this._texture.orig;
    !e || e.width === i.width && e.height === i.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
  }, r.prototype.getLocalBounds = function(e) {
    return this.children.length === 0 ? (this._localBounds || (this._localBounds = new Ai()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new K()), e = this._localBoundsRect), this._localBounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e);
  }, r.prototype.containsPoint = function(e) {
    this.worldTransform.applyInverse(e, pr);
    var i = this._texture.orig.width, n = this._texture.orig.height, a = -i * this.anchor.x, s = 0;
    return pr.x >= a && pr.x < a + i && (s = -n * this.anchor.y, pr.y >= s && pr.y < s + n);
  }, r.prototype.destroy = function(e) {
    t.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null;
    var i = typeof e == "boolean" ? e : e && e.texture;
    if (i) {
      var n = typeof e == "boolean" ? e : e && e.baseTexture;
      this._texture.destroy(!!n);
    }
    this._texture = null;
  }, r.from = function(e, i) {
    var n = e instanceof z ? e : z.from(e, i);
    return new r(n);
  }, Object.defineProperty(r.prototype, "roundPixels", {
    get: function() {
      return this._roundPixels;
    },
    set: function(e) {
      this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "width", {
    get: function() {
      return Math.abs(this.scale.x) * this._texture.orig.width;
    },
    set: function(e) {
      var i = Ze(this.scale.x) || 1;
      this.scale.x = i * e / this._texture.orig.width, this._width = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return Math.abs(this.scale.y) * this._texture.orig.height;
    },
    set: function(e) {
      var i = Ze(this.scale.y) || 1;
      this.scale.y = i * e / this._texture.orig.height, this._height = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "anchor", {
    get: function() {
      return this._anchor;
    },
    set: function(e) {
      this._anchor.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return this._tint;
    },
    set: function(e) {
      this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "texture", {
    get: function() {
      return this._texture;
    },
    set: function(e) {
      this._texture !== e && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = e || z.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, e && (e.baseTexture.valid ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)));
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(gt);
/*!
 * @pixi/text - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/text is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ua = function(t, r) {
  return ua = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ua(t, r);
};
function e_(t, r) {
  ua(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Sr;
(function(t) {
  t[t.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", t[t.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
})(Sr || (Sr = {}));
var bn = {
  align: "left",
  breakWords: !1,
  dropShadow: !1,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fillGradientType: Sr.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: "miter",
  miterLimit: 10,
  padding: 0,
  stroke: "black",
  strokeThickness: 0,
  textBaseline: "alphabetic",
  trim: !1,
  whiteSpace: "pre",
  wordWrap: !1,
  wordWrapWidth: 100,
  leading: 0
}, r_ = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
], ar = function() {
  function t(r) {
    this.styleID = 0, this.reset(), In(this, r, r);
  }
  return t.prototype.clone = function() {
    var r = {};
    return In(r, this, bn), new t(r);
  }, t.prototype.reset = function() {
    In(this, bn, bn);
  }, Object.defineProperty(t.prototype, "align", {
    get: function() {
      return this._align;
    },
    set: function(r) {
      this._align !== r && (this._align = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "breakWords", {
    get: function() {
      return this._breakWords;
    },
    set: function(r) {
      this._breakWords !== r && (this._breakWords = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadow", {
    get: function() {
      return this._dropShadow;
    },
    set: function(r) {
      this._dropShadow !== r && (this._dropShadow = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadowAlpha", {
    get: function() {
      return this._dropShadowAlpha;
    },
    set: function(r) {
      this._dropShadowAlpha !== r && (this._dropShadowAlpha = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadowAngle", {
    get: function() {
      return this._dropShadowAngle;
    },
    set: function(r) {
      this._dropShadowAngle !== r && (this._dropShadowAngle = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadowBlur", {
    get: function() {
      return this._dropShadowBlur;
    },
    set: function(r) {
      this._dropShadowBlur !== r && (this._dropShadowBlur = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadowColor", {
    get: function() {
      return this._dropShadowColor;
    },
    set: function(r) {
      var e = Tn(r);
      this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "dropShadowDistance", {
    get: function() {
      return this._dropShadowDistance;
    },
    set: function(r) {
      this._dropShadowDistance !== r && (this._dropShadowDistance = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fill", {
    get: function() {
      return this._fill;
    },
    set: function(r) {
      var e = Tn(r);
      this._fill !== e && (this._fill = e, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fillGradientType", {
    get: function() {
      return this._fillGradientType;
    },
    set: function(r) {
      this._fillGradientType !== r && (this._fillGradientType = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fillGradientStops", {
    get: function() {
      return this._fillGradientStops;
    },
    set: function(r) {
      i_(this._fillGradientStops, r) || (this._fillGradientStops = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontFamily", {
    get: function() {
      return this._fontFamily;
    },
    set: function(r) {
      this.fontFamily !== r && (this._fontFamily = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontSize", {
    get: function() {
      return this._fontSize;
    },
    set: function(r) {
      this._fontSize !== r && (this._fontSize = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontStyle", {
    get: function() {
      return this._fontStyle;
    },
    set: function(r) {
      this._fontStyle !== r && (this._fontStyle = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontVariant", {
    get: function() {
      return this._fontVariant;
    },
    set: function(r) {
      this._fontVariant !== r && (this._fontVariant = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontWeight", {
    get: function() {
      return this._fontWeight;
    },
    set: function(r) {
      this._fontWeight !== r && (this._fontWeight = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "letterSpacing", {
    get: function() {
      return this._letterSpacing;
    },
    set: function(r) {
      this._letterSpacing !== r && (this._letterSpacing = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "lineHeight", {
    get: function() {
      return this._lineHeight;
    },
    set: function(r) {
      this._lineHeight !== r && (this._lineHeight = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "leading", {
    get: function() {
      return this._leading;
    },
    set: function(r) {
      this._leading !== r && (this._leading = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "lineJoin", {
    get: function() {
      return this._lineJoin;
    },
    set: function(r) {
      this._lineJoin !== r && (this._lineJoin = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "miterLimit", {
    get: function() {
      return this._miterLimit;
    },
    set: function(r) {
      this._miterLimit !== r && (this._miterLimit = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "padding", {
    get: function() {
      return this._padding;
    },
    set: function(r) {
      this._padding !== r && (this._padding = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "stroke", {
    get: function() {
      return this._stroke;
    },
    set: function(r) {
      var e = Tn(r);
      this._stroke !== e && (this._stroke = e, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "strokeThickness", {
    get: function() {
      return this._strokeThickness;
    },
    set: function(r) {
      this._strokeThickness !== r && (this._strokeThickness = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "textBaseline", {
    get: function() {
      return this._textBaseline;
    },
    set: function(r) {
      this._textBaseline !== r && (this._textBaseline = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "trim", {
    get: function() {
      return this._trim;
    },
    set: function(r) {
      this._trim !== r && (this._trim = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "whiteSpace", {
    get: function() {
      return this._whiteSpace;
    },
    set: function(r) {
      this._whiteSpace !== r && (this._whiteSpace = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "wordWrap", {
    get: function() {
      return this._wordWrap;
    },
    set: function(r) {
      this._wordWrap !== r && (this._wordWrap = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "wordWrapWidth", {
    get: function() {
      return this._wordWrapWidth;
    },
    set: function(r) {
      this._wordWrapWidth !== r && (this._wordWrapWidth = r, this.styleID++);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.toFontString = function() {
    var r = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, e = this.fontFamily;
    Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
    for (var i = e.length - 1; i >= 0; i--) {
      var n = e[i].trim();
      !/([\"\'])[^\'\"]+\1/.test(n) && r_.indexOf(n) < 0 && (n = '"' + n + '"'), e[i] = n;
    }
    return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + r + " " + e.join(",");
  }, t;
}();
function Fo(t) {
  return typeof t == "number" ? Cu(t) : (typeof t == "string" && t.indexOf("0x") === 0 && (t = t.replace("0x", "#")), t);
}
function Tn(t) {
  if (Array.isArray(t)) {
    for (var r = 0; r < t.length; ++r)
      t[r] = Fo(t[r]);
    return t;
  } else
    return Fo(t);
}
function i_(t, r) {
  if (!Array.isArray(t) || !Array.isArray(r) || t.length !== r.length)
    return !1;
  for (var e = 0; e < t.length; ++e)
    if (t[e] !== r[e])
      return !1;
  return !0;
}
function In(t, r, e) {
  for (var i in e)
    Array.isArray(r[i]) ? t[i] = r[i].slice() : t[i] = r[i];
}
var ee = function() {
  function t(r, e, i, n, a, s, o, h, u) {
    this.text = r, this.style = e, this.width = i, this.height = n, this.lines = a, this.lineWidths = s, this.lineHeight = o, this.maxLineWidth = h, this.fontProperties = u;
  }
  return t.measureText = function(r, e, i, n) {
    n === void 0 && (n = t._canvas), i = i == null ? e.wordWrap : i;
    var a = e.toFontString(), s = t.measureFont(a);
    s.fontSize === 0 && (s.fontSize = e.fontSize, s.ascent = e.fontSize);
    var o = n.getContext("2d");
    o.font = a;
    for (var h = i ? t.wordWrap(r, e, n) : r, u = h.split(/(?:\r\n|\r|\n)/), l = new Array(u.length), f = 0, c = 0; c < u.length; c++) {
      var d = o.measureText(u[c]).width + (u[c].length - 1) * e.letterSpacing;
      l[c] = d, f = Math.max(f, d);
    }
    var p = f + e.strokeThickness;
    e.dropShadow && (p += e.dropShadowDistance);
    var v = e.lineHeight || s.fontSize + e.strokeThickness, _ = Math.max(v, s.fontSize + e.strokeThickness) + (u.length - 1) * (v + e.leading);
    return e.dropShadow && (_ += e.dropShadowDistance), new t(r, e, p, _, u, l, v + e.leading, f, s);
  }, t.wordWrap = function(r, e, i) {
    i === void 0 && (i = t._canvas);
    for (var n = i.getContext("2d"), a = 0, s = "", o = "", h = /* @__PURE__ */ Object.create(null), u = e.letterSpacing, l = e.whiteSpace, f = t.collapseSpaces(l), c = t.collapseNewlines(l), d = !f, p = e.wordWrapWidth + u, v = t.tokenize(r), _ = 0; _ < v.length; _++) {
      var m = v[_];
      if (t.isNewline(m)) {
        if (!c) {
          o += t.addLine(s), d = !f, s = "", a = 0;
          continue;
        }
        m = " ";
      }
      if (f) {
        var y = t.isBreakingSpace(m), g = t.isBreakingSpace(s[s.length - 1]);
        if (y && g)
          continue;
      }
      var T = t.getFromCache(m, u, h, n);
      if (T > p)
        if (s !== "" && (o += t.addLine(s), s = "", a = 0), t.canBreakWords(m, e.breakWords))
          for (var b = t.wordWrapSplit(m), x = 0; x < b.length; x++) {
            for (var E = b[x], C = 1; b[x + C]; ) {
              var w = b[x + C], R = E[E.length - 1];
              if (!t.canBreakChars(R, w, m, x, e.breakWords))
                E += w;
              else
                break;
              C++;
            }
            x += E.length - 1;
            var F = t.getFromCache(E, u, h, n);
            F + a > p && (o += t.addLine(s), d = !1, s = "", a = 0), s += E, a += F;
          }
        else {
          s.length > 0 && (o += t.addLine(s), s = "", a = 0);
          var M = _ === v.length - 1;
          o += t.addLine(m, !M), d = !1, s = "", a = 0;
        }
      else
        T + a > p && (d = !1, o += t.addLine(s), s = "", a = 0), (s.length > 0 || !t.isBreakingSpace(m) || d) && (s += m, a += T);
    }
    return o += t.addLine(s, !1), o;
  }, t.addLine = function(r, e) {
    return e === void 0 && (e = !0), r = t.trimRight(r), r = e ? r + `
` : r, r;
  }, t.getFromCache = function(r, e, i, n) {
    var a = i[r];
    if (typeof a != "number") {
      var s = r.length * e;
      a = n.measureText(r).width + s, i[r] = a;
    }
    return a;
  }, t.collapseSpaces = function(r) {
    return r === "normal" || r === "pre-line";
  }, t.collapseNewlines = function(r) {
    return r === "normal";
  }, t.trimRight = function(r) {
    if (typeof r != "string")
      return "";
    for (var e = r.length - 1; e >= 0; e--) {
      var i = r[e];
      if (!t.isBreakingSpace(i))
        break;
      r = r.slice(0, -1);
    }
    return r;
  }, t.isNewline = function(r) {
    return typeof r != "string" ? !1 : t._newlines.indexOf(r.charCodeAt(0)) >= 0;
  }, t.isBreakingSpace = function(r, e) {
    return typeof r != "string" ? !1 : t._breakingSpaces.indexOf(r.charCodeAt(0)) >= 0;
  }, t.tokenize = function(r) {
    var e = [], i = "";
    if (typeof r != "string")
      return e;
    for (var n = 0; n < r.length; n++) {
      var a = r[n], s = r[n + 1];
      if (t.isBreakingSpace(a, s) || t.isNewline(a)) {
        i !== "" && (e.push(i), i = ""), e.push(a);
        continue;
      }
      i += a;
    }
    return i !== "" && e.push(i), e;
  }, t.canBreakWords = function(r, e) {
    return e;
  }, t.canBreakChars = function(r, e, i, n, a) {
    return !0;
  }, t.wordWrapSplit = function(r) {
    return r.split("");
  }, t.measureFont = function(r) {
    if (t._fonts[r])
      return t._fonts[r];
    var e = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    }, i = t._canvas, n = t._context;
    n.font = r;
    var a = t.METRICS_STRING + t.BASELINE_SYMBOL, s = Math.ceil(n.measureText(a).width), o = Math.ceil(n.measureText(t.BASELINE_SYMBOL).width), h = Math.ceil(t.HEIGHT_MULTIPLIER * o);
    o = o * t.BASELINE_MULTIPLIER | 0, i.width = s, i.height = h, n.fillStyle = "#f00", n.fillRect(0, 0, s, h), n.font = r, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText(a, 0, o);
    var u = n.getImageData(0, 0, s, h).data, l = u.length, f = s * 4, c = 0, d = 0, p = !1;
    for (c = 0; c < o; ++c) {
      for (var v = 0; v < f; v += 4)
        if (u[d + v] !== 255) {
          p = !0;
          break;
        }
      if (!p)
        d += f;
      else
        break;
    }
    for (e.ascent = o - c, d = l - f, p = !1, c = h; c > o; --c) {
      for (var v = 0; v < f; v += 4)
        if (u[d + v] !== 255) {
          p = !0;
          break;
        }
      if (!p)
        d -= f;
      else
        break;
    }
    return e.descent = c - o, e.fontSize = e.ascent + e.descent, t._fonts[r] = e, e;
  }, t.clearMetrics = function(r) {
    r === void 0 && (r = ""), r ? delete t._fonts[r] : t._fonts = {};
  }, Object.defineProperty(t, "_canvas", {
    get: function() {
      if (!t.__canvas) {
        var r = void 0;
        try {
          var e = new OffscreenCanvas(0, 0), i = e.getContext("2d");
          if (i && i.measureText)
            return t.__canvas = e, e;
          r = O.ADAPTER.createCanvas();
        } catch {
          r = O.ADAPTER.createCanvas();
        }
        r.width = r.height = 10, t.__canvas = r;
      }
      return t.__canvas;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "_context", {
    get: function() {
      return t.__context || (t.__context = t._canvas.getContext("2d")), t.__context;
    },
    enumerable: !1,
    configurable: !0
  }), t;
}();
ee._fonts = {};
ee.METRICS_STRING = "|\xC9q\xC5";
ee.BASELINE_SYMBOL = "M";
ee.BASELINE_MULTIPLIER = 1.4;
ee.HEIGHT_MULTIPLIER = 2;
ee._newlines = [
  10,
  13
];
ee._breakingSpaces = [
  9,
  32,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8200,
  8201,
  8202,
  8287,
  12288
];
var n_ = {
  texture: !0,
  children: !1,
  baseTexture: !0
}, jr = function(t) {
  e_(r, t);
  function r(e, i, n) {
    var a = this, s = !1;
    n || (n = O.ADAPTER.createCanvas(), s = !0), n.width = 3, n.height = 3;
    var o = z.from(n);
    return o.orig = new K(), o.trim = new K(), a = t.call(this, o) || this, a._ownCanvas = s, a.canvas = n, a.context = n.getContext("2d"), a._resolution = O.RESOLUTION, a._autoResolution = !0, a._text = null, a._style = null, a._styleListener = null, a._font = "", a.text = e, a.style = i, a.localStyleID = -1, a;
  }
  return r.prototype.updateText = function(e) {
    var i = this._style;
    if (this.localStyleID !== i.styleID && (this.dirty = !0, this.localStyleID = i.styleID), !(!this.dirty && e)) {
      this._font = this._style.toFontString();
      var n = this.context, a = ee.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), s = a.width, o = a.height, h = a.lines, u = a.lineHeight, l = a.lineWidths, f = a.maxLineWidth, c = a.fontProperties;
      this.canvas.width = Math.ceil(Math.ceil(Math.max(1, s) + i.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, o) + i.padding * 2) * this._resolution), n.scale(this._resolution, this._resolution), n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.font = this._font, n.lineWidth = i.strokeThickness, n.textBaseline = i.textBaseline, n.lineJoin = i.lineJoin, n.miterLimit = i.miterLimit;
      for (var d, p, v = i.dropShadow ? 2 : 1, _ = 0; _ < v; ++_) {
        var m = i.dropShadow && _ === 0, y = m ? Math.ceil(Math.max(1, o) + i.padding * 2) : 0, g = y * this._resolution;
        if (m) {
          n.fillStyle = "black", n.strokeStyle = "black";
          var T = i.dropShadowColor, b = nr(typeof T == "number" ? T : Nu(T)), x = i.dropShadowBlur * this._resolution, E = i.dropShadowDistance * this._resolution;
          n.shadowColor = "rgba(" + b[0] * 255 + "," + b[1] * 255 + "," + b[2] * 255 + "," + i.dropShadowAlpha + ")", n.shadowBlur = x, n.shadowOffsetX = Math.cos(i.dropShadowAngle) * E, n.shadowOffsetY = Math.sin(i.dropShadowAngle) * E + g;
        } else
          n.fillStyle = this._generateFillStyle(i, h, a), n.strokeStyle = i.stroke, n.shadowColor = "black", n.shadowBlur = 0, n.shadowOffsetX = 0, n.shadowOffsetY = 0;
        var C = (u - c.fontSize) / 2;
        (!r.nextLineHeightBehavior || u - c.fontSize < 0) && (C = 0);
        for (var w = 0; w < h.length; w++)
          d = i.strokeThickness / 2, p = i.strokeThickness / 2 + w * u + c.ascent + C, i.align === "right" ? d += f - l[w] : i.align === "center" && (d += (f - l[w]) / 2), i.stroke && i.strokeThickness && this.drawLetterSpacing(h[w], d + i.padding, p + i.padding - y, !0), i.fill && this.drawLetterSpacing(h[w], d + i.padding, p + i.padding - y);
      }
      this.updateTexture();
    }
  }, r.prototype.drawLetterSpacing = function(e, i, n, a) {
    a === void 0 && (a = !1);
    var s = this._style, o = s.letterSpacing, h = r.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
    if (o === 0 || h) {
      h && (this.context.letterSpacing = o, this.context.textLetterSpacing = o), a ? this.context.strokeText(e, i, n) : this.context.fillText(e, i, n);
      return;
    }
    for (var u = i, l = Array.from ? Array.from(e) : e.split(""), f = this.context.measureText(e).width, c = 0, d = 0; d < l.length; ++d) {
      var p = l[d];
      a ? this.context.strokeText(p, u, n) : this.context.fillText(p, u, n);
      for (var v = "", _ = d + 1; _ < l.length; ++_)
        v += l[_];
      c = this.context.measureText(v).width, u += f - c + o, f = c;
    }
  }, r.prototype.updateTexture = function() {
    var e = this.canvas;
    if (this._style.trim) {
      var i = rp(e);
      i.data && (e.width = i.width, e.height = i.height, this.context.putImageData(i.data, 0, 0));
    }
    var n = this._texture, a = this._style, s = a.trim ? 0 : a.padding, o = n.baseTexture;
    n.trim.width = n._frame.width = e.width / this._resolution, n.trim.height = n._frame.height = e.height / this._resolution, n.trim.x = -s, n.trim.y = -s, n.orig.width = n._frame.width - s * 2, n.orig.height = n._frame.height - s * 2, this._onTextureUpdate(), o.setRealSize(e.width, e.height, this._resolution), n.updateUvs(), this.dirty = !1;
  }, r.prototype._render = function(e) {
    this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0), this.updateText(!0), t.prototype._render.call(this, e);
  }, r.prototype.updateTransform = function() {
    this.updateText(!0), t.prototype.updateTransform.call(this);
  }, r.prototype.getBounds = function(e, i) {
    return this.updateText(!0), this._textureID === -1 && (e = !1), t.prototype.getBounds.call(this, e, i);
  }, r.prototype.getLocalBounds = function(e) {
    return this.updateText(!0), t.prototype.getLocalBounds.call(this, e);
  }, r.prototype._calculateBounds = function() {
    this.calculateVertices(), this._bounds.addQuad(this.vertexData);
  }, r.prototype._generateFillStyle = function(e, i, n) {
    var a = e.fill;
    if (Array.isArray(a)) {
      if (a.length === 1)
        return a[0];
    } else
      return a;
    var s, o = e.dropShadow ? e.dropShadowDistance : 0, h = e.padding || 0, u = this.canvas.width / this._resolution - o - h * 2, l = this.canvas.height / this._resolution - o - h * 2, f = a.slice(), c = e.fillGradientStops.slice();
    if (!c.length)
      for (var d = f.length + 1, p = 1; p < d; ++p)
        c.push(p / d);
    if (f.unshift(a[0]), c.unshift(0), f.push(a[a.length - 1]), c.push(1), e.fillGradientType === Sr.LINEAR_VERTICAL) {
      s = this.context.createLinearGradient(u / 2, h, u / 2, l + h);
      for (var v = n.fontProperties.fontSize + e.strokeThickness, p = 0; p < i.length; p++) {
        var _ = n.lineHeight * (p - 1) + v, m = n.lineHeight * p, y = m;
        p > 0 && _ > m && (y = (m + _) / 2);
        var g = m + v, T = n.lineHeight * (p + 1), b = g;
        p + 1 < i.length && T < g && (b = (g + T) / 2);
        for (var x = (b - y) / l, E = 0; E < f.length; E++) {
          var C = 0;
          typeof c[E] == "number" ? C = c[E] : C = E / f.length;
          var w = Math.min(1, Math.max(0, y / l + C * x));
          w = Number(w.toFixed(5)), s.addColorStop(w, f[E]);
        }
      }
    } else {
      s = this.context.createLinearGradient(h, l / 2, u + h, l / 2);
      for (var R = f.length + 1, F = 1, p = 0; p < f.length; p++) {
        var M = void 0;
        typeof c[p] == "number" ? M = c[p] : M = F / R, s.addColorStop(M, f[p]), F++;
      }
    }
    return s;
  }, r.prototype.destroy = function(e) {
    typeof e == "boolean" && (e = { children: e }), e = Object.assign({}, n_, e), t.prototype.destroy.call(this, e), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
  }, Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
    },
    set: function(e) {
      this.updateText(!0);
      var i = Ze(this.scale.x) || 1;
      this.scale.x = i * e / this._texture.orig.width, this._width = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
    },
    set: function(e) {
      this.updateText(!0);
      var i = Ze(this.scale.y) || 1;
      this.scale.y = i * e / this._texture.orig.height, this._height = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "style", {
    get: function() {
      return this._style;
    },
    set: function(e) {
      e = e || {}, e instanceof ar ? this._style = e : this._style = new ar(e), this.localStyleID = -1, this.dirty = !0;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "text", {
    get: function() {
      return this._text;
    },
    set: function(e) {
      e = String(e == null ? "" : e), this._text !== e && (this._text = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "resolution", {
    get: function() {
      return this._resolution;
    },
    set: function(e) {
      this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), r.nextLineHeightBehavior = !1, r.experimentalLetterSpacing = !1, r;
}(Vt);
/*!
 * @pixi/prepare - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/prepare is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
O.UPLOADS_PER_FRAME = 4;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var la = function(t, r) {
  return la = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, la(t, r);
};
function a_(t, r) {
  la(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var s_ = function() {
  function t(r) {
    this.maxItemsPerFrame = r, this.itemsLeft = 0;
  }
  return t.prototype.beginFrame = function() {
    this.itemsLeft = this.maxItemsPerFrame;
  }, t.prototype.allowedToUpload = function() {
    return this.itemsLeft-- > 0;
  }, t;
}();
function o_(t, r) {
  var e = !1;
  if (t && t._textures && t._textures.length) {
    for (var i = 0; i < t._textures.length; i++)
      if (t._textures[i] instanceof z) {
        var n = t._textures[i].baseTexture;
        r.indexOf(n) === -1 && (r.push(n), e = !0);
      }
  }
  return e;
}
function h_(t, r) {
  if (t.baseTexture instanceof et) {
    var e = t.baseTexture;
    return r.indexOf(e) === -1 && r.push(e), !0;
  }
  return !1;
}
function u_(t, r) {
  if (t._texture && t._texture instanceof z) {
    var e = t._texture.baseTexture;
    return r.indexOf(e) === -1 && r.push(e), !0;
  }
  return !1;
}
function l_(t, r) {
  return r instanceof jr ? (r.updateText(!0), !0) : !1;
}
function f_(t, r) {
  if (r instanceof ar) {
    var e = r.toFontString();
    return ee.measureFont(e), !0;
  }
  return !1;
}
function c_(t, r) {
  if (t instanceof jr) {
    r.indexOf(t.style) === -1 && r.push(t.style), r.indexOf(t) === -1 && r.push(t);
    var e = t._texture.baseTexture;
    return r.indexOf(e) === -1 && r.push(e), !0;
  }
  return !1;
}
function d_(t, r) {
  return t instanceof ar ? (r.indexOf(t) === -1 && r.push(t), !0) : !1;
}
var p_ = function() {
  function t(r) {
    var e = this;
    this.limiter = new s_(O.UPLOADS_PER_FRAME), this.renderer = r, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
      !e.queue || e.prepareItems();
    }, this.registerFindHook(c_), this.registerFindHook(d_), this.registerFindHook(o_), this.registerFindHook(h_), this.registerFindHook(u_), this.registerUploadHook(l_), this.registerUploadHook(f_);
  }
  return t.prototype.upload = function(r, e) {
    var i = this;
    return typeof r == "function" && (e = r, r = null), e && Kt("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(n) {
      r && i.add(r);
      var a = function() {
        e == null || e(), n();
      };
      i.queue.length ? (i.completes.push(a), i.ticking || (i.ticking = !0, wt.system.addOnce(i.tick, i, le.UTILITY))) : a();
    });
  }, t.prototype.tick = function() {
    setTimeout(this.delayedTick, 0);
  }, t.prototype.prepareItems = function() {
    for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
      var r = this.queue[0], e = !1;
      if (r && !r._destroyed) {
        for (var i = 0, n = this.uploadHooks.length; i < n; i++)
          if (this.uploadHooks[i](this.uploadHookHelper, r)) {
            this.queue.shift(), e = !0;
            break;
          }
      }
      e || this.queue.shift();
    }
    if (this.queue.length)
      wt.system.addOnce(this.tick, this, le.UTILITY);
    else {
      this.ticking = !1;
      var a = this.completes.slice(0);
      this.completes.length = 0;
      for (var i = 0, n = a.length; i < n; i++)
        a[i]();
    }
  }, t.prototype.registerFindHook = function(r) {
    return r && this.addHooks.push(r), this;
  }, t.prototype.registerUploadHook = function(r) {
    return r && this.uploadHooks.push(r), this;
  }, t.prototype.add = function(r) {
    for (var e = 0, i = this.addHooks.length; e < i && !this.addHooks[e](r, this.queue); e++)
      ;
    if (r instanceof gt)
      for (var e = r.children.length - 1; e >= 0; e--)
        this.add(r.children[e]);
    return this;
  }, t.prototype.destroy = function() {
    this.ticking && wt.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
  }, t;
}();
function Qu(t, r) {
  return r instanceof et ? (r._glTextures[t.CONTEXT_UID] || t.texture.bind(r), !0) : !1;
}
function v_(t, r) {
  if (!(r instanceof Fi))
    return !1;
  var e = r.geometry;
  r.finishPoly(), e.updateBatches();
  for (var i = e.batches, n = 0; n < i.length; n++) {
    var a = i[n].style.texture;
    a && Qu(t, a.baseTexture);
  }
  return e.batchable || t.geometry.bind(e, r._resolveDirectShader(t)), !0;
}
function __(t, r) {
  return t instanceof Fi ? (r.push(t), !0) : !1;
}
var m_ = function(t) {
  a_(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return i.uploadHookHelper = i.renderer, i.registerFindHook(__), i.registerUploadHook(Qu), i.registerUploadHook(v_), i;
  }
  return r.extension = {
    name: "prepare",
    type: ot.RendererPlugin
  }, r;
}(p_);
/*!
 * @pixi/spritesheet - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/spritesheet is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var y_ = function() {
  function t(r, e, i) {
    i === void 0 && (i = null), this.linkedSheets = [], this._texture = r instanceof z ? r : null, this.baseTexture = r instanceof et ? r : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = e;
    var n = this.baseTexture.resource;
    this.resolution = this._updateResolution(i || (n ? n.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  return t.prototype._updateResolution = function(r) {
    r === void 0 && (r = null);
    var e = this.data.meta.scale, i = Ci(r, null);
    return i === null && (i = e !== void 0 ? parseFloat(e) : 1), i !== 1 && this.baseTexture.setResolution(i), i;
  }, t.prototype.parse = function(r) {
    var e = this;
    return r && Kt("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(i) {
      e._callback = function(n) {
        r == null || r(n), i(n);
      }, e._batchIndex = 0, e._frameKeys.length <= t.BATCH_SIZE ? (e._processFrames(0), e._processAnimations(), e._parseComplete()) : e._nextBatch();
    });
  }, t.prototype._processFrames = function(r) {
    for (var e = r, i = t.BATCH_SIZE; e - r < i && e < this._frameKeys.length; ) {
      var n = this._frameKeys[e], a = this._frames[n], s = a.frame;
      if (s) {
        var o = null, h = null, u = a.trimmed !== !1 && a.sourceSize ? a.sourceSize : a.frame, l = new K(0, 0, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution);
        a.rotated ? o = new K(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.h) / this.resolution, Math.floor(s.w) / this.resolution) : o = new K(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution), a.trimmed !== !1 && a.spriteSourceSize && (h = new K(Math.floor(a.spriteSourceSize.x) / this.resolution, Math.floor(a.spriteSourceSize.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution)), this.textures[n] = new z(this.baseTexture, o, l, h, a.rotated ? 2 : 0, a.anchor), z.addToCache(this.textures[n], n);
      }
      e++;
    }
  }, t.prototype._processAnimations = function() {
    var r = this.data.animations || {};
    for (var e in r) {
      this.animations[e] = [];
      for (var i = 0; i < r[e].length; i++) {
        var n = r[e][i];
        this.animations[e].push(this.textures[n]);
      }
    }
  }, t.prototype._parseComplete = function() {
    var r = this._callback;
    this._callback = null, this._batchIndex = 0, r.call(this, this.textures);
  }, t.prototype._nextBatch = function() {
    var r = this;
    this._processFrames(this._batchIndex * t.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
      r._batchIndex * t.BATCH_SIZE < r._frameKeys.length ? r._nextBatch() : (r._processAnimations(), r._parseComplete());
    }, 0);
  }, t.prototype.destroy = function(r) {
    var e;
    r === void 0 && (r = !1);
    for (var i in this.textures)
      this.textures[i].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, r && ((e = this._texture) === null || e === void 0 || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
  }, t.BATCH_SIZE = 1e3, t;
}(), x_ = function() {
  function t() {
  }
  return t.use = function(r, e) {
    var i, n, a = this, s = r.name + "_image";
    if (!r.data || r.type !== _t.TYPE.JSON || !r.data.frames || a.resources[s]) {
      e();
      return;
    }
    var o = (n = (i = r.data) === null || i === void 0 ? void 0 : i.meta) === null || n === void 0 ? void 0 : n.related_multi_packs;
    if (Array.isArray(o))
      for (var h = function(p) {
        if (typeof p != "string")
          return "continue";
        var v = p.replace(".json", ""), _ = Ye.resolve(r.url.replace(a.baseUrl, ""), p);
        if (a.resources[v] || Object.values(a.resources).some(function(y) {
          return Ye.format(Ye.parse(y.url)) === _;
        }))
          return "continue";
        var m = {
          crossOrigin: r.crossOrigin,
          loadType: _t.LOAD_TYPE.XHR,
          xhrType: _t.XHR_RESPONSE_TYPE.JSON,
          parentResource: r,
          metadata: r.metadata
        };
        a.add(v, _, m);
      }, u = 0, l = o; u < l.length; u++) {
        var f = l[u];
        h(f);
      }
    var c = {
      crossOrigin: r.crossOrigin,
      metadata: r.metadata.imageMetadata,
      parentResource: r
    }, d = t.getResourcePath(r, a.baseUrl);
    a.add(s, d, c, function(v) {
      if (v.error) {
        e(v.error);
        return;
      }
      var _ = new y_(v.texture, r.data, r.url);
      _.parse().then(function() {
        r.spritesheet = _, r.textures = _.textures, e();
      });
    });
  }, t.getResourcePath = function(r, e) {
    return r.isDataUrl ? r.data.meta.image : Ye.resolve(r.url.replace(e, ""), r.data.meta.image);
  }, t.extension = ot.Loader, t;
}();
/*!
 * @pixi/sprite-tiling - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/sprite-tiling is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var fa = function(t, r) {
  return fa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, fa(t, r);
};
function tl(t, r) {
  fa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var vr = new $(), el = function(t) {
  tl(r, t);
  function r(e, i, n) {
    i === void 0 && (i = 100), n === void 0 && (n = 100);
    var a = t.call(this, e) || this;
    return a.tileTransform = new sr(), a._width = i, a._height = n, a.uvMatrix = a.texture.uvMatrix || new Xr(e), a.pluginName = "tilingSprite", a.uvRespectAnchor = !1, a;
  }
  return Object.defineProperty(r.prototype, "clampMargin", {
    get: function() {
      return this.uvMatrix.clampMargin;
    },
    set: function(e) {
      this.uvMatrix.clampMargin = e, this.uvMatrix.update(!0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tileScale", {
    get: function() {
      return this.tileTransform.scale;
    },
    set: function(e) {
      this.tileTransform.scale.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tilePosition", {
    get: function() {
      return this.tileTransform.position;
    },
    set: function(e) {
      this.tileTransform.position.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._onTextureUpdate = function() {
    this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215;
  }, r.prototype._render = function(e) {
    var i = this._texture;
    !i || !i.valid || (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this));
  }, r.prototype._calculateBounds = function() {
    var e = this._width * -this._anchor._x, i = this._height * -this._anchor._y, n = this._width * (1 - this._anchor._x), a = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, e, i, n, a);
  }, r.prototype.getLocalBounds = function(e) {
    return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new K()), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e);
  }, r.prototype.containsPoint = function(e) {
    this.worldTransform.applyInverse(e, vr);
    var i = this._width, n = this._height, a = -i * this.anchor._x;
    if (vr.x >= a && vr.x < a + i) {
      var s = -n * this.anchor._y;
      if (vr.y >= s && vr.y < s + n)
        return !0;
    }
    return !1;
  }, r.prototype.destroy = function(e) {
    t.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null;
  }, r.from = function(e, i) {
    var n = e instanceof z ? e : z.from(e, i);
    return new r(n, i.width, i.height);
  }, Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this._width;
    },
    set: function(e) {
      this._width = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this._height;
    },
    set: function(e) {
      this._height = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Vt), g_ = `#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`, Lo = `#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`, b_ = `#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`, T_ = `#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`, I_ = `#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`, _i = new ft(), E_ = function(t) {
  tl(r, t);
  function r(e) {
    var i = t.call(this, e) || this;
    return e.runners.contextChange.add(i), i.quad = new La(), i.state = De.for2d(), i;
  }
  return r.prototype.contextChange = function() {
    var e = this.renderer, i = { globals: e.globalUniforms };
    this.simpleShader = Qt.from(Lo, g_, i), this.shader = e.context.webGLVersion > 1 ? Qt.from(T_, I_, i) : Qt.from(Lo, b_, i);
  }, r.prototype.render = function(e) {
    var i = this.renderer, n = this.quad, a = n.vertices;
    a[0] = a[6] = e._width * -e.anchor.x, a[1] = a[3] = e._height * -e.anchor.y, a[2] = a[4] = e._width * (1 - e.anchor.x), a[5] = a[7] = e._height * (1 - e.anchor.y);
    var s = e.uvRespectAnchor ? e.anchor.x : 0, o = e.uvRespectAnchor ? e.anchor.y : 0;
    a = n.uvs, a[0] = a[6] = -s, a[1] = a[3] = -o, a[2] = a[4] = 1 - s, a[5] = a[7] = 1 - o, n.invalidate();
    var h = e._texture, u = h.baseTexture, l = u.alphaMode > 0, f = e.tileTransform.localTransform, c = e.uvMatrix, d = u.isPowerOfTwo && h.frame.width === u.width && h.frame.height === u.height;
    d && (u._glTextures[i.CONTEXT_UID] ? d = u.wrapMode !== Ft.CLAMP : u.wrapMode === Ft.CLAMP && (u.wrapMode = Ft.REPEAT));
    var p = d ? this.simpleShader : this.shader, v = h.width, _ = h.height, m = e._width, y = e._height;
    _i.set(f.a * v / m, f.b * v / y, f.c * _ / m, f.d * _ / y, f.tx / m, f.ty / y), _i.invert(), d ? _i.prepend(c.mapCoord) : (p.uniforms.uMapCoord = c.mapCoord.toArray(!0), p.uniforms.uClampFrame = c.uClampFrame, p.uniforms.uClampOffset = c.uClampOffset), p.uniforms.uTransform = _i.toArray(!0), p.uniforms.uColor = Oa(e.tint, e.worldAlpha, p.uniforms.uColor, l), p.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0), p.uniforms.uSampler = h, i.shader.bind(p), i.geometry.bind(n), this.state.blendMode = Ua(e.blendMode, l), i.state.set(this.state), i.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }, r.extension = {
    name: "tilingSprite",
    type: ot.RendererPlugin
  }, r;
}(Hr);
/*!
 * @pixi/mesh - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/mesh is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ca = function(t, r) {
  return ca = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ca(t, r);
};
function Ba(t, r) {
  ca(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var w_ = function() {
  function t(r, e) {
    this.uvBuffer = r, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
  }
  return t.prototype.update = function(r) {
    if (!(!r && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
      this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
      var e = this.uvBuffer.data;
      (!this.data || this.data.length !== e.length) && (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++;
    }
  }, t;
}(), En = new $(), So = new Ti(), Se = function(t) {
  Ba(r, t);
  function r(e, i, n, a) {
    a === void 0 && (a = Ot.TRIANGLES);
    var s = t.call(this) || this;
    return s.geometry = e, s.shader = i, s.state = n || De.for2d(), s.drawMode = a, s.start = 0, s.size = 0, s.uvs = null, s.indices = null, s.vertexData = new Float32Array(1), s.vertexDirty = -1, s._transformID = -1, s._roundPixels = O.ROUND_PIXELS, s.batchUvs = null, s;
  }
  return Object.defineProperty(r.prototype, "geometry", {
    get: function() {
      return this._geometry;
    },
    set: function(e) {
      this._geometry !== e && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = e, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "uvBuffer", {
    get: function() {
      return this.geometry.buffers[1];
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "verticesBuffer", {
    get: function() {
      return this.geometry.buffers[0];
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "material", {
    get: function() {
      return this.shader;
    },
    set: function(e) {
      this.shader = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "blendMode", {
    get: function() {
      return this.state.blendMode;
    },
    set: function(e) {
      this.state.blendMode = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "roundPixels", {
    get: function() {
      return this._roundPixels;
    },
    set: function(e) {
      this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return "tint" in this.shader ? this.shader.tint : null;
    },
    set: function(e) {
      this.shader.tint = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "texture", {
    get: function() {
      return "texture" in this.shader ? this.shader.texture : null;
    },
    set: function(e) {
      this.shader.texture = e;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._render = function(e) {
    var i = this.geometry.buffers[0].data, n = this.shader;
    n.batchable && this.drawMode === Ot.TRIANGLES && i.length < r.BATCHABLE_SIZE * 2 ? this._renderToBatch(e) : this._renderDefault(e);
  }, r.prototype._renderDefault = function(e) {
    var i = this.shader;
    i.alpha = this.worldAlpha, i.update && i.update(), e.batch.flush(), i.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), e.shader.bind(i), e.state.set(this.state), e.geometry.bind(this.geometry, i), e.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }, r.prototype._renderToBatch = function(e) {
    var i = this.geometry, n = this.shader;
    n.uvMatrix && (n.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = i.indexBuffer.data, this._tintRGB = n._tintRGB, this._texture = n.texture;
    var a = this.material.pluginName;
    e.batch.setObjectRenderer(e.plugins[a]), e.plugins[a].render(this);
  }, r.prototype.calculateVertices = function() {
    var e = this.geometry, i = e.buffers[0], n = i.data, a = i._updateID;
    if (!(a === this.vertexDirty && this._transformID === this.transform._worldID)) {
      this._transformID = this.transform._worldID, this.vertexData.length !== n.length && (this.vertexData = new Float32Array(n.length));
      for (var s = this.transform.worldTransform, o = s.a, h = s.b, u = s.c, l = s.d, f = s.tx, c = s.ty, d = this.vertexData, p = 0; p < d.length / 2; p++) {
        var v = n[p * 2], _ = n[p * 2 + 1];
        d[p * 2] = o * v + u * _ + f, d[p * 2 + 1] = h * v + l * _ + c;
      }
      if (this._roundPixels)
        for (var m = O.RESOLUTION, p = 0; p < d.length; ++p)
          d[p] = Math.round((d[p] * m | 0) / m);
      this.vertexDirty = a;
    }
  }, r.prototype.calculateUvs = function() {
    var e = this.geometry.buffers[1], i = this.shader;
    i.uvMatrix.isSimple ? this.uvs = e.data : (this.batchUvs || (this.batchUvs = new w_(e, i.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
  }, r.prototype._calculateBounds = function() {
    this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
  }, r.prototype.containsPoint = function(e) {
    if (!this.getBounds().contains(e.x, e.y))
      return !1;
    this.worldTransform.applyInverse(e, En);
    for (var i = this.geometry.getBuffer("aVertexPosition").data, n = So.points, a = this.geometry.getIndex().data, s = a.length, o = this.drawMode === 4 ? 3 : 1, h = 0; h + 2 < s; h += o) {
      var u = a[h] * 2, l = a[h + 1] * 2, f = a[h + 2] * 2;
      if (n[0] = i[u], n[1] = i[u + 1], n[2] = i[l], n[3] = i[l + 1], n[4] = i[f], n[5] = i[f + 1], So.contains(En.x, En.y))
        return !0;
    }
    return !1;
  }, r.prototype.destroy = function(e) {
    t.prototype.destroy.call(this, e), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
  }, r.BATCHABLE_SIZE = 100, r;
}(gt), R_ = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`, C_ = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`, Ge = function(t) {
  Ba(r, t);
  function r(e, i) {
    var n = this, a = {
      uSampler: e,
      alpha: 1,
      uTextureMatrix: ft.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1])
    };
    return i = Object.assign({
      tint: 16777215,
      alpha: 1,
      pluginName: "batch"
    }, i), i.uniforms && Object.assign(a, i.uniforms), n = t.call(this, i.program || Me.from(C_, R_), a) || this, n._colorDirty = !1, n.uvMatrix = new Xr(e), n.batchable = i.program === void 0, n.pluginName = i.pluginName, n.tint = i.tint, n.alpha = i.alpha, n;
  }
  return Object.defineProperty(r.prototype, "texture", {
    get: function() {
      return this.uniforms.uSampler;
    },
    set: function(e) {
      this.uniforms.uSampler !== e && (!this.uniforms.uSampler.baseTexture.alphaMode != !e.baseTexture.alphaMode && (this._colorDirty = !0), this.uniforms.uSampler = e, this.uvMatrix.texture = e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "alpha", {
    get: function() {
      return this._alpha;
    },
    set: function(e) {
      e !== this._alpha && (this._alpha = e, this._colorDirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return this._tint;
    },
    set: function(e) {
      e !== this._tint && (this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16), this._colorDirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.update = function() {
    if (this._colorDirty) {
      this._colorDirty = !1;
      var e = this.texture.baseTexture;
      Oa(this._tint, this._alpha, this.uniforms.uColor, e.alphaMode);
    }
    this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
  }, r;
}(Qt), ji = function(t) {
  Ba(r, t);
  function r(e, i, n) {
    var a = t.call(this) || this, s = new dt(e), o = new dt(i, !0), h = new dt(n, !0, !0);
    return a.addAttribute("aVertexPosition", s, 2, !1, G.FLOAT).addAttribute("aTextureCoord", o, 2, !1, G.FLOAT).addIndex(h), a._updateId = -1, a;
  }
  return Object.defineProperty(r.prototype, "vertexDirtyId", {
    get: function() {
      return this.buffers[0]._updateID;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(Be);
/*!
 * @pixi/text-bitmap - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/text-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var da = function(t, r) {
  return da = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, da(t, r);
};
function N_(t, r) {
  da(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Li = function() {
  function t() {
    this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
  }
  return t;
}(), A_ = function() {
  function t() {
  }
  return t.test = function(r) {
    return typeof r == "string" && r.indexOf("info face=") === 0;
  }, t.parse = function(r) {
    var e = r.match(/^[a-z]+\s+.+$/gm), i = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (var n in e) {
      var a = e[n].match(/^[a-z]+/gm)[0], s = e[n].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), o = {};
      for (var h in s) {
        var u = s[h].split("="), l = u[0], f = u[1].replace(/"/gm, ""), c = parseFloat(f), d = isNaN(c) ? f : c;
        o[l] = d;
      }
      i[a].push(o);
    }
    var p = new Li();
    return i.info.forEach(function(v) {
      return p.info.push({
        face: v.face,
        size: parseInt(v.size, 10)
      });
    }), i.common.forEach(function(v) {
      return p.common.push({
        lineHeight: parseInt(v.lineHeight, 10)
      });
    }), i.page.forEach(function(v) {
      return p.page.push({
        id: parseInt(v.id, 10),
        file: v.file
      });
    }), i.char.forEach(function(v) {
      return p.char.push({
        id: parseInt(v.id, 10),
        page: parseInt(v.page, 10),
        x: parseInt(v.x, 10),
        y: parseInt(v.y, 10),
        width: parseInt(v.width, 10),
        height: parseInt(v.height, 10),
        xoffset: parseInt(v.xoffset, 10),
        yoffset: parseInt(v.yoffset, 10),
        xadvance: parseInt(v.xadvance, 10)
      });
    }), i.kerning.forEach(function(v) {
      return p.kerning.push({
        first: parseInt(v.first, 10),
        second: parseInt(v.second, 10),
        amount: parseInt(v.amount, 10)
      });
    }), i.distanceField.forEach(function(v) {
      return p.distanceField.push({
        distanceRange: parseInt(v.distanceRange, 10),
        fieldType: v.fieldType
      });
    }), p;
  }, t;
}(), pa = function() {
  function t() {
  }
  return t.test = function(r) {
    return r instanceof XMLDocument && r.getElementsByTagName("page").length && r.getElementsByTagName("info")[0].getAttribute("face") !== null;
  }, t.parse = function(r) {
    for (var e = new Li(), i = r.getElementsByTagName("info"), n = r.getElementsByTagName("common"), a = r.getElementsByTagName("page"), s = r.getElementsByTagName("char"), o = r.getElementsByTagName("kerning"), h = r.getElementsByTagName("distanceField"), u = 0; u < i.length; u++)
      e.info.push({
        face: i[u].getAttribute("face"),
        size: parseInt(i[u].getAttribute("size"), 10)
      });
    for (var u = 0; u < n.length; u++)
      e.common.push({
        lineHeight: parseInt(n[u].getAttribute("lineHeight"), 10)
      });
    for (var u = 0; u < a.length; u++)
      e.page.push({
        id: parseInt(a[u].getAttribute("id"), 10) || 0,
        file: a[u].getAttribute("file")
      });
    for (var u = 0; u < s.length; u++) {
      var l = s[u];
      e.char.push({
        id: parseInt(l.getAttribute("id"), 10),
        page: parseInt(l.getAttribute("page"), 10) || 0,
        x: parseInt(l.getAttribute("x"), 10),
        y: parseInt(l.getAttribute("y"), 10),
        width: parseInt(l.getAttribute("width"), 10),
        height: parseInt(l.getAttribute("height"), 10),
        xoffset: parseInt(l.getAttribute("xoffset"), 10),
        yoffset: parseInt(l.getAttribute("yoffset"), 10),
        xadvance: parseInt(l.getAttribute("xadvance"), 10)
      });
    }
    for (var u = 0; u < o.length; u++)
      e.kerning.push({
        first: parseInt(o[u].getAttribute("first"), 10),
        second: parseInt(o[u].getAttribute("second"), 10),
        amount: parseInt(o[u].getAttribute("amount"), 10)
      });
    for (var u = 0; u < h.length; u++)
      e.distanceField.push({
        fieldType: h[u].getAttribute("fieldType"),
        distanceRange: parseInt(h[u].getAttribute("distanceRange"), 10)
      });
    return e;
  }, t;
}(), P_ = function() {
  function t() {
  }
  return t.test = function(r) {
    if (typeof r == "string" && r.indexOf("<font>") > -1) {
      var e = new globalThis.DOMParser().parseFromString(r, "text/xml");
      return pa.test(e);
    }
    return !1;
  }, t.parse = function(r) {
    var e = new globalThis.DOMParser().parseFromString(r, "text/xml");
    return pa.parse(e);
  }, t;
}(), wn = [
  A_,
  pa,
  P_
];
function rl(t) {
  for (var r = 0; r < wn.length; r++)
    if (wn[r].test(t))
      return wn[r];
  return null;
}
function U_(t, r, e, i, n, a) {
  var s = e.fill;
  if (Array.isArray(s)) {
    if (s.length === 1)
      return s[0];
  } else
    return s;
  var o, h = e.dropShadow ? e.dropShadowDistance : 0, u = e.padding || 0, l = t.width / i - h - u * 2, f = t.height / i - h - u * 2, c = s.slice(), d = e.fillGradientStops.slice();
  if (!d.length)
    for (var p = c.length + 1, v = 1; v < p; ++v)
      d.push(v / p);
  if (c.unshift(s[0]), d.unshift(0), c.push(s[s.length - 1]), d.push(1), e.fillGradientType === Sr.LINEAR_VERTICAL) {
    o = r.createLinearGradient(l / 2, u, l / 2, f + u);
    for (var _ = 0, m = a.fontProperties.fontSize + e.strokeThickness, y = m / f, v = 0; v < n.length; v++)
      for (var g = a.lineHeight * v, T = 0; T < c.length; T++) {
        var b = 0;
        typeof d[T] == "number" ? b = d[T] : b = T / c.length;
        var x = g / f + b * y, E = Math.max(_, x);
        E = Math.min(E, 1), o.addColorStop(E, c[T]), _ = E;
      }
  } else {
    o = r.createLinearGradient(u, f / 2, l + u, f / 2);
    for (var C = c.length + 1, w = 1, v = 0; v < c.length; v++) {
      var R = void 0;
      typeof d[v] == "number" ? R = d[v] : R = w / C, o.addColorStop(R, c[v]), w++;
    }
  }
  return o;
}
function O_(t, r, e, i, n, a, s) {
  var o = e.text, h = e.fontProperties;
  r.translate(i, n), r.scale(a, a);
  var u = s.strokeThickness / 2, l = -(s.strokeThickness / 2);
  if (r.font = s.toFontString(), r.lineWidth = s.strokeThickness, r.textBaseline = s.textBaseline, r.lineJoin = s.lineJoin, r.miterLimit = s.miterLimit, r.fillStyle = U_(t, r, s, a, [o], e), r.strokeStyle = s.stroke, s.dropShadow) {
    var f = s.dropShadowColor, c = nr(typeof f == "number" ? f : Nu(f)), d = s.dropShadowBlur * a, p = s.dropShadowDistance * a;
    r.shadowColor = "rgba(" + c[0] * 255 + "," + c[1] * 255 + "," + c[2] * 255 + "," + s.dropShadowAlpha + ")", r.shadowBlur = d, r.shadowOffsetX = Math.cos(s.dropShadowAngle) * p, r.shadowOffsetY = Math.sin(s.dropShadowAngle) * p;
  } else
    r.shadowColor = "black", r.shadowBlur = 0, r.shadowOffsetX = 0, r.shadowOffsetY = 0;
  s.stroke && s.strokeThickness && r.strokeText(o, u, l + e.lineHeight - h.descent), s.fill && r.fillText(o, u, l + e.lineHeight - h.descent), r.setTransform(1, 0, 0, 1, 0, 0), r.fillStyle = "rgba(0, 0, 0, 0)";
}
function il(t) {
  return Array.from ? Array.from(t) : t.split("");
}
function F_(t) {
  typeof t == "string" && (t = [t]);
  for (var r = [], e = 0, i = t.length; e < i; e++) {
    var n = t[e];
    if (Array.isArray(n)) {
      if (n.length !== 2)
        throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + n.length + ".");
      var a = n[0].charCodeAt(0), s = n[1].charCodeAt(0);
      if (s < a)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (var o = a, h = s; o <= h; o++)
        r.push(String.fromCharCode(o));
    } else
      r.push.apply(r, il(n));
  }
  if (r.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return r;
}
function Ii(t) {
  return t.codePointAt ? t.codePointAt(0) : t.charCodeAt(0);
}
var $e = function() {
  function t(r, e, i) {
    var n, a, s = r.info[0], o = r.common[0], h = r.page[0], u = r.distanceField[0], l = Ci(h.file), f = {};
    this._ownsTextures = i, this.font = s.face, this.size = s.size, this.lineHeight = o.lineHeight / l, this.chars = {}, this.pageTextures = f;
    for (var c = 0; c < r.page.length; c++) {
      var d = r.page[c], p = d.id, v = d.file;
      f[p] = e instanceof Array ? e[c] : e[v], (u == null ? void 0 : u.fieldType) && u.fieldType !== "none" && (f[p].baseTexture.alphaMode = Xt.NO_PREMULTIPLIED_ALPHA, f[p].baseTexture.mipmap = te.OFF);
    }
    for (var c = 0; c < r.char.length; c++) {
      var _ = r.char[c], p = _.id, m = _.page, y = r.char[c], g = y.x, T = y.y, b = y.width, x = y.height, E = y.xoffset, C = y.yoffset, w = y.xadvance;
      g /= l, T /= l, b /= l, x /= l, E /= l, C /= l, w /= l;
      var R = new K(g + f[m].frame.x / l, T + f[m].frame.y / l, b, x);
      this.chars[p] = {
        xOffset: E,
        yOffset: C,
        xAdvance: w,
        kerning: {},
        texture: new z(f[m].baseTexture, R),
        page: m
      };
    }
    for (var c = 0; c < r.kerning.length; c++) {
      var F = r.kerning[c], M = F.first, k = F.second, Q = F.amount;
      M /= l, k /= l, Q /= l, this.chars[k] && (this.chars[k].kerning[M] = Q);
    }
    this.distanceFieldRange = u == null ? void 0 : u.distanceRange, this.distanceFieldType = (a = (n = u == null ? void 0 : u.fieldType) === null || n === void 0 ? void 0 : n.toLowerCase()) !== null && a !== void 0 ? a : "none";
  }
  return t.prototype.destroy = function() {
    for (var r in this.chars)
      this.chars[r].texture.destroy(), this.chars[r].texture = null;
    for (var r in this.pageTextures)
      this._ownsTextures && this.pageTextures[r].destroy(!0), this.pageTextures[r] = null;
    this.chars = null, this.pageTextures = null;
  }, t.install = function(r, e, i) {
    var n;
    if (r instanceof Li)
      n = r;
    else {
      var a = rl(r);
      if (!a)
        throw new Error("Unrecognized data format for font.");
      n = a.parse(r);
    }
    e instanceof z && (e = [e]);
    var s = new t(n, e, i);
    return t.available[s.font] = s, s;
  }, t.uninstall = function(r) {
    var e = t.available[r];
    if (!e)
      throw new Error("No font found named '" + r + "'");
    e.destroy(), delete t.available[r];
  }, t.from = function(r, e, i) {
    if (!r)
      throw new Error("[BitmapFont] Property `name` is required.");
    var n = Object.assign({}, t.defaultOptions, i), a = n.chars, s = n.padding, o = n.resolution, h = n.textureWidth, u = n.textureHeight, l = F_(a), f = e instanceof ar ? e : new ar(e), c = h, d = new Li();
    d.info[0] = {
      face: f.fontFamily,
      size: f.fontSize
    }, d.common[0] = {
      lineHeight: f.fontSize
    };
    for (var p = 0, v = 0, _, m, y, g = 0, T = [], b = 0; b < l.length; b++) {
      _ || (_ = O.ADAPTER.createCanvas(), _.width = h, _.height = u, m = _.getContext("2d"), y = new et(_, { resolution: o }), T.push(new z(y)), d.page.push({
        id: T.length - 1,
        file: ""
      }));
      var x = ee.measureText(l[b], f, !1, _), E = x.width, C = Math.ceil(x.height), w = Math.ceil((f.fontStyle === "italic" ? 2 : 1) * E);
      if (v >= u - C * o) {
        if (v === 0)
          throw new Error("[BitmapFont] textureHeight " + u + "px is " + ("too small for " + f.fontSize + "px fonts"));
        --b, _ = null, m = null, y = null, v = 0, p = 0, g = 0;
        continue;
      }
      if (g = Math.max(C + x.fontProperties.descent, g), w * o + p >= c) {
        --b, v += g * o, v = Math.ceil(v), p = 0, g = 0;
        continue;
      }
      O_(_, m, x, p, v, o, f);
      var R = Ii(x.text);
      d.char.push({
        id: R,
        page: T.length - 1,
        x: p / o,
        y: v / o,
        width: w,
        height: C,
        xoffset: 0,
        yoffset: 0,
        xadvance: Math.ceil(E - (f.dropShadow ? f.dropShadowDistance : 0) - (f.stroke ? f.strokeThickness : 0))
      }), p += (w + 2 * s) * o, p = Math.ceil(p);
    }
    for (var b = 0, F = l.length; b < F; b++)
      for (var M = l[b], k = 0; k < F; k++) {
        var Q = l[k], A = m.measureText(M).width, L = m.measureText(Q).width, W = m.measureText(M + Q).width, vt = W - (A + L);
        vt && d.kerning.push({
          first: Ii(M),
          second: Ii(Q),
          amount: vt
        });
      }
    var rt = new t(d, T, !0);
    return t.available[r] !== void 0 && t.uninstall(r), t.available[r] = rt, rt;
  }, t.ALPHA = [["a", "z"], ["A", "Z"], " "], t.NUMERIC = [["0", "9"]], t.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], t.ASCII = [[" ", "~"]], t.defaultOptions = {
    resolution: 1,
    textureWidth: 512,
    textureHeight: 512,
    padding: 4,
    chars: t.ALPHANUMERIC
  }, t.available = {}, t;
}(), L_ = `// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, uColor.a * alpha);\r
\r
}\r
`, S_ = `// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`, G_ = [], B_ = [], Go = [];
(function(t) {
  N_(r, t);
  function r(e, i) {
    i === void 0 && (i = {});
    var n = t.call(this) || this;
    n._tint = 16777215;
    var a = Object.assign({}, r.styleDefaults, i), s = a.align, o = a.tint, h = a.maxWidth, u = a.letterSpacing, l = a.fontName, f = a.fontSize;
    if (!$e.available[l])
      throw new Error('Missing BitmapFont "' + l + '"');
    return n._activePagesMeshData = [], n._textWidth = 0, n._textHeight = 0, n._align = s, n._tint = o, n._fontName = l, n._fontSize = f || $e.available[l].size, n.text = e, n._maxWidth = h, n._maxLineHeight = 0, n._letterSpacing = u, n._anchor = new _e(function() {
      n.dirty = !0;
    }, n, 0, 0), n._roundPixels = O.ROUND_PIXELS, n.dirty = !0, n._resolution = O.RESOLUTION, n._autoResolution = !0, n._textureCache = {}, n;
  }
  return r.prototype.updateText = function() {
    for (var e, i = $e.available[this._fontName], n = this._fontSize / i.size, a = new $(), s = [], o = [], h = [], u = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", l = il(u), f = this._maxWidth * i.size / this._fontSize, c = i.distanceFieldType === "none" ? G_ : B_, d = null, p = 0, v = 0, _ = 0, m = -1, y = 0, g = 0, T = 0, b = 0, x = 0; x < l.length; x++) {
      var E = l[x], C = Ii(E);
      if (/(?:\s)/.test(E) && (m = x, y = p, b++), E === "\r" || E === `
`) {
        o.push(p), h.push(-1), v = Math.max(v, p), ++_, ++g, a.x = 0, a.y += i.lineHeight, d = null, b = 0;
        continue;
      }
      var w = i.chars[C];
      if (!!w) {
        d && w.kerning[d] && (a.x += w.kerning[d]);
        var R = Go.pop() || {
          texture: z.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new $()
        };
        R.texture = w.texture, R.line = _, R.charCode = C, R.position.x = a.x + w.xOffset + this._letterSpacing / 2, R.position.y = a.y + w.yOffset, R.prevSpaces = b, s.push(R), p = R.position.x + Math.max(w.xAdvance - w.xOffset, w.texture.orig.width), a.x += w.xAdvance + this._letterSpacing, T = Math.max(T, w.yOffset + w.texture.height), d = C, m !== -1 && f > 0 && a.x > f && (++g, er(s, 1 + m - g, 1 + x - m), x = m, m = -1, o.push(y), h.push(s.length > 0 ? s[s.length - 1].prevSpaces : 0), v = Math.max(v, y), _++, a.x = 0, a.y += i.lineHeight, d = null, b = 0);
      }
    }
    var F = l[l.length - 1];
    F !== "\r" && F !== `
` && (/(?:\s)/.test(F) && (p = y), o.push(p), v = Math.max(v, p), h.push(-1));
    for (var M = [], x = 0; x <= _; x++) {
      var k = 0;
      this._align === "right" ? k = v - o[x] : this._align === "center" ? k = (v - o[x]) / 2 : this._align === "justify" && (k = h[x] < 0 ? 0 : (v - o[x]) / h[x]), M.push(k);
    }
    for (var Q = s.length, A = {}, L = [], W = this._activePagesMeshData, x = 0; x < W.length; x++)
      c.push(W[x]);
    for (var x = 0; x < Q; x++) {
      var vt = s[x].texture, rt = vt.baseTexture.uid;
      if (!A[rt]) {
        var I = c.pop();
        if (!I) {
          var N = new ji(), U = void 0, B = void 0;
          i.distanceFieldType === "none" ? (U = new Ge(z.EMPTY), B = D.NORMAL) : (U = new Ge(z.EMPTY, { program: Me.from(S_, L_), uniforms: { uFWidth: 0 } }), B = D.NORMAL_NPM);
          var H = new Se(N, U);
          H.blendMode = B, I = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: H,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        I.index = 0, I.indexCount = 0, I.vertexCount = 0, I.uvsCount = 0, I.total = 0;
        var Y = this._textureCache;
        Y[rt] = Y[rt] || new z(vt.baseTexture), I.mesh.texture = Y[rt], I.mesh.tint = this._tint, L.push(I), A[rt] = I;
      }
      A[rt].total++;
    }
    for (var x = 0; x < W.length; x++)
      L.indexOf(W[x]) === -1 && this.removeChild(W[x].mesh);
    for (var x = 0; x < L.length; x++)
      L[x].mesh.parent !== this && this.addChild(L[x].mesh);
    this._activePagesMeshData = L;
    for (var x in A) {
      var I = A[x], V = I.total;
      if (!(((e = I.indices) === null || e === void 0 ? void 0 : e.length) > 6 * V) || I.vertices.length < Se.BATCHABLE_SIZE * 2)
        I.vertices = new Float32Array(4 * 2 * V), I.uvs = new Float32Array(4 * 2 * V), I.indices = new Uint16Array(6 * V);
      else
        for (var tt = I.total, at = I.vertices, it = tt * 4 * 2; it < at.length; it++)
          at[it] = 0;
      I.mesh.size = 6 * V;
    }
    for (var x = 0; x < Q; x++) {
      var E = s[x], nt = E.position.x + M[E.line] * (this._align === "justify" ? E.prevSpaces : 1);
      this._roundPixels && (nt = Math.round(nt));
      var j = nt * n, Z = E.position.y * n, vt = E.texture, X = A[vt.baseTexture.uid], lt = vt.frame, ht = vt._uvs, J = X.index++;
      X.indices[J * 6 + 0] = 0 + J * 4, X.indices[J * 6 + 1] = 1 + J * 4, X.indices[J * 6 + 2] = 2 + J * 4, X.indices[J * 6 + 3] = 0 + J * 4, X.indices[J * 6 + 4] = 2 + J * 4, X.indices[J * 6 + 5] = 3 + J * 4, X.vertices[J * 8 + 0] = j, X.vertices[J * 8 + 1] = Z, X.vertices[J * 8 + 2] = j + lt.width * n, X.vertices[J * 8 + 3] = Z, X.vertices[J * 8 + 4] = j + lt.width * n, X.vertices[J * 8 + 5] = Z + lt.height * n, X.vertices[J * 8 + 6] = j, X.vertices[J * 8 + 7] = Z + lt.height * n, X.uvs[J * 8 + 0] = ht.x0, X.uvs[J * 8 + 1] = ht.y0, X.uvs[J * 8 + 2] = ht.x1, X.uvs[J * 8 + 3] = ht.y1, X.uvs[J * 8 + 4] = ht.x2, X.uvs[J * 8 + 5] = ht.y2, X.uvs[J * 8 + 6] = ht.x3, X.uvs[J * 8 + 7] = ht.y3;
    }
    this._textWidth = v * n, this._textHeight = (a.y + i.lineHeight) * n;
    for (var x in A) {
      var I = A[x];
      if (this.anchor.x !== 0 || this.anchor.y !== 0)
        for (var jt = 0, He = this._textWidth * this.anchor.x, $r = this._textHeight * this.anchor.y, za = 0; za < I.total; za++)
          I.vertices[jt++] -= He, I.vertices[jt++] -= $r, I.vertices[jt++] -= He, I.vertices[jt++] -= $r, I.vertices[jt++] -= He, I.vertices[jt++] -= $r, I.vertices[jt++] -= He, I.vertices[jt++] -= $r;
      this._maxLineHeight = T * n;
      var Wa = I.mesh.geometry.getBuffer("aVertexPosition"), $a = I.mesh.geometry.getBuffer("aTextureCoord"), qa = I.mesh.geometry.getIndex();
      Wa.data = I.vertices, $a.data = I.uvs, qa.data = I.indices, Wa.update(), $a.update(), qa.update();
    }
    for (var x = 0; x < s.length; x++)
      Go.push(s[x]);
  }, r.prototype.updateTransform = function() {
    this.validate(), this.containerUpdateTransform();
  }, r.prototype._render = function(e) {
    this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0);
    var i = $e.available[this._fontName], n = i.distanceFieldRange, a = i.distanceFieldType, s = i.size;
    if (a !== "none")
      for (var o = this.worldTransform, h = o.a, u = o.b, l = o.c, f = o.d, c = Math.sqrt(h * h + u * u), d = Math.sqrt(l * l + f * f), p = (Math.abs(c) + Math.abs(d)) / 2, v = this._fontSize / s, _ = 0, m = this._activePagesMeshData; _ < m.length; _++) {
        var y = m[_];
        y.mesh.shader.uniforms.uFWidth = Math.min(p * n * v * this._resolution, 1);
      }
    t.prototype._render.call(this, e);
  }, r.prototype.getLocalBounds = function() {
    return this.validate(), t.prototype.getLocalBounds.call(this);
  }, r.prototype.validate = function() {
    this.dirty && (this.updateText(), this.dirty = !1);
  }, Object.defineProperty(r.prototype, "tint", {
    get: function() {
      return this._tint;
    },
    set: function(e) {
      if (this._tint !== e) {
        this._tint = e;
        for (var i = 0; i < this._activePagesMeshData.length; i++)
          this._activePagesMeshData[i].mesh.tint = e;
      }
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "align", {
    get: function() {
      return this._align;
    },
    set: function(e) {
      this._align !== e && (this._align = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "fontName", {
    get: function() {
      return this._fontName;
    },
    set: function(e) {
      if (!$e.available[e])
        throw new Error('Missing BitmapFont "' + e + '"');
      this._fontName !== e && (this._fontName = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "fontSize", {
    get: function() {
      return this._fontSize;
    },
    set: function(e) {
      this._fontSize !== e && (this._fontSize = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "anchor", {
    get: function() {
      return this._anchor;
    },
    set: function(e) {
      typeof e == "number" ? this._anchor.set(e) : this._anchor.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "text", {
    get: function() {
      return this._text;
    },
    set: function(e) {
      e = String(e == null ? "" : e), this._text !== e && (this._text = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "maxWidth", {
    get: function() {
      return this._maxWidth;
    },
    set: function(e) {
      this._maxWidth !== e && (this._maxWidth = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "maxLineHeight", {
    get: function() {
      return this.validate(), this._maxLineHeight;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "textWidth", {
    get: function() {
      return this.validate(), this._textWidth;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "letterSpacing", {
    get: function() {
      return this._letterSpacing;
    },
    set: function(e) {
      this._letterSpacing !== e && (this._letterSpacing = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "roundPixels", {
    get: function() {
      return this._roundPixels;
    },
    set: function(e) {
      e !== this._roundPixels && (this._roundPixels = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "textHeight", {
    get: function() {
      return this.validate(), this._textHeight;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "resolution", {
    get: function() {
      return this._resolution;
    },
    set: function(e) {
      this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.destroy = function(e) {
    var i = this._textureCache;
    for (var n in i) {
      var a = i[n];
      a.destroy(), delete i[n];
    }
    this._textureCache = null, t.prototype.destroy.call(this, e);
  }, r.styleDefaults = {
    align: "left",
    tint: 16777215,
    maxWidth: 0,
    letterSpacing: 0
  }, r;
})(gt);
var M_ = function() {
  function t() {
  }
  return t.add = function() {
    _t.setExtensionXhrType("fnt", _t.XHR_RESPONSE_TYPE.TEXT);
  }, t.use = function(r, e) {
    var i = rl(r.data);
    if (!i) {
      e();
      return;
    }
    for (var n = t.getBaseUrl(this, r), a = i.parse(r.data), s = {}, o = function(v) {
      s[v.metadata.pageFile] = v.texture, Object.keys(s).length === a.page.length && (r.bitmapFont = $e.install(a, s, !0), e());
    }, h = 0; h < a.page.length; ++h) {
      var u = a.page[h].file, l = n + u, f = !1;
      for (var c in this.resources) {
        var d = this.resources[c];
        if (d.url === l) {
          d.metadata.pageFile = u, d.texture ? o(d) : d.onAfterMiddleware.add(o), f = !0;
          break;
        }
      }
      if (!f) {
        var p = {
          crossOrigin: r.crossOrigin,
          loadType: _t.LOAD_TYPE.IMAGE,
          metadata: Object.assign({ pageFile: u }, r.metadata.imageMetadata),
          parentResource: r
        };
        this.add(l, p, o);
      }
    }
  }, t.getBaseUrl = function(r, e) {
    var i = e.isDataUrl ? "" : t.dirname(e.url);
    return e.isDataUrl && (i === "." && (i = ""), r.baseUrl && i && r.baseUrl.charAt(r.baseUrl.length - 1) === "/" && (i += "/")), i = i.replace(r.baseUrl, ""), i && i.charAt(i.length - 1) !== "/" && (i += "/"), i;
  }, t.dirname = function(r) {
    var e = r.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
    return e === r ? "." : e === "" ? "/" : e;
  }, t.extension = ot.Loader, t;
}();
/*!
 * @pixi/filter-alpha - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-alpha is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var va = function(t, r) {
  return va = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, va(t, r);
};
function D_(t, r) {
  va(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var k_ = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`;
(function(t) {
  D_(r, t);
  function r(e) {
    e === void 0 && (e = 1);
    var i = t.call(this, Sv, k_, { uAlpha: 1 }) || this;
    return i.alpha = e, i;
  }
  return Object.defineProperty(r.prototype, "alpha", {
    get: function() {
      return this.uniforms.uAlpha;
    },
    set: function(e) {
      this.uniforms.uAlpha = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ce);
/*!
 * @pixi/filter-blur - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var _a = function(t, r) {
  return _a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, _a(t, r);
};
function nl(t, r) {
  _a(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var H_ = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function X_(t, r) {
  var e = Math.ceil(t / 2), i = H_, n = "", a;
  r ? a = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : a = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (var s = 0; s < t; s++) {
    var o = a.replace("%index%", s.toString());
    o = o.replace("%sampleIndex%", s - (e - 1) + ".0"), n += o, n += `
`;
  }
  return i = i.replace("%blur%", n), i = i.replace("%size%", t.toString()), i;
}
var V_ = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
}, j_ = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join(`
`);
function z_(t) {
  for (var r = V_[t], e = r.length, i = j_, n = "", a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", s, o = 0; o < t; o++) {
    var h = a.replace("%index%", o.toString());
    s = o, o >= e && (s = t - o - 1), h = h.replace("%value%", r[s].toString()), n += h, n += `
`;
  }
  return i = i.replace("%blur%", n), i = i.replace("%size%", t.toString()), i;
}
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Bo;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(Bo || (Bo = {}));
var Mo;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Mo || (Mo = {}));
var Do;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Do || (Do = {}));
var ko;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(ko || (ko = {}));
var Ho;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Ho || (Ho = {}));
var Xo;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Xo || (Xo = {}));
var Vo;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(Vo || (Vo = {}));
var jo;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(jo || (jo = {}));
var zo;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(zo || (zo = {}));
var Wo;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Wo || (Wo = {}));
var $o;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})($o || ($o = {}));
var qo;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(qo || (qo = {}));
var Yo;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Yo || (Yo = {}));
var Gr;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(Gr || (Gr = {}));
var Zo;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(Zo || (Zo = {}));
var Jo;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Jo || (Jo = {}));
var Ko;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(Ko || (Ko = {}));
var Qo;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(Qo || (Qo = {}));
var th;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(th || (th = {}));
var eh;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(eh || (eh = {}));
var rh = function(t) {
  nl(r, t);
  function r(e, i, n, a, s) {
    i === void 0 && (i = 8), n === void 0 && (n = 4), a === void 0 && (a = O.FILTER_RESOLUTION), s === void 0 && (s = 5);
    var o = this, h = X_(s, e), u = z_(s);
    return o = t.call(
      this,
      h,
      u
    ) || this, o.horizontal = e, o.resolution = a, o._quality = 0, o.quality = n, o.blur = i, o;
  }
  return r.prototype.apply = function(e, i, n, a) {
    if (n ? this.horizontal ? this.uniforms.strength = 1 / n.width * (n.width / i.width) : this.uniforms.strength = 1 / n.height * (n.height / i.height) : this.horizontal ? this.uniforms.strength = 1 / e.renderer.width * (e.renderer.width / i.width) : this.uniforms.strength = 1 / e.renderer.height * (e.renderer.height / i.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
      e.applyFilter(this, i, n, a);
    else {
      var s = e.getFilterTexture(), o = e.renderer, h = i, u = s;
      this.state.blend = !1, e.applyFilter(this, h, u, Gr.CLEAR);
      for (var l = 1; l < this.passes - 1; l++) {
        e.bindAndClear(h, Gr.BLIT), this.uniforms.uSampler = u;
        var f = u;
        u = h, h = f, o.shader.bind(this), o.geometry.draw(5);
      }
      this.state.blend = !0, e.applyFilter(this, u, n, a), e.returnFilterTexture(s);
    }
  }, Object.defineProperty(r.prototype, "blur", {
    get: function() {
      return this.strength;
    },
    set: function(e) {
      this.padding = 1 + Math.abs(e) * 2, this.strength = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "quality", {
    get: function() {
      return this._quality;
    },
    set: function(e) {
      this._quality = e, this.passes = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(ce);
(function(t) {
  nl(r, t);
  function r(e, i, n, a) {
    e === void 0 && (e = 8), i === void 0 && (i = 4), n === void 0 && (n = O.FILTER_RESOLUTION), a === void 0 && (a = 5);
    var s = t.call(this) || this;
    return s.blurXFilter = new rh(!0, e, i, n, a), s.blurYFilter = new rh(!1, e, i, n, a), s.resolution = n, s.quality = i, s.blur = e, s.repeatEdgePixels = !1, s;
  }
  return r.prototype.apply = function(e, i, n, a) {
    var s = Math.abs(this.blurXFilter.strength), o = Math.abs(this.blurYFilter.strength);
    if (s && o) {
      var h = e.getFilterTexture();
      this.blurXFilter.apply(e, i, h, Gr.CLEAR), this.blurYFilter.apply(e, h, n, a), e.returnFilterTexture(h);
    } else
      o ? this.blurYFilter.apply(e, i, n, a) : this.blurXFilter.apply(e, i, n, a);
  }, r.prototype.updatePadding = function() {
    this._repeatEdgePixels ? this.padding = 0 : this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
  }, Object.defineProperty(r.prototype, "blur", {
    get: function() {
      return this.blurXFilter.blur;
    },
    set: function(e) {
      this.blurXFilter.blur = this.blurYFilter.blur = e, this.updatePadding();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "quality", {
    get: function() {
      return this.blurXFilter.quality;
    },
    set: function(e) {
      this.blurXFilter.quality = this.blurYFilter.quality = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "blurX", {
    get: function() {
      return this.blurXFilter.blur;
    },
    set: function(e) {
      this.blurXFilter.blur = e, this.updatePadding();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "blurY", {
    get: function() {
      return this.blurYFilter.blur;
    },
    set: function(e) {
      this.blurYFilter.blur = e, this.updatePadding();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "blendMode", {
    get: function() {
      return this.blurYFilter.blendMode;
    },
    set: function(e) {
      this.blurYFilter.blendMode = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "repeatEdgePixels", {
    get: function() {
      return this._repeatEdgePixels;
    },
    set: function(e) {
      this._repeatEdgePixels = e, this.updatePadding();
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ce);
/*!
 * @pixi/filter-color-matrix - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-color-matrix is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ma = function(t, r) {
  return ma = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ma(t, r);
};
function W_(t, r) {
  ma(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var $_ = `varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`, ih = function(t) {
  W_(r, t);
  function r() {
    var e = this, i = {
      m: new Float32Array([
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ]),
      uAlpha: 1
    };
    return e = t.call(this, ju, $_, i) || this, e.alpha = 1, e;
  }
  return r.prototype._loadMatrix = function(e, i) {
    i === void 0 && (i = !1);
    var n = e;
    i && (this._multiply(n, this.uniforms.m, e), n = this._colorMatrix(n)), this.uniforms.m = n;
  }, r.prototype._multiply = function(e, i, n) {
    return e[0] = i[0] * n[0] + i[1] * n[5] + i[2] * n[10] + i[3] * n[15], e[1] = i[0] * n[1] + i[1] * n[6] + i[2] * n[11] + i[3] * n[16], e[2] = i[0] * n[2] + i[1] * n[7] + i[2] * n[12] + i[3] * n[17], e[3] = i[0] * n[3] + i[1] * n[8] + i[2] * n[13] + i[3] * n[18], e[4] = i[0] * n[4] + i[1] * n[9] + i[2] * n[14] + i[3] * n[19] + i[4], e[5] = i[5] * n[0] + i[6] * n[5] + i[7] * n[10] + i[8] * n[15], e[6] = i[5] * n[1] + i[6] * n[6] + i[7] * n[11] + i[8] * n[16], e[7] = i[5] * n[2] + i[6] * n[7] + i[7] * n[12] + i[8] * n[17], e[8] = i[5] * n[3] + i[6] * n[8] + i[7] * n[13] + i[8] * n[18], e[9] = i[5] * n[4] + i[6] * n[9] + i[7] * n[14] + i[8] * n[19] + i[9], e[10] = i[10] * n[0] + i[11] * n[5] + i[12] * n[10] + i[13] * n[15], e[11] = i[10] * n[1] + i[11] * n[6] + i[12] * n[11] + i[13] * n[16], e[12] = i[10] * n[2] + i[11] * n[7] + i[12] * n[12] + i[13] * n[17], e[13] = i[10] * n[3] + i[11] * n[8] + i[12] * n[13] + i[13] * n[18], e[14] = i[10] * n[4] + i[11] * n[9] + i[12] * n[14] + i[13] * n[19] + i[14], e[15] = i[15] * n[0] + i[16] * n[5] + i[17] * n[10] + i[18] * n[15], e[16] = i[15] * n[1] + i[16] * n[6] + i[17] * n[11] + i[18] * n[16], e[17] = i[15] * n[2] + i[16] * n[7] + i[17] * n[12] + i[18] * n[17], e[18] = i[15] * n[3] + i[16] * n[8] + i[17] * n[13] + i[18] * n[18], e[19] = i[15] * n[4] + i[16] * n[9] + i[17] * n[14] + i[18] * n[19] + i[19], e;
  }, r.prototype._colorMatrix = function(e) {
    var i = new Float32Array(e);
    return i[4] /= 255, i[9] /= 255, i[14] /= 255, i[19] /= 255, i;
  }, r.prototype.brightness = function(e, i) {
    var n = [
      e,
      0,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(n, i);
  }, r.prototype.tint = function(e, i) {
    var n = e >> 16 & 255, a = e >> 8 & 255, s = e & 255, o = [
      n / 255,
      0,
      0,
      0,
      0,
      0,
      a / 255,
      0,
      0,
      0,
      0,
      0,
      s / 255,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(o, i);
  }, r.prototype.greyscale = function(e, i) {
    var n = [
      e,
      e,
      e,
      0,
      0,
      e,
      e,
      e,
      0,
      0,
      e,
      e,
      e,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(n, i);
  }, r.prototype.blackAndWhite = function(e) {
    var i = [
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.hue = function(e, i) {
    e = (e || 0) / 180 * Math.PI;
    var n = Math.cos(e), a = Math.sin(e), s = Math.sqrt, o = 1 / 3, h = s(o), u = n + (1 - n) * o, l = o * (1 - n) - h * a, f = o * (1 - n) + h * a, c = o * (1 - n) + h * a, d = n + o * (1 - n), p = o * (1 - n) - h * a, v = o * (1 - n) - h * a, _ = o * (1 - n) + h * a, m = n + o * (1 - n), y = [
      u,
      l,
      f,
      0,
      0,
      c,
      d,
      p,
      0,
      0,
      v,
      _,
      m,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(y, i);
  }, r.prototype.contrast = function(e, i) {
    var n = (e || 0) + 1, a = -0.5 * (n - 1), s = [
      n,
      0,
      0,
      0,
      a,
      0,
      n,
      0,
      0,
      a,
      0,
      0,
      n,
      0,
      a,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(s, i);
  }, r.prototype.saturate = function(e, i) {
    e === void 0 && (e = 0);
    var n = e * 2 / 3 + 1, a = (n - 1) * -0.5, s = [
      n,
      a,
      a,
      0,
      0,
      a,
      n,
      a,
      0,
      0,
      a,
      a,
      n,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(s, i);
  }, r.prototype.desaturate = function() {
    this.saturate(-1);
  }, r.prototype.negative = function(e) {
    var i = [
      -1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.sepia = function(e) {
    var i = [
      0.393,
      0.7689999,
      0.18899999,
      0,
      0,
      0.349,
      0.6859999,
      0.16799999,
      0,
      0,
      0.272,
      0.5339999,
      0.13099999,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.technicolor = function(e) {
    var i = [
      1.9125277891456083,
      -0.8545344976951645,
      -0.09155508482755585,
      0,
      11.793603434377337,
      -0.3087833385928097,
      1.7658908555458428,
      -0.10601743074722245,
      0,
      -70.35205161461398,
      -0.231103377548616,
      -0.7501899197440212,
      1.847597816108189,
      0,
      30.950940869491138,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.polaroid = function(e) {
    var i = [
      1.438,
      -0.062,
      -0.062,
      0,
      0,
      -0.122,
      1.378,
      -0.122,
      0,
      0,
      -0.016,
      -0.016,
      1.483,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.toBGR = function(e) {
    var i = [
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.kodachrome = function(e) {
    var i = [
      1.1285582396593525,
      -0.3967382283601348,
      -0.03992559172921793,
      0,
      63.72958762196502,
      -0.16404339962244616,
      1.0835251566291304,
      -0.05498805115633132,
      0,
      24.732407896706203,
      -0.16786010706155763,
      -0.5603416277695248,
      1.6014850761964943,
      0,
      35.62982807460946,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.browni = function(e) {
    var i = [
      0.5997023498159715,
      0.34553243048391263,
      -0.2708298674538042,
      0,
      47.43192855600873,
      -0.037703249837783157,
      0.8609577587992641,
      0.15059552388459913,
      0,
      -36.96841498319127,
      0.24113635128153335,
      -0.07441037908422492,
      0.44972182064877153,
      0,
      -7.562075277591283,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.vintage = function(e) {
    var i = [
      0.6279345635605994,
      0.3202183420819367,
      -0.03965408211312453,
      0,
      9.651285835294123,
      0.02578397704808868,
      0.6441188644374771,
      0.03259127616149294,
      0,
      7.462829176470591,
      0.0466055556782719,
      -0.0851232987247891,
      0.5241648018700465,
      0,
      5.159190588235296,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.colorTone = function(e, i, n, a, s) {
    e = e || 0.2, i = i || 0.15, n = n || 16770432, a = a || 3375104;
    var o = (n >> 16 & 255) / 255, h = (n >> 8 & 255) / 255, u = (n & 255) / 255, l = (a >> 16 & 255) / 255, f = (a >> 8 & 255) / 255, c = (a & 255) / 255, d = [
      0.3,
      0.59,
      0.11,
      0,
      0,
      o,
      h,
      u,
      e,
      0,
      l,
      f,
      c,
      i,
      0,
      o - l,
      h - f,
      u - c,
      0,
      0
    ];
    this._loadMatrix(d, s);
  }, r.prototype.night = function(e, i) {
    e = e || 0.1;
    var n = [
      e * -2,
      -e,
      0,
      0,
      0,
      -e,
      0,
      e,
      0,
      0,
      0,
      e,
      e * 2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(n, i);
  }, r.prototype.predator = function(e, i) {
    var n = [
      11.224130630493164 * e,
      -4.794486999511719 * e,
      -2.8746118545532227 * e,
      0 * e,
      0.40342438220977783 * e,
      -3.6330697536468506 * e,
      9.193157196044922 * e,
      -2.951810836791992 * e,
      0 * e,
      -1.316135048866272 * e,
      -3.2184197902679443 * e,
      -4.2375030517578125 * e,
      7.476448059082031 * e,
      0 * e,
      0.8044459223747253 * e,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(n, i);
  }, r.prototype.lsd = function(e) {
    var i = [
      2,
      -0.4,
      0.5,
      0,
      0,
      -0.5,
      2,
      -0.4,
      0,
      0,
      -0.4,
      -0.5,
      3,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, e);
  }, r.prototype.reset = function() {
    var e = [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(e, !1);
  }, Object.defineProperty(r.prototype, "matrix", {
    get: function() {
      return this.uniforms.m;
    },
    set: function(e) {
      this.uniforms.m = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "alpha", {
    get: function() {
      return this.uniforms.uAlpha;
    },
    set: function(e) {
      this.uniforms.uAlpha = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
}(ce);
ih.prototype.grayscale = ih.prototype.greyscale;
/*!
 * @pixi/filter-displacement - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-displacement is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ya = function(t, r) {
  return ya = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ya(t, r);
};
function q_(t, r) {
  ya(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Y_ = `varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`, Z_ = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;
(function(t) {
  q_(r, t);
  function r(e, i) {
    var n = this, a = new ft();
    return e.renderable = !1, n = t.call(this, Z_, Y_, {
      mapSampler: e._texture,
      filterMatrix: a,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    }) || this, n.maskSprite = e, n.maskMatrix = a, i == null && (i = 20), n.scale = new $(i, i), n;
  }
  return r.prototype.apply = function(e, i, n, a) {
    this.uniforms.filterMatrix = e.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
    var s = this.maskSprite.worldTransform, o = Math.sqrt(s.a * s.a + s.b * s.b), h = Math.sqrt(s.c * s.c + s.d * s.d);
    o !== 0 && h !== 0 && (this.uniforms.rotation[0] = s.a / o, this.uniforms.rotation[1] = s.b / o, this.uniforms.rotation[2] = s.c / h, this.uniforms.rotation[3] = s.d / h), e.applyFilter(this, i, n, a);
  }, Object.defineProperty(r.prototype, "map", {
    get: function() {
      return this.uniforms.mapSampler;
    },
    set: function(e) {
      this.uniforms.mapSampler = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ce);
/*!
 * @pixi/filter-fxaa - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-fxaa is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var xa = function(t, r) {
  return xa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, xa(t, r);
};
function J_(t, r) {
  xa(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var K_ = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`, Q_ = `varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`;
(function(t) {
  J_(r, t);
  function r() {
    return t.call(this, K_, Q_) || this;
  }
  return r;
})(ce);
/*!
 * @pixi/filter-noise - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/filter-noise is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ga = function(t, r) {
  return ga = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, ga(t, r);
};
function tm(t, r) {
  ga(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var em = `precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`;
(function(t) {
  tm(r, t);
  function r(e, i) {
    e === void 0 && (e = 0.5), i === void 0 && (i = Math.random());
    var n = t.call(this, ju, em, {
      uNoise: 0,
      uSeed: 0
    }) || this;
    return n.noise = e, n.seed = i, n;
  }
  return Object.defineProperty(r.prototype, "noise", {
    get: function() {
      return this.uniforms.uNoise;
    },
    set: function(e) {
      this.uniforms.uNoise = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "seed", {
    get: function() {
      return this.uniforms.uSeed;
    },
    set: function(e) {
      this.uniforms.uSeed = e;
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ce);
/*!
 * @pixi/mixin-cache-as-bitmap - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/mixin-cache-as-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var nh;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(nh || (nh = {}));
var ah;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(ah || (ah = {}));
var sh;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(sh || (sh = {}));
var oh;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(oh || (oh = {}));
var hh;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(hh || (hh = {}));
var uh;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(uh || (uh = {}));
var lh;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(lh || (lh = {}));
var fh;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(fh || (fh = {}));
var ch;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(ch || (ch = {}));
var dh;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(dh || (dh = {}));
var ph;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(ph || (ph = {}));
var vh;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(vh || (vh = {}));
var _h;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(_h || (_h = {}));
var mh;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(mh || (mh = {}));
var yh;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(yh || (yh = {}));
var xh;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(xh || (xh = {}));
var gh;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(gh || (gh = {}));
var bh;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(bh || (bh = {}));
var ba;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(ba || (ba = {}));
var Th;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Th || (Th = {}));
var al = new ft();
yt.prototype._cacheAsBitmap = !1;
yt.prototype._cacheData = null;
yt.prototype._cacheAsBitmapResolution = null;
yt.prototype._cacheAsBitmapMultisample = ba.NONE;
var rm = function() {
  function t() {
    this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
  }
  return t;
}();
Object.defineProperties(yt.prototype, {
  cacheAsBitmapResolution: {
    get: function() {
      return this._cacheAsBitmapResolution;
    },
    set: function(t) {
      t !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  cacheAsBitmapMultisample: {
    get: function() {
      return this._cacheAsBitmapMultisample;
    },
    set: function(t) {
      t !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  cacheAsBitmap: {
    get: function() {
      return this._cacheAsBitmap;
    },
    set: function(t) {
      if (this._cacheAsBitmap !== t) {
        this._cacheAsBitmap = t;
        var r;
        t ? (this._cacheData || (this._cacheData = new rm()), r = this._cacheData, r.originalRender = this.render, r.originalRenderCanvas = this.renderCanvas, r.originalUpdateTransform = this.updateTransform, r.originalCalculateBounds = this.calculateBounds, r.originalGetLocalBounds = this.getLocalBounds, r.originalDestroy = this.destroy, r.originalContainsPoint = this.containsPoint, r.originalMask = this._mask, r.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (r = this._cacheData, r.sprite && this._destroyCachedDisplayObject(), this.render = r.originalRender, this.renderCanvas = r.originalRenderCanvas, this.calculateBounds = r.originalCalculateBounds, this.getLocalBounds = r.originalGetLocalBounds, this.destroy = r.originalDestroy, this.updateTransform = r.originalUpdateTransform, this.containsPoint = r.originalContainsPoint, this._mask = r.originalMask, this.filterArea = r.originalFilterArea);
      }
    }
  }
});
yt.prototype._renderCached = function(r) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(r), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(r));
};
yt.prototype._initCachedDisplayObject = function(r) {
  var e;
  if (!(this._cacheData && this._cacheData.sprite)) {
    var i = this.alpha;
    this.alpha = 1, r.batch.flush();
    var n = this.getLocalBounds(null, !0).clone();
    if (this.filters && this.filters.length) {
      var a = this.filters[0].padding;
      n.pad(a);
    }
    n.ceil(O.RESOLUTION);
    var s = r.renderTexture.current, o = r.renderTexture.sourceFrame.clone(), h = r.renderTexture.destinationFrame.clone(), u = r.projection.transform, l = Le.create({
      width: n.width,
      height: n.height,
      resolution: this.cacheAsBitmapResolution || r.resolution,
      multisample: (e = this.cacheAsBitmapMultisample) !== null && e !== void 0 ? e : r.multisample
    }), f = "cacheAsBitmap_" + Fe();
    this._cacheData.textureCacheId = f, et.addToCache(l.baseTexture, f), z.addToCache(l, f);
    var c = this.transform.localTransform.copyTo(al).invert().translate(-n.x, -n.y);
    this.render = this._cacheData.originalRender, r.render(this, { renderTexture: l, clear: !0, transform: c, skipUpdateTransform: !1 }), r.framebuffer.blit(), r.projection.transform = u, r.renderTexture.bind(s, o, h), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = i;
    var d = new Vt(l);
    d.transform.worldTransform = this.transform.worldTransform, d.anchor.x = -(n.x / n.width), d.anchor.y = -(n.y / n.height), d.alpha = i, d._bounds = this._bounds, this._cacheData.sprite = d, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = d.containsPoint.bind(d);
  }
};
yt.prototype._renderCachedCanvas = function(r) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(r), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(r));
};
yt.prototype._initCachedDisplayObjectCanvas = function(r) {
  if (!(this._cacheData && this._cacheData.sprite)) {
    var e = this.getLocalBounds(null, !0), i = this.alpha;
    this.alpha = 1;
    var n = r.context, a = r._projTransform;
    e.ceil(O.RESOLUTION);
    var s = Le.create({ width: e.width, height: e.height }), o = "cacheAsBitmap_" + Fe();
    this._cacheData.textureCacheId = o, et.addToCache(s.baseTexture, o), z.addToCache(s, o);
    var h = al;
    this.transform.localTransform.copyTo(h), h.invert(), h.tx -= e.x, h.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, r.render(this, { renderTexture: s, clear: !0, transform: h, skipUpdateTransform: !1 }), r.context = n, r._projTransform = a, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = i;
    var u = new Vt(s);
    u.transform.worldTransform = this.transform.worldTransform, u.anchor.x = -(e.x / e.width), u.anchor.y = -(e.y / e.height), u.alpha = i, u._bounds = this._bounds, this._cacheData.sprite = u, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = r._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = u.containsPoint.bind(u);
  }
};
yt.prototype._calculateCachedBounds = function() {
  this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
};
yt.prototype._getCachedLocalBounds = function() {
  return this._cacheData.sprite.getLocalBounds(null);
};
yt.prototype._destroyCachedDisplayObject = function() {
  this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, et.removeFromCache(this._cacheData.textureCacheId), z.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
};
yt.prototype._cacheAsBitmapDestroy = function(r) {
  this.cacheAsBitmap = !1, this.destroy(r);
};
/*!
 * @pixi/mixin-get-child-by-name - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
yt.prototype.name = null;
gt.prototype.getChildByName = function(r, e) {
  for (var i = 0, n = this.children.length; i < n; i++)
    if (this.children[i].name === r)
      return this.children[i];
  if (e)
    for (var i = 0, n = this.children.length; i < n; i++) {
      var a = this.children[i];
      if (!!a.getChildByName) {
        var s = a.getChildByName(r, !0);
        if (s)
          return s;
      }
    }
  return null;
};
/*!
 * @pixi/mixin-get-global-position - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/mixin-get-global-position is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
yt.prototype.getGlobalPosition = function(r, e) {
  return r === void 0 && (r = new $()), e === void 0 && (e = !1), this.parent ? this.parent.toGlobal(this.position, r, e) : (r.x = this.position.x, r.y = this.position.y), r;
};
/*!
 * @pixi/app - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/app is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var im = function() {
  function t() {
  }
  return t.init = function(r) {
    var e = this;
    Object.defineProperty(
      this,
      "resizeTo",
      {
        set: function(i) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = i, i && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get: function() {
          return this._resizeTo;
        }
      }
    ), this.queueResize = function() {
      !e._resizeTo || (e.cancelResize(), e._resizeId = requestAnimationFrame(function() {
        return e.resize();
      }));
    }, this.cancelResize = function() {
      e._resizeId && (cancelAnimationFrame(e._resizeId), e._resizeId = null);
    }, this.resize = function() {
      if (!!e._resizeTo) {
        e.cancelResize();
        var i, n;
        if (e._resizeTo === globalThis.window)
          i = globalThis.innerWidth, n = globalThis.innerHeight;
        else {
          var a = e._resizeTo, s = a.clientWidth, o = a.clientHeight;
          i = s, n = o;
        }
        e.renderer.resize(i, n);
      }
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = r.resizeTo || null;
  }, t.destroy = function() {
    globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }, t.extension = ot.Application, t;
}();
/*!
 * @pixi/settings - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ih;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(Ih || (Ih = {}));
var Eh;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Eh || (Eh = {}));
var wh;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(wh || (wh = {}));
var Rh;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(Rh || (Rh = {}));
var Ch;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Ch || (Ch = {}));
var Nh;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Nh || (Nh = {}));
var Ah;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(Ah || (Ah = {}));
var Ph;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(Ph || (Ph = {}));
var Uh;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(Uh || (Uh = {}));
var Ta;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Ta || (Ta = {}));
var Ia;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Ia || (Ia = {}));
var Ea;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(Ea || (Ea = {}));
var Oh;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Oh || (Oh = {}));
var Fh;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(Fh || (Fh = {}));
var wa;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(wa || (wa = {}));
var Er;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Er || (Er = {}));
var Lh;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(Lh || (Lh = {}));
var Sh;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(Sh || (Sh = {}));
var Ra;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Ra || (Ra = {}));
var Gh;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Gh || (Gh = {}));
var nm = {
  createCanvas: function(t, r) {
    var e = document.createElement("canvas");
    return e.width = t, e.height = r, e;
  },
  getWebGLRenderingContext: function() {
    return WebGLRenderingContext;
  },
  getNavigator: function() {
    return navigator;
  },
  getBaseUrl: function() {
    var t;
    return (t = document.baseURI) !== null && t !== void 0 ? t : window.location.href;
  },
  fetch: function(t, r) {
    return fetch(t, r);
  }
}, Rn = /iPhone/i, Bh = /iPod/i, Mh = /iPad/i, Dh = /\biOS-universal(?:.+)Mac\b/i, Cn = /\bAndroid(?:.+)Mobile\b/i, kh = /Android/i, We = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, mi = /Silk/i, ne = /Windows Phone/i, Hh = /\bWindows(?:.+)ARM\b/i, Xh = /BlackBerry/i, Vh = /BB10/i, jh = /Opera Mini/i, zh = /\b(CriOS|Chrome)(?:.+)Mobile/i, Wh = /Mobile(?:.+)Firefox\b/i, $h = function(t) {
  return typeof t < "u" && t.platform === "MacIntel" && typeof t.maxTouchPoints == "number" && t.maxTouchPoints > 1 && typeof MSStream > "u";
};
function am(t) {
  return function(r) {
    return r.test(t);
  };
}
function sm(t) {
  var r = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !t && typeof navigator < "u" ? r = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof t == "string" ? r.userAgent = t : t && t.userAgent && (r = {
    userAgent: t.userAgent,
    platform: t.platform,
    maxTouchPoints: t.maxTouchPoints || 0
  });
  var e = r.userAgent, i = e.split("[FBAN");
  typeof i[1] < "u" && (e = i[0]), i = e.split("Twitter"), typeof i[1] < "u" && (e = i[0]);
  var n = am(e), a = {
    apple: {
      phone: n(Rn) && !n(ne),
      ipod: n(Bh),
      tablet: !n(Rn) && (n(Mh) || $h(r)) && !n(ne),
      universal: n(Dh),
      device: (n(Rn) || n(Bh) || n(Mh) || n(Dh) || $h(r)) && !n(ne)
    },
    amazon: {
      phone: n(We),
      tablet: !n(We) && n(mi),
      device: n(We) || n(mi)
    },
    android: {
      phone: !n(ne) && n(We) || !n(ne) && n(Cn),
      tablet: !n(ne) && !n(We) && !n(Cn) && (n(mi) || n(kh)),
      device: !n(ne) && (n(We) || n(mi) || n(Cn) || n(kh)) || n(/\bokhttp\b/i)
    },
    windows: {
      phone: n(ne),
      tablet: n(Hh),
      device: n(ne) || n(Hh)
    },
    other: {
      blackberry: n(Xh),
      blackberry10: n(Vh),
      opera: n(jh),
      firefox: n(Wh),
      chrome: n(zh),
      device: n(Xh) || n(Vh) || n(jh) || n(Wh) || n(zh)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return a.any = a.apple.device || a.android.device || a.windows.device || a.other.device, a.phone = a.apple.phone || a.android.phone || a.windows.phone, a.tablet = a.apple.tablet || a.android.tablet || a.windows.tablet, a;
}
var Je = sm(globalThis.navigator);
function om() {
  return !Je.apple.device;
}
function hm(t) {
  var r = !0;
  if (Je.tablet || Je.phone) {
    if (Je.apple.device) {
      var e = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (e) {
        var i = parseInt(e[1], 10);
        i < 11 && (r = !1);
      }
    }
    if (Je.android.device) {
      var e = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (e) {
        var i = parseInt(e[1], 10);
        i < 7 && (r = !1);
      }
    }
  }
  return r ? t : 4;
}
var Si = {
  ADAPTER: nm,
  MIPMAP_TEXTURES: Ea.POW2,
  ANISOTROPIC_LEVEL: 0,
  RESOLUTION: 1,
  FILTER_RESOLUTION: 1,
  FILTER_MULTISAMPLE: Ra.NONE,
  SPRITE_MAX_TEXTURES: hm(32),
  SPRITE_BATCH_SIZE: 4096,
  RENDER_OPTIONS: {
    view: null,
    antialias: !1,
    autoDensity: !1,
    backgroundColor: 0,
    backgroundAlpha: 1,
    useContextAlpha: !0,
    clearBeforeRender: !0,
    preserveDrawingBuffer: !1,
    width: 800,
    height: 600,
    legacy: !1
  },
  GC_MODE: wa.AUTO,
  GC_MAX_IDLE: 60 * 60,
  GC_MAX_CHECK_COUNT: 60 * 10,
  WRAP_MODE: Ia.CLAMP,
  SCALE_MODE: Ta.LINEAR,
  PRECISION_VERTEX: Er.HIGH,
  PRECISION_FRAGMENT: Je.apple.device ? Er.HIGH : Er.MEDIUM,
  CAN_UPLOAD_SAME_BUFFER: om(),
  CREATE_IMAGE_BITMAP: !1,
  ROUND_PIXELS: !1
}, Nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ma(t, r, e) {
  return e = {
    path: r,
    exports: {},
    require: function(i, n) {
      return um(i, n == null ? e.path : n);
    }
  }, t(e, e.exports), e.exports;
}
function um() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
Ma(function(t) {
  var r = Object.prototype.hasOwnProperty, e = "~";
  function i() {
  }
  Object.create && (i.prototype = /* @__PURE__ */ Object.create(null), new i().__proto__ || (e = !1));
  function n(h, u, l) {
    this.fn = h, this.context = u, this.once = l || !1;
  }
  function a(h, u, l, f, c) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var d = new n(l, f || h, c), p = e ? e + u : u;
    return h._events[p] ? h._events[p].fn ? h._events[p] = [h._events[p], d] : h._events[p].push(d) : (h._events[p] = d, h._eventsCount++), h;
  }
  function s(h, u) {
    --h._eventsCount === 0 ? h._events = new i() : delete h._events[u];
  }
  function o() {
    this._events = new i(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var u = [], l, f;
    if (this._eventsCount === 0)
      return u;
    for (f in l = this._events)
      r.call(l, f) && u.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(l)) : u;
  }, o.prototype.listeners = function(u) {
    var l = e ? e + u : u, f = this._events[l];
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var c = 0, d = f.length, p = new Array(d); c < d; c++)
      p[c] = f[c].fn;
    return p;
  }, o.prototype.listenerCount = function(u) {
    var l = e ? e + u : u, f = this._events[l];
    return f ? f.fn ? 1 : f.length : 0;
  }, o.prototype.emit = function(u, l, f, c, d, p) {
    var v = arguments, _ = e ? e + u : u;
    if (!this._events[_])
      return !1;
    var m = this._events[_], y = arguments.length, g, T;
    if (m.fn) {
      switch (m.once && this.removeListener(u, m.fn, void 0, !0), y) {
        case 1:
          return m.fn.call(m.context), !0;
        case 2:
          return m.fn.call(m.context, l), !0;
        case 3:
          return m.fn.call(m.context, l, f), !0;
        case 4:
          return m.fn.call(m.context, l, f, c), !0;
        case 5:
          return m.fn.call(m.context, l, f, c, d), !0;
        case 6:
          return m.fn.call(m.context, l, f, c, d, p), !0;
      }
      for (T = 1, g = new Array(y - 1); T < y; T++)
        g[T - 1] = v[T];
      m.fn.apply(m.context, g);
    } else {
      var b = m.length, x;
      for (T = 0; T < b; T++)
        switch (m[T].once && this.removeListener(u, m[T].fn, void 0, !0), y) {
          case 1:
            m[T].fn.call(m[T].context);
            break;
          case 2:
            m[T].fn.call(m[T].context, l);
            break;
          case 3:
            m[T].fn.call(m[T].context, l, f);
            break;
          case 4:
            m[T].fn.call(m[T].context, l, f, c);
            break;
          default:
            if (!g)
              for (x = 1, g = new Array(y - 1); x < y; x++)
                g[x - 1] = v[x];
            m[T].fn.apply(m[T].context, g);
        }
    }
    return !0;
  }, o.prototype.on = function(u, l, f) {
    return a(this, u, l, f, !1);
  }, o.prototype.once = function(u, l, f) {
    return a(this, u, l, f, !0);
  }, o.prototype.removeListener = function(u, l, f, c) {
    var d = e ? e + u : u;
    if (!this._events[d])
      return this;
    if (!l)
      return s(this, d), this;
    var p = this._events[d];
    if (p.fn)
      p.fn === l && (!c || p.once) && (!f || p.context === f) && s(this, d);
    else {
      for (var v = 0, _ = [], m = p.length; v < m; v++)
        (p[v].fn !== l || c && !p[v].once || f && p[v].context !== f) && _.push(p[v]);
      _.length ? this._events[d] = _.length === 1 ? _[0] : _ : s(this, d);
    }
    return this;
  }, o.prototype.removeAllListeners = function(u) {
    var l;
    return u ? (l = e ? e + u : u, this._events[l] && s(this, l)) : (this._events = new i(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = e, o.EventEmitter = o, t.exports = o;
});
Ma(function(t, r) {
  (function(e) {
    var i = r && !r.nodeType && r, n = t && !t.nodeType && t, a = typeof Nn == "object" && Nn;
    (a.global === a || a.window === a || a.self === a) && (e = a);
    var s, o = 2147483647, h = 36, u = 1, l = 26, f = 38, c = 700, d = 72, p = 128, v = "-", _ = /^xn--/, m = /[^\x20-\x7E]/, y = /[\x2E\u3002\uFF0E\uFF61]/g, g = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, T = h - u, b = Math.floor, x = String.fromCharCode, E;
    function C(I) {
      throw RangeError(g[I]);
    }
    function w(I, N) {
      for (var U = I.length, B = []; U--; )
        B[U] = N(I[U]);
      return B;
    }
    function R(I, N) {
      var U = I.split("@"), B = "";
      U.length > 1 && (B = U[0] + "@", I = U[1]), I = I.replace(y, ".");
      var H = I.split("."), Y = w(H, N).join(".");
      return B + Y;
    }
    function F(I) {
      for (var N = [], U = 0, B = I.length, H, Y; U < B; )
        H = I.charCodeAt(U++), H >= 55296 && H <= 56319 && U < B ? (Y = I.charCodeAt(U++), (Y & 64512) == 56320 ? N.push(((H & 1023) << 10) + (Y & 1023) + 65536) : (N.push(H), U--)) : N.push(H);
      return N;
    }
    function M(I) {
      return w(I, function(N) {
        var U = "";
        return N > 65535 && (N -= 65536, U += x(N >>> 10 & 1023 | 55296), N = 56320 | N & 1023), U += x(N), U;
      }).join("");
    }
    function k(I) {
      return I - 48 < 10 ? I - 22 : I - 65 < 26 ? I - 65 : I - 97 < 26 ? I - 97 : h;
    }
    function Q(I, N) {
      return I + 22 + 75 * (I < 26) - ((N != 0) << 5);
    }
    function A(I, N, U) {
      var B = 0;
      for (I = U ? b(I / c) : I >> 1, I += b(I / N); I > T * l >> 1; B += h)
        I = b(I / T);
      return b(B + (T + 1) * I / (I + f));
    }
    function L(I) {
      var N = [], U = I.length, B, H = 0, Y = p, V = d, tt, at, it, nt, j, Z, X, lt, ht;
      for (tt = I.lastIndexOf(v), tt < 0 && (tt = 0), at = 0; at < tt; ++at)
        I.charCodeAt(at) >= 128 && C("not-basic"), N.push(I.charCodeAt(at));
      for (it = tt > 0 ? tt + 1 : 0; it < U; ) {
        for (nt = H, j = 1, Z = h; it >= U && C("invalid-input"), X = k(I.charCodeAt(it++)), (X >= h || X > b((o - H) / j)) && C("overflow"), H += X * j, lt = Z <= V ? u : Z >= V + l ? l : Z - V, !(X < lt); Z += h)
          ht = h - lt, j > b(o / ht) && C("overflow"), j *= ht;
        B = N.length + 1, V = A(H - nt, B, nt == 0), b(H / B) > o - Y && C("overflow"), Y += b(H / B), H %= B, N.splice(H++, 0, Y);
      }
      return M(N);
    }
    function W(I) {
      var N, U, B, H, Y, V, tt, at, it, nt, j, Z = [], X, lt, ht, J;
      for (I = F(I), X = I.length, N = p, U = 0, Y = d, V = 0; V < X; ++V)
        j = I[V], j < 128 && Z.push(x(j));
      for (B = H = Z.length, H && Z.push(v); B < X; ) {
        for (tt = o, V = 0; V < X; ++V)
          j = I[V], j >= N && j < tt && (tt = j);
        for (lt = B + 1, tt - N > b((o - U) / lt) && C("overflow"), U += (tt - N) * lt, N = tt, V = 0; V < X; ++V)
          if (j = I[V], j < N && ++U > o && C("overflow"), j == N) {
            for (at = U, it = h; nt = it <= Y ? u : it >= Y + l ? l : it - Y, !(at < nt); it += h)
              J = at - nt, ht = h - nt, Z.push(
                x(Q(nt + J % ht, 0))
              ), at = b(J / ht);
            Z.push(x(Q(at, 0))), Y = A(U, lt, B == H), U = 0, ++B;
          }
        ++U, ++N;
      }
      return Z.join("");
    }
    function vt(I) {
      return R(I, function(N) {
        return _.test(N) ? L(N.slice(4).toLowerCase()) : N;
      });
    }
    function rt(I) {
      return R(I, function(N) {
        return m.test(N) ? "xn--" + W(N) : N;
      });
    }
    if (s = {
      version: "1.3.2",
      ucs2: {
        decode: F,
        encode: M
      },
      decode: L,
      encode: W,
      toASCII: rt,
      toUnicode: vt
    }, i && n)
      if (t.exports == i)
        n.exports = s;
      else
        for (E in s)
          s.hasOwnProperty(E) && (i[E] = s[E]);
    else
      e.punycode = s;
  })(Nn);
});
function lm(t, r) {
  return Object.prototype.hasOwnProperty.call(t, r);
}
var fm = function(t, r, e, i) {
  r = r || "&", e = e || "=";
  var n = {};
  if (typeof t != "string" || t.length === 0)
    return n;
  var a = /\+/g;
  t = t.split(r);
  var s = 1e3;
  i && typeof i.maxKeys == "number" && (s = i.maxKeys);
  var o = t.length;
  s > 0 && o > s && (o = s);
  for (var h = 0; h < o; ++h) {
    var u = t[h].replace(a, "%20"), l = u.indexOf(e), f, c, d, p;
    l >= 0 ? (f = u.substr(0, l), c = u.substr(l + 1)) : (f = u, c = ""), d = decodeURIComponent(f), p = decodeURIComponent(c), lm(n, d) ? Array.isArray(n[d]) ? n[d].push(p) : n[d] = [n[d], p] : n[d] = p;
  }
  return n;
}, _r = function(t) {
  switch (typeof t) {
    case "string":
      return t;
    case "boolean":
      return t ? "true" : "false";
    case "number":
      return isFinite(t) ? t : "";
    default:
      return "";
  }
}, cm = function(t, r, e, i) {
  return r = r || "&", e = e || "=", t === null && (t = void 0), typeof t == "object" ? Object.keys(t).map(function(n) {
    var a = encodeURIComponent(_r(n)) + e;
    return Array.isArray(t[n]) ? t[n].map(function(s) {
      return a + encodeURIComponent(_r(s));
    }).join(r) : a + encodeURIComponent(_r(t[n]));
  }).join(r) : i ? encodeURIComponent(_r(i)) + e + encodeURIComponent(_r(t)) : "";
};
Ma(function(t, r) {
  r.decode = r.parse = fm, r.encode = r.stringify = cm;
});
/*!
 * @pixi/constants - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var qh;
(function(t) {
  t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(qh || (qh = {}));
var Yh;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Yh || (Yh = {}));
var Zh;
(function(t) {
  t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Zh || (Zh = {}));
var At;
(function(t) {
  t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(At || (At = {}));
var Jh;
(function(t) {
  t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Jh || (Jh = {}));
var Kh;
(function(t) {
  t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Kh || (Kh = {}));
var Qh;
(function(t) {
  t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(Qh || (Qh = {}));
var tu;
(function(t) {
  t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(tu || (tu = {}));
var eu;
(function(t) {
  t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(eu || (eu = {}));
var ru;
(function(t) {
  t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(ru || (ru = {}));
var iu;
(function(t) {
  t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(iu || (iu = {}));
var nu;
(function(t) {
  t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(nu || (nu = {}));
var au;
(function(t) {
  t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(au || (au = {}));
var su;
(function(t) {
  t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(su || (su = {}));
var ou;
(function(t) {
  t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(ou || (ou = {}));
var hu;
(function(t) {
  t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(hu || (hu = {}));
var uu;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE", t[t.COLOR = 4] = "COLOR";
})(uu || (uu = {}));
var lu;
(function(t) {
  t[t.RED = 1] = "RED", t[t.GREEN = 2] = "GREEN", t[t.BLUE = 4] = "BLUE", t[t.ALPHA = 8] = "ALPHA";
})(lu || (lu = {}));
var fu;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(fu || (fu = {}));
var cu;
(function(t) {
  t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(cu || (cu = {}));
/*!
 * @pixi/utils - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
Si.RETINA_PREFIX = /@([0-9\.]+)x/;
Si.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
function dm() {
  for (var t = [], r = [], e = 0; e < 32; e++)
    t[e] = e, r[e] = e;
  t[At.NORMAL_NPM] = At.NORMAL, t[At.ADD_NPM] = At.ADD, t[At.SCREEN_NPM] = At.SCREEN, r[At.NORMAL] = At.NORMAL_NPM, r[At.ADD] = At.ADD_NPM, r[At.SCREEN] = At.SCREEN_NPM;
  var i = [];
  return i.push(r), i.push(t), i;
}
dm();
var du = {};
function pm(t, r, e) {
  if (e === void 0 && (e = 3), !du[r]) {
    var i = new Error().stack;
    typeof i > "u" ? console.warn("PixiJS Deprecation Warning: ", r + `
Deprecated since v` + t) : (i = i.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", r + `
Deprecated since v` + t), console.warn(i), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", r + `
Deprecated since v` + t), console.warn(i))), du[r] = !0;
  }
}
(function() {
  function t(r, e, i) {
    this.canvas = Si.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = i || Si.RESOLUTION, this.resize(r, e);
  }
  return t.prototype.clear = function() {
    this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }, t.prototype.resize = function(r, e) {
    this.canvas.width = Math.round(r * this.resolution), this.canvas.height = Math.round(e * this.resolution);
  }, t.prototype.destroy = function() {
    this.context = null, this.canvas = null;
  }, Object.defineProperty(t.prototype, "width", {
    get: function() {
      return this.canvas.width;
    },
    set: function(r) {
      this.canvas.width = Math.round(r);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "height", {
    get: function() {
      return this.canvas.height;
    },
    set: function(r) {
      this.canvas.height = Math.round(r);
    },
    enumerable: !1,
    configurable: !0
  }), t;
})();
var sl = function() {
  function t(r) {
    var e = this;
    this.stage = new gt(), r = Object.assign({
      forceCanvas: !1
    }, r), this.renderer = Ov(r), t._plugins.forEach(function(i) {
      i.init.call(e, r);
    });
  }
  return t.registerPlugin = function(r) {
    pm("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), fe.add({
      type: ot.Application,
      ref: r
    });
  }, t.prototype.render = function() {
    this.renderer.render(this.stage);
  }, Object.defineProperty(t.prototype, "view", {
    get: function() {
      return this.renderer.view;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "screen", {
    get: function() {
      return this.renderer.screen;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.destroy = function(r, e) {
    var i = this, n = t._plugins.slice(0);
    n.reverse(), n.forEach(function(a) {
      a.destroy.call(i);
    }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(r), this.renderer = null;
  }, t._plugins = [], t;
}();
fe.handleByList(ot.Application, sl._plugins);
fe.add(im);
/*!
 * @pixi/mesh-extras - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/mesh-extras is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ca = function(t, r) {
  return Ca = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, Ca(t, r);
};
function or(t, r) {
  Ca(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var vm = function(t) {
  or(r, t);
  function r(e, i, n, a) {
    e === void 0 && (e = 100), i === void 0 && (i = 100), n === void 0 && (n = 10), a === void 0 && (a = 10);
    var s = t.call(this) || this;
    return s.segWidth = n, s.segHeight = a, s.width = e, s.height = i, s.build(), s;
  }
  return r.prototype.build = function() {
    for (var e = this.segWidth * this.segHeight, i = [], n = [], a = [], s = this.segWidth - 1, o = this.segHeight - 1, h = this.width / s, u = this.height / o, l = 0; l < e; l++) {
      var f = l % this.segWidth, c = l / this.segWidth | 0;
      i.push(f * h, c * u), n.push(f / s, c / o);
    }
    for (var d = s * o, l = 0; l < d; l++) {
      var p = l % s, v = l / s | 0, _ = v * this.segWidth + p, m = v * this.segWidth + p + 1, y = (v + 1) * this.segWidth + p, g = (v + 1) * this.segWidth + p + 1;
      a.push(_, m, y, m, g, y);
    }
    this.buffers[0].data = new Float32Array(i), this.buffers[1].data = new Float32Array(n), this.indexBuffer.data = new Uint16Array(a), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
  }, r;
}(ji), _m = function(t) {
  or(r, t);
  function r(e, i, n) {
    e === void 0 && (e = 200), n === void 0 && (n = 0);
    var a = t.call(this, new Float32Array(i.length * 4), new Float32Array(i.length * 4), new Uint16Array((i.length - 1) * 6)) || this;
    return a.points = i, a._width = e, a.textureScale = n, a.build(), a;
  }
  return Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this._width;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.build = function() {
    var e = this.points;
    if (!!e) {
      var i = this.getBuffer("aVertexPosition"), n = this.getBuffer("aTextureCoord"), a = this.getIndex();
      if (!(e.length < 1)) {
        i.data.length / 4 !== e.length && (i.data = new Float32Array(e.length * 4), n.data = new Float32Array(e.length * 4), a.data = new Uint16Array((e.length - 1) * 6));
        var s = n.data, o = a.data;
        s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1;
        for (var h = 0, u = e[0], l = this._width * this.textureScale, f = e.length, c = 0; c < f; c++) {
          var d = c * 4;
          if (this.textureScale > 0) {
            var p = u.x - e[c].x, v = u.y - e[c].y, _ = Math.sqrt(p * p + v * v);
            u = e[c], h += _ / l;
          } else
            h = c / (f - 1);
          s[d] = h, s[d + 1] = 0, s[d + 2] = h, s[d + 3] = 1;
        }
        for (var m = 0, c = 0; c < f - 1; c++) {
          var d = c * 2;
          o[m++] = d, o[m++] = d + 1, o[m++] = d + 2, o[m++] = d + 2, o[m++] = d + 1, o[m++] = d + 3;
        }
        n.update(), a.update(), this.updateVertices();
      }
    }
  }, r.prototype.updateVertices = function() {
    var e = this.points;
    if (!(e.length < 1)) {
      for (var i = e[0], n, a = 0, s = 0, o = this.buffers[0].data, h = e.length, u = 0; u < h; u++) {
        var l = e[u], f = u * 4;
        u < e.length - 1 ? n = e[u + 1] : n = l, s = -(n.x - i.x), a = n.y - i.y;
        var c = Math.sqrt(a * a + s * s), d = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
        a /= c, s /= c, a *= d, s *= d, o[f] = l.x + a, o[f + 1] = l.y + s, o[f + 2] = l.x - a, o[f + 3] = l.y - s, i = l;
      }
      this.buffers[0].update();
    }
  }, r.prototype.update = function() {
    this.textureScale > 0 ? this.build() : this.updateVertices();
  }, r;
}(ji), ol = function(t) {
  or(r, t);
  function r(e, i, n) {
    n === void 0 && (n = 0);
    var a = this, s = new _m(e.height, i, n), o = new Ge(e);
    return n > 0 && (e.baseTexture.wrapMode = Ft.REPEAT), a = t.call(this, s, o) || this, a.autoUpdate = !0, a;
  }
  return r.prototype._render = function(e) {
    var i = this.geometry;
    (this.autoUpdate || i._width !== this.shader.texture.height) && (i._width = this.shader.texture.height, i.update()), t.prototype._render.call(this, e);
  }, r;
}(Se), mm = function(t) {
  or(r, t);
  function r(e, i, n) {
    var a = this, s = new vm(e.width, e.height, i, n), o = new Ge(z.WHITE);
    return a = t.call(this, s, o) || this, a.texture = e, a.autoResize = !0, a;
  }
  return r.prototype.textureUpdated = function() {
    this._textureID = this.shader.texture._updateID;
    var e = this.geometry, i = this.shader.texture, n = i.width, a = i.height;
    this.autoResize && (e.width !== n || e.height !== a) && (e.width = this.shader.texture.width, e.height = this.shader.texture.height, e.build());
  }, Object.defineProperty(r.prototype, "texture", {
    get: function() {
      return this.shader.texture;
    },
    set: function(e) {
      this.shader.texture !== e && (this.shader.texture = e, this._textureID = -1, e.baseTexture.valid ? this.textureUpdated() : e.once("update", this.textureUpdated, this));
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._render = function(e) {
    this._textureID !== this.shader.texture._updateID && this.textureUpdated(), t.prototype._render.call(this, e);
  }, r.prototype.destroy = function(e) {
    this.shader.texture.off("update", this.textureUpdated, this), t.prototype.destroy.call(this, e);
  }, r;
}(Se), hl = function(t) {
  or(r, t);
  function r(e, i, n, a, s) {
    e === void 0 && (e = z.EMPTY);
    var o = this, h = new ji(i, n, a);
    h.getBuffer("aVertexPosition").static = !1;
    var u = new Ge(e);
    return o = t.call(this, h, u, null, s) || this, o.autoUpdate = !0, o;
  }
  return Object.defineProperty(r.prototype, "vertices", {
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(e) {
      this.geometry.getBuffer("aVertexPosition").data = e;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._render = function(e) {
    this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), t.prototype._render.call(this, e);
  }, r;
}(Se), yi = 10;
(function(t) {
  or(r, t);
  function r(e, i, n, a, s) {
    i === void 0 && (i = yi), n === void 0 && (n = yi), a === void 0 && (a = yi), s === void 0 && (s = yi);
    var o = t.call(this, z.WHITE, 4, 4) || this;
    return o._origWidth = e.orig.width, o._origHeight = e.orig.height, o._width = o._origWidth, o._height = o._origHeight, o._leftWidth = i, o._rightWidth = a, o._topHeight = n, o._bottomHeight = s, o.texture = e, o;
  }
  return r.prototype.textureUpdated = function() {
    this._textureID = this.shader.texture._updateID, this._refresh();
  }, Object.defineProperty(r.prototype, "vertices", {
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(e) {
      this.geometry.getBuffer("aVertexPosition").data = e;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.updateHorizontalVertices = function() {
    var e = this.vertices, i = this._getMinScale();
    e[9] = e[11] = e[13] = e[15] = this._topHeight * i, e[17] = e[19] = e[21] = e[23] = this._height - this._bottomHeight * i, e[25] = e[27] = e[29] = e[31] = this._height;
  }, r.prototype.updateVerticalVertices = function() {
    var e = this.vertices, i = this._getMinScale();
    e[2] = e[10] = e[18] = e[26] = this._leftWidth * i, e[4] = e[12] = e[20] = e[28] = this._width - this._rightWidth * i, e[6] = e[14] = e[22] = e[30] = this._width;
  }, r.prototype._getMinScale = function() {
    var e = this._leftWidth + this._rightWidth, i = this._width > e ? 1 : this._width / e, n = this._topHeight + this._bottomHeight, a = this._height > n ? 1 : this._height / n, s = Math.min(i, a);
    return s;
  }, Object.defineProperty(r.prototype, "width", {
    get: function() {
      return this._width;
    },
    set: function(e) {
      this._width = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "height", {
    get: function() {
      return this._height;
    },
    set: function(e) {
      this._height = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "leftWidth", {
    get: function() {
      return this._leftWidth;
    },
    set: function(e) {
      this._leftWidth = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "rightWidth", {
    get: function() {
      return this._rightWidth;
    },
    set: function(e) {
      this._rightWidth = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "topHeight", {
    get: function() {
      return this._topHeight;
    },
    set: function(e) {
      this._topHeight = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "bottomHeight", {
    get: function() {
      return this._bottomHeight;
    },
    set: function(e) {
      this._bottomHeight = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._refresh = function() {
    var e = this.texture, i = this.geometry.buffers[1].data;
    this._origWidth = e.orig.width, this._origHeight = e.orig.height;
    var n = 1 / this._origWidth, a = 1 / this._origHeight;
    i[0] = i[8] = i[16] = i[24] = 0, i[1] = i[3] = i[5] = i[7] = 0, i[6] = i[14] = i[22] = i[30] = 1, i[25] = i[27] = i[29] = i[31] = 1, i[2] = i[10] = i[18] = i[26] = n * this._leftWidth, i[4] = i[12] = i[20] = i[28] = 1 - n * this._rightWidth, i[9] = i[11] = i[13] = i[15] = a * this._topHeight, i[17] = i[19] = i[21] = i[23] = 1 - a * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
  }, r;
})(mm);
/*!
 * @pixi/sprite-animated - v6.5.5
 * Compiled Fri, 30 Sep 2022 13:37:53 UTC
 *
 * @pixi/sprite-animated is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Na = function(t, r) {
  return Na = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (e[n] = i[n]);
  }, Na(t, r);
};
function ym(t, r) {
  Na(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
(function(t) {
  ym(r, t);
  function r(e, i) {
    i === void 0 && (i = !0);
    var n = t.call(this, e[0] instanceof z ? e[0] : e[0].texture) || this;
    return n._textures = null, n._durations = null, n._autoUpdate = i, n._isConnectedToTicker = !1, n.animationSpeed = 1, n.loop = !0, n.updateAnchor = !1, n.onComplete = null, n.onFrameChange = null, n.onLoop = null, n._currentTime = 0, n._playing = !1, n._previousFrame = null, n.textures = e, n;
  }
  return r.prototype.stop = function() {
    !this._playing || (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (wt.shared.remove(this.update, this), this._isConnectedToTicker = !1));
  }, r.prototype.play = function() {
    this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (wt.shared.add(this.update, this, le.HIGH), this._isConnectedToTicker = !0));
  }, r.prototype.gotoAndStop = function(e) {
    this.stop();
    var i = this.currentFrame;
    this._currentTime = e, i !== this.currentFrame && this.updateTexture();
  }, r.prototype.gotoAndPlay = function(e) {
    var i = this.currentFrame;
    this._currentTime = e, i !== this.currentFrame && this.updateTexture(), this.play();
  }, r.prototype.update = function(e) {
    if (!!this._playing) {
      var i = this.animationSpeed * e, n = this.currentFrame;
      if (this._durations !== null) {
        var a = this._currentTime % 1 * this._durations[this.currentFrame];
        for (a += i / 60 * 1e3; a < 0; )
          this._currentTime--, a += this._durations[this.currentFrame];
        var s = Math.sign(this.animationSpeed * e);
        for (this._currentTime = Math.floor(this._currentTime); a >= this._durations[this.currentFrame]; )
          a -= this._durations[this.currentFrame] * s, this._currentTime += s;
        this._currentTime += a / this._durations[this.currentFrame];
      } else
        this._currentTime += i;
      this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : n !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < n ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > n && this.onLoop()), this.updateTexture());
    }
  }, r.prototype.updateTexture = function() {
    var e = this.currentFrame;
    this._previousFrame !== e && (this._previousFrame = e, this._texture = this._textures[e], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
  }, r.prototype.destroy = function(e) {
    this.stop(), t.prototype.destroy.call(this, e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
  }, r.fromFrames = function(e) {
    for (var i = [], n = 0; n < e.length; ++n)
      i.push(z.from(e[n]));
    return new r(i);
  }, r.fromImages = function(e) {
    for (var i = [], n = 0; n < e.length; ++n)
      i.push(z.from(e[n]));
    return new r(i);
  }, Object.defineProperty(r.prototype, "totalFrames", {
    get: function() {
      return this._textures.length;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "textures", {
    get: function() {
      return this._textures;
    },
    set: function(e) {
      if (e[0] instanceof z)
        this._textures = e, this._durations = null;
      else {
        this._textures = [], this._durations = [];
        for (var i = 0; i < e.length; i++)
          this._textures.push(e[i].texture), this._durations.push(e[i].time);
      }
      this._previousFrame = null, this.gotoAndStop(0), this.updateTexture();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "currentFrame", {
    get: function() {
      var e = Math.floor(this._currentTime) % this._textures.length;
      return e < 0 && (e += this._textures.length), e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "playing", {
    get: function() {
      return this._playing;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(r.prototype, "autoUpdate", {
    get: function() {
      return this._autoUpdate;
    },
    set: function(e) {
      e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (wt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (wt.shared.add(this.update, this), this._isConnectedToTicker = !0));
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(Vt);
/*!
 * pixi.js - v6.5.5
 * Compiled Fri, 30 Sep 2022 14:06:54 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
fe.add(
  jv,
  Zv,
  Yv,
  X0,
  m_,
  Wu,
  E_,
  M_,
  d0,
  M0,
  D0,
  x_,
  fp,
  n0
);
const xm = `precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
gl_Position.xyw = projectionMatrix * aVertexPosition;
gl_Position.z = 0.0;

vTextureCoord = aTextureCoord;
vTextureId = aTextureId;
vColor = aColor;
}
`, gm = `
varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
vec4 color;
%forloop%
gl_FragColor = color * vColor;
}`;
class bm extends Be {
  constructor(r = !1) {
    super(), this._buffer = new dt(null, r, !1), this._indexBuffer = new dt(null, r, !0), this.addAttribute("aVertexPosition", this._buffer, 3, !1, G.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, G.FLOAT).addAttribute("aColor", this._buffer, 4, !0, G.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, G.FLOAT).addIndex(this._indexBuffer);
  }
}
class Tm {
  static create(r) {
    const { vertex: e, fragment: i, vertexSize: n, geometryClass: a } = Object.assign({
      vertex: xm,
      fragment: gm,
      geometryClass: bm,
      vertexSize: 7
    }, r);
    return class extends Ir {
      constructor(o) {
        super(o), this.shaderGenerator = new Sa(e, i), this.geometryClass = a, this.vertexSize = n;
      }
      packInterleavedGeometry(o, h, u, l, f) {
        const {
          uint32View: c,
          float32View: d
        } = h, p = l / this.vertexSize, v = o.uvs, _ = o.indices, m = o.vertexData, y = o.vertexData2d, g = o._texture.baseTexture._batchLocation, T = Math.min(o.worldAlpha, 1), b = T < 1 && o._texture.baseTexture.alphaMode ? Dr(o._tintRGB, T) : o._tintRGB + (T * 255 << 24);
        if (y) {
          let x = 0;
          for (let E = 0; E < y.length; E += 3, x += 2)
            d[l++] = y[E], d[l++] = y[E + 1], d[l++] = y[E + 2], d[l++] = v[x], d[l++] = v[x + 1], c[l++] = b, d[l++] = g;
        } else
          for (let x = 0; x < m.length; x += 2)
            d[l++] = m[x], d[l++] = m[x + 1], d[l++] = 1, d[l++] = v[x], d[l++] = v[x + 1], c[l++] = b, d[l++] = g;
        for (let x = 0; x < _.length; x++)
          u[f++] = p + _[x];
      }
    };
  }
}
class zi {
  constructor(r, e = !0) {
    zi.prototype.__init.call(this), this.legacy = r, e && (this.enabled = !0), this.legacy.proj = this;
  }
  __init() {
    this._enabled = !1;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(r) {
    this._enabled = r;
  }
  clear() {
  }
}
var Ct;
(function(t) {
  t[t.NONE = 0] = "NONE";
  const e = 4;
  t[t.BEFORE_PROJ = e] = "BEFORE_PROJ";
  const i = 5;
  t[t.PROJ = i] = "PROJ";
  const n = 9;
  t[t.ALL = n] = "ALL";
})(Ct || (Ct = {}));
var Zt;
(function(t) {
  t[t.NONE = 0] = "NONE";
  const e = 1;
  t[t.FREE = e] = "FREE";
  const i = 2;
  t[t.AXIS_X = i] = "AXIS_X";
  const n = 3;
  t[t.AXIS_Y = n] = "AXIS_Y";
  const a = 4;
  t[t.POINT = a] = "POINT";
  const s = 5;
  t[t.AXIS_XR = s] = "AXIS_XR";
})(Zt || (Zt = {}));
function Im(t) {
  const r = this.proj, e = this, i = t._worldID, n = e.localTransform, a = r.scaleAfterAffine && r.affine >= 2;
  e._localID !== e._currentLocalID && (a ? (n.a = e._cx, n.b = e._sx, n.c = e._cy, n.d = e._sy, n.tx = e.position._x, n.ty = e.position._y) : (n.a = e._cx * e.scale._x, n.b = e._sx * e.scale._x, n.c = e._cy * e.scale._y, n.d = e._sy * e.scale._y, n.tx = e.position._x - (e.pivot._x * n.a + e.pivot._y * n.c), n.ty = e.position._y - (e.pivot._x * n.b + e.pivot._y * n.d)), e._currentLocalID = e._localID, r._currentProjID = -1);
  const s = r._projID;
  if (r._currentProjID !== s && (r._currentProjID = s, r.updateLocalTransform(n), e._parentID = -1), e._parentID !== i) {
    const o = t.proj;
    o && !o._affine ? r.world.setToMult(o.world, r.local) : r.world.setToMultLegacy(t.worldTransform, r.local);
    const h = e.worldTransform;
    r.world.copyTo(h, r._affine, r.affinePreserveOrientation), a && (h.a *= e.scale._x, h.b *= e.scale._x, h.c *= e.scale._y, h.d *= e.scale._y, h.tx -= e.pivot._x * h.a + e.pivot._y * h.c, h.ty -= e.pivot._x * h.b + e.pivot._y * h.d), e._parentID = i, e._worldID++;
  }
}
class ve extends zi {
  constructor(...r) {
    super(...r), ve.prototype.__init.call(this), ve.prototype.__init2.call(this), ve.prototype.__init3.call(this), ve.prototype.__init4.call(this), ve.prototype.__init5.call(this);
  }
  updateLocalTransform(r) {
  }
  __init() {
    this._projID = 0;
  }
  __init2() {
    this._currentProjID = -1;
  }
  __init3() {
    this._affine = Zt.NONE;
  }
  __init4() {
    this.affinePreserveOrientation = !1;
  }
  __init5() {
    this.scaleAfterAffine = !0;
  }
  set affine(r) {
    this._affine !== r && (this._affine = r, this._currentProjID = -1, this.legacy._currentLocalID = -1);
  }
  get affine() {
    return this._affine;
  }
  set enabled(r) {
    r !== this._enabled && (this._enabled = r, r ? (this.legacy.updateTransform = Im, this.legacy._parentID = -1) : (this.legacy.updateTransform = sr.prototype.updateTransform, this.legacy._parentID = -1));
  }
  clear() {
    this._currentProjID = -1, this._projID = 0;
  }
}
class Gi extends Ir {
  constructor(...r) {
    super(...r), Gi.prototype.__init.call(this), Gi.prototype.__init2.call(this);
  }
  __init() {
    this.forceMaxTextures = 0;
  }
  getUniforms(r) {
    return this.defUniforms;
  }
  syncUniforms(r) {
    if (!r)
      return;
    const e = this._shader;
    for (const i in r)
      e.uniforms[i] = r[i];
  }
  __init2() {
    this.defUniforms = {};
  }
  buildDrawCalls(r, e, i) {
    const n = this, {
      _bufferedElements: a,
      _attributeBuffer: s,
      _indexBuffer: o,
      vertexSize: h
    } = this, u = Ir._drawCallPool;
    let l = this._dcIndex, f = this._aIndex, c = this._iIndex, d = u[l];
    d.start = this._iIndex, d.texArray = r;
    for (let p = e; p < i; ++p) {
      const v = a[p], _ = v._texture.baseTexture, m = Pa[_.alphaMode ? 1 : 0][v.blendMode], y = this.getUniforms(v);
      a[p] = null, e < p && (d.blend !== m || d.uniforms !== y) && (d.size = c - d.start, e = p, d = u[++l], d.texArray = r, d.start = c), this.packInterleavedGeometry(v, s, o, f, c), f += v.vertexData.length / 2 * h, c += v.indices.length, d.blend = m, d.uniforms = y;
    }
    e < i && (d.size = c - d.start, ++l), n._dcIndex = l, n._aIndex = f, n._iIndex = c;
  }
  drawBatches() {
    const r = this._dcIndex, { gl: e, state: i, shader: n } = this.renderer, a = Ir._drawCallPool;
    let s = null, o = null;
    for (let h = 0; h < r; h++) {
      const { texArray: u, type: l, size: f, start: c, blend: d, uniforms: p } = a[h];
      o !== u && (o = u, this.bindAndClearTexArray(u)), s !== p && (s = p, this.syncUniforms(p), n.syncUniformGroup(this._shader.uniformGroup)), this.state.blendMode = d, i.set(this.state), e.drawElements(l, f, e.UNSIGNED_SHORT, c * 2);
    }
  }
  contextChange() {
    if (!this.forceMaxTextures) {
      super.contextChange(), this.syncUniforms(this.defUniforms);
      return;
    }
    const r = this;
    r.MAX_TEXTURES = this.forceMaxTextures, this._shader = r.shaderGenerator.generateShader(this.MAX_TEXTURES), this.syncUniforms(this.defUniforms);
    for (let e = 0; e < r._packedGeometryPoolSize; e++)
      r._packedGeometries[e] = new this.geometryClass();
    this.initFlushBuffers();
  }
}
Vr.registerPlugin("batch2d", Tm.create({}));
function Em(t, r, e, i, n) {
  const a = r.x - t.x, s = e.x - i.x, o = e.x - t.x, h = r.y - t.y, u = e.y - i.y, l = e.y - t.y, f = a * u - h * s;
  if (Math.abs(f) < 1e-7)
    return n.x = a, n.y = h, 0;
  const c = o * u - l * s, d = a * l - h * o, p = c / f, v = d / f;
  return v < 1e-6 || v - 1 > -1e-6 ? -1 : (n.x = t.x + p * (r.x - t.x), n.y = t.y + p * (r.y - t.y), 1);
}
const wm = [1, 0, 0, 0, 1, 0, 0, 0, 1];
class Nt {
  static __initStatic() {
    this.IDENTITY = new Nt();
  }
  static __initStatic2() {
    this.TEMP_MATRIX = new Nt();
  }
  __init() {
    this.floatArray = null;
  }
  constructor(r) {
    Nt.prototype.__init.call(this), this.mat3 = new Float64Array(r || wm);
  }
  get a() {
    return this.mat3[0] / this.mat3[8];
  }
  set a(r) {
    this.mat3[0] = r * this.mat3[8];
  }
  get b() {
    return this.mat3[1] / this.mat3[8];
  }
  set b(r) {
    this.mat3[1] = r * this.mat3[8];
  }
  get c() {
    return this.mat3[3] / this.mat3[8];
  }
  set c(r) {
    this.mat3[3] = r * this.mat3[8];
  }
  get d() {
    return this.mat3[4] / this.mat3[8];
  }
  set d(r) {
    this.mat3[4] = r * this.mat3[8];
  }
  get tx() {
    return this.mat3[6] / this.mat3[8];
  }
  set tx(r) {
    this.mat3[6] = r * this.mat3[8];
  }
  get ty() {
    return this.mat3[7] / this.mat3[8];
  }
  set ty(r) {
    this.mat3[7] = r * this.mat3[8];
  }
  set(r, e, i, n, a, s) {
    const o = this.mat3;
    return o[0] = r, o[1] = e, o[2] = 0, o[3] = i, o[4] = n, o[5] = 0, o[6] = a, o[7] = s, o[8] = 1, this;
  }
  toArray(r, e) {
    this.floatArray || (this.floatArray = new Float32Array(9));
    const i = e || this.floatArray, n = this.mat3;
    return r ? (i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8]) : (i[0] = n[0], i[1] = n[3], i[2] = n[6], i[3] = n[1], i[4] = n[4], i[5] = n[7], i[6] = n[2], i[7] = n[5], i[8] = n[8]), i;
  }
  apply(r, e) {
    e = e || new $();
    const i = this.mat3, n = r.x, a = r.y, s = 1 / (i[2] * n + i[5] * a + i[8]);
    return e.x = s * (i[0] * n + i[3] * a + i[6]), e.y = s * (i[1] * n + i[4] * a + i[7]), e;
  }
  translate(r, e) {
    const i = this.mat3;
    return i[0] += r * i[2], i[1] += e * i[2], i[3] += r * i[5], i[4] += e * i[5], i[6] += r * i[8], i[7] += e * i[8], this;
  }
  scale(r, e) {
    const i = this.mat3;
    return i[0] *= r, i[1] *= e, i[3] *= r, i[4] *= e, i[6] *= r, i[7] *= e, this;
  }
  scaleAndTranslate(r, e, i, n) {
    const a = this.mat3;
    a[0] = r * a[0] + i * a[2], a[1] = e * a[1] + n * a[2], a[3] = r * a[3] + i * a[5], a[4] = e * a[4] + n * a[5], a[6] = r * a[6] + i * a[8], a[7] = e * a[7] + n * a[8];
  }
  applyInverse(r, e) {
    e = e || new $();
    const i = this.mat3, n = r.x, a = r.y, s = i[0], o = i[3], h = i[6], u = i[1], l = i[4], f = i[7], c = i[2], d = i[5], p = i[8], v = (p * l - f * d) * n + (-p * o + h * d) * a + (f * o - h * l), _ = (-p * u + f * c) * n + (p * s - h * c) * a + (-f * s + h * u), m = (d * u - l * c) * n + (-d * s + o * c) * a + (l * s - o * u);
    return e.x = v / m, e.y = _ / m, e;
  }
  invert() {
    const r = this.mat3, e = r[0], i = r[1], n = r[2], a = r[3], s = r[4], o = r[5], h = r[6], u = r[7], l = r[8], f = l * s - o * u, c = -l * a + o * h, d = u * a - s * h;
    let p = e * f + i * c + n * d;
    return p ? (p = 1 / p, r[0] = f * p, r[1] = (-l * i + n * u) * p, r[2] = (o * i - n * s) * p, r[3] = c * p, r[4] = (l * e - n * h) * p, r[5] = (-o * e + n * a) * p, r[6] = d * p, r[7] = (-u * e + i * h) * p, r[8] = (s * e - i * a) * p, this) : this;
  }
  identity() {
    const r = this.mat3;
    return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, this;
  }
  clone() {
    return new Nt(this.mat3);
  }
  copyTo2dOr3d(r) {
    const e = this.mat3, i = r.mat3;
    return i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = e[4], i[5] = e[5], i[6] = e[6], i[7] = e[7], i[8] = e[8], r;
  }
  copyTo(r, e, i) {
    const n = this.mat3, a = 1 / n[8], s = n[6] * a, o = n[7] * a;
    if (r.a = (n[0] - n[2] * s) * a, r.b = (n[1] - n[2] * o) * a, r.c = (n[3] - n[5] * s) * a, r.d = (n[4] - n[5] * o) * a, r.tx = s, r.ty = o, e >= 2) {
      let h = r.a * r.d - r.b * r.c;
      i || (h = Math.abs(h)), e === Zt.POINT ? (h > 0 ? h = 1 : h = -1, r.a = h, r.b = 0, r.c = 0, r.d = h) : e === Zt.AXIS_X ? (h /= Math.sqrt(r.b * r.b + r.d * r.d), r.c = 0, r.d = h) : e === Zt.AXIS_Y ? (h /= Math.sqrt(r.a * r.a + r.c * r.c), r.a = h, r.c = 0) : e === Zt.AXIS_XR && (r.a = r.d * h, r.c = -r.b * h);
    }
    return r;
  }
  copyFrom(r) {
    const e = this.mat3;
    return e[0] = r.a, e[1] = r.b, e[2] = 0, e[3] = r.c, e[4] = r.d, e[5] = 0, e[6] = r.tx, e[7] = r.ty, e[8] = 1, this;
  }
  setToMultLegacy(r, e) {
    const i = this.mat3, n = e.mat3, a = r.a, s = r.b, o = r.c, h = r.d, u = r.tx, l = r.ty, f = n[0], c = n[1], d = n[2], p = n[3], v = n[4], _ = n[5], m = n[6], y = n[7], g = n[8];
    return i[0] = f * a + c * o + d * u, i[1] = f * s + c * h + d * l, i[2] = d, i[3] = p * a + v * o + _ * u, i[4] = p * s + v * h + _ * l, i[5] = _, i[6] = m * a + y * o + g * u, i[7] = m * s + y * h + g * l, i[8] = g, this;
  }
  setToMultLegacy2(r, e) {
    const i = this.mat3, n = r.mat3, a = n[0], s = n[1], o = n[2], h = n[3], u = n[4], l = n[5], f = n[6], c = n[7], d = n[8], p = e.a, v = e.b, _ = e.c, m = e.d, y = e.tx, g = e.ty;
    return i[0] = p * a + v * h, i[1] = p * s + v * u, i[2] = p * o + v * l, i[3] = _ * a + m * h, i[4] = _ * s + m * u, i[5] = _ * o + m * l, i[6] = y * a + g * h + f, i[7] = y * s + g * u + c, i[8] = y * o + g * l + d, this;
  }
  setToMult(r, e) {
    const i = this.mat3, n = r.mat3, a = e.mat3, s = n[0], o = n[1], h = n[2], u = n[3], l = n[4], f = n[5], c = n[6], d = n[7], p = n[8], v = a[0], _ = a[1], m = a[2], y = a[3], g = a[4], T = a[5], b = a[6], x = a[7], E = a[8];
    return i[0] = v * s + _ * u + m * c, i[1] = v * o + _ * l + m * d, i[2] = v * h + _ * f + m * p, i[3] = y * s + g * u + T * c, i[4] = y * o + g * l + T * d, i[5] = y * h + g * f + T * p, i[6] = b * s + x * u + E * c, i[7] = b * o + x * l + E * d, i[8] = b * h + x * f + E * p, this;
  }
  prepend(r) {
    return r.mat3 ? this.setToMult(r, this) : this.setToMultLegacy(r, this);
  }
}
Nt.__initStatic();
Nt.__initStatic2();
const pu = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec3 vTextureCoord;

void main(void)
{
gl_Position.xyw = projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0);

vTextureCoord = uTransform * vec3(aTextureCoord, 1.0);
}
`, Rm = `
varying vec3 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
vec2 coord = mod(vTextureCoord.xy / vTextureCoord.z - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;
coord = (uMapCoord * vec3(coord, 1.0)).xy;
coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

vec4 sample = texture2D(uSampler, coord);
gl_FragColor = sample * uColor;
}
`, Cm = `
varying vec3 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
vec4 sample = texture2D(uSampler, vTextureCoord.xy / vTextureCoord.z);
gl_FragColor = sample * uColor;
}
`, Ee = new Nt();
class Da extends Hr {
  constructor(r) {
    super(r), Da.prototype.__init.call(this);
    const e = { globals: this.renderer.globalUniforms };
    this.shader = Qt.from(pu, Rm, e), this.simpleShader = Qt.from(pu, Cm, e);
  }
  __init() {
    this.quad = new La();
  }
  render(r) {
    const e = this.renderer, i = this.quad;
    let n = i.vertices;
    n[0] = n[6] = r._width * -r.anchor.x, n[1] = n[3] = r._height * -r.anchor.y, n[2] = n[4] = r._width * (1 - r.anchor.x), n[5] = n[7] = r._height * (1 - r.anchor.y), r.uvRespectAnchor && (n = i.uvs, n[0] = n[6] = -r.anchor.x, n[1] = n[3] = -r.anchor.y, n[2] = n[4] = 1 - r.anchor.x, n[5] = n[7] = 1 - r.anchor.y), i.invalidate();
    const a = r._texture, s = a.baseTexture, o = r.tileProj.world, h = r.uvMatrix;
    let u = s.isPowerOfTwo && a.frame.width === s.width && a.frame.height === s.height;
    u && (s._glTextures[e.CONTEXT_UID] ? u = s.wrapMode !== Ft.CLAMP : s.wrapMode === Ft.CLAMP && (s.wrapMode = Ft.REPEAT));
    const l = u ? this.simpleShader : this.shader;
    Ee.identity(), Ee.scale(a.width, a.height), Ee.prepend(o), Ee.scale(1 / r._width, 1 / r._height), Ee.invert(), u ? Ee.prepend(h.mapCoord) : (l.uniforms.uMapCoord = h.mapCoord.toArray(!0), l.uniforms.uClampFrame = h.uClampFrame, l.uniforms.uClampOffset = h.uClampOffset), l.uniforms.uTransform = Ee.toArray(!0), l.uniforms.uColor = Oa(
      r.tint,
      r.worldAlpha,
      l.uniforms.uColor,
      s.premultiplyAlpha
    ), l.uniforms.translationMatrix = r.worldTransform.toArray(!0), l.uniforms.uSampler = a, e.shader.bind(l, !1), e.geometry.bind(i, void 0), e.state.setBlendMode(Ua(r.blendMode, s.premultiplyAlpha)), e.geometry.draw(Ot.TRIANGLES, 6, 0);
  }
}
const Et = new $(), zt = [new $(), new $(), new $(), new $()], mr = new K(), vu = new Nt();
class Lt extends ve {
  constructor(r, e) {
    super(r, e), Lt.prototype.__init.call(this), Lt.prototype.__init2.call(this), Lt.prototype.__init3.call(this), this.local = new Nt(), this.world = new Nt();
  }
  __init() {
    this.matrix = new Nt();
  }
  __init2() {
    this.pivot = new _e(this.onChange, this, 0, 0);
  }
  __init3() {
    this.reverseLocalOrder = !1;
  }
  onChange() {
    const r = this.pivot, e = this.matrix.mat3;
    e[6] = -(r._x * e[0] + r._y * e[3]), e[7] = -(r._x * e[1] + r._y * e[4]), this._projID++;
  }
  setAxisX(r, e = 1) {
    const i = r.x, n = r.y, a = Math.sqrt(i * i + n * n), s = this.matrix.mat3;
    s[0] = i / a, s[1] = n / a, s[2] = e / a, this.onChange();
  }
  setAxisY(r, e = 1) {
    const i = r.x, n = r.y, a = Math.sqrt(i * i + n * n), s = this.matrix.mat3;
    s[3] = i / a, s[4] = n / a, s[5] = e / a, this.onChange();
  }
  mapSprite(r, e) {
    const i = r.texture;
    mr.x = -r.anchor.x * i.orig.width, mr.y = -r.anchor.y * i.orig.height, mr.width = i.orig.width, mr.height = i.orig.height, this.mapQuad(mr, e);
  }
  mapQuad(r, e) {
    zt[0].set(r.x, r.y), zt[1].set(r.x + r.width, r.y), zt[2].set(r.x + r.width, r.y + r.height), zt[3].set(r.x, r.y + r.height);
    let i = 1, n = 2, a = 3;
    if (Em(e[0], e[2], e[1], e[3], Et) !== 0)
      i = 1, n = 3, a = 2;
    else
      return;
    const o = Math.sqrt((e[0].x - Et.x) * (e[0].x - Et.x) + (e[0].y - Et.y) * (e[0].y - Et.y)), h = Math.sqrt((e[i].x - Et.x) * (e[i].x - Et.x) + (e[i].y - Et.y) * (e[i].y - Et.y)), u = Math.sqrt((e[n].x - Et.x) * (e[n].x - Et.x) + (e[n].y - Et.y) * (e[n].y - Et.y)), l = Math.sqrt((e[a].x - Et.x) * (e[a].x - Et.x) + (e[a].y - Et.y) * (e[a].y - Et.y)), f = (o + l) / l, c = (h + u) / u, d = (h + u) / h;
    let p = this.matrix.mat3;
    p[0] = zt[0].x * f, p[1] = zt[0].y * f, p[2] = f, p[3] = zt[i].x * c, p[4] = zt[i].y * c, p[5] = c, p[6] = zt[n].x * d, p[7] = zt[n].y * d, p[8] = d, this.matrix.invert(), p = vu.mat3, p[0] = e[0].x, p[1] = e[0].y, p[2] = 1, p[3] = e[i].x, p[4] = e[i].y, p[5] = 1, p[6] = e[n].x, p[7] = e[n].y, p[8] = 1, this.matrix.setToMult(vu, this.matrix), this._projID++;
  }
  updateLocalTransform(r) {
    this._projID !== 0 ? this.reverseLocalOrder ? this.local.setToMultLegacy2(this.matrix, r) : this.local.setToMultLegacy(r, this.matrix) : this.local.copyFrom(r);
  }
  clear() {
    super.clear(), this.matrix.identity(), this.pivot.set(0, 0);
  }
}
function Nm() {
  return this.proj.affine ? this.transform.worldTransform : this.proj.world;
}
class ul extends gt {
  constructor() {
    super(), this.proj = new Lt(this.transform);
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return e && (r = e.toGlobal(r, i, n)), n || this._recursivePostUpdateTransform(), a >= Ct.PROJ ? (n || this.displayObjectUpdateTransform(), this.proj.affine ? this.transform.worldTransform.applyInverse(r, i) : this.proj.world.applyInverse(r, i)) : (this.parent ? i = this.parent.worldTransform.applyInverse(r, i) : (i.x = r.x, i.y = r.y), a === Ct.NONE ? i : this.transform.localTransform.applyInverse(i, i));
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
}
const ka = ul.prototype.toLocal;
function Am(t) {
  let r, e = t[0], i = 1;
  for (; i < t.length; ) {
    const n = t[i], a = t[i + 1];
    if (i += 2, (n === "optionalAccess" || n === "optionalCall") && e == null)
      return;
    n === "access" || n === "optionalAccess" ? (r = e, e = a(e)) : (n === "call" || n === "optionalCall") && (e = a((...s) => e.call(r, ...s)), r = void 0);
  }
  return e;
}
class Dt extends Se {
  static __initStatic() {
    this.defaultVertexShader = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
gl_Position.xyw = projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0);
gl_Position.z = 0.0;

vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`;
  }
  static __initStatic2() {
    this.defaultFragmentShader = `
varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}`;
  }
  constructor(r, e, i, n) {
    super(r, e, i, n), Dt.prototype.__init.call(this), this.proj = new Lt(this.transform);
  }
  __init() {
    this.vertexData2d = null;
  }
  calculateVertices() {
    if (this.proj._affine) {
      this.vertexData2d = null, super.calculateVertices();
      return;
    }
    const r = this.geometry, e = r.buffers[0].data, i = this;
    if (r.vertexDirtyId === i.vertexDirty && i._transformID === i.transform._worldID)
      return;
    i._transformID = i.transform._worldID, i.vertexData.length !== e.length && (i.vertexData = new Float32Array(e.length)), (!this.vertexData2d || this.vertexData2d.length !== e.length * 3 / 2) && (this.vertexData2d = new Float32Array(e.length * 3));
    const n = this.proj.world.mat3, a = this.vertexData2d, s = i.vertexData;
    for (let o = 0; o < s.length / 2; o++) {
      const h = e[o * 2], u = e[o * 2 + 1], l = n[0] * h + n[3] * u + n[6], f = n[1] * h + n[4] * u + n[7], c = n[2] * h + n[5] * u + n[8];
      a[o * 3] = l, a[o * 3 + 1] = f, a[o * 3 + 2] = c, s[o * 2] = l / c, s[o * 2 + 1] = f / c;
    }
    i.vertexDirty = r.vertexDirtyId;
  }
  _renderDefault(r) {
    const e = this.shader;
    e.alpha = this.worldAlpha, e.update && e.update(), r.batch.flush(), Am([e, "access", (i) => i.program, "access", (i) => i.uniformData, "optionalAccess", (i) => i.translationMatrix]) && (e.uniforms.translationMatrix = this.worldTransform.toArray(!0)), r.shader.bind(e, !1), r.state.set(this.state), r.geometry.bind(this.geometry, e), r.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return ka.call(this, r, e, i, n, a);
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
}
Dt.__initStatic();
Dt.__initStatic2();
class Ht extends Vt {
  constructor(r) {
    super(r), Ht.prototype.__init.call(this), this.proj = new Lt(this.transform), this.pluginName = "batch2d";
  }
  __init() {
    this.vertexData2d = null;
  }
  _calculateBounds() {
    this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData);
  }
  calculateVertices() {
    const r = this._texture, e = this;
    if (this.proj._affine) {
      this.vertexData2d = null, super.calculateVertices();
      return;
    }
    this.vertexData2d || (this.vertexData2d = new Float32Array(12));
    const i = this.transform._worldID, n = r._updateID;
    if (e._transformID === i && this._textureID === n)
      return;
    this._textureID !== n && (this.uvs = r._uvs.uvsFloat32), e._transformID = i, this._textureID = n;
    const a = this.proj.world.mat3, s = this.vertexData2d, o = this.vertexData, h = r.trim, u = r.orig, l = this._anchor;
    let f, c, d, p;
    h ? (c = h.x - l._x * u.width, f = c + h.width, p = h.y - l._y * u.height, d = p + h.height) : (c = -l._x * u.width, f = c + u.width, p = -l._y * u.height, d = p + u.height), s[0] = a[0] * c + a[3] * p + a[6], s[1] = a[1] * c + a[4] * p + a[7], s[2] = a[2] * c + a[5] * p + a[8], s[3] = a[0] * f + a[3] * p + a[6], s[4] = a[1] * f + a[4] * p + a[7], s[5] = a[2] * f + a[5] * p + a[8], s[6] = a[0] * f + a[3] * d + a[6], s[7] = a[1] * f + a[4] * d + a[7], s[8] = a[2] * f + a[5] * d + a[8], s[9] = a[0] * c + a[3] * d + a[6], s[10] = a[1] * c + a[4] * d + a[7], s[11] = a[2] * c + a[5] * d + a[8], o[0] = s[0] / s[2], o[1] = s[1] / s[2], o[2] = s[3] / s[5], o[3] = s[4] / s[5], o[4] = s[6] / s[8], o[5] = s[7] / s[8], o[6] = s[9] / s[11], o[7] = s[10] / s[11];
  }
  calculateTrimmedVertices() {
    if (this.proj._affine) {
      super.calculateTrimmedVertices();
      return;
    }
    const r = this.transform._worldID, e = this._texture._updateID, i = this;
    if (!i.vertexTrimmedData)
      i.vertexTrimmedData = new Float32Array(8);
    else if (i._transformTrimmedID === r && this._textureTrimmedID === e)
      return;
    i._transformTrimmedID = r, this._textureTrimmedID = e;
    const n = this._texture, a = i.vertexTrimmedData, s = n.orig, o = this.tileProj ? this._width : s.width, h = this.tileProj ? this._height : s.height, u = this._anchor, l = this.proj.world.mat3, f = -u._x * o, c = f + o, d = -u._y * h, p = d + h;
    let v = 1 / (l[2] * f + l[5] * d + l[8]);
    a[0] = v * (l[0] * f + l[3] * d + l[6]), a[1] = v * (l[1] * f + l[4] * d + l[7]), v = 1 / (l[2] * c + l[5] * d + l[8]), a[2] = v * (l[0] * c + l[3] * d + l[6]), a[3] = v * (l[1] * c + l[4] * d + l[7]), v = 1 / (l[2] * c + l[5] * p + l[8]), a[4] = v * (l[0] * c + l[3] * p + l[6]), a[5] = v * (l[1] * c + l[4] * p + l[7]), v = 1 / (l[2] * f + l[5] * p + l[8]), a[6] = v * (l[0] * f + l[3] * p + l[6]), a[7] = v * (l[1] * f + l[4] * p + l[7]);
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return ka.call(this, r, e, i, n, a);
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
}
const Pm = new sr();
class Um extends el {
  constructor(r, e, i) {
    super(r, e, i), this.tileProj = new Lt(this.tileTransform), this.tileProj.reverseLocalOrder = !0, this.proj = new Lt(this.transform), this.pluginName = "tilingSprite2d", this.uvRespectAnchor = !0;
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return ka.call(this, r, e, i, n, a);
  }
  _render(r) {
    const e = this._texture;
    !e || !e.valid || (this.tileTransform.updateTransform(Pm), this.uvMatrix.update(), r.batch.setObjectRenderer(r.plugins[this.pluginName]), r.plugins[this.pluginName].render(this));
  }
}
function Wi() {
  this.proj || (this.proj = new Lt(this.transform), this.toLocal = ul.prototype.toLocal, Object.defineProperty(this, "worldTransform", {
    get: Nm,
    enumerable: !0,
    configurable: !0
  }));
}
gt.prototype.convertTo2d = Wi;
Vt.prototype.convertTo2d = function() {
  this.proj || (this.calculateVertices = Ht.prototype.calculateVertices, this.calculateTrimmedVertices = Ht.prototype.calculateTrimmedVertices, this._calculateBounds = Ht.prototype._calculateBounds, this.pluginName = "batch2d", Wi.call(this));
};
gt.prototype.convertSubtreeTo2d = function() {
  this.convertTo2d();
  for (let r = 0; r < this.children.length; r++)
    this.children[r].convertSubtreeTo2d();
};
hl.prototype.convertTo2d = ol.prototype.convertTo2d = function() {
  this.proj || (this.calculateVertices = Dt.prototype.calculateVertices, this._renderDefault = Dt.prototype._renderDefault, this.material.pluginName !== "batch2d" && (this.material = new Ge(this.material.texture, {
    program: Me.from(Dt.defaultVertexShader, Dt.defaultFragmentShader),
    pluginName: "batch2d"
  })), Wi.call(this));
};
el.prototype.convertTo2d = function() {
  this.proj || (this.tileProj = new Lt(this.tileTransform), this.tileProj.reverseLocalOrder = !0, this.uvRespectAnchor = !0, this.calculateTrimmedVertices = Ht.prototype.calculateTrimmedVertices, this._calculateBounds = Ht.prototype._calculateBounds, this._render = Um.prototype._render, this.pluginName = "tilingSprite2d", Wi.call(this));
};
class zr extends jr {
  constructor(r, e, i) {
    super(r, e, i), zr.prototype.__init.call(this), this.proj = new Lt(this.transform), this.pluginName = "batch2d";
  }
  __init() {
    this.vertexData2d = null;
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
}
zr.prototype.calculateVertices = Ht.prototype.calculateVertices;
zr.prototype.calculateTrimmedVertices = Ht.prototype.calculateTrimmedVertices;
zr.prototype._calculateBounds = Ht.prototype._calculateBounds;
const Om = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec3 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

vTextureCoord = aTextureCoord;
vMaskCoord = otherMatrix * vec3( aTextureCoord, 1.0);
}
`, Fm = `
varying vec3 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform vec4 maskClamp;

void main(void)
{
vec2 uv = vMaskCoord.xy / vMaskCoord.z;

float clip = step(3.5,
    step(maskClamp.x, uv.x) +
    step(maskClamp.y, uv.y) +
    step(uv.x, maskClamp.z) +
    step(uv.y, maskClamp.w));

vec4 original = texture2D(uSampler, vTextureCoord);
vec4 masky = texture2D(mask, uv);

original *= (masky.r * masky.a * alpha * clip);

gl_FragColor = original;
}
`, _u = new Nt();
class Bi extends ce {
  constructor(r) {
    super(Om, Fm), Bi.prototype.__init.call(this), r.renderable = !1, this.maskSprite = r;
  }
  __init() {
    this.maskMatrix = new Nt();
  }
  apply(r, e, i, n) {
    const a = this.maskSprite, s = this.maskSprite.texture;
    !s.valid || (s.uvMatrix || (s.uvMatrix = new Xr(s, 0)), s.uvMatrix.update(), this.uniforms.npmAlpha = s.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = a.texture, this.uniforms.otherMatrix = Bi.calculateSpriteMatrix(e, this.maskMatrix, a).prepend(s.uvMatrix.mapCoord), this.uniforms.alpha = a.worldAlpha, this.uniforms.maskClamp = s.uvMatrix.uClampFrame, r.applyFilter(this, e, i, n));
  }
  static calculateSpriteMatrix(r, e, i) {
    const n = i.proj, a = r.filterFrame, s = n && !n._affine ? n.world.copyTo2dOr3d(_u) : _u.copyFrom(i.transform.worldTransform), o = i.texture.orig;
    return e.set(r.width, 0, 0, r.height, a.x, a.y), s.invert(), e.setToMult(s, e), e.scaleAndTranslate(
      1 / o.width,
      1 / o.height,
      i.anchor.x,
      i.anchor.y
    ), e;
  }
}
Hu.prototype.pushSpriteMask = function(r) {
  const { maskObject: e } = r, i = r._target;
  let n = this.alphaMaskPool[this.alphaMaskIndex];
  n || (n = this.alphaMaskPool[this.alphaMaskIndex] = [new Bi(e)]), n[0].resolution = this.renderer.resolution, n[0].maskSprite = e;
  const a = i.filterArea;
  i.filterArea = e.getBounds(!0), this.renderer.filter.push(i, n), i.filterArea = a, this.alphaMaskIndex++;
};
Vr.registerPlugin("tilingSprite2d", Da);
class mu extends $ {
  constructor(r, e, i) {
    super(r, e), this.z = i;
  }
  set(r, e, i) {
    return this.x = r || 0, this.y = e === void 0 ? this.x : e || 0, this.z = e === void 0 ? this.x : i || 0, this;
  }
  copyFrom(r) {
    return this.set(r.x, r.y, r.z || 0), this;
  }
  copyTo(r) {
    return r.set(this.x, this.y, this.z), r;
  }
}
class wr extends _e {
  constructor(...r) {
    super(...r), wr.prototype.__init.call(this);
  }
  __init() {
    this._z = 0;
  }
  get z() {
    return this._z;
  }
  set z(r) {
    this._z !== r && (this._z = r, this.cb.call(this.scope));
  }
  set(r, e, i) {
    const n = r || 0, a = e === void 0 ? n : e || 0, s = e === void 0 ? n : i || 0;
    return (this._x !== n || this._y !== a || this._z !== s) && (this._x = n, this._y = a, this._z = s, this.cb.call(this.scope)), this;
  }
  copyFrom(r) {
    return this.set(r.x, r.y, r.z || 0), this;
  }
  copyTo(r) {
    return r.set(this._x, this._y, this._z), r;
  }
}
class Ke {
  constructor(r, e, i) {
    Ke.prototype.__init.call(this), Ke.prototype.__init2.call(this), Ke.prototype.__init3.call(this), this._x = r || 0, this._y = e || 0, this._z = i || 0, this.quaternion = new Float64Array(4), this.quaternion[3] = 1, this.update();
  }
  __init() {
    this._quatUpdateId = -1;
  }
  __init2() {
    this._quatDirtyId = 0;
  }
  __init3() {
    this._sign = 1;
  }
  get x() {
    return this._x;
  }
  set x(r) {
    this._x !== r && (this._x = r, this._quatDirtyId++);
  }
  get y() {
    return this._y;
  }
  set y(r) {
    this._y !== r && (this._y = r, this._quatDirtyId++);
  }
  get z() {
    return this._z;
  }
  set z(r) {
    this._z !== r && (this._z = r, this._quatDirtyId++);
  }
  get pitch() {
    return this._x;
  }
  set pitch(r) {
    this._x !== r && (this._x = r, this._quatDirtyId++);
  }
  get yaw() {
    return this._y;
  }
  set yaw(r) {
    this._y !== r && (this._y = r, this._quatDirtyId++);
  }
  get roll() {
    return this._z;
  }
  set roll(r) {
    this._z !== r && (this._z = r, this._quatDirtyId++);
  }
  set(r, e, i) {
    const n = r || 0, a = e || 0, s = i || 0;
    (this._x !== n || this._y !== a || this._z !== s) && (this._x = n, this._y = a, this._z = s, this._quatDirtyId++);
  }
  copyFrom(r) {
    const e = r.x, i = r.y, n = r.z;
    return (this._x !== e || this._y !== i || this._z !== n) && (this._x = e, this._y = i, this._z = n, this._quatDirtyId++), this;
  }
  copyTo(r) {
    return r.set(this._x, this._y, this._z), r;
  }
  equals(r) {
    return this._x === r.x && this._y === r.y && this._z === r.z;
  }
  clone() {
    return new Ke(this._x, this._y, this._z);
  }
  update() {
    if (this._quatUpdateId === this._quatDirtyId)
      return !1;
    this._quatUpdateId = this._quatDirtyId;
    const r = Math.cos(this._x / 2), e = Math.cos(this._y / 2), i = Math.cos(this._z / 2), n = this._sign, a = n * Math.sin(this._x / 2), s = n * Math.sin(this._y / 2), o = n * Math.sin(this._z / 2), h = this.quaternion;
    return h[0] = a * e * i + r * s * o, h[1] = r * s * i - a * e * o, h[2] = r * e * o + a * s * i, h[3] = r * e * i - a * s * o, !0;
  }
}
class Rr {
  constructor(r, e, i, n, a) {
    this.cb = r, this.scope = e, Rr.prototype.__init.call(this), Rr.prototype.__init2.call(this), Rr.prototype.__init3.call(this), this._x = i || 0, this._y = n || 0, this._z = a || 0, this.quaternion = new Float64Array(4), this.quaternion[3] = 1, this.update();
  }
  __init() {
    this._quatUpdateId = -1;
  }
  __init2() {
    this._quatDirtyId = 0;
  }
  __init3() {
    this._sign = 1;
  }
  get x() {
    return this._x;
  }
  set x(r) {
    this._x !== r && (this._x = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  get y() {
    return this._y;
  }
  set y(r) {
    this._y !== r && (this._y = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  get z() {
    return this._z;
  }
  set z(r) {
    this._z !== r && (this._z = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  get pitch() {
    return this._x;
  }
  set pitch(r) {
    this._x !== r && (this._x = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  get yaw() {
    return this._y;
  }
  set yaw(r) {
    this._y !== r && (this._y = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  get roll() {
    return this._z;
  }
  set roll(r) {
    this._z !== r && (this._z = r, this._quatDirtyId++, this.cb.call(this.scope));
  }
  set(r, e, i) {
    const n = r || 0, a = e || 0, s = i || 0;
    return (this._x !== n || this._y !== a || this._z !== s) && (this._x = n, this._y = a, this._z = s, this._quatDirtyId++, this.cb.call(this.scope)), this;
  }
  copyFrom(r) {
    const e = r.x, i = r.y, n = r.z;
    return (this._x !== e || this._y !== i || this._z !== n) && (this._x = e, this._y = i, this._z = n, this._quatDirtyId++, this.cb.call(this.scope)), this;
  }
  copyTo(r) {
    return r.set(this._x, this._y, this._z), r;
  }
  equals(r) {
    return this._x === r.x && this._y === r.y && this._z === r.z;
  }
  clone() {
    return new Ke(this._x, this._y, this._z);
  }
  update() {
    if (this._quatUpdateId === this._quatDirtyId)
      return !1;
    this._quatUpdateId = this._quatDirtyId;
    const r = Math.cos(this._x / 2), e = Math.cos(this._y / 2), i = Math.cos(this._z / 2), n = this._sign, a = n * Math.sin(this._x / 2), s = n * Math.sin(this._y / 2), o = n * Math.sin(this._z / 2), h = this.quaternion;
    return h[0] = a * e * i + r * s * o, h[1] = r * s * i - a * e * o, h[2] = r * e * o + a * s * i, h[3] = r * e * i - a * s * o, !0;
  }
}
const Lm = [
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1
];
class Tt {
  static __initStatic() {
    this.IDENTITY = new Tt();
  }
  static __initStatic2() {
    this.TEMP_MATRIX = new Tt();
  }
  __init() {
    this.floatArray = null;
  }
  __init2() {
    this._dirtyId = 0;
  }
  __init3() {
    this._updateId = -1;
  }
  __init4() {
    this._mat4inv = null;
  }
  __init5() {
    this.cacheInverse = !1;
  }
  constructor(r) {
    Tt.prototype.__init.call(this), Tt.prototype.__init2.call(this), Tt.prototype.__init3.call(this), Tt.prototype.__init4.call(this), Tt.prototype.__init5.call(this), this.mat4 = new Float64Array(r || Lm);
  }
  get a() {
    return this.mat4[0] / this.mat4[15];
  }
  set a(r) {
    this.mat4[0] = r * this.mat4[15];
  }
  get b() {
    return this.mat4[1] / this.mat4[15];
  }
  set b(r) {
    this.mat4[1] = r * this.mat4[15];
  }
  get c() {
    return this.mat4[4] / this.mat4[15];
  }
  set c(r) {
    this.mat4[4] = r * this.mat4[15];
  }
  get d() {
    return this.mat4[5] / this.mat4[15];
  }
  set d(r) {
    this.mat4[5] = r * this.mat4[15];
  }
  get tx() {
    return this.mat4[12] / this.mat4[15];
  }
  set tx(r) {
    this.mat4[12] = r * this.mat4[15];
  }
  get ty() {
    return this.mat4[13] / this.mat4[15];
  }
  set ty(r) {
    this.mat4[13] = r * this.mat4[15];
  }
  set(r, e, i, n, a, s) {
    const o = this.mat4;
    return o[0] = r, o[1] = e, o[2] = 0, o[3] = 0, o[4] = i, o[5] = n, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = 1, o[11] = 0, o[12] = a, o[13] = s, o[14] = 0, o[15] = 1, this;
  }
  toArray(r, e) {
    this.floatArray || (this.floatArray = new Float32Array(9));
    const i = e || this.floatArray, n = this.mat4;
    return r ? (i[0] = n[0], i[1] = n[1], i[2] = n[3], i[3] = n[4], i[4] = n[5], i[5] = n[7], i[6] = n[12], i[7] = n[13], i[8] = n[15]) : (i[0] = n[0], i[1] = n[4], i[2] = n[12], i[3] = n[2], i[4] = n[6], i[5] = n[13], i[6] = n[3], i[7] = n[7], i[8] = n[15]), i;
  }
  setToTranslation(r, e, i) {
    const n = this.mat4;
    n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = r, n[13] = e, n[14] = i, n[15] = 1;
  }
  setToRotationTranslationScale(r, e, i, n, a, s, o) {
    const h = this.mat4, u = r[0], l = r[1], f = r[2], c = r[3], d = u + u, p = l + l, v = f + f, _ = u * d, m = u * p, y = u * v, g = l * p, T = l * v, b = f * v, x = c * d, E = c * p, C = c * v;
    return h[0] = (1 - (g + b)) * a, h[1] = (m + C) * a, h[2] = (y - E) * a, h[3] = 0, h[4] = (m - C) * s, h[5] = (1 - (_ + b)) * s, h[6] = (T + x) * s, h[7] = 0, h[8] = (y + E) * o, h[9] = (T - x) * o, h[10] = (1 - (_ + g)) * o, h[11] = 0, h[12] = e, h[13] = i, h[14] = n, h[15] = 1, h;
  }
  apply(r, e) {
    e = e || new mu();
    const i = this.mat4, n = r.x, a = r.y, s = r.z || 0, o = 1 / (i[3] * n + i[7] * a + i[11] * s + i[15]);
    return e.x = o * (i[0] * n + i[4] * a + i[8] * s + i[12]), e.y = o * (i[1] * n + i[5] * a + i[9] * s + i[13]), e.z = o * (i[2] * n + i[6] * a + i[10] * s + i[14]), e;
  }
  translate(r, e, i) {
    const n = this.mat4;
    return n[12] = n[0] * r + n[4] * e + n[8] * i + n[12], n[13] = n[1] * r + n[5] * e + n[9] * i + n[13], n[14] = n[2] * r + n[6] * e + n[10] * i + n[14], n[15] = n[3] * r + n[7] * e + n[11] * i + n[15], this;
  }
  scale(r, e, i) {
    const n = this.mat4;
    return n[0] *= r, n[1] *= r, n[2] *= r, n[3] *= r, n[4] *= e, n[5] *= e, n[6] *= e, n[7] *= e, i !== void 0 && (n[8] *= i, n[9] *= i, n[10] *= i, n[11] *= i), this;
  }
  scaleAndTranslate(r, e, i, n, a, s) {
    const o = this.mat4;
    o[0] = r * o[0] + n * o[3], o[1] = e * o[1] + a * o[3], o[2] = i * o[2] + s * o[3], o[4] = r * o[4] + n * o[7], o[5] = e * o[5] + a * o[7], o[6] = i * o[6] + s * o[7], o[8] = r * o[8] + n * o[11], o[9] = e * o[9] + a * o[11], o[10] = i * o[10] + s * o[11], o[12] = r * o[12] + n * o[15], o[13] = e * o[13] + a * o[15], o[14] = i * o[14] + s * o[15];
  }
  applyInverse(r, e) {
    e = e || new mu(), this._mat4inv || (this._mat4inv = new Float64Array(16));
    const i = this._mat4inv, n = this.mat4, a = r.x, s = r.y;
    let o = r.z || 0;
    (!this.cacheInverse || this._updateId !== this._dirtyId) && (this._updateId = this._dirtyId, Tt.glMatrixMat4Invert(i, n));
    const h = 1 / (i[3] * a + i[7] * s + i[11] * o + i[15]), u = h * (i[0] * a + i[4] * s + i[8] * o + i[12]), l = h * (i[1] * a + i[5] * s + i[9] * o + i[13]), f = h * (i[2] * a + i[6] * s + i[10] * o + i[14]);
    o += 1;
    const c = 1 / (i[3] * a + i[7] * s + i[11] * o + i[15]), d = c * (i[0] * a + i[4] * s + i[8] * o + i[12]), p = c * (i[1] * a + i[5] * s + i[9] * o + i[13]), v = c * (i[2] * a + i[6] * s + i[10] * o + i[14]);
    Math.abs(f - v) < 1e-10 && e.set(NaN, NaN, 0);
    const _ = (0 - f) / (v - f);
    return e.set((d - u) * _ + u, (p - l) * _ + l, 0), e;
  }
  invert() {
    return Tt.glMatrixMat4Invert(this.mat4, this.mat4), this;
  }
  invertCopyTo(r) {
    this._mat4inv || (this._mat4inv = new Float64Array(16));
    const e = this._mat4inv, i = this.mat4;
    (!this.cacheInverse || this._updateId !== this._dirtyId) && (this._updateId = this._dirtyId, Tt.glMatrixMat4Invert(e, i)), r.mat4.set(e);
  }
  identity() {
    const r = this.mat4;
    return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, this;
  }
  clone() {
    return new Tt(this.mat4);
  }
  copyTo3d(r) {
    const e = this.mat4, i = r.mat4;
    return i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = e[4], i[5] = e[5], i[6] = e[6], i[7] = e[7], i[8] = e[8], r;
  }
  copyTo2d(r) {
    const e = this.mat4, i = r.mat3;
    return i[0] = e[0], i[1] = e[1], i[2] = e[3], i[3] = e[4], i[4] = e[5], i[5] = e[7], i[6] = e[12], i[7] = e[13], i[8] = e[15], r;
  }
  copyTo2dOr3d(r) {
    return r instanceof Nt ? this.copyTo2d(r) : this.copyTo3d(r);
  }
  copyTo(r, e, i) {
    const n = this.mat4, a = 1 / n[15], s = n[12] * a, o = n[13] * a;
    if (r.a = (n[0] - n[3] * s) * a, r.b = (n[1] - n[3] * o) * a, r.c = (n[4] - n[7] * s) * a, r.d = (n[5] - n[7] * o) * a, r.tx = s, r.ty = o, e >= 2) {
      let h = r.a * r.d - r.b * r.c;
      i || (h = Math.abs(h)), e === Zt.POINT ? (h > 0 ? h = 1 : h = -1, r.a = h, r.b = 0, r.c = 0, r.d = h) : e === Zt.AXIS_X ? (h /= Math.sqrt(r.b * r.b + r.d * r.d), r.c = 0, r.d = h) : e === Zt.AXIS_Y && (h /= Math.sqrt(r.a * r.a + r.c * r.c), r.a = h, r.c = 0);
    }
    return r;
  }
  copyFrom(r) {
    const e = this.mat4;
    return e[0] = r.a, e[1] = r.b, e[2] = 0, e[3] = 0, e[4] = r.c, e[5] = r.d, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = r.tx, e[13] = r.ty, e[14] = 0, e[15] = 1, this._dirtyId++, this;
  }
  setToMultLegacy(r, e) {
    const i = this.mat4, n = e.mat4, a = r.a, s = r.b, o = r.c, h = r.d, u = r.tx, l = r.ty;
    let f = n[0], c = n[1], d = n[2], p = n[3];
    return i[0] = f * a + c * o + p * u, i[1] = f * s + c * h + p * l, i[2] = d, i[3] = p, f = n[4], c = n[5], d = n[6], p = n[7], i[4] = f * a + c * o + p * u, i[5] = f * s + c * h + p * l, i[6] = d, i[7] = p, f = n[8], c = n[9], d = n[10], p = n[11], i[8] = f * a + c * o + p * u, i[9] = f * s + c * h + p * l, i[10] = d, i[11] = p, f = n[12], c = n[13], d = n[14], p = n[15], i[12] = f * a + c * o + p * u, i[13] = f * s + c * h + p * l, i[14] = d, i[15] = p, this._dirtyId++, this;
  }
  setToMultLegacy2(r, e) {
    const i = this.mat4, n = r.mat4, a = n[0], s = n[1], o = n[2], h = n[3], u = n[4], l = n[5], f = n[6], c = n[7], d = e.a, p = e.b, v = e.c, _ = e.d, m = e.tx, y = e.ty;
    return i[0] = d * a + p * u, i[1] = d * s + p * l, i[2] = d * o + p * f, i[3] = d * h + p * c, i[4] = v * a + _ * u, i[5] = v * s + _ * l, i[6] = v * o + _ * f, i[7] = v * h + _ * c, i[8] = n[8], i[9] = n[9], i[10] = n[10], i[11] = n[11], i[12] = m * a + y * u + n[12], i[13] = m * s + y * l + n[13], i[14] = m * o + y * f + n[14], i[15] = m * h + y * c + n[15], this._dirtyId++, this;
  }
  setToMult(r, e) {
    return Tt.glMatrixMat4Multiply(this.mat4, r.mat4, e.mat4), this._dirtyId++, this;
  }
  prepend(r) {
    r.mat4 ? this.setToMult(r, this) : this.setToMultLegacy(r, this);
  }
  static glMatrixMat4Invert(r, e) {
    const i = e[0], n = e[1], a = e[2], s = e[3], o = e[4], h = e[5], u = e[6], l = e[7], f = e[8], c = e[9], d = e[10], p = e[11], v = e[12], _ = e[13], m = e[14], y = e[15], g = i * h - n * o, T = i * u - a * o, b = i * l - s * o, x = n * u - a * h, E = n * l - s * h, C = a * l - s * u, w = f * _ - c * v, R = f * m - d * v, F = f * y - p * v, M = c * m - d * _, k = c * y - p * _, Q = d * y - p * m;
    let A = g * Q - T * k + b * M + x * F - E * R + C * w;
    return A ? (A = 1 / A, r[0] = (h * Q - u * k + l * M) * A, r[1] = (a * k - n * Q - s * M) * A, r[2] = (_ * C - m * E + y * x) * A, r[3] = (d * E - c * C - p * x) * A, r[4] = (u * F - o * Q - l * R) * A, r[5] = (i * Q - a * F + s * R) * A, r[6] = (m * b - v * C - y * T) * A, r[7] = (f * C - d * b + p * T) * A, r[8] = (o * k - h * F + l * w) * A, r[9] = (n * F - i * k - s * w) * A, r[10] = (v * E - _ * b + y * g) * A, r[11] = (c * b - f * E - p * g) * A, r[12] = (h * R - o * M - u * w) * A, r[13] = (i * M - n * R + a * w) * A, r[14] = (_ * T - v * x - m * g) * A, r[15] = (f * x - c * T + d * g) * A, r) : null;
  }
  static glMatrixMat4Multiply(r, e, i) {
    const n = e[0], a = e[1], s = e[2], o = e[3], h = e[4], u = e[5], l = e[6], f = e[7], c = e[8], d = e[9], p = e[10], v = e[11], _ = e[12], m = e[13], y = e[14], g = e[15];
    let T = i[0], b = i[1], x = i[2], E = i[3];
    return r[0] = T * n + b * h + x * c + E * _, r[1] = T * a + b * u + x * d + E * m, r[2] = T * s + b * l + x * p + E * y, r[3] = T * o + b * f + x * v + E * g, T = i[4], b = i[5], x = i[6], E = i[7], r[4] = T * n + b * h + x * c + E * _, r[5] = T * a + b * u + x * d + E * m, r[6] = T * s + b * l + x * p + E * y, r[7] = T * o + b * f + x * v + E * g, T = i[8], b = i[9], x = i[10], E = i[11], r[8] = T * n + b * h + x * c + E * _, r[9] = T * a + b * u + x * d + E * m, r[10] = T * s + b * l + x * p + E * y, r[11] = T * o + b * f + x * v + E * g, T = i[12], b = i[13], x = i[14], E = i[15], r[12] = T * n + b * h + x * c + E * _, r[13] = T * a + b * u + x * d + E * m, r[14] = T * s + b * l + x * p + E * y, r[15] = T * o + b * f + x * v + E * g, r;
  }
}
Tt.__initStatic();
Tt.__initStatic2();
const yu = new Tt();
class Ut extends ve {
  constructor(r, e) {
    super(r, e), Ut.prototype.__init.call(this), Ut.prototype.__init2.call(this), Ut.prototype.__init3.call(this), Ut.prototype.__init4.call(this), Ut.prototype.__init5.call(this), Ut.prototype.__init6.call(this), this.local = new Tt(), this.world = new Tt(), this.local.cacheInverse = !0, this.world.cacheInverse = !0, this.position._z = 0, this.scale._z = 1, this.pivot._z = 0;
  }
  __init() {
    this.cameraMatrix = null;
  }
  __init2() {
    this._cameraMode = !1;
  }
  get cameraMode() {
    return this._cameraMode;
  }
  set cameraMode(r) {
    this._cameraMode !== r && (this._cameraMode = r, this.euler._sign = this._cameraMode ? -1 : 1, this.euler._quatDirtyId++, r && (this.cameraMatrix = new Tt()));
  }
  __init3() {
    this.position = new wr(this.onChange, this, 0, 0);
  }
  __init4() {
    this.scale = new wr(this.onChange, this, 1, 1);
  }
  __init5() {
    this.euler = new Rr(this.onChange, this, 0, 0, 0);
  }
  __init6() {
    this.pivot = new wr(this.onChange, this, 0, 0);
  }
  onChange() {
    this._projID++;
  }
  clear() {
    this.cameraMatrix && this.cameraMatrix.identity(), this.position.set(0, 0, 0), this.scale.set(1, 1, 1), this.euler.set(0, 0, 0), this.pivot.set(0, 0, 0), super.clear();
  }
  updateLocalTransform(r) {
    if (this._projID === 0) {
      this.local.copyFrom(r);
      return;
    }
    const e = this.local, i = this.euler, n = this.position, a = this.scale, s = this.pivot;
    if (i.update(), !this.cameraMode) {
      e.setToRotationTranslationScale(i.quaternion, n._x, n._y, n._z, a._x, a._y, a._z), e.translate(-s._x, -s._y, -s._z), e.setToMultLegacy(r, e);
      return;
    }
    e.setToMultLegacy(r, this.cameraMatrix), e.translate(s._x, s._y, s._z), e.scale(1 / a._x, 1 / a._y, 1 / a._z), yu.setToRotationTranslationScale(i.quaternion, 0, 0, 0, 1, 1, 1), e.setToMult(e, yu), e.translate(-n._x, -n._y, -n._z), this.local._dirtyId++;
  }
}
function Sm() {
  return this.proj.affine ? this.transform.worldTransform : this.proj.world;
}
class ir extends gt {
  constructor() {
    super(), this.proj = new Ut(this.transform);
  }
  isFrontFace(r = !1) {
    r && (this._recursivePostUpdateTransform(), this.displayObjectUpdateTransform());
    const e = this.proj.world.mat4, i = e[0] * e[15] - e[3] * e[12], n = e[1] * e[15] - e[3] * e[13], a = e[4] * e[15] - e[7] * e[12], s = e[5] * e[15] - e[7] * e[13];
    return i * s - a * n > 0;
  }
  getDepth(r = !1) {
    r && (this._recursivePostUpdateTransform(), this.displayObjectUpdateTransform());
    const e = this.proj.world.mat4;
    return e[14] / e[15];
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return e && (r = e.toGlobal(r, i, n)), n || this._recursivePostUpdateTransform(), a === Ct.ALL ? (n || this.displayObjectUpdateTransform(), this.proj.affine ? this.transform.worldTransform.applyInverse(r, i) : this.proj.world.applyInverse(r, i)) : (this.parent ? i = this.parent.worldTransform.applyInverse(r, i) : (i.x = r.x, i.y = r.y, i.z = r.z), a === Ct.NONE || (i = this.transform.localTransform.applyInverse(i, i), a === Ct.PROJ && this.proj.cameraMode && (i = this.proj.cameraMatrix.applyInverse(i, i))), i);
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
  get position3d() {
    return this.proj.position;
  }
  set position3d(r) {
    this.proj.position.copyFrom(r);
  }
  get scale3d() {
    return this.proj.scale;
  }
  set scale3d(r) {
    this.proj.scale.copyFrom(r);
  }
  get euler() {
    return this.proj.euler;
  }
  set euler(r) {
    this.proj.euler.copyFrom(r);
  }
  get pivot3d() {
    return this.proj.pivot;
  }
  set pivot3d(r) {
    this.proj.pivot.copyFrom(r);
  }
}
const Ha = ir.prototype.toLocal, Xa = ir.prototype.getDepth, Va = ir.prototype.isFrontFace;
class Br extends Se {
  constructor(r, e, i, n) {
    super(r, e, i, n), Br.prototype.__init.call(this), this.proj = new Ut(this.transform);
  }
  __init() {
    this.vertexData2d = null;
  }
  calculateVertices() {
    if (this.proj._affine) {
      this.vertexData2d = null, super.calculateVertices();
      return;
    }
    const r = this.geometry, e = r.buffers[0].data, i = this;
    if (r.vertexDirtyId === i.vertexDirty && i._transformID === i.transform._worldID)
      return;
    i._transformID = i.transform._worldID, i.vertexData.length !== e.length && (i.vertexData = new Float32Array(e.length)), (!this.vertexData2d || this.vertexData2d.length !== e.length * 3 / 2) && (this.vertexData2d = new Float32Array(e.length * 3));
    const n = this.proj.world.mat4, a = this.vertexData2d, s = i.vertexData;
    for (let o = 0; o < s.length / 2; o++) {
      const h = e[o * 2], u = e[o * 2 + 1], l = n[0] * h + n[4] * u + n[12], f = n[1] * h + n[5] * u + n[13], c = n[3] * h + n[7] * u + n[15];
      a[o * 3] = l, a[o * 3 + 1] = f, a[o * 3 + 2] = c, s[o * 2] = l / c, s[o * 2 + 1] = f / c;
    }
    i.vertexDirty = r.vertexDirtyId;
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return Ha.call(this, r, e, i, n, a);
  }
  isFrontFace(r) {
    return Va.call(this, r);
  }
  getDepth(r) {
    return Xa.call(this, r);
  }
  get position3d() {
    return this.proj.position;
  }
  set position3d(r) {
    this.proj.position.copyFrom(r);
  }
  get scale3d() {
    return this.proj.scale;
  }
  set scale3d(r) {
    this.proj.scale.copyFrom(r);
  }
  get euler() {
    return this.proj.euler;
  }
  set euler(r) {
    this.proj.euler.copyFrom(r);
  }
  get pivot3d() {
    return this.proj.pivot;
  }
  set pivot3d(r) {
    this.proj.pivot.copyFrom(r);
  }
}
Br.prototype._renderDefault = Dt.prototype._renderDefault;
class Pt extends Vt {
  constructor(r) {
    super(r), Pt.prototype.__init.call(this), Pt.prototype.__init2.call(this), Pt.prototype.__init3.call(this), this.proj = new Ut(this.transform), this.pluginName = "batch2d";
  }
  __init() {
    this.vertexData2d = null;
  }
  __init2() {
    this.culledByFrustrum = !1;
  }
  __init3() {
    this.trimmedCulledByFrustrum = !1;
  }
  calculateVertices() {
    const r = this._texture;
    if (this.proj._affine) {
      this.vertexData2d = null, super.calculateVertices();
      return;
    }
    this.vertexData2d || (this.vertexData2d = new Float32Array(12));
    const e = this.transform._worldID, i = r._updateID, n = this;
    if (n._transformID === e && this._textureID === i)
      return;
    this._textureID !== i && (this.uvs = r._uvs.uvsFloat32), n._transformID = e, this._textureID = i;
    const a = this.proj.world.mat4, s = this.vertexData2d, o = this.vertexData, h = r.trim, u = r.orig, l = this._anchor;
    let f, c, d, p;
    h ? (c = h.x - l._x * u.width, f = c + h.width, p = h.y - l._y * u.height, d = p + h.height) : (c = -l._x * u.width, f = c + u.width, p = -l._y * u.height, d = p + u.height);
    let v = !1, _;
    s[0] = a[0] * c + a[4] * p + a[12], s[1] = a[1] * c + a[5] * p + a[13], _ = a[2] * c + a[6] * p + a[14], s[2] = a[3] * c + a[7] * p + a[15], v = v || _ < 0, s[3] = a[0] * f + a[4] * p + a[12], s[4] = a[1] * f + a[5] * p + a[13], _ = a[2] * f + a[6] * p + a[14], s[5] = a[3] * f + a[7] * p + a[15], v = v || _ < 0, s[6] = a[0] * f + a[4] * d + a[12], s[7] = a[1] * f + a[5] * d + a[13], _ = a[2] * f + a[6] * d + a[14], s[8] = a[3] * f + a[7] * d + a[15], v = v || _ < 0, s[9] = a[0] * c + a[4] * d + a[12], s[10] = a[1] * c + a[5] * d + a[13], _ = a[2] * c + a[6] * d + a[14], s[11] = a[3] * c + a[7] * d + a[15], v = v || _ < 0, this.culledByFrustrum = v, o[0] = s[0] / s[2], o[1] = s[1] / s[2], o[2] = s[3] / s[5], o[3] = s[4] / s[5], o[4] = s[6] / s[8], o[5] = s[7] / s[8], o[6] = s[9] / s[11], o[7] = s[10] / s[11];
  }
  calculateTrimmedVertices() {
    if (this.proj._affine) {
      super.calculateTrimmedVertices();
      return;
    }
    const r = this.transform._worldID, e = this._texture._updateID, i = this;
    if (!i.vertexTrimmedData)
      i.vertexTrimmedData = new Float32Array(8);
    else if (i._transformTrimmedID === r && this._textureTrimmedID === e)
      return;
    i._transformTrimmedID = r, this._textureTrimmedID = e;
    const n = this._texture, a = i.vertexTrimmedData, s = n.orig, o = this._anchor, h = this.proj.world.mat4, u = -o._x * s.width, l = u + s.width, f = -o._y * s.height, c = f + s.height;
    let d = !1, p, v = 1 / (h[3] * u + h[7] * f + h[15]);
    a[0] = v * (h[0] * u + h[4] * f + h[12]), a[1] = v * (h[1] * u + h[5] * f + h[13]), p = h[2] * u + h[6] * f + h[14], d = d || p < 0, v = 1 / (h[3] * l + h[7] * f + h[15]), a[2] = v * (h[0] * l + h[4] * f + h[12]), a[3] = v * (h[1] * l + h[5] * f + h[13]), p = h[2] * l + h[6] * f + h[14], d = d || p < 0, v = 1 / (h[3] * l + h[7] * c + h[15]), a[4] = v * (h[0] * l + h[4] * c + h[12]), a[5] = v * (h[1] * l + h[5] * c + h[13]), p = h[2] * l + h[6] * c + h[14], d = d || p < 0, v = 1 / (h[3] * u + h[7] * c + h[15]), a[6] = v * (h[0] * u + h[4] * c + h[12]), a[7] = v * (h[1] * u + h[5] * c + h[13]), p = h[2] * u + h[6] * c + h[14], d = d || p < 0, this.culledByFrustrum = d;
  }
  _calculateBounds() {
    if (this.calculateVertices(), this.culledByFrustrum)
      return;
    const r = this._texture.trim, e = this._texture.orig;
    if (!r || r.width === e.width && r.height === e.height) {
      this._bounds.addQuad(this.vertexData);
      return;
    }
    this.calculateTrimmedVertices(), this.trimmedCulledByFrustrum || this._bounds.addQuad(this.vertexTrimmedData);
  }
  _render(r) {
    this.calculateVertices(), !this.culledByFrustrum && (r.batch.setObjectRenderer(r.plugins[this.pluginName]), r.plugins[this.pluginName].render(this));
  }
  containsPoint(r) {
    return this.culledByFrustrum ? !1 : super.containsPoint(r);
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return Ha.call(this, r, e, i, n, a);
  }
  isFrontFace(r) {
    return Va.call(this, r);
  }
  getDepth(r) {
    return Xa.call(this, r);
  }
  get position3d() {
    return this.proj.position;
  }
  set position3d(r) {
    this.proj.position.copyFrom(r);
  }
  get scale3d() {
    return this.proj.scale;
  }
  set scale3d(r) {
    this.proj.scale.copyFrom(r);
  }
  get euler() {
    return this.proj.euler;
  }
  set euler(r) {
    this.proj.euler.copyFrom(r);
  }
  get pivot3d() {
    return this.proj.pivot;
  }
  set pivot3d(r) {
    this.proj.pivot.copyFrom(r);
  }
}
const Gm = {
  worldTransform: {
    get: Sm,
    enumerable: !0,
    configurable: !0
  },
  position3d: {
    get() {
      return this.proj.position;
    },
    set(t) {
      this.proj.position.copy(t);
    }
  },
  scale3d: {
    get() {
      return this.proj.scale;
    },
    set(t) {
      this.proj.scale.copy(t);
    }
  },
  pivot3d: {
    get() {
      return this.proj.pivot;
    },
    set(t) {
      this.proj.pivot.copy(t);
    }
  },
  euler: {
    get() {
      return this.proj.euler;
    },
    set(t) {
      this.proj.euler.copy(t);
    }
  }
};
function ja() {
  this.proj || (this.proj = new Ut(this.transform), this.toLocal = ir.prototype.toLocal, this.isFrontFace = ir.prototype.isFrontFace, this.getDepth = ir.prototype.getDepth, Object.defineProperties(this, Gm));
}
gt.prototype.convertTo3d = ja;
Vt.prototype.convertTo3d = function() {
  this.proj || (this.calculateVertices = Pt.prototype.calculateVertices, this.calculateTrimmedVertices = Pt.prototype.calculateTrimmedVertices, this._calculateBounds = Pt.prototype._calculateBounds, this.containsPoint = Pt.prototype.containsPoint, this.pluginName = "batch2d", ja.call(this));
};
gt.prototype.convertSubtreeTo3d = function() {
  this.convertTo3d();
  for (let r = 0; r < this.children.length; r++)
    this.children[r].convertSubtreeTo3d();
};
hl.prototype.convertTo3d = ol.prototype.convertTo3d = function() {
  this.proj || (this.calculateVertices = Br.prototype.calculateVertices, this._renderDefault = Br.prototype._renderDefault, this.material.pluginName !== "batch2d" && (this.material = new Ge(this.material.texture, {
    program: Me.from(Dt.defaultVertexShader, Dt.defaultFragmentShader),
    pluginName: "batch2d"
  })), ja.call(this));
};
class ke extends jr {
  constructor(r, e, i) {
    super(r, e, i), ke.prototype.__init.call(this), this.proj = new Ut(this.transform), this.pluginName = "batch2d";
  }
  __init() {
    this.vertexData2d = null;
  }
  get worldTransform() {
    return this.proj.affine ? this.transform.worldTransform : this.proj.world;
  }
  toLocal(r, e, i, n, a = Ct.ALL) {
    return Ha.call(this, r, e, i, n, a);
  }
  isFrontFace(r) {
    return Va.call(this, r);
  }
  getDepth(r) {
    return Xa.call(this, r);
  }
  get position3d() {
    return this.proj.position;
  }
  set position3d(r) {
    this.proj.position.copyFrom(r);
  }
  get scale3d() {
    return this.proj.scale;
  }
  set scale3d(r) {
    this.proj.scale.copyFrom(r);
  }
  get euler() {
    return this.proj.euler;
  }
  set euler(r) {
    this.proj.euler.copyFrom(r);
  }
  get pivot3d() {
    return this.proj.pivot;
  }
  set pivot3d(r) {
    this.proj.pivot.copyFrom(r);
  }
}
ke.prototype.calculateVertices = Pt.prototype.calculateVertices;
ke.prototype.calculateTrimmedVertices = Pt.prototype.calculateTrimmedVertices;
ke.prototype._calculateBounds = Pt.prototype._calculateBounds;
ke.prototype.containsPoint = Pt.prototype.containsPoint;
ke.prototype._render = Pt.prototype._render;
var yr;
const Bm = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec3 aTrans1;
attribute vec3 aTrans2;
attribute vec2 aSamplerSize;
attribute vec4 aFrame;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;

varying vec2 vertexPosition;
varying vec3 vTrans1;
varying vec3 vTrans2;
varying vec2 vSamplerSize;
varying vec4 vFrame;
varying vec4 vColor;
varying float vTextureId;

void main(void){
gl_Position.xyw = projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0);
gl_Position.z = 0.0;

vertexPosition = aVertexPosition;
vTrans1 = aTrans1;
vTrans2 = aTrans2;
vTextureId = aTextureId;
vColor = aColor;
vSamplerSize = aSamplerSize;
vFrame = aFrame;
}
`, Mm = `precision highp float;
varying vec2 vertexPosition;
varying vec3 vTrans1;
varying vec3 vTrans2;
varying vec2 vSamplerSize;
varying vec4 vFrame;
varying vec4 vColor;
varying float vTextureId;

uniform sampler2D uSamplers[%count%];
uniform vec4 distortion;

void main(void){
vec2 surface;
vec2 surface2;

float vx = vertexPosition.x;
float vy = vertexPosition.y;
float dx = distortion.x;
float dy = distortion.y;
float revx = distortion.z;
float revy = distortion.w;

if (distortion.x == 0.0) {
surface.x = vx;
surface.y = vy / (1.0 + dy * vx);
surface2 = surface;
} else
if (distortion.y == 0.0) {
surface.y = vy;
surface.x = vx / (1.0 + dx * vy);
surface2 = surface;
} else {
float c = vy * dx - vx * dy;
float b = (c + 1.0) * 0.5;
float b2 = (-c + 1.0) * 0.5;
float d = b * b + vx * dy;
if (d < -0.00001) {
    discard;
}
d = sqrt(max(d, 0.0));
surface.x = (- b + d) * revy;
surface2.x = (- b - d) * revy;
surface.y = (- b2 + d) * revx;
surface2.y = (- b2 - d) * revx;
}

vec2 uv;
uv.x = vTrans1.x * surface.x + vTrans1.y * surface.y + vTrans1.z;
uv.y = vTrans2.x * surface.x + vTrans2.y * surface.y + vTrans2.z;

vec2 pixels = uv * vSamplerSize;

if (pixels.x < vFrame.x || pixels.x > vFrame.z ||
pixels.y < vFrame.y || pixels.y > vFrame.w) {
uv.x = vTrans1.x * surface2.x + vTrans1.y * surface2.y + vTrans1.z;
uv.y = vTrans2.x * surface2.x + vTrans2.y * surface2.y + vTrans2.z;
pixels = uv * vSamplerSize;

if (pixels.x < vFrame.x || pixels.x > vFrame.z ||
   pixels.y < vFrame.y || pixels.y > vFrame.w) {
   discard;
}
}

vec4 edge;
edge.xy = clamp(pixels - vFrame.xy + 0.5, vec2(0.0, 0.0), vec2(1.0, 1.0));
edge.zw = clamp(vFrame.zw - pixels + 0.5, vec2(0.0, 0.0), vec2(1.0, 1.0));

float alpha = 1.0; //edge.x * edge.y * edge.z * edge.w;
vec4 rColor = vColor * alpha;

float textureId = floor(vTextureId+0.5);
vec2 vTextureCoord = uv;
vec4 color;
%forloop%
gl_FragColor = color * rColor;
}`;
class Dm extends Be {
  constructor(r = !1) {
    super(), this._buffer = new dt(null, r, !1), this._indexBuffer = new dt(null, r, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, G.FLOAT).addAttribute("aTrans1", this._buffer, 3, !1, G.FLOAT).addAttribute("aTrans2", this._buffer, 3, !1, G.FLOAT).addAttribute("aSamplerSize", this._buffer, 2, !1, G.FLOAT).addAttribute("aFrame", this._buffer, 4, !1, G.FLOAT).addAttribute("aColor", this._buffer, 4, !0, G.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, G.FLOAT).addIndex(this._indexBuffer);
  }
}
class km {
  static create(r) {
    const { vertex: e, fragment: i, vertexSize: n, geometryClass: a } = Object.assign({
      vertex: Bm,
      fragment: Mm,
      geometryClass: Dm,
      vertexSize: 16
    }, r);
    return yr = class extends Gi {
      constructor(o) {
        super(o), yr.prototype.__init.call(this), yr.prototype.__init2.call(this), yr.prototype.__init3.call(this), this.shaderGenerator = new Sa(e, i), this.geometryClass = a, this.vertexSize = n;
      }
      __init() {
        this.defUniforms = {
          translationMatrix: new ft(),
          distortion: new Float32Array([0, 0, 1 / 0, 1 / 0])
        };
      }
      __init2() {
        this.size = 1e3;
      }
      __init3() {
        this.forceMaxTextures = 1;
      }
      getUniforms(o) {
        const { proj: h } = o;
        return h.surface !== null ? h.uniforms : h._activeProjection !== null ? h._activeProjection.uniforms : this.defUniforms;
      }
      packInterleavedGeometry(o, h, u, l, f) {
        const {
          uint32View: c,
          float32View: d
        } = h, p = l / this.vertexSize, v = o.indices, _ = o.vertexData, y = o._texture._frame, g = o.aTrans, { _batchLocation: T, realWidth: b, realHeight: x, resolution: E } = o._texture.baseTexture, C = Math.min(o.worldAlpha, 1), w = C < 1 && o._texture.baseTexture.alphaMode ? Dr(o._tintRGB, C) : o._tintRGB + (C * 255 << 24);
        for (let R = 0; R < _.length; R += 2)
          d[l] = _[R], d[l + 1] = _[R + 1], d[l + 2] = g.a, d[l + 3] = g.c, d[l + 4] = g.tx, d[l + 5] = g.b, d[l + 6] = g.d, d[l + 7] = g.ty, d[l + 8] = b, d[l + 9] = x, d[l + 10] = y.x * E, d[l + 11] = y.y * E, d[l + 12] = (y.x + y.width) * E, d[l + 13] = (y.y + y.height) * E, c[l + 14] = w, d[l + 15] = T, l += 16;
        for (let R = 0; R < v.length; R++)
          u[f++] = p + v[R];
      }
    }, yr;
  }
}
const S = [new $(), new $(), new $(), new $()], we = [0, 0, 0, 0];
class Qe {
  constructor() {
    Qe.prototype.__init.call(this), Qe.prototype.__init2.call(this), Qe.prototype.__init3.call(this), Qe.prototype.__init4.call(this);
  }
  __init() {
    this.surfaceID = "default";
  }
  __init2() {
    this._updateID = 0;
  }
  __init3() {
    this.vertexSrc = "";
  }
  __init4() {
    this.fragmentSrc = "";
  }
  fillUniforms(r) {
  }
  clear() {
  }
  boundsQuad(r, e, i) {
    let n = e[0], a = e[1], s = e[0], o = e[1];
    for (let h = 2; h < 8; h += 2)
      n > e[h] && (n = e[h]), s < e[h] && (s = e[h]), a > e[h + 1] && (a = e[h + 1]), o < e[h + 1] && (o = e[h + 1]);
    if (S[0].set(n, a), this.apply(S[0], S[0]), S[1].set(s, a), this.apply(S[1], S[1]), S[2].set(s, o), this.apply(S[2], S[2]), S[3].set(n, o), this.apply(S[3], S[3]), i)
      i.apply(S[0], S[0]), i.apply(S[1], S[1]), i.apply(S[2], S[2]), i.apply(S[3], S[3]), e[0] = S[0].x, e[1] = S[0].y, e[2] = S[1].x, e[3] = S[1].y, e[4] = S[2].x, e[5] = S[2].y, e[6] = S[3].x, e[7] = S[3].y;
    else {
      for (let h = 1; h <= 3; h++)
        if (S[h].y < S[0].y || S[h].y === S[0].y && S[h].x < S[0].x) {
          const u = S[0];
          S[0] = S[h], S[h] = u;
        }
      for (let h = 1; h <= 3; h++)
        we[h] = Math.atan2(S[h].y - S[0].y, S[h].x - S[0].x);
      for (let h = 1; h <= 3; h++)
        for (let u = h + 1; u <= 3; u++)
          if (we[h] > we[u]) {
            const l = S[h];
            S[h] = S[u], S[u] = l;
            const f = we[h];
            we[h] = we[u], we[u] = f;
          }
      if (e[0] = S[0].x, e[1] = S[0].y, e[2] = S[1].x, e[3] = S[1].y, e[4] = S[2].x, e[5] = S[2].y, e[6] = S[3].x, e[7] = S[3].y, (S[3].x - S[2].x) * (S[1].y - S[2].y) - (S[1].x - S[2].x) * (S[3].y - S[2].y) < 0) {
        e[4] = S[3].x, e[5] = S[3].y;
        return;
      }
    }
  }
}
const Hm = new ft(), xr = new K(), gr = new $();
class Mi extends Qe {
  constructor(...r) {
    super(...r), Mi.prototype.__init.call(this);
  }
  __init() {
    this.distortion = new $();
  }
  clear() {
    this.distortion.set(0, 0);
  }
  apply(r, e) {
    e = e || new $();
    const i = this.distortion, n = r.x * r.y;
    return e.x = r.x + i.x * n, e.y = r.y + i.y * n, e;
  }
  applyInverse(r, e) {
    e = e || new $();
    const i = r.x, n = r.y, a = this.distortion.x, s = this.distortion.y;
    if (a === 0)
      e.x = i, e.y = n / (1 + s * i);
    else if (s === 0)
      e.y = n, e.x = i / (1 + a * n);
    else {
      const o = (n * a - i * s + 1) * 0.5 / s, h = o * o + i / s;
      if (h <= 1e-5)
        return e.set(NaN, NaN), e;
      s > 0 ? e.x = -o + Math.sqrt(h) : e.x = -o - Math.sqrt(h), e.y = (i / e.x - 1) / a;
    }
    return e;
  }
  mapSprite(r, e, i) {
    const n = r.texture;
    return xr.x = -r.anchor.x * n.orig.width, xr.y = -r.anchor.y * n.orig.height, xr.width = n.orig.width, xr.height = n.orig.height, this.mapQuad(xr, e, i || r.transform);
  }
  mapQuad(r, e, i) {
    const n = -r.x / r.width, a = -r.y / r.height, s = (1 - r.x) / r.width, o = (1 - r.y) / r.height, h = e[0].x * (1 - n) + e[1].x * n, u = e[0].y * (1 - n) + e[1].y * n, l = e[0].x * (1 - s) + e[1].x * s, f = e[0].y * (1 - s) + e[1].y * s, c = e[3].x * (1 - n) + e[2].x * n, d = e[3].y * (1 - n) + e[2].y * n, p = e[3].x * (1 - s) + e[2].x * s, v = e[3].y * (1 - s) + e[2].y * s, _ = h * (1 - a) + c * a, m = u * (1 - a) + d * a, y = l * (1 - a) + p * a, g = f * (1 - a) + v * a, T = h * (1 - o) + c * o, b = u * (1 - o) + d * o, x = l * (1 - o) + p * o, E = f * (1 - o) + v * o, C = Hm;
    return C.tx = _, C.ty = m, C.a = y - _, C.b = g - m, C.c = T - _, C.d = b - m, gr.set(x, E), C.applyInverse(gr, gr), this.distortion.set(gr.x - 1, gr.y - 1), i.setFromMatrix(C), this;
  }
  fillUniforms(r) {
    r.distortion = r.distortion || new Float32Array([0, 0, 0, 0]);
    const e = Math.abs(this.distortion.x), i = Math.abs(this.distortion.y);
    r.distortion[0] = e * 1e4 <= i ? 0 : this.distortion.x, r.distortion[1] = i * 1e4 <= e ? 0 : this.distortion.y, r.distortion[2] = 1 / r.distortion[0], r.distortion[3] = 1 / r.distortion[1];
  }
}
const xu = sr.prototype.updateTransform;
function Xm(t) {
  const r = this.proj, e = t.proj, i = this;
  if (!e) {
    xu.call(this, t), r._activeProjection = null;
    return;
  }
  if (e._surface) {
    r._activeProjection = e, this.updateLocalTransform(), this.localTransform.copyTo(this.worldTransform), i._parentID < 0 && ++i._worldID;
    return;
  }
  xu.call(this, t), r._activeProjection = e._activeProjection;
}
class oe extends zi {
  constructor(...r) {
    super(...r), oe.prototype.__init.call(this), oe.prototype.__init2.call(this), oe.prototype.__init3.call(this), oe.prototype.__init4.call(this), oe.prototype.__init5.call(this);
  }
  __init() {
    this._surface = null;
  }
  __init2() {
    this._activeProjection = null;
  }
  set enabled(r) {
    r !== this._enabled && (this._enabled = r, r ? (this.legacy.updateTransform = Xm, this.legacy._parentID = -1) : (this.legacy.updateTransform = sr.prototype.updateTransform, this.legacy._parentID = -1));
  }
  get surface() {
    return this._surface;
  }
  set surface(r) {
    this._surface !== r && (this._surface = r || null, this.legacy._parentID = -1);
  }
  applyPartial(r, e) {
    return this._activeProjection !== null ? (e = this.legacy.worldTransform.apply(r, e), this._activeProjection.surface.apply(e, e)) : this._surface !== null ? this.surface.apply(r, e) : this.legacy.worldTransform.apply(r, e);
  }
  apply(r, e) {
    return this._activeProjection !== null ? (e = this.legacy.worldTransform.apply(r, e), this._activeProjection.surface.apply(e, e), this._activeProjection.legacy.worldTransform.apply(e, e)) : this._surface !== null ? (e = this.surface.apply(r, e), this.legacy.worldTransform.apply(e, e)) : this.legacy.worldTransform.apply(r, e);
  }
  applyInverse(r, e) {
    return this._activeProjection !== null ? (e = this._activeProjection.legacy.worldTransform.applyInverse(r, e), this._activeProjection._surface.applyInverse(e, e), this.legacy.worldTransform.applyInverse(e, e)) : this._surface !== null ? (e = this.legacy.worldTransform.applyInverse(r, e), this._surface.applyInverse(e, e)) : this.legacy.worldTransform.applyInverse(r, e);
  }
  mapBilinearSprite(r, e) {
    this._surface instanceof Mi || (this.surface = new Mi()), this.surface.mapSprite(r, e, this.legacy);
  }
  __init3() {
    this._currentSurfaceID = -1;
  }
  __init4() {
    this._currentLegacyID = -1;
  }
  __init5() {
    this._lastUniforms = null;
  }
  clear() {
    this.surface && this.surface.clear();
  }
  get uniforms() {
    return this._currentLegacyID === this.legacy._worldID && this._currentSurfaceID === this.surface._updateID ? this._lastUniforms : (this._lastUniforms = this._lastUniforms || {}, this._lastUniforms.translationMatrix = this.legacy.worldTransform, this._surface.fillUniforms(this._lastUniforms), this._lastUniforms);
  }
}
class xe extends Vt {
  constructor(r) {
    super(r), xe.prototype.__init.call(this), this.proj = new oe(this.transform), this.pluginName = "batch_bilinear";
  }
  __init() {
    this.aTrans = new ft();
  }
  _calculateBounds() {
    this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData);
  }
  calculateVertices() {
    const r = this.transform._worldID, e = this._texture._updateID, i = this;
    if (i._transformID === r && this._textureID === e)
      return;
    i._transformID = r, this._textureID = e;
    const n = this._texture, a = this.vertexData, s = n.trim, o = n.orig, h = this._anchor;
    let u, l, f, c;
    if (s ? (l = s.x - h._x * o.width, u = l + s.width, c = s.y - h._y * o.height, f = c + s.height) : (l = -h._x * o.width, u = l + o.width, c = -h._y * o.height, f = c + o.height), this.proj._surface)
      a[0] = l, a[1] = c, a[2] = u, a[3] = c, a[4] = u, a[5] = f, a[6] = l, a[7] = f, this.proj._surface.boundsQuad(a, a);
    else {
      const p = this.transform.worldTransform, v = p.a, _ = p.b, m = p.c, y = p.d, g = p.tx, T = p.ty;
      a[0] = v * l + m * c + g, a[1] = y * c + _ * l + T, a[2] = v * u + m * c + g, a[3] = y * c + _ * u + T, a[4] = v * u + m * f + g, a[5] = y * f + _ * u + T, a[6] = v * l + m * f + g, a[7] = y * f + _ * l + T, this.proj._activeProjection && this.proj._activeProjection.surface.boundsQuad(a, a);
    }
    n.uvMatrix || (n.uvMatrix = new Xr(n)), n.uvMatrix.update();
    const d = this.aTrans;
    d.set(o.width, 0, 0, o.height, l, c), this.proj._surface === null && d.prepend(this.transform.worldTransform), d.invert(), d.prepend(n.uvMatrix.mapCoord);
  }
  calculateTrimmedVertices() {
    const r = this.transform._worldID, e = this._texture._updateID, i = this;
    if (!i.vertexTrimmedData)
      i.vertexTrimmedData = new Float32Array(8);
    else if (i._transformTrimmedID === r && this._textureTrimmedID === e)
      return;
    i._transformTrimmedID = r, this._textureTrimmedID = e;
    const n = this._texture, a = i.vertexTrimmedData, s = n.orig, o = this._anchor, h = -o._x * s.width, u = h + s.width, l = -o._y * s.height, f = l + s.height;
    if (this.proj._surface)
      a[0] = h, a[1] = l, a[2] = u, a[3] = l, a[4] = u, a[5] = f, a[6] = h, a[7] = f, this.proj._surface.boundsQuad(a, a, this.transform.worldTransform);
    else {
      const c = this.transform.worldTransform, d = c.a, p = c.b, v = c.c, _ = c.d, m = c.tx, y = c.ty;
      a[0] = d * h + v * l + m, a[1] = _ * l + p * h + y, a[2] = d * u + v * l + m, a[3] = _ * l + p * u + y, a[4] = d * u + v * f + m, a[5] = _ * f + p * u + y, a[6] = d * h + v * f + m, a[7] = _ * f + p * h + y, this.proj._activeProjection && this.proj._activeProjection.surface.boundsQuad(
        a,
        a,
        this.proj._activeProjection.legacy.worldTransform
      );
    }
  }
  get worldTransform() {
    return this.proj;
  }
}
Vt.prototype.convertTo2s = function() {
  this.proj || (this.pluginName = "sprite_bilinear", this.aTrans = new ft(), this.calculateVertices = xe.prototype.calculateVertices, this.calculateTrimmedVertices = xe.prototype.calculateTrimmedVertices, this._calculateBounds = xe.prototype._calculateBounds, gt.prototype.convertTo2s.call(this));
};
gt.prototype.convertTo2s = function() {
  this.proj || (this.proj = new oe(this.transform), Object.defineProperty(this, "worldTransform", {
    get() {
      return this.proj;
    },
    enumerable: !0,
    configurable: !0
  }));
};
gt.prototype.convertSubtreeTo2s = function() {
  this.convertTo2s();
  for (let r = 0; r < this.children.length; r++)
    this.children[r].convertSubtreeTo2s();
};
class Wr extends jr {
  constructor(r, e, i) {
    super(r, e, i), Wr.prototype.__init.call(this), this.proj = new oe(this.transform), this.pluginName = "batch_bilinear";
  }
  __init() {
    this.aTrans = new ft();
  }
  get worldTransform() {
    return this.proj;
  }
}
Wr.prototype.calculateVertices = xe.prototype.calculateVertices;
Wr.prototype.calculateTrimmedVertices = xe.prototype.calculateTrimmedVertices;
Wr.prototype._calculateBounds = xe.prototype._calculateBounds;
Vr.registerPlugin("batch_bilinear", km.create({}));
function An(t) {
  const r = t.toString(16);
  return r.length === 1 ? "0" + r : r;
}
function Vm(t, r, e) {
  return "0x" + An(t) + An(r) + An(e);
}
function ty(t) {
  if (!document)
    throw Error("document has to be accessible.");
  return new Promise((e) => {
    ep();
    const i = new sl({
      width: 760,
      height: 380,
      antialias: !0,
      preserveDrawingBuffer: !0,
      autoDensity: !0,
      backgroundAlpha: 0,
      clearBeforeRender: !0
    }), n = 4;
    i.loader.add("spritesheet", "../spritesheet.json").load(() => {
      const a = new gt();
      i.stage.addChild(a);
      const s = i.loader.resources.spritesheet, o = [...t.layers].reverse(), h = -126, u = -317;
      for (let l = 0; l < o.length; l++) {
        const f = o[l], c = `${f.props.textureIndex + 1}.png`, d = [
          {
            x: f.points.topLeft.x * n + h,
            y: f.points.topLeft.y * n + u
          },
          {
            x: f.points.topRight.x * n + h,
            y: f.points.topRight.y * n + u
          },
          {
            x: f.points.bottomRight.x * n + h,
            y: f.points.bottomRight.y * n + u
          },
          {
            x: f.points.bottomLeft.x * n + h,
            y: f.points.bottomLeft.y * n + u
          }
        ], { props: p } = f, { colorR: v, colorG: _, colorB: m, transparency: y, visible: g } = p;
        let T = y / 7;
        g || (T = 0);
        const b = v * 4, x = _ * 4, E = m * 4, C = Vm(b, x, E), w = new Ht(s.textures[c]);
        w.anchor.set(0.5), w.tint = C, w.alpha = T, w.proj.mapSprite(w, d), a.addChild(w);
      }
      i.renderer.addListener("postrender", () => {
        e(i.view.toDataURL()), i.destroy();
      });
    });
  });
}
const jm = Uint32Array.from([
  608135816,
  2242054355,
  320440878,
  57701188,
  2752067618,
  698298832,
  137296536,
  3964562569,
  1160258022,
  953160567,
  3193202383,
  887688300,
  3232508343,
  3380367581,
  1065670069,
  3041331479,
  2450970073,
  2306472731
]), xi = [
  Uint32Array.from([
    3509652390,
    2564797868,
    805139163,
    3491422135,
    3101798381,
    1780907670,
    3128725573,
    4046225305,
    614570311,
    3012652279,
    134345442,
    2240740374,
    1667834072,
    1901547113,
    2757295779,
    4103290238,
    227898511,
    1921955416,
    1904987480,
    2182433518,
    2069144605,
    3260701109,
    2620446009,
    720527379,
    3318853667,
    677414384,
    3393288472,
    3101374703,
    2390351024,
    1614419982,
    1822297739,
    2954791486,
    3608508353,
    3174124327,
    2024746970,
    1432378464,
    3864339955,
    2857741204,
    1464375394,
    1676153920,
    1439316330,
    715854006,
    3033291828,
    289532110,
    2706671279,
    2087905683,
    3018724369,
    1668267050,
    732546397,
    1947742710,
    3462151702,
    2609353502,
    2950085171,
    1814351708,
    2050118529,
    680887927,
    999245976,
    1800124847,
    3300911131,
    1713906067,
    1641548236,
    4213287313,
    1216130144,
    1575780402,
    4018429277,
    3917837745,
    3693486850,
    3949271944,
    596196993,
    3549867205,
    258830323,
    2213823033,
    772490370,
    2760122372,
    1774776394,
    2652871518,
    566650946,
    4142492826,
    1728879713,
    2882767088,
    1783734482,
    3629395816,
    2517608232,
    2874225571,
    1861159788,
    326777828,
    3124490320,
    2130389656,
    2716951837,
    967770486,
    1724537150,
    2185432712,
    2364442137,
    1164943284,
    2105845187,
    998989502,
    3765401048,
    2244026483,
    1075463327,
    1455516326,
    1322494562,
    910128902,
    469688178,
    1117454909,
    936433444,
    3490320968,
    3675253459,
    1240580251,
    122909385,
    2157517691,
    634681816,
    4142456567,
    3825094682,
    3061402683,
    2540495037,
    79693498,
    3249098678,
    1084186820,
    1583128258,
    426386531,
    1761308591,
    1047286709,
    322548459,
    995290223,
    1845252383,
    2603652396,
    3431023940,
    2942221577,
    3202600964,
    3727903485,
    1712269319,
    422464435,
    3234572375,
    1170764815,
    3523960633,
    3117677531,
    1434042557,
    442511882,
    3600875718,
    1076654713,
    1738483198,
    4213154764,
    2393238008,
    3677496056,
    1014306527,
    4251020053,
    793779912,
    2902807211,
    842905082,
    4246964064,
    1395751752,
    1040244610,
    2656851899,
    3396308128,
    445077038,
    3742853595,
    3577915638,
    679411651,
    2892444358,
    2354009459,
    1767581616,
    3150600392,
    3791627101,
    3102740896,
    284835224,
    4246832056,
    1258075500,
    768725851,
    2589189241,
    3069724005,
    3532540348,
    1274779536,
    3789419226,
    2764799539,
    1660621633,
    3471099624,
    4011903706,
    913787905,
    3497959166,
    737222580,
    2514213453,
    2928710040,
    3937242737,
    1804850592,
    3499020752,
    2949064160,
    2386320175,
    2390070455,
    2415321851,
    4061277028,
    2290661394,
    2416832540,
    1336762016,
    1754252060,
    3520065937,
    3014181293,
    791618072,
    3188594551,
    3933548030,
    2332172193,
    3852520463,
    3043980520,
    413987798,
    3465142937,
    3030929376,
    4245938359,
    2093235073,
    3534596313,
    375366246,
    2157278981,
    2479649556,
    555357303,
    3870105701,
    2008414854,
    3344188149,
    4221384143,
    3956125452,
    2067696032,
    3594591187,
    2921233993,
    2428461,
    544322398,
    577241275,
    1471733935,
    610547355,
    4027169054,
    1432588573,
    1507829418,
    2025931657,
    3646575487,
    545086370,
    48609733,
    2200306550,
    1653985193,
    298326376,
    1316178497,
    3007786442,
    2064951626,
    458293330,
    2589141269,
    3591329599,
    3164325604,
    727753846,
    2179363840,
    146436021,
    1461446943,
    4069977195,
    705550613,
    3059967265,
    3887724982,
    4281599278,
    3313849956,
    1404054877,
    2845806497,
    146425753,
    1854211946
  ]),
  Uint32Array.from([
    1266315497,
    3048417604,
    3681880366,
    3289982499,
    290971e4,
    1235738493,
    2632868024,
    2414719590,
    3970600049,
    1771706367,
    1449415276,
    3266420449,
    422970021,
    1963543593,
    2690192192,
    3826793022,
    1062508698,
    1531092325,
    1804592342,
    2583117782,
    2714934279,
    4024971509,
    1294809318,
    4028980673,
    1289560198,
    2221992742,
    1669523910,
    35572830,
    157838143,
    1052438473,
    1016535060,
    1802137761,
    1753167236,
    1386275462,
    3080475397,
    2857371447,
    1040679964,
    2145300060,
    2390574316,
    1461121720,
    2956646967,
    4031777805,
    4028374788,
    33600511,
    2920084762,
    1018524850,
    629373528,
    3691585981,
    3515945977,
    2091462646,
    2486323059,
    586499841,
    988145025,
    935516892,
    3367335476,
    2599673255,
    2839830854,
    265290510,
    3972581182,
    2759138881,
    3795373465,
    1005194799,
    847297441,
    406762289,
    1314163512,
    1332590856,
    1866599683,
    4127851711,
    750260880,
    613907577,
    1450815602,
    3165620655,
    3734664991,
    3650291728,
    3012275730,
    3704569646,
    1427272223,
    778793252,
    1343938022,
    2676280711,
    2052605720,
    1946737175,
    3164576444,
    3914038668,
    3967478842,
    3682934266,
    1661551462,
    3294938066,
    4011595847,
    840292616,
    3712170807,
    616741398,
    312560963,
    711312465,
    1351876610,
    322626781,
    1910503582,
    271666773,
    2175563734,
    1594956187,
    70604529,
    3617834859,
    1007753275,
    1495573769,
    4069517037,
    2549218298,
    2663038764,
    504708206,
    2263041392,
    3941167025,
    2249088522,
    1514023603,
    1998579484,
    1312622330,
    694541497,
    2582060303,
    2151582166,
    1382467621,
    776784248,
    2618340202,
    3323268794,
    2497899128,
    2784771155,
    503983604,
    4076293799,
    907881277,
    423175695,
    432175456,
    1378068232,
    4145222326,
    3954048622,
    3938656102,
    3820766613,
    2793130115,
    2977904593,
    26017576,
    3274890735,
    3194772133,
    1700274565,
    1756076034,
    4006520079,
    3677328699,
    720338349,
    1533947780,
    354530856,
    688349552,
    3973924725,
    1637815568,
    332179504,
    3949051286,
    53804574,
    2852348879,
    3044236432,
    1282449977,
    3583942155,
    3416972820,
    4006381244,
    1617046695,
    2628476075,
    3002303598,
    1686838959,
    431878346,
    2686675385,
    1700445008,
    1080580658,
    1009431731,
    832498133,
    3223435511,
    2605976345,
    2271191193,
    2516031870,
    1648197032,
    4164389018,
    2548247927,
    300782431,
    375919233,
    238389289,
    3353747414,
    2531188641,
    2019080857,
    1475708069,
    455242339,
    2609103871,
    448939670,
    3451063019,
    1395535956,
    2413381860,
    1841049896,
    1491858159,
    885456874,
    4264095073,
    4001119347,
    1565136089,
    3898914787,
    1108368660,
    540939232,
    1173283510,
    2745871338,
    3681308437,
    4207628240,
    3343053890,
    4016749493,
    1699691293,
    1103962373,
    3625875870,
    2256883143,
    3830138730,
    1031889488,
    3479347698,
    1535977030,
    4236805024,
    3251091107,
    2132092099,
    1774941330,
    1199868427,
    1452454533,
    157007616,
    2904115357,
    342012276,
    595725824,
    1480756522,
    206960106,
    497939518,
    591360097,
    863170706,
    2375253569,
    3596610801,
    1814182875,
    2094937945,
    3421402208,
    1082520231,
    3463918190,
    2785509508,
    435703966,
    3908032597,
    1641649973,
    2842273706,
    3305899714,
    1510255612,
    2148256476,
    2655287854,
    3276092548,
    4258621189,
    236887753,
    3681803219,
    274041037,
    1734335097,
    3815195456,
    3317970021,
    1899903192,
    1026095262,
    4050517792,
    356393447,
    2410691914,
    3873677099,
    3682840055
  ]),
  Uint32Array.from([
    3913112168,
    2491498743,
    4132185628,
    2489919796,
    1091903735,
    1979897079,
    3170134830,
    3567386728,
    3557303409,
    857797738,
    1136121015,
    1342202287,
    507115054,
    2535736646,
    337727348,
    3213592640,
    1301675037,
    2528481711,
    1895095763,
    1721773893,
    3216771564,
    62756741,
    2142006736,
    835421444,
    2531993523,
    1442658625,
    3659876326,
    2882144922,
    676362277,
    1392781812,
    170690266,
    3921047035,
    1759253602,
    3611846912,
    1745797284,
    664899054,
    1329594018,
    3901205900,
    3045908486,
    2062866102,
    2865634940,
    3543621612,
    3464012697,
    1080764994,
    553557557,
    3656615353,
    3996768171,
    991055499,
    499776247,
    1265440854,
    648242737,
    3940784050,
    980351604,
    3713745714,
    1749149687,
    3396870395,
    4211799374,
    3640570775,
    1161844396,
    3125318951,
    1431517754,
    545492359,
    4268468663,
    3499529547,
    1437099964,
    2702547544,
    3433638243,
    2581715763,
    2787789398,
    1060185593,
    1593081372,
    2418618748,
    4260947970,
    69676912,
    2159744348,
    86519011,
    2512459080,
    3838209314,
    1220612927,
    3339683548,
    133810670,
    1090789135,
    1078426020,
    1569222167,
    845107691,
    3583754449,
    4072456591,
    1091646820,
    628848692,
    1613405280,
    3757631651,
    526609435,
    236106946,
    48312990,
    2942717905,
    3402727701,
    1797494240,
    859738849,
    992217954,
    4005476642,
    2243076622,
    3870952857,
    3732016268,
    765654824,
    3490871365,
    2511836413,
    1685915746,
    3888969200,
    1414112111,
    2273134842,
    3281911079,
    4080962846,
    172450625,
    2569994100,
    980381355,
    4109958455,
    2819808352,
    2716589560,
    2568741196,
    3681446669,
    3329971472,
    1835478071,
    660984891,
    3704678404,
    4045999559,
    3422617507,
    3040415634,
    1762651403,
    1719377915,
    3470491036,
    2693910283,
    3642056355,
    3138596744,
    1364962596,
    2073328063,
    1983633131,
    926494387,
    3423689081,
    2150032023,
    4096667949,
    1749200295,
    3328846651,
    309677260,
    2016342300,
    1779581495,
    3079819751,
    111262694,
    1274766160,
    443224088,
    298511866,
    1025883608,
    3806446537,
    1145181785,
    168956806,
    3641502830,
    3584813610,
    1689216846,
    3666258015,
    3200248200,
    1692713982,
    2646376535,
    4042768518,
    1618508792,
    1610833997,
    3523052358,
    4130873264,
    2001055236,
    3610705100,
    2202168115,
    4028541809,
    2961195399,
    1006657119,
    2006996926,
    3186142756,
    1430667929,
    3210227297,
    1314452623,
    4074634658,
    4101304120,
    2273951170,
    1399257539,
    3367210612,
    3027628629,
    1190975929,
    2062231137,
    2333990788,
    2221543033,
    2438960610,
    1181637006,
    548689776,
    2362791313,
    3372408396,
    3104550113,
    3145860560,
    296247880,
    1970579870,
    3078560182,
    3769228297,
    1714227617,
    3291629107,
    3898220290,
    166772364,
    1251581989,
    493813264,
    448347421,
    195405023,
    2709975567,
    677966185,
    3703036547,
    1463355134,
    2715995803,
    1338867538,
    1343315457,
    2802222074,
    2684532164,
    233230375,
    2599980071,
    2000651841,
    3277868038,
    1638401717,
    4028070440,
    3237316320,
    6314154,
    819756386,
    300326615,
    590932579,
    1405279636,
    3267499572,
    3150704214,
    2428286686,
    3959192993,
    3461946742,
    1862657033,
    1266418056,
    963775037,
    2089974820,
    2263052895,
    1917689273,
    448879540,
    3550394620,
    3981727096,
    150775221,
    3627908307,
    1303187396,
    508620638,
    2975983352,
    2726630617,
    1817252668,
    1876281319,
    1457606340,
    908771278,
    3720792119,
    3617206836,
    2455994898,
    1729034894,
    1080033504
  ]),
  Uint32Array.from([
    976866871,
    3556439503,
    2881648439,
    1522871579,
    1555064734,
    1336096578,
    3548522304,
    2579274686,
    3574697629,
    3205460757,
    3593280638,
    3338716283,
    3079412587,
    564236357,
    2993598910,
    1781952180,
    1464380207,
    3163844217,
    3332601554,
    1699332808,
    1393555694,
    1183702653,
    3581086237,
    1288719814,
    691649499,
    2847557200,
    2895455976,
    3193889540,
    2717570544,
    1781354906,
    1676643554,
    2592534050,
    3230253752,
    1126444790,
    2770207658,
    2633158820,
    2210423226,
    2615765581,
    2414155088,
    3127139286,
    673620729,
    2805611233,
    1269405062,
    4015350505,
    3341807571,
    4149409754,
    1057255273,
    2012875353,
    2162469141,
    2276492801,
    2601117357,
    993977747,
    3918593370,
    2654263191,
    753973209,
    36408145,
    2530585658,
    25011837,
    3520020182,
    2088578344,
    530523599,
    2918365339,
    1524020338,
    1518925132,
    3760827505,
    3759777254,
    1202760957,
    3985898139,
    3906192525,
    674977740,
    4174734889,
    2031300136,
    2019492241,
    3983892565,
    4153806404,
    3822280332,
    352677332,
    2297720250,
    60907813,
    90501309,
    3286998549,
    1016092578,
    2535922412,
    2839152426,
    457141659,
    509813237,
    4120667899,
    652014361,
    1966332200,
    2975202805,
    55981186,
    2327461051,
    676427537,
    3255491064,
    2882294119,
    3433927263,
    1307055953,
    942726286,
    933058658,
    2468411793,
    3933900994,
    4215176142,
    1361170020,
    2001714738,
    2830558078,
    3274259782,
    1222529897,
    1679025792,
    2729314320,
    3714953764,
    1770335741,
    151462246,
    3013232138,
    1682292957,
    1483529935,
    471910574,
    1539241949,
    458788160,
    3436315007,
    1807016891,
    3718408830,
    978976581,
    1043663428,
    3165965781,
    1927990952,
    4200891579,
    2372276910,
    3208408903,
    3533431907,
    1412390302,
    2931980059,
    4132332400,
    1947078029,
    3881505623,
    4168226417,
    2941484381,
    1077988104,
    1320477388,
    886195818,
    18198404,
    3786409e3,
    2509781533,
    112762804,
    3463356488,
    1866414978,
    891333506,
    18488651,
    661792760,
    1628790961,
    3885187036,
    3141171499,
    876946877,
    2693282273,
    1372485963,
    791857591,
    2686433993,
    3759982718,
    3167212022,
    3472953795,
    2716379847,
    445679433,
    3561995674,
    3504004811,
    3574258232,
    54117162,
    3331405415,
    2381918588,
    3769707343,
    4154350007,
    1140177722,
    4074052095,
    668550556,
    3214352940,
    367459370,
    261225585,
    2610173221,
    4209349473,
    3468074219,
    3265815641,
    314222801,
    3066103646,
    3808782860,
    282218597,
    3406013506,
    3773591054,
    379116347,
    1285071038,
    846784868,
    2669647154,
    3771962079,
    3550491691,
    2305946142,
    453669953,
    1268987020,
    3317592352,
    3279303384,
    3744833421,
    2610507566,
    3859509063,
    266596637,
    3847019092,
    517658769,
    3462560207,
    3443424879,
    370717030,
    4247526661,
    2224018117,
    4143653529,
    4112773975,
    2788324899,
    2477274417,
    1456262402,
    2901442914,
    1517677493,
    1846949527,
    2295493580,
    3734397586,
    2176403920,
    1280348187,
    1908823572,
    3871786941,
    846861322,
    1172426758,
    3287448474,
    3383383037,
    1655181056,
    3139813346,
    901632758,
    1897031941,
    2986607138,
    3066810236,
    3447102507,
    1393639104,
    373351379,
    950779232,
    625454576,
    3124240540,
    4148612726,
    2007998917,
    544563296,
    2244738638,
    2330496472,
    2058025392,
    1291430526,
    424198748,
    50039436,
    29584100,
    3605783033,
    2429876329,
    2791104160,
    1057563949,
    3255363231,
    3075367218,
    3463963227,
    1469046755,
    985887462
  ])
];
function gi(t, r) {
  let e = t[0][r >>> 24], i = t[1][r >>> 16 & 255], n = t[2][r >>> 8 & 255], a = t[3][r & 255];
  return (e + i ^ n) + a >>> 0;
}
class zm {
  constructor(r) {
    let e = new DataView(r), i = Math.floor(r.byteLength / Uint32Array.BYTES_PER_ELEMENT), n = new Uint32Array(i);
    for (let a = 0; a < i; a++)
      n[a] = e.getUint32(a * 4, !1);
    this._s = [xi[0].slice(), xi[1].slice(), xi[2].slice(), xi[3].slice()], this._p = jm.slice(), this._key = n, this._keySchedule();
  }
  _keySchedule() {
    let r = 0;
    for (let n = 0; n < 18; n++)
      this._p[n] ^= this._key[r % this._key.length], r++;
    let e = new ArrayBuffer(8), i = new DataView(e);
    for (let n = 0; n < 18; n += 2)
      this.encrypt(e), this._p[n] = i.getUint32(0, !0), this._p[n + 1] = i.getUint32(4, !0);
    for (let n = 0; n < 4; n++)
      for (let a = 0; a < 256; a += 2)
        this.encrypt(e), this._s[n][a] = i.getUint32(0, !0), this._s[n][a + 1] = i.getUint32(4, !0);
  }
  encrypt(r) {
    let e = new DataView(r, 0, Math.floor(r.byteLength / 8) * 8);
    for (let i = 0; i < Math.floor(e.byteLength / 8); i++) {
      let n = e.getUint32(i * 8, !0), a = e.getUint32(i * 8 + 4, !0);
      for (let s = 0; s < 16; s += 2)
        n ^= this._p[s], a ^= gi(this._s, n), a ^= this._p[s + 1], n ^= gi(this._s, a);
      n ^= this._p[16], a ^= this._p[17], e.setUint32(i * 8, a, !0), e.setUint32(i * 8 + 4, n, !0);
    }
  }
  decrypt(r) {
    let e = new DataView(r, 0, Math.floor(r.byteLength / 8) * 8);
    for (let i = 0; i < Math.floor(e.byteLength / 8); i++) {
      let n = e.getUint32(i * 8, !0), a = e.getUint32(i * 8 + 4, !0);
      for (let s = 16; s > 0; s -= 2)
        n ^= this._p[s + 1], a ^= gi(this._s, n), a ^= this._p[s], n ^= gi(this._s, a);
      n ^= this._p[1], a ^= this._p[0], e.setUint32(i * 8, a, !0), e.setUint32(i * 8 + 4, n, !0);
    }
  }
}
class Aa {
  constructor(r) {
    this.buffer = r || new ArrayBuffer(64), this.dataView = new DataView(this.buffer), this.pos = 0, this.bitCounter = 0, this.bitValue = 0;
  }
  extendIfNeeded(r) {
    if (this.pos + r > this.buffer.byteLength) {
      let e = new ArrayBuffer(this.buffer.byteLength * 2), i = new DataView(e);
      for (let n = 0; n < this.buffer.byteLength; n++)
        i.setUint8(n, this.dataView.getUint8(n));
      this.buffer = e, this.dataView = i;
    }
  }
  readBit() {
    this.bitCounter === 0 && (this.bitValue = this.dataView.getUint8(this.pos), this.seek(1), this.bitCounter = 8);
    let r = this.bitValue & 1;
    return this.bitCounter -= 1, this.bitValue = this.bitValue >>> 1, r;
  }
  readUint8() {
    let r = this.dataView.getUint8(this.pos);
    return this.seek(1), r;
  }
  readUint16(r) {
    let e = this.dataView.getUint16(this.pos, r === !0);
    return this.seek(2), e;
  }
  readUint32(r) {
    let e = this.dataView.getUint32(this.pos, r === !0);
    return this.seek(4), e;
  }
  readInt8() {
    let r = this.dataView.getInt8(this.pos);
    return this.seek(1), r;
  }
  readInt16(r) {
    let e = this.dataView.getInt16(this.pos, r === !0);
    return this.seek(2), e;
  }
  readInt32(r) {
    let e = this.dataView.getInt32(this.pos, r === !0);
    return this.seek(4), e;
  }
  readFloat32(r) {
    let e = this.dataView.getFloat32(this.pos, r === !0);
    return this.seek(4), e;
  }
  readFloat64(r) {
    let e = this.dataView.getFloat64(this.pos, r === !0);
    return this.seek(8), e;
  }
  writeUint8(r) {
    this.extendIfNeeded(1), this.dataView.setUint8(this.pos, r), this.seek(1);
  }
  writeUint16(r, e) {
    this.extendIfNeeded(2), this.dataView.setUint16(this.pos, r, e === !0), this.seek(2);
  }
  writeUint32(r, e) {
    this.extendIfNeeded(4), this.dataView.setUint32(this.pos, r, e === !0), this.seek(4);
  }
  writeInt8(r) {
    this.extendIfNeeded(1), this.dataView.setInt8(this.pos, r), this.seek(1);
  }
  writeInt16(r, e) {
    this.extendIfNeeded(2), this.dataView.setInt16(this.pos, r, e === !0), this.seek(2);
  }
  writeInt32(r, e) {
    this.extendIfNeeded(4), this.dataView.setInt32(this.pos, r, e === !0), this.seek(4);
  }
  writeFloat32(r, e) {
    this.extendIfNeeded(4), this.dataView.setFloat32(this.pos, r, e === !0), this.seek(4);
  }
  writeFloat64(r, e) {
    this.extendIfNeeded(8), this.dataView.setFloat64(this.pos, r, e === !0), this.seek(8);
  }
  seek(r) {
    if (this.pos + r > this.buffer.byteLength || this.pos + r < 0)
      throw new Error(
        `invalid seek to ${this.pos + r} (by ${r}) on buffer of length ${this.buffer.byteLength}`
      );
    this.pos += r;
  }
}
const Wm = {
  u8: (t) => t.readUint8(),
  u16: (t) => t.readUint16(!1),
  u32: (t) => t.readUint32(!1),
  u16le: (t) => t.readUint16(!0),
  u32le: (t) => t.readUint32(!0),
  i8: (t) => t.readInt8(),
  i16: (t) => t.readInt16(!1),
  i32: (t) => t.readInt32(!1),
  i16le: (t) => t.readInt16(!0),
  i32le: (t) => t.readInt32(!0),
  f32: (t) => t.readFloat32(!1),
  f64: (t) => t.readFloat64(!1),
  f32le: (t) => t.readFloat32(!0),
  f64le: (t) => t.readFloat64(!0)
};
function $m(t, r, e = []) {
  let i = new Aa(t), n = [Wm].concat(e).reduce((a, s) => Object.assign(a, s), {});
  return Di(i, r, n);
}
function Di(t, r, e) {
  switch (typeof r) {
    case "string":
      return Di(t, e[r], e);
    case "function":
      return r(t, e);
    case "object": {
      let i = {};
      for (let n of Object.keys(r)) {
        let a = r[n], s = Di(t, a, e);
        i[n] = s;
      }
      return i;
    }
  }
}
const Wt = { parse: $m, parseWithCursor: Di }, bi = {
  x: "u8",
  y: "u8"
}, qm = {
  points: {
    topLeft: bi,
    bottomLeft: bi,
    topRight: bi,
    bottomRight: bi
  },
  props: (t, r) => {
    const e = Wt.parseWithCursor(t, "u32le", r), i = Wt.parseWithCursor(t, "u32le", r), n = !(e >> 31 & 1 > 0), a = e >> 21 & 1023, s = e >> 18 & 7, o = e >> 0 & 63, h = e >> 6 & 63, u = e >> 12 & 63, l = i >> 0 & 63, f = i >> 6 & 63, c = i >> 12 & 63;
    return {
      visible: n,
      textureIndex: a,
      transparency: s,
      colorR: o,
      colorG: h,
      colorB: u,
      colorX: l,
      colorY: f,
      colorZ: c
    };
  }
}, Ym = (t, r) => {
  const e = Wt.parseWithCursor(t, "u32le", r), i = Wt.parseWithCursor(t, "u8", r), n = Wt.parseWithCursor(t, "u8", r), a = Wt.parseWithCursor(t, "u8", r), s = Wt.parseWithCursor(t, "u8", r), o = [];
  for (let c = 0; c < i; c++)
    o.push(Wt.parseWithCursor(t, qm, r));
  let h = [];
  const u = t.pos;
  for (let c = 0; c < (t.dataView.byteLength - u) / 2; c++)
    try {
      const d = Wt.parseWithCursor(t, "u16le", r);
      h.push(d);
    } catch {
      break;
    }
  const l = new TextDecoder("utf-16"), f = new DataView(Uint16Array.from(h).buffer);
  return h = l.decode(f), {
    authorId: e,
    layerCount: i,
    sizeHeight: n,
    sizeWidth: a,
    soundEffect: s,
    layers: o,
    name: h
  };
};
function Zm(t) {
  let r = new Aa(t), e = new Aa();
  for (; ; ) {
    let i;
    if (i = r.readBit(), i) {
      e.writeUint8(r.readUint8());
      continue;
    }
    let n = 0, a = 0, s = !1;
    if (i = r.readBit(), i) {
      if (s = !0, n = r.readUint16(!0), n === 0)
        break;
      a = n & 7, n = n >> 3 | -8192, a === 0 ? a = r.readUint8() + 10 : a += 2;
    } else
      i = r.readBit() ? 1 : 0, a = r.readBit() ? 1 : 0, a = (a | i << 1) + 2, n = r.readInt8() | -256;
    for (let o = 0; o < a; o++) {
      if (n > 0)
        throw new Error(`offset > 0 (${n}) (isLongCopy === ${s})`);
      e.seek(n);
      let h = e.readUint8();
      e.seek(-1), e.seek(-n), e.writeUint8(h);
    }
  }
  return e.buffer.slice(0, e.pos);
}
const Jm = { decompress: Zm };
function ey(t) {
  let r = new Uint8Array(t);
  const e = r[3];
  if (r[0] !== 115 || r[1] !== 97 || r[2] !== 114)
    throw new Error("not a SAR file");
  if (e !== 132 && e !== 4)
    throw new Error(`invalid flag ${e}`);
  r = r.slice(4, t.byteLength);
  const i = Uint8Array.of(9, 7, 193, 43).buffer, n = new zm(i);
  try {
    n.decrypt(r.buffer);
    let a = r.buffer;
    return e === 132 && (r = r.map((o) => o ^ 149), a = Jm.decompress(r.buffer)), Wt.parse(a, Ym);
  } catch {
    throw new Error("Error decrypting file.");
  }
}
export {
  ey as processSarBuffer,
  ty as renderSar
};
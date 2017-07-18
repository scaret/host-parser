'use strict'

var ASTERISK_REGEXP = /\*/g
var ASTERISK_REPLACE = '([^.]+)'
var END_ANCHORED_REGEXP = /(?:^|[^\\])(?:\\\\)*\$$/
var ESCAPE_REGEXP = /([.+?^=!:${}()|[\]/\\])/g
var ESCAPE_REPLACE = '\\$1'

function isregexp (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]'
}

function hostregexp (val) {
    var source = !isregexp(val)
        ? String(val).replace(ESCAPE_REGEXP, ESCAPE_REPLACE).replace(ASTERISK_REGEXP, ASTERISK_REPLACE)
        : val.source

    // force leading anchor matching
    if (source[0] !== '^') {
        source = '^' + source
    }

    // force trailing anchor matching
    if (!END_ANCHORED_REGEXP.test(source)) {
        source += '$'
    }

    return new RegExp(source, 'i')
}

function hostnameof (host) {

    if (!host) {
        return
    }

    var offset = host[0] === '['
        ? host.indexOf(']') + 1
        : 0
    var index = host.indexOf(':', offset)

    return index !== -1
        ? host.substring(0, index)
        : host
}

function hostof (host, regexp) {
    var hostname = hostnameof(host)

    if (!hostname) {
        return
    }

    var match = regexp.exec(hostname)

    if (!match) {
        return
    }

    var obj = Object.create(null)

    obj.host = host
    obj.hostname = hostname
    obj.length = match.length - 1
    obj.matches = []

    for (var i = 1; i < match.length; i++) {
        obj.matches.push(match[i])
    }

    return obj
}


module.exports.parse = function(host, wildcard){
    if (!wildcard){
        wildcard = host
    }
    var regexp = hostregexp(wildcard);
    return hostof(host, regexp);
};

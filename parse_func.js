
function parseFunc(string) {
    var m = string.match (/^([\sa-zA-Z0-9]+)\((.*)\)\s*$/)
    if(!m)
        throw "error: not a function: " + funcStr;
    funcName = m[1]
    args = m[2]

    tokens = [];
    i = 0;
    while( i<args.length && (pair = tokenize(args,i)) ) {
        tokens.push( pair[0] );
        i = seekComma(args,pair[1]);
    }
    return [funcName, tokens];
}

function tokenize(str,i) {
    while(i<str.length && ' ' == (c = str[i]))
        ++i;
    if(i>=str.length)
        return null;
    var start = i;

    if(c== '"') {
        ++i;
        while(i<str.length && '"' != (c = str[i])) {
            ++i;
            while(i<str.length && str[i]=='\\') {
                i+=2;
                if(i>str.length)
                    throw "error: unexpected end of string with escape"
            }
        }
        if(c!='"')
          throw "error: unexpected end of string without closing quote" 
    } else if(c>='0' && c<='9'||c=='.') {
        while(i<str.length && c>='0' && c<='9'||c=='.')
            c = str[++i];
    } else {
        throw "error: unexpecte start of an argument"
    }

    if(start == i)
        return null;
    return [str.substring(start,i), i];
}

function seekComma(str,i) {
    while(i<str.length && ' ' == (c = str[i]))
        ++i;
    if(i>=str.length)
        return i;
    if(',' == c)
        ++i;
    else
        throw "error: encountered unexpected character:" + c; 
    return i;
}

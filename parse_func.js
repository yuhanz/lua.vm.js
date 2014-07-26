
function parseFunc(string) {
    var m = string.match (/^([\sa-zA-Z0-9]+)\(([\s\S]*)\)\s*$/)
    if(!m)
        throw "error: unable to parse as a function: " + string;
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
    var type = 'string'

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
        end = i
        ++i;
        start = start+1
    } else if(c>='0' && c<='9'||c=='.') {
        while(i<str.length && c>='0' && c<='9'||c=='.')
            c = str[++i];
        end = i
        type = 'number'
    } else {
        throw "error: unexpecte start of an argument"
    }

    if(start >= i)
        return null;
    var value = str.substring(start,end)
    if(type == 'number')
        value = parseFloat(value)
    return [value, i];
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

# Host Parser

from `https://github.com/expressjs/vhost` 
but I just want to parse the host, and validate against wildcard expression.

```javascript
var parse = require('host-parser').parse;

parse("example.com");
//{
//    host: 'example.com',
//    hostname: 'example.com'
//}

parse("foo.bar-1.example.com:8080", "*.bar-*.example.com");
//{
//    host: 'foo.bar.example.com:8080',
//    hostname: 'foo.bar.example.com',
//    matches: ['foo', '1']
//}
```
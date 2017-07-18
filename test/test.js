var assert = require('assert')
var parse = require('..').parse

describe('parse("example.com")', function(){
    var result = parse('example.com');
    it('should return object', function(){
        assert.equal(typeof result, 'object');
    });
    it('should have host example.com', function(){
        assert.equal(result.host, 'example.com');
    });
    it('should have hostname example.com', function(){
        assert.equal(result.hostname, 'example.com');
    });
    it('should have matches.length 0', function(){
        assert.equal(result.matches.length, 0);
    });
});

describe('parse("foo.bar-1.example.com:8080", *.bar-*.example.com)', function(){
    var result = parse('foo.bar-1.example.com:8080', '*.bar-*.example.com');
    it('should return object', function(){
        assert.equal(typeof result, 'object');
    });
    it('should have host foo.bar-1.example.com:8080', function(){
        assert.equal(result.host, 'foo.bar-1.example.com:8080');
    });
    it('should have hostname foo.bar-1.example.com', function(){
        assert.equal(result.hostname, 'foo.bar-1.example.com');
    });
    it('should have matches[0] foo', function(){
        assert.equal(result.matches[0], 'foo');
    });
    it('should have matches[1] 1', function(){
        assert.equal(result.matches[1], '1');
    });
    it('should have matches.length 2', function(){
        assert.equal(result.matches.length, 2);
    });
});

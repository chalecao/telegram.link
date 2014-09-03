//       Telegram.link 0.0.1
//       Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//       Released under the MIT license
//       http://telegram.link

//      Vector class
//
// This class is the `TypeLanguage` list implementation, a concrete sub-class of the `AbstractObject` class

// Imports dependencies
var debug = require('debug')('telegram.link:type_language.Vector');
var util = require('util');
var AbstractObject = require('./index').AbstractObject;
var Builder = require('./index').Builder;

// Vector extends AbstractObject
util.inherits(Vector, AbstractObject);

// Get an instance for `serialization`:
//
//      new Vector({type: 'long', props: {list: [1,2,3]} });
// Provide the `list` property to fill the vector and the type of the content, `int` is the default:
//
// Get an instance for `de-serialization`:
//
//      new Vector({type: 'int128', buffer: myBuffer, offset: currentPosition});
// Provide a `buffer` and eventually an `offset` where start
//
// The `constructor`:
function Vector(options) {
    var super_ = this.constructor.super_.bind(this);
    var opts = util._extend({ type: 'int'}, options);
    var props = util._extend({ list: [] }, opts.props);
    super_(opts.buffer, opts.offset);
    this.id = 481674261;
    this.type = opts.type.charAt(0).toUpperCase() + opts.type.slice(1);
    this._list = props.list;
}

// This method deserialize the list starting from the initialized buffer
Vector.prototype.deserialize = function () {
    var super_deserialize = this.constructor.super_.prototype.deserialize.bind(this);
    if (!super_deserialize()) {
        return false;
    }
    var listLength = this.readInt();
    for (var i = 0; i < listLength; i++) {
        this._list[i] = this['read' + this.type]();
    }
    return this;
};

// This method retrieves a copy of the internal list
Vector.prototype.getList = function () {
    return this._list.slice();
};

// Exports the class
module.exports = exports = Vector;

var errors = require('./errors')

function _Buffer (value) {
  return Buffer.isBuffer(value)
}
_Buffer.toJSON = function () { return 'Buffer' }

function BufferN (length) {
  function BufferN (value) {
    if (!Buffer.isBuffer(value)) return false
    if (value.length !== length) {
      throw errors.tfCustomError('Buffer(Length: ' + length + ')', 'Buffer(Length: ' + value.length + ')')
    }

    return true
  }

  BufferN.toJSON = function () { return 'Buffer' }

  return BufferN
}

function Hex (value) {
  return typeof value === 'string' && /^([0-9a-f]{2})+$/i.test(value)
}

function HexN (length) {
  return function HexN (value) {
    return Hex(value) && value.length === length
  }
}

var UINT53_MAX = Math.pow(2, 63) - 1

function Int8 (value) { return ((value << 24) >> 24) === value }
function Int16 (value) { return ((value << 16) >> 16) === value }
function Int32 (value) { return (value | 0) === value }
function UInt8 (value) { return (value & 0xff) === value }
function UInt16 (value) { return (value & 0xffff) === value }
function UInt32 (value) { return (value >>> 0) === value }
function UInt53 (value) {
  return typeof value === 'number' &&
    value >= 0 &&
    value <= UINT53_MAX &&
    Math.floor(value) === value
}

module.exports = {
  Buffer: _Buffer,
  BufferN: BufferN,
  Hex: Hex,
  HexN: HexN,
  Int8: Int8,
  Int16: Int16,
  Int32: Int32,
  UInt8: UInt8,
  UInt16: UInt16,
  UInt32: UInt32,
  UInt53: UInt53
}

// Struct parsing

import { Cursor } from '../cursor';

const baseRegistry = {
  u8: (cursor: { readUint8: () => any }) => cursor.readUint8(),
  u16: (cursor: { readUint16: (arg0: boolean) => any }) =>
    cursor.readUint16(false),
  u32: (cursor: { readUint32: (arg0: boolean) => any }) =>
    cursor.readUint32(false),
  u16le: (cursor: { readUint16: (arg0: boolean) => any }) =>
    cursor.readUint16(true),
  u32le: (cursor: { readUint32: (arg0: boolean) => any }) =>
    cursor.readUint32(true),
  i8: (cursor: { readInt8: () => any }) => cursor.readInt8(),
  i16: (cursor: { readInt16: (arg0: boolean) => any }) =>
    cursor.readInt16(false),
  i32: (cursor: { readInt32: (arg0: boolean) => any }) =>
    cursor.readInt32(false),
  i16le: (cursor: { readInt16: (arg0: boolean) => any }) =>
    cursor.readInt16(true),
  i32le: (cursor: { readInt32: (arg0: boolean) => any }) =>
    cursor.readInt32(true),
  f32: (cursor: { readFloat32: (arg0: boolean) => any }) =>
    cursor.readFloat32(false),
  f64: (cursor: { readFloat64: (arg0: boolean) => any }) =>
    cursor.readFloat64(false),
  f32le: (cursor: { readFloat32: (arg0: boolean) => any }) =>
    cursor.readFloat32(true),
  f64le: (cursor: { readFloat64: (arg0: boolean) => any }) =>
    cursor.readFloat64(true)
};

/**
 *
 * @param {ArrayBuffer} buffer buffer to parse
 * @param {Object} schema schema to parse with
 * @param {Object[]} registries registries of schemas or parsers to use (including base registry)
 * @returns {Object} parsed struct
 */
function parse(buffer: any, schema: any, registries = []) {
  let cursor = new Cursor(buffer);
  let registry = [baseRegistry]
    .concat(registries)
    .reduce((a, v) => Object.assign(a, v), {});

  return parseWithCursor(cursor, schema, registry);
}

function parseWithCursor(cursor, schema, registry) {
  switch (typeof schema) {
    case 'string': {
      // References a schema/parser in the registry
      return parseWithCursor(cursor, registry[schema], registry);
    }
    case 'function': {
      // Cursor parse function
      return schema(cursor, registry);
    }
    case 'object': {
      // Schema object; recurse for each key
      let ret = {};
      for (let k of Object.keys(schema)) {
        let v = schema[k];
        let value = parseWithCursor(cursor, v, registry);
        ret[k] = value;
      }
      return ret;
    }
  }
}

export default { parse, parseWithCursor };

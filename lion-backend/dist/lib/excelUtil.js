'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileCsv = undefined;

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import Excel from 'exceljs';
// import mongoXlsx from 'mongo-xlsx';


//use mongo-xlsx
// export const exportQues = async (data, callback) => {
//   let model = mongoXlsx.buildDynamicModel(data)
//   try {
//     return await mongoXlsx.mongoData2Xlsx(data, model, (err, data) => {
//       return callback(data.fullPath)
//     })
//   } catch (err) {
//     return err
//   }
// }
var readFileCsv = exports.readFileCsv = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(csvFilePath, callback) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _csvtojson2.default)().fromFile(csvFilePath).on('json', function (jsonObj) {
              return callback(null, jsonObj);
            });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', callback(_context.t0));

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function readFileCsv(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=excelUtil.js.map
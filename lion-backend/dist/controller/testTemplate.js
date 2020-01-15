'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteTemplate = exports.getAllTemplate = exports.createTemplate = undefined;

var _testTemplate = require('../models/testTemplate');

var _entryCode = require('../models/entryCode');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//create Template and save to database
var createTemplate = exports.createTemplate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataTemplate, dataTem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        dataTemplate = req.body.dataTemplate;

                        if (dataTemplate) {
                            _context.next = 6;
                            break;
                        }

                        throw 'No Data';

                    case 6:
                        _context.next = 8;
                        return (0, _testTemplate.createTestTemplate)(dataTemplate);

                    case 8:
                        dataTem = _context.sent;

                        if (!dataTem) {
                            _context.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t Create Template!';

                    case 14:
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context.t0
                        });

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 16]]);
    }));

    return function createTemplate(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//get all template and send data to front-end
var getAllTemplate = exports.getAllTemplate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataTemplate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _testTemplate._getAllTemplate)();

                    case 3:
                        dataTemplate = _context2.sent;

                        if (!dataTemplate) {
                            _context2.next = 8;
                            break;
                        }

                        res.status(200).json({
                            success: true,
                            dataTemplate: dataTemplate
                        });
                        _context2.next = 9;
                        break;

                    case 8:
                        throw 'Can\'t Get Template!';

                    case 9:
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context2.t0
                        });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function getAllTemplate(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//delete a template by id
/* export const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        if (!templateId) {
            throw ('No Data !')
        } else {
            let dataEntryCode = await _getAllEntryByTemplate(templateId);
            if (dataEntryCode.length === 0) {
                let checkTemplate = await _deleteTemplateById(templateId);
                if (checkTemplate) {
                    res.status(204).end()
                } else {
                    throw ('Delete Template Error !')
                }
            } else {
                let checkEntry = await _deleteEntryByTemplate(templateId);
                if (!checkEntry) {
                    throw ('Delete Entry Do Not Used Error !')
                } else {
                    await _updateGenByTemplateId(templateId);
                    let checkTemplate = await _deleteTemplateById(templateId);
                    if (checkTemplate) {
                        return res.status(204).end()
                    } else {
                        throw ('Delete Template Error !')
                    }
                    // }
                }
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(403).json({
            success: false,
            message: err
        })
    }
}
*/
//DELETE 
var deleteTemplate = exports.deleteTemplate = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var templateId, dataUpdate;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        templateId = req.params.id;

                        if (templateId) {
                            _context3.next = 6;
                            break;
                        }

                        throw 'No Data !';

                    case 6:
                        _context3.next = 8;
                        return (0, _testTemplate.updateTestTemplate)({ _id: templateId }, { deleteVisible: true });

                    case 8:
                        dataUpdate = _context3.sent;

                        if (!(dataUpdate.length !== 0)) {
                            _context3.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context3.next = 14;
                        break;

                    case 13:
                        throw 'Delete Template Error !';

                    case 14:
                        _context3.next = 20;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](0);

                        console.log(_context3.t0);
                        return _context3.abrupt('return', res.status(403).json({
                            success: false,
                            message: _context3.t0
                        }));

                    case 20:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 16]]);
    }));

    return function deleteTemplate(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//# sourceMappingURL=testTemplate.js.map
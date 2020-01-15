import {
    _createCanidate,
    _getCanidateByEmail,
    _getAllCandidate,
    _getCandidateById,
    _editCandidate,
    _deleteCandidate,
    _updateCandidate
} from '../models/candidate'
//create canidate
import { _getEnglishTest } from '../models/englishExam'
import { _deleteEntryCodeByCandi, _createEntryEnglish } from '../models/entryCode'
export const createCanidate = async (req, res) => {
    try {
        const { dataCandidate } = req.body;
        if (!dataCandidate) {
            throw 'No Data!'
        } else {
            const dataCandi = await _getCanidateByEmail(dataCandidate.email);
            if (dataCandi) {
                throw ('Email exited!')
            } else {
                let data = await _createCanidate(dataCandidate);
                if (data) {
                    let dataEnglish = await _getEnglishTest();
                    if (!dataEnglish || !dataEnglish._id) {
                        throw (`Can't Get English Test !`)
                    } else {
                        let dataEntryEnglish = await _createEntryEnglish(data._id, dataEnglish._id)
                        if (dataEntryEnglish) {
                            let dataCandidateUpdate = await _updateCandidate(data._id, dataEntryEnglish._id);
                            if (dataCandidateUpdate) {
                                res.status(204).end()
                            } else {
                                throw (`Can't Update Candidate!`)
                            }
                        } else {
                            throw (`Can't create Enrty English !`)
                        }
                    }
                } else {
                    throw ('Create Candidate Error!')
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//get all candidate
export const getAllCandidate = async (req, res) => {
    try {
        const dataCandidate = await _getAllCandidate();
        res.status(200).json({
            success: true,
            dataCandidate
        })
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getCandidateById
export const getCandidateById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            importCandidate('No Data!')
        } else {
            let dataCandidate = await _getCandidateById(id);
            if (dataCandidate) {
                res.status(200).json({
                    success: true,
                    dataCandidate
                })
            } else {
                throw (`Can't Get Candidate`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//editCandidate
export const editCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataUpdate } = req.body;
        console.log('dataUpdate', dataUpdate);
        if (!id || !dataUpdate) {
            throw ('No Data!')
        } else {
            let dataCandi = await _editCandidate(id, dataUpdate)
            if (dataCandi) {
                res.status(204).end()
            } else {
                throw (`Can't Update Candidate!`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//deleteCandidate
export const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data!')
        } else {
            let check = await _deleteCandidate(id);
            if (check) {
                let checkEntry = await _deleteEntryCodeByCandi(id);
                if (!checkEntry) {
                    throw (`Can't Delete Entry Code`)
                } else {
                    res.status(204).end()
                }
            } else {
                throw (`Can't Delete Candidate!`)
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//importCandidate
export const importCandidate = async (req, res, next) => {
    try {
        const { arrCandidate } = req.body;
        if (!arrCandidate) {
            throw ('No Data')
        } else {
            let CandidateExist = 0;
            let CanidateImportError = 0;
            let EnglishCreateError = 0;
            let CandidateUpdateError = 0;
            let count = 0
            let newCandidate = []
            let dataEnglish = await _getEnglishTest();
            if (!dataEnglish) {
                throw ('English question is not exist !')
            } else {
                for (const dataCandidate of arrCandidate) {
                    console.log('dataCandidate', dataCandidate)
                    count++;
                    const checkCandidate = await _getCanidateByEmail(dataCandidate.email);
                    if (checkCandidate) {
                        CandidateExist++;
                    } else {
                        let dataCandi = await _createCanidate(dataCandidate);
                        if (!dataCandi) {
                            CanidateImportError++;
                        } else {
                            let dataEntryEnglish = await _createEntryEnglish(dataCandi._id, dataEnglish._id)
                            if (!dataEntryEnglish) {
                                EnglishCreateError++;
                            } else {
                                let dataCandidateUpdate = await _updateCandidate(dataCandi._id, dataEntryEnglish._id)
                                if (!dataCandidateUpdate) {
                                    CandidateUpdateError++;
                                } else {
                                    newCandidate.push({ id: dataCandidateUpdate._id, language: dataCandidate.language })
                                }
                            }
                        }
                    }
                    console.log('newCandidate', newCandidate)
                    req.body.newCandidate = newCandidate
                }
                if (count === arrCandidate.length) {
                    req.body.resCandidate = {
                        candidateImported: newCandidate,
                        success: true,
                        result: `${count - CandidateExist}/${count}`,
                        CanidateImportError: CanidateImportError,
                        EnglishCreateError: EnglishCreateError,
                        CandidateUpdateError: CandidateUpdateError,
                    }
                    console.log('ok')
                    next()
                }
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
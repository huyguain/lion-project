// import Excel from 'exceljs';
// import mongoXlsx from 'mongo-xlsx';
import csv from 'csvtojson'

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
export const readFileCsv = async (csvFilePath, callback) => {
  try {
    await csv()
      .fromFile(csvFilePath)
      .on('json', (jsonObj) => {
        return callback(null, jsonObj)
      })
  } catch (err) {
    return callback(err)
  }
}


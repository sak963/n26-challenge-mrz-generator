const {
  generateEmptyLine,
  replaceSubStringAtPositionToUpCase,
  replaceSpecialCharsBySpaces,
  truncateString
} = require('../services/string')

const {
  generateDateWithCheckDigit,
  generatePassportNumber,
  generateSex,
  generatePassportType,
  generateCountryCode,
  generateSurnameAndGivenNames
} = require('./common')

const lineLength = 36

const generateMrvB = data =>
  `${_generateLine1(data)}\n${_generateLine2(data)}`

const _generateLine1 = ({ passport, user }) => {
  let line = generateEmptyLine(lineLength)
  line = generatePassportType(line, passport)
  line = generateCountryCode(line, passport.issuingCountry, 2)
  line = generateSurnameAndGivenNames(line, user, 5, lineLength)
  return line
}

const _generateLine2 = ({ passport, user }) => {
  let line = generateEmptyLine(lineLength)
  line = generatePassportNumber(line, passport, 0)
  line = _generateUserNationality(line, user)
  line = _generateDateOfBirth(line, user)
  line = generateSex(line, user, 20)
  line = _generateExpirationDate(line, passport)
  return _generateOptionalField(line, passport)
  //return _generateGlobalDigitCheck(line)
}

const _generateUserNationality = (line, user) =>
  replaceSubStringAtPositionToUpCase(line, user.nationality, 10)

const _generateDateOfBirth = (line, user) =>
  generateDateWithCheckDigit(line, user.dateOfBirth, 13)

const _generateExpirationDate = (line, passport) =>
  generateDateWithCheckDigit(line, passport.expirationDate, 21)

const _generateOptionalField = (line, passport) => {
  let field = truncateString(passport.optionalField1.toUpperCase(), 8)
  field = replaceSpecialCharsBySpaces(field)
  return replaceSubStringAtPositionToUpCase(line, field, 28)
  //const digitCheck = checkDigitCalculation(field)
  //return replaceSubStringAtPositionToUpCase(line, digitCheck, 35)
}

module.exports = { generateMrvB }

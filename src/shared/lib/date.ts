/**
 * @readonly
 * @param YYYY 2022. Four-digit year
 * @param MM 01-12. The month, 2-digits
 * @param MMMM January-December. The full month name
 * @param D 1-31. The day of the month
 * @param DD 01-31. The day of the month, 2-digits
 * @param HH 00-23. The hour, 2-digits
 * @param mm 00-59. The minute, 2-digits
 * @param ss 00-59. The second, 2-digits
 */

export type DateFormats =
  | 'YYYY'
  | 'MM'
  | 'MMMM'
  | 'D'
  | 'DD'
  | 'HH'
  | 'mm'
  | 'ss'
export const dateFormatsRegexp = /Y{4}|M{4}|M{2}|D{1,2}|d{4}|H{2}|m{2}|s{2}/g

/**
 * Getting a string from a date in a given format
 * @param {String} str - date or string-date
 * @param {String} format - mix items from DateFormats type
 *
 * @example
 * getDate(new Date(2022, 2, 1), 'DD.MM.YYYY')
 * // '01.03.2022'
 *
 * @returns {String} string in a given format
 */
export function getDateFormat(
  str: string | Date | undefined,
  format: string,
): string {
  if (!str) return ''
  const date = new Date(str)
  const year = date.getFullYear()
  const month = addLeadingZero(date.getMonth() + 1)
  const day = date.getDate()
  const hour = addLeadingZero(date.getHours())
  const min = addLeadingZero(date.getMinutes())
  const sec = addLeadingZero(date.getSeconds())

  const formats: Record<DateFormats, string> = {
    YYYY: String(year),
    MM: month,
    MMMM: getMonth(date),
    D: String(day),
    DD: addLeadingZero(day),
    HH: hour,
    mm: min,
    ss: sec,
  }

  return format.replace(dateFormatsRegexp, (format: string) => {
    return formats[format as DateFormats]
  })
}

/**
 * Add leading zero
 * @param {String|Number} item elem to compare
 *
 * @example
 * addLeadingZero(1)
 * // 01
 * addLeadingZero(11)
 * // 11
 *
 * @returns {String} string with leading zero
 */
export function addLeadingZero(item: string | number): string {
  return +item < 10 ? `0${item}` : `${item}`
}

/**
 * Get string month
 * @param date
 * @param locales A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
 * @param options An object that contains one or more properties that specify comparison options.
 *
 * @returns {String}
 */
export function getMonth(
  date: Date,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
): string {
  return date
    .toLocaleString(locales, options || { month: 'long' })
    .replace(/^[а-яa-z]/i, (letter) => letter.toUpperCase())
}

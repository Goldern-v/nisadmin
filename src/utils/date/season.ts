import moment from 'moment';

export const getSeaonsStartAndEnd = (year?: number, season?: number) => {
  const _year = year || moment().year()
  const _season = season || moment().quarter()

  switch (_season) {
    case 1:
      return [moment(`${_year}-1-1`), moment(`${_year}-3-31`)]
    case 2:
      return [moment(`${_year}-4-1`), moment(`${_year}-6-30`)]
    case 3:
      return [moment(`${_year}-7-1`), moment(`${_year}-9-30`)]
    case 4:
      return [moment(`${_year}-10-1`), moment(`${_year}-12-31`)]
  }
}
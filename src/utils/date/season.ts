import moment from 'moment';

export const getSeaonsStartAndEnd = (year?: number, season?: number) => {
  const _year = year || moment().year()
  const _season = season || moment().quarter()

  switch (_season) {
    case 1:
      return [moment(`${year}-1-1`), moment(`${year}-3-31`)]
    case 2:
      return [moment(`${year}-4-1`), moment(`${year}-6-30`)]
    case 3:
      return [moment(`${year}-7-1`), moment(`${year}-9-30`)]
    case 4:
      return [moment(`${year}-10-1`), moment(`${year}-12-31`)]
  }
}
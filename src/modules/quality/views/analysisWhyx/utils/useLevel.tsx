import { appStore } from 'src/stores';
import qs from "qs";
import { useCallback, useEffect, useState } from 'react';

/**质控等级 */
export default () => {
  const { location } = appStore;
  const init = useCallback(() => {
    if (location.search) {
      let obj = qs.parse(location.search.substring(1))
      if (obj.level) return obj.level
    }
    return 3
  }, [location])
  const [level, setLevel] = useState(init())
  useEffect(() => {
    setLevel(init())
  }, [location])
  return level
};
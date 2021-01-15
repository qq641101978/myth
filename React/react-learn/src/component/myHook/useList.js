import { useState ,useEffect} from 'react'

export default function useList() {
  const [list, setlist] = useState([])
  useEffect(() => {
    (async () => {
      const stus = [1, 2, 3, 4]
      setlist(stus)
    })()
  }, [])
  return list
}

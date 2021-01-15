import { useEffect } from "react"

/**
 * 组件首次渲染后，启动一个 Interval 定时器
 * 组件卸载后，清除该定时器
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (func, duration) => {
  useEffect(() => {
    const timer = setInterval(func, duration)
    return () => {
      clearInterval(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
}


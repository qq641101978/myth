// 函数组件
export default function FnComp(props) {
  console.log(props)
  return <h1>函数组件:目前数字{ props.num }</h1>
}
import React, { Component } from 'react'

export default class index extends Component {
  state = {
    login: '',
    password: '',
    sex: 'male',
    chooseloves: ['football'],
    loves: [
      {value:'football', text:'足球'},
      {value:'baseball', text:'棒球'},
      {value:'movie', text:'电影'},
      {value:'music', text:'音乐'},
      {value:'other', text:'其他'},
    ],
    city: 'hangzhou',
    citys: [
      {value:'beijing', text:'北京'},
      {value:'shanghai', text:'上海'},
      {value:'hangzhou', text:'杭州'},
    ]
    
  }
  handlchange = e => {
    let val = e.target.value
    let name = e.target.name
    // console.log({ val, name })
    if (name === 'chooseloves') {
      let chooseloves = this.state.chooseloves
      if (this.state.chooseloves.includes(val)) {
        chooseloves = chooseloves.filter(it => it!== val)
      } else {
        chooseloves.push(val)
      }

      val = chooseloves
    }
    this.setState({
      [name]:val
    })
  }

  checkeds = () => {
    return this.state.loves.map(it => (
     <label key={ it.text }>
       <input type="checkbox" name="chooseloves"
          value={it.value }
          checked={this.state.chooseloves.includes(it.value)}
          onChange={this.handlchange}
        />{it.text}
      </label>
    ))
  }
  citys = () => {
    return (
      <select name="city" value={this.state.city} onChange={this.handlchange}>
        {this.state.citys.map(it => (
          <option key={ it.value} value={ it.value}>{it.text}</option>
        ))}
      </select>
    )
  }
  render() {

    return (
      <>
        <p>
          账户：
          <input type="text" name="login" value={ this.state.value } onChange={this.handlchange} />
        </p> 
        <p>
          密码：
          <input type="password" name="password" value={ this.state.value } onChange={this.handlchange} />
        </p> 
        <p>
          性别：
           男：<input type="radio" checked={this.state.sex === 'male'} name="sex" value="male" onChange={this.handlchange} />
           女：<input type="radio" checked={this.state.sex === 'female'} name="sex" value="female" onChange={this.handlchange}/>
        </p>
        <p>
          选择城市：{this.citys()}
        </p>
        <p>
        {this.checkeds()}
        </p>
        <p>
          <button onClick={() => {
            console.log(this.state)
          }}>获取表单数据</button>
        </p>
      </>
    )
  }
}

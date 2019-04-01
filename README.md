# puzzle
### Vue2.0数字华容道
![Image text](https://github.com/wzbus/puzzle/blob/master/img/demo_pc.jpg)
#### 玩法说明
将项目clone至本地，直接运行index.html，点击开始新游戏，通过键盘方向键或者点击空位旁边的数字把该数字移动至空位，最终将矩阵内数字还原为1~15的顺序，浏览器缓存记录个人历史用时最佳成绩。项目支持响应式，喜欢的朋友请点个Star。
#### 程序解析
* 可解性
```js
// 计算数列的逆序数，若逆序数为偶数，则该4*4矩阵可解
for (let i = 0; i < 14; i++) {
  for (let j = i + 1; j < 15; j++) {
    if (this.tempArr[i] > this.tempArr[j]) {
      k++;
    }
  }
  if (k % 2 === 0) {
    // 传递数据生成矩阵，详见源码
  }  else {
    this.sort() // 重新排列数列
  }
}
```
* 点击移动数字
```js
// 获取数组内的数值与索引，与空位交换
move(index) {
  if (this.start) {
    const curNum = this.list[index],
      leftNum = this.list[index - 1],
      rightNum = this.list[index + 1],
      topNum = this.list[index - 4],
      bottomNum = this.list[index + 4]
    if (leftNum === '') {
      this.$set(this.list, index - 1, curNum)
      this.$set(this.list, index, '')
      this.c++ // 累计步数
    } else if (rightNum === '') {
      // 下同
    }
  }
```
* 方向键移动数字
```js
// 获取空格所在位置，与周边数字交换
const that = this
  document.onkeydown = function (e) {
    if (that.start) {
      let empty = that.list.indexOf('')
      if (e.keyCode === 37 && empty % 4 !== 15) {
        that.$set(that.list, empty, that.list[empty + 1])
        that.$set(that.list, empty + 1, '')
        that.count++
      } else if (e.keyCode === 38 && empty < 12) {
        // 下同
      }
    }
  }

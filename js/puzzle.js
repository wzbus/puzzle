new Vue({
  el: '#app',
  data() {
    return {
      mode: 4,
      num: 0,
      list: [],
      tempArr: [],
      t: 0,
      min: 0,
      s: 0,
      ms: 0,
      count: 0,
      complex: 0,
      start: false,
      succ: false,
      score: [],
      record: []
    }
  },
  methods: {
    sort() {
      clearInterval(this.t)
      this.ms = this.s = this.min = this.count = 0
      const m = this.list.filter(n => n)
      this.tempArr = m.sort(() => {
        return Math.random() - 0.5
      })
      let k = 0
      for (let i = 0; i < this.num - 2; i++) {
        for (let j = i + 1; j < this.num - 1; j++) {
          if (this.tempArr[i] > this.tempArr[j]) {
            k++;
          }
        }
      }
      if (k % 2 === 0) {
        this.list = []
        this.list = this.list.concat(this.tempArr)
        this.list.push('')
        this.succ = false
        this.start = true
        this.t = setInterval(this.timer, 10)
        this.key()
        switch (true) {
          case k <= 36:
            this.complex = 1
            break
          case k >= 38 && k <= 46:
            this.complex = 2
            break
          case k >= 48 && k <= 58:
            this.complex = 3
            break
          case k >= 60 && k <= 68:
            this.complex = 4
            break
          case k >= 70:
            this.complex = 5
            break
        }
      } else {
        this.sort()
      }
    },
    replay() {
      if (this.start && !this.succ) {
        this.list = []
        this.list = this.list.concat(this.tempArr)
        this.list.push('')
        this.succ = false
        clearInterval(this.t)
        this.ms = this.s = this.min = this.count = 0
        this.t = setInterval(this.timer, 10)
      } else {
        alert("请先开始游戏！")
      }
    },
    timer() {
      this.ms += 1
      if (this.ms >= 100) {
        this.ms = 0
        this.s += 1
      }
      if (this.s >= 60) {
        this.s = 0
        this.min += 1
      }
      if (this.min >= 60) {
        clearInterval(this.t)
      }
    },
    move(index) {
      const empty = this.list.indexOf('')
      const audio = document.getElementById('audio')
      if (this.start) {
        if (Math.floor(index / this.mode) === Math.floor(empty / this.mode)) {
          if (index < empty) {
            for (let i = 0; i < empty - index; i++) {
              this.$set(this.list, empty - i, this.list[empty - i - 1])
              this.$set(this.list, empty - i - 1, '')
            }
            this.count++
            audio.play()
          } else if (index > empty) {
            for (let i = 0; i < index - empty; i++) {
              this.$set(this.list, empty + i, this.list[empty + i + 1])
              this.$set(this.list, empty + i + 1, '')
            }
            this.count++
            audio.play()
          }
        } else if (index % this.mode === empty % this.mode) {
          if (index < empty) {
            for (let i = 0; i < (empty - index) / this.mode; i++) {
              this.$set(this.list, empty - i * this.mode, this.list[empty - (i + 1) * this.mode])
              this.$set(this.list, empty - (i + 1) * this.mode, '')
            }
            this.count++
            audio.play()
          } else if (index > empty) {
            for (let i = 0; i < (index - empty) / this.mode; i++) {
              this.$set(this.list, empty + i * this.mode, this.list[empty + (i + 1) * this.mode])
              this.$set(this.list, empty + (i + 1) * this.mode, '')
            }
            this.count++
            audio.play()
          }
        }
      } else {
        alert("请先开始游戏！")
      }
    },
    key() {
      const that = this
      document.onkeydown = function (e) {
        if (that.start) {
          const empty = that.list.indexOf('')
          const audio = document.getElementById('audio')
          if (e.keyCode === 37 && empty % that.mode !== that.mode - 1) {
            that.$set(that.list, empty, that.list[empty + 1])
            that.$set(that.list, empty + 1, '')
            that.count++
            audio.play()
          }
          else if (e.keyCode === 38 && empty < that.num - that.mode) {
            e.preventDefault()
            that.$set(that.list, empty, that.list[empty + that.mode])
            that.$set(that.list, empty + that.mode, '')
            that.count++
            audio.play()
          }
          else if (e.keyCode === 39 && empty % that.mode !== 0) {
            that.$set(that.list, empty, that.list[empty - 1])
            that.$set(that.list, empty - 1, '')
            that.count++
            audio.play()
          }
          else if (e.keyCode === 40 && empty > that.mode) {
            e.preventDefault()
            that.$set(that.list, empty, that.list[empty - that.mode])
            that.$set(that.list, empty - that.mode, '')
            that.count++
            audio.play()
          }
        }
      }
    },
    check() {
      const m = this.list.filter(n => n)
      const succ = m.every((e, i) => e === i + 1)
      if (succ) {
        clearInterval(this.t)
        this.succ = true
        this.start = false
        let newScore = this.min + '′' + this.zero(this.s) + '″' + this.zero(this.ms)
        let newRecord = 3600000 - (this.min * 60000 + this.s * 1000 + this.ms * 10)
        if (newRecord > this.record[2]) {
          if (newRecord > this.record[1]) {
            if (newRecord > this.record[0]) {
              this.score[2] = this.score[1]
              this.score[1] = this.score[0]
              this.score[0] = newScore
              localStorage.setItem('score', JSON.stringify(this.score))
              if (this.record[0] !== 0) {
                setTimeout(() => {
                  alert('恭喜你创造新记录，获得第一名！')
                }, 500)
              }
              this.calRecord()
            } else {
              this.score[2] = this.score[1]
              this.score[1] = newScore
              localStorage.setItem('score', JSON.stringify(this.score))
              if (this.record[1] !== 0) {
                setTimeout(() => {
                  alert('恭喜你创造新记录，获得第二名！')
                }, 500)
              }
              this.calRecord()
            }
          } else {
            this.score[2] = newScore
            localStorage.setItem('score', JSON.stringify(this.score))
            if (this.record[2] !== 0) {
              setTimeout(() => {
                alert('恭喜你创造新记录，获得第三名！')
              }, 500)
            }
            this.calRecord()
          }
        } else {
          return false
        }
      }
    },
    calRecord() {
      let len = this.score.filter(n => n).length
      this.record = []
      for (let i = 0; i < len; i++) {
        let syb1 = this.score[i].indexOf("′")
        let syb2 = this.score[i].indexOf("″")
        let min = this.score[i].substring(0, syb1)
        let s = this.score[i].substring(syb1 + 1, syb2)
        let ms = this.score[i].substring(syb2 + 1)
        this.record.push(3600000 - (min * 60000 + s * 1000 + ms * 10))
      }
      for (let i = 0; i < 3 - len; i++) {
        this.record.push(0)
      }
    },
    toast() {
      alert('第一名：' + this.score[0] + '\n第二名：' + this.score[1] + '\n第三名：' + this.score[2])
    },
    zero(len) {
      return (Array(2).join(0) + len).slice(-2);
    }
  },
  mounted() {
    this.num = Math.pow(this.mode, 2)
    for (let i = 1; i < this.num; i++) {
      this.list.push(i)
    }
    this.list.push('')
    if (localStorage.getItem('score')) {
      this.score = JSON.parse(localStorage.getItem('score')).filter(n => n)
    }
    this.calRecord()
  },
  watch: {
    list() {
      if (this.start && this.list.indexOf('') === this.num - 1) {
        this.check()
      }
    }
  },
  computed: {
    star() {
      let list = []
      for (let i = 0; i < this.complex; i++) {
        list.push('<img src="img/star_full.png"/>')
      }
      while (list.length < 5) {
        list.push('<img src="img/star_empty.png"/>')
      }
      return list
    }
  }
})
const stringUtils = {
    // 是否为null or ''
    isEmpty: function(input) {
      return input == null || input === ''
    },
    // 是否不为null or  ''
    isNotEmpty: function(input) {
      return !this.isEmpty(input)
    },
    // 是否是纯空格
    isBlank: function(input) {
      return input == null || /^\s*$/.test(input)
    },
    isNotBlank: function(input) {
      return !this.isBlank(input)
    },
    // 去除前后空格
    trim: function(input) {
      return input.replace(/^\s+|\s+$/, '')
    },
    // 去除前后空格
    trimToEmpty: function(input) {
      return input == null ? '' : this.trim(input)
    },
    startsWith: function(input, prefix) {
      return input.indexOf(prefix) === 0
    },
    // 如果是true, 否则返回fasle
    endsWith: function(input, suffix) {
      return input.lastIndexOf(suffix) === 0
    },
    contains: function(input, searchSeq) {
      return input.indexOf(searchSeq) >= 0
    },
    equals: function(input1, input2) {
      return input1 === input2
    },
    equalsIgnoreCase: function(input1, input2) {
      return input1.toLocaleLowerCase() === input2.toLocaleLowerCase()
    },
    containsWhitespace: function(input) {
      return this.contains(input, ' ')
    },
    // 生成指定个数的字符
    repeat: function(ch, repeatTimes) {
      var result = ''
      for (var i = 0; i < repeatTimes; i++) {
        result += ch
      }
      return result
    },
    deleteWhitespace: function(input) {
      return input.replace(/\s+/g, '')
    },
    rightPad: function(input, size, padStr) {
      return input + this.repeat(padStr, size)
    },
    leftPad: function(input, size, padStr) {
      return this.repeat(padStr, size) + input
    },
    // 首小写字母转大写
    capitalize: function(input) {
      if (input == null || input.length === 0) {
        return input
      }
      return input.replace(/^[a-z]/, function(matchStr) {
        return matchStr.toLocaleUpperCase()
      })
    },
    // 首大写字母转小写
    uncapitalize: function(input) {
      if (input == null || input.length === 0) {
        return input
      }
      return input.replace(/^[A-Z]/, function(matchStr) {
        return matchStr.toLocaleLowerCase()
      })
    },
    // 大写转小写，小写转大写
    swapCase: function(input) {
      return input.replace(/[a-z]/ig, function(matchStr) {
        if (matchStr >= 'A' && matchStr <= 'Z') {
          return matchStr.toLocaleLowerCase()
        } else if (matchStr >= 'a' && matchStr <= 'z') {
          return matchStr.toLocaleUpperCase()
        }
      })
    },
    // 统计含有的子字符串的个数
    countMatches: function(input, sub) {
      if (this.isEmpty(input) || this.isEmpty(sub)) {
        return 0
      }
      var count = 0
      var index = 0
      while ((index = input.indexOf(sub, index)) !== -1) {
        index += sub.length
        count++
      }
      return count
    },
    // 只包含字母
    isAlpha: function(input) {
      return /^[a-z]+$/i.test(input)
    },
    // 只包含字母、空格
    isAlphaSpace: function(input) {
      return /^[a-z\s]*$/i.test(input)
    },
    // 只包含字母、数字
    isAlphanumeric: function(input) {
      return /^[a-z0-9]+$/i.test(input)
    },
    // 只包含字母、数字和空格
    isAlphanumericSpace: function(input) {
      return /^[a-z0-9\s]*$/i.test(input)
    },
    // 数字
    isNumeric: function(input) {
      return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input)
    },
    // 小数
    isDecimal: function(input) {
      return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 负小数
    isNegativeDecimal: function(input) {
      return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 正小数
    isPositiveDecimal: function(input) {
      return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 整数
    isInteger: function(input) {
      return /^[-+]?(?:0|[1-9]\d*)$/.test(input)
    },
    // 正整数
    isPositiveInteger: function(input) {
      return /^\+?(?:0|[1-9]\d*)$/.test(input)
    },
    // 负整数
    isNegativeInteger: function(input) {
      return /^\-?(?:0|[1-9]\d*)$/.test(input)
    },
    // 只包含数字和空格
    isNumericSpace: function(input) {
      return /^[\d\s]*$/.test(input)
    },
    isWhitespace: function(input) {
      return /^\s*$/.test(input)
    },
    isAllLowerCase: function(input) {
      return /^[a-z]+$/.test(input)
    },
    isAllUpperCase: function(input) {
      return /^[A-Z]+$/.test(input)
    },
    defaultString: function(input, defaultStr) {
      return input == null ? defaultStr : input
    },
    defaultIfBlank: function(input, defaultStr) {
      return this.isBlank(input) ? defaultStr : input
    },
    defaultIfEmpty: function(input, defaultStr) {
      return this.isEmpty(input) ? defaultStr : input
    },
    // 字符串反转
    reverse: function(input) {
      if (this.isBlank(input)) {
        return ''
      }
      return input.split('').reverse().join('')
    },
    // 删掉特殊字符(英文状态下)
    removeSpecialCharacter: function(input) {
      return input.replace(/[!-/:-@\[-`{-~]/g, '')
    },
    // 只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
    isSpecialCharacterAlphanumeric: function(input) {
      return /^[!-~]+$/.test(input)
    },
  
    /**
     * @param {String} message
     * @param {Array} arr
     * 消息格式化
     */
    format: function(message, arr) {
      return message.replace(/{(\d+)}/g, function(matchStr, group1) {
        return arr[group1]
      })
    },
    /**
     * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd
     * @param {String} input
     * @param {Boolean} ignoreCase : true or false
     */
    compressRepeatedStr: function(input, ignoreCase) {
      const pattern = new RegExp('([a-z])\\1+', ignoreCase ? 'ig' : 'g')
      const result = input.replace(pattern, function(matchStr, group1) {
        return matchStr.length + group1
      })
      return result
    },
  
    // 中文校验
    isChinese: function(input) {
      return /^[\u4E00-\u9FA5]+$/.test(input)
    },
    // 去掉中文字符
    removeChinese: function(input) {
      return input.replace(/[\u4E00-\u9FA5]+/gm, '')
    },
    //
    splitFileName: function(text) {
      const pattern = /\.{1}[a-z]{1,}$/
      if (pattern.exec(text) !== null) {
        return (text.slice(0, pattern.exec(text).index))
      } else {
        return text
      }
    }
  }
  
  export default stringUtils
  
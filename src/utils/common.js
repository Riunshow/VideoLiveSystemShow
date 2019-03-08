// 匹配手机号码
export function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false
  } else {
    return true
  }
}
// 判断字符串是否为空
export function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true
  } else {
    return false
  }
}
// 礼物榜快排
export function quickSortRichPeople(arr) {
  if (arr.length <= 1) return arr

  let pivotIndex = Math.floor(arr.length / 2)

  let pivot = arr.splice(pivotIndex, 1)[0]

  let left = []
  let right = []

  //比基准小的放在left，比基准大的放在right
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].payMoney <= pivot.payMoney) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  //递归
  return quickSortRichPeople(left).concat([pivot], quickSortRichPeople(right))
}
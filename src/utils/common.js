// 匹配手机号码
export function checkPhone(phone){ 
	if(!(/^1[34578]\d{9}$/.test(phone))){ 
			return false
	} else {
		return true
	}
}
// 判断字符串是否为空
export function isEmpty(obj){
	if(typeof obj == "undefined" || obj == null || obj == ""){
			return true;
	}else{
			return false;
	}
}
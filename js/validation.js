// $('#submit').on('click',function(){
//   var aaa = $('form').serializeArray()
//   console.log(aaa)
// })

/***************show result******************/
function check(reg,element){
  if(reg.test(element.val())){
    $(element).prev('label').children('.check').hide().siblings('.true').show()
  }else{
    $(element).prev('label').children('.check').hide().siblings('.false').show()
  }
}
//===============第一頁表單===============//
//id(email)
var id = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
var $id = $('#id')
$id.on('keyup',function(){
  check(id,$id)
  allcheck(0)
})
//password
var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/; 
var $password = $('#password')
$password.on('keyup',function(){
  check(password,$password)
  firstPassword = $(this).val()
  passwordCheck() //進入密碼確認
  allcheck(0)
})
//密碼二次確認
$('#password_check').on('keyup',function(){
  secPassword = $(this).val()
  passwordCheck() //進入密碼確認
  allcheck(0)
})

//===============第二頁表單===============//
//姓名
var myname = /^[\u4e00-\u9fa5_a-zA-Z0-9\s]{2,10}$/;
var $myname = $('#myname')
$myname.on('keyup',function(){ 
  check(myname,$myname)
  allcheck(1)
})
//phone
var phone = /^[09]{2}[0-9]{8}$/;
var $phone = $('#phone')
$phone.on('keyup',function(){ 
  check(phone,$phone)
  allcheck(1)
})
//生日
var birthday_confirm
$('#year,#month,#day').on('change',function(){
  var $year = $('#year').val()
  var $month = $('#month').val()
  var $day = $('#day').val()
  if($year&&$month&&$day){
    birthday_confirm = true
    $(this).parent().prev('label').children('.check').hide().siblings('.true').show()
  }else{
    birthday_confirm = false
    $(this).parent().prev('label').children('.check').hide().siblings('.false').show()
  }
  allcheck(1)
})

//===============付款資訊表單===============//
//信用卡號
var cardnumber = /^\d{4} \d{4} \d{4} \d{4}$/;
var $cardnumber = $('#cardnumber')
$cardnumber.on('keyup',function(){ 
  check(cardnumber,$cardnumber)
  allcheck(3)
})
//持卡人姓名
var cardholder = /^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/;
var $cardholder = $('#cardholder')
$cardholder.on('keyup',function(){ 
  check(cardholder,$cardholder)
  allcheck(3)
})
//銀行名稱
var bank = /^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/;
var $bank = $('#bank')
$bank.on('keyup',function(){ 
  check(bank,$bank)
  allcheck(3)
})
//cvv
var cvv = /^(\d){3}$/;
var $cvv = $('#cvv')
$cvv.on('keyup',function(){ 
  check(cvv,$cvv)
  allcheck(3)
})
//生日
var ex_day_confirm
$('#ex_y,#ex_m').on('change',function(){
  var $ex_y = $('#ex_y').val()
  var $ex_m = $('#ex_m').val()
  if($ex_y&&$ex_m){
    ex_day_confirm = true
    $(this).parent().prev('label').children('.check').hide().siblings('.true').show()
  }else{
    ex_day_confirm = false
    $(this).parent().prev('label').children('.check').hide().siblings('.false').show()
  }
  allcheck(3)
})






//密碼二次確認涵式
var password_confirm
var firstPassword
var secPassword
function passwordCheck(){
  if(secPassword===firstPassword){
    password_confirm = true
    $('#password_check').prev('label').children('.check').hide().siblings('.true').show()
  }else{
    password_confirm = false
    $('#password_check').prev('label').children('.check').hide().siblings('.false').show()
  }
}
/*******確認表單無誤********/
function allcheck(step){
  if(step==0){
    var data = {
      'id' : id.test($id.val()),
      'password' : password.test($password.val()),
      'password_confirm': password_confirm
    }
    if(data.id&&data.password&&data.password_confirm){
      $('.submit').eq(step).addClass('ready').removeAttr('disabled').attr({
        "value":'完成/下一步'
      })
    }else{
      $('.submit').eq(step).removeClass('ready').attr({
        "disabled": 'disabled',
        "value":'資料尚未填妥'
      })
    }

  }else if(step==1){
    var data = {
      'myname' : myname.test($myname.val()),
      'phone' : phone.test($phone.val()),
      'birthday': birthday_confirm
    }
    if(data.myname&&data.phone&&data.birthday){
      $('.submit').eq(step).addClass('ready').removeAttr('disabled').attr({
        "value":'完成/下一步'
      })
    }else{
      $('.submit').eq(step).removeClass('ready').attr({
        "disabled": 'disabled',
        "value":'資料尚未填妥'
      })
    }
  }else if(step==3){
    var data = {
      'cardnumber' : cardnumber.test($cardnumber.val()),
      'cardholder' : cardholder.test($cardholder.val()),
      'bank': bank.test($bank.val()),
      'cvv': cvv.test($cvv.val()),
      'ex_day_confirm': ex_day_confirm
    }
    if(data.cardnumber&&data.cardholder&&data.bank&&data.cvv&&data.ex_day_confirm){
      $('.submit').eq(step).addClass('ready').removeAttr('disabled').attr({
        "value":'完成/下一步'
      })
    }else{
      $('.submit').eq(step).removeClass('ready').attr({
        "disabled": 'disabled',
        "value":'資料尚未填妥'
      })
    }
    
  }
}
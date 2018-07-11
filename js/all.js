{
  var now = 0;
  $(".form").eq(now).show();
  $(".submit").on("click", function() {
    now < 3 ? now++ : (now = 4);
    nextHandler();
  });
  function nextHandler() {
    $(".form").hide().eq(now).show();
    $('.process li').eq(now).addClass('active')
    $('.process li').eq(now-1).removeClass('active').addClass('done')
    $('.inner').animate({
      width: (now)*33 + '%',
    },500)
  }

  //label後插入//
  $('label').append(`
  <span class="check true">
  <i class="far fa-check-circle"></i>
  </span>
  <span class="check false">
  <i class="far fa-times-circle"></i>
  </span>`)
  //生日選項自動產出
  var today = new Date();
  var yyyy = today.getFullYear();
  var ex_y = today.getFullYear();
  for (var i = 0; i < 100; i++, yyyy--) {
    $("#year").append(`<option value="${yyyy}">${yyyy}</option>`);
  }
  for (var i = 1; i < 13; i++) {
    $("#month,#ex_m").append(`<option value="${i}">${i}</option>`);
  }
  for (var i = 1; i < 32; i++) {
    $("#day").append(`<option value="${i}">${i}</option>`);
  }
  //信用卡年限
  for (var i = 0; i < 20; i++, ex_y++) {
    $("#ex_y").append(`<option value="${ex_y}">${ex_y}</option>`);
  }

  //載入臺灣縣市
  var postal;
  $.ajax({
    url: "js/data.json",
    dateType: "json"
  }).done(function(res) {
    postal = res;
    init();
  });

  function init() {
    //console.log(postal.taiwan[0].city)
    $.each(postal.taiwan, function(index, value) {
      //console.log(index,value.city)
      $("#city").append(`<option value=${index}>${value.city}</option>`);
    });
  }
  $("#city").on("change", function() {
    $("#dist>option")
      .slice(1)
      .remove();
    var country = postal.taiwan[$("#city").val()].area;
    //console.log(country)
    $.each(country, function(index, value) {
      console.log(index, value);
      $("#dist").append(`<option value=${index}>${value.text}</option>`);
    });
  });
  //載入臺灣縣市
}

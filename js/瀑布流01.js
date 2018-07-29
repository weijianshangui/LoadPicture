$(function(){
  var iWidth = 200; //列宽
  var iSpace = 10; //实际宽、
  var iOuterWidth = iWidth + iSpace; //列实际宽
  var iCells = 0; //总列
  var oContainer = $("#container");
  var oLoader = $("#loader");
  var iPage = 0;
  var sUrl = "http://www.wookmark.com/api/json/popular?callback=?";
  var arrL = [];
  var arrT = [];
  var flag = true; //判断每一次是否加载完毕

  function setCells(){
    iCells = Math.floor($(window).innerWidth() / iOuterWidth);
    document.title = iCells;
    oContainer.css('width',iOuterWidth*iCells - iSpace);
  }

  setCells();
  for (var i = 0; i < iCells; i++) {
    arrT.push(0);
    arrL.push(i*iOuterWidth);
  }

  //完全不懂为啥这为啥就错了
 /* $.getJSON("http://www.wookmark.com/api/json/popular?jsoncallback=?", 'page=0',function(data){
    console.log(data);
    alert();
    $.each(data,function(index,obj){
      alert(obj);
      var oImg = $('<img />')
      oImg.attr('src',obj.preview);

      oContainer.append(oImg);

      var iHeight = iWidth/obj.width * obj.height;
      oImg.css({
        width:iWidth,
        top:iHeight
      })

      //获取arrT最小位置
      var iMinIndex = getMin();
      //设置定位
      oImg.css({
        left:arrL[iMinIndex],
        top:arrT[iMinIndex]
      });

      arrT[iMinIndex] += iHeight;
    })
  });*/

  getData();
  function getData(){
    if(flag){
      flag = false;
      oLoader.show();
      $.ajax({
         url: sUrl+iPage,
         type: "GET",
         data: {"page":iPage},
         dataType: "jsonp",
         success: function (data) {
           console.log(1);
           $.each(data,function(index,obj){
             var oImg = $('<img />')
             oImg.attr('src',obj.preview);
             oContainer.append(oImg);
             var iHeight = iWidth/obj.width * obj.height;
             oImg.css({
               width:iWidth,
               top:iHeight
             })

             //获取arrT最小位置
             var iMinIndex = getMin();
             //设置定位
             oImg.css({
               left:arrL[iMinIndex],
               top:arrT[iMinIndex]
             });
             arrT[iMinIndex] += iHeight + 10;
              oLoader.hide();
              flag = true;
           });
           iPage++;
         }
      })
    }
  }

  $(window).on('scroll',function(){
    var iH = $(window).scrollTop() + $(window).innerHeight();
    var iMinIndex = getMin();
    if(arrT[iMinIndex] + oContainer.offset().top<iH){
      getData();
    }
  })

  function getMin(){
    var iv = arrT[0];
    var _index = 0;
    for(var i=1;i<arrT.length;i++){
      if(arrT[i]<iv){
        iv = arrT[iv];
        _index = i;
      }
    }
    return _index;
  }

})

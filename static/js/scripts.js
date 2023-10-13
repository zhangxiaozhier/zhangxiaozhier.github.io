  // Remove svg.radial-progress .complete inline styling
  $('svg.radial-progress').each(function( index, value ) { 
    $(this).find($('circle.complete')).removeAttr( 'style' );
  });


$(window).on("load", function() {
    "use strict";

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const square = entry.target.querySelectorAll('.triggerAnm');
        
        square.forEach(sq => {
          let classList = $(sq).attr('data-anm');
          if (entry.isIntersecting) {
            $(sq).addClass(classList);
            return; 
          }
  
          $(sq).removeClass(classList);
        })

      });
    });
    
    $('.scrollAnm').each(function(i,e){
      observer.observe(e);
    });



  /*================== Responsive Menu Dropdown =====================*/
  $(".responsiveNavigation ul ul").parent().addClass("menu-item-has-children");
  $(document).on("click", ".responsiveNavigation ul li.menu-item-has-children > a", function() {
      $(this).parent().toggleClass("active").siblings().removeClass("active");
      $(this).next("ul").slideToggle();
      $(this).parent().siblings().find("ul").slideUp();
      return false;
  });    
      
  
  /*================== Initialize Fancy Box Plugin =====================*/
  Fancybox.bind('[data-fancybox="gallery"]', {
    Toolbar: true,
    animated: true,
    dragToClose: true,
    closeButton: "top",
    Thumbs: {
      minScreenHeight: 0,
    },
  });

  



    /*=================== Sticky Header ===================*/
    $(window).on("scroll",function(){
      var scroll = $(window).scrollTop();
      var hstick = $("header");
      if (scroll > 20){
          hstick.addClass("sticky");
      } else{
          hstick.removeClass("sticky");
      }

  });


    /*=================== Sidemenu Functions ===================*/
    var stopFlag = false;
    $(".menu-btn.open, .fullmenu-btn").on('click',function(){
        $('body').addClass('menu-opened');
        return false;
    });
    $("html, .menu-btn.close").on('click',function(){
      if(stopFlag == false){
        $('body').removeClass('menu-opened');
      }
      stopFlag = false;
    });
    $('.menu-btn.open, .sideheader, .fullmenu-btn').on('click',function(e){
        e.stopPropagation();
    })

    $(".responsive-btn").on("click",function(){
        $(this).next("ul").toggleClass("active");
        return false;
    });

    var themeWrap = document.querySelector('.themeWrap');
    addSwipeEvent(themeWrap, "swipeLeft", function(){
      if($(".responsive-btn").length > 0){
        $(".responsive-btn").next("ul").removeClass("active");
      }
      else if($(".menu-btn").length > 0){
        $('body').addClass('menu-opened');
        stopFlag = true;
      }
    });
    addSwipeEvent(themeWrap, "swipeRight", function(){
      if($(".responsive-btn").length > 0){
        $(".responsive-btn").next("ul").addClass("active");
      }
      else if($(".menu-btn").length > 0){
        $('body').removeClass('menu-opened');
        stopFlag = true;
      }
    });


    /*================== Map =====================*/
    if($('body').find('#map-canvas').length > 0){
      var myLatlng = new google.maps.LatLng(51.5015588, -0.1276913);
      var mapOptions ={
      zoom:14,
      disableDefaultUI:true,
      scrollwheel:false,
      center:myLatlng
      }
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
      var image = '';
      var myLatLng = new google.maps.LatLng(51.5015588, -0.1276913);
      var beachMarker = new google.maps.Marker({
        position:myLatLng,
        map:map,
        icon:image
      });
  }


});



function MdrnPf(){
  var window_width = $(window).width();

  if ($('body').find('div').hasClass('modern-portfolio')){    
    if(window_width < 990){
      $('.modern-portfolio').css({'width':window_width - 30 });
    }
    else{
      $('.modern-portfolio').css({'width':window_width });
    }
  

    var container_left = $('.container').offset().left;
    $(".modern-portfolio").css({
      "left": -container_left
    });

    if($('body').find('.blackbar').length > 0){
      $(".modern-portfolio").css({
        "padding-left": $('.blackbar').width()
      });
      }
  }
}

MdrnPf();
$(window).on('resize',function(){
  MdrnPf();
});




function addSwipeEvent(theDom, eventName, handleEvent) {
  var eStart = 0, eEnd = 0, isScrolling = false;

  theDom.addEventListener('touchstart', function(e) {
    isScrolling = false;

    switch (eventName) {
      case "swipeLeft":
      case "swipeRight":
        eStart = e.targetTouches[0].clientX;
        break;
    }
  }, false);

  theDom.addEventListener('mousedown', function(e) {
    isScrolling = false;

    switch (eventName) {
      case "swipeLeft":
      case "swipeRight":
        eStart = e.clientX;
        break;
    }
  }, false);

  theDom.addEventListener('touchmove', function(e) {
    if (!isScrolling) {
      var moveX = e.changedTouches[0].clientX;
      var moveY = e.changedTouches[0].clientY;
      var moveXAbs = Math.abs(moveX - eStart);
      var moveYAbs = Math.abs(moveY - eStart);

      if (moveXAbs > 30 && moveXAbs > moveYAbs) {
        e.preventDefault();
        isScrolling = true;
      }
    }
  }, false);

  theDom.addEventListener('mousemove', function(e) {
    if (!isScrolling) {
      var moveX = e.clientX;
      var moveY = e.clientY;
      var moveXAbs = Math.abs(moveX - eStart);
      var moveYAbs = Math.abs(moveY - eStart);

      if (moveXAbs > 30 && moveXAbs > moveYAbs) {
        e.preventDefault();
        isScrolling = true;
      }
    }
  }, false);

  theDom.addEventListener('touchend', function(e) {
    switch (eventName) {
      case "swipeLeft":
      case "swipeRight":
        eEnd = e.changedTouches[0].clientX;
        break;
    }

    var moveVal = eEnd - eStart;
    var moveAbsVal = Math.abs(moveVal);

    // swipeLeft
    if (moveVal < 0 && moveAbsVal > 30 && eventName == "swipeLeft") {
      handleEvent();
    }

    // swipeRight
    if (moveVal > 0 && moveAbsVal > 30 && eventName == "swipeRight") {
      handleEvent();
    }
  }, false);

  theDom.addEventListener('mouseup', function(e) {
    switch (eventName) {
      case "swipeLeft":
      case "swipeRight":
        eEnd = e.clientX;
        break;
    }

    var moveVal = eEnd - eStart;
    var moveAbsVal = Math.abs(moveVal);

    // swipeLeft
    if (moveVal < 0 && moveAbsVal > 30 && eventName == "swipeLeft") {
      handleEvent();
    }

    // swipeRight
    if (moveVal > 0 && moveAbsVal > 30 && eventName == "swipeRight") {
      handleEvent();
    }
  }, false);
}



$("#contact_form").submit(function(e) {
  e.preventDefault(); // Prevent the default form submission
  



    /* =============== Ajax Contact Form ===================== */
    $('#contact_form').submit(function(){
      var action = $(this).attr('action');
      $("#message").slideUp(750,function() {
      $('#message').hide();
        $("#contact_form").find('.submit')
          .after('<img src="images/ajax-loader.gif" class="loader" />')
          .attr('disabled','disabled');
      $.post(action, {
          name: $("#contact_form").find("input[name='Name']").val(),
          email: $("#contact_form").find("input[name='Email']").val(),
          comments:  $("#contact_form").find("textarea[name='Message']").val(),
          verify: $('#verify').val()
      },
          function(data){
              document.getElementById('message').innerHTML = data;
              $('#message').slideDown('slow');
              $('#contact_form img.loader').fadeOut('slow',function(){$(this).remove()});
              $("#contact_form").find('.submit').removeAttr('disabled');
              if(data.match('success') != null) $('#contact_form').slideUp('slow');

          }
      );
      });
      return false;
  });

});

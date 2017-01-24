/*global $, alert, console, setInterval, clearInterval*/
/*jslint plusplus: true*/
$(function () {
    'use strict';
    // Vars
    var width       = 720,
        slidingTime = 1000,
        showTime    = 4000,
        slideNum    = 1,
        slideClick  = 300,
        slides      = $('.slides'),
        slide       = slides.find('.slide'),
        left        = $('.left'),
        right       = $('.right'),
        bullet      = $('.bullets .bullet'),
        sliding;
    
    // Sliding Function
    function slideMe() {
      right.fadeOut();
        left.fadeOut();
        slides.animate({'margin-left': '-=' + width }, slidingTime, function () {
            right.fadeIn();
            left.fadeIn();
            slideNum++;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === slide.length) {
                slideNum = 1;
                $('#bullet' + (slideNum)).addClass('active');
                slides.css('margin-left', 0);
            }
        });
    }
    
    // Right Navigator
    right.on("click", function () {
        right.fadeOut(100);
        left.fadeOut(100);
        slides.animate({'margin-left': '-=' + width }, slideClick, function () {
            right.fadeIn();
            left.fadeIn();  
            slideNum++;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === slide.length) {
                slideNum = 1;
                $('#bullet' + (slideNum)).addClass('active');
                slides.css('margin-left', 0);
            }
        });
    });
    // Left Navigator
    left.on("click", function () {
        right.fadeOut(100);
        left.fadeOut(100);
        slides.animate({'margin-left': '+=' + width }, slideClick, function () {
            right.fadeIn();
          left.fadeIn();
            slideNum--;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === 0) {
                slideNum = (slide.length - 1);
                slides.css('margin-left', "-" + (width * (slide.length - 2)) + "px");
            }
        });
    });

    // Firing up Sliding
    function letMeSlide() {
        sliding = setInterval(function () {
            slideMe();
        }, showTime);
    }
    
    // Puasing The Slider
    function stopMe() {clearInterval(sliding); }
   
    // Mouse Effect Configurations
    slides.on('mouseenter', stopMe).on('mouseleave', letMeSlide);
        
    // bullets Click
    bullet.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        slideNum = $(this).data('slide');
        if ($(this).hasClass('active')) {
            slides.animate({'margin-left': (bullet.length - $(this).data('image')) * width }, slideClick);
        }
    });

    // Lets Rock & Roll :D
    letMeSlide();


// burger code 
     var $burger = $('.burger'),
      $topLine = $('.burger__line-top'),
      $midLine = $('.burger__line-mid'),
      $menuLine = $('.burger__menu'),
      anim = false;

  var changeClasses = {
    addActive: function() {
      for (var i = 0; i <= 2; i++) {
        $burger.children().eq(i).removeClass('reverseLine' + (i + 1)).addClass('activeLine' + (i + 1));
      }
    },
    addReverse: function() {
      for (var i = 0; i <= 2; i++) {
        $burger.children().eq(i).removeClass('activeLine' + (i + 1)).addClass('reverseLine' + (i + 1));
      }
    }
  }

  var timeouts = {
    initial: function(child, Y, rot, scale) {
      $burger.children().eq(child).css('transform', 'translateY(' + Y + 'px) rotate(' + rot + 'deg) scale(' + scale + ',1)');
    },
    afterActive: function() {
      // ES6
      setTimeout(()=> {
        this.initial(0, 12, 45, 1.40);
        this.initial(1, -12, -45, 1.40);
        this.initial(2, 35, 0, 1);
        $burger.children().eq(2).css('opacity', '0');
        anim = true;
      }, 1300);
      // With bind()
      // setTimeout(function() {
      //   this.initial(0, 12, 45, 1.40);
      //   this.initial(1, -12, -45, 1.40);
      //   this.initial(2, 35, 0, 1);
      //   $burger.children().eq(2).css('opacity', '0');
      //   anim = true;
      // }.bind(this), 1300);
    },
    beforeReverse: function() {
      setTimeout(()=> {
        for (var i = 0; i <= 2; i++) {
          this.initial(i, 0, 0, 1);
        }
        $burger.children().eq(2).css('opacity', '1');
        anim = false;
      }, 1300);
    }
  }

  $burger.on('click', function() {
    if (!anim) {
      changeClasses.addActive();
      timeouts.afterActive();
    } else if (anim) {
      changeClasses.addReverse();
      timeouts.beforeReverse();
    }
  });

  // menu
 

// pills


//register form

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$("#submitButton").click(function() {

  var errorMessage = "";
  var errorEmail = "";
  var errorPhone = "";
  var fieldsMissing = "";

  if ($("#email").val() == "") {
    fieldsMissing += "<span>Email, </span>";
  }

  if ($("#phone").val() == "") {
    fieldsMissing += "<span>Phone, </span>";
  }

  if ($("#password").val() == "") {
    fieldsMissing += "<span>Password, </span>";
  }

  if ($("#passwordConfirm").val() == "") {
    fieldsMissing += "<span>Confirm Password</span>";
  }

  if (fieldsMissing != "") {
    errorMessage += "<p>The follwing fields are missing: " + fieldsMissing + "</p>";
  }

  if (isEmail($("#email").val()) == false) {

    errorEmail += "<span>Your Email Address is not valid</span>";
    errorMessage += "<br>" + errorEmail

  }

  if ($.isNumeric($("#phone").val()) == false) {

    errorPhone += "<span>Your Phone number is not numeric</span>"
    errorMessage += "<br>" + errorPhone
  }



  if (($("#password").val()) != ($("#passwordConfirm").val())) {
    errorMessage += "<p>Your Passwords don't match</p>"
  }

  if (errorMessage != "") {

    $("#errorMessage").html(errorMessage);
    $("#errorEmail").html(errorEmail);
    $('#errorPhone').html(errorPhone);
    $("#successMessage").hide();

  } else {
    $("#successMessage").show('slow');
    $("#errorMessage").hide();
    $("#errorEmail").hide();
    $("#errorPhone").hide();
  }

});

// autocomplete form

$("#searchtext").keyup(function() {
    getAutoCompleteValues($("#searchtext").val());
  });


// buttonStar AJAX request

$(".zvezdica").click(function(){
       var $dinos = $('.showContent');

      $.ajax({
    url: 'http://mysafeinfo.com/api/data?list=dinosaurs&format=json',
    type: 'get',
    dataType: 'json',
  })

  .done(function(dino) {
    $.each(dino, function(i, dino) {
    //  $dinos.append('<li><a href="'+$(this).attr('url')+'">'+$(this).attr('nm')+'</a></li>');    I OVAJ KOD RADI!
    $dinos.append('<li><a href="'+dino.url +'">'+dino.nm+' </a></li>');
    });

  })

  .fail(function() {
    $dinos.append('<li>Error with the server</li>');
  })

  .always(function() {

  });


    });

});



function getAutoCompleteValues(val) {

  $.ajax({
    dataType: "jsonp",
    jsonp: "cb",
    cache: 'false',
    // jsonpCallback: "callback",
    url: "http://autocomplete.wunderground.com/aq?query=" + val + "&format=json",
    // cache: false,
    success: function(data) {
      // alert(data);
      if (val == "") {
      $("#results").html('');
      $("#results").removeClass('result');}
      else {
      $("#results").html('');
      $("#results").addClass('result');
  for (var i = 0; i < 8; i++) {
    var city = data.RESULTS[i]['name'];
    $("#results").append('<li><a href="#">'+city+'</a></li>'); 
  }
}
    }
  });
}

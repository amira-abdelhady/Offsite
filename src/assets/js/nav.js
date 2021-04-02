
import * as $ from 'jquery'
      $(document).ready(function(){
        $('#dropdown').click(function(){
          $('#dropdown-menu').slideToggle("slow");
        });
        $('#dropdown2').click(function(){
          $('#dropdown-menu2').slideToggle("slow");
        })
        $(window).scroll(function(){
          var scroll = $(window).scrollTop();
          if (scroll > 100) {
            $(".editnav").css("background" , "#353a3b80");
            $('#dropdown-menu').css("background" , "#353a3b80");
            $('#dropdown-menu2').css("background" , "#353a3b80");
          }
          else{
            $(".editnav").css("background" , "rgba(255, 255, 255, 0)");
          }
      })
      })
$(".slide-nav").on("click", function (e) {
    e.preventDefault();
    // get current slide
    var current = $(".flex--active").data("slide"),
      // get button data-slide
      next = $(this).data("slide");
  
    $(".slide-nav").removeClass("active");
    $(this).addClass("active");
  
    if (current === next) {
      return false;
    } else {
      $(".wrapper")
        .find(".flex__container[data-slide=" + next + "]")
        .addClass("flex--preStart");
      $(".flex--active").addClass("animate--end");
      setTimeout(function () {
        $(".flex--preStart")
          .removeClass("animate--start flex--preStart")
          .addClass("flex--active");
        $(".animate--end")
          .addClass("animate--start")
          .removeClass("animate--end flex--active");
      }, 800);
    }
  });
  
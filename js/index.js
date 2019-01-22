$(function () {
	var mySwiper = new Swiper('.swiper-container', {
		initialSlide: 0,
		direction: "vertical",
		on: {
			init: function () {
				this.slides.eq(this.activeIndex).find('.ani').css("display", "block")
			},
			slideChangeTransitionEnd: function () {
				this.slides.eq(this.prevIndex).find('.ani').css("display", "none")
				this.slides.eq(this.activeIndex).find('.ani').css("display", "block")
			}
		},
		noSwiping: true,
		noSwipingClass: 'stop-swiping'
	});
})
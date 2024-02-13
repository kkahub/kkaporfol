$(function(){
	/* input */
		$("input[type='text']").click(function(){
			$(this).val("")
		});
	/* textarea */
		$("textarea").click(function(){
			$(this).text("")
		});

	/* label */
	$(".company_sel").change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings(".label_style1").text(select_name);
	});
	$(".telsel1").change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings(".label_style2").text(select_name);
	});
	$(".telsel2").change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings(".label_style3").text(select_name);
	});

	/* 예외처리 알람 */
	/* 팝업1 */
	$(".cam_nav .icon_font.join").click(function(){
		event.preventDefault();
		$(".blind").show();
		$(".business_up").removeClass("hide");	
	});
	$(".advertiser_pop .close,.advertiser_pop .cancle").click(function(){
		$(".business_up,.blind").addClass("hide");
		$(".blind").hide();
	});

	/* 팝업2 */
	$(".cam_nav .icon_font.join").click(function(){
		event.preventDefault();
		$(".blind").show();
		$(".joined,.blind").removeClass("hide");	
	});
	$(".advertiser_pop .close,.advertiser_pop .conform").click(function(){
		$(".joined,.blind").addClass("hide");	
		$(".blind").hide();
	});
});
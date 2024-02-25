$(function(){
	/* modal */
		//닫기, 취소클릭
		$(".pop_header .close,.req_btn li:first-child").click(function(){
			$(".full_bg,.rfp_pop").hide();
		});
		$("#클릭할아이디or클레스").click(function(){
			$(".full_bg,.rfp_pop").show();
		});

	/* input */
		$("input[type='text'],input[type='tel'],input[type='email'],input[type='password']").click(function(){
			$(this).val("");
		});
	/* textarea */
		$("textarea").click(function(){
			$(this).text("");
		});
});
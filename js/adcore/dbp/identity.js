$(function(){
/* 약관 팝업 시작 */
	/* 팝업 시작 */
		$(".terms_detail").click(function(){
			$(".pop_terms,.blind").show();
		});
		$(".close").click(function(){
			$(".pop_terms,.blind").hide();
		});
	/* 팝업 끝 */

	/* 텝 시작 */
		$(".tab1 li:last-child").click(function(){
			$(".use_terms").hide();
			$(".info_policy").show();
		});
		$(".tab2 li:first-child").click(function(){
			$(".info_policy").hide();
			$(".use_terms").show();
		});
	/* 텝 끝 */

 	/* label 시작 */
		var select1 = $("#list_wrap1");
		var select2 = $("#list_wrap2");

		select1.change(function(){
			var select_name = $(this).children("option:selected").text();

			$(this).siblings(".date label").text(select_name);

		});

		select2.change(function(){
			var select_name = $(this).children("option:selected").text();

			$(this).siblings(".date label").text(select_name);

		});
 	/* label 끝 */

	/* 회원가입 이용약관 동의 시작 */
	$("#agree0").click(function(){
		if( document.getElementById("agree0").checked ){
			document.getElementById("agree1").checked = true;
			document.getElementById("agree2").checked = true;
			document.getElementById("agree3").checked = true;
			document.getElementById("agree4").checked = true;
			document.getElementById("agree5").checked = true;
		} else {
			document.getElementById("agree1").checked = false;
			document.getElementById("agree2").checked = false;
			document.getElementById("agree3").checked = false;
			document.getElementById("agree4").checked = false;
			document.getElementById("agree5").checked = false;
		}
	});
		
	/* 회원가입 이용약관 동의 끝 */
/* 약관 팝업 끝 */

	/* input */
		$("input[type='text']").click(function(){
			$(this).val("")
		});
	/* textarea */
		$("textarea").click(function(){
			$(this).text("")
		});

		
		/* 로그인 팝업 */
		$('.txt_login').toggle(function() {
			$('.memAttr .log').css('display', 'block');
		},
		function() {
			$('.memAttr .log').css('display', 'none');
		});
		
		$('#pop_mem_id').focus(function() {
			$('.log_alert').css('display', 'none');
		});
		
		$('#pop_mem_pwd').focus(function() {
			$('.log_alert').css('display', 'none');
		});
		
		// 로그인 팝업 로그인
		$('.btnpoplogin').on('click', function() {
			if ($('#pop_mem_id').val() == "") {
				$('.log_alert').css('display', 'block');
			}
			if ($('#pop_mem_pwd').val() == "") {
				$('.log_alert').css('display', 'block');
			}
			
			$.ajax({
				url : "login.do",
				data : $('.frmpopjoin').serialize(),
				type : "POST",
				dataType : "json",
				success : function(data, err, stat) {
					if (data.msg != "" && typeof data.msg != "undefined") {					
						$('.log_alert').css('display', 'block').html('<hr>' + data.msg);
					} else if (data.stat == "No Auth") {
						$('.log').css('display', 'none');
						
						$('.log_confirm').css('display', 'block');
					} else {
						$('.memAttr').css('display', 'none');
						$('.log_confirm').css('display', 'none');
						$('.log_menu').css('display', 'table-cell');
						//$('.log_me').html('Hi, ' + data.memb_id + '<span class="carrot_up"></span>');
						location.reload();
					}
				}
			});
			
			return false;
		});
		
		$('.resend').on('click', function() {
			$.ajax({
				url : "reAuth.do",
				data : {
					MEMB_ID : $('#pop_mem_id').val()
				},
				type : "POST",
				dataType : "json",
				success : function(data, XHR, stat) {
					alert('! 인증 메일을 재발송 하였습니다.\nE-mail 인증 후 다시 로그인해주시기 바랍니다.\n감사합니다.');
					location.reload();
				}
			});
			
			return false;
		});
		
		$('.log_out').on('click', function() {
			if (confirm("! 정말 로그아웃을 하시겠습니까?")) {
				$(location).attr('href', 'logout.do');
			}
		});
		
});
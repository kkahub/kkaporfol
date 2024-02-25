$(".viewport:eq(1)").css("width","300px");

$(function(){
	$('#vertical-horizontal-scrollbar-demo2').customScrollbar({updateOnWindowResize:true});//스크롤 리사이즈

	/* 스크롤 리사이즈 */
	$(window).resize(function(){
			$(".left_inner").css("height", $(window).height()-$("nav.light.sticky-nav.navigation").height()-200);
			$("div.scroll-bar.vertical").css("height",$(window).height()-$("nav.light.sticky-nav.navigation").height()-200);

			var fullHeight = $(window).height();//컨텐츠 full 사이즈
			var fullWidth = $(window).width();
			$(".iclass,#userInfo,#signOutInfo,#pass_write").css("height",fullHeight - 82 + "px");
			$(".iclass,#userInfo,#signOutInfo,#pass_write").css("width",fullWidth - 300 + "px");
	}).resize();

	/* Left 메뉴 아코디언 */
	$(".user_menu>li ul").hide();

	$(".user_menu a").click(function(){
			var subUl = $(this).siblings("ul").css("display")
			if ( subUl == "none" ) {
				$(this).parent().siblings().css("background-position","95% 16px");
				$(this).parent().css("background-position","95% -62px");
				$(this).parent().siblings().children("ul").slideUp(200);
				$(this).siblings("ul").slideDown(200);
			} else {
				$(this).parent().css("background-position","95% 16px");
				$(this).siblings("ul").slideUp(200);
			}
			$('#vertical-horizontal-scrollbar-demo2').customScrollbar({updateOnWindowResize:true, vScroll:false});//스크롤 리사이즈
	});

		
	/* input */
		$("input[type='text']").click(function(){
			$(this).val("");
		});

	/* label */
		$(".telsel1").change(function(){
			var select_name = $(this).children("option:selected").text();
			$(this).siblings(".label_style1").text(select_name);
		});
		$(".telsel2").change(function(){
			var select_name = $(this).children("option:selected").text();
			$(this).siblings(".label_style2").text(select_name);
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
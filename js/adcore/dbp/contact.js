$(function(){
	/* 내용 글자수 카운트 */
	var limit_length = 5000;
	var msg_length = 0;
	
	// String에 bytes() 함수 만들기
	String.prototype.bytes = function() {
		var msg = this;
		var cnt = 0;
		
		for (var i = 0; i < msg.length; i++)
			// 한글이면 2, 그 외 문자 1, count 증가
//			cnt += (msg.charCodeAt(i) > 128) ? 2 : 1;
			// 모든 문자 1byte로 취급
			cnt += 1;
		return cnt;
	};
		
	//textarea에서 키를 입력할 때마다 동작
	$('textarea').on('keyup', function(e) {
		msg_length = $(this).val().bytes();
		
		if (msg_length <= limit_length) {
			$('.limit_txt .red').text(String(msg_length).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		} else {
			alert('입력할 수 있는 최대 길이는 ' + limit_length + ' bytes입니다.');
			var msg = $(this).text();
			$(this).val($(this).val().slice(0, -1));
		}
	});
	
	/* 파일명 가져오기 시작 */
		var fileTarget = $('.file');

		fileTarget.on('change', function(){
			var filename = "";
			if(window.FileReader){
				filename = $(this)[0].files[0].name;
			} else { 
				filename = $(this).val().split('/').pop().split('\\').pop(); 
			}

			$(this).parent().siblings('#file_txt').val(filename);
		});
	/* 파일명 가져오기 끝 */

	$("#file_txt").click(function(){
		$(".file").click();
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
});
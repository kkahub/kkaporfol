$(function(){
 	/* label */
		var select = $("#re_cate");

		select.change(function(){
			var select_name = $(this).children("option:selected").text();
			$(this).siblings(".cate_sel label").text(select_name);
		});

	/* modal */
		$(".pop_btn").click(function(){
			$("html,body").animate({scrollTop:0},{duration:500, easing:"easeInCubic"})
			$(".blind,.buy_pop").show();
		});
		/*$(".close,.req_btn li:first-child").click(function(){*/
		$(".close").click(function(){
			$(".blind,.buy_pop").hide();
		});
		$(".req_btn li:last-child").click(function(){
			$(".blind,.buy_pop").hide();
		});

	/* RFP modal */
		/*$("클릭 클래스명").click(function(){
			$(".blind,.rfp_pop").show();
		});*/
		//닫기, 취소클릭
		$(".rfp_close,.req_btn li:last-child").click(function(){
			$(".blind,.rfp_pop").hide();
		});
		//신청클릭
		$(".req_btn li:first-child").click(function(){
			
			if (session_membid == "") {
				alert("회원전용 서비스 입니다. 로그인 후 이용해주세요.");
				$(".blind,.rfp_pop").hide();
				return;
			}	
			
			
			var reg_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gi;
			
			if($("#rfp_conm").val() == '' || $("#rfp_conm").val() == 'Company'){
				$(".blind").show();
				alert("회사명을 입력해주세요");
				$("#rfp_conm").focus();
				$("#rfp_conm").val('');
				return;
			}
			else if($("#rfp_nm").val() == '' || $("#rfp_nm").val() == '실제 성함을 입력해주세요.'){
				$(".blind").show();
				alert("이름을 입력해주세요");
				$("#rfp_nm").focus();
				$("#rfp_nm").val('');
				return;
			}
			else if($("#rfp_email").val() == '' || $("#rfp_email").val() == 'Ex. abc@abc.com'){
				$(".blind").show();
				alert("이메일을 입력해주세요");
				$("#rfp_email").focus();
				$("#rfp_email").val('');
				return;
			}
			else if($("#rfp_mobile").val() == '' || $("#rfp_mobile").val() == '실제 연락 받을 연락처를 남겨주세요.'){
				$(".blind").show();
				alert("전화번호를 입력해주세요");
				$("#rfp_mobile").focus();
				$("#rfp_mobile").val('');
				return;
			}
			else if($("#rfp_budget").val() == '' || $("#rfp_budget").val() == '광고 집행 예산을 입력해 주세요.'){
				$(".blind").show();
				alert("예산을 입력해주세요");
				$("#rfp_budget").focus();
				$("#rfp_budget").val('');
				return;
			}
			else if(!reg_email.test($("#rfp_email").val())){
				$(".blind").show();
				alert("이메일을 형식이 올바르지 않습니다.");
				$("#rfp_email").focus();
				$("#rfp_email").val('');
				return;
			}
			
			else{
				
				var mdlist = "";
				for(var i=0; i<rfpList.length; i++){
					mdlist = mdlist+rfpList[i]+"|";
				}
				//alert(mdlist);
				var memb_id = session_membid;
				var rfps_mdlist = mdlist;
				var rfps_conm = $("#rfp_conm").val();
				var rfps_nm = $("#rfp_nm").val();
				var rfps_email = $("#rfp_email").val();
				var rfps_mobile = $("#rfp_mobile").val();
				var rfps_budget = $("#rfp_budget").val();
				var rfps_txt = ($("#rfp_txt").val() == '요청 사항을 입력해주세요.') ?  '': $("#rfp_txt").val();
				
				$.ajax({
					url:"../main/rfpInsert.do",
					type:"post",
					dataType:"json",
					data:{memb_id: memb_id, rfps_mdlist: rfps_mdlist, rfps_conm: rfps_conm, rfps_nm: rfps_nm, rfps_email: rfps_email, rfps_mobile: rfps_mobile, rfps_budget: rfps_budget, rfps_txt: rfps_txt},
					success: function(data){
						
						//alert(data.result);
						if(data.result == 'ok'){
							$(".blind,.rfp_pop").hide();
							alert("RFP요청이 완료되었습니다.");
						}else{
							$(".blind").show();
							alert("RFP요청중 오류가 발생하였습니다.\n반복될 경우 고객센터로 문의바랍니다.");
						}
					}
				});
				
				
				
				
			}
		});
		
		
		
	/* input */
		$("input[type='text'],input[type='tel'],input[type='email'],input[type='password']").click(function(){
			$(this).val("");
		});
	/* textarea */
		$("textarea").click(function(){
			$(this).text("");
		});
		
		/* 로그인 팝업 */
		var log = false;
		$('.txt_login').on('click', function() {
			if (log) {
				$('.memAttr .log').css('display', 'none');
				log = false;
			} else {
				$('.memAttr .log').css('display', 'block');
				log = true;
			}
		});
		
		
});





/*구매요청*/
function buyInsert(){
	
	var reg_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gi;
	var cate_nm = $("#re_cate").val();
	var purc_conm = $("#purc_conm").val();
	var purc_nm = $("#purc_nm").val();
	var purc_email = $("#purc_email").val();
	var purc_mobile = $("#purc_mobile").val();
	var purc_budget = $("#purc_budget").val();
	var purc_txt = $("#purc_txt").val();
	
	if(memb_id == ''){
		alert("회원전용 서비스 입니다. 로그인 후 이용해주세요.");
		return false;
	}
	if(cate_nm == '' || cate_nm == null){
		alert("요청 카테고리를 선택하여 주십시요.");
		return false;
	}
	if(purc_conm == ''){
		alert("회사명을 입력해주세요");
		$("#purc_conm").focus();
		return false;
	}
	if(purc_nm == ''){
		alert("이름을 입력해주세요");
		$("#purc_nm").focus();
		return false;
	}
	if(purc_email == ''){
		alert("이메일을 입력해주세요");
		$("#purc_email").focus();
		return false;
	}else if(!reg_email.test(purc_email)){
		alert("이메일을 형식이 올바르지 않습니다.");
		$("#purc_email").focus();
		return false;
	}
	if(purc_mobile == ''){
		alert("전화번호를 입력해주세요");
		$("#purc_mobile").focus();
		return false;
	}
	if(purc_budget == ''){
		alert("예산을 입력해주세요");
		$("#purc_budget").focus();
		return false;
	}
	
	
	$.ajax({
		url : 'buyInsert.do',
		type:"post",
		data : {memb_id: memb_id, cate_nm: cate_nm, purc_conm: purc_conm, purc_nm: purc_nm, purc_email: purc_email, purc_mobile: purc_mobile, purc_budget: purc_budget, purc_txt: purc_txt},
		dataType : 'json',
		success : function(data, err, stat) {
			
			if(data.result == 1){
				alert("구매요청이 접수되었습니다.");
				$(".blind,.buy_pop").hide();
			}else{
				alert("구매요청중 오류가 발생하였습니다.\n반복될 경우 고객센터로 문의바랍니다.");
			}
			
			
			
			
		}
	});
	
	return false;
}














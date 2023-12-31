//닉네임 

$(function(){
	let nickChecked = 0; //0은 중복체크 미실행 또는 중복, 1은 미중복
	//닉네임 중복체크
	$('#mem_nick_check').click(function(){
		if(!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{4,12}/.test($('#mem_nick').val())){
			alert('한글,영문 또는 숫자 사용, 최소 4자 ~ 최대 12자를 사용하세요!');
			$('#mem_nick').val('').focus();
			return false;
		}
		//서버와 통신
		$.ajax({
			url:'checkMyNick.do',
			type:'post',
			data:{mem_nick:$('#mem_nick').val()},
			dataType:'json',
			success:function(param){
				if(param.result == 'nickNotFound'){
					nickChecked = 1;
					$('#message_mem_nick').css('color','#000000').text('등록 가능 닉네임');
				}else if(param.result == 'isDuplicated'){
					nickChecked = 0;
					$('#message_mem_nick').css('color','red').text('중복된 닉네임');
					$('#mem_nick').val('').focus();
				}else{
					nickChecked = 0;
					alert('닉네임 중복체크 오류 발생');
				}
			},
			error:function(){
				nickChecked = 0;
				alert('네트워크 오류 발생');
			}
		});
	});
	
	//닉네임 유효성 체크
	$('#modify_nick').submit(function(){
		if($('#mem_nick').val().trim()==''){
			alert('닉네임을 입력해주세요');
			$('#mem_nick').val('').focus();
			return false;
		}
		if(nickChecked == 0){
			alert('닉네임 중복체크는 필수입니다.');
			return false;
		}
	});
	
	//닉네임 중복 안내 메시지 초기화
	$('#mem_nick').keydown(function(){
		nickChecked = 0;
		$('#message_mem_nick').text('');
	});//end of keydown
	
	
//전공	
	
	//전공 유효성 체크
	$('#modify_major').submit(function(){
		if($('#mem_major').val().trim()==''){
			alert('전공을 입력해주세요');
			$('#mem_major').val('').focus();
			return false;
		}
	});
	
	
//프로필 이미지

	//파일명 띄우기
	$("#mem_photo").on('change',function(){
  		let fileName = $("#mem_photo").val();
 		 $(".upload-name").val(fileName);
	});
	
	//프로필 이미지 수정 버튼 클릭시
	$('#photo_btn').click(function(){
		$('#photo_choice').show();
		$(this).hide();//수정 버튼 감추기
	});
	
	//프로필 이미지 미리 보기
	let photo_path = $('.my-photo').attr('src');//처음 화면에 보여지는 이미지 읽기
	$('#mem_photo').change(function(){
		let my_photo = this.files[0];
		if(!my_photo){
			//선택을 취소하면 원래 처음 화면으로 되돌림
			$('.my-photo').attr('src',photo_path);
			return;
		}
		if(my_photo.size > 1400 * 1400){
			alert(Math.round(my_photo.size/1400) + 'kbytes(1400kbytes까지만 업로드 가능)');
			//용량에 걸리면 원래 처음 화면으로 되돌림
			$('.my-photo').attr('src',photo_path);
			$(this).val('');//선택한 파일 정보 지우기
			return;
		}
		
		//화면에서 프로필 이미지 미리 보기
		const reader = new FileReader();
		reader.readAsDataURL(my_photo);
		
		reader.onload=function(){
		$('.my-photo').attr('src',reader.result);
		return;
		}
	});//end of change
	
	//프로필 이미지 전송
	$('#mem_photo_submit').click(function(){
		if($('#mem_photo').val()==''){
			alert('파일을 선택하세요!');
			$('#mem_photo').focus();
			return;
		}
		
		//파일 전송
		const form_data = new FormData();
		
		form_data.append('mem_photo',$('#mem_photo')[0].files[0]);
		$.ajax({
			url:'modifyMyPage.do',
			type:'post',
			data:form_data,
			dataType:'json',
			contentType:false,//데이터 객체를 문자열로 바꿀지에 대한 값. true는 일반문자
			processData:false,//해당 타입을 true로 하면 일반 text로 구분
			success:function(param){
				if(param.result == 'logout'){
					alert('로그인 후 사용하세요!');
				}else if(param.result == 'success'){
					alert('프로필 사진이 수정되었습니다.');
					//수정된 이미지 정보 저장
					photo_path = $('.my-photo').attr('src');
					$('#mem_photo').val('');
					$('#photo_choice').hide();//초기화 작업
					$('#photo_btn').show();//수정 버튼 표시
				}else{
					alert('파일 전송 오류 발생');
				}
			},
			error:function(){
				alert('네트워크 오류 발생');
			}
		});
	});	//end of click
	
	//프로필 이미지 미리보기 취소
	$('#mem_photo_reset').click(function(){
		//초기 이미지 표시
		//이미지 미리보기 전 이미지로 되돌리기
		$('.my-photo').attr('src',photo_path);
		$('#mem_photo').val('');
		$('#photo_choice').hide();
		$('#photo_btn').show();//수정 버튼 표시
		$('.upload-name').val('');//첨부파일 부분 비우기
	});
});	
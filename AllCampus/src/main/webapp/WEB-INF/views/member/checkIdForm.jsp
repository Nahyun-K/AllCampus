<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아이디 찾기 - 올캠퍼스</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jy.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript">
$(function(){
	$('#checkId_form').submit(function(){
		if($('#email').val().trim()==''){
			alert('이메일을 입력해주세요.');
			$('#email').val('').focus();
			return false;
		}
	});
});
</script>
</head>
<body>
<div class="page-main-custom align-center">
	<a href="${pageContext.request.contextPath}/main/main.do">
		<img src="${pageContext.request.contextPath}/images/logo_symbol_231208.png" width="100" class="mem-logo">
	</a>
	<div class="finds">
		<a href="checkIdForm.do" class="find-link-pick">아이디 찾기</a>
		<a href="checkPwForm.do" class="find-link">비밀번호 찾기</a>	
	</div>
	<form id="checkId_form" action="checkId.do" method="post">
		<ul>
			<li class="floating-label">
				<input type="email" placeholder="가입된 이메일" 
					name="email" id="email" class="form-input"
					maxlength="30" autocomplete="off">
				<label for="email">가입된 이메일</label>	
			</li>
		</ul>
		<input type="submit" value="아이디 찾기" class="input-button2" style="font-size:15px;">
	</form>
	<p style="margin-left:-50px;">
	올캠퍼스가 처음이신가요? 
	<a href="registerUserForm.do" class="important">회원가입</a>
<div class="bottom">
	<a href="${pageContext.request.contextPath}/faq/faq.do" class="bottom-style">문의하기</a>
	<a href="${pageContext.request.contextPath}/mymember/termForm.do" class="bottom-style">이용약관</a>
	<br>
	<div class="copyright">copyright(c) 2023. 올캠퍼스. All rights reserved</div>
</div>
</div>
</body>
</html>
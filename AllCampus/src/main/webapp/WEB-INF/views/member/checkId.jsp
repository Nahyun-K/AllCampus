<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${!empty check_email}">    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아이디 찾기 결과 - 올캠퍼스</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jy.css">
</head>
<body>
<div class="page-main-custom">
	<div class="result-display">
		<div class="align-center">
			<a href="${pageContext.request.contextPath}/main/main.do">
				<img src="${pageContext.request.contextPath}/images/logo_symbol_231208.png" width="100">
			</a>
			<p>
			<c:if test="${empty check_id}">
				[${check_email}]로 가입된 아이디가 존재하지 않습니다.<p>
				<input type="button" value="이전으로" class="input-button1"
					onclick="location.href='${pageContext.request.contextPath}/member/checkIdForm.do'">
				<input type="button" value="처음으로" class="input-button1"
					onclick="location.href='${pageContext.request.contextPath}/main/main.do'">
			</c:if>
			<c:if test="${!empty check_id}">
				[${check_email}]로 가입된 아이디는 [${check_id}]입니다.<p>
				<input type="button" value="로그인하기" class="input-button1"
					onclick="location.href='${pageContext.request.contextPath}/member/loginForm.do'">
				<input type="button" value="비밀번호 찾기" class="input-button1"
					onclick="location.href='${pageContext.request.contextPath}/member/checkPwForm.do'">	
			</c:if>
		</div>
	</div>
</div>
</body>
</html>
</c:if>
<c:if test="${empty check_email}">
	<script type="text/javascript">
		location.href='loginForm.do';
	</script>
</c:if>
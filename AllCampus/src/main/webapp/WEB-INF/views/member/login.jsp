<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:choose>
	<c:when test="${mem_auth == 1}">   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 정보 - 올캠퍼스</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jy.css">
</head>
<body>
<div class="page-main-custom">
	<div class="result-display">
		<div class="align-center">
			이용수칙 위반으로 정지된 계정입니다.<br>
			신고일로부터 3일 후 정상 이용이 가능합니다.<p>
			<input type="button" value="처음으로" class="input-button1"
				onclick="location.href='${pageContext.request.contextPath}/main/main.do'">
		</div>
	</div>
</div>
</body>
</html>
	</c:when>
	<c:otherwise>
		<script type="text/javascript">
			alert('아이디 또는 비밀번호가 불일치합니다.');
			history.go(-1);
		</script>
	</c:otherwise>
</c:choose> 
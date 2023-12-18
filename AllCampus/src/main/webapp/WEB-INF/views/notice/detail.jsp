<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 상세글</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board.fav.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board.reply.js"></script>
</head>
<body>
<div class="page-main">
	<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<div class="content-main">
		<h2>${notice.notice_title}</h2>
		<ul class="detail-info">
			<li>
				관리자<br>
			</li>
		</ul>
		<hr size="1" noshade="noshade" width="100%">
		<c:if test="${!empty notice.notice_filename}">
		<div class="align-center">
			<img src="${pageContext.request.contextPath}/upload/${notice.notice_filename}" class="detail-img">
		</div>
		</c:if>
		<p>
			${notice.notice_content}
		</p>
		<hr size="1" noshade="noshade" width="100%">
		<ul class="detail-sub">
			<li>
				<%-- 좋아요 --%>
				<img id="output_fav" data-num="${notice.notice_num}"
					src="${pageContext.request.contextPath}/images/fav01.gif" width="50">
				좋아요
				<span id="output_fcount"></span>
			</li>
			<li>
				<c:if test="${!empty notice.notice_modify_date}">
					최근 수정일 : ${notice.notice_modify_date}
				</c:if>
				작성일 : ${notice.notice_reg_date}
				<%-- 관리자로 로그인된 계정만
					 수정,삭제 가능 (일반회원은 접근 불가)--%>
				<c:if test="${auth == 9}">
				<input type="button" value="수정" onclick="location.href='updateForm.do?notice_num=${notice.notice_num}'">
				<input type="button" value="삭제" id="delete_btn">
				<script type="text/javascript">
					let delete_btn = document.getElementById('delete_btn');
					//이벤트 연결
					delete_btn.onclick=function(){
						let choice = confirm('삭제하시겠습니까?');
						if(choice){
							location.replace('delete.do?notice_num=${notice.notice_num}');
						}
					};
				</script>
				</c:if>
			</li>
		</ul>
	</div>
</div>
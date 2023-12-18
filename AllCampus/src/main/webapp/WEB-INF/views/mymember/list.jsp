<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>내가 쓴 글 목록</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
<div class="page-main">
	<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<div class="content-main">
		<h2>내가 쓴 글</h2>
		<c:if test="${count == 0}">
		<div class="result-display">
			표시할 게시물이 없습니다.
		</div>
		</c:if>
		<c:if test="${count > 0}">
		<table>
		<h4>all_board</h4>
			<tr>
				<th>글번호</th>
				<th>제목</th>
				<th>내용</th>
				<th>작성일</th>
			</tr>
			<c:forEach var="board" items="${list}">
			<tr>
			<%--글 누르면 상세페이지 이동하는 <a> 추가해야함 --%>
				<td>${board.board_num}</td>
				<td><a href="${pageContext.request.contextPath}/board/detail.do?board_num=${board.board_num}">${board.board_title}</a></td>
				<td>${board.board_content}</td>
				<td>${board.board_reg_date}</td>
			</tr>
			</c:forEach>
		</table>
		<h4>책방</h4>
		<table>
			<tr>
				<th>책제목</th>
				<th>글쓴이</th>
				<th>가격</th>
				<th>작성일</th>
			</tr>
			<c:forEach var="second" items="${list2}">
			<tr>
				<td>${second.secondhand_name}</td>
				<td>${second.secondhand_writer}</td>
				<td>${second.secondhand_price}</td>
				<td>${second.secondhand_reg_date}</td>
			</tr>
			</c:forEach>
		</table>
		<h4>강의평</h4>
		<table>
			<tr>
				<th>강의명</th>
				<th>작성일</th>
			</tr>
			<c:forEach var="course" items="${list3}">
			<tr>
			 <td>${course.course_name}</td>
			 <td>${courseeva.eva_reg_date}</td> 
			</tr>
			</c:forEach>
		</table>
		<div class="align-center">${page}</div>
		</c:if>
	</div>
	
	</div>
</body>
</html>
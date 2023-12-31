<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>자유게시판 상세 - 올캠퍼스</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jiwonstyle.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board.fav.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board.reply.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/board.scrap.js"></script>
<script type="text/javascript">
$(function(){
	$('#board_complaint_link').click(function(){
		let choice = confirm('신고하시겠습니까?');
		if(choice){
			$.ajax({
				url:'addComplaintCount.do',
				type:'post',
				data:{board_num: ${board.board_num}},
				dataType:'json',
				success:function(param){
					if(param.status == 'success'){
						alert("신고 완료되었습니다.");
						location.href='detail.do?board_num=${board.board_num}';
					}else if(param.status == 'duplicated'){
						alert('이미 신고 처리된 게시글입니다.');
						location.href='detail.do?board_num=${board.board_num}';
					}else if(param.status == 'noLogin'){
						alert('로그인 후 이용 가능합니다.');
						location.href='${pageContext.request.contextPath}/member/loginForm.do';
					}else if(param.status == 'noCertify'){
						alert('학교 인증을 마친 학생들만 이용할 수 있어요!');
					}else{
						alert("신고 처리 오류 발생");
					}
				},
				error:function(){
					alert('이미 신고되어 숨겨진 게시물입니다.');
				}
			});	
		}
	});
});
</script>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<div class="page-main">
	<h2 class="board-title">자유게시판</h2>
	<hr width="10%" class="board-underline">
	<div class="board-content">
		<div class="board_detail_form">
			<div class="board-detail">
				<div class="image-section">
					<c:if test="${!empty board.mem_photo}">
						<img src="${pageContext.request.contextPath}/upload/${board.mem_photo}" width="40" height="40" class="my-photo">
					</c:if>
					<c:if test="${empty board.mem_photo}">
						<img src="${pageContext.request.contextPath}/images/face.png" width="40" height="40" class="my-photo">
					</c:if>
				</div>
				<div class="detail-info">
					<div class="info-line">
					<!-- 익명 여부  1: 익명X   2: 익명 -->
					<c:if test="${board.board_anonymous ==1}">${board.mem_nick}</c:if>
					<c:if test="${board.board_anonymous ==2}">익명</c:if>
					</div>
					<div class="info-line">	
						<span>${board.board_reg_date}</span>
						<span class="labels">조회:</span>
            			<span style="padding-top:3px;">${board.board_hit}</span>
					</div>
				</div>
		
				<!-- 글 게시자가 아니면 신고버튼, 글 게시자는 수정,삭제 버튼이 보이게 만들기   -->
				<ul class="detail-actions">
					<li>
						<c:if test="${user_num != board.mem_num}">
						<a href="#" id="board_complaint_link">신고</a>
						</c:if>
						<%-- 로그인한 회원번호와 작성자 회원번호가 일치해야 수정,삭제 가능 --%>
						<c:if test="${user_num == board.mem_num}">
						<a href="updateForm.do?board_num=${board.board_num}">수정</a>
						|
						<a href="#" id="delete_link_${board.board_num}" onclick="confirmDelete(${board.board_num})">삭제</a>
						<script>
					 		function confirmDelete(boardNum) {
					       		let choice = confirm('삭제하시겠습니까?');
				  	      		if (choice) {
				    	        	location.href = 'delete.do?board_num=' + boardNum;
				  	      		}
					    	}
						</script>
						</c:if>
					</li>
				</ul>
				<h2>${board.board_title}</h2>
				<p>
					${board.board_content} 
				</p>
		
				<c:if test="${!empty board.board_filename}">
				<div>
					<img src="${pageContext.request.contextPath}/upload/${board.board_filename}" class="detail-img" width="300">
				</div>
				</c:if>
				<div class="favstar-img">
					<img src="${pageContext.request.contextPath}/images/redfav.png" width="17">
					<span id="output_board_fcount"></span>
			
					<img src="${pageContext.request.contextPath}/images/star_icon2.png" width="18">
					<span id="output_board_scrapcount"></span>
				</div>
				<div class="likeimage">
					<input type="button" value="공감" id="output_board_fav" class="board-btn" data-num="${board.board_num}">
					<input type="button" value="스크랩" id="output_board_scrap" class="board-btn" data-num="${board.board_num}">
				</div>
			</div>
			<!-- 댓글 목록 출력 시작 -->
			<div id="output"></div>
			<div class="paging-button" style="display:none;">
				<input type="button" value="다음글 보기" class="next-btn">
			</div>
			<div id="loading" style="display:none;">
				<img src="${pageContext.request.contextPath}/images/loading.gif" width="50" height="50">
			</div>
			<!-- 댓글 목록 출력 끝 -->
			<br>
			<!-- 댓글 시작 -->
			<div id="reply_div">
				<span class="re-title">댓글 달기</span>
				<form id="re_form">
					<input type="hidden" name="board_num" value="${board.board_num}" id="board_num">
				
					<!-- 로그인하면 활성화, 로그인 안하면 비활성화하게(disabled) -->
					<textarea rows="3" cols="111" name="re_content" id="re_content" class="rep-content" 
					<c:if test="${empty user_num}">disabled="disabled"</c:if>><c:if test="${empty user_num}">로그인해야 작성할 수 있습니다.</c:if></textarea>
				
					<!--로그인 해야 보여지게  -->
					<c:if test="${!empty user_num}">
					<div id="re_first">
						<span class="letter-count">300/300</span>
					
						<!-- 익명처리 -->
						<ul>
							<li>
     		               		<input type="checkbox" name="re_anonymous" id="re_anonymous" value="1">익명
      	             		</li>
      	              </ul>
					</div>
					<div id="re_second">
						<input type="submit" value="전송" class="subm-btn">
					</div>
					</c:if>
				</form>
			</div>
			<!-- 댓글 끝 -->
		</div>
	</div>
</div>
</body>
</html>






package kr.board.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.board.dao.BoardDAO;
import kr.board.vo.BoardReplyVO;
import kr.controller.Action;

public class UpdateReplyAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//전송된 데이터 인코딩 처리 
		request.setCharacterEncoding("utf-8");
		//댓글 번호
		int re_num = Integer.parseInt(request.getParameter("re_num"));
		
		BoardDAO dao = BoardDAO.getInstance();
		BoardReplyVO db_reply = dao.getReplyBoard(re_num);//한건의 데이터 입력 받음
		
		//로그인 되었는지 확인
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		
		//Map에 담아야함
		Map<String,String> mapAjax = new HashMap<String,String>();
		if(user_num == null) {//로그인이 되지 않은 경우
			mapAjax.put("result", "logout");
		}else if(user_num != null && user_num == db_reply.getMem_num()) {
			//로그인이 되어있고 로그인한 회원번호와 작성자 회원번호 일치
			//자바빈(VO) 생성
			BoardReplyVO reply = new BoardReplyVO();
			//자바빈에 필요한 데이터 담아주기 
			reply.setRe_num(re_num);
			reply.setRe_content(request.getParameter("re_content"));
			reply.setRe_ip(request.getRemoteAddr());
			
			dao.updateReplyBoard(reply);
			
			mapAjax.put("result", "success");
		}else {//로그인한 회원번호와 작성자 회원번호 불일치
			mapAjax.put("result", "wrongAccess");
		}
		//JSON 문자열 변환
		ObjectMapper mapper = new ObjectMapper();
		String ajaxData = mapper.writeValueAsString(mapAjax);
		
		request.setAttribute("ajaxData", ajaxData);
		
		return "/WEB-INF/views/common/ajax_view.jsp";
	}
}

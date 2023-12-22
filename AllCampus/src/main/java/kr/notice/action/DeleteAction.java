package kr.notice.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.controller.Action;
import kr.notice.dao.NoticeDAO;
import kr.notice.vo.NoticeVO;


public class DeleteAction implements Action{
    
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		if(user_num == null) {//로그인이 되지 않은 경우
			return "redirect:/member/loginForm.do";
		}
		
		Integer user_auth = (Integer)session.getAttribute("user_auth");
		if(user_auth != 9) {//관리자로 로그인하지 않은 경우
			return "/WEB-INF/views/common/notice.jsp";
		}
		
		//관리자로 로그인한 경우
		int notice_num = Integer.parseInt(request.getParameter("notice_num"));
		
		NoticeDAO dao = NoticeDAO.getinstance();
		NoticeVO db_item = dao.getNotice(notice_num);
		
		//상품 삭제
		dao.deleteNotice(notice_num);
		
		return "/WEB-INF/views/notice/delete.jsp";
	}

}

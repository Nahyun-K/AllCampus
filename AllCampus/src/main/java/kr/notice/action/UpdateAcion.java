package kr.notice.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.controller.Action;
import kr.notice.dao.NoticeDAO;
import kr.notice.vo.NoticeVO;

public class UpdateAcion implements Action{
 
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		if(user_num==null) {//로그인이 되지 않은 경우
			return "redirect:/member/loginForm.do";
	}
	//로그인 된 경우
	NoticeVO notice = new NoticeVO();
	notice.setNotice_title(request.getParameter("notice_title"));
	notice.setNotice_content(request.getParameter("notice_content"));
	
	NoticeDAO dao = NoticeDAO.getinstance();
	dao.updateNotice(notice);
	
	
	//JSP 경로 반환
	return "/WEB-INF/views/notice/detail.jsp";
		
  }
}

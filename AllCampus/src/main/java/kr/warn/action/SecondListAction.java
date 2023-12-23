package kr.warn.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.controller.Action;
import kr.courseeva.vo.CourseEvaVO;
import kr.secondhand.vo.SecondhandVO;
import kr.util.PageUtil;
import kr.warn.dao.WarnDAO;

//중고거래 신고 목록
public class SecondListAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String pageNum = request.getParameter("pageNum"); //처음에는 페이지가 null이니까 1로 간주하게 됨
		if(pageNum == null) pageNum = "1";
		
		WarnDAO dao = WarnDAO.getInstance();
		int count = dao.getSecondWarnCount();
		    
		//페이지 처리
		PageUtil page = new PageUtil(Integer.parseInt(pageNum),count,20,10,"list.do");
		List<SecondhandVO> list = null;
		if(count > 0 ) {
		list = dao.getListSecond(page.getStartRow(), page.getEndRow());
		}
		request.setAttribute("count", count);
		request.setAttribute("list", list);
		request.setAttribute("page", page.getPage());
		
		//JSP 경로 반환
		return "/WEB-INF/views/warn/secondlist.jsp";
	}

}

package kr.courseeva.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.controller.Action;
import kr.course.vo.CourseVO;
import kr.courseeva.dao.CourseEvaDAO;

public class EvaWriteFormAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(); 
		Integer user_num =(Integer)session.getAttribute("user_num"); 
		if(user_num == null) {//로그인이 되지 않은경우 
			return "redirect:/member/loginForm.do"; 
		}
		
		//로그인이 된 경우
		return "/WEB-INF/views/courseeva/EvawriteForm.jsp";
	}
}

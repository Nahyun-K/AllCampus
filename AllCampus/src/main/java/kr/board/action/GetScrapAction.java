package kr.board.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.board.dao.BoardDAO;
import kr.board.vo.BoardScrapVO;
import kr.controller.Action;

public class GetScrapAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//전송된 데이터 인코딩 처리
		request.setCharacterEncoding("utf-8");
		//전송된 데이터 반환
		int board_num = Integer.parseInt(request.getParameter("board_num"));  
		
		//하나는 String, 다른거는 Int타입이어서 Object를 사용해야한다.
		Map<String,Object> mapAjax =  new HashMap<String,Object>();
		
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		
		BoardDAO dao = BoardDAO.getInstance();
		
		if(user_num == null) {//로그인이 되지 않은 경우
			mapAjax.put("status", "noScrap"); //String 타입
		
		}else {//로그인 된 경우							//생성자 사용
			BoardScrapVO boardScrap = dao.selectScrap(new BoardScrapVO(board_num,user_num));
			
			if(boardScrap!=null) {//좋아요 표시
				mapAjax.put("status", "yesScrap");
			}else {//좋아요 미표시
				mapAjax.put("status", "noScrap");
			}
		}
		
		mapAjax.put("count", dao.selectScrapCount(board_num)); //int 타입 저장됨
		//그래서 통합적으로 사용하려면 Object를 사용할 수 밖에 없다
		
		//JSON 문자열 생성
		ObjectMapper mapper = new ObjectMapper();
		String ajaxData = mapper.writeValueAsString(mapAjax);
		
		request.setAttribute("ajaxData", ajaxData);
		
		return "/WEB-INF/views/common/ajax_view.jsp";
	}
}

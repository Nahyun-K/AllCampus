package kr.timetable.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.controller.Action;
import kr.timetable.dao.TimetableDAO;
import kr.timetable.vo.TimetableVO;

public class TimetableAddAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		if(user_num == null) {
			return "redirect:/member/loginForm.do";
		}
		
		// 전송된 데이터 인코딩 처리
		request.setCharacterEncoding("utf-8");
		
		// ajax에서 전송된 data 변환 
		String course_code = request.getParameter("course_code"); 
		String timetable_table_id = request.getParameter("timetable_table_id"); 
		Map<String, Object> mapAjax = new HashMap<String, Object>();
		
		TimetableDAO daoTime = TimetableDAO.getInstance();
		
		//가진 정보 : user_num(=mem_num), course_code, listClick(시간표 정보)

		// 색상코드
		String[] colorCode = {
				"#f2e8e8","#dcf2e9","#ffe9e9","#dee8f6","#fff8cc",
				"#ffedda","#f2e8e8","#dceef2","#eff9cc", "#d1b4bb"
		};
		int idx = (int)((Math.random()*10000)%(colorCode.length-1));
		
		
		
		//--------------------------------------------------
		List<String> semesterList = daoTime.selectYearAndSemester(course_code);
		int year = Integer.parseInt(semesterList.get(0));
		int semester = Integer.parseInt(semesterList.get(1));
		//--------------------------------------------------
		
        
        // timetable.add.js에서 받아온 해당 강의 table id 리스트(문자열)을 리스트로 변환
		timetable_table_id = timetable_table_id.replaceAll("[^0-9,_]", "");
		String[] timetable_tableId = timetable_table_id.split(",");
		
		for(int i=0; i<timetable_tableId.length; i++) { 
			daoTime.insertTimetable(user_num, course_code, timetable_tableId[i]);
			daoTime.updateColor(user_num, course_code, colorCode[idx]);
		}

		
		
		
		//------------------------------------------------------------------
		
		// 요일 필터링 - 요일/mem_num/year/semester
		List<TimetableVO> monList = daoTime.getListPrint(user_num,year,semester,1); // 월
		List<TimetableVO> tueList = daoTime.getListPrint(user_num,year,semester,2); // 화
		List<TimetableVO> wedList = daoTime.getListPrint(user_num,year,semester,3); // 수
		List<TimetableVO> thurList = daoTime.getListPrint(user_num,year,semester,4); // 목
		List<TimetableVO> friList = daoTime.getListPrint(user_num,year,semester,5); // 금
		mapAjax.put("monList", monList); 
		mapAjax.put("tueList", tueList); 
		mapAjax.put("wedList", wedList); 
		mapAjax.put("thurList", thurList); 
		mapAjax.put("friList", friList); 
		
		
		List<TimetableVO> listMON = daoTime.getListCourseCode(user_num, year, semester, 1);
		List<TimetableVO> listTUE = daoTime.getListCourseCode(user_num, year, semester, 2);
		List<TimetableVO> listWED = daoTime.getListCourseCode(user_num, year, semester, 3);
		List<TimetableVO> listTHUR = daoTime.getListCourseCode(user_num, year, semester, 4);
		List<TimetableVO> listFRI = daoTime.getListCourseCode(user_num, year, semester, 5);
		mapAjax.put("listMON", listMON);
		mapAjax.put("listTUE", listTUE);
		mapAjax.put("listWED", listWED);
		mapAjax.put("listTHUR", listTHUR);
		mapAjax.put("listFRI", listFRI);
		//------------------------------------------------------------------
		
		
		//JSON 문자열 생성
		ObjectMapper mapper = new ObjectMapper();
		String ajaxData = mapper.writeValueAsString(mapAjax);

		request.setAttribute("ajaxData", ajaxData);
		
		return "/WEB-INF/views/common/ajax_view.jsp";
	}
	
    private static String convertBytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte temp : bytes) {
            result.append(String.format("%02x", temp));
        }
        return result.toString();
    }

}

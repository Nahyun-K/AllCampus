package kr.calculator.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.calculator.dao.CalculatorDAO;
import kr.calculator.vo.CalSemesterVO;
import kr.calculator.vo.CalTotalVO;
import kr.controller.Action;

public class CalculateAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String,Object> mapAjax = new HashMap<String,Object>();
		HttpSession session = request.getSession();
		Integer user_num = (Integer)session.getAttribute("user_num");
		
		
		double tcount = 0;
		int cal_acq = 0;
		int cal_finclude_acq = 0;
		int cal_majorf_acq = 0;
		double cal_avgscore = 0;	
		double tmajor = 0;
		double major_acq = 0;
		double cal_majorscore = 0;
		
		CalculatorDAO dao = CalculatorDAO.getInstance();
		if(user_num == null) {//로그인이 되지 않은 경우
			mapAjax.put("result", "logout");
		}else {
			String cal_semester = request.getParameter("cal_semester");
			//한 학기 학점 계산
			for (int i = 0; i < 7; i++) {
		        String cal_course_name = request.getParameter("course_name_" + i);
				String creditParam = request.getParameter("timetable_credit_" + i);
			    String gradeParam = request.getParameter("cal_grade_" + i);
			    String majorParam = request.getParameter("cal_major_" + i);
			    //System.out.println("majorParam : " + majorParam);
			    if(majorParam == null) break;
	            
			    if (creditParam != null && gradeParam != null && majorParam != null) {
			            
		    		int cal_credit = Integer.parseInt(creditParam);
		    		double cal_grade = Double.parseDouble(gradeParam);
		    		int cal_major = Integer.parseInt(majorParam);
		    		
		    		//cal_grade = 0.1은 P
		    		dao.insertCalculator(user_num, cal_semester, cal_course_name, cal_credit, cal_grade, cal_major);
		    		if(cal_grade !=0 && cal_grade != 0.1 && cal_grade != 0.2) { //F,NP ,P는 제외하고 처리
		    			double count = cal_credit * cal_grade ; //강의 학점 * 받은 성적   (ex) 3 * 4.0 
				        tcount = tcount+ count;					//누적
		    		}
		    		 		//F				//NP
			        if(cal_grade != 0 && cal_grade != 0.2 ) { //P는 학점 취득이 되어야한다
			        	cal_acq = cal_acq + cal_credit;			//수강한 총 강의 학점  취득
			        }
			        		//P					//NP	
			        if(cal_grade != 0.1 && cal_grade != 0.2) {//P,NP만 제외한 credit 더하기
			        	cal_finclude_acq = cal_finclude_acq + cal_credit;  //F포함 강의 학점
			        }
			        //F학점인 cal_credit값도 포함해서 나눠야 한다 
			        
			        //tcount / finclude_acq 하면 평점 나온다
			        cal_avgscore = tcount / (double)cal_finclude_acq;		//평점
			        
			        //전공일 때 학점 계산 
			        if(cal_major == 2) {
			        	int majorTimetableCredit = Integer.parseInt(request.getParameter("timetable_credit_" + i));//전공인 강의 학점
			        	double majorCalGrade = Double.parseDouble(request.getParameter("cal_grade_" + i));	//전공일때 받은 성적
			            //				F					P					NP
			        	if(majorCalGrade !=0 && majorCalGrade != 0.1 && majorCalGrade != 0.2) {
			        		double majorcount = majorTimetableCredit * majorCalGrade; // 전공 : 강의 학점 * 받은 성적 
				            tmajor = tmajor+majorcount;		//누적
			        	}
			        	
			            if(majorCalGrade != 0 && majorCalGrade != 0.2) {//P는 학점 취득이 되어야한다
			            	 major_acq = major_acq + majorTimetableCredit;   //전공 수강한 총 강의 학점  (전공 취득)
			            }
			            if(majorCalGrade != 0.1 && majorCalGrade != 0.2) {
			            	cal_majorf_acq = cal_majorf_acq + majorTimetableCredit;//F포함 강의 학점
			            }
			            if(cal_majorf_acq > 0) {
			            	cal_majorscore = tmajor / cal_majorf_acq; //전공 평점
			            }else {
			            	//tmajor/major_acq 하면 cal_majorscore 나온다.
				            cal_majorscore = 0; //전공 평점
			            }
			            
			        }
			    }//end of if
		    }//end of for
			//테이블에 정보 저장
			
			//all_calculator_semester에 학기마다 점수 구한거 넣어줌
			//System.out.println(cal_semester+","+cal_avgscore+","+cal_majorscore+","+cal_acq+","+cal_finclude_acq+","+cal_majorf_acq);
			dao.calculateScore(cal_semester,cal_avgscore,cal_majorscore,cal_acq,cal_finclude_acq,cal_majorf_acq,user_num);
			
			//모든 학기의 cal_avgscore  * finclude_acq  합한 값 
			double favgscore = dao.selectfAvgscore(user_num);  //cal_avgscore * cal_majorf_acq
			
			//모든 학기의 cal_majorscore  * majorf_acq  합한 값
			double fmajorscore = dao.selectfMajorscore(user_num);//cal_majorscore * cal_finclude_acq
			int acqscore = dao.selectAcqscore(user_num);
			
			int sumfinclude_acq = dao.sumFinclude(user_num);	// cal_finclude_acq 합
			int summajorf_acq = dao.sumMajorf(user_num);		//cal_majorf_acq 합
			
			double cal_total_avgscore = favgscore/(double)sumfinclude_acq;
			//System.out.println(fmajorscore+","+summajorf_acq);
			double cal_total_majorscore;
			if(summajorf_acq>0) {
				cal_total_majorscore = fmajorscore/(double)summajorf_acq;
			}else {
				cal_total_majorscore = 0;
			}
			
			int cal_total_acq = acqscore;
			
			//System.out.println(cal_total_avgscore+","+cal_total_majorscore+","+cal_total_acq);
			
			dao.totalScore(user_num, cal_total_avgscore, cal_total_majorscore, cal_total_acq);
			
			CalSemesterVO semesterscore=dao.getSemesterScore(cal_semester,user_num);
			CalTotalVO totalscore = dao.totalScore(user_num);
			mapAjax.put("totalscore", totalscore); 
			mapAjax.put("semesterscore", semesterscore);
			mapAjax.put("result", "success");
		}//end of else
		
		//결과 JSON 문자열 생성
		ObjectMapper mapper = new ObjectMapper();
		String ajaxData = mapper.writeValueAsString(mapAjax);
		
		request.setAttribute("ajaxData", ajaxData);
		
		return "/WEB-INF/views/common/ajax_view.jsp";
	}
}

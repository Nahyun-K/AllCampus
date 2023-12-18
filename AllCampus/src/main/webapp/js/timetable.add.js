$(function() {
	var name = $('#courseDBtable tr');

	var standard_time = [];
	for (var i = 9; i < 18; i++) {
		for (var j = 0; j < 2; j++) {
			standard_time.push(i * 60 + j * 30);
		}
	}

	// 강의 click 시 클릭한 강의의 course_code를 addTime에 넘겨줌(오로지 넘겨주는 역할만 하는 ajax, action)
	for (let i = 0; i < name.length; i++) {
		// click 이벤트 실행
		$(name[i]).on('click', (e) => {
			console.log('click');
			
			$(name[i]).css({ "color": "green" });
			console.log($(name[i]).prop("id"));
			course_code = $(name[i]).prop("id");
			$.ajax({
				url: 'timetableAddList.do', // 전송 url (전송하고 데이터 받기 위한 action 페이지 dao XX)
				type: 'post',
				data: { course_code: $(name[i]).prop("id") },
				dataType: 'json',
				success: function(param) {
					
					addTime(param, course_code); // 받은 course_code를 넘겨줌 -> 다른 url에 넘길 것
					
					//getTimetablePrint(param);
					
				},
				error: function() {
					alert('네트워크 오류 발생');
				}
			});
		});
		
	}
	
	
	// 위에서 강의를 click해서 받아온 course_code를 이용해서 timetable 조작하기 -> timetableAdd에 전송하기
	function addTime(param, course_code) {
		$(param.listClick).each(function(index, item) {
			var startList = item.course_start_time.split(':');
			var startTime = Number(startList[0]) * 60 + Number(startList[1]);
			var endList = item.course_end_time.split(':');
			var endTime = Number(endList[0]) * 60 + Number(endList[1]);

			var timetable_table_id = [];
			for (var i = 0; i < standard_time.length; i++) {
				if (standard_time[i] >= startTime && standard_time[i] < endTime) {
					//console.log("id :  " + item.course_day + "_" + standard_time[i]);
					var timetable_tableID = item.course_day + "_" + standard_time[i];
					timetable_table_id.push(timetable_tableID);
					
					$("#" + item.course_day + "_" + standard_time[i]).css({ "color": "red" });
					//지울것
				}
			}
			$.ajax({
				url: 'timetableAdd.do',
				type: 'post',
				data: {course_code: course_code, timetable_table_id: JSON.stringify(timetable_table_id)},// 보내려는 데이터를 문자열로 변환해서 보내기
				dataType: 'json',
				success: function(param) {
					console.log('성공');
					getTimetablePrint(param);
				},
				error: function() {
					alert('네트워크 오류 발생');
				}
			});

		});

	}
	//==================timetablePrint 시작=====================
	function getTimetablePrint(){
		$.ajax({
			url: 'timetablePrint.do', // 전송 url : TimetablePrintAction
			type: 'post',
			data: {  }, // year, semester 전송하기
			dataType: 'json',
			success: function(param) {
				printMonTimetable(param);
				printTueTimetable(param);	
				printWedTimetable(param);
				printThurTimetable(param);
				printFriTimetable(param);
			},
			error: function() {
				alert('네트워크 오류 발생');
			}
		});
	}
	getTimetablePrint();
	
	// --------월요일---------
	function printMonTimetable(param){
		for(var i=0; i<param.listMON.length; i++){
			var array = [];
			for(var j=0; j<param.monList.length; j++){
				if(param.listMON[i].course_code == param.monList[j].course_code){
					array.push(Number(param.monList[j].timetable_table_id.slice(2)));
				}
				if(j == param.monList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0]
					var cnt = 1;
					var list = [];
					list.push([array[0],cnt]);
					for(var k=1; k<array.length; k++){
						if(array[k] == prev + 30){
							cnt += 1;
							prev = array[k];
						}else {
							prev = array[k];
							cnt = 1;
						}
						list.push([array[k],cnt]);
					}
					
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#1_'+stand1).attr('rowspan', stand2);
							$('#1_'+stand1).attr('style','background-color: #4D377B');
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#1_'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#1_'+stand1).attr('rowspan', stand2);
					$('#1_'+stand1).attr('style','background-color: #4D377B;');
				}
			}
		}
	}
	
	// --------화요일---------
	function printTueTimetable(param){
		
		for(var i=0; i<param.listTUE.length; i++){
			var array = [];
			for(var j=0; j<param.tueList.length; j++){
				if(param.listTUE[i].course_code == param.tueList[j].course_code){
					array.push(Number(param.tueList[j].timetable_table_id.slice(2)));
				}
				if(j == param.tueList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0]
					var cnt = 1;
					var list = [];
					list.push([array[0],cnt]);
					for(var k=1; k<array.length; k++){
						if(array[k] == prev + 30){
							cnt += 1;
							prev = array[k];
						}else {
							prev = array[k];
							cnt = 1;
						}
						list.push([array[k],cnt]);
					}
					
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#2_'+stand1).attr('rowspan', stand2);
							$('#2_'+stand1).attr('style','background-color: #FFD400;');
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#2_'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#2_'+stand1).attr('rowspan', stand2);
					$('#2_'+stand1).attr('style','background-color: #FFD400;');
				}
			}
		}
	}
	
	// --------수요일---------
	function printWedTimetable(param){
		for(var i=0; i<param.listWED.length; i++){
			var array = [];
			for(var j=0; j<param.wedList.length; j++){
				if(param.listWED[i].course_code == param.wedList[j].course_code){
					array.push(Number(param.wedList[j].timetable_table_id.slice(2)));
				}
				if(j == param.wedList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0]
					var cnt = 1;
					var list = [];
					list.push([array[0],cnt]);
					for(var k=1; k<array.length; k++){
						if(array[k] == prev + 30){
							cnt += 1;
							prev = array[k];
						}else {
							prev = array[k];
							cnt = 1;
						}
						list.push([array[k],cnt]);
					}
					
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#3_'+stand1).attr('rowspan', stand2);
							$('#3_'+stand1).attr('style','background-color: #008000');
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#3_'+list[s][0]).attr('style', "display:none;");
						}
							
					}
					$('#3_'+stand1).attr('rowspan', stand2);
					$('#3_'+stand1).attr('style','background-color: #008000;');
				}
			}
		}
	}
	
	// --------목요일---------
	function printThurTimetable(param){
		for(var i=0; i<param.listTHUR.length; i++){
			var array = [];
			for(var j=0; j<param.thurList.length; j++){
				if(param.listTHUR[i].course_code == param.thurList[j].course_code){
					array.push(Number(param.thurList[j].timetable_table_id.slice(2)));
				}
				if(j == param.thurList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0]
					var cnt = 1;
					var list = [];
					list.push([array[0],cnt]);
					for(var k=1; k<array.length; k++){
						if(array[k] == prev + 30){
							cnt += 1;
							prev = array[k];
						}else {
							prev = array[k];
							cnt = 1;
						}
						list.push([array[k],cnt]);
					}

					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#4_'+stand1).attr('rowspan', stand2);
							$('#4_'+stand1).attr('style','background-color: #FF7F00');
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#4_'+list[s][0]).attr('style', "display:none;");
						}
							
					}
					$('#4_'+stand1).attr('rowspan', stand2);
					$('#4_'+stand1).attr('style','background-color: #FF7F00;');
				}
			}
		}
	}
	
	// --------금요일---------
	function printFriTimetable(param){
		for(var i=0; i<param.listFRI.length; i++){
			var array = [];
			for(var j=0; j<param.friList.length; j++){
				if(param.listFRI[i].course_code == param.friList[j].course_code){
					array.push(Number(param.friList[j].timetable_table_id.slice(2)));
				}
				if(j == param.friList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0]
					var cnt = 1;
					var list = [];
					list.push([array[0],cnt]);
					for(var k=1; k<array.length; k++){
						if(array[k] == prev + 30){
							cnt += 1;
							prev = array[k];
						}else {
							prev = array[k];
							cnt = 1;
						}
						list.push([array[k],cnt]);
					}
					
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#5_'+stand1).attr('rowspan', stand2);
							$('#5_'+stand1).attr('style','background-color: #FFC0CB');
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#5_'+list[s][0]).attr('style', "display:none;");
						}
							
					}
					$('#5_'+stand1).attr('rowspan', stand2);
					$('#5_'+stand1).attr('style','background-color: #FFC0CB;');
				}
			}
		}
	}
	//================timetablePrint 끝==================

});
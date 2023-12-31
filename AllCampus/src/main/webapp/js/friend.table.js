$(function() {
	
	var standard_time = []; // 시간 나눠놓은 기준
	for (var i = 9; i < 18; i++) {
		for (var j = 0; j < 2; j++) {
			standard_time.push(i * 60 + j * 30);
		}
	}

	var text = "...";//말 줄임표
	
	function initTable(){
		let timeList = [9,10,11,12,13,14,15,16,17];
		let timeKor = ['오전 9시','오전 10시','오전 11시','오후 12시','오후 1시','오후 2시',
		'오후 3시','오후 4시','오후 5시'];
			$('#timetable > tbody').empty();
			for(let i=0;i<timeList.length;i++){
				let output = '<tr>';
				output += '<td rowspan="2">' + timeKor[i] + '</td>';
				output += '<td id="1__'+ timeList[i]*60 + '"></td>';
				output += '<td id="2__'+ timeList[i]*60 + '"></td>';
				output += '<td id="3__'+ timeList[i]*60 + '"></td>';
				output += '<td id="4__'+ timeList[i]*60 + '"></td>';
				output += '<td id="5__'+ timeList[i]*60 + '"></td>';
				output += '</tr>';
				output += '<tr>';
				output += '<td id="1__'+ (timeList[i]*60+30) + '"></td>';
				output += '<td id="2__'+ (timeList[i]*60+30) + '"></td>';
				output += '<td id="3__'+ (timeList[i]*60+30) + '"></td>';
				output += '<td id="4__'+ (timeList[i]*60+30) + '"></td>';
				output += '<td id="5__'+ (timeList[i]*60+30) + '"></td>';
				output += '</tr>';
				
				$('#timetable > tbody').append(output)
			}
	}
					
	$('.friend_val').click(function(){
		$.ajax({ 
				url: 'friendTimetableList.do', // 전송 url (전송하고 데이터 받기 위한 action 페이지 dao XX)
				type: 'post',
				data: { friend_num : $(this).attr('id') },
				dataType: 'json',
				success: function(param) { 
					initTable();
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
	})
	
	//=============================================================================================================================================
	
	// 호출하지 않는 코드 - 실행은 되나 강의명, 색이 반영되지 않음
	// --------월요일---------
	function printMonTimetable2(param){
		for(var i=0; i<param.listMON.length; i++){
			var array = [];
			for(var j=0; j<param.monList.length; j++){
				if(param.listMON[i].course_code == param.monList[j].course_code){
					array.push(Number(param.monList[j].timetable_table_id.slice(2)));
				}
				if(j == param.monList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0];
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
						console.log("여기");
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#1__'+stand1).attr('rowspan', stand2);
							$('#1__'+stand1).addClass('class-info');
							$('#1__'+stand1).html(param.monList[j].timetable_course_name);
							$('#1__'+stand1).attr('style','background-color: ' + +param.monList[j].timetable_color);
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#1__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#1__'+stand1).attr('rowspan', stand2);
					$('#1__'+stand1).addClass('class-info');
					$('#1__' + stand1).html(param.monList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#1__'+stand1).attr('style','background-color: '+param.monList[j].timetable_color); // db에서 색깔지정
				}
			}
		}
	}
	
	
	
	// --------화요일---------
	function printTueTimetable2(param){
		
		for(var i=0; i<param.listTUE.length; i++){
			var array = [];
			for(var j=0; j<param.tueList.length; j++){
				if(param.listTUE[i].course_code == param.tueList[j].course_code){
					array.push(Number(param.tueList[j].timetable_table_id.slice(2)));
				}
				if(j == param.tueList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0];
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
							$('#2__'+stand1).attr('rowspan', stand2);
							$('#2__'+stand1).addClass('class-info'); // 클래스 name 부여
							$('#2__'+stand1).html(param.tueList[j].timetable_course_name);
							$('#2__'+stand1).attr('style','background-color: '+param.tueList[j].timetable_color);
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#2__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#2__'+stand1).attr('rowspan', stand2);
					$('#2__'+stand1).addClass('class-info');
					$('#2__'+stand1).html(param.tueList[j].timetable_course_name);
					$('#2__'+stand1).attr('style','background-color: '+param.tueList[j].timetable_color);
				}
			}
		}
	}
	
	// --------수요일---------
	function printWedTimetable2(param){
		for(var i=0; i<param.listWED.length; i++){
			var array = [];
			for(var j=0; j<param.wedList.length; j++){
				if(param.listWED[i].course_code == param.wedList[j].course_code){
					array.push(Number(param.wedList[j].timetable_table_id.slice(2)));
				}
				if(j == param.wedList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0];
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
							$('#3__'+stand1).attr('rowspan', stand2);
							$('#3__'+stand1).addClass('class-info');
							$('#3__'+stand1).html(param.wedList[j].timetable_course_name);
							$('#3__'+stand1).attr('style','background-color: '+param.wedList[j].timetable_color);
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#3_'+list[s][0]).attr('style', "display:none;");
						}
							
					}
					$('#3__'+stand1).attr('rowspan', stand2);
					$('#3__'+stand1).addClass('class-info');
					$('#3__'+stand1).html(param.wedList[j].timetable_course_name);
					$('#3__'+stand1).attr('style','background-color: '+param.wedList[j].timetable_color);
				}
			}
		}
	}
	
	// --------목요일---------
	function printThurTimetable2(param){
		for(var i=0; i<param.listTHUR.length; i++){
			var array = [];
			for(var j=0; j<param.thurList.length; j++){
				if(param.listTHUR[i].course_code == param.thurList[j].course_code){
					array.push(Number(param.thurList[j].timetable_table_id.slice(2)));
				}
				if(j == param.thurList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0];
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
							$('#4__'+stand1).attr('rowspan', stand2);
							$('#4__'+stand1).addClass('class-info');
							$('#4__'+stand1).html(param.thurList[j].timetable_course_name);
							$('#4__'+stand1).attr('style','background-color: '+param.thurList[j].timetable_color);
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#4__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#4__'+stand1).attr('rowspan', stand2);
					$('#4__'+stand1).addClass('class-info');
					$('#4__'+stand1).html(param.thurList[j].timetable_course_name);
					$('#4__'+stand1).attr('style','background-color: '+param.thurList[j].timetable_color);
				}
			}
		}
	}
	
	// --------금요일---------
	function printFriTimetable2(param){
		for(var i=0; i<param.listFRI.length; i++){
			var array = [];
			for(var j=0; j<param.friList.length; j++){
				if(param.listFRI[i].course_code == param.friList[j].course_code){
					array.push(Number(param.friList[j].timetable_table_id.slice(2)));
				}
				if(j == param.friList.length - 1){
					array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
					var prev = array[0];
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
							$('#5__'+stand1).attr('rowspan', stand2);
							$('#5__'+stand1).addClass('class-info');
							$('#5__'+stand1).html(param.friList[j].timetable_course_name);
							$('#5__'+stand1).attr('style','background-color: '+param.friList[j].timetable_color);
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#5__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#5__'+stand1).attr('rowspan', stand2);
					$('#5__'+stand1).addClass('class-info');
					$('#5__'+stand1).html(param.friList[j].timetable_course_name);
					$('#5__'+stand1).attr('style','background-color: '+param.friList[j].timetable_color);
				}
			}
		}
	}
	
	
	//=============================================================================================================================================
	
	
	
	//================timetablePrint 시작==================================================================================
	
	// 실행 코드
	// --------월요일---------
	function printMonTimetable(param){
		for(var i=0; i<param.listMON.length; i++){
			var array = [];
			for(var j=0; j<param.monList.length; j++){
				if(param.listMON[i].course_code == param.monList[j].course_code){
					array.push(Number(param.monList[j].timetable_table_id.slice(2)));
				}
			}
			
			
			array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
			var prev = array[0];
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
			// array 다 만듦

			
			for(var j=0; j<param.monList.length; j++){
				if(param.listMON[i].course_code == param.monList[j].course_code){
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#1__'+stand1).attr('rowspan', stand2);
							$('#1__'+stand1).addClass('class-info');
							$('#1__' + stand1).html(param.monList[j].timetable_course_name); // text 크기를 넘어가면 조절
							$('#1__'+stand1).attr('style','background-color: '+param.monList[j].timetable_color); // db에서 색깔지정
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#1__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#1__'+stand1).attr('rowspan', stand2);
					$('#1__'+stand1).addClass('class-info');
					$('#1__' + stand1).html(param.monList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#1__'+stand1).attr('style','background-color: '+param.monList[j].timetable_color); // db에서 색깔지정
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
			}
			
			
			array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
			var prev = array[0];
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
			// array 다 만듦
			
			
			for(var j=0; j<param.tueList.length; j++){
				if(param.listTUE[i].course_code == param.tueList[j].course_code){
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#2__'+stand1).attr('rowspan', stand2);
							$('#2__'+stand1).addClass('class-info');
							$('#2__' + stand1).html(param.tueList[j].timetable_course_name); // text 크기를 넘어가면 조절
							$('#2__'+stand1).attr('style','background-color: '+param.tueList[j].timetable_color); // db에서 색깔지정
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#2__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#2__'+stand1).attr('rowspan', stand2);
					$('#2__'+stand1).addClass('class-info');
					$('#2__' + stand1).html(param.tueList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#2__'+stand1).attr('style','background-color: '+param.tueList[j].timetable_color); // db에서 색깔지정
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
			}
			
			
			array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
			var prev = array[0];
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
			// array 다 만듦
			
			
			for(var j=0; j<param.wedList.length; j++){
				if(param.listWED[i].course_code == param.wedList[j].course_code){
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#3__'+stand1).attr('rowspan', stand2);
							$('#3__'+stand1).addClass('class-info');
							$('#3__' + stand1).html(param.wedList[j].timetable_course_name); // text 크기를 넘어가면 조절
							$('#3__'+stand1).attr('style','background-color: '+param.wedList[j].timetable_color); // db에서 색깔지정
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#3__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#3__'+stand1).attr('rowspan', stand2);
					$('#3__'+stand1).addClass('class-info');
					$('#3__' + stand1).html(param.wedList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#3__'+stand1).attr('style','background-color: '+param.wedList[j].timetable_color); // db에서 색깔지정
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
			}
			
			
			array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
			var prev = array[0];
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
			// array 다 만듦
			
			
			for(var j=0; j<param.thurList.length; j++){
				if(param.listTHUR[i].course_code == param.thurList[j].course_code){
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#4__'+stand1).attr('rowspan', stand2);
							$('#4__'+stand1).addClass('class-info');
							$('#4__' + stand1).html(param.thurList[j].timetable_course_name); // text 크기를 넘어가면 조절
							$('#4__'+stand1).attr('style','background-color: '+param.thurList[j].timetable_color); // db에서 색깔지정
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#4__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#4__'+stand1).attr('rowspan', stand2);
					$('#4__'+stand1).addClass('class-info');
					$('#4__' + stand1).html(param.thurList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#4__'+stand1).attr('style','background-color: '+param.thurList[j].timetable_color); // db에서 색깔지정
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
			}
			
			
			array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
			var prev = array[0];
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
			// array 다 만듦
			
			
			for(var j=0; j<param.friList.length; j++){
				if(param.listFRI[i].course_code == param.friList[j].course_code){
					var stand1 = 0;
					var stand2 = 0;
					for(var s=0; s<list.length; s++){
						if(list[s][1] == 1 && stand1 == 0){ // 첫번째
							stand1 = list[s][0];
						} else if(list[s][1] == 1 && stand1 != 0){ // 두번째
							$('#5__'+stand1).attr('rowspan', stand2);
							$('#5__'+stand1).addClass('class-info');
							$('#5__' + stand1).html(param.friList[j].timetable_course_name); // text 크기를 넘어가면 조절
							$('#5__'+stand1).attr('style','background-color: '+param.friList[j].timetable_color); // db에서 색깔지정
							stand1 = list[s][0];
						} else if(list[s][1] != 1){
							stand2 = list[s][1];
							$('#5__'+list[s][0]).attr('style', "display:none;");
						}
					}
					$('#5__'+stand1).attr('rowspan', stand2);
					$('#5__'+stand1).addClass('class-info');
					$('#5__' + stand1).html(param.friList[j].timetable_course_name); // text 크기를 넘어가면 조절
					$('#5__'+stand1).attr('style','background-color: '+param.friList[j].timetable_color); // db에서 색깔지정
				}
			}
		}
	}
	
	
	//================timetablePrint 끝===================================================================================
	
	
	// --------월요일---------
	/*
	function printMonTimetable(param){
		//initTable(); // 위치 옮김 이유 : 매 요일 function마다 init을 해주면 '월'을 만들고 '화'에서 리셋 후 다시 만들어서
		for(var i=0; i<param.listMON.length; i++){
			var array = [];
			for(var j=0; j<param.monList.length; j++){
				if(param.listMON[i].course_code == param.monList[j].course_code){
					array.push(Number(param.monList[j].timetable_table_id.slice(2)));
				}
				if(param.listMON[i].course_code == param.monList[j].course_code){
					if(j == param.monList.length - 1){
						array.sort((a, b) => a - b); // js에서 정렬할 때는 문자열로 변경해서 정렬하기 때문에 이런 방식으로 정렬해야 한다
						console.log("array : " + array);
						var prev = array[0];
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
								$('#1_'+stand1).html(param.monList[j].timetable_course_name);
								$('#1_'+stand1).attr('style','background-color: ' + +param.monList[j].timetable_color);
								stand1 = list[s][0];
							} else if(list[s][1] != 1){
								stand2 = list[s][1];
								$('#1_'+list[s][0]).attr('style', "display:none;");
							}
						}
						$('#1_'+stand1).attr('rowspan', stand2);
						$('#1_'+stand1).html(param.monList[j].timetable_course_name);
						$('#1_'+stand1).attr('style','background-color: ' + +param.monList[j].timetable_color);
					}
				}
			}
		}
	}
	
	 */
	//================timetablePrint 끝==================
	
	
	
	
});
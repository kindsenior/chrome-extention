/* so-netのテレビ番組表をキーワード検索 */

//サイト名、url、エンコード情報
targets = [ {"sitename":"BS","areaId":"bs1","encode":'UTF-8'},
						{"sitename":"地上デジタル","areaId":"","encode":'UTF-8'} ];

programDaySets = [];

/* 検索条件 */
// falseに""を入れない
checkedConditionSets = [];
conditionSets = [ { "title":"日本人",
										"conditions":[
												{ "true":["松田聖子"],"false":[] },
												{ "true":["山口百恵"],"false":[] },
												{ "true":["新垣結衣"],"false":[] },
												{ "true":["堺雅人"],"false":[] },
												{ "true":["イチロー"],"false":[] }
										] },
									{ "title":"韓国人",
										"conditions":[
												{ "true":["キョン・ミリ"],"false":[] },
												{ "true":["ハン・ジミン"],"false":[] },
												{ "true":["ハン・ヒョジュ"],"false":[] },
												{ "true":["チョン・イル"],"false":[] }
										] },
									{ "title":"欧米人",
										"conditions":[
												{ "true":["マイケル・ジャクソン"],"false":[] }
										] },

									{"title":"アニメ",
									 "conditions":[
											 { "true":["ドラゴンボール"], "false":["ドラゴンボールZ","ドラゴンボールGT"] },
											 { "true":["スラムダンク"],"false":[] },
											 { "true":["SLAM","DUNK"],"false":[] },
											 { "true":["NARUTO"],"false":[] },

											 { "true":["タッチ"],"false":[] },

											 { "true":["傷物語"],"false":[] },
											 { "true":["化物語"],"false":[] },
											 { "true":["偽物語"],"false":[] },

											 { "true":["攻殻機動隊"],"false":[] },
											 { "true":["十二国記"],"false":[] },
											 { "true":["エヴァンゲリオン"],"false":[] },
											 { "true":["ヱヴァンゲリオン"],"false":[] },
											 { "true":["ソードアート・オンライン"],"false":[] },
											 /* { "true":["リトルバスターズ"],"false":[] ], */
											 { "true":["とらドラ"],"false":[] },
											 { "true":["ハチミツとクローバー"],"false":[] },
											 { "true":["瀬戸の花嫁"],"false":[] },
											 { "true":["君に届け"],"false":[] },
											 { "true":["ヒカルの碁"],"false":[] },
											 { "true":["いちご100%"],"false":[] },
											 { "true":["みなみけ"],"false":[] },
											 { "true":["中二病でも恋がしたい"],"false":[] },
											 { "true":["ジョジョの奇妙な冒険"],"false":[] },
											 { "true":["琴浦さん"],"false":[] },
											 { "true":["D.C."],"false":[] },
											 { "true":["涼宮ハルヒ"],"false":[] },
											 { "true":["未来少年コナン"],"false":[] }
									 ] },

									{"title":"世界名作劇場",
									 "conditions":[
											 { "true":["ナンとジョー先生"],"false":[] },
											 { "true":["ピーターパン"],"false":[] },
											 { "true":["若草物語"],"false":[] },
											 { "true":["フランダースの犬"],"false":[] },
											 { "true":["あらいぐまラスカル"],"false":[] },
											 { "true":["母をたずねて三千里"],"false":[] },
											 { "true":["ふしぎな島のフローネ"],"false":[] },
											 { "true":["ポリアンナ物語"],"false":[] },
											 { "true":["ペリーヌ物語"],"false":[] },
											 { "true":["小公女セーラ"],"false":[] },
											 { "true":["赤毛のアン"],"false":[] },
											 { "true":["あしながおじさん"],"false":[] },
											 { "true":["トム・ソーヤの冒険"],"false":[] },
											 { "true":["トラップ一家物語"],"false":[] },
											 { "true":["南の虹のルーシー"],"false":[] },
											 { "true":["大草原","ブッシュベイビー"],"false":[] },
											 { "true":["わたしのアンネット"],"false":[] },
											 { "true":["七つの海のティコ"],"false":[] },
											 { "true":["小公子セディ"],"false":[] },
											 { "true":["牧場の少女カトリ"],"false":[] },
											 { "true":["ロミオの青い空"],"false":[] },
											 { "true":["名犬ラッシー"],"false":[] },
											 { "true":["家なき子レミ"],"false":[] },
											 { "true":["ふたりのロッテ"],"false":[] }
									 ] },

									{"title":"ドラマ",
									 "conditions":[
											 { "true":["ヤマトナデシコ"],"false":[] },
											 { "true":["ママはアイドル"],"false":[] },
											 { "true":["Love Story","中山美穂"],"false":[] },
											 { "true":["花ざかりの君たちへ"],"false":[] },
											 { "true":["理想の結婚","竹野内"],"false":[] },
											 { "true":["HERO"],"false":[] },
											 { "true":["流星の絆"],"false":[] },
											 { "true":["ウルトラマン"] , "false":["ウルトラマン列伝","デジタルリマスター"] },
											 { "true":["シャーロック"],"false":[] }
									 ]},

									{"title":"海外ドラマ",
									 "conditions":[
											 { "true":["glee"],"false":[] },
											 { "true":["アグリー・ベティ"],"false":[] },
											 { "true":["ER","緊急救命室"],"false":[] },

											 { "true":["チャングムの誓い"],"false":[] },
											 { "true":["イ・サン"],"false":["イ・サンヨプ","ペク・ドンス"] },
											 { "true":["トンイ"],"false":[] },

											 { "true":["高校野球"],"false":[] }
									 ] }
								];

console.log("init");
// 初期設定
if( !localStorage['conditionSets'] || !localStorage['areaId'] ){
		console.log("setting is not saved");
		console.log("open edit conditionSets window");
		openSettingWindow();
}
// 設定読み込み
conditionSets = JSON.parse(localStorage['conditionSets']);
areaId = localStorage['areaId']; targets[1].areaId = areaId;

// コールバック関数設定
// 設定ボタン
var settingOpenButton = document.getElementById("setting_button");
settingOpenButton.addEventListener("click", function(){openSettingWindow();});
// 検索ボタン
var executeCheckButton = document.getElementById("execute_check_button");
executeCheckButton.addEventListener("click", function(){check();});

// condition set selector
var conditionSetSelector = document.getElementById("condition_set_selector");
for( var i in conditionSets ){
		var conditionSetLabel = document.createElement("label");

		var conditionSetChbox = document.createElement("input");
		conditionSetChbox.type = "checkbox"; conditionSetChbox.value = i; conditionSetChbox.setAttribute("checked","");
		conditionSetChbox.name = "condition_set_chbox";
		// conditionSetChbox.addEventListener("change", function(){check();});なぜか効かない
		conditionSetLabel.appendChild( conditionSetChbox );

		conditionSetLabel.innerHTML += conditionSets[i].title;
		conditionSetLabel.appendChild( document.createElement("br") );

		conditionSetSelector.appendChild( conditionSetLabel );
}

// 検索実行 & 結果表示
check();

// 設定ウィンドウを開く
function openSettingWindow(){
		window.open('setting.html','Edit Condition Sets Window','width=800, height=600, left=100, top=100 ');
}

//パターン検索
function searchPattern(condition,program,replaceFlg){
		console.log("searchPattern");
		var sentence = program.title+program.summary;

    /* condtionのtrueまたはfalseで１つでも条件を満たさなければ、条件を満たさないとする */
		for(var i in condition["false"]){
        if(sentence.indexOf(condition["false"][i]) != -1)return false;
    }
		for(var i in condition["true"]){
        if(sentence.indexOf(condition["true"][i]) == -1)return false;
				if(replaceFlg){
						program.title = String(program.title).replace(condition["true"][i],'<b>'+condition["true"][i]+'</b>');
						program.summary = String(program.summary).replace(condition["true"][i],'<b>'+condition["true"][i]+'</b>');
				}
    }

    return true;

}

// n日後、n日前の日付を求める
function computeDate(year, month, day, addDays){
    var dt = new Date(year, month - 1, day);
    var baseSec = dt.getTime();
    var addSec = addDays * 86400000;//日数 * 1日のミリ秒数
    var targetSec = baseSec + addSec;
    dt.setTime(targetSec);
    return dt;
}



//更新されているかどうかチェック
function check(){
		console.log("check");
		// チェックされているcondition groupを取得
		checkedConditionSets = [];
		var conditionSetSelector = document.getElementById("condition_set_selector");
		var conditionSetChboxes = conditionSetSelector.condition_set_chbox;
		for( i in conditionSetChboxes ){
				if(conditionSetChboxes[i].checked) checkedConditionSets.push(conditionSets[i]);
		}
		
		// 表示部初期化
		var searchResultArea = document.getElementById("search_result_area");
		search_result_area.innerHTML = "";

		var date = new Date();

		if(programDaySets.length==0){
				for(var i=0;i<7;i++){/* １週間分検索 */
						checkOneDay(date);
						date = computeDate(date.getFullYear(), date.getMonth()+1, date.getDate(), 1);// 日付をすすめる
				}
		}

		// 各日の検索結果表示
		for( i in programDaySets ){// 日付ループ
				var dayTitle = document.createElement("h3");
				dayTitle.setAttribute("style", "position: relative; left:10px");
				dayTitle.innerHTML = programDaySets[i].date;
				searchResultArea.appendChild( dayTitle );

				for( j in programDaySets[i].programSets ){// テレビ局ループ
						for( k in programDaySets[i].programSets[j].programs ){// 番組ループ
								var hitPrograms = [];
								var program = programDaySets[i].programSets[j].programs[k];
								var sentence = program.title+program.summary;
								// console.log(sentence);

								for(var x in checkedConditionSets){
										for(var y in checkedConditionSets[x].conditions){
												if( searchPattern(checkedConditionSets[x].conditions[y],program,false) ){
														hitPrograms.push(program);
												}
										}
								}

								// console.log(programSets[i].station + " " + hitProgramSets[i].hitPrograms.length + " hits");

								if( hitPrograms.length != 0 ){
										// テレビ局タイトル
										var tvStationTitle = document.createElement("h4");
										// hで改行しないときはdisplay:inline
										tvStationTitle.setAttribute("style", "display:inline; position: relative; left: 20px");
										tvStationTitle.innerHTML = programDaySets[i].programSets[j].station + " " + hitPrograms.length + " hits";
										searchResultArea.appendChild( tvStationTitle );

										for( n in hitPrograms ){
												// console.log("  " + hitProgramSets[i].hitPrograms[j].time + " 「" + hitProgramSets[i].hitPrograms[j].title + "」");
												// console.log("           " + hitProgramSets[i].hitPrograms[j].summary);
						
												var hitProgramTitleSpan = document.createElement("span");
												hitProgramTitleSpan.innerHTML 
														= hitPrograms[n].time + " 「" + hitPrograms[n].title + "」"
												// spanを縦に並べるときはdisplay: block
												hitProgramTitleSpan.setAttribute("style", "display: block; position: relative; left: 40px");
												searchResultArea.appendChild( hitProgramTitleSpan );

												var hitProgramSummarySpan = document.createElement("span");
												hitProgramSummarySpan.innerHTML = hitPrograms[n].summary;
												hitProgramSummarySpan.setAttribute("style", "display: block; position: relative; left: 60px");
												searchResultArea.appendChild( hitProgramSummarySpan );
						
										}searchResultArea.appendChild( document.createElement('br') );
								}
						}
				}
		}

}

// 1日分の検索
function checkOneDay(date){
		console.log("checkOneDay");
		var searchResultArea = document.getElementById("search_result_area");

		var programSets = [];
		for( i in targets){// 地上デジタルとBS

				var url="http://tv.so-net.ne.jp/chart/"+targets[i].areaId+".action?head="+date.getFullYear()+("00"+(date.getMonth()+1)).slice(-2)+("00"+date.getDate()).slice(-2)+"0000"+"&span=24&chartWidth=2000&cellHeight=5";

				var programs = [];
				console.log(url);

				$.ajax({
						type: "GET",
						url: url,
						dataType: "html",
						async: false,
						success: function(data){

								$(data).find("div").each( function(){
										// 各番組
										var tvShowFlg = false;// 番組情報の有無フラグ
										var tvShowProg = {"time":"", "title":"", "summary":""};
										$(this).find("td").each( function(){
												if( $(this).attr("class") == "td-schedule" ){
														$(this).find("span").each( function(){
																// タイトル,要約
																if( $(this).attr("class") == "schedule-title" ){// タイトル
																		tvShowProg.title = $(this).text();
																		// console.log( "  title: " + tvShowProg.title );
																		tvShowFlg |= true;
																}else if( $(this).attr("class") == "schedule-summary" && tvShowFlg ){
																		tvShowProg.summary = $(this).text().replace(/\n/g,"");// 要約
																		// console.log( "       summary: "+ tvShowProg.summary );
																}

														} );
												}
										} );
										// 時刻
										if( String($(this).attr("class")).indexOf("cell-schedule") != -1 ){
												var splits = String($(this).attr("id")).split("-");
												if( splits.length > 2 ){
														tvShowProg.time = splits[1].slice(-4,-2)+":"+splits[1].slice(-2);
														// console.log( "     time: " + tvShowProg.time );
												}
										}

										// キーワード検索,リストへ追加
										if(tvShowFlg){
												var sentence = tvShowProg.title+tvShowProg.summary;
												// console.log(sentence);
												for(var i in checkedConditionSets){
														for(var j in checkedConditionSets[i].conditions){
																if( searchPattern(checkedConditionSets[i].conditions[j], tvShowProg, true) ){
																		programs.push(tvShowProg);
																		console.log(tvShowProg.title+tvShowProg.summary);
																}
														}
												}
										}

										// テレビ局										
										if( String($(this).attr("id")).indexOf("cell-station-bottom-") != -1 ){
												if( programs.length != 0 ){
														var station = String($(this).attr("title"));
														// console.log(station + " " + hitPrograms.length + " hits");
														programSets.push( {"station":station, "programs":programs} );
														programs = [];
												}
										}


								} ); // end of divループ

						},
						error: function(XMLHttpRequest,textStatus,errorThrown){
								console.log("GET error");
								console.log(textStatus);
						}
				}); // end ajax


		}
		var dayTitle = (date.getMonth()+1) + "/" + date.getDate();
		programDaySets.push({"date":dayTitle, "programSets":programSets});

}

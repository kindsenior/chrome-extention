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
											 { "true":["トンイ"],"false":[] }
									 ] }
								];

// 記録値 読み込み
try{
		conditionSets = JSON.parse(localStorage['conditionSets']);
}catch(e){
		console.log("conditionSets not saved");
		conditionSets = [];
}
if( !(areaId = localStorage['areaId']) )areaId = "";
if( !(duration = localStorage['duration']) )duration = "";
try{
		checkDays = JSON.parse(localStorage['checkDays']);
}catch(e){
		checkDays = [];
}

// condition sites 描画
drawConditionSets();

// デフォルト値設定
durationSlector = document.getElementById("duration_selector");// durationSlector
for( var i in durationSlector.options ){
		var option = durationSlector.options[i];
		if( option.value==duration )option.setAttribute("selected","selected");
}
dayChboxes = document.getElementsByName("day_selector");// daySlector
for( var i in dayChboxes ){
		var dayChbox  = dayChboxes.item(i);
		for( var j in checkDays ){
				if( dayChbox.value == checkDays[j] )dayChbox.setAttribute("checked","");
		}
}
areaSelector = document.getElementById("area_selector");// areaSelector
for(var i in areaSelector.options){
		var option = areaSelector.options[i];
		if( option.value==areaId )option.setAttribute("selected","selected");
}


// コールバック関数設定
// キャンセルボタン
cancelButtons = document.getElementsByName("cancel_button");
for( var i in cancelButtons )
		cancelButtons.item(i).addEventListener("click",function(){window.close();});

// 終了ボタン
exitButtons = document.getElementsByName("exit_button");
for( var i in exitButtons )
		exitButtons.item(i).addEventListener("click",function(){endSetting();});


// 条件セット
function createConditionSet( conditionSetIdx, conditionSet ){
		var element  = document.createElement('div');
		element.setAttribute("style","clear:both");
		element.setAttribute("id",conditionSetIdx);
		// element.style = "clear:both";

		// conditionSetName
		element.appendChild( createConditionSetTitle( conditionSetIdx, conditionSet.title) );

		//conditions
		for( i in conditionSet.conditions ){
				element.appendChild( createCondition( conditionSet.conditions, i, conditionSet.conditions[i] ) );
		}

		element.appendChild( createConditionAddButton(conditionSet.conditions) );
		element.appendChild( document.createElement('br') );
		element.appendChild( document.createElement('br') );
		element.appendChild( document.createElement('br') );

		return element;
}

// 条件セットのタイトル
function createConditionSetTitle( conditionSetIdx, title ){
		var element = document.createElement("div");
		element.setAttribute("style","clear:both");
		// element.style = "clear:both";

		var conditonSetTitleSpan = document.createElement("span");
		conditonSetTitleSpan.innerHTML = 'Condition Group Title:';
		element.appendChild( conditonSetTitleSpan );

		var conditonSetTitleInput = document.createElement("input");
		conditonSetTitleInput.type = "text"; conditonSetTitleInput.size = "40"; conditonSetTitleInput.value = title;
		conditonSetTitleInput.addEventListener("change", function(){ changeConditionSetTitle(conditonSetTitleInput,conditionSetIdx); });
		element.appendChild( conditonSetTitleInput );

		element.appendChild( createConditionSetDeleteButton(conditionSetIdx) );
		
		// element.appendChild( document.createElement('br') );

		return element;
}

// trueKeywordFormSetsとfalseKeywordFormSetsのセット
function createCondition( conditions, conditionIdx, condition ){
		var element = document.createElement('div');
		element.setAttribute("style","clear:both");

		// condition number
		var conditionSpan = document.createElement('span');
		conditionSpan.setAttribute("style","clear:both");
		conditionSpan.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Condition&nbsp;" + (parseInt(conditionIdx)+1);
		conditionSpan.appendChild( createConditionDeleteButton(conditions, conditionIdx) );
		element.appendChild(conditionSpan);

		// trueKeywordFormSets
		var trueKeywordFormSets = document.createElement('div');
		trueKeywordFormSets.setAttribute("style","clear:both");
		var trueSpan =  document.createElement('span');
		trueSpan.setAttribute("style","float:left; position: relative; top: 5px;");
		trueSpan.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contain";
		trueKeywordFormSets.appendChild( trueSpan );
		for ( i in condition["true"] ){
				trueKeywordFormSets.appendChild( createKeywordFormSet(conditions[conditionIdx]["true"], i, condition["true"][i]) );
		}
		trueKeywordFormSets.appendChild( createKeywordFormAddButton(conditions[conditionIdx]["true"]) );
		element.appendChild( trueKeywordFormSets );


		// falseKeywordFormSets
		var falseKeywordFormSets = document.createElement('div');
		falseKeywordFormSets.setAttribute("style","float:left");
		var falseSpan =  document.createElement('span');
		falseSpan.setAttribute("style","float:left; position: relative; top: 5px;");
		falseSpan.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Not Contain";
		falseKeywordFormSets.appendChild( falseSpan );
		for( i in condition["false"] ){
				falseKeywordFormSets.appendChild( createKeywordFormSet(conditions[conditionIdx]["false"], i, condition["false"][i]) );
		}
		falseKeywordFormSets.appendChild( createKeywordFormAddButton(conditions[conditionIdx]["false"]) );
		element.appendChild( falseKeywordFormSets );

		element.appendChild( document.createElement('br') );
		element.appendChild( document.createElement('br') );

		return element;
}

// キーワードフォームと削除ボタンのセット
function createKeywordFormSet( keywords, keywordIdx, keyword ){
		var element = document.createElement('div');
		element.setAttribute("style","float:left");
		// element.style = "float:left";

		element.innerHTML = "&nbsp;&nbsp;";
		// キーワードフォーム
		var keywordForm = document.createElement('input');
		keywordForm.type = "text"; keywordForm.size = "20"; keywordForm.value = keyword;
		keywordForm.addEventListener("change",function(){ changeKeyword(keywordForm,keywords,keywordIdx); });
		element.appendChild( keywordForm );
		
		// 削除ボタン
		element.appendChild( createKeywordFormDeleteButton( keywords, keywordIdx ) );

		return element;
}

// キーワードフォーム削除ボタン
function createKeywordFormDeleteButton( keywords, keywordIdx ){
		var element = document.createElement('input');
		element.type = "image"; element.alt=""; element.width="12"; element.src="img/delete.png";
		// element.onClick="deleteKeywordForm()";
		element.addEventListener("click", function(){ deleteKeyword(keywords, keywordIdx); } );

		return element;
}
// condition削除ボタン
function createConditionDeleteButton( conditions, conditionIdx ){
		var element = document.createElement('input');
		element.type = "image"; element.alt=""; element.width="12"; element.src="img/delete.png";
		// element.onClick="deleteCondition()";
		element.addEventListener("click", function(){ deleteCondition( conditions, conditionIdx ); } );

		return element;
}
// condition group 削除ボタン
function createConditionSetDeleteButton( conditionSetIdx ){
		var element = document.createElement('input');
		element.type = "image"; element.alt=""; element.width="12"; element.src="img/delete.png";
		// element.setAttribute("onClick","'deleteConditionSet("+conditionSetIdx+")'");
		// element.setAttribute("onClick","deleteConditionSet(0);");
		element.addEventListener("click", function(){ deleteConditionSet(conditionSetIdx); } );

		return element;
}


// キーワードフォーム追加ボタン
function createKeywordFormAddButton(keywords){
		var element = document.createElement('input');
		element.setAttribute("style", "float:left; position: relative; top: 5px;");
		element.type = "image"; element.alt=""; element.width="15"; element.src="img/plus.png";
		element.addEventListener("click", function(){ addKeyword(keywords); });
		
		return element;
}
// condition追加ボタン
function createConditionAddButton( conditions ){
		var element = document.createElement('input');
		element.setAttribute("style", "float:left");
		element.type = "button"; element.value = "Add Condition";
		element.addEventListener("click", function(){ addCondition(conditions); });
		
		return element;
}
// condition group 追加ボタン
function createConditionSetAddButton(){
		var element = document.createElement('input');
		element.setAttribute("style", "float:left");
		element.type = "button"; element.value = "Add Condition Group";
		element.addEventListener("click",function(){ addConditionSet(); });
		
		return element;
}



// for( i in conditionSets ){
// 		console.log( createConditionSet(conditionSets[i]).innerHTML );
// 		console.log();
// }


// 配列操作///////////////////////////////////////////////////////////////////////////////
// キーワード削除
function deleteKeyword( keywords, keywordIdx ){
		console.log("deleteKeyword");
		delete keywords[keywordIdx];
		drawConditionSets();
}

// condition 削除
function deleteCondition( conditions, conditionIdx ){
		console.log("deleteCondition");
		delete conditions[conditionIdx];
		drawConditionSets();
}

// condition set 削除
function deleteConditionSet(conditionSetIdx){
		console.log("deleteConditionSet");
		// conditionSets.slice(conditionSetIdx,1);
		delete conditionSets[conditionSetIdx];
		drawConditionSets();
}

// キーワード追加
function addKeyword( keywords ){
		console.log("addKeyword");
		keywords.push("");
		drawConditionSets();
}

// condition追加
function addCondition( conditions ){
		console.log("addCondition");
		conditions.push( {"true":[], "false":[]} );
		drawConditionSets();
}
// condition set 追加
function addConditionSet(){
		console.log("addConditionSet");
		conditionSets.push( {"title":"","conditions":[{"true":[],"false":[]}]} );
		drawConditionSets();
}

// キーワード変更
function changeKeyword( inputElem, keywords, keywordIdx ){
		console.log("changeKeyword");
		keywords[keywordIdx] = inputElem.value;
		drawConditionSets();
}

// condition set title 変更
function changeConditionSetTitle( inputElem, conditionSetIdx ){
		console.log("changeConditionSetTitle");
		conditionSets[conditionSetIdx].title = inputElem.value;
		drawConditionSets();
}


// condition setを描画
function drawConditionSets(){
		console.log("drawConditionSets");
		var conditionSetsForm = document.getElementById("condition_sets_area");
		conditionSetsForm.innerHTML = "";
		for( i in conditionSets ){
				conditionSetsForm.appendChild( createConditionSet(i,conditionSets[i]) );
		}

		conditionSetsForm.appendChild( createConditionSetAddButton() );
		
}

// 設定を終了
function endSetting(){
		console.log("endSetting");

		var conditionSets_ = [];// 保存用

		// 空欄条件削除
		for( i in conditionSets ){
				var conditionExitFlg = false;
				var conditions = [];
				for( j in conditionSets[i].conditions ){
						var keywordExitFlg = false;
						var condition = {"true":[],"false":[]};
						for( k in conditionSets[i].conditions[j]["true"] ){
								if ( conditionSets[i].conditions[j]["true"][k] == "" ) delete conditionSets[i].conditions[j]["true"][k];// true keyword 削除
								else {
										keywordExitFlg |= true;
										condition["true"].push(conditionSets[i].conditions[j]["true"][k]);
								}
						}

						for( k in conditionSets[i].conditions[j]["false"] ){
								if ( conditionSets[i].conditions[j]["false"][k] == "" ) delete conditionSets[i].conditions[j]["false"][k];// false keyword 削除
								else{
										condition["false"].push(conditionSets[i].conditions[j]["false"][k]);
								}
						}
						
						if( !keywordExitFlg ){
								delete conditionSets[i].conditions[j];// condition削除
						}else{
								conditionExitFlg |= true;
								conditions.push(condition);
						}
				}
				if( !conditionExitFlg ){delete conditionSets[i];continue;} // condition set 削除
				if( conditionSets[i].title == "" ){alert("Enter Condition Group Title");return;}
				conditionSets_.push({"title":conditionSets[i].title,"conditions":conditions});
		}


		// 条件保存
		localStorage['conditionSets'] = JSON.stringify(conditionSets_);

		// 地域保存
		var areaSelector = document.getElementById('area_selector');
		localStorage['areaId'] = areaSelector.options[areaSelector.selectedIndex].value;

		// 検索時刻保存
		var durationSlector = document.getElementById('duration_selector');
		localStorage['duration'] = durationSlector.options[durationSlector.selectedIndex].value;
		var dayChboxes = document.getElementsByName('day_selector');
		checkDays = [];
		for( var i in dayChboxes )if( dayChboxes.item(i).checked )checkDays.push(dayChboxes.item(i).value);
		localStorage['checkDays'] = JSON.stringify(checkDays);


		// drawConditionSets();
		window.close();
}


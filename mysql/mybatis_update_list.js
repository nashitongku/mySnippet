let fields = [`team_id`, `camp_plan_id`, `task`, `sign_in_type`, `visible_when_sign_up`, `price`, `create_time`, `update_time`];
let tableName = 'team_task'
function generator(fields){
	let template_root = `<set>
	{{trims}}
	</set>`;
	return template_root.replace(/{{trims}}/,fieldTrimsGenerator(fields))
}




let fieldTrims = "";


function fieldTrimsGenerator(fields){
	let fieldTrims = "";
	
	let trimTemplate = `
		   <trim prefix="{{sqlField}} = case" suffix="end,">
				<foreach collection="list" item="item" index="index">
					<if test="item.{{pojoField}} !=null">
						when id=#{item.id} then #{item.{{pojoField}}} 
					</if>
					<if test="item.{{pojoField}} ==null">
						when id=#{item.id} then {{sqlField}}
					</if>
				</foreach>
			</trim>
`;
	
	fields.forEach(field => {
		let sqlField = field;
		let pojoField = getCamelCase(field);
		fieldTrims += trimTemplate.replace(/{{sqlField}}/g,sqlField).replace(/{{pojoField}}/g,pojoField);
	});
	
	return fieldTrims;
}


function getCamelCase(word){
	let index = word.indexOf('_');
	if(index === -1) return word;
	word = word.replace(/_[a-zA-Z]/,word.charAt(index+1).toUpperCase());
	return getCamelCase(word);
}
function copy(content){
	let input = document.createElement("textarea")
	input.setAttribute("style","display:hidden")
	input.innerHTML = content
	input.select();
    document.execCommand('copy', true);
}

copy(generator(fields))



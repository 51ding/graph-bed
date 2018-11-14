var {dialog} =require("electron");

function MessageBox(){

}

MessageBox.show=function(content){
	dialog.showMessageBox({
			title:"错误信息",
			message:content
	})

}

module.exports=MessageBox;